import React from 'react';
import { useClassroomStore } from '../../store/classroomStore';
import { X, Cpu, Info } from 'lucide-react';

export const ObjectInfoModal: React.FC = () => {
  const selectedInfo = useClassroomStore((state) => state.selectedInfo);
  const setSelectedInfo = useClassroomStore((state) => state.setSelectedInfo);

  // Live simulation values to ensure dynamic readouts
  const fanSpeed = useClassroomStore((state) => state.fanSpeed);
  const fanState = useClassroomStore((state) => state.fanState);
  const lightState = useClassroomStore((state) => state.lightState);
  const pirDetected = useClassroomStore((state) => state.pirDetected);
  const occupancy = useClassroomStore((state) => state.occupancy);
  const temperature = useClassroomStore((state) => state.temperature);
  const humidity = useClassroomStore((state) => state.humidity);
  const lightIntensity = useClassroomStore((state) => state.lightIntensity);

  if (!selectedInfo) return null;

  // Render object-specific live telemetry if applicable
  const renderLiveReadout = () => {
    switch (selectedInfo.objectType) {
      case 'FAN':
        return (
          <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Status</span>
              <span className={`font-bold ${fanState || fanSpeed > 0 ? 'text-blue-600' : 'text-slate-600'}`}>
                {fanState || fanSpeed > 0 ? 'ON' : 'OFF'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Speed / PWM</span>
              <span className="font-bold text-slate-800">{fanSpeed}%</span>
            </div>
          </div>
        );
      case 'LIGHT':
        return (
          <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Status</span>
              <span className={`font-bold ${lightState ? 'text-amber-600' : 'text-slate-600'}`}>
                {lightState ? 'ON' : 'OFF'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Brightness</span>
              <span className="font-bold text-slate-800">{lightState ? '100% (simulated)' : '0%'}</span>
            </div>
          </div>
        );
      case 'PIR':
        return (
          <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Status</span>
              <span className={`font-bold ${pirDetected ? 'text-emerald-600' : 'text-slate-600'}`}>
                {pirDetected ? 'Detected' : 'Clear'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Occupancy</span>
              <span className="font-bold text-slate-800">{occupancy} Students</span>
            </div>
          </div>
        );
      case 'TEMPERATURE':
        return (
          <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Temperature</span>
              <span className="font-bold text-orange-600">{temperature.toFixed(1)}°C</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Humidity</span>
              <span className="font-bold text-slate-800">{humidity.toFixed(0)}% RH</span>
            </div>
          </div>
        );
      case 'LDR':
        return (
          <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 grid grid-cols-1 gap-2 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Ambient Light</span>
              <span className="font-bold text-amber-600">{lightIntensity.toFixed(0)}%</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="absolute bottom-4 left-4 z-20 max-w-sm w-full bg-white/95 backdrop-blur-md rounded-xl border border-slate-200 shadow-xl p-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
              {selectedInfo.category}
            </span>
            <h4 className="text-sm font-bold text-slate-900 mt-0.5">{selectedInfo.title}</h4>
          </div>
        </div>
        <button
          onClick={() => setSelectedInfo(null)}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="text-xs text-slate-600 mt-2.5 leading-relaxed whitespace-pre-line">
        {selectedInfo.description}
      </div>

      {/* Real-time reactive telemetry pill */}
      {renderLiveReadout()}

      {selectedInfo.details && (
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center space-x-1.5 text-[11px] text-slate-500">
          <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span>{selectedInfo.details}</span>
        </div>
      )}
    </div>
  );
};
