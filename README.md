# Smart Classroom Automation System — Interactive Digital Twin

[![Simulation Only](https://img.shields.io/badge/Hardware-Software%20Simulation%20Only-blue.svg)](file:///docs/PROJECT_IDEA.md)
[![Status](https://img.shields.io/badge/Status-Specification%20%26%20Design%20Phase-orange.svg)](file:///docs/DEVELOPMENT_PHASES.md)
[![Frontend](https://img.shields.io/badge/Stack-React%20%7C%20TypeScript%20%7C%20Three.js%2FR3F-emerald.svg)](file:///docs/TECHSTACK.md)

> **IMPORTANT DISCLAIMER:**
> **This project is a 100% VISUAL & LOGICAL SOFTWARE SIMULATION ONLY.**
> There is **NO physical microcontroller (STM32, ESP32, Arduino)** or physical hardware sensors/actuators (DHT22, PIR, LDR, relays, MOSFETs, fans, lights) connected to the system. All environmental physics, classroom dynamics, student traffic, sensor signals, and automated control behaviors are modeled in client-side software. The web application serves as a live, interactive engineering project presentation and digital twin demonstration in place of static slides.

---

## 🌟 Overview

The **Smart Classroom Automation System — Digital Twin** is an interactive web-based 3D/isometric visual simulation designed for academic presentation, engineering viva, and live demonstration. It simulates an energy-efficient intelligent classroom environment that monitors occupancy, ambient illumination, temperature, and humidity, and dynamically governs HVAC ventilation and lighting without manual intervention.

Instead of traditional PowerPoint slides, this interactive web application acts as the project centerpiece: visitors and examiners can add/remove students, manipulate weather/daylight sliders, trigger presentation demo timelines, and inspect real-time automation decisions, virtual sensor telemetry, and historical energy analytics.

---

## 🚀 Key Features

- **Interactive 3D/Isometric Digital Twin Scene:**
  - Real-time animated classroom environment featuring walls, floor, blackboard/smartboard, teacher desk, student desks, chairs, doors, windows, ceiling fans, light fixtures, and virtual sensor modules.
  - Interactive students who walk in through the door, sit down at open desks, stand up, and exit upon command.
- **Physics-Informed Virtual Sensors:**
  - **Virtual DHT22:** Temperature (18°C–40°C) and relative humidity telemetry with subtle thermal effects.
  - **Virtual PIR:** Motion and occupancy sensing with animated pulse halos, tracking student entry/exit.
  - **Virtual LDR:** Ambient daylight measurement linked to exterior daylight/window conditions.
- **Intelligent Dual-Mode Automation Engine:**
  - **AUTO Mode:** Dynamic closed-loop automation based on environmental thresholds:
    - Temperature-responsive Fan PWM regulation (<25°C: 0%, 25–30°C: 30%, 30–35°C: 60%, >35°C: 100%).
    - Occupancy + Ambient Light co-dependent lighting activation (`IF occupancy > 0 AND ambientLight < threshold THEN ON`).
    - Automatic vacant classroom power shutdown.
  - **MANUAL Mode:** Direct user override over lighting relays and fan PWM duty cycle.
- **Engineering Telemetry Dashboard:**
  - Real-time telemetry cards, operational status indicators, and SVG/Recharts analytics for temperature, occupancy trends, and fan PWM history.
- **Live Event Audit Log:**
  - Chronological, timestamped record of sensor threshold crossings, student ingress/egress, and actuator relay trips.
- **Guided Presentation Mode:**
  - Automated 14-step end-to-end scenario demonstration with play/pause, step-forward, and timeline inspection.

---

## 🛠 Planned Technology Stack

| Layer | Primary Technologies |
| :--- | :--- |
| **3D Engine & Canvas** | Three.js, React Three Fiber (R3F), `@react-three/drei`, `@react-three/postprocessing` |
| **UI Framework & Core** | React 18 / 19, TypeScript, Vite |
| **Styling & Design System** | Tailwind CSS, Lucide React, SVG / CSS Keyframes |
| **Animation Systems** | Framer Motion (HUD/UI/Modals), R3F `useFrame` (fans/agents/lighting) |
| **State Management** | Zustand (Centralized reactive simulation store) |
| **Data Visualization** | Recharts (Telemetry trends and power analytics) |
| **Target Deployment** | Vercel / GitHub Pages (100% Client-side static SPA) |

---

## 📚 Documentation Index

Complete specifications and design blueprints are cataloged in [`docs/`](file:///docs/):

1. [**Project Idea & Concept**](file:///docs/PROJECT_IDEA.md) — Problem statement, academic motivation, and digital twin philosophy.
2. [**Product Requirements Document (PRD)**](file:///docs/PRD.md) — Functional/non-functional requirements and acceptance criteria.
3. [**Implementation Strategy**](file:///docs/IMPLEMENTATION.md) — Step-by-step engineering approach and safety patterns.
4. [**Technology Stack Specification**](file:///docs/TECHSTACK.md) — Technology rationale, trade-offs, and toolchain.
5. [**System Architecture**](file:///docs/ARCHITECTURE.md) — High-level architecture, state lifecycle, and hardware-readiness abstraction.
6. [**Simulation Engine Specification**](file:///docs/SIMULATION_ENGINE.md) — Automation logic, PWM curves, and state transition tables.
7. [**UI / UX Design System**](file:///docs/UI_UX.md) — Layout hierarchy, clean academic theme, typography, and controls.
8. [**Animation Specification**](file:///docs/ANIMATION_SPEC.md) — Motion timelines, transitions, fan rotational physics, and student pathing.
9. [**Asset & 3D Specification**](file:///docs/ASSET_SPEC.md) — Procedural geometries vs. GLTF models, lighting rigs, and textures.
10. [**Data Model & Types**](file:///docs/DATA_MODEL.md) — TypeScript interfaces for state, events, sensors, and actuators.
11. [**Component Architecture**](file:///docs/COMPONENT_ARCHITECTURE.md) — React & Three.js component tree hierarchy.
12. [**Demo Scenarios**](file:///docs/DEMO_SCENARIOS.md) — Step-by-step presentation script and verification scenarios.
13. [**Testing & Quality Assurance**](file:///docs/TESTING.md) — Simulation correctness, performance budgets, and edge cases.
14. [**Development Phases**](file:///docs/DEVELOPMENT_PHASES.md) — Phase 0 through Phase 10 implementation roadmap.

---

## 🚦 Current Status

- **Phase 0:** Complete System Specifications & Planning (**Completed**)
- **Phase 1:** Project Initialization & Core Scaffolding (**Next Phase**)

*Note: In accordance with project instructions, no production components or heavy dependencies are initialized prior to the documentation review and sign-off.*
