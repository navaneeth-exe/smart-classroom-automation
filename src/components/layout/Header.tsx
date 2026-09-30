import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Cpu, 
  RotateCcw, 
  Sparkles, 
  LayoutDashboard, 
  Sliders, 
  LineChart, 
  Presentation,
  ShieldAlert
} from 'lucide-react';
import { useClassroomStore } from '../../store/classroomStore';

export const Header: React.FC = () => {
  const mode = useClassroomStore((state) => state.mode);
  const setMode = useClassroomStore((state) => state.setMode);
  const resetSimulation = useClassroomStore((state) => state.resetSimulation);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand & Simulation Disclaimer */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg">
                  Smart Classroom
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Digital Twin
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Interactive Engineering Simulation Platform
              </p>
            </div>
          </div>

          {/* Primary Simulation Mode Badge */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="font-semibold tracking-wide">SIMULATION MODE</span>
              <span className="hidden md:inline text-amber-600 border-l border-amber-300 pl-2 text-[11px]">
                No Hardware Connected
              </span>
            </div>

            {/* Auto / Manual Mode Pill Toggle */}
            <div className="hidden lg:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-medium">
              <button
                onClick={() => setMode('AUTO')}
                className={`px-3 py-1 rounded-md transition-all ${
                  mode === 'AUTO'
                    ? 'bg-white text-blue-600 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                AUTO
              </button>
              <button
                onClick={() => setMode('MANUAL')}
                className={`px-3 py-1 rounded-md transition-all ${
                  mode === 'MANUAL'
                    ? 'bg-white text-amber-600 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                MANUAL
              </button>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetSimulation}
              title="Reset classroom to default state"
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 text-xs font-medium transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

        </div>

        {/* Navigation Bar */}
        <nav className="flex space-x-1 sm:space-x-4 border-t border-slate-100 py-1.5 overflow-x-auto">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`
            }
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard & Twin</span>
          </NavLink>

          <NavLink
            to="/classroom"
            className={({ isActive }) =>
              `flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`
            }
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Classroom View</span>
          </NavLink>

          <NavLink
            to="/controls"
            className={({ isActive }) =>
              `flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`
            }
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Sensors & Controls</span>
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`
            }
          >
            <LineChart className="w-3.5 h-3.5" />
            <span>Analytics & Logs</span>
          </NavLink>

          <NavLink
            to="/presentation"
            className={({ isActive }) =>
              `flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`
            }
          >
            <Presentation className="w-3.5 h-3.5 text-emerald-600" />
            <span>Presentation Mode</span>
          </NavLink>
        </nav>
      </div>

      {/* Prominent Educational Hardware Disclaimer Strip */}
      <div className="bg-slate-100 border-t border-b border-slate-200 py-1 px-4 text-center">
        <p className="text-[11px] text-slate-500 font-medium flex items-center justify-center space-x-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
          <span>
            <strong>Academic Presentation Twin:</strong> Pure software simulation of sensors (DHT22, LDR, PIR) and actuators (Fan PWM, Relays). No physical STM32/ESP32 is connected.
          </span>
        </p>
      </div>
    </header>
  );
};
