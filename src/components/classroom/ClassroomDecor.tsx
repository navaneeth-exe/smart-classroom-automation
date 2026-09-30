import React from 'react';

/**
 * Procedural Academic Classroom Decor:
 * - Analog Wall Clock mounted high on the front wall above the blackboard
 * - Modern Educational Infographic / Engineering Architecture Poster
 * - Indoor Potted Ficus / Plant in the corner for organic warmth
 * - Emergency Fire Extinguisher cabinet near the exit door
 */
export const ClassroomDecor: React.FC = React.memo(() => {
  return (
    <group position={[0, 0, 0]}>
      {/* ========================================================
          1. ANALOG WALL CLOCK (Front Wall, Center Top: Z = -4.18)
         ======================================================== */}
      <group position={[0, 3.05, -4.18]}>
        {/* Outer Circular Chrome Bezel */}
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.26, 0.26, 0.04, 32]} />
          <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* White Dial Face */}
        <mesh position={[0, 0, 0.022]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.23, 0.23, 0.01, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} />
        </mesh>
        {/* Hour Hand (Indicating 10 o'clock) */}
        <mesh position={[-0.04, 0.05, 0.03]} rotation={[0, 0, Math.PI / 3]}>
          <boxGeometry args={[0.015, 0.1, 0.005]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>
        {/* Minute Hand (Indicating 10:10) */}
        <mesh position={[0.05, 0.06, 0.03]} rotation={[0, 0, -Math.PI / 6]}>
          <boxGeometry args={[0.01, 0.15, 0.005]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>
        {/* Center Pin */}
        <mesh position={[0, 0, 0.032]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.01, 16]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
      </group>

      {/* ========================================================
          2. EDUCATIONAL POSTERS (Rear & Side Walls)
         ======================================================== */}
      {/* Poster 1: "Smart Energy Grid Architecture" (Back wall left) */}
      <group position={[-3.2, 2.0, 4.18]} rotation={[0, Math.PI, 0]}>
        {/* Frame */}
        <mesh>
          <boxGeometry args={[1.2, 1.6, 0.03]} />
          <meshStandardMaterial color="#334155" roughness={0.5} />
        </mesh>
        {/* Poster Paper */}
        <mesh position={[0, 0, 0.018]}>
          <planeGeometry args={[1.1, 1.5]} />
          <meshStandardMaterial color="#eff6ff" roughness={0.4} />
        </mesh>
        {/* Graphic Bars on Poster */}
        <mesh position={[0, 0.45, 0.02]}>
          <planeGeometry args={[0.9, 0.2]} />
          <meshBasicMaterial color="#1e40af" />
        </mesh>
        <mesh position={[0, 0.1, 0.02]}>
          <planeGeometry args={[0.85, 0.35]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>
        <mesh position={[0, -0.35, 0.02]}>
          <planeGeometry args={[0.85, 0.35]} />
          <meshBasicMaterial color="#059669" />
        </mesh>
      </group>

      {/* Poster 2: "IoT Sensor Nodes & Automation" (Back wall right) */}
      <group position={[3.2, 2.0, 4.18]} rotation={[0, Math.PI, 0]}>
        {/* Frame */}
        <mesh>
          <boxGeometry args={[1.2, 1.6, 0.03]} />
          <meshStandardMaterial color="#334155" roughness={0.5} />
        </mesh>
        {/* Poster Paper */}
        <mesh position={[0, 0, 0.018]}>
          <planeGeometry args={[1.1, 1.5]} />
          <meshStandardMaterial color="#f0fdf4" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.45, 0.02]}>
          <planeGeometry args={[0.9, 0.2]} />
          <meshBasicMaterial color="#065f46" />
        </mesh>
        <mesh position={[0, -0.1, 0.02]}>
          <planeGeometry args={[0.85, 0.7]} />
          <meshBasicMaterial color="#0d9488" />
        </mesh>
      </group>

      {/* ========================================================
          3. INDOOR CORNER PLANT (Front-Left Corner: X = -5.2, Z = -3.5)
         ======================================================== */}
      <group position={[-5.2, 0, -3.5]}>
        {/* Ceramic Planter Pot */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <cylinderGeometry args={[0.26, 0.18, 0.7, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        {/* Soil Base */}
        <mesh position={[0, 0.68, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.04, 16]} />
          <meshStandardMaterial color="#3e2723" roughness={0.9} />
        </mesh>
        {/* Plant Stems & Foliage */}
        <mesh position={[0, 0.95, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.03, 0.6, 8]} />
          <meshStandardMaterial color="#1b5e20" roughness={0.7} />
        </mesh>
        {/* Large Decorative Leaves */}
        <mesh position={[0.15, 1.15, 0.08]} rotation={[0.4, 0.2, -0.4]} castShadow>
          <boxGeometry args={[0.22, 0.01, 0.35]} />
          <meshStandardMaterial color="#2e7d32" roughness={0.5} />
        </mesh>
        <mesh position={[-0.14, 1.05, -0.1]} rotation={[-0.3, 0.4, 0.5]} castShadow>
          <boxGeometry args={[0.2, 0.01, 0.32]} />
          <meshStandardMaterial color="#388e3c" roughness={0.5} />
        </mesh>
        <mesh position={[0.08, 1.25, -0.12]} rotation={[-0.4, -0.3, -0.3]} castShadow>
          <boxGeometry args={[0.18, 0.01, 0.3]} />
          <meshStandardMaterial color="#1b5e20" roughness={0.5} />
        </mesh>
        <mesh position={[-0.05, 1.35, 0.1]} rotation={[0.3, -0.4, 0.2]} castShadow>
          <boxGeometry args={[0.2, 0.01, 0.32]} />
          <meshStandardMaterial color="#4caf50" roughness={0.5} />
        </mesh>
      </group>

      {/* ========================================================
          4. EMERGENCY FIRE EXTINGUISHER (Near Exit Door: X = 5.85, Z = 1.3)
         ======================================================== */}
      <group position={[5.85, 1.1, 1.3]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Red Pressurized Cylinder */}
        <mesh castShadow>
          <cylinderGeometry args={[0.09, 0.09, 0.48, 16]} />
          <meshStandardMaterial color="#dc2626" roughness={0.2} metalness={0.4} />
        </mesh>
        {/* Top Valve & Pressure Gauge */}
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.08, 12]} />
          <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.05, 0.28, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.03, 12]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.6} />
        </mesh>
        {/* Wall Mounting Bracket */}
        <mesh position={[0, 0, -0.1]}>
          <boxGeometry args={[0.14, 0.3, 0.03]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
});
