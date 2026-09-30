import React from 'react';
import { 
  Cpu, 
  Thermometer, 
  Sun, 
  Radio, 
  Zap, 
  Wind, 
  Wifi, 
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  Award,
  Sparkles
} from 'lucide-react';

export interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  content: React.ReactNode;
}

export const ACADEMIC_SLIDES: SlideData[] = [
  // ==========================================
  // SLIDE 1 — TITLE
  // ==========================================
  {
    id: 1,
    title: 'Smart Classroom Automation System Using STM32',
    subtitle: '"Smarter Classroom, Better Comfort, Efficient Energy Use"',
    category: 'PROJECT PROPOSAL',
    content: (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wide uppercase">
            <Cpu className="w-4 h-4 text-blue-600" />
            <span>Embedded Systems & IoT Engineering Project</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Smart Classroom Automation System <br />
            <span className="text-blue-600">Using STM32</span>
          </h1>

          <p className="text-lg text-slate-600 font-medium italic border-l-4 border-blue-600 pl-4 py-1">
            "Smarter Classroom, Better Comfort, Efficient Energy Use"
          </p>

          <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
            A proposed closed-loop embedded automation architecture that integrates multi-sensor environmental acquisition with ARM Cortex-M processing to autonomously govern lighting, thermal comfort, and energy preservation in institutional learning spaces.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/80">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Core MCU</span>
              <span className="text-sm font-bold text-slate-800">STM32 (ARM Cortex)</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">IoT Gateway</span>
              <span className="text-sm font-bold text-slate-800">ESP32 Wi-Fi</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Target Output</span>
              <span className="text-sm font-bold text-slate-800">Relay & PWM Cooling</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200 aspect-video group">
            <img 
              src="/images/classroom_hero.jpg" 
              alt="Smart Classroom Concept" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
              <span className="text-white text-xs font-semibold tracking-wide">University Lecture Hall Target Deployment</span>
            </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-3">
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm aspect-video">
              <img src="/images/stm32_board.jpg" alt="STM32 Development Board" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm aspect-video">
              <img src="/images/sensors_kit.jpg" alt="Sensors Kit" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    ),
  },

  // ==========================================
  // SLIDE 2 — INTRODUCTION
  // ==========================================
  {
    id: 2,
    title: 'Introduction & Context',
    subtitle: 'The Need for Intelligent Energy Management in Academic Spaces',
    category: 'PROJECT BACKGROUND',
    content: (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
        <div className="lg:col-span-7 space-y-5">
          <p className="text-base text-slate-700 leading-relaxed">
            Academic classrooms and university lecture halls present dynamic physical environments characterized by erratic student schedules, shifting thermal loads, and variable outdoor daylight availability throughout the academic day.
          </p>

          <div className="space-y-3.5">
            <div className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-sm">
                01
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Heavy Energy Footprint</h4>
                <p className="text-xs text-slate-600 mt-0.5">High-bay fluorescent/LED lighting troffers and quad ceiling fan arrays run continuously regardless of whether rooms are populated.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold text-sm">
                02
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Static Manual Control Dependence</h4>
                <p className="text-xs text-slate-600 mt-0.5">Human occupants frequently forget to switch off electrical loads upon dismissal, resulting in zero-occupancy overnight electrical waste.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-sm">
                03
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Dynamic Environmental Fluctuation</h4>
                <p className="text-xs text-slate-600 mt-0.5">Solar daylight streaming through perimeter windows often renders artificial lighting redundant during midday periods.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
            <img src="/images/classroom_hero.jpg" alt="Classroom Environment" className="w-full h-64 object-cover" />
          </div>
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
            <span className="font-bold flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Core Hypothesis:</span>
            </span>
            <p className="text-blue-800 leading-relaxed">
              Automated embedded closed-loop regulation achieves up to <strong>30–45% electrical energy savings</strong> while simultaneously improving student learning comfort.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  // ==========================================
  // SLIDE 3 — PROBLEM STATEMENT
  // ==========================================
  {
    id: 3,
    title: 'Problem Statement',
    subtitle: 'Quantifying Inefficiencies in Conventional Institutional Infrastructure',
    category: 'CHALLENGES IDENTIFIED',
    content: (
      <div className="space-y-6">
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Traditional classroom infrastructure relies exclusively on manual human operation, leading to systematic power loss and suboptimal learning environments across campuses:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-red-50/60 border border-red-200 rounded-2xl p-5 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <Sun className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Daylight Ignorance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Artificial lights burn at 100% full capacity even when outdoor sunlight provides over 600 lux across student desktops through exterior windows.
            </p>
          </div>

          <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-5 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Zero-Occupancy Waste</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ceiling fans and lights continue spinning and glowing during empty periods, between lecture slots, and after evening university closures.
            </p>
          </div>

          <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-5 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Wind className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Fixed-Speed Discomfort</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fans operate on primitive binary or manual rotary step switches that do not adapt dynamically to fluctuating thermal heat loads or humidity spikes.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center">
              <Radio className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Absence of Telemetry</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Campus facility administrators possess no real-time telemetry regarding room thermal compliance, student presence, or device operational status.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2.5 lg:col-span-2">
            <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Cumulative Institutional Utility Cost</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Across large campuses with 50+ lecture halls, manual negligence translates to thousands of kilowatt-hours wasted annually, straining institution budgets and carbon sustainability goals.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  // ==========================================
  // SLIDE 4 — OBJECTIVES
  // ==========================================
  {
    id: 4,
    title: 'Project Objectives',
    subtitle: 'Clear, Measurable Engineering Deliverables of the Proposed System',
    category: 'GOALS & SPECIFICATIONS',
    content: (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full items-center">
        <div className="space-y-3">
          {[
            { num: '01', title: 'Environmental Sensory Acquisition', desc: 'Accurately sample ambient temperature, relative humidity, and daylight illuminance via digital & analog interfaces.' },
            { num: '02', title: 'Passive Human Occupancy Detection', desc: 'Detect human entrance, movement, and physical occupancy vectors without invasive biometric tracking.' },
            { num: '03', title: 'Dual-Condition Smart Lighting', desc: 'Automate high-voltage lighting circuits via solid-state relays only when both occupancy and daylight deficit occur.' },
            { num: '04', title: 'Proportional PWM Thermal Cooling', desc: 'Dynamically modulate DC fan velocity across distinct thermal brackets (30%, 60%, 100%) based on ambient heat load.' },
          ].map((item) => (
            <div key={item.num} className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start space-x-3.5">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 font-bold font-mono text-xs flex items-center justify-center border border-blue-200 shrink-0">
                {item.num}
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {[
            { num: '05', title: 'Zero-Waste Inactivity Latch', desc: 'Automatically de-energize all lighting and cooling circuits after confirmed absence to eliminate overnight parasitic power draw.' },
            { num: '06', title: 'Wireless Telemetry & IoT Gateway', desc: 'Interface STM32 with ESP32 over UART to transmit continuous telemetry packets over Wi-Fi.' },
            { num: '07', title: 'Remote Operator Override Capability', desc: 'Enable facility managers to view live environmental trends and manually force actuators when specialized events require it.' },
          ].map((item) => (
            <div key={item.num} className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start space-x-3.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 font-bold font-mono text-xs flex items-center justify-center border border-emerald-200 shrink-0">
                {item.num}
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // ==========================================
  // SLIDE 5 — PROPOSED SYSTEM
  // ==========================================
  {
    id: 5,
    title: 'Proposed System Overview',
    subtitle: 'High-Level Input-Process-Output Automation Topology',
    category: 'SYSTEM TOPOLOGY',
    content: (
      <div className="space-y-6">
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          The proposed embedded system partitions functionality between dedicated high-reliability deterministic sensing/actuation (STM32) and asynchronous cloud/network telemetry (ESP32):
        </p>

        {/* Visual Signal Flow Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Inputs Column */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Sensory Inputs</span>
              <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-700 font-semibold rounded-full">Stage 1</span>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center space-x-3">
                <Thermometer className="w-5 h-5 text-orange-500" />
                <div>
                  <div className="text-xs font-bold text-slate-900">DHT22 Sensor</div>
                  <div className="text-[11px] text-slate-500">Temp & Relative Humidity (Single-Bus)</div>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center space-x-3">
                <Sun className="w-5 h-5 text-amber-500" />
                <div>
                  <div className="text-xs font-bold text-slate-900">LDR Photoresistor</div>
                  <div className="text-[11px] text-slate-500">Daylight Lux (Analog ADC Channel)</div>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center space-x-3">
                <Radio className="w-5 h-5 text-emerald-500" />
                <div>
                  <div className="text-xs font-bold text-slate-900">PIR Motion Sensor</div>
                  <div className="text-[11px] text-slate-500">Occupancy Detection (Digital GPIO Interrupt)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Central Controller */}
          <div className="bg-blue-50/70 border-2 border-blue-500 rounded-2xl p-5 space-y-4 text-center relative shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white mx-auto flex items-center justify-center shadow-md">
              <Cpu className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest block">Main Microcontroller</span>
              <h3 className="text-lg font-extrabold text-slate-900">STM32 (ARM Cortex-M)</h3>
            </div>

            <div className="text-xs text-slate-600 space-y-1.5 text-left bg-white p-3.5 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Deterministic Hardware Timer PWM</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Multi-Variable Automation Evaluator</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Inactivity Countdown State Machine</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>USART Packet Serialization</span>
              </div>
            </div>
          </div>

          {/* Outputs Column */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Actuators & Gateway</span>
              <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-700 font-semibold rounded-full">Stage 3</span>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center space-x-3">
                <Zap className="w-5 h-5 text-amber-500" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Relay Module → Lights</div>
                  <div className="text-[11px] text-slate-500">AC/DC High-Voltage Troffer Switching</div>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center space-x-3">
                <Wind className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="text-xs font-bold text-slate-900">MOSFET Driver → DC Fan</div>
                  <div className="text-[11px] text-slate-500">High-Frequency PWM Speed Regulation</div>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center space-x-3">
                <Wifi className="w-5 h-5 text-purple-500" />
                <div>
                  <div className="text-xs font-bold text-slate-900">ESP32 → Web Interface</div>
                  <div className="text-[11px] text-slate-500">Wi-Fi TCP/HTTP Telemetry Uplink</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  // ==========================================
  // SLIDE 6 — SYSTEM ARCHITECTURE
  // ==========================================
  {
    id: 6,
    title: 'Detailed System Architecture',
    subtitle: 'Pin-Level Interfacing and Signal Protocol Topology',
    category: 'HARDWARE INTERFACING',
    content: (
      <div className="space-y-5">
        <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
          Schematic signal wiring between sensory transducers, the STM32 Cortex-M core, actuator drivers, and the auxiliary ESP32 network processor:
        </p>

        {/* Technical Architecture Schematic Block Diagram */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800">
          <div className="grid grid-cols-12 gap-4 items-center">
            {/* Input Sensors (Left 3 cols) */}
            <div className="col-span-3 space-y-3">
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-center">
                <span className="text-[10px] text-slate-400 font-mono block">SENSOR 1</span>
                <span className="text-xs font-bold text-orange-400">DHT22</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">GPIO (Single-Wire Data)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-center">
                <span className="text-[10px] text-slate-400 font-mono block">SENSOR 2</span>
                <span className="text-xs font-bold text-amber-400">LDR Module</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">ADC Channel (0–3.3V)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-center">
                <span className="text-[10px] text-slate-400 font-mono block">SENSOR 3</span>
                <span className="text-xs font-bold text-emerald-400">PIR Motion</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">EXTI Interrupt Pin</span>
              </div>
            </div>

            {/* Input Buses to STM32 (1 col) */}
            <div className="col-span-1 flex flex-col justify-around h-full py-4 text-slate-500 text-center">
              <span className="text-xs font-mono">───►</span>
              <span className="text-xs font-mono">───►</span>
              <span className="text-xs font-mono">───►</span>
            </div>

            {/* Central STM32 MCU (4 cols) */}
            <div className="col-span-4 bg-blue-950 border-2 border-blue-500 rounded-xl p-4 text-center space-y-2 shadow-inner">
              <div className="inline-block px-2.5 py-0.5 rounded bg-blue-900 text-blue-300 font-mono text-[10px] font-bold">
                MAIN CORE
              </div>
              <h3 className="text-base font-extrabold text-white">STM32 Microcontroller</h3>
              <p className="text-[11px] text-blue-200">ARM Cortex-M Architecture</p>
              
              <div className="pt-2 border-t border-blue-800/80 grid grid-cols-2 gap-1.5 text-[10px] font-mono text-left text-slate-300">
                <div>• ADC1_IN0 (LDR)</div>
                <div>• TIM2_CH1 (PWM)</div>
                <div>• GPIO_EXTI (PIR)</div>
                <div>• USART2 (ESP32)</div>
              </div>
            </div>

            {/* Output Buses from STM32 (1 col) */}
            <div className="col-span-1 flex flex-col justify-around h-full py-4 text-slate-500 text-center">
              <span className="text-xs font-mono">───►</span>
              <span className="text-xs font-mono">───►</span>
              <span className="text-xs font-mono">───►</span>
            </div>

            {/* Output Actuators (Right 3 cols) */}
            <div className="col-span-3 space-y-3">
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-center">
                <span className="text-[10px] text-slate-400 font-mono block">ACTUATION 1</span>
                <span className="text-xs font-bold text-amber-300">Opto-Isolated Relay</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">→ Classroom Lights</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-center">
                <span className="text-[10px] text-slate-400 font-mono block">ACTUATION 2</span>
                <span className="text-xs font-bold text-cyan-300">Power MOSFET (PWM)</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">→ Variable DC Fan</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-center">
                <span className="text-[10px] text-slate-400 font-mono block">COMMUNICATION</span>
                <span className="text-xs font-bold text-purple-300">ESP32 (UART)</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">→ Wi-Fi Web/Mobile</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  // ==========================================
  // SLIDE 7 — HARDWARE COMPONENTS
  // ==========================================
  {
    id: 7,
    title: 'Hardware Components Breakdown',
    subtitle: 'Technical Selection and Operational Roles',
    category: 'BILL OF MATERIALS',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-full items-stretch">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">STM32 Microcontroller</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              32-bit ARM Cortex-M processor delivering deterministic timer interrupts for multi-channel PWM, hardware 12-bit ADC sampling, and hardware UART serialization.
            </p>
          </div>
          <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-1 rounded block">Role: Master Automation Core</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
              <Thermometer className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">DHT22 (AM2302)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Capacitive humidity sensor & thermistor. Temperature range: -40 to 80°C (±0.5°C accuracy); Humidity: 0–100% RH (±2% accuracy).
            </p>
          </div>
          <span className="text-[10px] font-mono text-orange-700 bg-orange-50 px-2 py-1 rounded block">Role: Climate Monitoring</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Sun className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">LDR Module</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Cadmium-sulfide photoresistor with voltage divider and LM393 comparator providing continuous analog light lux voltage directly to STM32 ADC.
            </p>
          </div>
          <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-1 rounded block">Role: Lux Harvesting</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Radio className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">PIR Motion Sensor</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pyroelectric sensor with faceted Fresnel lens (HC-SR501) detecting infrared radiation shifts caused by human occupant motion vectors.
            </p>
          </div>
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-1 rounded block">Role: Occupancy Latch</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Optocoupled Relay</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Electromechanical relay with optocoupler galvanic isolation, allowing 3.3V logic signals to safely switch 230V AC classroom lighting troffers.
            </p>
          </div>
          <span className="text-[10px] font-mono text-red-700 bg-red-50 px-2 py-1 rounded block">Role: High-Voltage Light Control</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
              <Wind className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">MOSFET Motor Driver</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Logic-level N-channel power MOSFET (e.g. IRLZ44N) driven by high-frequency STM32 PWM signals to smoothly regulate DC ceiling fan motor speed.
            </p>
          </div>
          <span className="text-[10px] font-mono text-cyan-700 bg-cyan-50 px-2 py-1 rounded block">Role: PWM Fan Speed Regulation</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs flex flex-col justify-between lg:col-span-2">
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Wifi className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">ESP32 Wi-Fi & Bluetooth SoC</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dual-core 240MHz wireless microcontroller acting as a dedicated communications bridge: buffers UART packets from STM32 and publishes telemetry to campus IoT gateways.
            </p>
          </div>
          <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-1 rounded block">Role: Wireless Telemetry Gateway</span>
        </div>
      </div>
    ),
  },

  // ==========================================
  // SLIDE 8 — WORKING PRINCIPLE
  // ==========================================
  {
    id: 8,
    title: 'Working Principle & Closed-Loop Cycle',
    subtitle: 'Autonomous Sense-Process-Actuate Cycle',
    category: 'SYSTEM OPERATION',
    content: (
      <div className="space-y-5">
        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
          The embedded control software executes a continuous deterministic loop structured across four core operational phases:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs font-mono">
              01
            </div>
            <h4 className="text-sm font-bold text-slate-900">Sensory Polling</h4>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
              <li>DHT22 queried every 2 seconds via single-wire bus.</li>
              <li>LDR analog output sampled via 12-bit ADC.</li>
              <li>PIR pin state latched via external GPIO interrupt.</li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs font-mono">
              02
            </div>
            <h4 className="text-sm font-bold text-slate-900">Threshold Logic</h4>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
              <li>Compare LDR value to daylight threshold (&lt; 40%).</li>
              <li>Compare temperature to thermal comfort brackets.</li>
              <li>Check occupancy status against timeout register.</li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs font-mono">
              03
            </div>
            <h4 className="text-sm font-bold text-slate-900">Actuator Dispatch</h4>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
              <li>Trigger GPIO high/low to energize/open relay coil.</li>
              <li>Adjust PWM duty cycle register (TIM2-&gt;CCR1).</li>
              <li>De-energize all loads if inactivity timer expires.</li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs font-mono">
              04
            </div>
            <h4 className="text-sm font-bold text-slate-900">Uplink Telemetry</h4>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
              <li>Assemble structured binary/JSON telemetry frame.</li>
              <li>Transmit packet over UART to ESP32 coprocessor.</li>
              <li>Publish data to cloud/web monitoring dashboard.</li>
            </ul>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
          <span><strong>Cycle Latency:</strong> Sub-50 millisecond decision processing loop guarantees immediate human-perceptible response.</span>
          <span className="font-mono text-[11px] text-blue-700 font-semibold">Continuous Real-Time Loop</span>
        </div>
      </div>
    ),
  },

  // ==========================================
  // SLIDE 9 — AUTOMATIC LIGHTING CONTROL
  // ==========================================
  {
    id: 9,
    title: 'Automatic Lighting Control Logic',
    subtitle: 'Dual-Condition Occupancy & Daylight Harvesting Algorithm',
    category: 'LIGHTING AUTOMATION',
    content: (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
        <div className="lg:col-span-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Lighting activation is strictly gated by a Boolean conjunction (AND) condition to maximize energy conservation:
          </p>

          <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-500 font-mono text-xs text-blue-950 space-y-2">
            <span className="text-[10px] uppercase font-bold text-blue-700 block tracking-wider">// Embedded Decision Rule</span>
            <div className="font-bold text-sm">
              IF (Occupancy == TRUE && AmbientLight &lt; 40%) <br />
              &nbsp;&nbsp;→ RELAY_STATE = ON;<br />
              ELSE <br />
              &nbsp;&nbsp;→ RELAY_STATE = OFF;
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
              <div>
                <strong className="text-slate-900 block">Scenario A: Occupied + Dark</strong>
                <span className="text-slate-500">Students inside, cloudy day or evening</span>
              </div>
              <span className="px-2.5 py-1 bg-amber-500 text-slate-950 font-bold rounded-lg text-[11px]">LIGHTS ON</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
              <div>
                <strong className="text-slate-900 block">Scenario B: Occupied + Ample Daylight</strong>
                <span className="text-slate-500">Students inside, bright window sunlight &gt; 40%</span>
              </div>
              <span className="px-2.5 py-1 bg-slate-200 text-slate-700 font-bold rounded-lg text-[11px]">LIGHTS OFF</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
              <div>
                <strong className="text-slate-900 block">Scenario C: Vacant Classroom</strong>
                <span className="text-slate-500">PIR inactive, zero human occupants</span>
              </div>
              <span className="px-2.5 py-1 bg-slate-200 text-slate-700 font-bold rounded-lg text-[11px]">LIGHTS OFF</span>
            </div>
          </div>
        </div>

        {/* Visual Logic Flowchart */}
        <div className="lg:col-span-6 bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 space-y-4 text-center">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Decision Flowchart</span>
          
          <div className="space-y-3 max-w-xs mx-auto text-xs">
            <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 font-bold">
              Check PIR Motion State
            </div>
            <div className="text-slate-500 font-mono text-xs">↓ [Motion Confirmed?]</div>
            <div className="p-2.5 rounded-lg bg-blue-900/60 border border-blue-700 font-bold text-blue-200">
              Is Ambient Light &lt; 40%?
            </div>
            <div className="text-slate-500 font-mono text-xs">↓ [Yes / No]</div>
            
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="p-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-[11px]">
                YES: Relay CLOSED (Lights ON)
              </div>
              <div className="p-2 rounded-lg bg-slate-800 text-slate-400 font-bold text-[11px]">
                NO: Relay OPEN (Lights OFF)
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  // ==========================================
  // SLIDE 10 — AUTOMATIC FAN CONTROL
  // ==========================================
  {
    id: 10,
    title: 'Automatic Fan & Thermal Regulation',
    subtitle: 'Multi-Stage Temperature-to-PWM Modulation Logic',
    category: 'FAN SPEED CONTROL',
    content: (
      <div className="space-y-6">
        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
          Rather than crude binary ON/OFF switching, the STM32 timer peripheral generates variable Pulse Width Modulation (PWM) to step ceiling fan airflow in proportion to sampled DHT22 room temperature:
        </p>

        {/* Temperature Brackets Table */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-center">
            <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">Bracket 1</span>
            <div className="text-lg font-extrabold text-slate-800">&lt; 25.0°C</div>
            <div className="text-xs text-slate-500">Cool / Comfort Baseline</div>
            <div className="pt-2 border-t border-slate-200">
              <span className="px-3 py-1 bg-slate-200 text-slate-700 font-mono font-bold text-xs rounded-full">
                0% PWM (OFF)
              </span>
            </div>
          </div>

          <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-4 space-y-2 text-center">
            <span className="text-[10px] font-mono font-bold text-blue-500 block uppercase">Bracket 2</span>
            <div className="text-lg font-extrabold text-blue-900">25.0°C – 29.9°C</div>
            <div className="text-xs text-blue-700">Warm Mild Circulation</div>
            <div className="pt-2 border-t border-blue-200">
              <span className="px-3 py-1 bg-blue-600 text-white font-mono font-bold text-xs rounded-full shadow-xs">
                30% PWM (Low)
              </span>
            </div>
          </div>

          <div className="bg-cyan-50/60 border border-cyan-200 rounded-2xl p-4 space-y-2 text-center">
            <span className="text-[10px] font-mono font-bold text-cyan-600 block uppercase">Bracket 3</span>
            <div className="text-lg font-extrabold text-cyan-900">30.0°C – 34.9°C</div>
            <div className="text-xs text-cyan-700">Moderate Thermal Load</div>
            <div className="pt-2 border-t border-cyan-200">
              <span className="px-3 py-1 bg-cyan-600 text-white font-mono font-bold text-xs rounded-full shadow-xs">
                60% PWM (Med)
              </span>
            </div>
          </div>

          <div className="bg-red-50/60 border border-red-200 rounded-2xl p-4 space-y-2 text-center">
            <span className="text-[10px] font-mono font-bold text-red-500 block uppercase">Bracket 4</span>
            <div className="text-lg font-extrabold text-red-900">≥ 35.0°C</div>
            <div className="text-xs text-red-700">High Heat Emergency</div>
            <div className="pt-2 border-t border-red-200">
              <span className="px-3 py-1 bg-red-600 text-white font-mono font-bold text-xs rounded-full shadow-xs">
                100% PWM (Max)
              </span>
            </div>
          </div>
        </div>

        {/* Technical Implementation details */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-700 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <strong className="text-slate-900 block mb-1">Hardware PWM Generation:</strong>
            <p className="text-slate-600 leading-relaxed">
              Configured via STM32 General Purpose Timer (TIM2), clocked at 10 kHz with an 8-bit duty cycle counter (0–255 steps), yielding silent, smooth motor torque control.
            </p>
          </div>
          <div>
            <strong className="text-slate-900 block mb-1">Vacancy Cut-off:</strong>
            <p className="text-slate-600 leading-relaxed">
              Regardless of high room temperature, if PIR reports zero occupancy for longer than the inactivity timeout, the fan automatically cuts power to 0%.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  // ==========================================
  // SLIDE 11 — FLOWCHART
  // ==========================================
  {
    id: 11,
    title: 'Embedded System Software Flowchart',
    subtitle: 'Deterministic Main Loop Execution Model',
    category: 'ALGORITHM FLOW',
    content: (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center h-full">
        <div className="lg:col-span-7 bg-slate-900 text-white rounded-2xl p-5 shadow-xl border border-slate-800">
          <div className="flex flex-col items-center space-y-2.5 max-w-sm mx-auto text-xs font-mono">
            <div className="px-6 py-1.5 rounded-full bg-blue-600 text-white font-bold shadow-md">
              [START / POWER ON]
            </div>
            <span className="text-slate-500">↓</span>

            <div className="px-4 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200">
              Init Clocks, GPIO, ADC, TIM2 PWM, UART
            </div>
            <span className="text-slate-500">↓</span>

            <div className="px-4 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200">
              Sample Sensors (DHT22, LDR ADC, PIR State)
            </div>
            <span className="text-slate-500">↓</span>

            <div className="px-4 py-1.5 rounded-lg bg-blue-950 border border-blue-600 text-blue-200 font-bold">
              &lt; Is Classroom Occupied? &gt;
            </div>
            <span className="text-slate-500">↓ (YES)</span>

            <div className="grid grid-cols-2 gap-2 w-full text-center">
              <div className="p-2 rounded bg-slate-800 border border-slate-700 text-[11px]">
                Eval Lux: If &lt;40% → Light ON
              </div>
              <div className="p-2 rounded bg-slate-800 border border-slate-700 text-[11px]">
                Eval Temp → Compute Fan PWM
              </div>
            </div>
            <span className="text-slate-500">↓</span>

            <div className="px-4 py-1.5 rounded-lg bg-purple-900/60 border border-purple-500 text-purple-200">
              Transmit Telemetry to ESP32 over UART
            </div>
            <span className="text-slate-500">↓</span>

            <div className="px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-[11px]">
              Loop Delay (2000 ms) → Repeat Cycle
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-base font-bold text-slate-900">Deterministic Embedded Control</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            The flowchart illustrates the absence of blocking delays. By leveraging hardware interrupts for PIR motion and non-blocking timer counters, the system maintains high responsiveness while polling sensors at disciplined intervals.
          </p>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <span className="font-bold text-slate-800 block">Fail-Safe Considerations:</span>
            <ul className="text-slate-600 space-y-1 list-disc list-inside">
              <li>Sensor read timeout returns safe default state.</li>
              <li>Brownout reset (BOR) hardware protection on STM32.</li>
              <li>Relay default unpowered state is normally open (OFF).</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },

  // ==========================================
  // SLIDE 12 — SOFTWARE & COMMUNICATION
  // ==========================================
  {
    id: 12,
    title: 'Software Stack & IoT Communication',
    subtitle: 'STM32 Embedded Firmware & ESP32 Network Bridge',
    category: 'COMMUNICATION PROTOCOL',
    content: (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full items-center">
        {/* STM32 Firmware */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Cpu className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">STM32 Embedded Firmware</h3>
              <span className="text-[11px] text-slate-400">Bare-Metal C / STM32CubeIDE / HAL</span>
            </div>
          </div>

          <ul className="text-xs text-slate-600 space-y-2">
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>Hardware Abstraction Layer (HAL):</strong> Clean register abstractions for GPIO, ADC1, TIM2, and USART2.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>Interrupt Service Routines (ISR):</strong> EXTI pin trigger for immediate PIR motion event capture.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>Structured Packet Format:</strong> Serializes telemetry frames: <code className="font-mono text-[10px] bg-slate-100 px-1 py-0.5 rounded">#TEMP:28.5,HUM:55,LUX:32,PIR:1,FAN:60,LIGHT:1$</code></span>
            </li>
          </ul>
        </div>

        {/* ESP32 Gateway */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Wifi className="w-5 h-5 text-purple-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">ESP32 Wireless Gateway</h3>
              <span className="text-[11px] text-slate-400">Wi-Fi 802.11 b/g/n / FreeRTOS</span>
            </div>
          </div>

          <ul className="text-xs text-slate-600 space-y-2">
            <li className="flex items-start space-x-2">
              <span className="text-purple-600 font-bold">•</span>
              <span><strong>Hardware UART Buffer:</strong> Reads STM32 packet stream via UART RX/TX without loading the main control core.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-purple-600 font-bold">•</span>
              <span><strong>Wi-Fi Network Stack:</strong> Establishes connection to campus Wi-Fi access points using WPA2-Enterprise or WPA2-PSK.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-purple-600 font-bold">•</span>
              <span><strong>Web / Mobile Client Serving:</strong> Hosts asynchronous WebSocket or HTTP REST endpoints for remote telemetry viewing and manual overrides.</span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },

  // ==========================================
  // SLIDE 13 — EXPECTED OUTPUT
  // ==========================================
  {
    id: 13,
    title: 'Expected Operation & Test Scenarios',
    subtitle: 'System Response Under Realistic Field Conditions',
    category: 'SIMULATION & VALIDATION',
    content: (
      <div className="space-y-4">
        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
          The proposed system behavior has been modeled across five primary benchmark scenarios to validate closed-loop correctness:
        </p>

        <div className="space-y-2.5">
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-blue-600 uppercase">Scenario 01</span>
              <h4 className="text-xs font-bold text-slate-900">Classroom Vacant at Morning (7:00 AM)</h4>
              <p className="text-[11px] text-slate-500">PIR reports 0 occupancy, external lux 20%, room temp 22°C.</p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              Lights: OFF | Fan: 0% (Idle Baseline)
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-emerald-600 uppercase">Scenario 02</span>
              <h4 className="text-xs font-bold text-slate-900">Students Enter on Rainy Morning (8:00 AM)</h4>
              <p className="text-[11px] text-slate-500">PIR triggers active, external lux drops to 15% (insufficient daylight).</p>
            </div>
            <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
              Lights: ON (Auto Relay) | Fan: 0%
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-amber-600 uppercase">Scenario 03</span>
              <h4 className="text-xs font-bold text-slate-900">Sunny Afternoon Lecture (1:00 PM)</h4>
              <p className="text-[11px] text-slate-500">Classroom fully occupied, outdoor solar lux surges to 85%, room temp hits 32°C.</p>
            </div>
            <span className="text-xs font-mono font-bold text-cyan-700 bg-cyan-50 px-3 py-1.5 rounded-lg border border-cyan-200">
              Lights: OFF (Daylight harvest) | Fan: 60% PWM
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-red-600 uppercase">Scenario 04</span>
              <h4 className="text-xs font-bold text-slate-900">Summer Heat Wave Peak (3:00 PM)</h4>
              <p className="text-[11px] text-slate-500">Classroom occupied, thermal load surges to 37.5°C.</p>
            </div>
            <span className="text-xs font-mono font-bold text-red-700 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200">
              Lights: Evaluated | Fan: 100% PWM Max Airflow
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-purple-600 uppercase">Scenario 05</span>
              <h4 className="text-xs font-bold text-slate-900">Class Dismissal / Evening Exit (5:00 PM)</h4>
              <p className="text-[11px] text-slate-500">Students exit through doorway; PIR latches clear; inactivity countdown expires.</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              Zero Waste Shutdown: All Actuators OFF
            </span>
          </div>
        </div>
      </div>
    ),
  },

  // ==========================================
  // SLIDE 14 — ADVANTAGES & FUTURE SCOPE
  // ==========================================
  {
    id: 14,
    title: 'Advantages & Future Expansion',
    subtitle: 'Quantifiable Engineering Benefits and Next-Phase Roadmap',
    category: 'EVALUATION & ROADMAP',
    content: (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full items-start">
        {/* Advantages */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
            <Award className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">Core Advantages</h3>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
              <h4 className="text-xs font-bold text-slate-900">Up to 40% Energy Reduction</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">Eliminates human error, parasitic overnight loads, and unnecessary midday artificial lighting.</p>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
              <h4 className="text-xs font-bold text-slate-900">Autonomous Student Comfort</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">Continuous proportional cooling prevents classroom thermal fatigue during intense lectures.</p>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
              <h4 className="text-xs font-bold text-slate-900">Decoupled Dual-Processor Architecture</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">STM32 ensures rock-solid deterministic safety even if Wi-Fi or cloud networks disconnect.</p>
            </div>
          </div>
        </div>

        {/* Future Scope */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">Future Scope</h3>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
              <h4 className="text-xs font-bold text-slate-900">Campus-Wide Mesh Deployment</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">ESP-NOW / LoRaWAN mesh networking across hundreds of university lecture halls and labs.</p>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
              <h4 className="text-xs font-bold text-slate-900">Machine Learning Predictive Pre-Cooling</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">Integrate timetable schedules to automatically pre-condition rooms 5 minutes before scheduled classes.</p>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
              <h4 className="text-xs font-bold text-slate-900">Hardware Current Shunt Monitoring</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">Integrate INA219 current sensors to log exact real-time kilowatt-hour power consumption curves.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  // ==========================================
  // SLIDE 15 — CONCLUSION
  // ==========================================
  {
    id: 15,
    title: 'Conclusion',
    subtitle: 'Project Summary & Engineering Value Proposition',
    category: 'FINAL SUMMARY',
    content: (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
        <div className="lg:col-span-8 space-y-6">
          <p className="text-base text-slate-700 leading-relaxed">
            The proposed <strong>Smart Classroom Automation System Using STM32</strong> delivers an integrated, cost-effective, and highly reliable embedded solution to combat energy waste in institutional academic facilities.
          </p>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Key Takeaways:</span>
            </div>
            <ul className="text-xs text-slate-600 space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span><strong>Multi-Sensory Closed-Loop Control:</strong> Combines ambient lux (LDR), passive motion (PIR), and digital temperature/humidity (DHT22) for accurate decisions.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span><strong>Energy & Comfort Balance:</strong> Eliminates daylight redundancy and empty classroom waste while maintaining adaptive proportional ventilation.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span><strong>Dual-Layer IoT Scalability:</strong> Robust STM32 hardware controller paired with ESP32 Wi-Fi gateway for centralized facility oversight.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center">
            <p className="text-base font-extrabold text-blue-900 tracking-tight italic">
              "Smarter Classroom, Better Comfort, Efficient Energy Use"
            </p>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-3">
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md aspect-square w-full">
            <img src="/images/stm32_board.jpg" alt="STM32 Project Platform" className="w-full h-full object-cover" />
          </div>
          <span className="text-[11px] font-mono text-slate-400">STM32 Embedded Platform Architecture</span>
        </div>
      </div>
    ),
  },

  // ==========================================
  // SLIDE 16 — THANK YOU / QUESTIONS
  // ==========================================
  {
    id: 16,
    title: 'Thank You',
    subtitle: 'Open for Viva Questions, Demonstration & Feedback',
    category: 'VIVA VOCE & Q&A',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-blue-600 text-white flex items-center justify-center shadow-xl shadow-blue-500/20">
          <HelpCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            THANK YOU
          </h2>
          <p className="text-lg text-slate-600 font-medium">
            Questions, Discussions & Evaluator Feedback
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-md text-xs text-slate-600 space-y-2">
          <div className="font-bold text-slate-900">Project: Smart Classroom Automation System Using STM32</div>
          <div className="text-slate-500">Department of Electronics & Communication / Embedded Engineering</div>
          <div className="pt-2 border-t border-slate-200 text-[11px] text-blue-600 font-semibold">
            Interactive 3D Digital Twin Simulation Available for Live Evaluation Demonstration
          </div>
        </div>
      </div>
    ),
  },
];
