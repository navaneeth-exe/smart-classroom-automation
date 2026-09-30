import React from 'react';
import { Window } from './Window';
import { Door } from './Door';

/**
 * Renders the 4 perimeter walls of the classroom with cutouts
 * for the entrance door and large exterior daylight windows.
 * The front and back walls provide boundaries and surfaces for the blackboard,
 * posters, and clock.
 */
interface WallsProps {
  doorRotationY?: number;
}

export const Walls: React.FC<WallsProps> = ({ doorRotationY = 0 }) => {
  const roomWidth = 12.0;   // X axis (-6 to +6)
  const roomDepth = 8.5;    // Z axis (-4.25 to +4.25)
  const wallHeight = 3.5;   // Y axis (0 to 3.5)
  const wallThickness = 0.15;
  const wallColor = '#f8fafc'; // Clean academic off-white

  return (
    <group position={[0, 0, 0]}>
      {/* ========================================================
          1. FRONT WALL (Z = -4.25, hosts the Blackboard & Smartboard)
         ======================================================== */}
      <mesh position={[0, wallHeight / 2, -roomDepth / 2 - wallThickness / 2]} receiveShadow>
        <boxGeometry args={[roomWidth + wallThickness * 2, wallHeight, wallThickness]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} />
      </mesh>

      {/* Front Baseboard Trim */}
      <mesh position={[0, 0.06, -roomDepth / 2 + 0.01]}>
        <boxGeometry args={[roomWidth, 0.12, 0.02]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
      </mesh>

      {/* ========================================================
          2. REAR WALL (Z = +4.25, back of the classroom)
         ======================================================== */}
      <mesh position={[0, wallHeight / 2, roomDepth / 2 + wallThickness / 2]} receiveShadow>
        <boxGeometry args={[roomWidth + wallThickness * 2, wallHeight, wallThickness]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} />
      </mesh>

      {/* Rear Baseboard Trim */}
      <mesh position={[0, 0.06, roomDepth / 2 - 0.01]}>
        <boxGeometry args={[roomWidth, 0.12, 0.02]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
      </mesh>

      {/* ========================================================
          3. LEFT WALL (X = -6.0, Exterior Window Wall)
             Window wall with 2 large architectural daylight windows
         ======================================================== */}
      {/* Solid bottom wall portion beneath windows */}
      <mesh position={[-roomWidth / 2 - wallThickness / 2, 0.5, 0]} receiveShadow>
        <boxGeometry args={[wallThickness, 1.0, roomDepth]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} />
      </mesh>
      {/* Solid top wall portion above windows */}
      <mesh position={[-roomWidth / 2 - wallThickness / 2, 3.15, 0]} receiveShadow>
        <boxGeometry args={[wallThickness, 0.7, roomDepth]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} />
      </mesh>
      {/* Center column between the two windows */}
      <mesh position={[-roomWidth / 2 - wallThickness / 2, 1.9, 0]} receiveShadow>
        <boxGeometry args={[wallThickness, 1.8, 1.2]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} />
      </mesh>
      {/* Front corner pillar */}
      <mesh position={[-roomWidth / 2 - wallThickness / 2, 1.9, -roomDepth / 2 + 0.9]} receiveShadow>
        <boxGeometry args={[wallThickness, 1.8, 1.8]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} />
      </mesh>
      {/* Rear corner pillar */}
      <mesh position={[-roomWidth / 2 - wallThickness / 2, 1.9, roomDepth / 2 - 0.9]} receiveShadow>
        <boxGeometry args={[wallThickness, 1.8, 1.8]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} />
      </mesh>

      {/* Window 1 (Front exterior window) */}
      <group rotation={[0, Math.PI / 2, 0]}>
        <Window position={[-1.75, 1.9, -roomWidth / 2 - wallThickness / 2]} width={2.7} height={1.8} />
      </group>
      {/* Window 2 (Rear exterior window) */}
      <group rotation={[0, Math.PI / 2, 0]}>
        <Window position={[1.75, 1.9, -roomWidth / 2 - wallThickness / 2]} width={2.7} height={1.8} />
      </group>

      {/* ========================================================
          4. RIGHT WALL (X = +6.0, Corridor Wall with Entrance Door)
         ======================================================== */}
      {/* Front portion of corridor wall */}
      <mesh position={[roomWidth / 2 + wallThickness / 2, wallHeight / 2, -1.5]} receiveShadow>
        <boxGeometry args={[wallThickness, wallHeight, 5.5]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} />
      </mesh>
      {/* Above door transom wall */}
      <mesh position={[roomWidth / 2 + wallThickness / 2, 3.0, 2.5]} receiveShadow>
        <boxGeometry args={[wallThickness, 1.0, 1.4]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} />
      </mesh>
      {/* Rear portion of corridor wall */}
      <mesh position={[roomWidth / 2 + wallThickness / 2, wallHeight / 2, 3.75]} receiveShadow>
        <boxGeometry args={[wallThickness, wallHeight, 1.0]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} />
      </mesh>

      {/* Classroom Entrance Door Component */}
      <Door position={[roomWidth / 2 + wallThickness / 2, 0, 2.5]} rotationY={doorRotationY} />
    </group>
  );
};
