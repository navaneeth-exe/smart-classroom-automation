# Technology Stack Specification & Rationale
## Smart Classroom Automation System — Interactive Digital Twin

---

## 1. Selected Technology Stack Overview

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION / UI LAYER                         │
│   React 18/19  •  TypeScript  •  Tailwind CSS  •  Lucide React         │
│   Framer Motion (HUD animations)  •  Recharts (Telemetry trends)       │
└────────────────────────────────────────────────────────────────────────┘
                                    ▲
                                    │ State bindings / Selectors
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    SIMULATION & STATE CORE LAYER                       │
│   Zustand (Micro-store)  •  Pure TypeScript Automation Engine          │
│   Deterministic Physics & Sensor Model  •  Event Bus & Audit Logger    │
└────────────────────────────────────────────────────────────────────────┘
                                    ▲
                                    │ Frame loop observation (useFrame)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  3D SCENE & INTERACTIVE DIGITAL TWIN                   │
│   Three.js  •  React Three Fiber (R3F)  •  @react-three/drei           │
│   @react-three/postprocessing (subtle bloom)  •  GLTF / Procedural     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Selection & Architectural Rationale

### 2.1 Core Framework & Language
- **React (18 / 19) + Vite:**
  - *Why:* Vite provides sub-second Hot Module Replacement (HMR) and optimized ES-module bundling, essential for rapid visual iteration of complex interactive 3D and UI components.
  - *Academic Benefit:* Zero-configuration build produces static HTML/JS/CSS assets ready for immediate presentation on any laptop or offline host.
- **TypeScript:**
  - *Why:* Strict typing ensures sensor inputs, actuator telemetry, coordinate vectors, and presentation step states remain type-safe. Eliminates runtime null pointer exceptions during live evaluations.

### 2.2 3D Graphics & Scene Rendering
- **Three.js & React Three Fiber (R3F):**
  - *Why:* Declarative component model for WebGL. Allows classroom components (`<CeilingFan />`, `<StudentDesk />`, `<SmartBoard />`, `<CeilingLight />`) to be built as self-contained React components while retaining raw Three.js performance.
  - *Why Not Plain Canvas/SVG:* An isometric 3D classroom provides authentic architectural depth, realistic perspective lighting cones, ceiling fan blade rotation angles, and volumetric spatial realism that impresses evaluators far beyond a flat 2D layout.
- **`@react-three/drei`:**
  - *Why:* Provides production-grade helpers including `<OrbitControls>`, `<Html>` overlays for in-scene sensor callouts, `<Environment>` presets, and camera rigging.
- **`@react-three/postprocessing`:**
  - *Why:* Enables subtle, controllable bloom effects on ceiling fluorescent/LED light fixtures when turned ON, creating clear visual contrast between powered and unpowered states.

### 2.3 UI, Layout & Styling
- **Tailwind CSS:**
  - *Why:* Modern utility-first CSS for crisp, high-density telemetry HUDs, control sliders, cards, and modal layouts. Ensures a cohesive, clean academic aesthetic without styling bloat.
- **Lucide React:**
  - *Why:* Clean, minimal, technical vector icons (e.g., `Thermometer`, `Sun`, `Users`, `Wind`, `Power`, `Activity`, `Cpu`, `Play`, `CheckCircle`) that match an engineering dashboard visual language.

### 2.4 State Management & Simulation Engine
- **Zustand:**
  - *Why:* Bare-metal speed, zero boilerplate, and out-of-component subscription capabilities. R3F render loops (`useFrame`) can read reactive state directly from the Zustand store without triggering expensive React component re-renders.
  - *Comparison:* Redux is excessively verbose for this client-side simulation; React Context causes unwanted re-render cascades across the entire scene graph.

### 2.5 Animation & Motion
- **Framer Motion:**
  - *Why:* Powers UI-layer animations (expanding drawer panels, active PIR status pulse halos, event log transitions, presentation step timeline breadcrumbs).
- **R3F / Three.js `useFrame` + Lerp Interpolation:**
  - *Why:* Governs physical continuous movement: ceiling fan blade angular velocity, smooth light dimming curves, and student walk trajectory interpolation.

### 2.6 Data Telemetry & Visual Analytics
- **Recharts:**
  - *Why:* Composable SVG charting library that effortlessly renders real-time multi-metric time-series curves (Classroom Temperature vs. Fan PWM % vs. Occupant Count) with custom styling and smooth transition curves.

---

## 3. Explicitly Excluded Technologies & Avoidance Rationale

| Excluded Technology | Reason for Rejection |
| :--- | :--- |
| **Backend (Node.js/Express, Python/Django)** | **Strictly unnecessary.** The application is a client-side simulation twin. Adding a server introduces deployment complexity, potential network failure during an academic viva, and latency. |
| **Full Heavy CSS Frameworks (Bootstrap, Material UI)** | Inflexible styling, bulky bundle footprint, and dated visual appearance compared to custom Tailwind CSS tokens. |
| **Heavy 3D Engines (Babylon.js, Unity WebGL)** | Unity WebGL builds often exceed 40MB+, have slow multi-second load times, and complicate integration with standard React UI overlays. R3F is lightweight and native to React. |
| **Physical Serial / WebSerial Drivers** | Explicitly out of scope for this simulation phase. Adding mock WebSerial would create confusion about whether real hardware is present. |
