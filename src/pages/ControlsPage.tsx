import React from 'react';
import { useClassroomStore } from '../store/classroomStore';
import { Sliders, Sun, Thermometer, UserPlus, UserMinus, RotateCcw, Wind, Lightbulb } from 'lucide-react';

export const ControlsPage: React.FC = () => {
  const temperature = useClassroomStore((state) => state.temperature);
  const humidity = useClassroomStore((state) => state.humidity);
  const lightIntensity = useClassroomStore((state) => state.lightIntensity);
  const mode = useClassroomStore((state) => state.mode);
  const occupancy = useClassroomStore((state) => state.occupancy);
  const maxOccupancy = useClassroomStore((state) => state.maxOccupancy);
  const manualLightState = useClassroomStore((state) => state.manualLightState);
  const manualFanSpeed = useClassroomStore((state) => state.manualFanSpeed);
  const fanSpeed = useClassroomStore((state) => state.fanSpeed);
  const lightState = useClassroomStore((state) => state.lightState);

  const setTemperature = useClassroomStore((state) => state.setTemperature);
  const setHumidity = useClassroomStore((state) => state.setHumidity);
  const setAmbientLight = useClassroomStore((state) => state.setAmbientLight);
  const setMode = useClassroomStore((state) => state.setMode);
  const setManualLight = useClassroomStore((state) => state.setManualLight);
  const setManualFanPwm = useClassroomStore((state) => state.setManualFanPwm);
  const addStudent = useClassroomStore((state) => state.addStudent);
  const removeStudent = useClassroomStore((state) => state.removeStudent);
  const resetClassroom = useClassroomStore((state) => state.resetClassroom);

  const isManual = mode === 'MANUAL';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Environmental & Actuator Controls</h1>
        <p className="text-xs text-slate-500">Manipulate simulated physical variables and inspect closed-loop responses</p>
      </div>

      {/* Mode Selector Card */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Automation Operating Mode</h2>
          <p className="text-xs text-slate-500">Choose between autonomous closed-loop automation or direct manual override</p>
        </div>
        <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setMode('AUTO')}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
              mode === 'AUTO' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'
            }`}
          >
            AUTO MODE
          </button>
          <button
            onClick={() => setMode('MANUAL')}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
              mode === 'MANUAL' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-600'
            }`}
          >
            MANUAL OVERRIDE
          </button>
        </div>
      </div>

      {/* Environmental Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Temperature Slider */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 flex items-center space-x-1.5">
              <Thermometer className="w-4 h-4 text-orange-500" />
              <span>Simulated Room Temperature</span>
            </span>
            <span className="text-lg font-bold text-slate-900">{temperature.toFixed(1)}°C</span>
          </div>
          <input
            type="range"
            min="18"
            max="40"
            step="0.5"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full accent-orange-500 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>18°C (Off)</span>
            <span>25°C (30%)</span>
            <span>30°C (60%)</span>
            <span>35°C+ (100%)</span>
          </div>
        </div>

        {/* Ambient Light Slider */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 flex items-center space-x-1.5">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Ambient Daylight (LDR Lux)</span>
            </span>
            <span className="text-lg font-bold text-slate-900">{lightIntensity.toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={lightIntensity}
            onChange={(e) => setAmbientLight(parseInt(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>0% (Night)</span>
            <span className="text-blue-600 font-semibold">Threshold: 40%</span>
            <span>100% (Bright Sun)</span>
          </div>
        </div>

        {/* Humidity Slider */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 flex items-center space-x-1.5">
              <Wind className="w-4 h-4 text-cyan-500" />
              <span>Relative Humidity (DHT22)</span>
            </span>
            <span className="text-lg font-bold text-slate-900">{humidity.toFixed(0)}% RH</span>
          </div>
          <input
            type="range"
            min="30"
            max="90"
            step="1"
            value={humidity}
            onChange={(e) => setHumidity(parseInt(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>30% RH (Dry)</span>
            <span>60% RH (Nominal)</span>
            <span>90% RH (Humid)</span>
          </div>
        </div>

        {/* Live Actuator Status Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Live Actuator State</div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600 flex items-center space-x-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Lighting Relay</span>
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${lightState ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-slate-100 text-slate-500'}`}>
                {lightState ? '⬤ ON' : '○ OFF'}
              </span>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-slate-600 flex items-center space-x-1.5">
                  <Wind className="w-4 h-4 text-blue-500" />
                  <span>Fan PWM Output</span>
                </span>
                <span className="text-xs font-bold text-blue-600">{fanSpeed}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-700"
                  style={{ width: `${fanSpeed}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5 font-mono">
                <span>0% OFF</span><span>30% LOW</span><span>60% MED</span><span>100% HIGH</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Actuator Controls (Active in MANUAL mode) */}
      <div className={`p-5 rounded-xl border transition-all ${
        isManual ? 'bg-amber-50/50 border-amber-200' : 'bg-slate-50 border-slate-200 opacity-60'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-amber-600" />
            <h2 className="text-sm font-semibold text-slate-900">Manual Actuator Overrides</h2>
          </div>
          <span className="text-xs font-medium text-slate-500">
            {isManual ? 'Active — Direct relay/PWM command' : 'Disabled (Switch to MANUAL to use)'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-800">Lighting Relay Override</div>
              <div className="text-[11px] text-slate-500">Force lights ON or OFF</div>
            </div>
            <button
              disabled={!isManual}
              onClick={() => setManualLight(!manualLightState)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all disabled:cursor-not-allowed ${
                manualLightState
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {manualLightState ? 'LIGHTS: ON' : 'LIGHTS: OFF'}
            </button>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-800">
              <span>Fan PWM Manual Duty Cycle</span>
              <span className="text-blue-600 font-bold">{manualFanSpeed}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              disabled={!isManual}
              value={manualFanSpeed}
              onChange={(e) => setManualFanPwm(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Classroom Occupancy & Reset Panel */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Student Occupancy Operations</h2>
          <p className="text-xs text-slate-500">Current Occupants: {occupancy} / {maxOccupancy} desks</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={addStudent}
            disabled={occupancy >= maxOccupancy}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Student</span>
          </button>
          <button
            onClick={removeStudent}
            disabled={occupancy <= 0}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 disabled:opacity-50 text-slate-700 text-xs font-semibold transition-colors"
          >
            <UserMinus className="w-3.5 h-3.5" />
            <span>Remove Student</span>
          </button>
          <button
            onClick={resetClassroom}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>
        </div>
      </div>
    </div>
  );
};
