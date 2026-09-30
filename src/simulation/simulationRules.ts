import { AutomationThresholds } from './simulationTypes';

export const DEFAULT_THRESHOLDS: AutomationThresholds = {
  fanLowTemp: 25.0,
  fanMedTemp: 30.0,
  fanHighTemp: 35.0,
  lightThreshold: 40.0, // Below 40% ambient daylight turns lights ON if occupied
  inactivityDelayMs: 2500, // 2.5s graceful shutdown when empty
};

export const INITIAL_SIMULATION_CONFIG = {
  defaultTemperature: 24.0,
  defaultHumidity: 60.0,
  defaultLightIntensity: 70.0,
  defaultOccupancy: 0,
  defaultMaxOccupancy: 16,
  minTemperature: 18.0,
  maxTemperature: 40.0,
  minHumidity: 30.0,
  maxHumidity: 90.0,
  minLightIntensity: 0.0,
  maxLightIntensity: 100.0,
};
