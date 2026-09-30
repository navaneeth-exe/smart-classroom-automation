/**
 * Domain types for Smart Classroom Digital Twin
 * (Simulation Mode Only - No Hardware Connected)
 */

export type OperatingMode = 'AUTO' | 'MANUAL';

export interface EnvironmentalState {
  temperature: number;       // Celsius (18.0 - 40.0)
  humidity: number;          // % RH (30.0 - 85.0)
  ambientLight: number;      // % (0 - 100)
  lightThreshold: number;    // Default 45%
  occupancy: number;         // Current student count
  maxCapacity: number;       // 20
  pirDetected: boolean;      // Motion status
  pirPulseTimestamp: number; // Last trigger time
}

export interface ActuatorState {
  mode: OperatingMode;
  lightState: boolean;       // Master relay
  lightIntensity: number;    // 0.0 - 1.0
  fanState: boolean;         // Relay status
  targetFanPwm: number;      // 0, 30, 60, 100 (%)
  currentFanPwm: number;     // Interpolated
  fanRpm: number;            // Estimated RPM
  manualLightSwitch: boolean;
  manualFanPwmSlider: number;
}

export type LogCategory = 'SENSOR' | 'ACTUATOR' | 'OCCUPANCY' | 'MODE' | 'SYSTEM';

export interface ActivityLogEntry {
  id: string;
  timestamp: Date;
  formattedTime: string;
  category: LogCategory;
  title: string;
  description: string;
  severity: 'info' | 'success' | 'warning' | 'alert';
}

export interface TelemetryPoint {
  timestamp: string;
  temperature: number;
  humidity: number;
  ambientLight: number;
  occupancy: number;
  fanPwm: number;
  lightActive: number;
}
