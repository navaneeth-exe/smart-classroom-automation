# Data Model & TypeScript Type Definitions
## Smart Classroom Automation System — Interactive Digital Twin

---

## 1. Core Domain Types

```typescript
/**
 * Operating Mode of the Classroom Automation Engine
 */
export type OperatingMode = 'AUTO' | 'MANUAL';

/**
 * Sensor Identifier Enum
 */
export type SensorType = 'DHT22' | 'PIR' | 'LDR';

/**
 * Actuator Identifier Enum
 */
export type ActuatorType = 'CEILING_FAN' | 'LIGHTING_GRID';

/**
 * Visual Student Agent State
 */
export type StudentState = 
  | 'SPAWNING' 
  | 'WALKING_TO_DESK' 
  | 'SEATING' 
  | 'SEATED' 
  | 'STANDING' 
  | 'WALKING_TO_DOOR' 
  | 'EXITED';

/**
 * 3D Spatial Vector
 */
export interface Vector3D {
  x: number;
  y: number;
  z: number;
}
```

---

## 2. Entity Interfaces

### 2.1 Student Agent
```typescript
export interface StudentAgent {
  id: string;                      // Unique ID (e.g., "student-01")
  deskId: number;                  // Assigned desk slot index (0 to 19)
  currentPosition: Vector3D;       // Current [x, y, z] coordinates in 3D world
  targetPosition: Vector3D;        // Target waypoint coordinate
  state: StudentState;             // Current animation lifecycle state
  palette: {
    shirtColor: string;            // Hex color code (e.g., "#2563EB")
    pantsColor: string;            // Hex color code
    hairColor: string;             // Hex color code
    skinTone: string;              // Hex color code
  };
  entryTimestamp: number;          // Timestamp when student entered
}
```

### 2.2 Desk Slot
```typescript
export interface DeskSlot {
  id: number;                      // 0 to 19
  position: Vector3D;              // Physical coordinate of desk
  chairPosition: Vector3D;         // Physical coordinate of chair
  isOccupied: boolean;             // True if student is assigned
  studentId: string | null;        // ID of seated student or null
  row: number;                     // 0 to 3
  col: number;                     // 0 to 4
}
```

### 2.3 Environmental Telemetry State
```typescript
export interface EnvironmentalState {
  temperature: number;             // Ambient temperature in Celsius (18.0 - 40.0)
  humidity: number;                // Relative humidity percentage (30.0 - 85.0)
  ambientLight: number;            // Ambient light percentage from windows/sun (0 - 100)
  lightThreshold: number;          // Setpoint below which lights engage (default 45%)
  occupancy: number;               // Number of active students in room (0 - 20)
  maxCapacity: number;             // Fixed room capacity (20)
  pirDetected: boolean;            // True if movement is currently detected
  pirPulseTimestamp: number;       // Last timestamp motion triggered pulse animation
}
```

### 2.4 Actuator State
```typescript
export interface ActuatorState {
  mode: OperatingMode;             // 'AUTO' | 'MANUAL'
  
  // Lighting Grid
  lightState: boolean;             // Master relay status (true = ON, false = OFF)
  lightIntensity: number;          // Normalized visual intensity (0.0 to 1.0)
  
  // Ceiling Fan Grid
  fanState: boolean;               // True if fan motor is energized
  targetFanPwm: number;            // Commanded PWM percentage (0, 30, 60, 100)
  currentFanPwm: number;           // Actual interpolated PWM (smooth inertia)
  fanRpm: number;                  // Estimated rotational RPM (0 to 1100)
  
  // Manual Overrides
  manualLightSwitch: boolean;      // User override for lights in MANUAL mode
  manualFanPwmSlider: number;      // User override for fan PWM in MANUAL mode (0-100)
}
```

### 2.5 Audit & Activity Log Entry
```typescript
export type LogCategory = 'SENSOR' | 'ACTUATOR' | 'OCCUPANCY' | 'MODE' | 'SYSTEM';

export interface ActivityLogEntry {
  id: string;                      // Unique UUID or increment
  timestamp: Date;                 // Exact time of event
  formattedTime: string;           // E.g., "14:22:05.120"
  category: LogCategory;           // Event category
  title: string;                   // E.g., "Lights Activated"
  description: string;             // E.g., "Ambient light (38%) < threshold (45%) with 4 occupants present"
  severity: 'info' | 'success' | 'warning' | 'alert';
}
```

### 2.6 Historical Telemetry Data Point (For Recharts)
```typescript
export interface TelemetryPoint {
  timestamp: string;               // Display time "HH:mm:ss"
  temperature: number;             // °C
  humidity: number;                // %
  ambientLight: number;            // %
  occupancy: number;               // Count
  fanPwm: number;                  // %
  lightActive: number;             // 1 for ON, 0 for OFF (for binary plotting)
}
```

### 2.7 Presentation Scenario Step
```typescript
export interface PresentationStep {
  stepNumber: number;              // 1 to 14
  title: string;                   // E.g., "Ambient Light Drop"
  description: string;             // Detailed explanation of what the audience is seeing
  durationSeconds: number;         // Suggested delay before auto-advancing
  targetState: {
    temperature?: number;
    ambientLight?: number;
    targetOccupancy?: number;
    mode?: OperatingMode;
    manualLight?: boolean;
    manualFanPwm?: number;
  };
  expectedOutcome: string;         // E.g., "Lights automatically switch ON via LDR + Occupancy gate"
}
```

---

## 3. Global Zustand Store State Schema

```typescript
export interface ClassroomStoreState {
  // Environmental & Sensors
  environment: EnvironmentalState;
  
  // Actuators & Mode
  actuators: ActuatorState;
  
  // Classroom Physical Elements
  doorOpen: boolean;
  students: StudentAgent[];
  desks: DeskSlot[];
  
  // Telemetry & Logs
  telemetryHistory: TelemetryPoint[];
  activityLogs: ActivityLogEntry[];
  
  // Presentation Mode Engine
  presentation: {
    isActive: boolean;
    currentStepIndex: number;
    isPaused: boolean;
    autoAdvance: boolean;
  };
  
  // Actions
  setTemperature: (temp: number) => void;
  setHumidity: (rh: number) => void;
  setAmbientLight: (luxPercent: number) => void;
  setMode: (mode: OperatingMode) => void;
  setManualLight: (on: boolean) => void;
  setManualFanPwm: (pwm: number) => void;
  
  addStudent: () => void;
  removeStudent: (studentId?: string) => void;
  resetClassroom: () => void;
  
  // Presentation Controls
  startPresentation: () => void;
  stopPresentation: () => void;
  pausePresentation: () => void;
  resumePresentation: () => void;
  nextPresentationStep: () => void;
  prevPresentationStep: () => void;
  jumpToPresentationStep: (index: number) => void;
  
  // Internal Frame Ticks
  tickSimulation: (delta: number) => void;
  appendLog: (entry: Omit<ActivityLogEntry, 'id' | 'timestamp' | 'formattedTime'>) => void;
}
```
