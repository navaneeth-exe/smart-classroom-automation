import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Minimize, 
  RotateCcw, 
  Sparkles, 
  Sliders, 
  Play, 
  Pause,
  LogOut,
  Layers
} from 'lucide-react';
import { ACADEMIC_SLIDES } from '../components/presentation/academicSlidesData';
import { ClassroomCanvas } from '../components/classroom/ClassroomCanvas';

export const PresentationPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSlides = ACADEMIC_SLIDES.length;
  const currentSlide = ACADEMIC_SLIDES[currentSlideIdx];

  // Navigation handlers
  const nextSlide = useCallback(() => {
    setCurrentSlideIdx((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIdx((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const goToSlide = (idx: number) => {
    if (idx >= 0 && idx < totalSlides) {
      setCurrentSlideIdx(idx);
    }
  };

  const restartPresentation = () => {
    setCurrentSlideIdx(0);
  };

  // Fullscreen toggle handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Fullscreen request failed: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => {
        console.error(`Exit fullscreen failed: ${err.message}`);
      });
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen change events (e.g. Esc key)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if an input is focused
      if (['input', 'textarea'].includes((e.target as HTMLElement).tagName.toLowerCase())) return;

      switch (e.key) {
        case 'ArrowRight':
        case ' ': // Spacebar advances
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(totalSlides - 1);
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'Escape':
          if (isFullscreen) {
            // Browser handles exiting fullscreen, state will sync via event listener
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, totalSlides, isFullscreen]);

  // Optional autoplay / timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlideIdx((prev) => {
        if (prev < totalSlides - 1) {
          return prev + 1;
        } else {
          setIsAutoPlaying(false);
          return prev;
        }
      });
    }, 8000); // 8 seconds per slide

    return () => clearInterval(timer);
  }, [isAutoPlaying, totalSlides]);

  const progressPercentage = ((currentSlideIdx + 1) / totalSlides) * 100;

  const [showTwinModal, setShowTwinModal] = useState(false);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-slate-900 text-slate-800 shadow-2xl overflow-hidden transition-all duration-300 ${
        isFullscreen 
          ? 'h-screen w-screen rounded-none border-none p-4 sm:p-6 lg:p-8' 
          : 'h-[calc(100vh-6.5rem)] min-h-[640px]'
      }`}
    >
      {/* ============================================================== */}
      {/* 0. LIVE 3D TWIN MODAL POPUP (Direct In-Presentation Demo) */}
      {/* ============================================================== */}
      <AnimatePresence>
        {showTwinModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Live 3D Classroom Digital Twin Demonstration
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Interactive software representation of the STM32-governed classroom
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigate('/classroom')}
                    className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-colors"
                  >
                    Open Full Page
                  </button>
                  <button
                    onClick={() => setShowTwinModal(false)}
                    className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors"
                    title="Close 3D Demo Modal"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 3D Canvas Body */}
              <div className="flex-1 w-full relative bg-slate-100">
                <ClassroomCanvas className="w-full h-full rounded-none border-none" />
              </div>

              {/* Modal Footer Controls Hint */}
              <div className="px-6 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>Click students, fans, lights, or sensors to inspect • Drag to orbit view</span>
                <button
                  onClick={() => setShowTwinModal(false)}
                  className="px-4 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors"
                >
                  Return to Slide Deck
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* 1. TOP PRESENTATION APP BAR (HUD) */}
      {/* ============================================================== */}
      <header className="flex items-center justify-between px-5 py-3 bg-white/95 backdrop-blur-md border-b border-slate-200 rounded-t-xl z-20 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm shadow-blue-500/20">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-900 tracking-tight">
                Academic Project Presentation
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                STM32 Embedded Architecture
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              {currentSlide.category} • Slide {currentSlide.id} of {totalSlides}
            </p>
          </div>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center space-x-2">
          {/* Launch Step-by-Step 3D Simulation Twin Animation Demo */}
          <button
            onClick={() => navigate('/twin-demo')}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all cursor-pointer shadow-sm hover:shadow active:scale-95"
            title="Launch Step-by-Step 3D Twin Automation Demo"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-200 animate-pulse" />
            <span>Launch 3D Twin Demo</span>
          </button>

          {/* Controls Route Link */}
          <button
            onClick={() => navigate('/controls')}
            className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            title="Open Live Sensory Cockpit"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Live Sensors</span>
          </button>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          {/* Autoplay toggle */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`p-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              isAutoPlaying ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            title={isAutoPlaying ? 'Pause Auto-Advance' : 'Auto-Advance Slides (8s)'}
          >
            {isAutoPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Fullscreen Presentation (F)'}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Exit Presentation */}
          <button
            onClick={() => navigate('/')}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 transition-colors cursor-pointer"
            title="Exit Presentation to Dashboard"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. MAIN 16:9 SLIDE STAGE CANVAS */}
      {/* ============================================================== */}
      <main className="flex-1 flex items-center justify-center p-3 sm:p-6 overflow-hidden bg-slate-900/90 relative">
        {/* 16:9 Aspect Ratio Frame Container */}
        <div className="w-full max-w-6xl aspect-[16/9] max-h-full bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col justify-between relative">
          
          {/* Slide Header Banner */}
          <div className="px-6 sm:px-8 pt-5 pb-3 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 block mb-0.5">
                {currentSlide.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                {currentSlide.title}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {currentSlide.subtitle}
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono font-bold text-slate-400">
                {currentSlide.id < 10 ? `0${currentSlide.id}` : currentSlide.id} / {totalSlides}
              </span>
            </div>
          </div>

          {/* Slide Content Body (with smooth Framer Motion slide transition) */}
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.24, ease: 'easeOut' }}
                className="h-full flex flex-col justify-center"
              >
                {currentSlide.content}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Footer Branding Bar */}
          <div className="px-6 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 shrink-0 font-medium">
            <span>Smart Classroom Automation System Using STM32</span>
            <span>Academic Viva & Evaluation Presentation</span>
          </div>

        </div>
      </main>

      {/* ============================================================== */}
      {/* 3. BOTTOM PRESENTATION DOCK & THUMBNAIL TRACK */}
      {/* ============================================================== */}
      <footer className="px-5 py-3 bg-white/95 backdrop-blur-md border-t border-slate-200 rounded-b-xl z-20 shrink-0 space-y-2">
        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-blue-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          {/* Slide thumbnails / jump dots */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto max-w-[65%] py-1">
            {ACADEMIC_SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlideIdx;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-xs scale-105' 
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                  title={`${slide.id}. ${slide.title}`}
                >
                  {slide.id < 10 ? `0${slide.id}` : slide.id}
                </button>
              );
            })}
          </div>

          {/* Slide Transport Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={restartPresentation}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Restart from Slide 1 (Home)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={prevSlide}
              disabled={currentSlideIdx === 0}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentSlideIdx === 0
                  ? 'text-slate-300 bg-slate-50 cursor-not-allowed'
                  : 'text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer'
              }`}
              title="Previous Slide (Left Arrow)"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            <button
              onClick={nextSlide}
              disabled={currentSlideIdx === totalSlides - 1}
              className={`flex items-center space-x-1 px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs ${
                currentSlideIdx === totalSlides - 1
                  ? 'text-slate-300 bg-slate-100 cursor-not-allowed'
                  : 'text-white bg-blue-600 hover:bg-blue-500 cursor-pointer'
              }`}
              title="Next Slide (Right Arrow or Space)"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
