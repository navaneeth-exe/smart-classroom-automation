import React from 'react';

/**
 * Modern Classroom Front Presentation Wall:
 * - Large Matte Slate/Green Blackboard with wooden tray and chalk
 * - Interactive Smartboard / Projector Screen mounted next to it
 * - Displaying a technical architecture block diagram of the Smart Classroom Digital Twin
 */
interface BlackboardProps {
  onClick?: () => void;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}

export const Blackboard: React.FC<BlackboardProps> = ({
  onClick,
  onPointerOver,
  onPointerOut,
}) => {
  const boardWidth = 6.4;
  const boardHeight = 1.9;
  const zPos = -4.18; // Mounted on front wall (Z = -4.25)
  const yPos = 1.85;

  return (
    <group 
      position={[0, yPos, zPos]}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* Outer Aluminum / Wood Frame */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[boardWidth + 0.12, boardHeight + 0.12, 0.04]} />
        <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Main Board Surface (Dark Slate Green Academic Finish) */}
      <mesh position={[0, 0, 0.015]} receiveShadow>
        <planeGeometry args={[boardWidth, boardHeight]} />
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </mesh>

      {/* Smartboard Display Section (Center-Right Portion) */}
      <mesh position={[1.4, 0, 0.02]}>
        <planeGeometry args={[3.2, 1.7]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.3} />
      </mesh>

      {/* Smartboard Header Bar (Simulated UI) */}
      <mesh position={[1.4, 0.72, 0.025]}>
        <planeGeometry args={[3.0, 0.16]} />
        <meshBasicMaterial color="#1e3a8a" />
      </mesh>

      {/* Simulated Architecture Flowchart Boxes on Smartboard */}
      {/* Sensor Block */}
      <mesh position={[0.4, 0.15, 0.025]}>
        <planeGeometry args={[0.7, 0.4]} />
        <meshBasicMaterial color="#059669" />
      </mesh>
      {/* CPU / Logic Block */}
      <mesh position={[1.4, 0.15, 0.025]}>
        <planeGeometry args={[0.8, 0.45]} />
        <meshBasicMaterial color="#2563eb" />
      </mesh>
      {/* Actuator Block */}
      <mesh position={[2.4, 0.15, 0.025]}>
        <planeGeometry args={[0.7, 0.4]} />
        <meshBasicMaterial color="#d97706" />
      </mesh>

      {/* Chalkboard Section (Left Portion) - Formula & Notes */}
      {/* Simulated white chalk writing lines */}
      <mesh position={[-1.7, 0.45, 0.02]}>
        <planeGeometry args={[2.2, 0.03]} />
        <meshBasicMaterial color="#e2e8f0" />
      </mesh>
      <mesh position={[-1.8, 0.25, 0.02]}>
        <planeGeometry args={[2.0, 0.02]} />
        <meshBasicMaterial color="#cbd5e1" />
      </mesh>
      <mesh position={[-1.6, 0.05, 0.02]}>
        <planeGeometry args={[2.4, 0.02]} />
        <meshBasicMaterial color="#cbd5e1" />
      </mesh>
      <mesh position={[-2.0, -0.15, 0.02]}>
        <planeGeometry args={[1.6, 0.02]} />
        <meshBasicMaterial color="#cbd5e1" />
      </mesh>

      {/* Chalk / Marker Ledge Tray */}
      <mesh position={[0, -boardHeight / 2 - 0.04, 0.05]} castShadow>
        <boxGeometry args={[boardWidth, 0.04, 0.14]} />
        <meshStandardMaterial color="#475569" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Small Chalk sticks & Duster */}
      <mesh position={[-2.2, -boardHeight / 2 - 0.01, 0.06]}>
        <boxGeometry args={[0.2, 0.04, 0.08]} />
        <meshStandardMaterial color="#451a03" roughness={0.7} />
      </mesh>
      <mesh position={[-1.8, -boardHeight / 2 - 0.015, 0.06]}>
        <boxGeometry args={[0.08, 0.015, 0.015]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>
      <mesh position={[-1.68, -boardHeight / 2 - 0.015, 0.06]}>
        <boxGeometry args={[0.08, 0.015, 0.015]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.9} />
      </mesh>
    </group>
  );
};
