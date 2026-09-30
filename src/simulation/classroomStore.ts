import { create } from 'zustand';
import { 
  ClassroomSimulationState, 
  OperatingMode, 
  SimulationEvent, 
  SimulationEventType 
} from './simulationTypes';
import { DEFAULT_THRESHOLDS, INITIAL_SIMULATION_CONFIG } from './simulationRules';
import { 
  calculateFanState, 
  calculateLightState, 
  calculateOccupancyState, 
  calculateSystemStatus 
} from './automationEngine';
import { CLASSROOM_DESK_CONFIG } from '../components/classroom/classroomConfig';

// ============================================================
// Student & Animation Types (inline, no external dep cycle)
// ============================================================

export type StudentState = 'ENTERING' | 'WALKING_TO_DESK' | 'SITTING' | 'IDLE' | 'STANDING' | 'EXITING';

export interface StudentPalette {
  shirt: string;
  pants: string;
  skin: string;
  hair: string;
}

export const STUDENT_PALETTES: StudentPalette[] = [
  { shirt: '#3b82f6', pants: '#1e293b', skin: '#FDBCB4', hair: '#2d1b0e' },
  { shirt: '#10b981', pants: '#374151', skin: '#8B5E3C', hair: '#1a0e05' },
  { shirt: '#f59e0b', pants: '#1e293b', skin: '#FDBCB4', hair: '#3d2b1f' },
  { shirt: '#8b5cf6', pants: '#374151', skin: '#C68642', hair: '#0a0502' },
  { shirt: '#ef4444', pants: '#1e293b', skin: '#FDBCB4', hair: '#4a3728' },
  { shirt: '#06b6d4', pants: '#374151', skin: '#8B5E3C', hair: '#1a0e05' },
  { shirt: '#ec4899', pants: '#1e293b', skin: '#F4C2A1', hair: '#2d1b0e' },
  { shirt: '#6366f1', pants: '#374151', skin: '#C68642', hair: '#3d2b1f' },
];

export const ENTRANCE_COORDINATES = {
  outsideDoor: [6.8, 0, 2.5] as [number, number, number],
  insideDoor: [5.2, 0, 2.5] as [number, number, number],
};

export interface StudentData {
  id: string;
  deskId: number;
  state: StudentState;
  deskPosition: [number, number, number];
  chairPosition: [number, number, number];
  currentPosition: [number, number, number];
  rotationY: number;
  palette: StudentPalette;
  progress: number;
}

export interface ActivityLogEntry {
  id: string;
  category: 'OCCUPANCY' | 'ACTUATOR' | 'SENSOR' | 'MODE' | 'SYSTEM';
  title: string;
  description: string;
  formattedTime: string;
  timestamp: number;
}

// ============================================================
// Store Action Interface
// ============================================================

interface SimulationStoreActions {
  // Environmental updates
  setTemperature: (temp: number) => void;
  setHumidity: (rh: number) => void;
  setAmbientLight: (light: number) => void;
  
  // Occupancy updates (now also manages students)
  addStudent: () => void;
  removeStudent: () => void;
  resetClassroom: () => void;

  // Operating mode & Manual controls
  setMode: (mode: OperatingMode) => void;
  setManualLight: (on: boolean) => void;
  setManualFan: (on: boolean) => void;
  setManualFanPwm: (speed: number) => void;

  // System actions
  recalculateAutomation: () => void;
  resetSimulation: () => void;
  addEvent: (type: SimulationEventType, message: string, details?: Record<string, unknown>) => void;

  // Student animation
  setSelectedInfo: (info: UnifiedStore['selectedInfo']) => void;
  updateAnimation: (delta: number) => void;
  recordTelemetrySample: () => void;
}

export interface TelemetryHistorySample {
  timestamp: number;
  timeFormatted: string;
  temperature: number;
  occupancy: number;
  fanSpeed: number;
  lightIntensity: number;
  lightState: boolean;
  fanState: boolean;
}

export interface UnifiedStore extends ClassroomSimulationState, SimulationStoreActions {
  // Students & animation
  students: StudentData[];
  doorRotationY: number;
  selectedInfo: {
    title: string;
    category: string;
    description: string;
    details?: string;
    objectType?: 'FAN' | 'LIGHT' | 'PIR' | 'TEMPERATURE' | 'LDR' | 'STUDENT' | 'DESK' | 'BOARD' | 'OTHER';
    targetPosition?: [number, number, number];
  } | null;

  // Derived / convenience
  activityLogs: ActivityLogEntry[];

  // Analytics history samples (capped rolling window)
  telemetryHistory: TelemetryHistorySample[];
  recordTelemetrySample: () => void;
}

// ============================================================
// Helper: format event timestamp
// ============================================================
function formatTime(ts: number): string {
  const d = new Date(ts);
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  const s = String(d.getSeconds()).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function eventToLog(e: SimulationEvent): ActivityLogEntry {
  const catMap: Record<SimulationEventType, ActivityLogEntry['category']> = {
    STUDENT_ENTERED: 'OCCUPANCY',
    STUDENT_EXITED: 'OCCUPANCY',
    PIR_DETECTED: 'OCCUPANCY',
    PIR_INACTIVE: 'OCCUPANCY',
    LIGHT_ON: 'ACTUATOR',
    LIGHT_OFF: 'ACTUATOR',
    FAN_STARTED: 'ACTUATOR',
    FAN_STOPPED: 'ACTUATOR',
    FAN_SPEED_CHANGED: 'ACTUATOR',
    TEMPERATURE_CHANGED: 'SENSOR',
    HUMIDITY_CHANGED: 'SENSOR',
    AMBIENT_LIGHT_CHANGED: 'SENSOR',
    MODE_CHANGED: 'MODE',
    SHUTDOWN_TRIGGERED: 'SYSTEM',
    SYSTEM_RESET: 'SYSTEM',
  };

  return {
    id: e.id,
    category: catMap[e.type] ?? 'SYSTEM',
    title: e.type.replace(/_/g, ' '),
    description: e.message,
    formattedTime: formatTime(e.timestamp),
    timestamp: e.timestamp,
  };
}

// ============================================================
// Initial State
// ============================================================

let inactivityTimer: ReturnType<typeof setTimeout> | null = null;

const createInitialState = (): Omit<UnifiedStore, keyof SimulationStoreActions> => {
  const initEvent: SimulationEvent = {
    id: 'init-evt',
    type: 'SYSTEM_RESET',
    timestamp: Date.now(),
    message: 'Simulation Engine booted in AUTO mode. Virtual sensors online.',
  };
  return {
    // Env
    temperature: INITIAL_SIMULATION_CONFIG.defaultTemperature,
    humidity: INITIAL_SIMULATION_CONFIG.defaultHumidity,
    lightIntensity: INITIAL_SIMULATION_CONFIG.defaultLightIntensity,
    occupancy: INITIAL_SIMULATION_CONFIG.defaultOccupancy,
    maxOccupancy: INITIAL_SIMULATION_CONFIG.defaultMaxOccupancy,
    pirDetected: false,
    // Actuators
    lightState: false,
    fanState: false,
    fanSpeed: 0,
    // Control
    mode: 'AUTO',
    systemStatus: 'IDLE',
    thresholds: { ...DEFAULT_THRESHOLDS },
    lastUpdated: Date.now(),
    // Events & logs
    events: [initEvent],
    activityLogs: [eventToLog(initEvent)],
    // Manual
    manualLightState: false,
    manualFanState: false,
    manualFanSpeed: 0,
    // Students
    students: [],
    doorRotationY: 0,
    selectedInfo: null,
    // Telemetry history (seed with initial sample)
    telemetryHistory: [
      {
        timestamp: Date.now(),
        timeFormatted: formatTime(Date.now()),
        temperature: INITIAL_SIMULATION_CONFIG.defaultTemperature,
        occupancy: INITIAL_SIMULATION_CONFIG.defaultOccupancy,
        fanSpeed: 0,
        lightIntensity: INITIAL_SIMULATION_CONFIG.defaultLightIntensity,
        lightState: false,
        fanState: false,
      }
    ],
  };
};

// ============================================================
// Store
// ============================================================

export const useClassroomStore = create<UnifiedStore>((set, get) => ({
  ...createInitialState(),

  // ---- Telemetry History Sampling ----
  recordTelemetrySample: () => {
    const s = get();
    const now = Date.now();
    const newSample: TelemetryHistorySample = {
      timestamp: now,
      timeFormatted: formatTime(now),
      temperature: s.temperature,
      occupancy: s.occupancy,
      fanSpeed: s.fanSpeed,
      lightIntensity: s.lightIntensity,
      lightState: s.lightState,
      fanState: s.fanState,
    };
    // Keep last 100 historical samples
    set((state) => ({
      telemetryHistory: [...state.telemetryHistory.slice(-99), newSample],
    }));
  },

  // ---- Event logging ----
  addEvent: (type, message, details) => {
    const newEvent: SimulationEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type,
      timestamp: Date.now(),
      message,
      details,
    };
    const logEntry = eventToLog(newEvent);
    set((state) => ({
      events: [newEvent, ...state.events].slice(0, 100),
      activityLogs: [logEntry, ...state.activityLogs].slice(0, 100),
      lastUpdated: Date.now(),
    }));
  },

  // ---- Environmental ----
  setTemperature: (temp) => {
    const clamped = Math.max(INITIAL_SIMULATION_CONFIG.minTemperature, Math.min(INITIAL_SIMULATION_CONFIG.maxTemperature, temp));
    set({ temperature: clamped });
    get().addEvent('TEMPERATURE_CHANGED', `Temperature updated to ${clamped.toFixed(1)}°C`);
    get().recalculateAutomation();
  },

  setHumidity: (rh) => {
    const clamped = Math.max(INITIAL_SIMULATION_CONFIG.minHumidity, Math.min(INITIAL_SIMULATION_CONFIG.maxHumidity, rh));
    set({ humidity: clamped });
    get().addEvent('HUMIDITY_CHANGED', `Humidity updated to ${clamped.toFixed(0)}% RH`);
  },

  setAmbientLight: (light) => {
    const clamped = Math.max(INITIAL_SIMULATION_CONFIG.minLightIntensity, Math.min(INITIAL_SIMULATION_CONFIG.maxLightIntensity, light));
    set({ lightIntensity: clamped });
    get().addEvent('AMBIENT_LIGHT_CHANGED', `Ambient daylight updated to ${clamped.toFixed(0)}%`);
    get().recalculateAutomation();
  },

  // ---- Student / Occupancy ----
  addStudent: () => {
    const { students, occupancy, maxOccupancy } = get();
    if (occupancy >= maxOccupancy) return;

    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
      inactivityTimer = null;
    }

    // Find unoccupied desk
    const occupiedDeskIds = new Set(students.map((s) => s.deskId));
    const availableDesks = CLASSROOM_DESK_CONFIG.filter((d) => !occupiedDeskIds.has(d.id));
    if (availableDesks.length === 0) return;

    const assignedDesk = availableDesks[0];
    const newStudentId = `student-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const paletteIndex = students.length % STUDENT_PALETTES.length;
    const palette = STUDENT_PALETTES[paletteIndex];

    const newStudent: StudentData = {
      id: newStudentId,
      deskId: assignedDesk.id,
      state: 'ENTERING',
      deskPosition: assignedDesk.deskPosition,
      chairPosition: assignedDesk.chairPosition,
      currentPosition: [...ENTRANCE_COORDINATES.outsideDoor],
      rotationY: -Math.PI / 2,
      palette,
      progress: 0,
    };

    const nextOcc = occupancy + 1;
    set({
      students: [...students, newStudent],
      occupancy: nextOcc,
      pirDetected: true,
      systemStatus: 'ACTIVE',
    });

    get().addEvent('STUDENT_ENTERED', `Student entered. Occupancy: ${nextOcc}/${maxOccupancy}`);
    get().addEvent('PIR_DETECTED', `PIR Motion Detected (Occupancy: ${nextOcc})`);
    get().recalculateAutomation();
  },

  removeStudent: () => {
    const { students, occupancy, maxOccupancy, thresholds, mode } = get();
    if (occupancy <= 0) return;

    const candidate = [...students].reverse().find((s) => s.state === 'IDLE' || s.state === 'SITTING');
    if (!candidate) return;

    const nextOcc = occupancy - 1;
    set({
      students: students.map((s) =>
        s.id === candidate.id ? { ...s, state: 'STANDING' as StudentState, progress: 0 } : s
      ),
      occupancy: nextOcc,
      pirDetected: nextOcc > 0,
    });

    get().addEvent('STUDENT_EXITED', `Student exited. Remaining: ${nextOcc}/${maxOccupancy}`);

    if (nextOcc === 0) {
      get().addEvent('PIR_INACTIVE', 'Classroom vacant. PIR motion reset.');
      if (mode === 'AUTO') {
        set({ systemStatus: 'SHUTDOWN_PENDING' });
        if (inactivityTimer) clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
          set({ lightState: false, fanState: false, fanSpeed: 0, systemStatus: 'IDLE' });
          get().addEvent('SHUTDOWN_TRIGGERED', 'Classroom unoccupied. Automated power shutdown executed.');
          inactivityTimer = null;
        }, thresholds.inactivityDelayMs);
      }
    } else {
      get().recalculateAutomation();
    }
  },

  resetClassroom: () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
      inactivityTimer = null;
    }
    set(createInitialState());
    get().addEvent('SYSTEM_RESET', 'Simulation reset to factory default state.');
  },

  // ---- Mode & Manual Controls ----
  setMode: (mode) => {
    set({ mode });
    get().addEvent('MODE_CHANGED', `Operating mode switched to ${mode}`);
    if (mode === 'AUTO') {
      get().recalculateAutomation();
    } else {
      const { lightState, fanState, fanSpeed } = get();
      set({ manualLightState: lightState, manualFanState: fanState, manualFanSpeed: fanSpeed });
    }
  },

  setManualLight: (on) => {
    set({ manualLightState: on });
    if (get().mode === 'MANUAL') {
      set({ lightState: on });
      get().addEvent(on ? 'LIGHT_ON' : 'LIGHT_OFF', `Manual override: Lights turned ${on ? 'ON' : 'OFF'}`);
    }
  },

  setManualFan: (on) => {
    const speed = on ? (get().manualFanSpeed > 0 ? get().manualFanSpeed : 60) : 0;
    set({ manualFanState: on, manualFanSpeed: speed });
    if (get().mode === 'MANUAL') {
      set({ fanState: on, fanSpeed: speed });
      get().addEvent(on ? 'FAN_STARTED' : 'FAN_STOPPED', `Manual override: Fan ${on ? 'ON' : 'OFF'} (${speed}%)`);
    }
  },

  setManualFanPwm: (speed) => {
    const clamped = Math.max(0, Math.min(100, speed));
    const on = clamped > 0;
    set({ manualFanSpeed: clamped, manualFanState: on });
    if (get().mode === 'MANUAL') {
      set({ fanSpeed: clamped, fanState: on });
      get().addEvent('FAN_SPEED_CHANGED', `Manual override: Fan speed set to ${clamped}%`);
    }
  },

  // ---- Automation Recalculation ----
  recalculateAutomation: () => {
    const state = get();
    if (state.mode === 'MANUAL') return;

    const prevLight = state.lightState;
    const prevFanSpeed = state.fanSpeed;
    const prevFanState = state.fanState;

    const nextLight = calculateLightState(
      state.lightIntensity,
      state.occupancy,
      state.mode,
      state.thresholds,
      state.manualLightState
    );

    const { fanState: nextFanState, fanSpeed: nextFanSpeed } = calculateFanState(
      state.temperature,
      state.occupancy,
      state.mode,
      state.thresholds,
      { fanState: state.manualFanState, fanSpeed: state.manualFanSpeed }
    );

    const { pirDetected: nextPir } = calculateOccupancyState(state.occupancy);
    const nextStatus = calculateSystemStatus(state.occupancy, state.mode);

    set({
      lightState: nextLight,
      fanState: nextFanState,
      fanSpeed: nextFanSpeed,
      pirDetected: nextPir,
      systemStatus: nextStatus,
      lastUpdated: Date.now(),
    });

    if (prevLight !== nextLight) {
      get().addEvent(nextLight ? 'LIGHT_ON' : 'LIGHT_OFF', `Automated: Lights turned ${nextLight ? 'ON' : 'OFF'}`);
    }
    if (prevFanSpeed !== nextFanSpeed || prevFanState !== nextFanState) {
      if (nextFanSpeed === 0 && prevFanSpeed > 0) {
        get().addEvent('FAN_STOPPED', 'Automated fan: Fan stopped (0% PWM)');
      } else if (prevFanSpeed === 0 && nextFanSpeed > 0) {
        get().addEvent('FAN_STARTED', `Automated fan: Fan started at ${nextFanSpeed}% PWM`);
      } else if (prevFanSpeed !== nextFanSpeed) {
        get().addEvent('FAN_SPEED_CHANGED', `Automated fan: Speed updated to ${nextFanSpeed}% PWM`);
      }
    }
  },

  resetSimulation: () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
      inactivityTimer = null;
    }
    set(createInitialState());
    get().addEvent('SYSTEM_RESET', 'Simulation reset to factory default state.');
  },

  // ---- UI ----
  setSelectedInfo: (info) => set({ selectedInfo: info }),

  // ---- Student Animation (frame loop) ----
  updateAnimation: (delta: number) => {
    const { students, doorRotationY } = get();
    if (students.length === 0 && doorRotationY === 0) return;

    const SPEED = 0.55;
    let needsDoorOpen = false;
    const updatedStudents: StudentData[] = [];

    for (const student of students) {
      let s = { ...student };

      if (s.state === 'ENTERING') {
        needsDoorOpen = true;
        s.progress += delta * SPEED * 1.5;
        const t = Math.min(1, s.progress);
        s.currentPosition = [6.8 + (5.2 - 6.8) * t, 0, 2.5];
        s.rotationY = -Math.PI / 2;
        if (s.progress >= 1) {
          s.state = 'WALKING_TO_DESK';
          s.progress = 0;
        }
        updatedStudents.push(s);
      } else if (s.state === 'WALKING_TO_DESK') {
        s.progress += delta * SPEED * 0.9;
        const t = Math.min(1, s.progress);
        const targetX = s.chairPosition[0];
        const targetZ = s.chairPosition[2];

        if (t < 0.35) {
          const p1 = t / 0.35;
          s.currentPosition = [5.2 * (1 - p1), 0, 2.5];
          s.rotationY = -Math.PI / 2;
        } else if (t < 0.7) {
          const p2 = (t - 0.35) / 0.35;
          s.currentPosition = [0, 0, 2.5 + (targetZ - 2.5) * p2];
          s.rotationY = targetZ < 2.5 ? 0 : Math.PI;
        } else {
          const p3 = (t - 0.7) / 0.3;
          s.currentPosition = [targetX * p3, 0, targetZ];
          s.rotationY = targetX < 0 ? -Math.PI / 2 : Math.PI / 2;
        }

        if (s.progress >= 1) {
          s.state = 'SITTING';
          s.progress = 0;
          s.currentPosition = [...s.chairPosition];
          s.rotationY = Math.PI;
        }
        updatedStudents.push(s);
      } else if (s.state === 'SITTING') {
        s.progress += delta * SPEED * 2;
        s.rotationY = Math.PI;
        if (s.progress >= 1) {
          s.state = 'IDLE';
          s.progress = 0;
        }
        updatedStudents.push(s);
      } else if (s.state === 'IDLE') {
        updatedStudents.push(s);
      } else if (s.state === 'STANDING') {
        s.progress += delta * SPEED * 2;
        if (s.progress >= 1) {
          s.state = 'EXITING';
          s.progress = 0;
        }
        updatedStudents.push(s);
      } else if (s.state === 'EXITING') {
        s.progress += delta * SPEED * 0.9;
        const t = Math.min(1, s.progress);
        const startX = s.chairPosition[0];
        const startZ = s.chairPosition[2];

        if (t < 0.35) {
          const p1 = t / 0.35;
          s.currentPosition = [startX * (1 - p1), 0, startZ];
          s.rotationY = startX < 0 ? Math.PI / 2 : -Math.PI / 2;
        } else if (t < 0.7) {
          const p2 = (t - 0.35) / 0.35;
          s.currentPosition = [0, 0, startZ + (2.5 - startZ) * p2];
          s.rotationY = Math.PI;
        } else {
          needsDoorOpen = true;
          const p3 = (t - 0.7) / 0.3;
          s.currentPosition = [p3 * 6.8, 0, 2.5];
          s.rotationY = Math.PI / 2;
        }

        if (s.progress >= 1) continue; // Drop exited student
        updatedStudents.push(s);
      }
    }

    const targetDoorAngle = needsDoorOpen ? -1.35 : 0;
    const doorDiff = targetDoorAngle - doorRotationY;
    const nextDoorAngle = Math.abs(doorDiff) > 0.01
      ? doorRotationY + doorDiff * Math.min(1, delta * 6.0)
      : targetDoorAngle;

    set({ students: updatedStudents, doorRotationY: nextDoorAngle });
  },
}));
