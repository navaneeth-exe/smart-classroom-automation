import React from 'react';

/**
 * Modern institutional window with extruded aluminum frame,
 * cross mullions, and translucent tinted glass panel.
 */
interface WindowProps {
  position: [number, number, number];
  width?: number;
  height?: number;
}

export const Window: React.FC<WindowProps> = ({ 
  position, 
  width = 2.4, 
  height = 1.8 
}) => {
  const frameThickness = 0.08;
  const frameDepth = 0.14;

  return (
    <group position={position}>
      {/* Outer Aluminum Frame */}
      {/* Top Frame */}
      <mesh position={[0, height / 2 - frameThickness / 2, 0]}>
        <boxGeometry args={[width, frameThickness, frameDepth]} />
        <meshStandardMaterial color="#475569" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Bottom Frame / Sill */}
      <mesh position={[0, -height / 2 + frameThickness / 2, 0]}>
        <boxGeometry args={[width + 0.1, frameThickness * 1.5, frameDepth + 0.06]} />
        <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Left Frame */}
      <mesh position={[-width / 2 + frameThickness / 2, 0, 0]}>
        <boxGeometry args={[frameThickness, height, frameDepth]} />
        <meshStandardMaterial color="#475569" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Right Frame */}
      <mesh position={[width / 2 - frameThickness / 2, 0, 0]}>
        <boxGeometry args={[frameThickness, height, frameDepth]} />
        <meshStandardMaterial color="#475569" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Center Vertical Mullion */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[frameThickness * 0.7, height, frameDepth * 0.8]} />
        <meshStandardMaterial color="#475569" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Center Horizontal Mullion */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[width, frameThickness * 0.6, frameDepth * 0.7]} />
        <meshStandardMaterial color="#475569" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Translucent Double Glazing Glass Pane */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width - 0.05, height - 0.05, 0.02]} />
        <meshPhysicalMaterial 
          color="#bae6fd" 
          transmission={0.85} 
          opacity={0.65} 
          transparent={true} 
          roughness={0.1} 
          ior={1.45}
        />
      </mesh>
    </group>
  );
};
