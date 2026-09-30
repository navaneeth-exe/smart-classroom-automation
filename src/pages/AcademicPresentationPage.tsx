import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Zap,
  Thermometer,
  Sun,
  Users,
  Cpu,
  Lightbulb,
  Wind,
  BarChart3,
  Target,
  Shield,
  CheckCircle2,
  XCircle,
  BookOpen,
  Code,
  Smartphone,
  Cloud,
  Brain,
  ExternalLink,
  AlertTriangle,
} from 'lucide-react';
import { ClassroomCanvas } from '../components/classroom/ClassroomCanvas';
import { useClassroomStore } from '../store/classroomStore';

export interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  component: React.ReactNode;
  note?: string;
}

// Helper Components
const ArrowDown = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
);

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

export const AcademicPresentationPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoAdvanceTimer, setAutoAdvanceTimer] = useState<NodeJS.Timeout | null>(null);

  // Simulation state
  const occupancy = useClassroomStore((state) => state.occupancy);
  const temperature = useClassroomStore((state) => state.temperature);
  const lightIntensity = useClassroomStore((state) => state.lightIntensity);
  const pirDetected = useClassroomStore((state) => state.pirDetected);
  const lightState = useClassroomStore((state) => state.lightState);
  const fanSpeed = useClassroomStore((state) => state.fanSpeed);
  const fanState = useClassroomStore((state) => state.fanState);
  const mode = useClassroomStore((state) => state.mode);

  const slidesRef = useRef<HTMLDivElement>(null);

  // Auto-advance timer
  useEffect(() => {
    if (!isPlaying) {
      if (autoAdvanceTimer) {
        clearInterval(autoAdvanceTimer);
        setAutoAdvanceTimer(null);
      }
      return;
    }

    const interval = setInterval(() => {
      if (currentSlideIdx < slides.length - 1) {
        setCurrentSlideIdx((prev) => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, 8000); // 8 seconds per slide

    setAutoAdvanceTimer(interval);
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, currentSlideIdx]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'Escape') {
        setIsFullscreen(false);
      } else if (e.key === 'Home') {
        goToSlide(0);
      } else if (e.key === 'End') {
        goToSlide(slides.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIdx]);

  const handleNext = useCallback(() => {
    if (currentSlideIdx < slides.length - 1) {
      setCurrentSlideIdx(currentSlideIdx + 1);
    }
  }, [currentSlideIdx]);

  const handlePrevious = useCallback(() => {
    if (currentSlideIdx > 0) {
      setCurrentSlideIdx(currentSlideIdx - 1);
    }
  }, [currentSlideIdx]);

  const goToSlide = useCallback((idx: number) => {
    setCurrentSlideIdx(Math.max(0, Math.min(idx, slides.length - 1)));
  }, []);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      slidesRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleStartDemo = () => {
    navigate('/twin-demo');
  };

  // Slide 1: Title
  const slide1 = (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="relative w-full h-full flex items-center justify-center p-8">
        {/* Background 3D preview */}
        <div className="absolute top-8 right-8 w-96 h-60 rounded-xl overflow-hidden border border-slate-200 shadow-2xl">
          <ClassroomCanvas className="w-full h-full" hideOverlays={true} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl"
        >
          <div className="flex items-center justify-center mb-6">
            <Cpu className="w-12 h-12 text-blue-600 mr-4" />
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight">
              Smart Classroom Automation
            </h1>
          </div>
          <h2 className="text-2xl md:text-3xl text-slate-600 mb-8">
            Using STM32 — Interactive Digital Twin
          </h2>
          <div className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg mb-10">
            "Smarter Classroom, Better Comfort, Efficient Energy Use"
          </div>
          <div className="text-slate-500 text-sm mt-12">
            Academic Project — Engineering Simulation
          </div>
        </motion.div>
      </div>
    </div>
  );

  // Slide 2: Problem Statement
  const slide2 = (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-rose-50 p-8">
      <h1 className="text-5xl font-bold text-slate-900 mb-12">The Problem</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-5xl">
        <motion.div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-8 h-8 text-rose-500 mr-4" />
            <h3 className="text-2xl font-bold text-slate-800">Traditional Classroom</h3>
          </div>
          <ul className="space-y-3 text-slate-600">
            <li className="flex items-center">
              <XCircle className="w-5 h-5 text-rose-400 mr-3" />
              Lights may remain ON unnecessarily
            </li>
            <li className="flex items-center">
              <XCircle className="w-5 h-5 text-rose-400 mr-3" />
              Fans run at fixed speed regardless of temperature
            </li>
            <li className="flex items-center">
              <XCircle className="w-5 h-5 text-rose-400 mr-3" />
              Energy wasted when classrooms are empty
            </li>
            <li className="flex items-center">
              <XCircle className="w-5 h-5 text-rose-400 mr-3" />
              Manual control requires constant attention
            </li>
            <li className="flex items-center">
              <XCircle className="w-5 h-5 text-rose-400 mr-3" />
              No centralized monitoring
            </li>
          </ul>
        </motion.div>
        <motion.div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl">
          <div className="flex items-center mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mr-4" />
            <h3 className="text-2xl font-bold text-slate-800">Smart Classroom</h3>
          </div>
          <ul className="space-y-3 text-slate-600">
            <li className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3" />
              Occupancy-aware lighting
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3" />
              Temperature-controlled fans
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3" />
              Automatic power-down when empty
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3" />
              Centralized control & monitoring
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3" />
              Energy-efficient operation
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );

  // Slide 3: Motivation
  const slide3 = (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-amber-50 p-8">
      <h1 className="text-5xl font-bold text-slate-900 mb-12">Why Smart Classroom Automation?</h1>
      <div className="max-w-4xl">
        <div className="grid grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Thermometer className="w-10 h-10 text-orange-500" />
            </div>
            <h3 className="font-bold text-lg">Temperature</h3>
          </div>
          <div className="text-center">
            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Sun className="w-10 h-10 text-amber-500" />
            </div>
            <h3 className="font-bold text-lg">Ambient Light</h3>
          </div>
          <div className="text-center">
            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="font-bold text-lg">Occupancy</h3>
          </div>
        </div>
        <div className="text-center text-slate-600 mb-8">
          <ArrowDown className="w-8 h-8 mx-auto mb-4 text-slate-400" />
        </div>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Intelligent Automation</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            <div className="flex flex-col items-center">
              <Zap className="w-8 h-8 text-blue-500 mb-2" />
              <span className="text-sm">Energy Efficiency</span>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="w-8 h-8 text-emerald-500 mb-2" />
              <span className="text-sm">Comfort</span>
            </div>
            <div className="flex flex-col items-center">
              <Cpu className="w-8 h-8 text-purple-500 mb-2" />
              <span className="text-sm">Automation</span>
            </div>
            <div className="flex flex-col items-center">
              <BarChart3 className="w-8 h-8 text-cyan-500 mb-2" />
              <span className="text-sm">Monitoring</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Slide 4: Objectives
  const slide4 = (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <h1 className="text-5xl font-bold text-slate-900 mb-12">Project Objectives</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {[
          { icon: Users, text: "Detect classroom occupancy", color: "bg-blue-100 text-blue-600" },
          { icon: Thermometer, text: "Monitor temperature and humidity", color: "bg-orange-100 text-orange-600" },
          { icon: Sun, text: "Monitor ambient light levels", color: "bg-amber-100 text-amber-600" },
          { icon: Lightbulb, text: "Automatically control lighting", color: "bg-yellow-100 text-yellow-600" },
          { icon: Wind, text: "Adjust fan speed according to temperature", color: "bg-cyan-100 text-cyan-600" },
          { icon: BarChart3, text: "Provide monitoring and manual control", color: "bg-purple-100 text-purple-600" },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg flex items-center space-x-4"
          >
            <div className={`${item.color} p-3 rounded-xl`}>
              <item.icon className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-slate-800">{item.text}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Slide 5: Proposed System
  const slide5 = (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-50 p-8">
      <h1 className="text-5xl font-bold text-slate-900 mb-8">Proposed System</h1>
      <div className="max-w-5xl w-full">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl">
          <div className="text-center text-slate-600 mb-10">
            <p className="text-lg mb-4">Academic system architecture — currently implemented as software simulation</p>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {/* Inputs */}
            <div className="text-center">
              <h3 className="font-bold text-xl mb-6 text-blue-600">INPUTS</h3>
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <div className="font-bold text-lg mb-2">DHT22</div>
                  <div className="text-sm text-slate-600">Temperature & Humidity</div>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                  <div className="font-bold text-lg mb-2">LDR</div>
                  <div className="text-sm text-slate-600">Ambient Light</div>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                  <div className="font-bold text-lg mb-2">PIR</div>
                  <div className="text-sm text-slate-600">Occupancy</div>
                </div>
              </div>
            </div>

            {/* Processor */}
            <div className="text-center flex flex-col items-center justify-center">
              <div className="bg-slate-800 text-white p-8 rounded-2xl shadow-2xl w-full">
                <Cpu className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">STM32</h3>
                <div className="text-slate-300">Control / Processing</div>
              </div>
              <ArrowDown className="w-8 h-8 my-4 text-slate-400" />
            </div>

            {/* Outputs */}
            <div className="text-center">
              <h3 className="font-bold text-xl mb-6 text-purple-600">OUTPUTS</h3>
              <div className="space-y-6">
                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                  <div className="font-bold text-lg mb-2">Lighting</div>
                  <div className="text-sm text-slate-600">Automatic Control</div>
                </div>
                <div className="bg-cyan-50 p-4 rounded-xl border border-cyan-200">
                  <div className="font-bold text-lg mb-2">Fan</div>
                  <div className="text-sm text-slate-600">PWM Speed Control</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="font-bold text-lg mb-2">System Status</div>
                  <div className="text-sm text-slate-600">Monitoring Interface</div>
                </div>
              </div>
            </div>
          </div>

          {/* Wi-Fi Bridge */}
          <div className="mt-12 text-center">
            <ArrowDown className="w-8 h-8 mx-auto mb-4 text-slate-400" />
            <div className="inline-block bg-orange-50 p-6 rounded-xl border border-orange-200">
              <div className="flex items-center justify-center">
                <Cloud className="w-10 h-10 text-orange-600 mr-4" />
                <div>
                  <h3 className="font-bold text-xl">ESP32 / Wi-Fi</h3>
                  <div className="text-slate-600">Web Interface & Monitoring</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Slide 6: System Architecture
  const slide6 = (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 p-8">
      <h1 className="text-5xl font-bold text-slate-900 mb-12">System Architecture</h1>
      <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-2xl max-w-5xl">
        <div className="grid grid-cols-3 items-center gap-8">
          <div>
            <div className="space-y-4">
              <div className="bg-slate-800 text-white p-6 rounded-xl text-center">
                <div className="font-bold text-xl">DHT22</div>
                <div className="text-sm text-slate-300 mt-2">Temp/Humidity</div>
              </div>
              <div className="bg-amber-600 text-white p-6 rounded-xl text-center">
                <div className="font-bold text-xl">LDR</div>
                <div className="text-sm text-amber-100 mt-2">Ambient Light</div>
              </div>
              <div className="bg-emerald-600 text-white p-6 rounded-xl text-center">
                <div className="font-bold text-xl">PIR</div>
                <div className="text-sm text-emerald-100 mt-2">Occupancy</div>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <ArrowDown className="w-8 h-8 text-slate-400" />
            </div>
          </div>

          <div className="text-center">
            <div className="bg-slate-900 text-white p-10 rounded-2xl shadow-2xl">
              <Cpu className="w-20 h-20 mx-auto mb-4" />
              <h3 className="text-2xl font-bold">STM32</h3>
              <p className="text-slate-300 mt-2">Microcontroller<br/>Processing Unit</p>
            </div>
            <div className="flex justify-center mt-6">
              <ArrowDown className="w-8 h-8 text-slate-400" />
            </div>
          </div>

          <div>
            <div className="space-y-4">
              <div className="bg-slate-200 p-6 rounded-xl border-2 border-slate-300 text-center">
                <Lightbulb className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                <div className="font-bold text-lg">Relay</div>
                <div className="text-sm text-slate-600">Lighting</div>
              </div>
              <div className="bg-slate-200 p-6 rounded-xl border-2 border-slate-300 text-center">
                <Wind className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="font-bold text-lg">PWM</div>
                <div className="text-sm text-slate-600">Fan Control</div>
              </div>
              <div className="bg-slate-100 p-6 rounded-xl border text-center">
                <Code className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                <div className="font-bold text-lg">System Status</div>
                <div className="text-sm text-slate-600">Feedback</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Slide 7: Hardware Components
  const slide7 = (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-8 overflow-y-auto">
      <h1 className="text-5xl font-bold text-slate-900 mb-12">System Components</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {[
          { name: 'STM32', icon: Cpu, desc: 'Main controller', color: 'bg-slate-800 text-white' },
          { name: 'DHT22', icon: Thermometer, desc: 'Temp & Humidity', color: 'bg-orange-100 text-orange-700' },
          { name: 'LDR', icon: Sun, desc: 'Ambient light', color: 'bg-amber-100 text-amber-700' },
          { name: 'PIR', icon: Users, desc: 'Motion sensor', color: 'bg-emerald-100 text-emerald-700' },
          { name: 'Relay', icon: Lightbulb, desc: 'Light switch', color: 'bg-yellow-100 text-yellow-700' },
          { name: 'MOSFET/PWM', icon: Wind, desc: 'Fan control', color: 'bg-cyan-100 text-cyan-700' },
          { name: 'DC Fan', icon: Wind, desc: 'Cooling system', color: 'bg-blue-100 text-blue-700' },
          { name: 'LED Lighting', icon: Lightbulb, desc: 'Room illumination', color: 'bg-amber-100 text-amber-700' },
          { name: 'ESP32', icon: Cloud, desc: 'Wi-Fi module', color: 'bg-purple-100 text-purple-700' },
        ].map((comp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg"
          >
            <div className={`${comp.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4`}>
              <comp.icon className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl text-slate-800 mb-2">{comp.name}</h3>
            <p className="text-sm text-slate-600">{comp.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Slide 8: Working Principle
  const slide8 = (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <h1 className="text-5xl font-bold text-slate-900 mb-12">How It Works</h1>
      <div className="max-w-5xl w-full">
        <div className="space-y-4">
          {[
            { step: 1, title: 'Sensors collect environmental data', desc: 'DHT22, LDR, PIR read temperature, light, occupancy' },
            { step: 2, title: 'STM32 processes inputs', desc: 'Microcontroller evaluates sensor data against thresholds' },
            { step: 3, title: 'Occupancy detected', desc: 'PIR confirms presence or absence of students' },
            { step: 4, title: 'Lighting condition evaluated', desc: 'LDR checks ambient light level' },
            { step: 5, title: 'Temperature evaluated', desc: 'DHT22 provides current room temperature' },
            { step: 6, title: 'Fan speed adjusted', desc: 'PWM output changes based on temperature brackets' },
            { step: 7, title: 'Devices respond automatically', desc: 'Relays switch lights, PWM drives fan' },
            { step: 8, title: 'Status on monitoring interface', desc: 'ESP32 transmits data to web dashboard' },
          ].map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg flex items-center space-x-6"
            >
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                {item.step}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-slate-800 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
              {idx < 7 && <ArrowRight className="w-6 h-6 text-slate-300 flex-shrink-0" />}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  // Slide 9: Smart Automation Logic
  const slide9 = (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-50 p-8">
      <h1 className="text-5xl font-bold text-slate-900 mb-12">Intelligent Automation</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
            <Lightbulb className="w-8 h-8 text-amber-500 mr-3" />
            Lighting Control
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
              <p className="font-bold text-slate-800">Occupancy detected + Low ambient light</p>
              <p className="text-sm text-slate-600 mt-1">→ LIGHT ON</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <p className="font-bold text-slate-800">No occupancy</p>
              <p className="text-sm text-slate-600 mt-1">→ LIGHT OFF</p>
            </div>
          </div>
          <div className="mt-6 text-xs text-slate-500">
            Threshold: Light Intensity &lt; 40%
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
            <Wind className="w-8 h-8 text-blue-500 mr-3" />
            Fan Speed Control
          </h2>
          <div className="space-y-3">
            {[
              { temp: 'T < 25°C', speed: 'OFF', color: 'bg-slate-100' },
              { temp: '25–30°C', speed: '30% PWM', color: 'bg-blue-50' },
              { temp: '30–35°C', speed: '60% PWM', color: 'bg-orange-50' },
              { temp: '≥ 35°C', speed: '100% PWM', color: 'bg-red-50' },
            ].map((item, idx) => (
              <div key={idx} className={`p-4 rounded-xl border ${item.color}`}>
                <p className="font-bold text-slate-800">{item.temp}</p>
                <p className="text-sm text-slate-600 mt-1">→ {item.speed}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Slide 10: Interactive Digital Twin
  const slide10 = (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white">
      <h1 className="text-5xl font-bold mb-4">Interactive Smart Classroom</h1>
      <p className="text-slate-300 mb-8">Live 3D Digital Twin Demonstration</p>
      <div className="w-full max-w-6xl h-96 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
        <ClassroomCanvas className="w-full h-full" hideOverlays={true} />
      </div>
      <div className="flex items-center space-x-8 mt-6 text-sm">
        <div className="flex items-center">
          <Users className="w-5 h-5 mr-2 text-blue-400" />
          <span>Occupancy: {occupancy}/16</span>
        </div>
        <div className="flex items-center">
          <Thermometer className="w-5 h-5 mr-2 text-orange-400" />
          <span>Temp: {temperature.toFixed(1)}°C</span>
        </div>
        <div className="flex items-center">
          <Wind className="w-5 h-5 mr-2 text-cyan-400" />
          <span>Fan: {fanSpeed}%</span>
        </div>
        <div className="flex items-center">
          <Lightbulb className={`w-5 h-5 mr-2 ${lightState ? 'text-amber-400' : 'text-slate-600'}`} />
          <span>Light: {lightState ? 'ON' : 'OFF'}</span>
        </div>
      </div>
    </div>
  );

  // Slide 11: Control & Monitoring
  const slide11 = (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <h1 className="text-5xl font-bold text-slate-900 mb-12">Smart Monitoring & Control</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
        {[
          { icon: Thermometer, value: `${temperature.toFixed(1)}°C`, label: 'Temperature' },
          { icon: Users, value: occupancy, label: 'Occupancy' },
          { icon: Sun, value: `${Math.round(lightIntensity)}%`, label: 'Ambient Light' },
          { icon: Lightbulb, value: lightState ? 'ON' : 'OFF', label: 'Light State', active: lightState },
          { icon: Wind, value: `${fanSpeed}%`, label: 'Fan Speed', active: fanState },
          { icon: Cpu, value: mode, label: 'Operating Mode', active: mode === 'AUTO' },
          { icon: CheckCircle2, value: pirDetected ? 'ACTIVE' : 'IDLE', label: 'PIR Status', active: pirDetected },
          { icon: BarChart3, value: 'Live', label: 'System Status', active: true },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg text-center">
            <item.icon className={`w-8 h-8 mx-auto mb-3 ${item.active ? 'text-blue-600' : 'text-slate-400'}`} />
            <div className="text-2xl font-bold text-slate-800">{item.value}</div>
            <div className="text-sm text-slate-600 mt-1">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // Slide 12: Analytics
  const slide12 = (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50 p-8">
      <h1 className="text-5xl font-bold text-slate-900 mb-12">Data & Insights</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl">
          <div className="flex items-center mb-6">
            <BarChart3 className="w-8 h-8 text-purple-600 mr-3" />
            <h3 className="text-2xl font-bold text-slate-800">Telemetry Charts</h3>
          </div>
          <div className="space-y-3">
            {['Temperature Over Time', 'Occupancy Timeline', 'Fan Speed Trend', 'Ambient Light Changes'].map((chart, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="font-medium text-slate-700">{chart}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl">
          <div className="flex items-center mb-6">
            <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
            <h3 className="text-2xl font-bold text-slate-800">Activity Log</h3>
          </div>
          <div className="space-y-3 text-sm">
            {[
              { type: 'OCCUPANCY', msg: 'Student entered classroom' },
              { type: 'SENSOR', msg: 'Temperature rose to 27°C' },
              { type: 'ACTUATOR', msg: 'Fan activated at 30% PWM' },
              { type: 'SENSOR', msg: 'Light level dropped to 15%' },
              { type: 'ACTUATOR', msg: 'Lights turned ON' },
            ].map((log, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-mono text-xs bg-slate-200 px-2 py-1 rounded mr-2">{log.type}</span>
                <span className="text-slate-700">{log.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Slide 13: Advantages
  const slide13 = (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-50 p-8">
      <h1 className="text-5xl font-bold text-slate-900 mb-12">Benefits</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {[
          { icon: Zap, title: 'Energy Efficiency', desc: 'Automatic device control reduces unnecessary operation', color: 'bg-blue-100 text-blue-700' },
          { icon: Shield, title: 'Comfort', desc: 'Fan operation responds to temperature for optimal comfort', color: 'bg-emerald-100 text-emerald-700' },
          { icon: Cpu, title: 'Automation', desc: 'Less manual intervention required', color: 'bg-purple-100 text-purple-700' },
          { icon: BarChart3, title: 'Monitoring', desc: 'Environmental conditions visible in real time', color: 'bg-cyan-100 text-cyan-700' },
          { icon: Target, title: 'Scalability', desc: 'Concept can be extended to other rooms', color: 'bg-amber-100 text-amber-700' },
          { icon: CheckCircle2, title: 'Smart Technology', desc: 'Modern IoT solution for education', color: 'bg-slate-100 text-slate-700' },
        ].map((benefit, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl text-center">
            <div className={`${benefit.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
              <benefit.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">{benefit.title}</h3>
            <p className="text-sm text-slate-600">{benefit.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // Slide 14: Future Scope
  const slide14 = (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 p-8">
      <h1 className="text-5xl font-bold text-slate-900 mb-12">Future Scope</h1>
      <div className="max-w-5xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: Cpu, title: 'Physical STM32 Prototype', desc: 'Hardware implementation with real sensors' },
            { icon: Smartphone, title: 'Mobile Application', desc: 'Remote monitoring and control via app' },
            { icon: Cloud, title: 'Cloud Monitoring', desc: 'Centralized management for multiple rooms' },
            { icon: Brain, title: 'AI Optimization', desc: 'Predictive energy management' },
            { icon: Users, title: 'Multi-Classroom', desc: 'Scalable to entire building' },
            { icon: BarChart3, title: 'Energy Analytics', desc: 'Detailed consumption reports' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg flex items-center space-x-4">
              <div className="bg-slate-100 p-3 rounded-xl">
                <item.icon className="w-8 h-8 text-slate-700" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-slate-800">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Slide 15: Conclusion
  const slide15 = (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="text-center max-w-4xl">
        <h1 className="text-6xl font-bold mb-8">Smart Classroom Automation</h1>
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 mb-12">
          <p className="text-2xl text-slate-200 leading-relaxed">
            "An intelligent classroom can adapt to its environment instead of relying entirely on manual control."
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-bold mb-6">Ready for Live Demo?</h2>
          <button
            onClick={handleStartDemo}
            className="bg-white text-slate-900 px-10 py-5 rounded-xl font-bold text-xl shadow-xl hover:scale-105 transition-transform inline-flex items-center space-x-3"
          >
            <span>START INTERACTIVE DEMO</span>
            <ExternalLink className="w-6 h-6" />
          </button>
          <p className="text-slate-300 mt-4 text-sm">
            Click to enter the 3D Interactive Smart Classroom Simulation
          </p>
        </div>

        <div className="mt-12 text-slate-400 text-sm">
          Smart Classroom Automation System Using STM32 • Academic Project • Interactive Digital Twin
        </div>
      </div>
    </div>
  );

  const slides: Slide[] = [
    { id: 1, title: "Smart Classroom Automation", subtitle: "Using STM32 — Interactive Digital Twin", component: slide1 },
    { id: 2, title: "The Problem", component: slide2 },
    { id: 3, title: "Why Smart Classroom Automation?", component: slide3 },
    { id: 4, title: "Project Objectives", component: slide4 },
    { id: 5, title: "Proposed System", component: slide5 },
    { id: 6, title: "System Architecture", component: slide6 },
    { id: 7, title: "System Components", component: slide7 },
    { id: 8, title: "Working Principle", component: slide8 },
    { id: 9, title: "Intelligent Automation", component: slide9 },
    { id: 10, title: "Interactive Smart Classroom", component: slide10 },
    { id: 11, title: "Smart Monitoring & Control", component: slide11 },
    { id: 12, title: "Data & Insights", component: slide12 },
    { id: 13, title: "Benefits", component: slide13 },
    { id: 14, title: "Future Scope", component: slide14 },
    { id: 15, title: "Conclusion", component: slide15 },
  ];

  const currentSlide = slides[currentSlideIdx];

  return (
    <div
      ref={slidesRef}
      className="relative w-full h-[calc(100vh-5rem)] bg-slate-50 overflow-hidden"
    >
      {/* Slide Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          {currentSlide.component}
        </motion.div>
      </AnimatePresence>

      {/* Top Controls */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-200 shadow-lg flex items-center space-x-2 hover:bg-slate-50 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">Home</span>
          </button>
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-200 shadow-lg">
            <span className="text-sm font-medium text-slate-700">
              Slide {currentSlide.id} of {slides.length}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleFullscreen}
            className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-200 shadow-lg flex items-center space-x-2 hover:bg-slate-50 transition-colors"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>

          <button
            onClick={togglePlay}
            className={`px-5 py-2 rounded-xl font-medium shadow-lg flex items-center space-x-2 transition-colors ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Play Auto</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-6 z-20">
        <button
          onClick={handlePrevious}
          disabled={currentSlideIdx === 0}
          className={`p-3 rounded-xl shadow-lg transition-colors ${
            currentSlideIdx === 0
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex items-center space-x-2">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(idx)}
              className={`w-3 h-3 rounded-full transition-colors ${
                idx === currentSlideIdx
                  ? 'bg-blue-600'
                  : idx < currentSlideIdx
                  ? 'bg-blue-300'
                  : 'bg-slate-300'
              }`}
              title={`Slide ${slide.id}: ${slide.title}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentSlideIdx === slides.length - 1}
          className={`p-3 rounded-xl shadow-lg transition-colors ${
            currentSlideIdx === slides.length - 1
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Demo Launch Button */}
      {currentSlideIdx === slides.length - 1 && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
          <button
            onClick={handleStartDemo}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl shadow-2xl font-bold text-lg flex items-center space-x-3 hover:scale-105 transition-transform"
          >
            <span>START INTERACTIVE DEMO</span>
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Bottom Status Bar */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs text-slate-500 z-10">
        <div>
          Use <kbd className="px-2 py-1 bg-slate-100 rounded">←</kbd> <kbd className="px-2 py-1 bg-slate-100 rounded">→</kbd> arrows or <kbd className="px-2 py-1 bg-slate-100 rounded">Space</kbd> to navigate
        </div>
        <div className="text-right">
          Smart Classroom Automation — Academic Presentation
        </div>
      </div>
    </div>
  );
};