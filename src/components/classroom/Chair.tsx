import React from 'react';

/**
 * Modern ergonomic student chair:
 * - Contoured molded polypropylene plastic shell seat & backrest
 * - Welded tubular steel 4-leg frame with rubber feet
 */
interface ChairProps {
  position: [number, number, number];
  color?: string;
  rotationY?: number;
}

export const Chair: React.FC<ChairProps> = ({ 
  position, 
  color = '#2563eb', // Default academic royal blue
  rotationY = 0 
}) => {
  const seatHeight = 0.44;
  const legRadius = 0.012;
  const frameColor = '#64748b'; // Powder-coated steel

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* 4 Tubular Metal Legs */}
      {/* Front Left */}
      <mesh position={[-0.2, seatHeight / 2, -0.16]} castShadow>
        <cylinderGeometry args={[legRadius, legRadius, seatHeight, 8]} />
        <meshStandardMaterial color={frameColor} metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Front Right */}
      <mesh position={[0.2, seatHeight / 2, -0.16]} castShadow>
        <cylinderGeometry args={[legRadius, legRadius, seatHeight, 8]} />
        <meshStandardMaterial color={frameColor} metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Back Left */}
      <mesh position={[-0.2, seatHeight / 2, 0.16]} castShadow>
        <cylinderGeometry args={[legRadius, legRadius, seatHeight, 8]} />
        <meshStandardMaterial color={frameColor} metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Back Right */}
      <mesh position={[0.2, seatHeight / 2, 0.16]} castShadow>
        <cylinderGeometry args={[legRadius, legRadius, seatHeight, 8]} />
        <meshStandardMaterial color={frameColor} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Molded Ergonomic Seat Pan */}
      <mesh position={[0, seatHeight, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.44, 0.035, 0.42]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>

      {/* Vertical Spine Supports for Backrest */}
      <mesh position={[-0.14, seatHeight + 0.22, 0.18]} castShadow>
        <cylinderGeometry args={[legRadius, legRadius, 0.4, 8]} />
        <meshStandardMaterial color={frameColor} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.14, seatHeight + 0.22, 0.18]} castShadow>
        <cylinderGeometry args={[legRadius, legRadius, 0.4, 8]} />
        <meshStandardMaterial color={frameColor} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Contoured Backrest */}
      <mesh position={[0, seatHeight + 0.36, 0.18]} castShadow receiveShadow>
        <boxGeometry args={[0.42, 0.28, 0.03]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
    </group>
  );
};
