# Software Architecture Specification
## Smart Classroom Automation System — Interactive Digital Twin

---

## 1. High-Level Architecture Overview

The system is designed according to the **Model-View-Controller (MVC) / Reactive Digital Twin Pattern**, cleanly isolating the physical world simulation, the automation control logic, and the visual rendering pipelines.

```
                           ┌──────────────────────────────────────────────┐
                           │              USER / PRESENTER                │
                           │   (Sliders, Buttons, Presentation Scrubber)  │
                           └──────────────────────┬───────────────────────┘
                                                  │ Dispatch User Action
                                                  ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                CENTRAL SIMULATION STORE                                │
│                                  (Zustand State Store)                                 │
│                                                                                        │
│   [Environmental Physics State]   [Actuator Relay/PWM State]   [Telemetry & History]  │
│   - Temp, Humidity, Daylight      - Fan PWM %, Light Relays     - 30s Buffer, Logs     │
│   - Student List, Desks, Door     - Mode (AUTO / MANUAL)        - Presentation Step    │
└───────────────▲──────────────────────────────────▲──────────────────────────────▲──────┘
                │                                  │                              │
        State Mutation                      State Evaluation                Reads State
                │                                  │                              │
┌───────────────┴─────────────────┐ ┌──────────────┴───────────────┐ ┌────────────┴─────────────┐
│       SIMULATION ENGINE         │ │       AUTOMATION ENGINE       │ │     VIEW & RENDER LAYER     │
│  - Ingress/Egress Pathfinding   │ │  - Temp-to-PWM Transfer Curve │ │  - 3D Digital Twin Canvas   │
│  - Virtual Sensor Noise/Drift   │ │  - Lux + Occupancy Logic Gate │ │  - HUD Telemetry Cards      │
│  - PIR Pulse Generator          │ │  - Vacant Shutdown Evaluator  │ │  - Recharts Power Analytics │
│  - Presentation Script Runner   │ │  - Auto/Manual Mode Arbiter   │ │  - Event Log Feed Drawer    │
└─────────────────────────────────┘ └───────────────────────────────┘ └───────────────────────────┘
```

---

## 2. Layer Descriptions & Responsibilities

### 2.1 Environmental & Sensor Simulation Layer (`/simulation/`)
- Simulates physical environmental variables inside the room:
  - **Ambient Temperature:** Sliders/scripts update the virtual room temperature (18°C–40°C).
  - **Daylight Level:** Linked to virtual solar altitude / window curtains (0%–100%).
  - **Occupancy & Motion:** Tracks active student agents located inside the classroom boundary.
  - **Virtual PIR Sensor:** Evaluates occupant motion vectors. Generates active motion signals (`DETECTED`) with a 5-second latching window after any occupant movement.

### 2.2 Automation Engine Layer (`/simulation/automationEngine.ts`)
- Implements the exact algorithmic control flow that would execute on an embedded microcontroller (STM32/ESP32):
  - **Operating Mode Arbiter:** Checks whether system is in `AUTO` or `MANUAL`.
  - **Lighting Evaluator:** Evaluates logic `(occupancy > 0) && (ambientLight < THRESHOLD)`.
  - **HVAC/Fan Evaluator:** Maps temperature to PWM duty cycle via discrete hysteresis brackets.
  - **Zero-Occupancy Safeguard:** When occupancy == 0, unconditionally sets target fan PWM to 0% and opens lighting relays after a brief safety timeout.

### 2.3 Presentation & Scenario Runner (`/simulation/demoScenarios.ts`)
- Orchestrates automated demonstrations. Controls a discrete step state machine with pause/resume, countdown timers, and atomic state mutations that illustrate specific project requirements to academic examiners.

### 2.4 View & Visualization Layer (`/components/`)
- **3D Classroom Scene (`/components/classroom/`):** React Three Fiber canvas rendering the room architecture, interactive door, students sitting at desks, rotating ceiling fans, and illuminated ceiling light fixtures.
- **Dashboard & HUD (`/components/dashboard/`):** React + Tailwind HUD containing real-time telemetry gauges, control sliders, and manual override switches.
- **Analytics & History (`/components/analytics/`):** Recharts time-series data displaying dynamic power efficiency and environmental parameters.
- **Audit Event Log (`/components/dashboard/ActivityLog.tsx`):** Live log stream showing all rule transitions with millisecond timestamps.

---

## 3. Data Flow & State Lifecycle Diagram

```
[User moves Temperature Slider to 33°C]
                  │
                  ▼
[Store Action: `setTemperature(33)`]
                  │
                  ▼
[Automation Engine evaluates state]
  ├── Temp = 33°C (Bracket: 30°C–35°C)
  ├── Occupancy > 0? Yes
  └── Target PWM: 60% (~650 RPM)
                  │
                  ▼
[Store Action: `setFanTarget(60)` & `addLog('Temperature rose to 33°C. Fan PWM set to 60%')`]
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
[3D Render Loop]     [Dashboard HUD]
  R3F `useFrame`       - Slider displays 33°C
  Lerps fan angular    - Fan card updates: "60% PWM"
  velocity to 650 RPM  - Recharts plots new point
  Blades spin faster   - Audit log appends entry
```

---

## 4. Hardware Abstraction Interface (Future-Proofing Design)

Although this implementation is **strictly a software simulation**, the software architecture adheres to the **Dependency Inversion Principle**. Sensor inputs and actuator outputs interface through a standardized abstraction layer (`ISensorDataProvider` and `IActuatorController`):

```typescript
// Architectural interface abstraction
export interface ISensorTelemetry {
  temperature: number;      // °C
  humidity: number;         // % RH
  ambientLight: number;     // 0-100%
  pirDetected: boolean;     // Motion trigger
  occupancyCount: number;   // Count of detected occupants
}

export interface IActuatorCommands {
  lightRelay: boolean;      // true = ON, false = OFF
  fanPwm: number;           // 0 to 100%
}
```

In this simulation project, `SimulatedSensorProvider` implements this interface using mathematical models and UI slider hooks. If physical STM32/ESP32 hardware is integrated in future academic phases, a developer can replace `SimulatedSensorProvider` with `MqttSensorProvider` or `WebSerialSensorProvider` without refactoring any 3D visual or dashboard components.
