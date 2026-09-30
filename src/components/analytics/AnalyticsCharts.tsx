import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { TelemetryHistorySample } from '../../store/classroomStore';

interface AnalyticsChartsProps {
  data: TelemetryHistorySample[];
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      {/* 1. Temperature Over Time */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Temperature Telemetry</h3>
            <p className="text-[11px] text-slate-400">Virtual DHT22 ambient room temperature (°C)</p>
          </div>
          <span className="text-xs font-mono font-bold text-orange-600">
            {data.length > 0 ? `${data[data.length - 1].temperature.toFixed(1)}°C` : '--'}
          </span>
        </div>

        <div className="h-48 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="timeFormatted" 
                tick={{ fontSize: 9, fill: '#94a3b8' }} 
                tickLine={false} 
              />
              <YAxis 
                domain={[15, 42]} 
                tick={{ fontSize: 9, fill: '#94a3b8' }} 
                tickLine={false} 
              />
              <Tooltip 
                contentStyle={{ fontSize: 11, borderRadius: 8, borderColor: '#e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(val: unknown) => [typeof val === 'number' ? `${val.toFixed(1)}°C` : String(val), 'Temperature']}
              />
              <Area 
                type="monotone" 
                dataKey="temperature" 
                stroke="#f97316" 
                strokeWidth={2} 
                fillOpacity={1} 
                fill="url(#tempGradient)" 
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Occupancy Over Time */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Occupancy Trend</h3>
            <p className="text-[11px] text-slate-400">Classroom occupant count / attendance</p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-600">
            {data.length > 0 ? `${data[data.length - 1].occupancy} Students` : '--'}
          </span>
        </div>

        <div className="h-48 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="occGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="timeFormatted" 
                tick={{ fontSize: 9, fill: '#94a3b8' }} 
                tickLine={false} 
              />
              <YAxis 
                domain={[0, 18]} 
                tick={{ fontSize: 9, fill: '#94a3b8' }} 
                tickLine={false} 
              />
              <Tooltip 
                contentStyle={{ fontSize: 11, borderRadius: 8, borderColor: '#e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(val: unknown) => [String(val), 'Occupancy']}
              />
              <Area 
                type="stepAfter" 
                dataKey="occupancy" 
                stroke="#10b981" 
                strokeWidth={2} 
                fillOpacity={1} 
                fill="url(#occGradient)" 
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Fan Speed Over Time */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Fan PWM Output</h3>
            <p className="text-[11px] text-slate-400">PWM duty cycle modulation percentage (%)</p>
          </div>
          <span className="text-xs font-mono font-bold text-blue-600">
            {data.length > 0 ? `${data[data.length - 1].fanSpeed}% PWM` : '--'}
          </span>
        </div>

        <div className="h-48 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="timeFormatted" 
                tick={{ fontSize: 9, fill: '#94a3b8' }} 
                tickLine={false} 
              />
              <YAxis 
                domain={[0, 100]} 
                tick={{ fontSize: 9, fill: '#94a3b8' }} 
                tickLine={false} 
              />
              <Tooltip 
                contentStyle={{ fontSize: 11, borderRadius: 8, borderColor: '#e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(val: unknown) => [`${String(val)}%`, 'Fan PWM']}
              />
              <Line 
                type="monotone" 
                dataKey="fanSpeed" 
                stroke="#2563eb" 
                strokeWidth={2} 
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. Ambient Light Intensity Over Time */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Ambient Light Intensity</h3>
            <p className="text-[11px] text-slate-400">Virtual LDR exterior window illuminance (%)</p>
          </div>
          <span className="text-xs font-mono font-bold text-amber-600">
            {data.length > 0 ? `${data[data.length - 1].lightIntensity.toFixed(0)}% Lux` : '--'}
          </span>
        </div>

        <div className="h-48 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="lightGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="timeFormatted" 
                tick={{ fontSize: 9, fill: '#94a3b8' }} 
                tickLine={false} 
              />
              <YAxis 
                domain={[0, 100]} 
                tick={{ fontSize: 9, fill: '#94a3b8' }} 
                tickLine={false} 
              />
              <Tooltip 
                contentStyle={{ fontSize: 11, borderRadius: 8, borderColor: '#e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(val: unknown) => [typeof val === 'number' ? `${val.toFixed(0)}%` : String(val), 'Ambient Light']}
              />
              <Area 
                type="monotone" 
                dataKey="lightIntensity" 
                stroke="#f59e0b" 
                strokeWidth={2} 
                fillOpacity={1} 
                fill="url(#lightGradient)" 
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
