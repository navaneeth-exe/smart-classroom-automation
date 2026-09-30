# Development Phases & Implementation Roadmap
## Smart Classroom Automation System — Interactive Digital Twin

---

## 1. Phased Execution Roadmap

The implementation is structured into **11 sequential, testable milestones** (Phase 0 through Phase 10). Each phase concludes with a stable, runnable checkpoint.

```
Phase 0: Architecture & Complete Documentation  [DONE]
   │
Phase 1: Project Scaffolding & Toolchain Setup
   │
Phase 2: Design Tokens & Base UI Layout Frame
   │
Phase 3: 3D Scene Foundation & Classroom Structure
   │
Phase 4: Virtual Actuators (Ceiling Fans & Lighting Grid)
   │
Phase 5: Student Agent System (Ingress/Egress Pathfinding)
   │
Phase 6: Simulation & Automation Engine Logic
   │
Phase 7: Engineering HUD & Interactive Control Panel
   │
Phase 8: Telemetry Charts & Audit Event Logging Feed
   │
Phase 9: Automated Presentation & Viva Script Runner
   │
Phase 10: Performance Optimization, Polishing & Final Review
```

---

## 2. Phase Breakdown & Acceptance Criteria

### Phase 0: Complete Documentation & Architectural Specifications (Current Status: COMPLETED)
- **Goal:** Author exhaustive engineering specifications, data models, PRDs, and architecture blueprints.
- **Deliverables:**
  - `README.md`, `PROJECT_IDEA.md`, `PRD.md`, `IMPLEMENTATION.md`, `TECHSTACK.md`, `ARCHITECTURE.md`, `SIMULATION_ENGINE.md`, `UI_UX.md`, `ANIMATION_SPEC.md`, `ASSET_SPEC.md`, `DATA_MODEL.md`, `COMPONENT_ARCHITECTURE.md`, `DEMO_SCENARIOS.md`, `TESTING.md`, `DEVELOPMENT_PHASES.md`.
- **Completion Criteria:** All specifications written, internally consistent, and reviewed without writing premature code.

---

### Phase 1: Project Scaffolding & Toolchain Setup
- **Goal:** Initialize the Vite + React + TypeScript repository with essential tooling and directory structure.
- **Deliverables:**
  - `package.json` with scripts for `dev`, `build`, `preview`.
  - Tailwind CSS configured with custom color palette tokens (`tailwind.config.js`).
  - Lucide React and basic utility dependencies installed.
  - Project directory skeleton created (`/src/components/`, `/src/simulation/`, `/src/store/`, `/src/types/`).
- **Completion Criteria:** `npm run dev` serves a clean blank page with working Tailwind utility styles.

---

### Phase 2: Design System & Base UI Layout Frame
- **Goal:** Construct the header, layout shells, simulation badges, and responsive containers.
- **Deliverables:**
  - `Header.tsx` featuring the academic project title, persistent `● SIMULATION MODE ACTIVE` badge, and quick action bar.
  - Split-pane layout container: Classroom Hero Canvas on the left/top, Control & Sensor panel on the right, Analytics & Log dock at the bottom.
  - Clean slate/neutral theme with typography tokens.
- **Completion Criteria:** UI shell renders cleanly on desktop and collapses gracefully on smaller viewports.

---

### Phase 3: 3D Scene Foundation & Classroom Structure
- **Goal:** Construct the Three.js / React Three Fiber isometric classroom environment.
- **Deliverables:**
  - R3F Canvas setup with `<OrbitControls>` constrained to realistic viewing angles.
  - Procedural classroom room: Floor tiles, back/side walls, exterior window wall with daylight cutouts, smartboard panel, and teacher podium.
  - 4x5 array of student desks and chairs (20 total slots) with coordinate tracking.
  - Interactive entrance door group with hinge rotation pivot.
- **Completion Criteria:** 3D classroom scene renders smoothly with crisp lighting, shadows, and orbiting camera controls.

---

### Phase 4: Virtual Actuators (Ceiling Fans & Lighting Grid)
- **Goal:** Implement the physical 3D actuators with dynamic animation and illumination.
- **Deliverables:**
  - `CeilingFanBank`: 4 ceiling fans rotating in real-time inside `useFrame`.
  - Continuous rotational inertia lerp (acceleration/deceleration between 0%, 30%, 60%, 100% PWM).
  - `CeilingLightGrid`: 6 recessed light troffers with toggleable emissive glow, scene spotlights, and subtle bloom effect.
- **Completion Criteria:** Fans spin at rates matching store PWM targets; lights smoothly illuminate the room when triggered.

---

### Phase 5: Student Agent System (Ingress/Egress Pathfinding)
- **Goal:** Enable interactive human occupancy with smooth walk and seating animations.
- **Deliverables:**
  - Procedural student humanoid models with diverse shirt and hair palettes.
  - Animated entrance sequence: Door swings open $\rightarrow$ student walks down the aisle $\rightarrow$ sits at available desk $\rightarrow$ door shuts.
  - Animated exit sequence: Student stands up $\rightarrow$ walks to door $\rightarrow$ despawns $\rightarrow$ door shuts.
  - Desk assignment reservation tracker preventing coordinate overlap.
- **Completion Criteria:** Clicking "Add Student" or "Remove Student" reliably moves agents to and from desks with corresponding occupancy counter increments/decrements.

---

### Phase 6: Simulation & Automation Engine Logic
- **Goal:** Connect the closed-loop decision algorithms to the state store.
- **Deliverables:**
  - Centralized Zustand store (`useClassroomStore`) managing environmental physics, actuators, and modes.
  - Fan PWM transfer logic: `<25°C: 0%`, `25–30°C: 30%`, `30–35°C: 60%`, `≥35°C: 100%`.
  - Lighting co-dependent logic gate: `(Occupancy > 0) && (Light < 45%)`.
  - Automatic zero-occupancy power shutdown safeguard.
  - Mode switcher (`AUTO` vs `MANUAL`) with immediate state reconciliation on return to `AUTO`.
- **Completion Criteria:** Automated changes occur in real time as environmental variables change; unit tests pass.

---

### Phase 7: Engineering HUD & Interactive Control Panel
- **Goal:** Provide tactile controls and live numerical readouts for the demonstrator.
- **Deliverables:**
  - Virtual DHT22 card with interactive Temperature slider (18°C–40°C) and live Humidity indicator.
  - Virtual LDR card with Ambient Light slider (0%–100%) and 45% threshold marker.
  - Virtual PIR card with animated pulsating green motion radar wave.
  - Mode toggle switch (`AUTO` / `MANUAL`) and manual override sliders for lighting and fan speed.
- **Completion Criteria:** Moving any slider immediately drives both the 3D scene and the telemetry readouts without lag.

---

### Phase 8: Telemetry Charts & Audit Event Logging Feed
- **Goal:** Deliver engineering credibility with real-time data plots and audit trails.
- **Deliverables:**
  - Recharts multi-metric rolling chart tracking Temperature, Fan PWM %, and Occupancy over the last 30 time steps.
  - Chronological Activity Feed displaying formatted timestamps, category badges (`[SENSOR]`, `[ACTUATOR]`, `[OCCUPANCY]`), and clear plain-language descriptions.
- **Completion Criteria:** All automation events, threshold crossings, and ingress/egress actions are cleanly logged and plotted.

---

### Phase 9: Automated Presentation & Viva Script Runner
- **Goal:** Build the guided 14-step automated demonstration player.
- **Deliverables:**
  - Presentation Dock component docked at the bottom of the viewport.
  - Interactive timeline scrubber with 14 labeled steps.
  - Transport controls: Play / Pause, Next Step, Previous Step, and Step Jump.
  - Real-time narration subtitle card explaining what the evaluator is witnessing at each stage.
- **Completion Criteria:** Clicking "Play Demo" smoothly walks through all 14 scenarios automatically without human intervention.

---

### Phase 10: Performance Optimization, Polishing & Final Review
- **Goal:** Final hardening, frame rate stabilization, cross-device testing, and presentation prep.
- **Deliverables:**
  - Frame rate profiling to guarantee steady 60 FPS on standard desktop displays.
  - Responsive layout adjustments for standard classroom projectors (1920x1080 and 1366x768).
  - Keyboard shortcuts (Spacebar for Play/Pause, 'A' for Add Student, 'R' for Reset).
  - Code cleanup, strict type check passing (`tsc --noEmit`), and production build verification (`npm run build`).
- **Completion Criteria:** The application is 100% turnkey, bug-free, visually stunning, and ready for the academic project viva.
