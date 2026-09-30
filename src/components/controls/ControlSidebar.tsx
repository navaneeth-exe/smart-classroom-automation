import React from 'react';
import { motion } from 'framer-motion';
import { useClassroomStore } from '../../store/classroomStore';
import { 
  Thermometer, 
  Sun, 
  Wind, 
  Users, 
  Radio, 
  UserPlus, 
  UserMinus, 
  RotateCcw, 
  Lightbulb, 
  Sliders, 
  CheckCircle2
} from 'lucide-react';

export const ControlSidebar: React.FC = () => {
  const temperature = useClassroomStore((state) => state.temperature);
  const humidity = useClassroomStore((state) => state.humidity);
  const lightIntensity = useClassroomStore((state) => state.lightIntensity);
  const occupancy = useClassroomStore((state) => state.occupancy);
  const maxOccupancy = useClassroomStore((state) => state.maxOccupancy);
  const mode = useClassroomStore((state) => state.mode);
  const lightState = useClassroomStore((state) => state.lightState);
  const fanState = useClassroomStore((state) => state.fanState);
  const fanSpeed = useClassroomStore((state) => state.fanSpeed);
  const manualLightState = useClassroomStore((state) => state.manualLightState);
  const manualFanSpeed = useClassroomStore((state) => state.manualFanSpeed);
  const pirDetected = useClassroomStore((state) => state.pirDetected);
  const lightThreshold = useClassroomStore((state) => state.thresholds.lightThreshold);

  const setTemperature = useClassroomStore((state) => state.setTemperature);
  const setHumidity = useClassroomStore((state) => state.setHumidity);
  const setAmbientLight = useClassroomStore((state) => state.setAmbientLight);
  const setMode = useClassroomStore((state) => state.setMode);
  const setManualLight = useClassroomStore((state) => state.setManualLight);
  const setManualFanPwm = useClassroomStore((state) => state.setManualFanPwm);
  const addStudent = useClassroomStore((state) => state.addStudent);
  const removeStudent = useClassroomStore((state) => state.removeStudent);
  const resetSimulation = useClassroomStore((state) => state.resetSimulation);

  const isManual = mode === 'MANUAL';
  const occupancyPercent = Math.round((occupancy / maxOccupancy) * 100);

  // Fan cooling explanation in auto mode
  const getFanAutoReason = () => {
    if (occupancy === 0) return 'Room unoccupied → Fan off (0%)';
    if (temperature < 25) return `${temperature.toFixed(1)}°C < 25°C → Fan idle (0%)`;
    if (temperature < 30) return `${temperature.toFixed(1)}°C → Low cooling (30%)`;
    if (temperature < 35) return `${temperature.toFixed(1)}°C → Medium cooling (60%)`;
    return `${temperature.toFixed(1)}°C ≥ 35°C → Maximum cooling (100%)`;
  };

  return (
    <div className="space-y-4">
      
      {/* 1. Operating Mode Switch */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1.5">
            <Sliders className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Operating Mode</span>
          </div>
          <span className="text-[11px] text-slate-400">
            {isManual ? 'Manual Override' : 'Autonomous Engine'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setMode('AUTO')}
            className={`py-1.5 px-3 rounded-md text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
              !isManual
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>AUTO</span>
            {!isManual && <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />}
          </button>

          <button
            onClick={() => setMode('MANUAL')}
            className={`py-1.5 px-3 rounded-md text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
              isManual
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>MANUAL</span>
            {isManual && <span className="w-1.5 h-1.5 rounded-full bg-amber-200" />}
          </button>
        </div>

        <p className="text-[11px] text-slate-500 mt-2 leading-tight">
          {isManual
            ? 'User controls light relays and fan speed directly.'
            : 'System automatically controls lights and fans based on occupancy and sensor setpoints.'}
        </p>
      </div>

      {/* 2. Occupancy Controls */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center space-x-1.5">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Occupancy Control</span>
          </div>
          <span className="text-xs font-bold font-mono text-slate-900">
            {occupancy} / {maxOccupancy} Students
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-2.5">
          <button
            onClick={addStudent}
            disabled={occupancy >= maxOccupancy}
            className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ Add Student</span>
          </button>

          <button
            onClick={removeStudent}
            disabled={occupancy <= 0}
            className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-50 text-slate-700 text-xs font-semibold transition-colors"
          >
            <UserMinus className="w-3.5 h-3.5" />
            <span>- Remove</span>
          </button>
        </div>

        {/* Occupancy progress bar */}
        <div>
          <div className="flex justify-between text-[11px] text-slate-500 mb-1">
            <span>Capacity</span>
            <span className="font-semibold text-slate-800 font-mono">{occupancyPercent}% Occupancy</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-blue-600 rounded-full" 
              initial={false}
              animate={{ width: `${occupancyPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* 3. Environment Controls (Polished Sliders) */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs space-y-3.5">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
          Environmental Sliders
        </span>

        {/* Temperature */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 flex items-center space-x-1.5">
              <Thermometer className="w-3.5 h-3.5 text-orange-500" />
              <span>Temperature</span>
            </span>
            <motion.span 
              key={temperature} 
              initial={{ scale: 0.95 }} 
              animate={{ scale: 1 }} 
              className="font-bold font-mono text-orange-600"
            >
              {temperature.toFixed(1)}°C
            </motion.span>
          </div>
          <input
            type="range"
            min="18"
            max="40"
            step="0.5"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full accent-orange-500 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>18°C</span>
            <span>25°C (30%)</span>
            <span>30°C (60%)</span>
            <span>40°C (100%)</span>
          </div>
        </div>

        {/* Humidity */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 flex items-center space-x-1.5">
              <Wind className="w-3.5 h-3.5 text-cyan-500" />
              <span>Humidity</span>
            </span>
            <motion.span 
              key={humidity} 
              initial={{ scale: 0.95 }} 
              animate={{ scale: 1 }} 
              className="font-bold font-mono text-cyan-600"
            >
              {humidity.toFixed(0)}%
            </motion.span>
          </div>
          <input
            type="range"
            min="30"
            max="90"
            step="1"
            value={humidity}
            onChange={(e) => setHumidity(parseInt(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>30% RH (Dry)</span>
            <span>60% RH</span>
            <span>90% RH (Humid)</span>
          </div>
        </div>

        {/* Ambient Light */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 flex items-center space-x-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Ambient Light</span>
            </span>
            <motion.span 
              key={lightIntensity} 
              initial={{ scale: 0.95 }} 
              animate={{ scale: 1 }} 
              className="font-bold font-mono text-amber-600"
            >
              {lightIntensity.toFixed(0)}%
            </motion.span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={lightIntensity}
            onChange={(e) => setAmbientLight(parseInt(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>0% (Night)</span>
            <span className="text-blue-600 font-semibold">Threshold: 40%</span>
            <span>100% (Daylight)</span>
          </div>
        </div>
      </div>

      {/* 4. Actuator Controls: Lighting & Fan */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs space-y-3.5">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
          Actuator Management
        </span>

        {/* Light Control Section */}
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-800 flex items-center space-x-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Ceiling Lighting</span>
            </span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded flex items-center space-x-1 ${
              lightState ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-600'
            }`}>
              <span>{lightState ? '● ON' : '○ OFF'}</span>
            </span>
          </div>

          {isManual ? (
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                onClick={() => setManualLight(true)}
                className={`py-1.5 px-3 rounded-md text-xs font-bold transition-all ${
                  manualLightState ? 'bg-amber-500 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                ON
              </button>
              <button
                onClick={() => setManualLight(false)}
                className={`py-1.5 px-3 rounded-md text-xs font-bold transition-all ${
                  !manualLightState ? 'bg-slate-700 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                OFF
              </button>
            </div>
          ) : (
            <div className="text-[11px] text-slate-500 mt-1 flex items-start space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-700">AUTOMATIC:</span> Controlled by occupancy + ambient light (threshold: {lightThreshold}%).
              </div>
            </div>
          )}
        </div>

        {/* Fan Control Section */}
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-800 flex items-center space-x-1.5">
              <Wind className="w-3.5 h-3.5 text-blue-500" />
              <span>Ceiling Fans</span>
            </span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded font-mono ${
              fanState || fanSpeed > 0 ? 'bg-blue-100 text-blue-800' : 'bg-slate-200 text-slate-600'
            }`}>
              {fanState || fanSpeed > 0 ? `ON (${fanSpeed}%)` : 'OFF (0%)'}
            </span>
          </div>

          {isManual ? (
            <div className="space-y-2 mt-2">
              <div className="flex justify-between items-center text-[11px] text-slate-600">
                <span>Manual Speed</span>
                <span className="font-bold text-blue-600 font-mono">{manualFanSpeed}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={manualFanSpeed}
                onChange={(e) => setManualFanPwm(parseInt(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
              />
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => setManualFanPwm(manualFanSpeed > 0 ? manualFanSpeed : 60)}
                  className="py-1 px-2 rounded-md bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
                >
                  FAN ON
                </button>
                <button
                  onClick={() => setManualFanPwm(0)}
                  className="py-1 px-2 rounded-md bg-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-300"
                >
                  FAN OFF
                </button>
              </div>
            </div>
          ) : (
            <div className="text-[11px] text-slate-500 mt-1 flex items-start space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-700">AUTOMATIC:</span> {getFanAutoReason()}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. Sensor Status Cards */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs space-y-2.5">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
          Virtual Sensor Telemetry
        </span>

        {/* PIR Sensor */}
        <div className="p-2.5 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-emerald-500" />
            <div>
              <div className="font-bold text-slate-800">PIR SENSOR</div>
              <div className="text-[10px] text-slate-400">{occupancy} occupants</div>
            </div>
          </div>
          <span className={`px-2 py-0.5 rounded text-[11px] font-bold flex items-center space-x-1 ${
            pirDetected ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${pirDetected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
            <span>{pirDetected ? 'DETECTED' : 'CLEAR'}</span>
          </span>
        </div>

        {/* LDR Sensor */}
        <div className="p-2.5 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <Sun className="w-4 h-4 text-amber-500" />
            <div>
              <div className="font-bold text-slate-800">LDR (LIGHT SENSOR)</div>
              <div className="text-[10px] text-slate-400 font-mono">{lightIntensity.toFixed(0)}% lux</div>
            </div>
          </div>
          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
            lightIntensity < lightThreshold 
              ? 'bg-amber-50 text-amber-700 border border-amber-200' 
              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          }`}>
            {lightIntensity < lightThreshold ? 'LOW LIGHT' : 'ADEQUATE'}
          </span>
        </div>

        {/* DHT22 Sensor */}
        <div className="p-2.5 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <Thermometer className="w-4 h-4 text-orange-500" />
            <div>
              <div className="font-bold text-slate-800">DHT22 SENSOR</div>
              <div className="text-[10px] text-slate-400 font-mono">{humidity.toFixed(0)}% RH</div>
            </div>
          </div>
          <span className="font-bold font-mono text-orange-600 text-xs">
            {temperature.toFixed(1)}°C
          </span>
        </div>
      </div>

      {/* 6. System Reset */}
      <div className="pt-1">
        <button
          onClick={resetSimulation}
          className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl border border-red-200 bg-red-50/50 hover:bg-red-50 text-red-600 text-xs font-bold transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Simulation</span>
        </button>
      </div>

    </div>
  );
};
