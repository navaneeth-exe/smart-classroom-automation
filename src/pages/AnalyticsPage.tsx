import React from 'react';
import { useClassroomStore } from '../store/classroomStore';
import { AnalyticsSummaryCards } from '../components/analytics/AnalyticsSummaryCards';
import { AnalyticsCharts } from '../components/analytics/AnalyticsCharts';
import { ActivityLog } from '../components/analytics/ActivityLog';
import { LineChart as LineChartIcon, Activity } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const telemetryHistory = useClassroomStore((state) => state.telemetryHistory);
  const activityLogs = useClassroomStore((state) => state.activityLogs);

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
              <LineChartIcon className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Classroom Telemetry & Analytics
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time sensory telemetry trends, rolling historical metrics, and chronological audit log
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-mono text-slate-400 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Telemetry Sampling: 2.5s</span>
          </span>
        </div>
      </div>

      {/* 1. Analytics Summary Metric Cards */}
      <AnalyticsSummaryCards />

      {/* 2. Main Live Charts Grid */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <Activity className="w-4 h-4 text-blue-600" />
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">
            Real-Time Simulation Waveforms
          </h2>
        </div>
        <AnalyticsCharts data={telemetryHistory} />
      </div>

      {/* 3. Chronological Activity Log Section */}
      <div>
        <ActivityLog logs={activityLogs} maxHeight="max-h-[460px]" />
      </div>
    </div>
  );
};

