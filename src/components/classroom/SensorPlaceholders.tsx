import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

/**
 * Procedural Sensor Enclosure Placeholders:
 * - Virtual PIR Motion Sensor: Mounted on ceiling near entrance door (X = 4.8, Y = 3.42, Z = 2.5)
 * - Virtual LDR Daylight Sensor: Mounted next to the window frame (X = -5.85, Y = 2.4, Z = 0)
 * - Virtual DHT22 Temp/Humidity Sensor: Mounted on classroom side wall (X = -5.85, Y = 1.6, Z = -2.5)
 * 
 * NOTE: These are visual models for the 3D digital twin. They are NOT connected to physical hardware.
 */
interface SensorPlaceholdersProps {
  pirDetected?: boolean;
  selectedSensor?: 'PIR' | 'LDR' | 'TEMPERATURE' | null;
  onPirClick?: () => void;
  onLdrClick?: () => void;
  onDht22Click?: () => void;
}

export const SensorPlaceholders: React.FC<SensorPlaceholdersProps> = ({
  pirDetected = false,
  selectedSensor = null,
  onPirClick,
  onLdrClick,
  onDht22Click,
}) => {
  const pulseRingRef = useRef<THREE.Mesh>(null);
  const pulseScaleRef = useRef(1);

  useFrame((_, delta) => {
    if (pulseRingRef.current) {
      if (pirDetected) {
        // Expand and loop pulse wave downward
        pulseScaleRef.current += delta * 2.2;
        if (pulseScaleRef.current > 3.0) {
          pulseScaleRef.current = 1.0;
        }
        const s = pulseScaleRef.current;
        pulseRingRef.current.scale.set(s, s, s);
        const mat = pulseRingRef.current.material as THREE.MeshBasicMaterial;
        if (mat) {
          mat.opacity = Math.max(0, 0.6 * (1 - (s - 1.0) / 2.0));
        }
      } else {
        pulseRingRef.current.scale.set(1, 1, 1);
        const mat = pulseRingRef.current.material as THREE.MeshBasicMaterial;
        if (mat) mat.opacity = 0;
      }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* ========================================================
          1. VIRTUAL PIR OCCUPANCY SENSOR (Ceiling near door)
         ======================================================== */}
      <group 
        position={[4.8, 3.44, 2.5]} 
        rotation={[Math.PI, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onPirClick?.();
        }}
      >
        {/* Selection Halo */}
        {selectedSensor === 'PIR' && (
          <mesh position={[0, 0.05, 0]}>
            <ringGeometry args={[0.15, 0.18, 32]} />
            <meshBasicMaterial color="#10b981" side={THREE.DoubleSide} />
          </mesh>
        )}

        {/* Base Ceiling Mounting Flange */}
        <mesh>
          <cylinderGeometry args={[0.09, 0.09, 0.02, 24]} />
          <meshStandardMaterial color={selectedSensor === 'PIR' ? '#ecfdf5' : '#ffffff'} roughness={0.3} />
        </mesh>

        {/* Faceted Fresnel Dome Lens */}
        <mesh position={[0, 0.03, 0]}>
          <sphereGeometry args={[0.065, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial 
            color={pirDetected ? '#d1fae5' : '#f8fafc'} 
            roughness={0.6}
            emissive={pirDetected ? '#10b981' : '#000000'}
            emissiveIntensity={pirDetected ? 0.3 : 0}
          />
        </mesh>

        {/* Dynamic Expanding PIR Detection Pulse Wave */}
        <mesh ref={pulseRingRef} position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.08, 0.11, 24]} />
          <meshBasicMaterial 
            color="#10b981" 
            transparent 
            opacity={0} 
            side={THREE.DoubleSide} 
          />
        </mesh>

        {/* PIR Small Status Indicator LED Ring */}
        <mesh position={[0, 0.045, 0.04]}>
          <cylinderGeometry args={[0.008, 0.008, 0.006, 8]} />
          <meshStandardMaterial 
            color={pirDetected ? '#10b981' : '#94a3b8'} 
            emissive={pirDetected ? '#10b981' : '#475569'} 
            emissiveIntensity={pirDetected ? 1.0 : 0.1} 
          />
        </mesh>
      </group>

      {/* ========================================================
          2. VIRTUAL LDR LIGHT SENSOR (Near exterior window)
         ======================================================== */}
      <group 
        position={[-5.86, 2.3, 0]} 
        rotation={[0, Math.PI / 2, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onLdrClick?.();
        }}
      >
        {/* Selection Halo */}
        {selectedSensor === 'LDR' && (
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[0.16, 0.2]} />
            <meshBasicMaterial color="#0284c7" wireframe />
          </mesh>
        )}

        {/* Compact Industrial Sensor Enclosure */}
        <mesh castShadow>
          <boxGeometry args={[0.09, 0.12, 0.04]} />
          <meshStandardMaterial color={selectedSensor === 'LDR' ? '#f0f9ff' : '#ffffff'} roughness={0.4} />
        </mesh>

        {/* Exposed Photocell Optical Window */}
        <mesh position={[0, 0.02, 0.022]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.006, 16]} />
          <meshStandardMaterial 
            color="#0284c7" 
            metalness={0.7} 
            roughness={0.2} 
            emissive={selectedSensor === 'LDR' ? '#0284c7' : '#000000'}
            emissiveIntensity={selectedSensor === 'LDR' ? 0.4 : 0}
          />
        </mesh>

        {/* Status Label Plate */}
        <mesh position={[0, -0.035, 0.022]}>
          <planeGeometry args={[0.065, 0.025]} />
          <meshBasicMaterial color="#334155" />
        </mesh>
      </group>

      {/* ========================================================
          3. VIRTUAL DHT22 TEMPERATURE / HUMIDITY SENSOR (Wall)
         ======================================================== */}
      <group 
        position={[-5.86, 1.6, -2.5]} 
        rotation={[0, Math.PI / 2, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onDht22Click?.();
        }}
      >
        {/* Selection Halo */}
        {selectedSensor === 'TEMPERATURE' && (
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[0.18, 0.22]} />
            <meshBasicMaterial color="#f97316" wireframe />
          </mesh>
        )}

        {/* Characteristic White Slotted Plastic Housing */}
        <mesh castShadow>
          <boxGeometry args={[0.1, 0.14, 0.038]} />
          <meshStandardMaterial color={selectedSensor === 'TEMPERATURE' ? '#fff7ed' : '#ffffff'} roughness={0.5} />
        </mesh>

        {/* Mesh Ventilation Louvers (Simulated slots) */}
        <mesh position={[0, 0.025, 0.02]}>
          <planeGeometry args={[0.07, 0.05]} />
          <meshBasicMaterial color="#64748b" />
        </mesh>

        {/* Mounting Tab & Wire Channel */}
        <mesh position={[0, -0.065, 0.01]}>
          <boxGeometry args={[0.04, 0.025, 0.015]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
};
