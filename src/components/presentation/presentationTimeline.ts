import { CAMERA_PRESETS } from '../classroom/classroomConfig';
import { useClassroomStore } from '../../store/classroomStore';

export interface PresentationScene {
  id: number;
  label: string;
  title: string;
  badge: string;
  cameraPreset: keyof typeof CAMERA_PRESETS;
  durationSeconds: number;
  description: string;
  details: string[];
  action: () => void;
}

/**
 * 13-Scene Cinematic Automation Workflow
 *
 * Each step strictly drives the Zustand simulation store (Single Source of Truth),
 * allowing the automation engine, physical interpolation, and 3D classroom
 * to react naturally as designed.
 */
export const PRESENTATION_SCENES: PresentationScene[] = [
  {
    id: 1,
    label: 'Empty',
    title: 'Empty Classroom',
    badge: 'SCENE 01 — IDLE BASELINE',
    cameraPreset: 'overview',
    durationSeconds: 5,
    description: 'Classroom starts empty. All lights and fans are OFF. PIR sensor is idle.',
    details: [
      'Occupancy = 0 occupants',
      'PIR Passive Infrared: Inactive',
      'Ambient Light: 65% (Natural Day)',
      'Actuators: Relays OPEN (0W draw)',
    ],
    action: () => {
      const store = useClassroomStore.getState();
      store.resetSimulation();
      store.setAmbientLight(65);
      store.setTemperature(24);
      store.setMode('AUTO');
    },
  },
  {
    id: 2,
    label: 'Arrival',
    title: 'Student Arrives',
    badge: 'SCENE 02 — ENTRY EVENT',
    cameraPreset: 'entrance',
    durationSeconds: 6,
    description: 'Classroom door swings open. A student enters the room, walks down the aisle, and takes a seat.',
    details: [
      'Door kinematics animated',
      'Student waypoint navigation',
      'Occupancy counter increments to 1',
    ],
    action: () => {
      const store = useClassroomStore.getState();
      store.setMode('AUTO');
      store.addStudent();
    },
  },
  {
    id: 3,
    label: 'PIR Sensor',
    title: 'Occupancy Detected',
    badge: 'SCENE 03 — MOTION DETECTION',
    cameraPreset: 'pir',
    durationSeconds: 6,
    description: 'PIR motion sensor detects human presence near the entrance and latches active.',
    details: [
      'PIR sensor lens turns active teal',
      'Telemetry latch: Occupancy Confirmed',
      'Controller starts presence keep-alive timer',
    ],
    action: () => {
      const store = useClassroomStore.getState();
      // Ensure student is seated and PIR active
      if (store.occupancy === 0) store.addStudent();
    },
  },
  {
    id: 4,
    label: 'Low Light',
    title: 'Low Ambient Light',
    badge: 'SCENE 04 — SENSOR TRIGGER',
    cameraPreset: 'overview',
    durationSeconds: 5,
    description: 'External daylight drops below threshold (40% lux). The LDR sensor reports insufficient light.',
    details: [
      'Daylight lux reduces to 18%',
      'LDR photoresistor reads dark condition',
      'Room lighting condition: Insufficient',
    ],
    action: () => {
      const store = useClassroomStore.getState();
      store.setAmbientLight(18);
    },
  },
  {
    id: 5,
    label: 'Auto Light',
    title: 'Automatic Lighting Activation',
    badge: 'SCENE 05 — ACTUATION',
    cameraPreset: 'lights',
    durationSeconds: 7,
    description: 'Ceiling lights automatically activate when occupancy is detected and ambient light is insufficient.',
    details: [
      'Dual-condition satisfied: Occupancy > 0 AND Light < 40%',
      'Solid-state relay latches ON',
      '6 ceiling troffers illuminate room to 100%',
    ],
    action: () => {
      const store = useClassroomStore.getState();
      // Re-affirm auto state
      store.setAmbientLight(15);
      if (store.occupancy === 0) store.addStudent();
    },
  },
  {
    id: 6,
    label: 'Temp Rise',
    title: 'Temperature Rises',
    badge: 'SCENE 06 — THERMAL DYNAMICS',
    cameraPreset: 'dht22',
    durationSeconds: 6,
    description: 'DHT22 environmental sensor registers thermal increase. Fan initially remains OFF below 25°C.',
    details: [
      'DHT22 reads 24.5°C',
      'Comfort threshold: < 25°C (Idle band)',
      'PWM Fan Driver: 0% (Standby)',
    ],
    action: () => {
      const store = useClassroomStore.getState();
      store.setTemperature(24.5);
    },
  },
  {
    id: 7,
    label: 'Fan 30%',
    title: 'Fan Low Speed (30% PWM)',
    badge: 'SCENE 07 — SOFT COOLING',
    cameraPreset: 'fan',
    durationSeconds: 6,
    description: 'Room temperature reaches 27°C. Automation engine engages ceiling fans at low speed (30%).',
    details: [
      'DHT22 Temperature = 27.0°C (25–30°C bracket)',
      'PWM Duty Cycle = 30%',
      'Quad fan array spins at gentle 180 RPM',
    ],
    action: () => {
      const store = useClassroomStore.getState();
      store.setTemperature(27.0);
    },
  },
  {
    id: 8,
    label: 'Fan 60%',
    title: 'Fan Medium Speed (60% PWM)',
    badge: 'SCENE 08 — MODERATE COOLING',
    cameraPreset: 'fan',
    durationSeconds: 6,
    description: 'Thermal load increases to 32°C. Ceiling fan accelerates visibly to 60% speed.',
    details: [
      'DHT22 Temperature = 32.0°C (30–35°C bracket)',
      'PWM Duty Cycle = 60%',
      'Noticeably faster aerodynamic rotation',
    ],
    action: () => {
      const store = useClassroomStore.getState();
      store.setTemperature(32.0);
    },
  },
  {
    id: 9,
    label: 'Fan 100%',
    title: 'Fan Maximum Speed (100% PWM)',
    badge: 'SCENE 09 — MAXIMUM COOLING',
    cameraPreset: 'fan',
    durationSeconds: 6,
    description: 'Temperature reaches 37°C. System activates emergency maximum cooling (100% full speed).',
    details: [
      'DHT22 Temperature = 37.0°C (> 35°C high thermal)',
      'PWM Duty Cycle = 100% (Full Power)',
      'Maximum airflow velocity achieved',
    ],
    action: () => {
      const store = useClassroomStore.getState();
      store.setTemperature(37.0);
    },
  },
  {
    id: 10,
    label: 'Departure',
    title: 'Students Leave',
    badge: 'SCENE 10 — DISMISSAL EVENT',
    cameraPreset: 'entrance',
    durationSeconds: 6,
    description: 'Class dismisses. Student stands, walks to the entrance door, and exits the classroom.',
    details: [
      'Student standing and exit walking animation',
      'Door swings open for departure',
      'Occupancy counter drops',
    ],
    action: () => {
      const store = useClassroomStore.getState();
      const count = store.occupancy;
      for (let i = 0; i < count; i++) {
        store.removeStudent();
      }
    },
  },
  {
    id: 11,
    label: 'No Occupancy',
    title: 'Empty Classroom Detected',
    badge: 'SCENE 11 — VACANCY LATCH',
    cameraPreset: 'pir',
    durationSeconds: 5,
    description: 'Classroom occupancy drops to 0. PIR sensor reports no active presence. Countdown starts.',
    details: [
      'Occupancy = 0 occupants',
      'PIR sensor latches inactive (gray/idle)',
      'Inactivity timeout armed',
    ],
    action: () => {
      const store = useClassroomStore.getState();
      const count = store.occupancy;
      for (let i = 0; i < count; i++) {
        store.removeStudent();
      }
    },
  },
  {
    id: 12,
    label: 'Shutdown',
    title: 'Automatic Energy-Saving Shutdown',
    badge: 'SCENE 12 — POWER CONSERVATION',
    cameraPreset: 'overview',
    durationSeconds: 6,
    description: 'With zero occupancy confirmed, automation cuts power to all lighting and fan circuits.',
    details: [
      'Ceiling lights shut down (0W)',
      'Fans decelerate to complete stop (0W)',
      'Zero waste power consumption achieved',
    ],
    action: () => {
      const store = useClassroomStore.getState();
      store.setAmbientLight(50);
      store.setTemperature(24);
      // store recalculation sets fan to 0 and lights to false because occupancy = 0
    },
  },
  {
    id: 13,
    label: 'Overview',
    title: 'Smart Classroom Automation Complete',
    badge: 'SCENE 13 — SUMMARY',
    cameraPreset: 'overview',
    durationSeconds: 10,
    description: 'The smart digital twin demonstrates full closed-loop sensing, logic processing, and actuator control.',
    details: [
      '✓ Real-time Occupancy Detection (PIR & kinematics)',
      '✓ Ambient-Aware Smart Lighting Automation',
      '✓ Multi-Stage Proportional Temperature Fan Control',
      '✓ Automated Inactivity Power Conservation',
    ],
    action: () => {
      const store = useClassroomStore.getState();
      store.setMode('AUTO');
    },
  },
];
