import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { ClassroomScene } from './ClassroomScene';
import { StudentAnimationController } from './StudentAnimationController';
import { ObjectInfoModal } from './ObjectInfoModal';
import { CAMERA_PRESETS } from './classroomConfig';
import { Eye, RotateCcw, Cpu } from 'lucide-react';
import { useClassroomStore } from '../../store/classroomStore';

interface ClassroomCanvasProps {
  className?: string;
  cameraPreset?: keyof typeof CAMERA_PRESETS;
  hideOverlays?: boolean;
}

/**
 * Smooth Camera Transition Controller:
 * Interpolates camera position and target towards active preset or inspected object
 * using damp/lerp to eliminate jarring cuts.
 */
interface CameraTransitionProps {
  targetPosition: [number, number, number] | null;
  targetLookAt: [number, number, number] | null;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  onTransitionComplete: () => void;
}

const CameraTransitionController: React.FC<CameraTransitionProps> = ({
  targetPosition,
  targetLookAt,
  controlsRef,
  onTransitionComplete,
}) => {
  const targetPosVec = React.useMemo(
    () => (targetPosition ? new THREE.Vector3(...targetPosition) : null),
    [targetPosition]
  );
  const targetLookVec = React.useMemo(
    () => (targetLookAt ? new THREE.Vector3(...targetLookAt) : null),
    [targetLookAt]
  );

  useFrame((state, delta) => {
    // If no active transition target, do nothing and let OrbitControls take full direct control
    if (!targetPosVec || !targetLookVec || !controlsRef.current) return;

    const dt = Math.min(delta, 0.1);
    const lerpSpeed = dt * 5.0; // Responsive, smooth ease transition

    // Lerp camera position
    state.camera.position.lerp(targetPosVec, lerpSpeed);

    // Lerp orbit control target
    controlsRef.current.target.lerp(targetLookVec, lerpSpeed);
    controlsRef.current.update();

    // Check if within arrival threshold
    const posDist = state.camera.position.distanceTo(targetPosVec);
    const targetDist = controlsRef.current.target.distanceTo(targetLookVec);

    if (posDist < 0.05 && targetDist < 0.05) {
      // Snap to final destination and release control to OrbitControls
      state.camera.position.copy(targetPosVec);
      controlsRef.current.target.copy(targetLookVec);
      controlsRef.current.update();
      onTransitionComplete();
    }
  });

  return null;
};

/**
 * Environmental lighting controller that smoothly interpolates:
 * - Ambient tone based on temperature (18-24°C: cool/neutral, 25-30°C: normal, 30-35°C: warm, >35°C: stronger warm)
 * - Directional sunlight streaming through windows based on lightIntensity (0-100%)
 * - Balanced hemisphere sky/ground fill light
 */
const EnvironmentLighting: React.FC = () => {
  const temperature = useClassroomStore((state) => state.temperature);
  const lightIntensity = useClassroomStore((state) => state.lightIntensity);
  const lightState = useClassroomStore((state) => state.lightState);

  const ambientRef = useRef<THREE.AmbientLight>(null);
  const sunLightRef = useRef<THREE.DirectionalLight>(null);
  const frontFillRef = useRef<THREE.DirectionalLight>(null);
  const artificialFillRef = useRef<THREE.AmbientLight>(null);

  useFrame((_, delta) => {
    // 1. Calculate subtle environmental color based on temperature
    let targetColor = '#ffffff';
    let targetAmbientIntensity = 0.48;

    if (temperature < 25) {
      targetColor = '#f0fdf4'; // Crisp cool-neutral tone
      targetAmbientIntensity = 0.50;
    } else if (temperature < 30) {
      targetColor = '#fefce8'; // Normal pleasant daylight tone
      targetAmbientIntensity = 0.52;
    } else if (temperature < 35) {
      targetColor = '#fed7aa'; // Noticeably warm tone
      targetAmbientIntensity = 0.56;
    } else {
      targetColor = '#fdba74'; // Stronger warm amber atmosphere
      targetAmbientIntensity = 0.60;
    }

    if (ambientRef.current) {
      ambientRef.current.color.lerp(new THREE.Color(targetColor), Math.min(1, delta * 3));
      ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, targetAmbientIntensity, Math.min(1, delta * 3));
    }

    // 2. Window sunlight based on daylight lightIntensity (0% = dark night, 100% = bright sun)
    if (sunLightRef.current) {
      const sunTarget = (lightIntensity / 100) * 1.35;
      sunLightRef.current.intensity = THREE.MathUtils.lerp(sunLightRef.current.intensity, sunTarget, Math.min(1, delta * 4));
    }

    // 3. Smooth artificial ambient fill based on ceiling lightState (0.0 when OFF, 0.45 when ON)
    if (artificialFillRef.current) {
      const artTarget = lightState ? 0.45 : 0.0;
      artificialFillRef.current.intensity = THREE.MathUtils.lerp(artificialFillRef.current.intensity, artTarget, Math.min(1, delta * 6.5));
    }

    // 4. Board area fill light slightly boosts when ceiling lights are ON
    if (frontFillRef.current) {
      const frontTarget = lightState ? 0.55 : 0.22;
      frontFillRef.current.intensity = THREE.MathUtils.lerp(frontFillRef.current.intensity, frontTarget, Math.min(1, delta * 6.5));
    }
  });

  return (
    <>
      {/* Soft Ambient Classroom Base Light */}
      <ambientLight ref={ambientRef} intensity={0.50} color="#ffffff" />

      {/* Dynamic Artificial Ambient Fill Light responding directly to lightState */}
      <ambientLight ref={artificialFillRef} intensity={0.0} color="#fffbeb" />

      {/* Gentle Hemisphere Light for realistic floor bounce & ceiling softness */}
      <hemisphereLight args={['#ffffff', '#cbd5e1', 0.35]} />

      {/* Sunlight streaming through Exterior Left Windows */}
      <directionalLight
        ref={sunLightRef}
        position={[-12, 10, -2]}
        intensity={1.2}
        color="#fffbeb"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0005}
      />

      {/* Interior Front board fill light */}
      <directionalLight ref={frontFillRef} position={[0, 4, 6]} intensity={0.25} color="#e0f2fe" />
    </>
  );
};

export const ClassroomCanvas: React.FC<ClassroomCanvasProps> = ({ 
  className = "w-full h-[480px] sm:h-[560px]",
  cameraPreset,
  hideOverlays = false,
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [activePreset, setActivePreset] = React.useState<keyof typeof CAMERA_PRESETS | 'custom'>('overview');
  
  // Transition target positions; when null, no lerping occurs and OrbitControls has free rein
  const [desiredCamPos, setDesiredCamPos] = React.useState<[number, number, number] | null>(null);
  const [desiredTarget, setDesiredTarget] = React.useState<[number, number, number] | null>(null);
  
  const studentCount = useClassroomStore((state) => state.occupancy);
  const selectedInfo = useClassroomStore((state) => state.selectedInfo);
  const setSelectedInfo = useClassroomStore((state) => state.setSelectedInfo);

  // Apply a camera preset (or reset to overview)
  const applyPreset = React.useCallback((key: keyof typeof CAMERA_PRESETS) => {
    setActivePreset(key);
    const preset = CAMERA_PRESETS[key];
    setDesiredCamPos(preset.position);
    setDesiredTarget(preset.target);
  }, []);

  // Full reset to classroom overview: resets camera position & clears inspection selection
  const resetToOverview = React.useCallback(() => {
    setSelectedInfo(null);
    applyPreset('overview');
  }, [applyPreset, setSelectedInfo]);

  // Cancel transition on user manual interaction (drag / orbit / pan / zoom)
  const handleUserInteractionStart = React.useCallback(() => {
    setDesiredCamPos(null);
    setDesiredTarget(null);
  }, []);

  // Completion callback when camera finishes smooth flight
  const handleTransitionComplete = React.useCallback(() => {
    setDesiredCamPos(null);
    setDesiredTarget(null);
  }, []);

  // React to external cameraPreset changes (e.g., from cinematic presentation mode)
  useEffect(() => {
    if (cameraPreset && CAMERA_PRESETS[cameraPreset]) {
      applyPreset(cameraPreset);
    }
  }, [cameraPreset, applyPreset]);

  // Camera focus on selected object: temporary smooth flight toward object
  useEffect(() => {
    if (!selectedInfo || !selectedInfo.targetPosition) return;
    const [tx, ty, tz] = selectedInfo.targetPosition;
    // Calculate a comfortable offset for smooth inspection without obstructing view
    const targetVec: [number, number, number] = [tx, ty, tz];
    const offsetVec: [number, number, number] = [tx + 2.5, ty + 1.8, tz + 3.2];

    setDesiredCamPos(offsetVec);
    setDesiredTarget(targetVec);
    setActivePreset('custom');
  }, [selectedInfo]);

  return (
    <div className={`relative isolate z-0 w-full h-full min-w-0 min-h-0 bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden shadow-xs select-none ${className}`}>
      {/* 3D WebGL Canvas */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Canvas
          shadows
          dpr={[1, 1.75]} // Optimized dynamic device pixel ratio to maintain 60fps on high-DPI screens
          camera={{
            position: CAMERA_PRESETS.overview.position,
            fov: 44,
            near: 0.1,
            far: 60,
          }}
          className="w-full h-full block"
        >
          {/* Dynamic environmental lighting reacting to temperature and daylight */}
          <EnvironmentLighting />

          {/* Smooth One-Shot Interruptible Camera Transition Controller */}
          <CameraTransitionController
            targetPosition={desiredCamPos}
            targetLookAt={desiredTarget}
            controlsRef={controlsRef}
            onTransitionComplete={handleTransitionComplete}
          />

          {/* Frame loop animation controller for student walking and door kinematics */}
          <StudentAnimationController />

          {/* 3D Classroom Environment & Student Agents */}
          <ClassroomScene />

          {/* Fluid, Responsive Constrained Orbit Controls */}
          <OrbitControls
            ref={controlsRef}
            makeDefault
            enableDamping
            dampingFactor={0.08}
            rotateSpeed={0.85}
            zoomSpeed={0.9}
            panSpeed={0.8}
            minDistance={2.5}
            maxDistance={22}
            minPolarAngle={Math.PI / 12}
            maxPolarAngle={Math.PI / 2.05} // Prevents looking through floor underneath
            onStart={handleUserInteractionStart}
          />
        </Canvas>
      </div>

      {/* Top HUD Controls & Camera Presets Bar */}
      {!hideOverlays && (
        <div className="absolute top-3.5 left-3.5 right-3.5 z-10 flex flex-wrap items-center justify-between gap-2.5 pointer-events-none">
          {/* Top Left: Simulation Mode & Classroom Status */}
          <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
            <div className="bg-slate-900/90 text-white backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 shadow-sm flex items-center space-x-2 text-xs shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold tracking-wide uppercase text-[11px] text-emerald-400 flex items-center space-x-1">
                <Cpu className="w-3 h-3 inline mr-1" />
                SIMULATION MODE
              </span>
            </div>

            <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-2 text-xs shrink-0">
              <span className="font-bold text-slate-800 tracking-tight">3D Classroom Digital Twin</span>
              <span className="text-slate-300">|</span>
              <span className="text-blue-600 font-semibold">{studentCount} Students</span>
            </div>
          </div>

          {/* Top Right: Camera Presets Bar */}
          <div className="flex items-center space-x-1 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-slate-200 shadow-xs overflow-x-auto max-w-full pointer-events-auto">
            <div className="flex items-center space-x-1 px-2 py-0.5 text-[11px] font-semibold text-slate-400 shrink-0">
              <Eye className="w-3 h-3" />
              <span className="hidden sm:inline">Views:</span>
            </div>
            {(Object.keys(CAMERA_PRESETS) as Array<keyof typeof CAMERA_PRESETS>).map((key) => (
              <button
                key={key}
                onClick={() => applyPreset(key)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  activePreset === key
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {CAMERA_PRESETS[key].name}
              </button>
            ))}
            <button
              onClick={resetToOverview}
              title="Reset to Overview"
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center space-x-1 shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="text-[10px] hidden md:inline">Reset</span>
            </button>
          </div>
        </div>
      )}

      {/* Interactive Object Information Modal */}
      <ObjectInfoModal />

      {/* Bottom Center: Navigation Hint */}
      {!hideOverlays && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/85 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-200 shadow-xs text-[11px] text-slate-500 pointer-events-none hidden sm:block">
          Click Fans, Lights, Sensors, or Students to Inspect & Focus • Drag to Orbit
        </div>
      )}
    </div>
  );
};
