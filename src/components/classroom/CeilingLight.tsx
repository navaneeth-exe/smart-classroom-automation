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
  const bounceLightRef = useRef<THREE.PointLight>(null);
  const glowHaloRef = useRef<THREE.MeshBasicMaterial>(null);

  // Smooth transition: 300ms natural ramp
  useFrame((_, delta) => {
    const target = isOn ? 1.0 : 0.0;
    const current = currentIntensityRef.current;
    const next = current + (target - current) * Math.min(1, delta * 6.5);
    currentIntensityRef.current = next;

    // 1. Lens Material Emission & Diffuser Shading
    if (lensMaterialRef.current) {
      lensMaterialRef.current.emissiveIntensity = next * 2.2 * intensity;
      // High-contrast smooth interpolation between inactive slate-grey and bright warm-white LED glow
      if (next > 0.02) {
        lensMaterialRef.current.color.set('#ffffff');
        lensMaterialRef.current.emissive.set('#fff8e7'); // Natural 4000K commercial warm-white LED
        lensMaterialRef.current.roughness = THREE.MathUtils.lerp(0.6, 0.15, next);
      } else {
        lensMaterialRef.current.color.set('#64748b'); // Distinct unpowered frosted milky panel
        lensMaterialRef.current.emissive.set('#000000');
        lensMaterialRef.current.roughness = 0.6;
      }
    }

    // 2. Focused Downward Cone Spotlight (illuminates desks and floor directly below)
    if (spotLightRef.current) {
      spotLightRef.current.intensity = next * 3.2 * intensity;
    }

    // 3. Wide Diffuse Room Bounce (illuminates nearby walls, ceiling, and surrounding air)
    if (bounceLightRef.current) {
      bounceLightRef.current.intensity = next * 1.5 * intensity;
    }

    // 4. Subtle volumetric glow halo around fixture
    if (glowHaloRef.current) {
      glowHaloRef.current.opacity = next * 0.35 * (isSelected ? 1.4 : 1.0);
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
      {/* Aluminum Perimeter Housing Frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[trofferWidth + 0.08, trofferHeight, trofferDepth + 0.08]} />
        <meshStandardMaterial 
          color={isSelected ? '#fef08a' : '#e2e8f0'} 
          roughness={0.4} 
          metalness={0.3}
          emissive={isSelected ? '#eab308' : '#000000'}
          emissiveIntensity={isSelected ? 0.35 : 0}
        />
      </mesh>

      {/* Selection / Hover Indicator Outline */}
      {(isSelected || hovered) && (
        <mesh position={[0, -trofferHeight / 2 - 0.015, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[trofferWidth + 0.14, trofferDepth + 0.14]} />
          <meshBasicMaterial 
            color={isSelected ? '#eab308' : '#94a3b8'} 
            wireframe 
            transparent 
            opacity={isSelected ? 0.85 : 0.45} 
          />
        </mesh>
      )}

      {/* Frosted Acrylic LED Diffuser Lens Surface */}
      <mesh position={[0, -trofferHeight / 2 - 0.005, 0]}>
        <boxGeometry args={[trofferWidth, 0.01, trofferDepth]} />
        <meshStandardMaterial 
          ref={lensMaterialRef}
          color={isOn ? '#ffffff' : '#64748b'} 
          emissive={isOn ? '#fff8e7' : '#000000'}
          emissiveIntensity={isOn ? 2.2 * intensity : 0}
          roughness={isOn ? 0.15 : 0.6}
          toneMapped={false} // Prevents ACES tone mapping from crushing bright emissive glow
        />
      </mesh>

      {/* Soft Luminous Bloom / Glow Plane just below diffuser */}
      <mesh position={[0, -trofferHeight / 2 - 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[trofferWidth + 0.3, trofferDepth + 0.3]} />
        <meshBasicMaterial
          ref={glowHaloRef}
          color="#fef08a"
          transparent
          opacity={isOn ? 0.35 : 0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Architectural Downward Spotlight (Desks / Floor Illuminator) */}
      <spotLight
        ref={spotLightRef}
        position={[0, -0.06, 0]}
        target-position={[0, -3.5, 0]}
        angle={Math.PI / 3.2}
        penumbra={0.7}
        intensity={isOn ? 3.2 * intensity : 0}
        distance={6.5}
        color="#fffbeb"
        castShadow={false}
      />

      {/* Ambient Radial Bounce Light (Surrounding Air / Wall Spill) */}
      <pointLight
        ref={bounceLightRef}
        position={[0, -0.25, 0]}
        intensity={isOn ? 1.5 * intensity : 0}
        distance={4.5}
        decay={2}
        color="#fef9c3"
      />
    </group>
  );
};

