import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './Header';
import { useClassroomStore } from '../../store/classroomStore';

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const recordTelemetrySample = useClassroomStore((state) => state.recordTelemetrySample);

  // Background sampling for live continuous telemetry graphs (every 2.5s)
  useEffect(() => {
    recordTelemetrySample();
    const interval = setInterval(() => {
      recordTelemetrySample();
    }, 2500);
    return () => clearInterval(interval);
  }, [recordTelemetrySample]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="w-full h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="border-t border-slate-200 bg-white py-4 px-6 text-center text-xs text-slate-400">
        <p>Smart Classroom Automation System — Interactive Digital Twin & Engineering Simulation</p>
      </footer>
    </div>
  );
};

