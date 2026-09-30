import React from 'react';
import { StudentData } from '../../types/student';

interface StudentProps {
  data: StudentData;
  onClick?: () => void;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}

/**
 * Procedural 3D Student Character:
 * - Stylized academic low-poly college student.
 * - Dynamic posture interpolation based on state:
 *   - Standing / Walking: Height Y = 0, legs vertical, arms swinging.
 *   - Sitting: Torso lower (sitting on chair Y ~ 0.44), thighs horizontal, shins vertical.
 *   - Walking bobbing motion on Y-axis.
 */
export const Student: React.FC<StudentProps> = ({
  data,
  onClick,
  onPointerOver,
  onPointerOut,
}) => {
  const { currentPosition, rotationY, palette, state, progress } = data;
  const isSitting = state === 'IDLE' || state === 'SITTING';

  // Walk bobbing & limb swing angles
  const walkBob = (state === 'ENTERING' || state === 'WALKING_TO_DESK' || state === 'EXITING')
    ? Math.sin(progress * Math.PI * 10) * 0.04
    : 0;
  const legSwing = (state === 'ENTERING' || state === 'WALKING_TO_DESK' || state === 'EXITING')
    ? Math.sin(progress * Math.PI * 10) * 0.4
    : 0;

  // Base Y offset: seated students lower down to match chair pan height (0.44m)
  const baseY = isSitting ? 0.44 : 0.88 + walkBob;

  // Palette fields (from unified store: shirt, pants, skin, hair)
  const shirtColor = palette.shirt;
  const pantsColor = palette.pants;
  const skinColor = palette.skin;
  const hairColor = palette.hair;

  return (
    <group 
      position={[currentPosition[0], currentPosition[1] + (isSitting ? 0 : walkBob), currentPosition[2]]}
      rotation={[0, rotationY, 0]}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* ---------------- 1. HEAD & HAIR ---------------- */}
      <group position={[0, baseY + 0.58, 0]}>
        {/* Head / Face */}
        <mesh castShadow>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.5} />
        </mesh>

        {/* Stylized Hair Cap */}
        <mesh position={[0, 0.04, -0.02]} castShadow>
          <sphereGeometry args={[0.135, 14, 14, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
          <meshStandardMaterial color={hairColor} roughness={0.8} />
        </mesh>
      </group>

      {/* ---------------- 2. TORSO & CLOTHES ---------------- */}
      <group position={[0, baseY + 0.28, 0]}>
        {/* Shirt / Torso */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.36, 0.18]} />
          <meshStandardMaterial color={shirtColor} roughness={0.6} />
        </mesh>

        {/* Small Backpack (worn on back) */}
        <mesh position={[0, 0, -0.12]} castShadow>
          <boxGeometry args={[0.22, 0.28, 0.1]} />
          <meshStandardMaterial color={shirtColor} roughness={0.7} opacity={0.8} transparent />
        </mesh>
      </group>

      {/* ---------------- 3. ARMS ---------------- */}
      {/* Left Arm */}
      <mesh 
        position={[-0.18, baseY + 0.28, isSitting ? 0.08 : 0]} 
        rotation={[isSitting ? -Math.PI / 3 : legSwing, 0, 0]} 
        castShadow
      >
        <cylinderGeometry args={[0.035, 0.03, 0.3, 8]} />
        <meshStandardMaterial color={shirtColor} roughness={0.6} />
      </mesh>
      {/* Right Arm */}
      <mesh 
        position={[0.18, baseY + 0.28, isSitting ? 0.08 : 0]} 
        rotation={[isSitting ? -Math.PI / 3 : -legSwing, 0, 0]} 
        castShadow
      >
        <cylinderGeometry args={[0.035, 0.03, 0.3, 8]} />
        <meshStandardMaterial color={shirtColor} roughness={0.6} />
      </mesh>

      {/* ---------------- 4. LEGS & FEET ---------------- */}
      {isSitting ? (
        /* Seated Leg Pose: Thighs forward, shins downward */
        <group position={[0, baseY + 0.08, 0]}>
          {/* Left Thigh */}
          <mesh position={[-0.08, 0, 0.14]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.045, 0.04, 0.28, 8]} />
            <meshStandardMaterial color={pantsColor} roughness={0.7} />
          </mesh>
          {/* Left Shin */}
          <mesh position={[-0.08, -0.22, 0.26]} castShadow>
            <cylinderGeometry args={[0.038, 0.035, 0.36, 8]} />
            <meshStandardMaterial color={pantsColor} roughness={0.7} />
          </mesh>
          {/* Left Shoe */}
          <mesh position={[-0.08, -0.42, 0.29]} castShadow>
            <boxGeometry args={[0.07, 0.05, 0.14]} />
            <meshStandardMaterial color="#18181b" roughness={0.4} />
          </mesh>

          {/* Right Thigh */}
          <mesh position={[0.08, 0, 0.14]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.045, 0.04, 0.28, 8]} />
            <meshStandardMaterial color={pantsColor} roughness={0.7} />
          </mesh>
          {/* Right Shin */}
          <mesh position={[0.08, -0.22, 0.26]} castShadow>
            <cylinderGeometry args={[0.038, 0.035, 0.36, 8]} />
            <meshStandardMaterial color={pantsColor} roughness={0.7} />
          </mesh>
          {/* Right Shoe */}
          <mesh position={[0.08, -0.42, 0.29]} castShadow>
            <boxGeometry args={[0.07, 0.05, 0.14]} />
            <meshStandardMaterial color="#18181b" roughness={0.4} />
          </mesh>
        </group>
      ) : (
        /* Standing / Walking Leg Pose */
        <group position={[0, baseY, 0]}>
          {/* Left Leg */}
          <mesh 
            position={[-0.08, -0.4, 0]} 
            rotation={[-legSwing, 0, 0]} 
            castShadow
          >
            <cylinderGeometry args={[0.045, 0.035, 0.76, 8]} />
            <meshStandardMaterial color={pantsColor} roughness={0.7} />
          </mesh>
          {/* Left Shoe */}
          <mesh 
            position={[-0.08, -0.8, -legSwing * 0.3 + 0.03]} 
            castShadow
          >
            <boxGeometry args={[0.07, 0.05, 0.14]} />
            <meshStandardMaterial color="#18181b" roughness={0.4} />
          </mesh>

          {/* Right Leg */}
          <mesh 
            position={[0.08, -0.4, 0]} 
            rotation={[legSwing, 0, 0]} 
            castShadow
          >
            <cylinderGeometry args={[0.045, 0.035, 0.76, 8]} />
            <meshStandardMaterial color={pantsColor} roughness={0.7} />
          </mesh>
          {/* Right Shoe */}
          <mesh 
            position={[0.08, -0.8, legSwing * 0.3 + 0.03]} 
            castShadow
          >
            <boxGeometry args={[0.07, 0.05, 0.14]} />
            <meshStandardMaterial color="#18181b" roughness={0.4} />
          </mesh>
        </group>
      )}
    </group>
  );
};
