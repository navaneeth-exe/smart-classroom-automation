import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

/**
 * 3-Blade Ceiling Fan with physics-based rotational inertia.
 *
 * fanSpeed (0–100%) → target angular velocity → smooth lerp with inertia model.
 * Deceleration is slower than acceleration (simulates real motor inertia + air friction).
 *
 * MAX_ANG_VEL = 28 rad/s (~267 RPM equivalent for 3D visual realism at 100% PWM)
 */

const MAX_ANG_VEL = 28; // rad/s at 100% PWM

interface CeilingFanProps {
  position: [number, number, number];
  fanSpeed?: number; // 0–100 (%)
  isSelected?: boolean;
  onClick?: () => void;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}

export const CeilingFan: React.FC<CeilingFanProps> = ({
  position,
  fanSpeed = 0,
  isSelected = false,
  onClick,
  onPointerOver,
  onPointerOut,
}) => {
  const bladeGroupRef = useRef<THREE.Group>(null);
  // Mutable ref to hold current angular velocity between frames (avoids React re-renders)
  const angularVelocityRef = useRef(0);
  const [hovered, setHovered] = React.useState(false);

  const downrodLength = 0.45;
  const bladeSpan = 0.85;

  useFrame((_, delta) => {
    if (!bladeGroupRef.current) return;

    // Clamp delta to avoid huge jumps on tab-unfocus
    const dt = Math.min(delta, 0.05);

    // Target angular velocity from fanSpeed (0–100 → 0–MAX_ANG_VEL rad/s)
    const targetVelocity = (fanSpeed / 100) * MAX_ANG_VEL;

    const current = angularVelocityRef.current;

    // Inertia model: acceleration faster than deceleration (motor physics)
    // Accelerating: factor 2.5 → snappy spin-up
    // Decelerating: factor 0.9 → slow coast-down like a real fan
    const inertiaFactor = targetVelocity > current ? 2.5 : 0.9;
    const next = current + (targetVelocity - current) * inertiaFactor * dt;

    angularVelocityRef.current = next;

    // Rotate blades around Y axis
    bladeGroupRef.current.rotation.y += next * dt;
  });

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onPointerOver?.();
      }}
      onPointerOut={() => {
        setHovered(false);
        onPointerOut?.();
      }}
    >
      {/* Selection / Hover Accent Ring */}
      {(isSelected || hovered) && (
        <mesh position={[0, -downrodLength / 2 - 0.05, 0]}>
          <ringGeometry args={[bladeSpan * 0.95, bladeSpan * 1.02, 32]} />
          <meshBasicMaterial 
            color={isSelected ? '#38bdf8' : '#94a3b8'} 
            transparent 
            opacity={isSelected ? 0.6 : 0.3} 
            side={THREE.DoubleSide} 
          />
        </mesh>
      )}

      {/* Ceiling Mounting Bracket / Canopy */}
      <mesh position={[0, downrodLength / 2, 0]}>
        <cylinderGeometry args={[0.1, 0.08, 0.06, 16]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Downrod Stem */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.018, 0.018, downrodLength, 12]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Central Motor Housing */}
      <mesh position={[0, -downrodLength / 2, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.1, 20]} />
        <meshStandardMaterial
          color={isSelected ? '#e0f2fe' : '#f8fafc'}
          roughness={0.2}
          metalness={0.3}
          emissive={isSelected ? '#0284c7' : (fanSpeed > 0 ? '#38bdf8' : '#000000')}
          emissiveIntensity={isSelected ? 0.35 : (fanSpeed > 0 ? Math.min(0.25, fanSpeed / 400) : 0)}
        />
      </mesh>

      {/* Lower Decorative Chrome Ring */}
      <mesh position={[0, -downrodLength / 2 - 0.04, 0]}>
        <cylinderGeometry args={[0.14, 0.02, 0.06, 20]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Subtle airflow vortex cone indicator when fan rotates */}
      {fanSpeed > 0 && (
        <mesh position={[0, -downrodLength / 2 - 0.45, 0]}>
          <cylinderGeometry args={[0.25, 0.65, 0.7, 16, 1, true]} />
          <meshBasicMaterial 
            color="#38bdf8" 
            transparent 
            opacity={Math.min(0.12, (fanSpeed / 100) * 0.12)} 
            wireframe 
            side={THREE.DoubleSide} 
          />
        </mesh>
      )}

      {/* Rotating Blade Assembly */}
      <group ref={bladeGroupRef} position={[0, -downrodLength / 2, 0]}>
        {/* Blade 1 (0°) */}
        <group rotation={[0, 0, 0]}>
          <mesh position={[0, 0, bladeSpan / 2 + 0.12]} rotation={[0.12, 0, 0]} castShadow>
            <boxGeometry args={[0.14, 0.008, bladeSpan]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.4} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0.1]}>
            <cylinderGeometry args={[0.008, 0.008, 0.12, 8]} />
            <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Blade 2 (120°) */}
        <group rotation={[0, (Math.PI * 2) / 3, 0]}>
          <mesh position={[0, 0, bladeSpan / 2 + 0.12]} rotation={[0.12, 0, 0]} castShadow>
            <boxGeometry args={[0.14, 0.008, bladeSpan]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.4} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0.1]}>
            <cylinderGeometry args={[0.008, 0.008, 0.12, 8]} />
            <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Blade 3 (240°) */}
        <group rotation={[0, (Math.PI * 4) / 3, 0]}>
          <mesh position={[0, 0, bladeSpan / 2 + 0.12]} rotation={[0.12, 0, 0]} castShadow>
            <boxGeometry args={[0.14, 0.008, bladeSpan]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.4} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0.1]}>
            <cylinderGeometry args={[0.008, 0.008, 0.12, 8]} />
            <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
