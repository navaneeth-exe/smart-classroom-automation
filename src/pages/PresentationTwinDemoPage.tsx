import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  RotateCcw, 
  LogOut, 
  Cpu, 
  CheckCircle2, 
  Lightbulb, 
  Wind, 
  Thermometer, 
  Sun, 
  Users,
  Radio
} from 'lucide-react';
import { ClassroomCanvas } from '../components/classroom/ClassroomCanvas';
import { PRESENTATION_SCENES } from '../components/presentation/presentationTimeline';
import { useClassroomStore } from '../store/classroomStore';

export const PresentationTwinDemoPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Live simulation states for HUD readout
  const occupancy = useClassroomStore((state) => state.occupancy);
  const pirDetected = useClassroomStore((state) => state.pirDetected);
  const lightIntensity = useClassroomStore((state) => state.lightIntensity);
  const lightState = useClassroomStore((state) => state.lightState);
  const temperature = useClassroomStore((state) => state.temperature);
  const fanSpeed = useClassroomStore((state) => state.fanSpeed);

  const scene = PRESENTATION_SCENES[currentSceneIdx];

  // Execute scene action
  const executeScene = useCallback((idx: number) => {
    const targetScene = PRESENTATION_SCENES[idx];
    if (targetScene) {
      targetScene.action();
    }
  }, []);

  // Go to specific scene
  const goToScene = useCallback((idx: number) => {
    const safeIdx = Math.max(0, Math.min(idx, PRESENTATION_SCENES.length - 1));
    setCurrentSceneIdx(safeIdx);
    setElapsedSeconds(0);
    executeScene(safeIdx);
  }, [executeScene]);

  // Restart presentation
  const handleRestart = useCallback(() => {
    goToScene(0);
    setIsPlaying(true);
  }, [goToScene]);

  // Play / Pause toggle
  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Next scene
  const handleNext = useCallback(() => {
    if (currentSceneIdx < PRESENTATION_SCENES.length - 1) {
      goToScene(currentSceneIdx + 1);
    } else {
      setIsPlaying(false);
    }
  }, [currentSceneIdx, goToScene]);

  // Previous scene
  const handlePrevious = useCallback(() => {
    if (currentSceneIdx > 0) {
      goToScene(currentSceneIdx - 1);
    }
  }, [currentSceneIdx, goToScene]);

  // Execute initial scene on mount
  const hasMounted = useRef(false);
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      executeScene(0);
    }
  }, [executeScene]);

  // Auto-advance timer
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setElapsedSeconds((prev) => {
        if (prev + 1 >= scene.durationSeconds) {
          // Advance to next scene
          if (currentSceneIdx < PRESENTATION_SCENES.length - 1) {
            goToScene(currentSceneIdx + 1);
          } else {
            setIsPlaying(false);
          }
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, scene.durationSeconds, currentSceneIdx, goToScene]);

  const progressPct = Math.min(100, Math.round((elapsedSeconds / scene.durationSeconds) * 100));

  return (
    <div className="relative w-full h-[calc(100vh-5.5rem)] min-h-[640px] flex flex-col rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-950 shadow-2xl">
      {/* 3D Classroom Visual Focus (dominates viewport) */}
      <div className="relative w-full h-full flex-1">
        <ClassroomCanvas
          className="w-full h-full rounded-none border-none"
          cameraPreset={scene.cameraPreset}
          hideOverlays={true}
        />
      </div>

      {/* Top Header Floating Overlay: Minimal Cinematic Branding */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="pointer-events-auto flex items-center space-x-2">
          {/* Mode Pill */}
          <div className="bg-slate-900/90 text-white backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 shadow-md flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold tracking-wider uppercase text-[11px] text-emerald-400 flex items-center space-x-1">
              <Cpu className="w-3.5 h-3.5 inline mr-1" />
              CINEMATIC PRESENTATION
            </span>
          </div>

          {/* Current Step Counter Badge */}
          <div className="bg-white/95 text-slate-800 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-md text-xs font-bold font-mono">
            SCENE {scene.id < 10 ? `0${scene.id}` : scene.id} / {PRESENTATION_SCENES.length}
          </div>
        </div>

        {/* Live Simulation Real-time Telemetry HUD (Compact Glassmorphic Strip) */}
        <div className="pointer-events-auto hidden md:flex items-center space-x-3 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-xl border border-slate-200 shadow-md text-xs text-slate-600">
          <div className="flex items-center space-x-1.5">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-semibold text-slate-900">{occupancy}</span>
            <span className="text-[10px] text-slate-400 uppercase">Occ</span>
          </div>
          <span className="text-slate-200">|</span>
          <div className="flex items-center space-x-1.5">
            <Radio className={`w-3.5 h-3.5 ${pirDetected ? 'text-emerald-500 animate-pulse' : 'text-slate-400'}`} />
            <span className="font-semibold text-slate-900">{pirDetected ? 'ACTIVE' : 'IDLE'}</span>
            <span className="text-[10px] text-slate-400 uppercase">PIR</span>
          </div>
          <span className="text-slate-200">|</span>
          <div className="flex items-center space-x-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-semibold text-slate-900">{Math.round(lightIntensity)}%</span>
            <span className="text-[10px] text-slate-400 uppercase">Lux</span>
          </div>
          <span className="text-slate-200">|</span>
          <div className="flex items-center space-x-1.5">
            <Lightbulb className={`w-3.5 h-3.5 ${lightState ? 'text-amber-500 fill-amber-400' : 'text-slate-400'}`} />
            <span className="font-semibold text-slate-900">{lightState ? 'ON' : 'OFF'}</span>
            <span className="text-[10px] text-slate-400 uppercase">Light</span>
          </div>
          <span className="text-slate-200">|</span>
          <div className="flex items-center space-x-1.5">
            <Thermometer className="w-3.5 h-3.5 text-red-500" />
            <span className="font-semibold text-slate-900">{temperature.toFixed(1)}°C</span>
          </div>
          <span className="text-slate-200">|</span>
          <div className="flex items-center space-x-1.5">
            <Wind className={`w-3.5 h-3.5 ${fanSpeed > 0 ? 'text-cyan-500' : 'text-slate-400'}`} />
            <span className="font-semibold text-slate-900">{fanSpeed}%</span>
            <span className="text-[10px] text-slate-400 uppercase">Fan</span>
          </div>
        </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate('/presentation')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white backdrop-blur-md shadow-md text-xs font-semibold transition-all cursor-pointer"
              title="Return to Academic PPT Presentation"
            >
              <span>Back to Slides</span>
            </button>
            <button
              onClick={() => navigate('/classroom')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/95 hover:bg-red-50 hover:text-red-700 text-slate-700 backdrop-blur-md border border-slate-200 shadow-md text-xs font-semibold transition-all cursor-pointer"
              title="Exit to Classroom"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Classroom</span>
            </button>
          </div>
      </div>

      {/* Floating Scene Information Card (Animated with Framer Motion) */}
      <div className="absolute top-20 left-4 max-w-sm sm:max-w-md pointer-events-none z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={scene.id}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="pointer-events-auto bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xl"
          >
            {/* Scene Badge */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600">
                {scene.badge}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Cam: <strong className="text-slate-700 capitalize">{scene.cameraPreset}</strong>
              </span>
            </div>

            {/* Scene Title */}
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug">
              {scene.title}
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              {scene.description}
            </p>

            {/* Live Automated Verification Points */}
            <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
              {scene.details.map((detail, dIdx) => (
                <div key={dIdx} className="flex items-center space-x-1.5 text-[11px] text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            {/* Step Progress Bar (when playing) */}
            {isPlaying && (
              <div className="mt-3">
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mb-1">
                  <span>Auto-advancing...</span>
                  <span>{scene.durationSeconds - elapsedSeconds}s</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                  <div
                    className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Bottom Presentation Controls Dock */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col items-center pointer-events-none z-10 space-y-2">
        {/* Scrubber / Step Breadcrumbs */}
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl border border-slate-200 shadow-xl flex items-center space-x-1 sm:space-x-1.5 max-w-full overflow-x-auto">
          {PRESENTATION_SCENES.map((s, idx) => {
            const isActive = idx === currentSceneIdx;
            const isCompleted = idx < currentSceneIdx;

            return (
              <button
                key={s.id}
                onClick={() => goToScene(idx)}
                className={`relative px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs scale-105'
                    : isCompleted
                    ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <span>{s.id < 10 ? `0${s.id}` : s.id}</span>
                <span className="hidden md:inline ml-1">{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Transport Controls Bar */}
        <div className="pointer-events-auto bg-slate-900/95 text-white backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-800 shadow-2xl flex items-center space-x-3 sm:space-x-4">
          {/* Restart */}
          <button
            onClick={handleRestart}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Restart Presentation (Scene 1)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Previous Scene */}
          <button
            onClick={handlePrevious}
            disabled={currentSceneIdx === 0}
            className={`p-2 rounded-xl transition-colors ${
              currentSceneIdx === 0
                ? 'text-slate-600 cursor-not-allowed'
                : 'text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer'
            }`}
            title="Previous Scene"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Play / Pause Toggle Button */}
          <button
            onClick={togglePlay}
            className={`px-5 py-2 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer shadow-md ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>{currentSceneIdx === 0 && elapsedSeconds === 0 ? 'Start Presentation' : 'Resume'}</span>
              </>
            )}
          </button>

          {/* Next Scene */}
          <button
            onClick={handleNext}
            disabled={currentSceneIdx === PRESENTATION_SCENES.length - 1}
            className={`p-2 rounded-xl transition-colors ${
              currentSceneIdx === PRESENTATION_SCENES.length - 1
                ? 'text-slate-600 cursor-not-allowed'
                : 'text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer'
            }`}
            title="Next Scene"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-slate-700 hidden sm:block"></div>

          {/* Quick Scene Jump Status */}
          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
            Step {currentSceneIdx + 1} of {PRESENTATION_SCENES.length}
          </span>
        </div>
      </div>
    </div>
  );
};
