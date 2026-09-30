import React from 'react';
import { ClassroomCanvas } from '../components/classroom/ClassroomCanvas';
import { useClassroomStore } from '../store/classroomStore';
import { UserPlus, UserMinus, RotateCcw, Wind, Lightbulb } from 'lucide-react';

export const ClassroomPage: React.FC = () => {
  const occupancy = useClassroomStore((state) => state.occupancy);
  const maxOccupancy = useClassroomStore((state) => state.maxOccupancy);
  const fanSpeed = useClassroomStore((state) => state.fanSpeed);
  const lightState = useClassroomStore((state) => state.lightState);

  const addStudent = useClassroomStore((state) => state.addStudent);
  const removeStudent = useClassroomStore((state) => state.removeStudent);
  const resetClassroom = useClassroomStore((state) => state.resetClassroom);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Dedicated 3D Classroom Viewport</h1>
          <p className="text-xs text-slate-500">Full-canvas view for interactive presentation projection</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={addStudent}
            disabled={occupancy >= maxOccupancy}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
          <button
            onClick={removeStudent}
            disabled={occupancy <= 0}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 text-slate-700 text-xs font-semibold transition-colors"
          >
            <UserMinus className="w-3.5 h-3.5" />
            <span>Remove</span>
          </button>
          <button
            onClick={resetClassroom}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="w-full h-[620px]">
        <ClassroomCanvas className="w-full h-full" />
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span><strong>Occupancy:</strong> {occupancy} / {maxOccupancy} Students</span>
          <span className="flex items-center space-x-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Lights: <strong className={lightState ? 'text-amber-600' : 'text-slate-400'}>{lightState ? 'ON' : 'OFF'}</strong></span>
          </span>
          <span className="flex items-center space-x-1">
            <Wind className="w-3.5 h-3.5 text-blue-500" />
            <span>Fan: <strong className="text-blue-600">{fanSpeed}% PWM</strong></span>
          </span>
        </div>
        <div className="text-slate-400">
          Click sensors, fans, and students to inspect • Drag to orbit
        </div>
      </div>
    </div>
  );
};
