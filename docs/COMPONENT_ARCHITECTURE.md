# Component Architecture & Hierarchy Specification
## Smart Classroom Automation System — Interactive Digital Twin

---

## 1. High-Level Component Tree

```
App.tsx
├── Header.tsx (Title, "Simulation Mode" Badge, Mode Switcher, Reset Button)
├── MainLayout.tsx
│   ├── ClassroomHeroSection.tsx (Canvas & Scene Container)
│   │   ├── ClassroomCanvas.tsx (Three.js Canvas + R3F Context)
│   │   │   ├── CameraRig.tsx (OrbitControls with safety limits, auto-pan)
│   │   │   ├── EnvironmentLighting.tsx (Directional sunlight, ambient bounce)
│   │   │   ├── ClassroomRoom.tsx (Walls, floor, ceiling, windows, door)
│   │   │   │   └── ClassroomDoor.tsx (Hinged opening/closing mesh)
│   │   │   ├── ClassroomBoard.tsx (Smartboard with architecture schematic)
│   │   │   ├── FurnitureGrid.tsx
│   │   │   │   ├── TeacherDesk.tsx
│   │   │   │   └── DeskRow.tsx
│   │   │   │       └── StudentDeskChair.tsx (Procedural table + chair)
│   │   │   ├── StudentManager.tsx
│   │   │   │   └── StudentAvatar.tsx (Interpolated pathfinding, seating pose)
│   │   │   ├── ActuatorGrid.tsx
│   │   │   │   ├── CeilingFanBank.tsx
│   │   │   │   │   └── CeilingFanUnit.tsx (Motor housing + spinning blades)
│   │   │   │   └── CeilingLightGrid.tsx
│   │   │   │       └── CeilingLightUnit.tsx (Fluorescent troffer + spotlight)
│   │   │   ├── SensorNodes.tsx
│   │   │   │   ├── PirSensorNode.tsx (PIR dome + pulse wave effect)
│   │   │   │   ├── LdrSensorNode.tsx (Window LDR photocell model)
│   │   │   │   └── Dht22SensorNode.tsx (Wall-mounted enclosure)
│   │   │   └── PostProcessingEffects.tsx (Subtle bloom on active lights)
│   │   └── SceneOverlayHUD.tsx (On-canvas tooltips & camera preset pills)
│   │
│   ├── SidebarControlPanel.tsx (Environmental Sliders & Actions)
│   │   ├── ModeSelectorCard.tsx (AUTO vs MANUAL toggle switch)
│   │   ├── StudentControlsCard.tsx (Add/Remove student buttons, counter)
│   │   ├── SensorSlidersCard.tsx
│   │   │   ├── TemperatureSlider.tsx (18°C–40°C slider with gauge)
│   │   │   └── AmbientLightSlider.tsx (0%–100% daylight slider)
│   │   ├── ActuatorStatusCard.tsx
│   │   │   ├── LightRelayIndicator.tsx (ON/OFF badge & manual toggle)
│   │   │   └── FanPwmGauge.tsx (Duty cycle %, RPM, manual slider)
│   │   └── VirtualSensorBadgeGroup.tsx (DHT22, LDR, PIR status cards)
│   │
│   ├── PresentationDock.tsx (Bottom Timeline Navigation)
│   │   ├── DemoTimelineScrubber.tsx (14 step interactive progress bar)
│   │   ├── PlayPauseControls.tsx (Play, Pause, Step Next, Step Prev)
│   │   └── CurrentStepNarration.tsx (Title, description, expected outcome)
│   │
│   └── TelemetryAnalyticsSection.tsx (Lower Analytics Pane)
│       ├── TelemetryChart.tsx (Recharts live multi-metric area/line chart)
│       └── ActivityLogFeed.tsx (Timestamped chronological audit log)
└── Footer.tsx (Academic credits, disclaimer, tech badges)
```

---

## 2. Component Responsibility Matrix

| Component | Responsibility | Performance / Render Boundary |
| :--- | :--- | :--- |
| `ClassroomCanvas` | Houses WebGL context, R3F canvas, and camera setup | Isolated canvas; does not trigger React HTML re-renders |
| `CeilingFanUnit` | Spins fan blades along Y-axis via `useFrame` based on store's `targetFanPwm` | Direct Three.js ref mutation (`bladeGroup.rotation.y += speed * delta`) |
| `CeilingLightUnit`| Modulates emissive material and point light intensity | Listens to `lightState` boolean; smooth ramp-up |
| `StudentAvatar` | Manages 3D coordinate interpolation (door $\rightarrow$ desk) | Animates position vector on tick without re-rendering parent |
| `ClassroomDoor` | Animates door pivot angle during student ingress/egress | Group pivot rotation; closes automatically after walk completion |
| `PirSensorNode` | Emits translucent expanding pulse mesh when PIR detects motion | R3F ring mesh scale lerp |
| `SensorSlidersCard` | Renders sliders for temperature and ambient light | Selective Zustand subscriber; updates store on input |
| `ActuatorStatusCard`| Displays live PWM % and light relay; allows manual overrides | Reactive to actuator state; disabled in `AUTO` mode |
| `PresentationDock` | Drives automated demonstration scenarios | Global stepper controller |
| `TelemetryChart` | Plots last 30 time intervals of temp, occupancy, and PWM | Throttled 1-second update cycle |
| `ActivityLogFeed` | Displays scrollable chronological log of all automation actions | List items animated via Framer Motion |

---

## 3. Separation of Concerns & State Boundaries

- **State Independence:** The 3D scene consumes state from the Zustand store without managing its own parallel copy. No props are passed through long chains; components pick exact slices using Zustand selectors (`state => state.actuators.fanPwm`).
- **Render Loop Isolation:** High-frequency animations (fan rotation, student walking) execute purely inside the Three.js RAF render loop (`useFrame`), avoiding React component re-render thrashing.
- **Pure Logic:** All calculation of what PWM % to set or whether lights should be ON lives in pure helper functions (`/simulation/automationEngine.ts`), ensuring 100% testability with unit tests.
