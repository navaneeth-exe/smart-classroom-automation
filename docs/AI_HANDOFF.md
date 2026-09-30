# AI Assistant Handoff & Architecture Context

> **IMPORTANT NOTICE:**  
> This file is the **single primary context reference** for any AI assistant continuing development on this repository.  
> Read this file **first** before inspecting the codebase or touching any code.

---

## 1. PROJECT IDENTITY

- **Project Title:** Smart Classroom Automation System Using STM32
- **Tagline:** *"Smarter Classroom, Better Comfort, Efficient Energy Use"*
- **Current Deliverable:** High-Fidelity Interactive 3D Smart Classroom Digital Twin / Software Simulation Platform
- **Academic Context:** Engineering final year / competition project replacing static PowerPoint slides with a dynamic, physical, and visual simulation demonstrating closed-loop embedded automation.

> [!IMPORTANT]
> **100% Client-Side Simulation Only — No Physical Hardware Connected**  
> There is **no physical microcontroller (STM32, ESP32, Arduino)** and no physical sensors/actuators (DHT22, LDR, PIR, relays, MOSFETs, fans, lights) attached.  
> All physical principles, sensor transducers, ADC conversions, motion detection, and actuator outputs are mathematically modeled in client-side software. The UI communicates this transparently via persistent academic disclaimer badges.

---

## 2. PROJECT GOAL

1. **What It Demonstrates:**
   - Autonomous closed-loop environmental management of a modern university lecture hall.
   - Dual-condition occupancy & ambient-light dependent ceiling lighting control.
   - Multi-stage proportional temperature-to-PWM fan speed regulation.
   - Zero-waste automated vacancy timeout power conservation.
   - Immediate seamless switching between autonomous (`AUTO`) and operator override (`MANUAL`) modes.

2. **The Academic Problem:**
   - University lecture halls squander vast kilowatt-hours of electrical energy running high-power lighting fixtures and ceiling fans in empty or unoccupied rooms, or keeping lights fully powered on sunny afternoons with ample daylight.

3. **What the Web Application Accomplishes:**
   - Provides an interactive digital twin allowing academic evaluators to directly manipulate physical environmental variables (temperature, humidity, external solar lux) and occupancy traffic, and watch the virtual classroom and sensors respond in real time.

---

## 3. CURRENT IMPLEMENTATION STATUS

| System / Component | Status | Notes |
| :--- | :---: | :--- |
| **React 19 Application Core** | **DONE** | Clean TypeScript project built on Vite 6 |
| **3D Classroom Geometry** | **DONE** | Architecturally proportioned (12m x 8.5m x 3.5m) with floor, walls, windows, blackboard, teacher station |
| **Student Humanoid Agents** | **DONE** | Procedural 3D humanoid models with diverse palettes, sitting postures, and backpacks |
| **Student Kinematics & Walking** | **DONE** | Multi-waypoint aisle navigation, walk bobbing, leg swinging, desk seating |
| **Classroom Door Kinematics** | **DONE** | Smooth swinging door synchronized with student entering/exiting events |
| **Ceiling Fans (4 units)** | **DONE** | Physics-based rotational inertia model with smooth acceleration/deceleration |
| **Ceiling Lights (6 units)** | **DONE** | Recessed LED troffers with frosted acrylic diffusers, emissive glow, and downward spotlights |
| **Virtual PIR Motion Sensor** | **DONE** | Ceiling-mounted sensor near door with active teal lens and expanding pulse wave |
| **Virtual LDR Daylight Sensor** | **DONE** | Window-mounted photoresistor with lux percentage readout and threshold indicator |
| **Virtual DHT22 Sensor** | **DONE** | Wall-mounted temperature & humidity enclosure with thermal atmosphere color lerp |
| **Zustand Simulation Engine** | **DONE** | Single source of truth managing all environmental physics and actuator states |
| **Automation Rules** | **DONE** | Pure deterministic calculation functions in `src/simulation/automationEngine.ts` |
| **AUTO / MANUAL Modes** | **DONE** | Global operating mode toggle with dedicated manual actuator overrides |
| **Control Center (`/controls`)** | **DONE** | Sliders for temperature and lux, occupancy stepper, manual switches, reset |
| **Telemetry Analytics (`/analytics`)** | **DONE** | 4 rolling Recharts waveforms, metric summaries, and chronological event timeline |
| **Activity Event Log** | **DONE** | Live categorized audit log of state changes, sensor triggers, and mode shifts |
| **Cinematic Presentation (`/presentation`)** | **DONE** | 13-scene guided evaluation walkthrough with auto-advance, transport dock, and HUD |
| **Cinematic Camera System** | **DONE** | Smooth camera lerping (`CameraTransitionController`) between 10 presets and inspected targets |
| **Design System & UI Polish** | **DONE** | Consistent premium light theme, subtle borders, soft shadows, Framer Motion page transitions |
| **Deployment Setup** | **DONE** | Pure client-side static build compatible with Vercel / GitHub Pages |

---

## 4. CURRENT USER FLOW

```
User enters application (http://localhost:5173/)
      │
      ├──> Dashboard & Twin (/)
      │     ├── 3D Classroom dominates right side (orbit, inspect fans/lights/students/sensors)
      │     ├── Quick Environmental & Occupancy controls on left sidebar
      │     └── Compact system status bar on bottom
      │
      ├──> Dedicated Classroom View (/classroom)
      │     └── Full-screen 3D viewport optimized for projector viva demonstrations
      │
      ├──> Sensors & Controls (/controls)
      │     ├── Detailed temperature slider (18°C – 40°C)
      │     ├── Ambient daylight lux slider (0% – 100%)
      │     ├── Add / Remove student buttons
      │     └── Manual actuator overrides (Force lights ON/OFF, Fan 0–100% PWM)
      │
      ├──> Analytics & Logs (/analytics)
      │     ├── 4 continuous waveforms (Temperature, Occupancy, Fan Speed, Ambient Light)
      │     ├── Telemetry summary cards with live status
      │     └── Chronological activity event audit log
      │
      └──> Cinematic Presentation Mode (/presentation)
            ├── Evaluator presses "Start Presentation"
            └── 13-scene guided sequence demonstrates complete closed-loop automation
```

---

## 5. TECH STACK

Only installed and confirmed packages from `package.json`:

- **Framework:** React `19.0.0`, React DOM `19.0.0`
- **Language:** TypeScript `~5.7.2`
- **Build Tool:** Vite `6.0.7`
- **Styling:** Tailwind CSS `3.4.17`, PostCSS `8.4.49`, Autoprefixer `10.4.20`, `clsx`, `tailwind-merge`
- **3D Graphics:** Three.js `0.180.0`, `@react-three/fiber` `9.1.2`, `@react-three/drei` `10.0.7`
- **State Management:** Zustand `5.0.3`
- **UI Animation:** Framer Motion `12.40.0`
- **Charts & Telemetry:** Recharts `2.15.0`
- **Icons:** Lucide React `1.16.0`
- **Routing:** React Router DOM `7.13.0`

*(Note: Postprocessing `@react-three/postprocessing` is in package.json but lightweight native lighting was prioritized for performance without GPU bloat).*

---

## 6. ARCHITECTURE

```
                          ┌───────────────────────────┐
                          │   Zustand Unified Store   │
                          │(simulation/classroomStore)│
                          └─────────────┬─────────────┘
                                        │ (Single Source of Truth)
            ┌───────────────────────────┼───────────────────────────┐
            ▼                           ▼                           ▼
┌───────────────────────┐   ┌───────────────────────┐   ┌───────────────────────┐
│   Automation Engine   │   │  3D Canvas & WebGL    │   │  UI / Cockpit Views   │
│(automationEngine.ts)  │   │  (ClassroomCanvas.tsx)│   │  (Controls/Analytics) │
│ - Light rule gate     │   │ - Dynamic lighting    │   │ - Environmental sliders│
│ - Fan speed brackets  │   │ - Fan physics lerp    │   │ - Recharts waveforms  │
│ - Occupancy & PIR     │   │ - Student walking     │   │ - Activity event log  │
│ - Vacancy countdown   │   │ - Object focus modal  │   │ - Presentation HUD    │
└───────────────────────┘   └───────────────────────┘   └───────────────────────┘
```

### Key Architectural Boundaries:
1. **Single Source of Truth:** `src/simulation/classroomStore.ts` holds all state. Components never maintain duplicate or secondary simulation engines.
2. **Deterministic Rules:** Automation decisions live in `src/simulation/automationEngine.ts` and are called through `store.recalculateAutomation()`.
3. **No Direct State Faking:** Presentation mode, controls, and student actions all dispatch actions through the store, triggering natural physical interpolation in the 3D scene.

---

## 7. SIMULATION ENGINE SPECIFICATION

**Store Location:** `src/simulation/classroomStore.ts`  
**Types:** `src/simulation/simulationTypes.ts`  
**Rules:** `src/simulation/simulationRules.ts`

### State Variables & Defaults:
- `temperature`: `number` (Default: `24.0` °C, Range: `18.0 – 40.0` °C)
- `humidity`: `number` (Default: `55` % RH, Range: `30 – 90` %)
- `lightIntensity`: `number` (Default: `65` %, Range: `0 – 100` % ambient daylight)
- `occupancy`: `number` (Default: `0`, Range: `0 – 16` students)
- `maxOccupancy`: `number` (Default: `16`)
- `pirDetected`: `boolean` (Default: `false`)
- `lightState`: `boolean` (Default: `false` master light relay)
- `fanState`: `boolean` (Default: `false` fan relay)
- `fanSpeed`: `number` (Default: `0` %, Brackets: `0%`, `30%`, `60%`, `100%`)
- `mode`: `'AUTO' | 'MANUAL'` (Default: `'AUTO'`)
- `systemStatus`: `'IDLE' | 'ACTIVE' | 'SHUTDOWN_PENDING'` (Default: `'IDLE'`)
- `thresholds`:
  - `fanLowTemp`: `25` °C
  - `fanMedTemp`: `30` °C
  - `fanHighTemp`: `35` °C
  - `lightThreshold`: `40` %
  - `inactivityDelayMs`: `3000` ms

### Automation Rules:
- **Lighting Automation:** `Lights ON` if and only if `occupancy > 0` **AND** `lightIntensity < 40%`. If occupancy is 0 or daylight is >= 40%, lights turn OFF.
- **Fan Automation:**
  - `occupancy === 0`: Fan is `OFF` (0% PWM).
  - `temperature < 25°C`: Fan is `OFF` (0% PWM, idle comfort band).
  - `25°C <= temperature < 30°C`: Fan is `ON` at `30% PWM` (low gentle airflow).
  - `30°C <= temperature < 35°C`: Fan is `ON` at `60% PWM` (medium airflow).
  - `temperature >= 35°C`: Fan is `ON` at `100% PWM` (maximum thermal cooling).
- **Inactivity Shutdown:** When occupancy transitions to 0, an inactivity timer (3s simulated latch) runs before cutting actuator power to idle baseline.

---

## 8. STUDENT & KINEMATICS SYSTEM

- **Data Structure (`StudentData`):** `id`, `deskId`, `state`, `deskPosition`, `chairPosition`, `currentPosition`, `rotationY`, `palette`, `progress`.
- **States:** `'ENTERING'` → `'WALKING_TO_DESK'` → `'SITTING'` → `'IDLE'` → `'STANDING'` → `'EXITING'`.
- **Navigation:**
  - Enters from door at `[6.8, 0, 2.5]`, walks through doorway to `[5.2, 0, 2.5]`.
  - Turns down center aisle (`X = 0`) to reach designated desk row.
  - Turns into desk column to reach chair position `chairPosition`.
  - Sits on chair pan (`Y = 0.44m`) with horizontal thighs and hands on desk.
- **Door Kinematics:** Door swings open smoothly (`rotationY = -Math.PI / 2.2`) when students enter or exit, and springs closed when aisle is clear.

---

## 9. 3D CLASSROOM STRUCTURE

**Root Canvas:** `src/components/classroom/ClassroomCanvas.tsx`  
**Scene Container:** `src/components/classroom/ClassroomScene.tsx`

| Component | Responsibility |
| :--- | :--- |
| `ClassroomStructure.tsx` | Floor slab, acoustic ceiling, perimeter walls, exterior window cutouts |
| `Floor.tsx` | Concrete slab with subtle tiled grid lines |
| `Walls.tsx` & `Door.tsx` | Front wall with chalkboard alcove, side wall with windows, dynamic swing door |
| `Window.tsx` | 3 architectural glass panes streaming exterior directional sunlight |
| `Blackboard.tsx` | Front interactive board with chalk diagrams and inspection trigger |
| `TeacherDesk.tsx` | Instructor podium, executive desk, and swivel chair |
| `StudentDesk.tsx` | 16 desk-chair units in 4x4 layout with center aisle (memoized) |
| `CeilingFan.tsx` | 4 units in 2x2 grid with physics-based angular velocity & inertia |
| `CeilingLight.tsx` | 6 recessed LED troffers in 2x3 grid with frosted lens & downward spot |
| `Student.tsx` | Dynamic humanoid character reacting to walking/sitting states |
| `SensorPlaceholders.tsx` | Enclosures for virtual PIR (ceiling), LDR (window), DHT22 (wall) |
| `ClassroomDecor.tsx` | Analog clock, technical posters, potted corner plant, fire extinguisher (memoized) |
| `ObjectInfoModal.tsx` | Translucent glassmorphic inspection card with camera focus on click |

---

## 10. SENSOR SIMULATION DETAILS

1. **Virtual DHT22 (Temperature & Humidity):**
   - Mounted on side wall at `[-5.85, 1.6, -2.5]`.
   - Connected to simulation state `temperature` and `humidity`.
   - Modulates ambient 3D atmosphere color (cool neutral < 25°C, warm daylight 25-30°C, warm amber > 30°C).
2. **Virtual LDR (Daylight Sensor):**
   - Mounted beside window frame at `[-5.85, 2.4, 0]`.
   - Connected to simulation state `lightIntensity`.
   - Modulates window directional sunlight intensity in 3D canvas (0.0 to 1.35).
3. **Virtual PIR (Passive Infrared Occupancy Sensor):**
   - Mounted on ceiling above entrance door at `[4.8, 3.44, 2.5]`.
   - Lens material turns teal emissive when active; expands dynamic downward pulse ring wave.

---

## 11. LIGHTING SYSTEM

- **Automatic Logic:** Closed-loop gate evaluated every state update (`occupancy > 0 && lightIntensity < 40%`).
- **Manual Mode:** Presenter can force lights ON or OFF regardless of sensors.
- **Visuals:** When lights activate, troffer diffusers switch from dark slate to warm emissive yellow, and downward spotlights illuminate the desks. When OFF, ambient baseline lighting keeps the classroom clearly visible.

---

## 12. FAN SYSTEM

- **Inertia Model:** In `CeilingFan.tsx`, angular velocity uses distinct acceleration (`2.5`) vs. deceleration (`0.9`) factors to simulate motor torque and air drag.
- **Speed Brackets:** 0% (0 RPM), 30% (gentle breeze), 60% (medium circulation), 100% (high emergency cooling).
- **Manual Override:** Presenter can set arbitrary PWM percentage (0–100%) in manual mode.

---

## 13. CONTROL CENTER (`/controls`)

- **Mode Selector:** AUTO vs. MANUAL buttons.
- **Sliders:**
  - Simulated Temperature (18°C – 40°C in 0.5°C steps).
  - Ambient Daylight (0% – 100% in 1% steps).
- **Occupancy Stepper:** Quick Add / Remove student buttons.
- **Manual Overrides Card:** Individual toggles for lights and fan PWM slider when in MANUAL mode.
- **Reset Button:** Instant return to pristine factory defaults.

---

## 14. ANALYTICS & LOGS (`/analytics`)

- **Telemetry Sampling:** Headless 2.5-second sampling loop (`recordTelemetrySample`) records rolling history buffer (capped at 100 samples).
- **Waveform Charts (Recharts):**
  1. Temperature Over Time (°C)
  2. Classroom Occupancy (Students)
  3. Fan Speed (PWM %)
  4. Ambient Light vs Light Actuation State
- **Activity Log:** Chronological, categorized (`OCCUPANCY`, `ACTUATOR`, `SENSOR`, `MODE`, `SYSTEM`) events with formatted timestamps.

---

## 15. CINEMATIC PRESENTATION MODE (`/presentation`)

- **Timeline Engine:** `src/components/presentation/presentationTimeline.ts` (13 defined scenes).
- **Controls:** Start Presentation, Pause, Resume, Previous, Next, Restart, Exit Presentation.
- **HUD Readout:** Live sensor & actuator telemetry bar (`Occ`, `PIR`, `Lux`, `Light`, `Temp`, `Fan`).
- **Cinematic Camera:** Automatically pans between camera presets (`overview`, `entrance`, `pir`, `lights`, `fan`, `dht22`) using smooth vector lerping.
- **Single Source of Truth:** Every scene triggers real store actions, verifying actual automation logic rather than mocking visual states.

---

## 16. ROUTES

| Route | Purpose | Status |
| :--- | :--- | :---: |
| `/` | Dashboard & Cockpit: 3D Classroom + sidebar controls + status bar | **ACTIVE** |
| `/classroom` | Dedicated full-viewport 3D Classroom for projector demonstrations | **ACTIVE** |
| `/controls` | Fine-grained environmental sliders, occupancy controls, and manual switches | **ACTIVE** |
| `/analytics` | Historical telemetry waveforms, metric summary cards, and activity log | **ACTIVE** |
| `/presentation` | 13-scene guided evaluation walkthrough for project viva | **ACTIVE** |

---

## 17. IMPORTANT FILE STRUCTURE

```
smart_classroom_automation/
├── docs/                               # Engineering documentation
│   ├── AI_HANDOFF.md                  # <-- Primary context document (this file)
│   ├── PROJECT_STATE.md               # <-- Quick reference summary
│   ├── PRD.md                         # Product requirements document
│   ├── ARCHITECTURE.md                # System architecture
│   └── SIMULATION_ENGINE.md           # Mathematical rules & formulas
├── src/
│   ├── App.tsx                        # Router configuration
│   ├── main.tsx                       # React root entry point
│   ├── index.css                      # Tailwind base styles & font import
│   ├── components/
│   │   ├── layout/                    # Header, Navigation, MainLayout
│   │   ├── classroom/                 # 3D Classroom Scene & Models
│   │   │   ├── ClassroomCanvas.tsx    # R3F Canvas, Camera & Lighting
│   │   │   ├── ClassroomScene.tsx     # Scene composite container
│   │   │   ├── classroomConfig.ts     # Desk positions & camera presets
│   │   │   ├── CeilingFan.tsx         # Fan model with physics lerp
│   │   │   ├── CeilingLight.tsx       # LED troffer light model
│   │   │   ├── Student.tsx            # Humanoid student model
│   │   │   └── SensorPlaceholders.tsx # 3D PIR, LDR, and DHT22 models
│   │   ├── controls/                  # ControlSidebar, CompactSystemStatus
│   │   ├── analytics/                 # AnalyticsCharts, ActivityLog, SummaryCards
│   │   └── presentation/              # presentationTimeline.ts
│   ├── pages/                         # DashboardPage, ClassroomPage, ControlsPage,
│   │                                  # AnalyticsPage, PresentationPage
│   ├── simulation/                    # Single source of truth simulation core
│   │   ├── classroomStore.ts          # Central Zustand store & actions
│   │   ├── automationEngine.ts        # Pure automation logic rules
│   │   ├── simulationRules.ts         # Initial state & default thresholds
│   │   └── simulationTypes.ts         # TypeScript definitions
│   └── store/                         # Barrel re-exports for backward compatibility
```

---

## 18. KEY FILES REFERENCE

| File | Purpose | Why It Matters |
| :--- | :--- | :--- |
| `src/simulation/classroomStore.ts` | Central Zustand Simulation Store | **Single source of truth** for all sensor values, students, actuators, logs, and telemetry. |
| `src/simulation/automationEngine.ts` | Automation Engine Decision Logic | Contains pure evaluation functions: `calculateFanState`, `calculateLightState`, `calculateOccupancyState`. |
| `src/components/classroom/ClassroomCanvas.tsx` | 3D WebGL Canvas & Camera | Manages R3F canvas, `CameraTransitionController`, OrbitControls, and dynamic ambient/sun lighting. |
| `src/components/classroom/classroomConfig.ts` | Layout Coordinates & Camera Presets | Defines 16 desk coordinates and camera view positions (`overview`, `entrance`, `pir`, etc.). |
| `src/pages/PresentationPage.tsx` | Presentation Mode Controller | Manages the 13-scene guided evaluation scenario and transport controls. |
| `src/components/analytics/AnalyticsCharts.tsx` | Real-time Telemetry Charts | Recharts Area and Line waveforms plotting rolling sensor and actuator data. |

---

## 19. DESIGN SYSTEM GUIDELINES

- **Theme:** Premium light engineering aesthetic (slate-50 background, white elevated cards, subtle slate-200 borders).
- **Typography:** Modern clean sans-serif (Inter system font stack) with monospace accents for sensor readouts.
- **Restrained Accents:**
  - Blue (`#2563eb`): Primary interactive elements & occupancy.
  - Emerald (`#10b981`): Simulation status & PIR active state.
  - Amber (`#f59e0b`): Lights ON state & manual override warnings.
  - Orange/Red (`#ea580c`): Temperature & high thermal load.
- **Rules:** No neon cyberpunk styling, no oversized bouncy animations, no dark mode inversion, no generic admin template appearances.

---

## 20. USER REQUIREMENTS & NON-NEGOTIABLES

1. **English language UI only.**
2. **Pure client-side software simulation:** Do not attempt to add physical backend bridges, MQTT, serial ports, or database connections.
3. **Simulation engine is the single source of truth:** Visual elements must reflect Zustand store state; never create detached fake local state for visual presentation.
4. **Preserve existing functionality:** Never rewrite or replace working 3D components or simulation logic.
5. **Clean build:** Keep TypeScript compiler clean (`npx tsc --noEmit` must pass with 0 errors).

---

## 21. DEVELOPMENT RULES FOR NEXT AI

1. Read this file (`docs/AI_HANDOFF.md`) before taking any action.
2. Inspect only the files directly relevant to the user's requested task.
3. Make small, targeted changes. Do not perform full codebase refactors.
4. Verify only the specific new changes made during your turn.
5. Do not repeat build or route verification checks that were already proven functional.
6. Stop immediately after completing and minimally verifying the user's prompt.

---

## 22. COMPLETED IMPLEMENTATION PHASES

- **Phase 1 — Foundation:** Project setup, Tailwind styling, routing, navigation shell. *(Status: DONE)*
- **Phase 2 — 3D Classroom:** Three.js / R3F classroom geometry, desks, chairs, fans, lights, blackboard. *(Status: DONE)*
- **Phase 3 — Students:** Procedural humanoid student models, door swing kinematics, walking and seating. *(Status: DONE)*
- **Phase 4 — Simulation Engine:** Centralized Zustand store, deterministic automation rules, event logging. *(Status: DONE)*
- **Phase 5 — 3D Integration:** Connected simulation state to 3D fan physics, lighting relays, PIR pulse, and object inspection. *(Status: DONE)*
- **Phase 6 — Control Center:** Cockpit dashboard, environmental sliders, occupancy controls, compact status bar. *(Status: DONE)*
- **Phase 7 — Analytics:** Rolling telemetry buffer, Recharts waveforms, chronological activity event log. *(Status: DONE)*
- **Phase 8 — Presentation Mode:** 13-scene guided evaluation walkthrough with camera presets and transport controls. *(Status: DONE)*
- **Phase 9 — UI Polish & Performance:** Smooth camera lerping, memoized geometries, Framer Motion transitions, responsive layout polish. *(Status: DONE)*

---

## 23. KNOWN ISSUES

- None. The TypeScript compiler passes with 0 errors (`npx tsc --noEmit`), and all 5 routes (`/`, `/classroom`, `/controls`, `/analytics`, `/presentation`) render cleanly in the browser.

---

## 24. SYSTEMS TO NOT TOUCH (WORKING PROPERLY)

- `src/simulation/classroomStore.ts` (Core simulation state)
- `src/simulation/automationEngine.ts` (Core automation formulas)
- `src/components/classroom/CeilingFan.tsx` (Physics rotational inertia model)
- `src/components/classroom/ClassroomCanvas.tsx` (Canvas & camera transition system)
- `src/components/classroom/classroomConfig.ts` (Desk and camera preset coordinates)
- `src/components/presentation/presentationTimeline.ts` (13-scene presentation sequence)

---

## 25. NEXT RECOMMENDED WORK (IF REQUESTED BY USER)

1. **Phase 10 — Final Evaluation Polish & Packaging:**
   - Add downloadable simulation telemetry report (CSV or JSON export of activity log & telemetry history).
   - Add presentation keyboard shortcuts (Space for Play/Pause, Left/Right arrows for scene navigation).
   - Ensure production bundle build optimization (`npm run build`).

---

## 26. COMMANDS REFERENCE

```bash
# Start local development server (port 5173)
npm run dev

# Check TypeScript build without emitting files
npx tsc --noEmit

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## 27. FINAL SUMMARY

- **PROJECT STATUS:** Fully functional Phase 1–9 implementation complete and synced to GitHub (`main`).
- **CURRENT MAIN SYSTEM:** Client-side React 19 + Three.js / R3F Smart Classroom Digital Twin.
- **BLOCKERS:** None.
- **ARCHITECTURE RULE:** Zustand store is the single source of truth; all UI and 3D scenes reactively derive from it.
- **USER PREFERENCE:** Clean, premium light engineering design with realistic-stylized 3D classroom as the primary focus.
