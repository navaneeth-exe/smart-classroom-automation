import React from 'react';
import { useFrame } from '@react-three/fiber';
import { useStudentStore } from '../../store/studentStore';

/**
 * Headless controller running inside R3F Canvas:
 * Subscribes to Three.js requestAnimationFrame delta loop
 * and drives smooth student walking, door rotation, and seating state updates.
 */
export const StudentAnimationController: React.FC = () => {
  const updateAnimation = useStudentStore((state) => state.updateAnimation);

  useFrame((_, delta) => {
    // Clamp delta to prevent huge jumps on tab-switching/lag spikes
    const clampedDelta = Math.min(delta, 0.1);
    updateAnimation(clampedDelta);
  });

  return null;
};
