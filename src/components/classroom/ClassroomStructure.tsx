import React from 'react';
import { Floor } from './Floor';
import { Walls } from './Walls';
import { Ceiling } from './Ceiling';

interface ClassroomStructureProps {
  doorRotationY?: number;
}

export const ClassroomStructure: React.FC<ClassroomStructureProps> = ({ doorRotationY = 0 }) => {
  return (
    <group position={[0, 0, 0]}>
      <Floor />
      <Walls doorRotationY={doorRotationY} />
      <Ceiling />
    </group>
  );
};
