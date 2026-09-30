import React from 'react';

/**
 * Modern University Teacher Desk & Podium Station:
 * - Executive walnut/oak finish table with modesty panel
 * - Instructor ergonomic mesh high-back chair
 * - Teacher workstation laptop (open screen)
 * - Microphone / Lecture notes stand
 */
interface TeacherDeskProps {
  position?: [number, number, number];
}

export const TeacherDesk: React.FC<TeacherDeskProps> = ({ 
  position = [3.2, 0, -3.1] // Front right near the smartboard
}) => {
  const deskWidth = 1.5;
  const deskDepth = 0.75;
  const deskHeight = 0.76;
  const woodColor = '#78350f'; // Dark executive walnut
  const metalColor = '#1e293b';

  return (
    <group position={position}>
      {/* ---------------- Teacher Desk ---------------- */}
      {/* Main Tabletop */}
      <mesh position={[0, deskHeight, 0]} castShadow receiveShadow>
        <boxGeometry args={[deskWidth, 0.04, deskDepth]} />
        <meshStandardMaterial color={woodColor} roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Front Modesty Panel */}
      <mesh position={[0, deskHeight / 2 + 0.06, -deskDepth / 2 + 0.02]} castShadow receiveShadow>
        <boxGeometry args={[deskWidth - 0.06, 0.5, 0.02]} />
        <meshStandardMaterial color="#451a03" roughness={0.4} />
      </mesh>

      {/* Side Pedestal Panels */}
      <mesh position={[-deskWidth / 2 + 0.04, deskHeight / 2, 0]} castShadow>
        <boxGeometry args={[0.04, deskHeight, deskDepth - 0.04]} />
        <meshStandardMaterial color={metalColor} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[deskWidth / 2 - 0.04, deskHeight / 2, 0]} castShadow>
        <boxGeometry args={[0.04, deskHeight, deskDepth - 0.04]} />
        <meshStandardMaterial color={metalColor} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Desk Accessories: Open Laptop */}
      <group position={[0.2, deskHeight + 0.02, 0]} rotation={[0, -0.2, 0]}>
        {/* Laptop Base */}
        <mesh castShadow>
          <boxGeometry args={[0.32, 0.01, 0.22]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Laptop Screen (Angled open) */}
        <group position={[0, 0.01, -0.1]} rotation={[-0.3, 0, 0]}>
          <mesh position={[0, 0.1, 0]} castShadow>
            <boxGeometry args={[0.32, 0.2, 0.008]} />
            <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Illuminated Screen Display */}
          <mesh position={[0, 0.1, 0.005]}>
            <planeGeometry args={[0.3, 0.18]} />
            <meshBasicMaterial color="#0284c7" />
          </mesh>
        </group>
      </group>

      {/* Desk Accessories: Lecture Document Folder & Coffee Mug */}
      <mesh position={[-0.38, deskHeight + 0.015, -0.05]} rotation={[0, 0.1, 0]}>
        <boxGeometry args={[0.24, 0.015, 0.32]} />
        <meshStandardMaterial color="#059669" roughness={0.5} />
      </mesh>
      {/* Coffee Tumbler */}
      <mesh position={[-0.5, deskHeight + 0.06, 0.18]} castShadow>
        <cylinderGeometry args={[0.035, 0.03, 0.11, 12]} />
        <meshStandardMaterial color="#ea580c" roughness={0.3} />
      </mesh>

      {/* ---------------- Teacher Chair ---------------- */}
      {/* Swivel Executive Chair sitting behind the desk */}
      <group position={[0, 0, 0.65]} rotation={[0, Math.PI, 0]}>
        {/* Base Star Wheel Castors */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.28, 0.28, 0.04, 5]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Gas Lift Cylinder */}
        <mesh position={[0, 0.24, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.36, 12]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Contoured Seat */}
        <mesh position={[0, 0.46, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.08, 0.48]} />
          <meshStandardMaterial color="#1e293b" roughness={0.6} />
        </mesh>
        {/* High Ergonomic Mesh Backrest */}
        <mesh position={[0, 0.82, 0.22]} rotation={[-0.05, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.46, 0.65, 0.04]} />
          <meshStandardMaterial color="#0f172a" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
};
