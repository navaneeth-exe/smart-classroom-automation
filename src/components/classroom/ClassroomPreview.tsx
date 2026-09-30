import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { useClassroomStore } from '../../store/classroomStore';

function MinimalClassroomScene() {
  const lightState = useClassroomStore((state) => state.lightState);
  const ambientRef = React.useRef<THREE.AmbientLight>(null);
  const ceilingFillRef = React.useRef<THREE.PointLight>(null);

  useFrame((_, delta) => {
    if (ambientRef.current) {
      const targetAmb = lightState ? 0.95 : 0.45;
      ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, targetAmb, Math.min(1, delta * 6.5));
    }
    if (ceilingFillRef.current) {
      const targetFill = lightState ? 2.5 : 0.0;
      ceilingFillRef.current.intensity = THREE.MathUtils.lerp(ceilingFillRef.current.intensity, targetFill, Math.min(1, delta * 6.5));
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.5} color="#ffffff" />
      <directionalLight position={[10, 15, 10]} intensity={0.8} color="#fffbeb" />
      
      {/* Downward ceiling fill light simulating overhead classroom troffer arrays */}
      <pointLight ref={ceilingFillRef} position={[0, 4.0, 0]} intensity={0} distance={15} color="#fef9c3" />

      {/* Classroom Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[16, 12]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
      </mesh>
      
      <Grid 
        infiniteGrid 
        cellSize={1} 
        sectionSize={4} 
        sectionColor="#94a3b8" 
        cellColor="#cbd5e1" 
        fadeDistance={25} 
      />

      {/* Placeholder Classroom Room Marker */}
      <group position={[0, 0, 0]}>
        {/* Foundation bounding box preview */}
        <mesh position={[0, 1.75, -5.9]}>
          <boxGeometry args={[15.8, 3.5, 0.2]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.9} />
        </mesh>
      </group>

      <OrbitControls 
        makeDefault 
        minPolarAngle={Math.PI / 6} 
        maxPolarAngle={Math.PI / 2.2} 
        maxDistance={25}
        minDistance={5}
      />
    </>
  );
}

export const ClassroomPreview: React.FC = () => {
  const occupancy = useClassroomStore((state) => state.occupancy);
  const temperature = useClassroomStore((state) => state.temperature);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      <Canvas camera={{ position: [9, 8, 12], fov: 42 }}>
        <MinimalClassroomScene />
      </Canvas>

      {/* In-Canvas Status Tag */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs flex items-center space-x-2 text-xs">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="font-semibold text-slate-800">Three.js / R3F Canvas Initialized</span>
        <span className="text-slate-400">|</span>
        <span className="text-slate-600">Occ: {occupancy}</span>
        <span className="text-slate-400">|</span>
        <span className="text-slate-600">{temperature.toFixed(1)}°C</span>
      </div>

      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs text-[11px] text-slate-500">
        Left Click + Drag to Orbit • Scroll to Zoom
      </div>
    </div>
  );
};
