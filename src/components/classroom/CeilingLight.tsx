import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

/**
 * Modern Recessed LED Troffer Light Fixture:
 * - Powder-coated white aluminum perimeter housing
 * - Frosted acrylic diffuser lens with emissive glow capability
 * - Smooth transition interpolation for brightness and emissive levels
 * - Downward conical spotlight illumination
 */
interface CeilingLightProps {
  position: [number, number, number];
  isOn?: boolean;
  intensity?: number;
  isSelected?: boolean;
  onClick?: () => void;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}

export const CeilingLight: React.FC<CeilingLightProps> = ({ 
  position, 
  isOn = true, 
  intensity = 1.0,
  isSelected = false,
  onClick,
  onPointerOver,
  onPointerOut,
}) => {
  const trofferWidth = 1.4;
  const trofferDepth = 0.55;
  const trofferHeight = 0.08;

  const [hovered, setHovered] = React.useState(false);
  const currentIntensityRef = useRef(isOn ? 1.0 : 0.0);
  const lensMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const spotLightRef = useRef<THREE.SpotLight>(null);

  useFrame((_, delta) => {
    const target = isOn ? 1.0 : 0.0;
    const current = currentIntensityRef.current;
    // Smooth fade: 350ms ramp-up / ramp-down
    const next = current + (target - current) * Math.min(1, delta * 6.0);
    currentIntensityRef.current = next;

    if (lensMaterialRef.current) {
      lensMaterialRef.current.emissiveIntensity = next * 0.7 * intensity;
      // Interpolate color from off-slate to warm glowing white
      if (next > 0.01) {
        lensMaterialRef.current.color.set('#fffbeb');
        lensMaterialRef.current.emissive.set('#fef08a');
      } else {
        lensMaterialRef.current.color.set('#94a3b8');
        lensMaterialRef.current.emissive.set('#000000');
      }
    }

    if (spotLightRef.current) {
      spotLightRef.current.intensity = next * 1.3 * intensity;
    }
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
      {/* Aluminum Perimeter Housing */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[trofferWidth + 0.06, trofferHeight, trofferDepth + 0.06]} />
        <meshStandardMaterial 
          color={isSelected ? '#fef08a' : '#ffffff'} 
          roughness={0.3} 
          metalness={0.2}
          emissive={isSelected ? '#eab308' : '#000000'}
          emissiveIntensity={isSelected ? 0.3 : 0}
        />
      </mesh>

      {/* Selection / Hover Indicator Outline */}
      {(isSelected || hovered) && (
        <mesh position={[0, -trofferHeight / 2 - 0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[trofferWidth + 0.12, trofferDepth + 0.12]} />
          <meshBasicMaterial 
            color={isSelected ? '#eab308' : '#cbd5e1'} 
            wireframe 
            transparent 
            opacity={isSelected ? 0.8 : 0.4} 
          />
        </mesh>
      )}

      {/* Frosted Acrylic Diffuser Lens */}
      <mesh position={[0, -trofferHeight / 2 - 0.005, 0]}>
        <boxGeometry args={[trofferWidth, 0.01, trofferDepth]} />
        <meshStandardMaterial 
          ref={lensMaterialRef}
          color={isOn ? '#fffbeb' : '#94a3b8'} 
          emissive={isOn ? '#fef08a' : '#000000'}
          emissiveIntensity={isOn ? 0.6 * intensity : 0}
          roughness={0.2} 
        />
      </mesh>

      {/* Architectural Downward Spotlight */}
      <spotLight
        ref={spotLightRef}
        position={[0, -0.05, 0]}
        target-position={[0, -3.5, 0]}
        angle={Math.PI / 3.5}
        penumbra={0.6}
        intensity={isOn ? 1.2 * intensity : 0}
        distance={6}
        color="#fffbeb"
        castShadow={false}
      />
    </group>
  );
};
