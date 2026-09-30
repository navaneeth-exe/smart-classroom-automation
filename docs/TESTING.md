# Testing & Quality Assurance Plan
## Smart Classroom Automation System — Interactive Digital Twin

---

## 1. Testing Strategy Overview

The testing protocol for the digital twin covers four foundational tiers:
1. **Algorithmic Simulation Logic Tests (Unit Tests):** Verifies automation decision functions independently of React or 3D rendering.
2. **State Machine & Transition Tests (Store Integration Tests):** Ensures the Zustand store correctly transitions occupancy, triggers PIR pulses, and reconciles state switches.
3. **Render & Animation Verification (E2E & Visual Inspection):** Validates 60 FPS frame rates, smooth lerp physics on fan blades, and error-free student pathfinding.
4. **Edge-Case & Boundary Stress Tests:** Simulates adversarial user actions (rapid double-clicking, slider spamming, instant mode flipping).

---

## 2. Test Suites & Verification Matrix

### 2.1 Simulation Engine Unit Tests (`/simulation/automationEngine.test.ts`)

| Test ID | Test Description | Input Condition | Expected Result | Pass/Fail Criteria |
| :--- | :--- | :--- | :--- | :--- |
| `TC-ALG-01` | Fan PWM at Cold Temp | `temp = 22.0°C`, `occupancy = 1`, `mode = 'AUTO'` | `fanPwm = 0%`, `fanState = false` | Must equal exact PWM integer 0 |
| `TC-ALG-02` | Fan PWM at Low Bracket | `temp = 27.5°C`, `occupancy = 1`, `mode = 'AUTO'` | `fanPwm = 30%`, `fanState = true` | Must equal exact PWM integer 30 |
| `TC-ALG-03` | Fan PWM at Medium Bracket | `temp = 32.0°C`, `occupancy = 1`, `mode = 'AUTO'` | `fanPwm = 60%`, `fanState = true` | Must equal exact PWM integer 60 |
| `TC-ALG-04` | Fan PWM at High Bracket | `temp = 38.5°C`, `occupancy = 1`, `mode = 'AUTO'` | `fanPwm = 100%`, `fanState = true`| Must equal exact PWM integer 100 |
| `TC-ALG-05` | Fan Vacancy Safety Cutoff| `temp = 38.5°C`, `occupancy = 0`, `mode = 'AUTO'` | `fanPwm = 0%`, `fanState = false` | Fan must NOT spin if occupancy is 0 |
| `TC-ALG-06` | Lighting with Ample Sun | `occupancy = 5`, `ambientLight = 75%`, `mode = 'AUTO'` | `lightState = false` | Lights must remain OFF when sun >= 45% |
| `TC-ALG-07` | Lighting on Dark Day | `occupancy = 5`, `ambientLight = 30%`, `mode = 'AUTO'` | `lightState = true` | Lights must turn ON when sun < 45% |
| `TC-ALG-08` | Lighting in Dark Empty Room| `occupancy = 0`, `ambientLight = 10%`, `mode = 'AUTO'`| `lightState = false` | Lights must NOT turn on if room is empty |
| `TC-ALG-09` | Manual Override Lighting | `occupancy = 0`, `mode = 'MANUAL'`, `manualLight = true`| `lightState = true` | Manual switch must override zero occupancy |
| `TC-ALG-10` | Return to AUTO Reconcile | Switch `MANUAL` $\rightarrow$ `AUTO` while empty & hot | `fanPwm = 0%`, `lightState = false` | System must immediately revert to safe idle |

---

## 3. Critical Edge Cases & Stress Scenarios

### 3.1 Edge Case: Rapid Student Ingress Spamming
- **Risk:** User clicks "Add Student" 10 times in 1 second, causing coordinate collisions or overlapping agents.
- **Handling & Test:**
  - Each student is assigned a reserved desk index from `availableDeskSlots` atomically before animation begins.
  - Desk array capacity is strictly clamped to maximum (20 desks). Once capacity reaches 20, the "Add Student" button enters a disabled state (`disabled={occupancy >= 20}`).

### 3.2 Edge Case: Reset Classroom During Mid-Walk Animation
- **Risk:** User clicks "Reset Classroom" while 3 students are midway between the door and their desks, leaving orphan 3D meshes in the scene.
- **Handling & Test:**
  - `resetClassroom()` performs an atomic purge of the `students` array and resets door rotation to `0°` immediately.
  - Active animation refs are cancelled or garbage-collected safely without throwing WebGL context exceptions.

### 3.3 Edge Case: Temperature Oscillating Near Bracket Boundary (Hysteresis)
- **Risk:** Temperature rapidly fluctuating between 24.9°C and 25.1°C causing erratic fan relay clicks.
- **Handling & Test:**
  - Fan speed transitions use continuous inertia damping (`lerp`) so mechanical rotation remains visually smooth and does not snap abruptly.

### 3.4 Edge Case: WebGL Context Loss & Recovery
- **Risk:** Browser tab backgrounded or GPU context reset.
- **Handling & Test:**
  - Canvas uses R3F standard error boundary and graceful fallback to an isometric 2D SVG schematic if WebGL is unavailable or crashes.

---

## 4. Performance & Frame Rate Testing

- **Benchmarking Target:**
  - Desktop (1920x1080): Maintain $\ge$ 55 FPS with 20 student meshes, 4 rotating ceiling fans, dynamic shadows, and live telemetry plotting.
  - Mobile / Tablet: Maintain $\ge$ 30 FPS.
- **Memory Footprint Target:**
  - Heap memory stable under 150 MB after 10 minutes of continuous presentation looping.
  - Zero memory leaks in the Recharts telemetry buffer (clamped strictly to the last 30 data points using rolling slice operations).
