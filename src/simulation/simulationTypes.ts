/**
 * Core Simulation Engine Types
 * Pure TypeScript definitions for the Smart Classroom Digital Twin
 * (Simulation Mode Only - No Hardware Connected)
 */

export type OperatingMode = 'AUTO' | 'MANUAL';

export type SystemStatus = 'IDLE' | 'ACTIVE' | 'SHUTDOWN_PENDING';

export type SimulationEventType = 
  | 'STUDENT_ENTERED'
  | 'STUDENT_EXITED'
  | 'PIR_DETECTED'
  | 'PIR_INACTIVE'
  | 'LIGHT_ON'
  | 'LIGHT_OFF'
  | 'FAN_STARTED'
  | 'FAN_STOPPED'
  | 'FAN_SPEED_CHANGED'
  | 'TEMPERATURE_CHANGED'
  | 'HUMIDITY_CHANGED'
  | 'AMBIENT_LIGHT_CHANGED'
  | 'MODE_CHANGED'
  | 'SHUTDOWN_TRIGGERED'
  | 'SYSTEM_RESET';

export interface SimulationEvent {
  id: string;
  type: SimulationEventType;
  timestamp: number;
  message: string;
  details?: Record<string, unknown>;
}

export interface AutomationThresholds {
  fanLowTemp: number;       // Default: 25°C
  fanMedTemp: number;       // Default: 30°C
  fanHighTemp: number;      // Default: 35°C
  lightThreshold: number;   // Default: 40% (below this, lights turn ON if occupied)
  inactivityDelayMs: number;// Default: 3000ms before empty classroom shutdown
}

export interface ClassroomSimulationState {
  // Environmental readings (Simulated sensors)
  temperature: number;      // 18.0 - 40.0 °C
  humidity: number;         // 30 - 90 % RH
  lightIntensity: number;   // 0 - 100 % (Ambient LDR daylight)
  occupancy: number;        // 0 - maxOccupancy
  maxOccupancy: number;     // Configurable (default 16 or 30)
  pirDetected: boolean;     // Motion state

  // Actuator states
  lightState: boolean;      // Master lighting relay
  fanState: boolean;        // Motor relay
  fanSpeed: number;         // 0, 30, 60, 100 (%)

  // System controls
  mode: OperatingMode;
  systemStatus: SystemStatus;
  thresholds: AutomationThresholds;
  lastUpdated: number;
  events: SimulationEvent[];

  // Manual overrides (held while in MANUAL mode)
  manualLightState: boolean;
  manualFanState: boolean;
  manualFanSpeed: number;
}
