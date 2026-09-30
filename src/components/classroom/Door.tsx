import React from 'react';

/**
 * Modern institutional entrance door with vision glass,
 * silver kickplate, and door handle.
 * Group pivot offset allows future rotation along Y-axis without restructuring.
 */
interface DoorProps {
  position?: [number, number, number];
  rotationY?: number; // Pre-configured for future animation (default 0 = closed)
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}

export const Door: React.FC<DoorProps> = ({ 
  position = [5.9, 0, 2.5], 
  rotationY = 0 
}) => {
  const doorWidth = 1.1;
  const doorHeight = 2.4;
  const doorThickness = 0.06;

  return (
    <group position={position}>
      {/* Outer Door Frame (Fixed) */}
      <mesh position={[0, doorHeight / 2, 0]}>
        <boxGeometry args={[doorThickness * 2, doorHeight + 0.1, doorWidth + 0.12]} />
        <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Door Leaf (Pivoting from the edge/hinge) */}
      <group position={[0, 0, -doorWidth / 2]} rotation={[0, rotationY, 0]}>
        {/* Offset child mesh so pivot point is at the hinge */}
        <group position={[0, doorHeight / 2, doorWidth / 2]}>
          {/* Main Door Slab (Oak wood / laminate finish) */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[doorThickness, doorHeight, doorWidth]} />
            <meshStandardMaterial color="#9a3412" roughness={0.5} />
          </mesh>

          {/* Narrow Vision Panel (Glass window on door) */}
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[doorThickness + 0.01, 0.9, 0.22]} />
            <meshPhysicalMaterial 
              color="#bae6fd" 
              transmission={0.8} 
              opacity={0.6} 
              transparent 
              roughness={0.1} 
            />
          </mesh>

          {/* Stainless Steel Kickplate */}
          <mesh position={[0, -doorHeight / 2 + 0.15, 0]}>
            <boxGeometry args={[doorThickness + 0.005, 0.3, doorWidth]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Door Handle / Push Bar */}
          <mesh position={[doorThickness / 2 + 0.04, 0, 0.38]}>
            <boxGeometry args={[0.03, 0.25, 0.04]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
