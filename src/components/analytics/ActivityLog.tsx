import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Clock, 
  UserPlus, 
  UserMinus, 
  Radio, 
  Lightbulb, 
  Wind, 
  Thermometer, 
  Sliders, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { ActivityLogEntry } from '../../store/classroomStore';

interface ActivityLogProps {
  logs: ActivityLogEntry[];
  maxHeight?: string;
}

export const ActivityLog: React.FC<ActivityLogProps> = ({ 
  logs, 
  maxHeight = "max-h-[520px]" 
}) => {
  const getEventIcon = (category: ActivityLogEntry['category'], title: string) => {
    if (title.includes('STUDENT ENTERED') || title.includes('ENTERED')) {
      return <UserPlus className="w-3.5 h-3.5 text-emerald-500" />;
    }
    if (title.includes('STUDENT EXITED') || title.includes('EXITED')) {
      return <UserMinus className="w-3.5 h-3.5 text-rose-500" />;
    }
    if (title.includes('PIR') || category === 'OCCUPANCY') {
      return <Radio className="w-3.5 h-3.5 text-emerald-500" />;
    }
    if (title.includes('LIGHT')) {
      return <Lightbulb className="w-3.5 h-3.5 text-amber-500" />;
    }
    if (title.includes('FAN')) {
      return <Wind className="w-3.5 h-3.5 text-blue-500" />;
    }
    if (title.includes('TEMPERATURE') || title.includes('HUMIDITY') || category === 'SENSOR') {
      return <Thermometer className="w-3.5 h-3.5 text-orange-500" />;
    }
    if (category === 'MODE') {
      return <Sliders className="w-3.5 h-3.5 text-purple-500" />;
    }
    if (title.includes('RESET')) {
      return <RotateCcw className="w-3.5 h-3.5 text-indigo-500" />;
    }
    return <Activity className="w-3.5 h-3.5 text-blue-500" />;
  };

  const getCategoryBadgeClass = (category: ActivityLogEntry['category']) => {
    switch (category) {
      case 'OCCUPANCY':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'ACTUATOR':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'SENSOR':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'MODE':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'SYSTEM':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight flex items-center space-x-1.5">
              <span>Live Simulation Activity Log</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </h2>
            <p className="text-[11px] text-slate-400">Chronological telemetry events from the state machine</p>
          </div>
        </div>
        <div className="text-[11px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
          {logs.length} logged
        </div>
      </div>

      {/* Event List */}
      <div className={`divide-y divide-slate-100 overflow-y-auto ${maxHeight}`}>
        {logs.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400 flex flex-col items-center justify-center space-y-2">
            <Sparkles className="w-6 h-6 text-slate-300" />
            <span>No simulation events recorded yet. Adjust controls or add students to populate log.</span>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {logs.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.18 }}
                className="p-3 sm:p-3.5 hover:bg-slate-50/70 transition-colors flex items-start justify-between gap-3 text-xs"
              >
                <div className="flex items-start space-x-2.5 min-w-0">
                  <div className="p-1 rounded-md bg-slate-50 border border-slate-100 flex-shrink-0 mt-0.5">
                    {getEventIcon(entry.category, entry.title)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold border ${getCategoryBadgeClass(entry.category)}`}>
                        {entry.category}
                      </span>
                      <span className="font-semibold text-slate-800 tracking-tight">
                        {entry.title}
                      </span>
                    </div>
                    <p className="text-slate-600 mt-0.5 leading-relaxed text-[11px] sm:text-xs">
                      {entry.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-slate-400 font-mono text-[11px] whitespace-nowrap flex-shrink-0 pt-0.5">
                  <Clock className="w-3 h-3 text-slate-300" />
                  <span>{entry.formattedTime}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
