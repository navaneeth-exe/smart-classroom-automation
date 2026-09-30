export interface DeskPosition {
  id: number;
  row: number;
  col: number;
  deskPosition: [number, number, number];
  chairPosition: [number, number, number];
}

/**
 * Reusable 4-row x 4-column configuration for 16 student desk positions.
 * Classroom dimensions: ~12m wide (X: -6 to +6), ~8.5m deep (Z: -4.25 to +4.25), ~3.5m high (Y: 0 to 3.5).
 * Front blackboard is at Z = -4.1.
 * Teacher desk is at front right (X = 2.8, Z = -3.0).
 * Student desks span X: -3.6 to 3.6, Z: -1.8 to 2.8.
 * A central aisle splits the 4 columns: 2 columns on left, 2 columns on right.
 */
export const CLASSROOM_DESK_CONFIG: DeskPosition[] = [];

const ROWS = 4;
const COLS = 4;
const ROW_Z_START = -1.6;
const ROW_SPACING = 1.45;

const COL_X_OFFSETS = [
  -3.5, // Col 0 (Far left)
  -1.8, // Col 1 (Inner left)
  // --- Central Aisle (Width ~2.2m) ---
  1.8,  // Col 2 (Inner right)
  3.5,  // Col 3 (Far right)
];

let deskId = 0;
for (let r = 0; r < ROWS; r++) {
  const z = ROW_Z_START + r * ROW_SPACING;
  for (let c = 0; c < COLS; c++) {
    const x = COL_X_OFFSETS[c];
    CLASSROOM_DESK_CONFIG.push({
      id: deskId++,
      row: r,
      col: c,
      deskPosition: [x, 0, z],
      chairPosition: [x, 0, z + 0.55], // Chair sits right behind desk
    });
  }
}

/**
 * Ceiling Fan Positions (4-unit quad array for balanced airflow coverage)
 */
export const CEILING_FAN_CONFIG: [number, number, number][] = [
  [-2.6, 3.25, -1.0],
  [2.6, 3.25, -1.0],
  [-2.6, 3.25, 1.8],
  [2.6, 3.25, 1.8],
];

/**
 * Ceiling Light Fixture Positions (6 troffers in 2x3 grid)
 */
export const CEILING_LIGHT_CONFIG: [number, number, number][] = [
  [-2.6, 3.42, -2.5],
  [2.6, 3.42, -2.5],
  [-2.6, 3.42, 0.4],
  [2.6, 3.42, 0.4],
  [-2.6, 3.42, 2.8],
  [2.6, 3.42, 2.8],
];

/**
 * Camera Viewport Presets
 */
export const CAMERA_PRESETS = {
  overview: {
    name: 'Classroom Overview',
    position: [9.5, 7.8, 10.5] as [number, number, number],
    target: [0, 1.2, 0] as [number, number, number],
  },
  front: {
    name: 'Front / Smartboard',
    position: [0, 2.5, 4.8] as [number, number, number],
    target: [0, 1.7, -4.0] as [number, number, number],
  },
  rear: {
    name: 'Rear / Students View',
    position: [0, 4.5, -4.8] as [number, number, number],
    target: [0, 1.0, 1.0] as [number, number, number],
  },
  teacher: {
    name: 'Teacher Podium',
    position: [4.2, 2.2, -2.0] as [number, number, number],
    target: [-1.0, 1.2, 0.5] as [number, number, number],
  },
  entrance: {
    name: 'Entrance / Door',
    position: [7.2, 2.4, 4.8] as [number, number, number],
    target: [5.2, 1.4, 2.5] as [number, number, number],
  },
  student: {
    name: 'Student Desks',
    position: [2.8, 2.2, 2.2] as [number, number, number],
    target: [1.8, 0.9, 0.5] as [number, number, number],
  },
  pir: {
    name: 'PIR Sensor',
    position: [4.2, 2.4, 3.8] as [number, number, number],
    target: [4.8, 3.44, 2.5] as [number, number, number],
  },
  lights: {
    name: 'Ceiling Lights',
    position: [0, 1.8, 3.6] as [number, number, number],
    target: [0, 3.42, 0.4] as [number, number, number],
  },
  fan: {
    name: 'Ceiling Fan',
    position: [-1.2, 2.2, 0.4] as [number, number, number],
    target: [-2.6, 3.25, -1.0] as [number, number, number],
  },
  dht22: {
    name: 'DHT22 Sensor',
    position: [-4.2, 1.6, -1.2] as [number, number, number],
    target: [-5.86, 1.6, -2.5] as [number, number, number],
  },
};

