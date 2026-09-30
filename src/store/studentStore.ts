/**
 * studentStore.ts - Backward Compatibility Shim
 * 
 * All student state is now managed by the unified classroomStore.
 * This file provides the useStudentStore hook for any components that
 * still import from here, pointing to the same unified store.
 */

export { useClassroomStore as useStudentStore } from '../simulation/classroomStore';
export type { StudentData, StudentState, StudentPalette } from '../simulation/classroomStore';
export { STUDENT_PALETTES, ENTRANCE_COORDINATES } from '../simulation/classroomStore';
