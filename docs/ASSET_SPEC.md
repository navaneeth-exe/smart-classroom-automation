# Asset & 3D Geometry Specification
## Smart Classroom Automation System — Interactive Digital Twin

---

## 1. Asset Strategy: Procedural vs. Static Assets

To ensure high performance, crisp rendering at all resolutions, zero broken asset URLs, and instant load times, the classroom scene uses a **Hybrid Procedural Architecture**:

- **A. Procedural Three.js Geometries & Shaders:** All primary structural and dynamic objects (walls, desks, chairs, rotating fan blades, glowing light troffers, door hinges, sensor housings) are constructed procedurally using Three.js primitive geometries (`BoxGeometry`, `CylinderGeometry`, `ExtrudeGeometry`) paired with customized PBR materials (`MeshStandardMaterial`).
- **B. Modular Visual Variations:** Student agents are constructed using low-poly articulated humanoid meshes with randomized clothing palettes, hair styles, and seated poses.
- **C. 2D Graphical Vector Assets:** Chalkboard diagrams, UI badges, and technical schematics are rendered using high-resolution SVG.

> **CRITICAL ARCHITECTURAL RULE:**
> The classroom is **NOT a static pre-rendered raster image or backdrop**. Every desk, light fixture, fan blade, door, and student is an independent node in the scene graph that can be individually moved, rotated, illuminated, and tracked.

---

## 2. Component Geometry Breakdown

### 2.1 Classroom Shell
- **Floor:**
  - Geometry: `PlaneGeometry(16, 12)` with grid tiling lines.
  - Material: Matte light gray acoustic tile or polished laminate (`roughness: 0.35`, `color: "#E2E8F0"`).
- **Walls (Back Wall & Window Wall):**
  - Left & Back walls: `BoxGeometry` forming room perimeter. Neutral academic off-white (`#F8FAFC`).
  - Cutouts: Large rectangular window frames along the exterior wall.
- **Windows:**
  - Geometry: Extruded aluminum frames with translucent glass panels (`transmission: 0.9`, `roughness: 0.1`, `transparent: true`, `opacity: 0.4`).
- **Classroom Door:**
  - Geometry: Modern institutional door with vision panel and metallic handle.
  - Pivot Point: Group offset to the door hinge corner so rotational math `rotation.y = angle` opens and closes the door naturally.

### 2.2 Furniture Grid
- **Student Desks (20 Units in 4x5 Matrix):**
  - Tabletop: Oak veneer procedural box (`#D97706` / `#FDE68A`, `roughness: 0.6`).
  - Legs: Welded tubular steel cylinders (`#475569`, `metalness: 0.85`, `roughness: 0.2`).
- **Student Chairs (20 Units):**
  - Molded plastic ergonomic seat shell (`#2563EB`, `#0D9488`, `#64748B` variations) mounted on tubular chrome legs.
- **Teacher Podium & Desk:**
  - Located at the front of the classroom adjacent to the board. Includes podium laptop representation and instructor chair.
- **Blackboard / Smartboard:**
  - Large wall-mounted rectangular panel with dark slate finish and white chalk/digital marker system diagram depicting the Smart Classroom Automation architecture.

### 2.3 Actuator Meshes
- **Ceiling Fans (4 Quad-Array Units):**
  - Downrod & Motor Housing: Cylinder and bell-shaped central casing (`#F1F5F9`, `metalness: 0.4`).
  - Blade Group: 3 aerodynamic aerofoil blades angled at 120° intervals around the central shaft.
  - Pivot: Rotates along the local Y-axis inside `useFrame`.
- **Ceiling Light Fixtures (6 Recessed Troffers in 2x3 Grid):**
  - Housing: Recessed white aluminum troffer frame (`BoxGeometry`).
  - Diffuser Lens: Frosted polycarbonate panel with controllable `emissive` color and `emissiveIntensity` (0.0 when off, 2.5 when on).

### 2.4 Sensor Enclosure Meshes
- **Virtual PIR Sensor:**
  - Enclosure: White hemispherical dome mounted on the ceiling near the door threshold.
  - Lens: Faceted fresnel dome texture/geometry.
- **Virtual LDR Sensor:**
  - Small wall-mounted enclosure near the window frame with exposed dark photo-sensitive cell.
- **Virtual DHT22 Module:**
  - Wall-mounted white slotted rectangular enclosure representing standard DHT22 plastic casing.

### 2.5 Student Character Models
- **Mesh Composition:**
  - Low-poly stylized procedural humanoid composed of:
    - Head & Hair group (`SphereGeometry`).
    - Torso (`CylinderGeometry` or contoured box) with shirt color variations.
    - Arms and Legs with articulated joints for transition between walking pose and seated pose.
- **Color Variations (Seed-Based):**
  - Shirts: Royal Blue, Forest Green, Amber, Burgundy, Slate, Lavender.
  - Skin/Hair tones: Diverse, clean aesthetic palettes.

---

## 3. Asset Directory Structure (Planned for Code Phase)

```
public/
├── assets/
│   ├── svgs/
│   │   ├── board-diagram.svg        # Architecture flowchart displayed on smartboard
│   │   ├── university-crest.svg     # Subtle academic logo on front wall
│   │   └── sensor-schematics.svg    # Wiring callouts for educational inspection
│   └── textures/
│       ├── floor-tile-normal.jpg    # (Optional) subtle bump map for floor tiles
│       └── wood-desk-diffuse.jpg    # (Optional) clean procedural wood texture
```

---

## 4. Visual Quality & Rendering Standards
- **Scale:** Standard metric scale (1 unit in Three.js = 1 meter in real space).
  - Classroom: 12m wide × 8m deep × 3.5m ceiling height.
  - Student Desks: 0.75m high × 0.8m wide × 0.5m deep.
- **Shadows:** Soft PCF shadows (`castShadow` on student agents and furniture; `receiveShadow` on floor tiles) to ground all objects naturally.
- **Optimization:** Geometries share static materials where possible; draw calls budgeted under 45.
