# Project Idea & Concept Document
## Smart Classroom Automation System — Interactive Digital Twin

---

## 1. Project Title
**Smart Classroom Automation System: Interactive Digital Twin & Visual Telemetry Simulator**

---

## 2. Project Concept & Vision
In modern educational institutions, large volumes of electrical energy are squandered due to unoccupied classrooms running full lighting arrays and high-speed ceiling fans or air conditioning units. Conventional static automation proposals typically rely on abstract circuit schematics or bulleted PowerPoint presentations to present automated energy management solutions.

This project delivers a **full-fidelity, client-side visual Digital Twin** of an intelligent classroom. It visualizes the physical environment (classroom architecture, furniture, daylighting, human occupancy traffic, lighting fixtures, and ceiling fans) operating alongside a centralized automation logic engine and virtual sensor telemetry.

Instead of presenting passive PowerPoint slides during project reviews and academic defenses, the presenter utilizes this interactive digital web application to demonstrate real-time energy automation, interactive student ingress/egress, dynamic closed-loop sensor-actuator feedback, and historical telemetry analytics.

---

## 3. Explicit Software Simulation Disclaimer
> ⚠️ **CRITICAL ARCHITECTURAL BOUNDARY:**
> **This project is strictly a FRONTEND SOFTWARE SIMULATION.**
> - There is **no physical microcontroller** (e.g., STM32, ESP32, Arduino, Raspberry Pi) plugged into or communicating with this web application.
> - There are **no physical electronic components** (DHT22, PIR motion sensors, LDR photoresistors, electromagnetic relays, MOSFET drivers, physical DC motors, or light bulbs) connected.
> - All sensor data streams, occupant pathfinding, thermal dynamics, optical illuminance levels, and actuator PWM behaviors are modeled in mathematical and programmatic simulation code running locally inside the user's browser.
> - The user interface explicitly denotes **"SIMULATION MODE"** with active telemetry parameters to prevent misleading observers regarding physical hardware connectivity.

---

## 4. The Problem
1. **Pervasive Energy Waste:** Institutional classrooms frequently remain fully illuminated and ventilated during class transitions, lunch periods, or cancelled lectures because manual switches are left on.
2. **Suboptimal Learning Environments:** Classroom lighting and airflow are rarely modulated dynamically to match outdoor daylight shifts or rising ambient temperatures throughout the day.
3. **Lack of Tangible Presentation Tools:** Explaining embedded automation algorithms (PWM duty cycles, hysteresis thresholds, occupancy timeouts, and lux-triggered relays) using static slides fails to convey real-time system dynamics to evaluators, stakeholders, and students.

---

## 5. The Proposed Solution: Interactive Digital Twin
The proposed system resolves this by providing an interactive digital twin that models both the physical environment and the embedded controller logic:

1. **A Living Visual Classroom:** A responsive visual scene rendering the room structure, student desks, chairs, teaching board, windows, door, ceiling fans, ambient lighting, and occupancy.
2. **Interactive Population Dynamics:** The presenter can inject or evacuate students. An animated ingress/egress mechanism updates occupancy counters and stimulates virtual PIR detection sensors.
3. **Environmental Physics Sliders:** Controls allow the user to vary outdoor daylight (lux) and ambient temperature (°C) to inspect how the automation engine responds.
4. **Transparent Logic Engine:** The platform exposes internal decision trees:
   - Evaluates whether occupancy > 0 AND ambient light < threshold to switch lighting relays.
   - Computes fan speed PWM duty cycles (0%, 30%, 60%, 100%) based on real-time temperature bands.
   - Automatically executes a low-power shutdown sequence when occupancy drops to zero.
5. **Interactive Viva & Presentation Platform:** Includes an automated presentation stepper that guides evaluators through standard engineering demonstration sequences without manual slide progression.

---

## 6. Why This Replaces a Traditional Presentation (PPT)
| Traditional PowerPoint Presentation | Smart Classroom Interactive Digital Twin |
| :--- | :--- |
| Static screenshots of code, circuits, and flowcharts | Live, running simulation of closed-loop automation logic |
| Abstract claims about energy efficiency | Real-time energy telemetry graphs and active load indicators |
| Imaginary scenarios described verbally | Interactive student traffic, temperature spikes, and daylight dimming |
| Inflexible slide order | Freeform sandbox mode + structured automated demonstration mode |
| Passive evaluator experience | Active evaluator engagement (evaluators can test custom scenarios live) |

---

## 7. Main Features Overview
- **Visual Classroom Canvas:** Clean, technical aesthetic representing an academic hall with animated door ingress, student seating, rotational fan speed PWM visualization, and dynamic scene illumination.
- **Virtual Sensor Suite:**
  - *Virtual DHT22:* Temperature & Relative Humidity telemetry.
  - *Virtual LDR:* Illuminance (Lux / Percentage) reflecting indoor ambient light levels.
  - *Virtual PIR:* Motion/Occupancy detector with state latching and detection pulses.
- **Virtual Actuator Suite:**
  - *Ceiling Fan Bank:* Continuous rotational speed matching PWM duty cycles (0%, 30%, 60%, 100%) with realistic spin-up and inertia decay.
  - *Ceiling Lighting Grid:* Multi-fixture illumination with realistic ambient lux blending, off/on transitions, and light cones.
- **Operating Modes:**
  - *AUTOMATIC Mode:* Pure autonomous closed-loop operation driven by virtual sensor data.
  - *MANUAL Mode:* Direct override enabling physical switch simulation for emergency or maintenance demonstrations.
- **Event Audit Log:** High-precision timestamped event bus displaying all threshold triggers, relay state changes, and occupancy events.
- **Live Telemetry & Analytics:** Charts showing real-time temperature, student occupancy, and fan PWM duty cycle trends.
- **Automated Presentation Scenarios:** 14-step automated demo runner with timeline scrubber, pause/resume, and step-by-step narration.

---

## 8. Academic Project Scope & Boundaries
- **In Scope:**
  - Complete software simulation of ambient environmental physics and occupancy logic.
  - Interactive UI with live animations (fans, lights, students, doors).
  - Telemetry visualization, event logging, and presentation automation.
  - Modular software architecture that isolates the automation engine, enabling seamless replacement of simulated sensors with real serial/MQTT/WebSocket hardware inputs in future research phases.
- **Out of Scope (for this phase):**
  - Physical PCB manufacturing or microchip flashing.
  - Physical sensor wiring or electrical hardware breadboarding.
  - Server-side database or user authentication (purely client-side standalone tool for ease of local evaluation and zero-latency presentations).
