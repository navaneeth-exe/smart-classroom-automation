# Implementation Strategy & Technical Execution Guide
## Smart Classroom Automation System — Interactive Digital Twin

---

## 1. Development Approach & Philosophy

The project is structured around a **Simulation-First, Decoupled Architecture**. Rather than entangling UI animation frames directly with component state hooks, the entire system is governed by a deterministic, reactive **Simulation Engine** modeled in pure TypeScript and driven via **Zustand**.

### Core Tenets:
1. **Unidirectional Data Flow:** User actions or demo scripts perturb environmental parameters; the Simulation Engine calculates actuator states and logs events; the 3D visual scene and telemetry components observe this state and animate smoothly.
2. **Decoupled Physics & Rendering:** The logical fan speed (PWM 0–100%) and target light states are numbers in the store. The 3D render loop (`useFrame` / CSS transitions) reads these targets and interpolates rotational velocity and light intensity with natural inertia.
3. **No Hardware Coupling:** Simulated sensors emit data that conforms to real hardware schemas (e.g. DHT22 floats, PIR boolean pulses). If physical hardware is introduced in future work, only the input adapter changes.

---

## 2. High-Level Implementation Steps

```
[Phase 1: Foundation]
  Scaffold Vite + React + TS + Tailwind + Lucide
        │
[Phase 2: Data & Simulation Core]
  Build Zustand Store + Simulation Engine + Logic Evaluator + Logger
        │
[Phase 3: Visual Classroom Canvas]
  Construct Three.js / R3F Scene: Classroom, Desks, Door, Fans, Lights
        │
[Phase 4: Agent & Actuator Animations]
  Implement Student Walk Pathfinding, Fan Inertia Spin, Light Cones
        │
[Phase 5: Control Panel & Telemetry HUD]
  Build Real-Time Sliders, Sensor Readouts, Recharts Telemetry
        │
[Phase 6: Presentation Runner & Polish]
  Build 14-Step Timeline Stepper, Audio/Visual Cues, Responsive Layout
```

---

## 3. Subsystem Implementation Details

### 3.1 State Management (Zustand Store)
- Centralized store (`useClassroomStore`) maintaining:
  - **Sensors:** `temperature`, `humidity`, `ambientLight`, `occupancy`, `pirState`, `pirPulseActive`.
  - **Actuators:** `lightRelayState`, `targetFanPwm`, `currentFanPwm`, `currentFanRpm`.
  - **Classroom State:** `mode` (`AUTO` | `MANUAL`), `doorOpen`, `studentList`, `availableDeskSlots`.
  - **Presentation Engine:** `isPlaying`, `currentStepIndex`, `isPaused`, `stepDuration`.
  - **Telemetry History:** Rolling array of the last 30 data snapshots (time, temp, occupancy, pwm).
  - **Audit Logs:** Append-only array of timestamped activity events.

### 3.2 Automation Engine (`simulationEngine.ts`)
- Pure algorithmic evaluation executed on every environmental change or tick:
  - **Fan Logic:**
    ```typescript
    export function evaluateFanPWM(temp: number, occupancy: number, mode: Mode): number {
      if (mode === 'MANUAL') return store.manualFanPwm;
      if (occupancy === 0) return 0; // Automatic shutdown
      if (temp < 25) return 0;
      if (temp < 30) return 30;
      if (temp < 35) return 60;
      return 100;
    }
    ```
  - **Lighting Logic:**
    ```typescript
    export function evaluateLightRelay(occupancy: number, ambientLight: number, mode: Mode, threshold: number): boolean {
      if (mode === 'MANUAL') return store.manualLightState;
      if (occupancy === 0) return false; // Automatic shutdown
      return ambientLight < threshold;
    }
    ```

### 3.3 Classroom Rendering (Three.js / React Three Fiber)
- **Isometric / Perspective Camera:** Tuned angle (elevation 35°, azimuth 45°) for optimal architectural depth and visibility of all desks.
- **Lighting Rig:**
  - Ambient light: Derived from `ambientLight` sensor value + room bounce.
  - Directional light (sunlight through windows): Casts gentle directional daylight.
  - Spotlights / Point lights on ceiling fixtures: Active when `lightRelayState` is true.
- **Ceiling Fans:**
  - Each fan has a rotational pivot group.
  - In `useFrame((state, delta) => ...)`:
    - Target RPM is computed from `targetFanPwm`.
    - Current RPM is smoothly interpolated toward target RPM using exponential lerp (`lerp(current, target, 1 - Math.exp(-decay * delta))`).
    - Fan angle increments: `rotation.y += currentRpm * delta`.

### 3.4 Student Ingress & Egress Navigation
- **Grid Layout of Desks:** Array of coordinate vectors `[x, y, z]` for 20 classroom chairs.
- **Entrance Door Waypoint:** Coordinate `[doorX, doorY, doorZ]`.
- **Student State Machine:**
  - `IDLE_OUTSIDE` -> `WALKING_IN` -> `SEATING` -> `SEATED` -> `STANDING` -> `WALKING_OUT` -> `REMOVED`.
- When added:
  1. Set door state `doorOpen = true`.
  2. Spawn student mesh at door waypoint.
  3. Interpolate position along bezier or linear waypoint path to the assigned desk slot over 1.2–1.8 seconds.
  4. Animate to seated pose; close door; latch PIR sensor to `DETECTED`.
- When removed:
  1. Student rises; door opens.
  2. Student moves back to door waypoint; despawns; door closes.

### 3.5 Real-Time Telemetry & Charts
- Rolling buffer of last 30 data samples captured at 1-second intervals or upon state changes.
- Rendered via **Recharts** (AreaChart / LineChart) with custom styled SVG tooltips and smooth curves.

### 3.6 Automated Presentation Mode
- Scripted array of step descriptors containing:
  - Step title, description, target parameter changes, expected automation triggers, and time delay (3–5 seconds per step).
- Timer-driven execution loop using `requestAnimationFrame` or interval scheduling with full pause/resume/scrub controls.

---

## 4. Performance & Optimization Strategy

1. **Geometry Re-use:** Instanced or cloned meshes for desks, chairs, and light fixtures to keep draw calls low (< 40 draw calls).
2. **Texture Efficiency:** Procedural SVG/Canvas materials and minimal compressed textures (no large multi-megabyte 4K texture maps).
3. **Selective Re-renders:** Zustand selectors (`useClassroomStore(state => state.temperature)`) ensure only relevant HUD controls re-render when a single slider moves.
4. **Smooth Lerping:** Actuators and cameras use delta-time frame lerping to prevent jitter across varying refresh rates (60Hz, 120Hz, 144Hz).

---

## 5. Error & Edge Case Handling
- **Rapid Clicking of "Add/Remove Student":** Queue ingress/egress requests or dynamically assign remaining empty desks without collision.
- **Extreme Temperature Inversion:** Sliders clamped strictly to 18°C–40°C.
- **Zero Occupancy Safety Cutoff:** Whenever occupancy reaches 0, force PIR to `NOT DETECTED`, and guarantee that AUTO-mode immediately schedules power cutoffs for fans and lights.
- **Mode Switching:** Switching from `MANUAL` to `AUTO` immediately fires a full evaluation pass, preventing stuck actuators.
