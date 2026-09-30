# Animation & Motion Physics Specification
## Smart Classroom Automation System — Interactive Digital Twin

---

## 1. Animation Philosophy

Animation in this digital twin is **functional, physics-informed, and informative**, not decorative fluff. Every motion represents physical reality (inertia of rotating motor blades, light emission, human movement speeds, and electronic state changes).

---

## 2. Detailed Motion Inventory & Specifications

### 2.1 Student Entry (Ingress) Sequence
- **Trigger:** User clicks `+ Add Student` or automated presentation script triggers step.
- **Duration:** Total 2.2 seconds.
- **Step Breakdown:**
  1. *Door Open (0.0s – 0.4s):* Classroom door rotates open along Y-axis (`rotation.y: 0 -> -75°`) using ease-out cubic curve.
  2. *Corridor Spawn (0.3s):* Student avatar instantiates in doorway threshold with walk bobbing motion.
  3. *Aisle Pathfinding (0.4s – 1.8s):* Student meshes move along interpolated coordinates from door `[X_door, Y_floor, Z_door]` along central classroom aisle to assigned desk coordinates `[X_desk, Y_floor, Z_desk]`.
  4. *Desk Seating (1.8s – 2.2s):* Student rotates to face the board, vertical height drops 0.35m into seated pose on the chair.
  5. *Door Close (1.8s – 2.2s):* Door rotates back to `0°` (closed).
- **Secondary Reactions:**
  - Occupancy counter increments (`+1`).
  - PIR sensor emits an active emerald ripple wave.
  - Automation engine evaluates whether lights or fans need adjustment.

### 2.2 Student Exit (Egress) Sequence
- **Trigger:** User clicks `- Remove Student` or presentation script dismisses classroom.
- **Duration:** Total 2.0 seconds.
- **Step Breakdown:**
  1. *Stand Up (0.0s – 0.3s):* Selected student elevates from seated to standing height.
  2. *Door Open (0.2s – 0.5s):* Door rotates open.
  3. *Aisle Pathfinding (0.3s – 1.7s):* Student walks from desk position toward the door coordinate.
  4. *Despawn (1.7s):* Student crosses doorway threshold and fades out.
  5. *Door Close (1.7s – 2.0s):* Door closes.
- **Secondary Reactions:**
  - Occupancy counter decrements (`-1`).
  - If occupancy reaches 0, PIR switches to `NOT DETECTED` and automatic shutdown sequence starts.

### 2.3 Ceiling Fan Motor Rotational Dynamics & Inertia
- **Trigger:** Temperature change alters target PWM (0%, 30%, 60%, 100%) or manual slider changes.
- **Physical Behavior:** Electric fan motors do not instantaneously change velocity. They accelerate and decelerate subject to rotational inertia and air friction damping.
- **Mathematical Model (`useFrame`):**
  ```typescript
  // Target angular velocity (radians per second)
  const targetVelocity = (fanPwm / 100) * MAX_ANGULAR_VELOCITY; // e.g., MAX = 25 rad/s

  // Smooth lerp with inertia factor
  const inertiaFactor = targetVelocity > currentVelocity ? 1.8 : 0.8; // Deceleration takes longer
  currentVelocity += (targetVelocity - currentVelocity) * inertiaFactor * delta;

  // Update blade rotation angle
  fanPivotRef.current.rotation.y += currentVelocity * delta;
  ```
- **Visual Indicators:** Fan blade mesh blurs subtly at 100% PWM; HUD card displays current estimated RPM.

### 2.4 Lighting Fixture Activation & Scene Illuminance
- **Trigger:** `lightRelayState` flips `true` or `false`.
- **Duration:** 350ms (simulating fluorescent/LED driver ramp-up).
- **Visual Behavior:**
  - *Fixtures:* Emissive material intensity ramps from `0.0` (off/matte white) to `2.8` (glowing warm-white emissive).
  - *Bloom Layer:* `@react-three/postprocessing` bloom highlights fixture surfaces.
  - *Room Downlight:* Spotlight / Pointlight cones ramp intensity from `0.0` to `1.5`, casting light on student desks and floor tiles.
  - *Off Transition:* Quick 150ms drop to zero emissive glow, simulating instant driver cut.

### 2.5 PIR Sensor Detection Ripple / Pulse
- **Trigger:** Movement occurs (student enters or exits) and `pirDetected === true`.
- **Visual Behavior:**
  - In 3D scene: An invisible or translucent hemisphere over the PIR sensor housing pulses a soft emerald wireframe wave expanding downward.
  - On 2D HUD: Radial radar circle icon displays an outward propagating CSS pulse wave (`@keyframes ping`).

### 2.6 Temperature & Daylight Visual Feedback
- **Temperature Changes:**
  - Subtle thermal hue: High temperature (>35°C) introduces a warm atmospheric tint (`#FFF7ED` tint on scene ambient light), while cool (<22°C) introduces a crisp neutral tone (`#F0FDF4`).
  - *Constraint:* Never tint the entire screen solid red or blue. The change remains refined and natural.
- **Ambient Daylight Changes:**
  - Directional sunlight coming through the window adjusts angle and illuminance (0 lux at 0% to bright sunlight at 100%).
  - Window glass material changes from dark navy glass (night) to brilliant warm white (daylight).

### 2.7 Activity Log Event Entrance
- **Trigger:** New event appended to store.
- **Visual Behavior:**
  - New log row enters via Framer Motion slide-in from top with fade-in (`initial: { opacity: 0, y: -8 }, animate: { opacity: 1, y: 0 }`).
  - Brief highlight pulse on the timestamp tag.
