import React from 'react';
import { motion } from 'framer-motion';
import { 
  Thermometer, 
  Users, 
  Wind, 
  Sun, 
  Lightbulb, 
  Radio
} from 'lucide-react';
import { useClassroomStore } from '../../store/classroomStore';

export const AnalyticsSummaryCards: React.FC = () => {
  const temperature = useClassroomStore((state) => state.temperature);
  const occupancy = useClassroomStore((state) => state.occupancy);
  const maxOccupancy = useClassroomStore((state) => state.maxOccupancy);
  const fanSpeed = useClassroomStore((state) => state.fanSpeed);
  const fanState = useClassroomStore((state) => state.fanState);
  const lightIntensity = useClassroomStore((state) => state.lightIntensity);
  const lightState = useClassroomStore((state) => state.lightState);
  const pirDetected = useClassroomStore((state) => state.pirDetected);
  const mode = useClassroomStore((state) => state.mode);

  const occupancyPercent = Math.round((occupancy / maxOccupancy) * 100);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      
      {/* 1. Current Temperature */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider">Temperature</span>
          <Thermometer className="w-4 h-4 text-orange-500" />
        </div>
        <div>
          <motion.div 
            key={temperature} 
            initial={{ scale: 0.95 }} 
            animate={{ scale: 1 }}
            className="text-xl font-bold font-mono text-slate-900"
          >
            {temperature.toFixed(1)}°C
          </motion.div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {temperature < 25 ? 'Cool' : temperature < 30 ? 'Normal' : temperature < 35 ? 'Warm' : 'Hot'}
          </div>
        </div>
      </div>

      {/* 2. Current Occupancy */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider">Occupancy</span>
          <Users className="w-4 h-4 text-blue-500" />
        </div>
        <div>
          <div className="text-xl font-bold font-mono text-slate-900">
            {occupancy} <span className="text-xs text-slate-400 font-normal">/ {maxOccupancy}</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {occupancyPercent}% Capacity
          </div>
        </div>
      </div>

      {/* 3. Current Fan Speed */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider">Fan PWM</span>
          <Wind className="w-4 h-4 text-blue-500" />
        </div>
        <div>
          <div className={`text-xl font-bold font-mono ${fanState || fanSpeed > 0 ? 'text-blue-600' : 'text-slate-800'}`}>
            {fanSpeed}%
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {fanState || fanSpeed > 0 ? 'Motor Active' : 'Stopped'}
          </div>
        </div>
      </div>

      {/* 4. Current Light Intensity */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider">Ambient Light</span>
          <Sun className="w-4 h-4 text-amber-500" />
        </div>
        <div>
          <div className="text-xl font-bold font-mono text-slate-900">
            {lightIntensity.toFixed(0)}%
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {lightIntensity < 40 ? 'Low Daylight' : 'Adequate'}
          </div>
        </div>
      </div>

      {/* 5. Current Light State */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider">Classroom Lights</span>
          <Lightbulb className="w-4 h-4 text-amber-500" />
        </div>
        <div>
          <div className={`text-xl font-bold ${lightState ? 'text-amber-600' : 'text-slate-600'}`}>
            {lightState ? 'ON' : 'OFF'}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {lightState ? 'Troffers Glowing' : 'Standby / Relay Open'}
          </div>
        </div>
      </div>

      {/* 6. Current PIR State */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider">PIR Sensor</span>
          <Radio className="w-4 h-4 text-emerald-500" />
        </div>
        <div>
          <div className={`text-xl font-bold flex items-center space-x-1.5 ${pirDetected ? 'text-emerald-600' : 'text-slate-600'}`}>
            <span className={`w-2 h-2 rounded-full ${pirDetected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
            <span>{pirDetected ? 'DETECTED' : 'CLEAR'}</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Mode: {mode}
          </div>
        </div>
      </div>

    </div>
  );
};
