import React from 'react';

/**
 * Modern acoustic drop ceiling grid structure.
 * Kept semi-open/frameless from the camera view angle so orbit camera can look down
 * inside the classroom without clipping, while supporting ceiling fans and light troffers.
 */
export const Ceiling: React.FC = () => {
  const roomWidth = 12.0;
  const roomDepth = 8.5;
  const ceilingHeight = 3.5;

  return (
    <group position={[0, ceilingHeight, 0]}>
      {/* Perimeter Crown Molding / Ceiling Rail */}
      {/* Front edge */}
      <mesh position={[0, -0.04, -roomDepth / 2]}>
        <boxGeometry args={[roomWidth, 0.08, 0.12]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.4} metalness={0.4} />
      </mesh>
      {/* Back edge */}
      <mesh position={[0, -0.04, roomDepth / 2]}>
        <boxGeometry args={[roomWidth, 0.08, 0.12]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.4} metalness={0.4} />
      </mesh>
      {/* Left edge */}
      <mesh position={[-roomWidth / 2, -0.04, 0]}>
        <boxGeometry args={[0.12, 0.08, roomDepth]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.4} metalness={0.4} />
      </mesh>
      {/* Right edge */}
      <mesh position={[roomWidth / 2, -0.04, 0]}>
        <boxGeometry args={[0.12, 0.08, roomDepth]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.4} metalness={0.4} />
      </mesh>

      {/* Structural Ceiling Cross Beams (T-Bar grid supporting lights & fans) */}
      <mesh position={[0, -0.02, -1.0]}>
        <boxGeometry args={[roomWidth, 0.04, 0.08]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[0, -0.02, 1.8]}>
        <boxGeometry args={[roomWidth, 0.04, 0.08]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[-2.6, -0.02, 0]}>
        <boxGeometry args={[0.08, 0.04, roomDepth]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[2.6, -0.02, 0]}>
        <boxGeometry args={[0.08, 0.04, roomDepth]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.5} />
      </mesh>
    </group>
  );
};
