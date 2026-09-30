import React from 'react';
import { Grid } from '@react-three/drei';

export const Floor: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Main Floor Slab */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[12.6, 9.2]} />
        <meshStandardMaterial 
          color="#e2e8f0" 
          roughness={0.3} 
          metalness={0.05} 
        />
      </mesh>

      {/* Acoustic Floor Tile Grid Lines */}
      <group position={[0, 0.002, 0]}>
        <Grid
          args={[12.6, 9.2]}
          cellSize={0.6}
          cellThickness={0.8}
          cellColor="#cbd5e1"
          sectionSize={1.8}
          sectionThickness={1.2}
          sectionColor="#94a3b8"
          fadeDistance={25}
          fadeStrength={1}
        />
      </group>
    </group>
  );
};
