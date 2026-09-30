import React from 'react';
import { useClassroomStore } from '../../store/classroomStore';
import { 
  Activity, 
  Thermometer, 
  Users, 
  Wind, 
  Lightbulb, 
  Radio, 
  Sliders
} from 'lucide-react';

export const CompactSystemStatus: React.FC = () => {
  const systemStatus = useClassroomStore((state) => state.systemStatus);
  const mode = useClassroomStore((state) => state.mode);
  const occupancy = useClassroomStore((state) => state.occupancy);
  const maxOccupancy = useClassroomStore((state) => state.maxOccupancy);
  const temperature = useClassroomStore((state) => state.temperature);
  const fanSpeed = useClassroomStore((state) => state.fanSpeed);
  const fanState = useClassroomStore((state) => state.fanState);
  const lightState = useClassroomStore((state) => state.lightState);
  const pirDetected = useClassroomStore((state) => state.pirDetected);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-3 sm:p-3.5">
      <div className="flex flex-wrap items-center justify-between gap-y-2.5 gap-x-4 text-xs">
        
        {/* System & Mode */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5">
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-slate-400 font-medium">System:</span>
            <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
              systemStatus === 'ACTIVE' 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : systemStatus === 'SHUTDOWN_PENDING'
                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                : 'bg-slate-100 text-slate-600'
            }`}>
              {systemStatus}
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            <Sliders className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-400 font-medium">Mode:</span>
            <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
              mode === 'AUTO' 
                ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}>
              {mode}
            </span>
          </div>
        </div>

        {/* Telemetry metrics */}
        <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-1 text-slate-700 font-medium">
          {/* Occupancy */}
          <div className="flex items-center space-x-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Occupancy:</span>
            <span className="font-bold text-slate-900 font-mono">
              {occupancy} / {maxOccupancy}
            </span>
          </div>

          {/* Temperature */}
          <div className="flex items-center space-x-1.5">
            <Thermometer className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-slate-400">Temp:</span>
            <span className="font-bold text-slate-900 font-mono">
              {temperature.toFixed(1)}°C
            </span>
          </div>

          {/* Fan */}
          <div className="flex items-center space-x-1.5">
            <Wind className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-slate-400">Fan:</span>
            <span className={`font-bold font-mono ${fanState || fanSpeed > 0 ? 'text-blue-600' : 'text-slate-500'}`}>
              {fanSpeed}% {fanState || fanSpeed > 0 ? '(ON)' : '(OFF)'}
            </span>
          </div>

          {/* Light */}
          <div className="flex items-center space-x-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-slate-400">Light:</span>
            <span className={`font-bold ${lightState ? 'text-amber-600' : 'text-slate-400'}`}>
              {lightState ? 'ON' : 'OFF'}
            </span>
          </div>

          {/* PIR */}
          <div className="flex items-center space-x-1.5">
            <Radio className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-slate-400">PIR:</span>
            <span className={`font-bold flex items-center space-x-1 ${pirDetected ? 'text-emerald-600' : 'text-slate-400'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${pirDetected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
              <span>{pirDetected ? 'DETECTED' : 'CLEAR'}</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
