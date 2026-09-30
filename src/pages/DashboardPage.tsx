import React from 'react';
import { ClassroomCanvas } from '../components/classroom/ClassroomCanvas';
import { ControlSidebar } from '../components/controls/ControlSidebar';
import { CompactSystemStatus } from '../components/controls/CompactSystemStatus';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Main Control Center Grid: Controls on left / 3D Classroom Hero on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* Left Control & Sensor Sidebar (4 cols on desktop) */}
        <div className="lg:col-span-4 order-2 lg:order-1 min-w-0">
          <ControlSidebar />
        </div>

        {/* Right 3D Classroom Canvas (8 cols on desktop — Primary Visual Element) */}
        <div className="lg:col-span-8 order-1 lg:order-2 space-y-3 min-w-0">
          <div className="w-full h-[520px] sm:h-[620px] lg:h-[720px] relative">
            <ClassroomCanvas className="w-full h-full" />
          </div>
        </div>

      </div>

      {/* Bottom Compact System Status Bar */}
      <div className="w-full">
        <CompactSystemStatus />
      </div>
    </div>
  );
};

