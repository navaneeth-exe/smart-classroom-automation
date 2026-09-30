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
  targetPosition: [number, number, number];
  targetLookAt: [number, number, number];
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}

const CameraTransitionController: React.FC<CameraTransitionProps> = ({
  targetPosition,
  targetLookAt,
  controlsRef,
}) => {
  const targetPosVec = React.useMemo(() => new THREE.Vector3(...targetPosition), [targetPosition]);
  const targetLookVec = React.useMemo(() => new THREE.Vector3(...targetLookAt), [targetLookAt]);

  useFrame((state, delta) => {
    if (!controlsRef.current) return;
    const dt = Math.min(delta, 0.1);
    const lerpSpeed = dt * 4.5; // Smooth cinematic ease-in/out transition

    // Lerp camera position
    state.camera.position.lerp(targetPosVec, lerpSpeed);

    // Lerp orbit control target
    controlsRef.current.target.lerp(targetLookVec, lerpSpeed);
    controlsRef.current.update();
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

  const ambientRef = useRef<THREE.AmbientLight>(null);
  const sunLightRef = useRef<THREE.DirectionalLight>(null);

  useFrame((_, delta) => {
    // 1. Calculate subtle environmental color based on temperature
    let targetColor = '#ffffff';
    let targetAmbientIntensity = 0.52;

    if (temperature < 25) {
      targetColor = '#f0fdf4'; // Crisp cool-neutral tone
      targetAmbientIntensity = 0.54;
    } else if (temperature < 30) {
      targetColor = '#fefce8'; // Normal pleasant daylight tone
      targetAmbientIntensity = 0.56;
    } else if (temperature < 35) {
      targetColor = '#fed7aa'; // Noticeably warm tone
      targetAmbientIntensity = 0.60;
    } else {
      targetColor = '#fdba74'; // Stronger warm amber atmosphere
      targetAmbientIntensity = 0.64;
    }

    if (ambientRef.current) {
      ambientRef.current.color.lerp(new THREE.Color(targetColor), Math.min(1, delta * 3));
      ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, targetAmbientIntensity, Math.min(1, delta * 3));
    }

    // 2. Window sunlight based on lightIntensity (0% = night dark, 100% = intense sun)
    if (sunLightRef.current) {
      const sunTarget = (lightIntensity / 100) * 1.35;
      sunLightRef.current.intensity = THREE.MathUtils.lerp(sunLightRef.current.intensity, sunTarget, Math.min(1, delta * 4));
    }
  });

  return (
    <>
      {/* Soft Ambient Classroom Base Light */}
      <ambientLight ref={ambientRef} intensity={0.55} color="#ffffff" />

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
      <directionalLight position={[0, 4, 6]} intensity={0.3} color="#e0f2fe" />
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
  const [desiredCamPos, setDesiredCamPos] = React.useState<[number, number, number]>(CAMERA_PRESETS.overview.position);
  const [desiredTarget, setDesiredTarget] = React.useState<[number, number, number]>(CAMERA_PRESETS.overview.target);
  
  const studentCount = useClassroomStore((state) => state.occupancy);
  const selectedInfo = useClassroomStore((state) => state.selectedInfo);

  const applyPreset = (key: keyof typeof CAMERA_PRESETS) => {
    setActivePreset(key);
    const preset = CAMERA_PRESETS[key];
    setDesiredCamPos(preset.position);
    setDesiredTarget(preset.target);
  };

  // React to external cameraPreset changes (e.g., from cinematic presentation mode)
  useEffect(() => {
    if (cameraPreset && CAMERA_PRESETS[cameraPreset]) {
      applyPreset(cameraPreset);
    }
  }, [cameraPreset]);

  // Camera focus on selected object
  useEffect(() => {
    if (!selectedInfo || !selectedInfo.targetPosition) return;
    const [tx, ty, tz] = selectedInfo.targetPosition;
    // Calculate a gentle offset for smooth inspection
    const targetVec: [number, number, number] = [tx, ty, tz];
    const offsetVec: [number, number, number] = [tx + 2.5, ty + 1.8, tz + 3.2];

    setDesiredCamPos(offsetVec);
    setDesiredTarget(targetVec);
    setActivePreset('custom');
  }, [selectedInfo]);

  return (
    <div className={`relative bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden shadow-xs ${className}`}>
      {/* 3D WebGL Canvas */}
      <Canvas
        shadows
        camera={{
          position: CAMERA_PRESETS.overview.position,
          fov: 44,
          near: 0.1,
          far: 60,
        }}
      >
        {/* Dynamic environmental lighting reacting to temperature and daylight */}
        <EnvironmentLighting />

        {/* Smooth Camera Transition Controller */}
        <CameraTransitionController
          targetPosition={desiredCamPos}
          targetLookAt={desiredTarget}
          controlsRef={controlsRef}
        />

        {/* Frame loop animation controller for student walking and door kinematics */}
        <StudentAnimationController />

        {/* 3D Classroom Environment & Student Agents */}
        <ClassroomScene />

        {/* Constrained Orbit Controls */}
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.06}
          minDistance={3.5}
          maxDistance={18}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI / 2.05} // Prevents looking through floor underneath
        />
      </Canvas>

      {/* Top Left: Simulation Mode & Classroom Status */}
      {!hideOverlays && (
        <div className="absolute top-3.5 left-3.5 flex items-center space-x-2">
          <div className="bg-slate-900/90 text-white backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 shadow-sm flex items-center space-x-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold tracking-wide uppercase text-[11px] text-emerald-400 flex items-center space-x-1">
              <Cpu className="w-3 h-3 inline mr-1" />
              SIMULATION MODE
            </span>
          </div>

          <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-2 text-xs">
            <span className="font-bold text-slate-800 tracking-tight">3D Classroom Digital Twin</span>
            <span className="text-slate-300">|</span>
            <span className="text-blue-600 font-semibold">{studentCount} Students</span>
          </div>
        </div>
      )}

      {/* Top Right: Camera Presets Bar */}
      {!hideOverlays && (
        <div className="absolute top-3.5 right-3.5 flex items-center space-x-1.5 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center space-x-1 px-2 py-0.5 text-[11px] font-semibold text-slate-400">
            <Eye className="w-3 h-3" />
            <span className="hidden sm:inline">Views:</span>
          </div>
          {(Object.keys(CAMERA_PRESETS) as Array<keyof typeof CAMERA_PRESETS>).map((key) => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                activePreset === key
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {CAMERA_PRESETS[key].name}
            </button>
          ))}
          <button
            onClick={() => applyPreset('overview')}
            title="Reset to Overview"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center space-x-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="text-[10px] hidden md:inline">Reset</span>
          </button>
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
