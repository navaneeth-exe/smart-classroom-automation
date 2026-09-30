import { AutomationThresholds, OperatingMode } from './simulationTypes';

/**
 * Pure calculation function for Fan Actuator state & speed.
 * 
 * In AUTO Mode:
 *   If occupancy == 0: Fan OFF, Speed 0% (Shutdown)
 *   If temp < 25°C: Fan OFF, Speed 0%
 *   If 25°C <= temp < 30°C: Fan ON, Speed 30% (LOW)
 *   If 30°C <= temp < 35°C: Fan ON, Speed 60% (MEDIUM)
 *   If temp >= 35°C: Fan ON, Speed 100% (HIGH)
 */
export function calculateFanState(
  temperature: number,
  occupancy: number,
  mode: OperatingMode,
  thresholds: AutomationThresholds,
  manualState: { fanState: boolean; fanSpeed: number }
): { fanState: boolean; fanSpeed: number } {
  if (mode === 'MANUAL') {
    return {
      fanState: manualState.fanState,
      fanSpeed: manualState.fanSpeed,
    };
  }

  // AUTO Mode: Vacant room shutdown
  if (occupancy === 0) {
    return { fanState: false, fanSpeed: 0 };
  }

  // AUTO Mode: Closed-loop temperature regulation
  if (temperature < thresholds.fanLowTemp) {
    return { fanState: false, fanSpeed: 0 };
  } else if (temperature < thresholds.fanMedTemp) {
    return { fanState: true, fanSpeed: 30 };
  } else if (temperature < thresholds.fanHighTemp) {
    return { fanState: true, fanSpeed: 60 };
  } else {
    return { fanState: true, fanSpeed: 100 };
  }
}

/**
 * Pure calculation function for Lighting Actuator state.
 * 
 * In AUTO Mode:
 *   IF occupancy > 0 AND lightIntensity < lightThreshold:
 *     Lights = ON
 *   OTHERWISE:
 *     Lights = OFF
 */
export function calculateLightState(
  lightIntensity: number,
  occupancy: number,
  mode: OperatingMode,
  thresholds: AutomationThresholds,
  manualLightState: boolean
): boolean {
  if (mode === 'MANUAL') {
    return manualLightState;
  }

  // AUTO Mode: Co-dependent logic gate
  return occupancy > 0 && lightIntensity < thresholds.lightThreshold;
}

/**
 * Pure calculation function for PIR motion detection.
 * 
 * Occupancy > 0 -> PIR detected (movement / presence).
 * Occupancy == 0 -> PIR inactive.
 */
export function calculateOccupancyState(occupancy: number): {
  pirDetected: boolean;
} {
  return {
    pirDetected: occupancy > 0,
  };
}

/**
 * Overall system status determination
 */
export function calculateSystemStatus(occupancy: number, mode: OperatingMode): 'IDLE' | 'ACTIVE' {
  if (mode === 'MANUAL') return 'ACTIVE';
  return occupancy > 0 ? 'ACTIVE' : 'IDLE';
}
