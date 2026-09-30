# Product Requirements Document (PRD)
## Smart Classroom Automation System — Interactive Digital Twin

---

## 1. Product Vision
To build an interactive, browser-based digital twin of a Smart Classroom Automation System that serves as an engineering project demonstration and viva presentation. The platform models classroom physics, occupant movement, sensor telemetry, and HVAC/lighting automation in software without physical hardware.

---

## 2. Target Users & Personas
1. **Academic Evaluator / Examiner:** Evaluates the technical rigor, logic correctness, energy-saving efficiency, and edge-case handling of the automation rules.
2. **Student Presenter / Demonstrator:** Controls the presentation flow, tests arbitrary environmental perturbations, and uses pre-configured automated sequences to pitch the project clearly.
3. **Engineering Peer / Visitor:** Explores the interactive sandbox to observe how virtual PIR, LDR, and DHT22 sensors drive virtual relays and fan motor PWMs.

---

## 3. User Experience Principles
- **Living Classroom as Hero:** The visual classroom is the primary focal point of the viewport; dashboard controls and telemetry wrap around it cleanly.
- **Academic & Engineering Aesthetic:** Clean, modern, technical light theme. Strictly no childish cartoons, no garish neon gradients, and no overblown fake 3D clutter.
- **Zero Ambiguity of Authenticity:** Prominent **"SIMULATION MODE"** badges clarify that all readings and responses are software-modeled.
- **Immediate Visual Feedback:** Every parameter adjustment (e.g., sliding temperature or adding a student) triggers immediate, observable animations in the classroom scene and updates telemetry charts.

---

## 4. Requirements Breakdown: Must-Have vs. Optional

### 4.1 Must-Have Requirements (P0)

#### A. Interactive Classroom Scene
- Render an academic classroom containing:
  - Walls, tiled/finished floor, ceiling, and windows.
  - Interactive entrance door that opens and closes on student transit.
  - Chalkboard / Smartboard and teacher podium/desk.
  - Student desks and chairs organized in a clean matrix layout (minimum capacity: 16–30 desks).
  - Overhead ceiling fans with animatable spinning blades.
  - Ceiling light fixtures with visible glowing lenses and dynamic illumination cones/bloom.
  - Visible virtual sensor enclosures mounted realistically (PIR at the entrance/center ceiling, LDR near the window, DHT22 on the wall).

#### B. Student Agent Simulation
- **Add Student:**
  1. Door opens.
  2. Student enters from the outside corridor.
  3. Student paths smoothly to an unoccupied desk.
  4. Student sits down.
  5. Occupancy count increments.
  6. Virtual PIR latches to `DETECTED`.
  7. Automation engine recalculates and updates actuators.
- **Remove Student:**
  1. Seated student stands up.
  2. Student paths smoothly toward the classroom door.
  3. Door opens.
  4. Student exits into corridor and despawns.
  5. Occupancy count decrements.
  6. PIR resets or latches depending on remaining occupancy.
- Multiple visual variations (clothing color, hair/silhouette) to prevent a clone-like appearance.

#### C. Virtual Sensor Suite (Software Simulated)
- **Virtual DHT22:**
  - Range: 18°C to 40°C (user controllable via slider/input).
  - Humidity: 30% to 85% RH (computed or slider-controllable).
- **Virtual LDR (Light Dependent Resistor):**
  - Ambient illumination: 0% (pitch black / night) to 100% (bright sunny daylight).
  - Linked to window daylight intensity.
- **Virtual PIR Motion Sensor:**
  - States: `DETECTED` (occupants moving/present) vs `NOT DETECTED` (empty).
  - Animated pulsing status ring when active.
  - Automatic timeout/latch behavior when movement ceases.

#### D. Virtual Actuator Suite & Automation Engine
- **Ceiling Fan PWM Controller:**
  - Speed levels:
    - `0% PWM` (0 RPM) when temperature < 25°C.
    - `30% PWM` (~300 RPM slow spin) when 25°C ≤ temp < 30°C.
    - `60% PWM` (~650 RPM medium spin) when 30°C ≤ temp < 35°C.
    - `100% PWM` (~1100 RPM fast spin) when temp ≥ 35°C.
  - Smooth rotational acceleration/deceleration physics (inertia model, no abrupt instant speed flips).
- **Classroom Lighting Grid Controller:**
  - Automated logic rule:
    ```
    IF (occupancy > 0) AND (ambientLight < LIGHT_THRESHOLD [default 45%])
        THEN lights = ON
    ELSE
        lights = OFF
    ```
  - Visually alters classroom brightness, light fixture illumination, and ground shadows.
- **Dual Operating Modes:**
  - `AUTO`: Pure closed-loop rule engine control.
  - `MANUAL`: Direct user toggle of light switch (ON/OFF) and fan slider (0–100% PWM).
  - Immediate state reconciliation when toggling back from `MANUAL` to `AUTO`.

#### E. Dashboard, Telemetry & Activity Feed
- Real-time numerical readouts: Temperature, Humidity, Ambient Light %, Occupancy Count/Capacity, PIR status, Fan PWM %, Light Relay state.
- Interactive controls: Temperature slider, Ambient Light slider, Add Student button, Remove Student button, Mode toggle (AUTO/MANUAL), Reset Classroom button.
- Real-time charts (Recharts/SVG): Temperature trend, Occupancy trend, and Fan PWM history.
- Live Chronological Activity Log: Timestamped feed capturing triggers, occupancy transitions, and relay trips.

#### F. Presentation & Demonstration Mode
- Guided 14-stage automated presentation sequence walking through:
  - Empty idle room -> Student arrival -> PIR latch -> Auto-lighting trip -> Daylight shift -> Temperature rise -> Fan speed staging -> Student dismissal -> Complete automated shutdown.
- Transport controls: Play, Pause, Step Next, Step Previous, and Scenario Jump.

---

### 4.2 Optional / Enhancements (P1 / P2)
- **Sound Effects (Optional Toggle):** Subtle soft click for relay switches, gentle fan hum (muted by default, P2).
- **Energy Conservation Metric:** Live calculation of simulated kilowatt-hours (kWh) saved compared to an unautomated classroom (P1).
- **Customizable Thresholds:** Modal setting dialog allowing evaluators to tune the fan temperature setpoints and LDR lux cutoffs (P1).
- **Hardware Integration Stubs:** Modular adapter interface documented for future serial/WebSocket microcontrollers (P1).

---

## 5. Non-Functional Requirements

### 5.1 Performance & Responsiveness
- **Frame Rate:** Target steady 60 FPS in standard browser viewports (1080p desktop) during active fan spin and student walk cycles.
- **Zero Network Latency:** 100% client-side computation; all simulations run in memory with zero external API dependencies.
- **Load Time:** Instant initial bundle load under 2.5 seconds on standard broadband.

### 5.2 Browser Compatibility
- Evergreen web browsers: Chrome 110+, Firefox 110+, Edge 110+, Safari 16+.
- WebGL 2.0 acceleration support for Canvas / Three.js rendering.

### 5.3 Usability & Ergonomics
- Presentation layout optimized for 16:9 and 16:10 projectors/laptops (1920x1080, 1440x900, 1366x768).
- Graceful adaptive degradation on tablets (stacked layout) and mobile (classroom viewer with collapsible telemetry drawer).

---

## 6. Acceptance Criteria

| Feature | Acceptance Criteria |
| :--- | :--- |
| **Simulation Notice** | Explicit "Simulation Mode" badge visible at all times in the header. |
| **Student Flow** | Clicking "Add Student" opens door, renders animated walk to desk, seats student, and updates occupancy. |
| **Occupancy Zero** | Removing all students forces occupancy to 0, sets PIR to `NOT DETECTED`, and triggers automatic shutoff of lights and fans in `AUTO` mode. |
| **Lighting Logic** | Lights turn ON only if Occupancy > 0 AND Light < Threshold in `AUTO` mode. Lights turn OFF if either condition fails. |
| **Fan PWM Logic** | Fan smoothly matches rotational speed to temperature intervals (<25: 0%, 25-30: 30%, 30-35: 60%, >35: 100%). |
| **Manual Override** | Switching to `MANUAL` allows user to set any fan speed or light state regardless of sensors; switching to `AUTO` re-evaluates sensor logic immediately. |
| **Presentation Mode** | Can play through all 14 scripted steps seamlessly with visible timeline advancement and manual pause/resume. |
