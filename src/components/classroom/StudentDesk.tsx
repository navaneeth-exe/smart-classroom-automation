import React from 'react';
import { Chair } from './Chair';

/**
 * Standard College Classroom Student Desk & Chair Unit:
 * - Natural laminated birch/oak wooden tabletop
 * - Heavy-gauge tubular steel legs with cross bracing
 * - Modesty panel / under-desk book storage basket
 * - Interactive hover state preparation for student placement
 */
interface StudentDeskProps {
  id: number;
  deskPosition: [number, number, number];
  chairPosition: [number, number, number];
  isOccupied?: boolean;
  chairColor?: string;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
  onClick?: () => void;
}

export const StudentDesk: React.FC<StudentDeskProps> = React.memo(({
  id,
  deskPosition,
  chairPosition,
  isOccupied: _isOccupied = false,
  chairColor,
  onPointerOver,
  onPointerOut,
  onClick,
}) => {
  const deskWidth = 0.95;
  const deskDepth = 0.55;
  const deskHeight = 0.74;
  const legRadius = 0.015;
  const woodColor = '#f59e0b'; // Warm natural oak
  const frameColor = '#334155'; // Dark slate steel frame

  // Pick diverse chair colors across rows to prevent monotone look
  const chairColorPalette = ['#2563eb', '#0d9488', '#4f46e5', '#0284c7'];
  const resolvedChairColor = chairColor || chairColorPalette[id % chairColorPalette.length];

  return (
    <group>
      {/* ----------------- Desk Group ----------------- */}
      <group 
        position={deskPosition}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        onClick={onClick}
      >
        {/* Tabletop Slab */}
        <mesh position={[0, deskHeight, 0]} castShadow receiveShadow>
          <boxGeometry args={[deskWidth, 0.03, deskDepth]} />
          <meshStandardMaterial color={woodColor} roughness={0.4} />
        </mesh>

        {/* Subtle tabletop bevel / dark edge banding */}
        <mesh position={[0, deskHeight - 0.015, 0]}>
          <boxGeometry args={[deskWidth + 0.005, 0.01, deskDepth + 0.005]} />
          <meshStandardMaterial color="#b45309" roughness={0.6} />
        </mesh>

        {/* 4 Tubular Metal Legs */}
        {/* Front Left */}
        <mesh position={[-deskWidth / 2 + 0.05, deskHeight / 2, -deskDepth / 2 + 0.05]} castShadow>
          <cylinderGeometry args={[legRadius, legRadius, deskHeight, 8]} />
          <meshStandardMaterial color={frameColor} metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Front Right */}
        <mesh position={[deskWidth / 2 - 0.05, deskHeight / 2, -deskDepth / 2 + 0.05]} castShadow>
          <cylinderGeometry args={[legRadius, legRadius, deskHeight, 8]} />
          <meshStandardMaterial color={frameColor} metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Back Left */}
        <mesh position={[-deskWidth / 2 + 0.05, deskHeight / 2, deskDepth / 2 - 0.05]} castShadow>
          <cylinderGeometry args={[legRadius, legRadius, deskHeight, 8]} />
          <meshStandardMaterial color={frameColor} metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Back Right */}
        <mesh position={[deskWidth / 2 - 0.05, deskHeight / 2, deskDepth / 2 - 0.05]} castShadow>
          <cylinderGeometry args={[legRadius, legRadius, deskHeight, 8]} />
          <meshStandardMaterial color={frameColor} metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Under-desk Wire Book Basket / Shelf */}
        <mesh position={[0, deskHeight - 0.14, 0]} castShadow>
          <boxGeometry args={[deskWidth - 0.16, 0.015, deskDepth - 0.14]} />
          <meshStandardMaterial color={frameColor} metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Desk Accessory: Student Notebook & Pen */}
        <group position={[-0.15, deskHeight + 0.02, 0.05]}>
          <mesh rotation={[0, 0.05, 0]}>
            <boxGeometry args={[0.22, 0.012, 0.28]} />
            <meshStandardMaterial color="#3b82f6" roughness={0.6} />
          </mesh>
          <mesh position={[0.18, 0.005, 0]} rotation={[0, -0.1, 0]}>
            <cylinderGeometry args={[0.004, 0.004, 0.14, 6]} />
            <meshStandardMaterial color="#e11d48" roughness={0.3} />
          </mesh>
        </group>
      </group>

      {/* ----------------- Chair Group ----------------- */}
      <Chair 
        position={chairPosition} 
        color={resolvedChairColor}
        rotationY={Math.PI} // Facing forward toward the blackboard
      />
    </group>
  );
});
