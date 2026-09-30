# UI / UX Design System & Layout Specification
## Smart Classroom Automation System — Interactive Digital Twin

---

## 1. Visual Direction & Aesthetic Philosophy

- **Theme:** Premium, modern, technical light aesthetic.
- **Atmosphere:** Clean academic engineering laboratory / modern university smart hall.
- **Negative Constraints (What to avoid):**
  - No childish cartoon characters or toy-like iconography.
  - No dark, muddy, unreadable backgrounds.
  - No aggressive, overblown glassmorphism or distracting animated neon gradients.
  - No fake 3D clutter that slows down the frame rate.
- **Positive Design Tokens:**
  - Crisp typography (Inter, JetBrains Mono for telemetry figures).
  - High-contrast, clean slate/zinc surface panels with delicate borders (`border-slate-200`).
  - Tactile micro-interactions (soft shadows, active border indicators, smooth transitions).
  - Prominent technical telemetry readouts (monospaced metrics with units).

---

## 2. Color Palette & Semantic Tokens

| Token | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| **Canvas Background** | `#F8FAFC` (Slate 50) | Overall page backdrop |
| **Panel Surface** | `#FFFFFF` (Pure White) | Card and control surfaces |
| **Border Neutral** | `#E2E8F0` (Slate 200) | Subtle container outlines |
| **Text Primary** | `#0F172A` (Slate 900) | High-contrast headings and labels |
| **Text Secondary** | `#475569` (Slate 600) | Descriptions, units, and timestamps |
| **Accent Primary** | `#2563EB` (Blue 600) | Primary active state, simulation indicators |
| **Sensor: Temperature** | `#F97316` (Orange 500) | DHT22 temperature values |
| **Sensor: Humidity** | `#06B6D4` (Cyan 500) | DHT22 humidity values |
| **Sensor: Light / Lux** | `#EAB308` (Amber 500) | LDR daylight levels |
| **Sensor: PIR Motion** | `#10B981` (Emerald 500) | Motion detection & active occupancy pulse |
| **Actuator: Fan** | `#3B82F6` (Blue 500) | PWM duty cycle and rotational indicators |
| **Actuator: Lighting** | `#F59E0B` (Amber 500) | Active light glow and relay indicators |
| **Status Warning/Alert** | `#EF4444` (Red 500) | Emergency, high heat, empty room cutoff |

---

## 3. Screen Layout Architecture

The user interface follows a **Hero-Centered Engineering Cockpit** layout:

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [LOGO] Smart Classroom Automation — Digital Twin       [● SIMULATION MODE]  [Mode: AUTO/MANUAL] [Reset]  │
├──────────────────────────────────────────────────────────────────────────────────┬──────────────────────┤
│                                                                                  │  ENVIRONMENTAL       │
│                                                                                  │  SENSORS & SLIDERS   │
│                                                                                  ├──────────────────────┤
│                                                                                  │  DHT22 Temperature:  │
│                                                                                  │  [───●──────] 28.5°C │
│                                                                                  │  DHT22 Humidity: 54% │
│                                                                                  ├──────────────────────┤
│                                                                                  │  LDR Ambient Light:  │
│                                 3D DIGITAL TWIN                                  │  [─────●────] 40%    │
│                                CLASSROOM HERO SCENE                              ├──────────────────────┤
│                                                                                  │  PIR Occupancy:      │
│                     (Interactive Classroom, Student Walk Cycles,                 │  [● DETECTED] (4/20) │
│                       Ceiling Fans Spinning, Lights Glowing)                     ├──────────────────────┤
│                                                                                  │  STUDENT CONTROLS    │
│                                                                                  │  [+ Add Student]     │
│                                                                                  │  [- Remove Student]  │
│                                                                                  ├──────────────────────┤
│                                                                                  │  ACTUATOR STATUS     │
│                                                                                  │  Lights: [ ON (Auto) ]│
│                                                                                  │  Fan PWM: [ 60% PWM ]│
├──────────────────────────────────────────────────────────────────────────────────┴──────────────────────┤
│  PRESENTATION STEPPER TIMELINE: [◄ Prev]  [ ▶ Play Demo / Pause ]  [ Next ► ]   Step 4/14: Daylight Drop│
├──────────────────────────────────────────────────┬──────────────────────────────────────────────────────┤
│  LIVE TELEMETRY CHARTS (Temperature vs Fan PWM)  │  SYSTEM ACTIVITY & AUDIT EVENT LOG (Timestamped)     │
└──────────────────────────────────────────────────┴──────────────────────────────────────────────────────┘
```

---

## 4. Key Component Wireframes & Specifications

### 4.1 Header Bar
- Title: **Smart Classroom Automation System**
- Subtitle: *Interactive Digital Twin & Telemetry Simulator*
- Central Badge: `● SIMULATION MODE ACTIVE` (Amber/Emerald indicator badge clarifying virtual execution).
- Mode Selector Switch: Pill toggle between `AUTO` (default) and `MANUAL`.
- Action Buttons: `Reset All` (returns classroom to default empty state).

### 4.2 3D Classroom Canvas (The Hero Area)
- Dominates 65–70% of upper screen real estate.
- Interactive camera controls (gentle tilt/rotate with limits to prevent disorientation).
- Clear, unobstructed view into the room showing:
  - Entrance door at the side.
  - Rows of student desks.
  - Realistic overhead ceiling fan units and illuminated lighting troffers.
  - Floating technical callout tags (e.g., small translucent badge pointing to ceiling fan showing `60% PWM - 660 RPM`).

### 4.3 Control & Telemetry Sidebar
- **Sensor Cards:**
  - Card 1: *Virtual DHT22* — Large numerical temperature readout (°C), min/max slider (18°C–40°C), calculated relative humidity.
  - Card 2: *Virtual LDR* — Ambient daylight slider (0%–100%), threshold indicator line at 45%.
  - Card 3: *Virtual PIR* — Radial radar-style indicator with green pulse ring when motion is active; capacity progress bar (e.g. `4 / 20 Occupants - 20% Capacity`).
- **Student Operations Panel:**
  - `+ Add Student` (Primary blue button with user icon).
  - `- Remove Student` (Secondary slate button with user minus icon).
  - Quick presets: `Add 5 Students`, `Evacuate All`.

### 4.4 Presentation Timeline Dock
- Sticky dock at the bottom of the classroom viewport.
- Shows current step counter: `Step 03 of 14 — Ambient Light Drops Below 45%`.
- Interactive timeline scrubber dots allowing examiners to click and jump directly to any scenario.
- Controls: `Previous`, `Play / Pause (Spacebar shortcut)`, `Next`.

### 4.5 Live Analytics & Activity Log Section
- **Left Tab/Pane:** Recharts dynamic multi-line chart tracking Classroom Temperature (°C), Fan PWM Duty Cycle (%), and Student Occupancy over the last 30 intervals.
- **Right Tab/Pane:** Monospaced terminal-style activity feed with timestamps, color-coded tag pills (`[SENSOR]`, `[ACTUATOR]`, `[OCCUPANCY]`, `[MODE]`), and clear plain-language descriptions.

---

## 5. Responsive Behavior & Breakpoints

- **Desktop (≥ 1280px):** Side-by-side layout (Classroom 70% width, Controls 30% width). Telemetry and Activity Log side-by-side on bottom.
- **Laptop / Tablet Landscape (1024px–1279px):** Classroom occupies 60% width, Controls 40%. Charts collapse into tabbed switcher.
- **Tablet Portrait & Mobile (< 1024px):** Single-column stacked layout. Classroom canvas rendered on top with fixed aspect ratio (16:9). Controls, logs, and telemetry arranged in accessible swipeable tabs.
