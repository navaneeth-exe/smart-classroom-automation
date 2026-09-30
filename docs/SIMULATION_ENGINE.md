# Simulation & Automation Engine Specification
## Smart Classroom Automation System — Interactive Digital Twin

---

## 1. Environmental State Machine & Physics Model

The Simulation Engine maintains a virtual thermodynamic, optical, and occupant state for the classroom.

### 1.1 State Variables
```typescript
interface EnvironmentalState {
  temperature: number;       // Range: 18.0°C to 40.0°C (Default: 24.0°C)
  humidity: number;          // Range: 30% to 85% RH (Default: 50%)
  ambientLight: number;      // Range: 0% (Dark/Night) to 100% (Direct Sunlight) (Default: 65%)
  occupancy: number;         // Range: 0 to 20 students (Default: 0)
  maxCapacity: number;       // Fixed: 20 desks
  pirDetected: boolean;      // Boolean motion state
  pirLatchTimer: number;     // Remaining seconds before motion reset (Default: 5s window)
}
```

### 1.2 Virtual Sensor Modeling
- **Virtual DHT22 (Temperature & Humidity):**
  - Instantaneous readout with subtle Gaussian noise (±0.2°C, ±0.5% RH) to simulate real-world ADC quantization jitter.
  - Temperature changes induce inverse proportional shifts in humidity (relative humidity drops slightly as temperature rises).
- **Virtual LDR (Ambient Daylight):**
  - Represents outdoor solar irradiance filtered through classroom windows.
  - User can simulate cloudy day, dusk, or bright noon.
- **Virtual PIR (Passive Infrared Occupancy Detector):**
  - Triggered whenever a student enters, exits, or sits down.
  - Latches to `DETECTED` (`HIGH`) and maintains this state as long as occupancy > 0.
  - When occupancy drops to 0, a countdown timer (e.g. 5 seconds simulation time) lapses before transitioning to `NOT DETECTED` (`LOW`).

---

## 2. Actuator State Machine & Logic Rules

### 2.1 Actuator Variables
```typescript
interface ActuatorState {
  mode: 'AUTO' | 'MANUAL';
  lightState: boolean;       // true = ON, false = OFF
  fanState: boolean;         // true = Active, false = Stopped
  fanPwm: number;            // 0, 30, 60, 100 (%)
  fanRpm: number;            // 0 to 1100 RPM
  manualLightOverride: boolean;
  manualFanPwmOverride: number;
}
```

---

## 3. Automation Decision Logic (Closed-Loop Algorithms)

### 3.1 Fan Speed Control Algorithm (Temperature-to-PWM Transfer Function)

In `AUTO` mode, fan speed is determined strictly by ambient temperature provided occupancy > 0:

| Temperature Range (°C) | Fan State | PWM Duty Cycle (%) | Nominal Target RPM | Audible/Visual Indicator |
| :--- | :--- | :--- | :--- | :--- |
| **T < 25.0°C** | `OFF` | **0%** | 0 RPM | Stationary blades |
| **25.0°C ≤ T < 30.0°C** | `LOW` | **30%** | ~330 RPM | Gentle rotation |
| **30.0°C ≤ T < 35.0°C** | `MEDIUM` | **60%** | ~660 RPM | Moderate rotation |
| **T ≥ 35.0°C** | `HIGH` | **100%** | ~1100 RPM | Rapid rotation |

> **Vacant Room Override:**
> If `occupancy === 0`, `fanPwm` is unconditionally forced to **0%** (Power Off) regardless of temperature.

```
Fan PWM (%)
 100% ───────────────────────────────┐  (T ≥ 35°C)
                                     │
  60% ─────────────────┐             │  (30°C ≤ T < 35°C)
                       │             │
  30% ───┐             │             │  (25°C ≤ T < 30°C)
         │             │             │
   0% ───┴─────────────┴─────────────┴──
       <25°C         30°C          35°C      Temperature (°C)
```

---

### 3.2 Lighting Control Algorithm (Co-Dependent Logic Gate)

Classroom illumination is automated to prevent electricity wastage on sunny days or in empty rooms:

$$\text{Light Relay State} = (\text{Occupancy} > 0) \land (\text{Ambient Light} < \text{Light Threshold})$$

- **Default Light Threshold:** $45\%$ ambient lux.
- **Rule Evaluation:**
  - Case 1: `Occupancy == 0` $\rightarrow$ Lights = **OFF** (Classroom empty).
  - Case 2: `Occupancy > 0` AND `Ambient Light ≥ 45%` $\rightarrow$ Lights = **OFF** (Adequate natural sunlight through windows).
  - Case 3: `Occupancy > 0` AND `Ambient Light < 45%` $\rightarrow$ Lights = **ON** (Occupants present and insufficient daylight).

---

### 3.3 Operating Modes: AUTO vs. MANUAL

- **`AUTO` Mode:**
  - System executes the closed-loop algorithms continuously.
  - Manual UI toggles for light switch and fan PWM are disabled or prompt a confirmation to switch to `MANUAL`.
- **`MANUAL` Mode:**
  - Presenter / operator can manually flip lights ON/OFF and adjust fan PWM anywhere between 0% and 100% to demonstrate maintenance, emergency, or manual override scenarios.
  - Automation engine logs an override notice.
- **Reconciliation on Return to `AUTO`:**
  - The instant the mode switch flips from `MANUAL` back to `AUTO`, the automation engine immediately triggers a full recalculation cycle using the active virtual sensor values, returning the classroom to its optimal state with an audit log entry.

---

## 4. State Transitions Table

| Event | Previous State | New State | Actuator Actions Triggered |
| :--- | :--- | :--- | :--- |
| **Add 1st Student** | Empty (Occ=0, PIR=OFF, Lights=OFF, Fan=OFF) | Occ=1, PIR=DETECTED | If Light < 45%, Lights -> ON. If Temp >= 25°C, Fan -> PWM. |
| **Ambient Light drops < 45%** | Occ > 0, Lights=OFF | Lights=ON | Ceiling light bloom active, scene ambient illumination increases. |
| **Ambient Light rises ≥ 45%** | Occ > 0, Lights=ON | Lights=OFF | Light fixtures dim, scene relies on sunlight through windows. |
| **Temp rises from 28°C to 31°C**| Occ > 0, Fan=30% | Fan=60% | Fan rotational lerp speeds up to ~660 RPM. |
| **Last Student Exits** | Occ=1, PIR=DETECTED, Lights=ON, Fan=60% | Occ=0, PIR=NOT DETECTED | Immediate or grace shutdown: Lights -> OFF, Fan -> 0% PWM. |
| **Switch to MANUAL** | AUTO, Fan=60% | MANUAL, Fan=60% | System awaits direct user input. |
| **Switch to AUTO** | MANUAL (User had Fan at 0%, Temp is 36°C) | AUTO, Fan=100% | Immediate automated recovery: Fan accelerates to 100%. |
