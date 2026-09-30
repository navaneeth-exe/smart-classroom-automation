import os
import sys
from reportlab.lib.pagesizes import landscape
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor

# 16:9 widescreen dimensions in points (13.333 in x 7.5 in)
PAGE_WIDTH = 13.333 * inch
PAGE_HEIGHT = 7.5 * inch

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
IMAGE_CLASSROOM = os.path.join(PROJECT_ROOT, "public", "images", "classroom_hero.jpg")
IMAGE_STM32 = os.path.join(PROJECT_ROOT, "public", "images", "stm32_board.jpg")
IMAGE_SENSORS = os.path.join(PROJECT_ROOT, "public", "images", "sensors_kit.jpg")
IMAGE_ESP32 = os.path.join(PROJECT_ROOT, "public", "images", "esp32_module.jpg")

OUTPUT_DIR = os.path.join(PROJECT_ROOT, "presentation")
os.makedirs(OUTPUT_DIR, exist_ok=True)
PDF_PATH = os.path.join(OUTPUT_DIR, "Smart_Classroom_Automation_System_STM32.pdf")

# Palette
C_BG = HexColor("#F8FAFC")
C_WHITE = HexColor("#FFFFFF")
C_CARD_ALT = HexColor("#F1F5F9")
C_PRIMARY = HexColor("#2563EB")
C_PRIMARY_DARK = HexColor("#1E3A8A")
C_PRIMARY_LIGHT = HexColor("#EFF6FF")
C_TEXT_DARK = HexColor("#0F172A")
C_TEXT_MUTED = HexColor("#64748B")
C_BORDER = HexColor("#E2E8F0")
C_SUCCESS = HexColor("#10B981")
C_DANGER = HexColor("#EF4444")
C_AMBER = HexColor("#D97706")
C_CYAN = HexColor("#06B6D4")
C_DARK_BG = HexColor("#0F172A")

c = canvas.Canvas(PDF_PATH, pagesize=(PAGE_WIDTH, PAGE_HEIGHT))

def draw_header_and_footer(category, title, subtitle):
    # Background
    c.setFillColor(C_BG)
    c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    
    # Category Pill
    c.setFillColor(C_PRIMARY_LIGHT)
    c.setStrokeColor(C_PRIMARY)
    c.setLineWidth(1)
    c.roundRect(0.8 * inch, PAGE_HEIGHT - 0.75 * inch, 2.8 * inch, 0.35 * inch, 6, fill=1, stroke=1)
    
    c.setFillColor(C_PRIMARY)
    c.setFont("Helvetica-Bold", 10)
    c.drawCentredString(0.8 * inch + 1.4 * inch, PAGE_HEIGHT - 0.75 * inch + 0.1 * inch, category.upper())
    
    # Title & Subtitle
    c.setFillColor(C_TEXT_DARK)
    c.setFont("Helvetica-Bold", 22)
    c.drawString(0.8 * inch, PAGE_HEIGHT - 1.25 * inch, title)
    
    if subtitle:
        c.setFillColor(C_TEXT_MUTED)
        c.setFont("Helvetica", 12)
        c.drawString(0.8 * inch, PAGE_HEIGHT - 1.5 * inch, subtitle)
        
    # Footer
    c.setFillColor(C_TEXT_MUTED)
    c.setFont("Helvetica", 9)
    c.drawString(0.8 * inch, 0.4 * inch, "Smart Classroom Automation System Using STM32  |  Academic Engineering Presentation")

def draw_card(x, y, w, h, bg=C_WHITE, stroke=C_BORDER, stroke_w=1.2, r=10):
    c.setFillColor(bg)
    if stroke:
        c.setStrokeColor(stroke)
        c.setLineWidth(stroke_w)
        c.roundRect(x, y, w, h, r, fill=1, stroke=1)
    else:
        c.roundRect(x, y, w, h, r, fill=1, stroke=0)

# ==============================================================================
# SLIDE 1: Title
# ==============================================================================
c.setFillColor(C_BG)
c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)

# Category Pill
c.setFillColor(C_PRIMARY_LIGHT)
c.setStrokeColor(C_PRIMARY)
c.setLineWidth(1)
c.roundRect(0.8 * inch, PAGE_HEIGHT - 1.1 * inch, 4.2 * inch, 0.38 * inch, 6, fill=1, stroke=1)
c.setFillColor(C_PRIMARY)
c.setFont("Helvetica-Bold", 11)
c.drawCentredString(0.8 * inch + 2.1 * inch, PAGE_HEIGHT - 1.1 * inch + 0.11 * inch, "EMBEDDED SYSTEMS & IOT ENGINEERING PROJECT")

# Title
c.setFillColor(C_TEXT_DARK)
c.setFont("Helvetica-Bold", 32)
c.drawString(0.8 * inch, PAGE_HEIGHT - 1.8 * inch, "Smart Classroom Automation System")
c.setFillColor(C_PRIMARY)
c.drawString(0.8 * inch, PAGE_HEIGHT - 2.35 * inch, "Using STM32")

# Tagline box
draw_card(0.8 * inch, PAGE_HEIGHT - 3.2 * inch, 6.5 * inch, 0.65 * inch, bg=C_PRIMARY_LIGHT, stroke=C_PRIMARY)
c.setFillColor(C_PRIMARY_DARK)
c.setFont("Helvetica-BoldOblique", 13)
c.drawCentredString(0.8 * inch + 3.25 * inch, PAGE_HEIGHT - 3.2 * inch + 0.22 * inch, '"Smarter Classroom, Better Comfort, Efficient Energy Use"')

# Description
c.setFillColor(C_TEXT_MUTED)
c.setFont("Helvetica", 11)
desc_lines = [
    "A proposed closed-loop embedded automation architecture that integrates multi-sensor",
    "environmental acquisition with ARM Cortex-M processing to autonomously govern lighting,",
    "thermal comfort, and energy preservation in institutional learning spaces."
]
for i, l in enumerate(desc_lines):
    c.drawString(0.8 * inch, PAGE_HEIGHT - 3.6 * inch - i * 16, l)

# 3 Small Spec Cards
specs = [("CORE MCU", "STM32 (ARM Cortex)"), ("IOT GATEWAY", "ESP32 Wi-Fi"), ("TARGET OUTPUT", "Relay & PWM Cooling")]
for idx, (lbl, val) in enumerate(specs):
    draw_card((0.8 + idx * 2.2) * inch, 0.9 * inch, 2.05 * inch, 0.9 * inch, bg=C_CARD_ALT)
    c.setFillColor(C_TEXT_MUTED)
    c.setFont("Helvetica-Bold", 9)
    c.drawString((0.95 + idx * 2.2) * inch, 1.5 * inch, lbl)
    c.setFillColor(C_TEXT_DARK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString((0.95 + idx * 2.2) * inch, 1.15 * inch, val)

# Images Right
if os.path.exists(IMAGE_CLASSROOM):
    c.drawImage(IMAGE_CLASSROOM, 7.7 * inch, 3.4 * inch, width=4.8 * inch, height=3.3 * inch, preserveAspectRatio=True)
if os.path.exists(IMAGE_STM32):
    c.drawImage(IMAGE_STM32, 7.7 * inch, 0.9 * inch, width=2.35 * inch, height=2.3 * inch, preserveAspectRatio=True)
if os.path.exists(IMAGE_SENSORS):
    c.drawImage(IMAGE_SENSORS, 10.15 * inch, 0.9 * inch, width=2.35 * inch, height=2.3 * inch, preserveAspectRatio=True)

c.showPage()

# ==============================================================================
# SLIDE 2: Introduction & Context
# ==============================================================================
draw_header_and_footer("PROJECT BACKGROUND", "Introduction & Context", "The Need for Intelligent Energy Management in Academic Spaces")

draw_card(0.8 * inch, 1.1 * inch, 6.6 * inch, 4.7 * inch)
c.setFillColor(C_TEXT_DARK)
c.setFont("Helvetica", 11.5)
c.drawString(1.0 * inch, 5.4 * inch, "Academic classrooms and lecture halls present dynamic physical environments characterized by")
c.drawString(1.0 * inch, 5.15 * inch, "erratic schedules, shifting thermal loads, and variable outdoor daylight throughout the day.")

bullets_s2 = [
    ("Heavy Energy Footprint:", "High-bay fluorescent/LED lighting and ceiling fans run continuously regardless of occupancy."),
    ("Static Manual Control Dependence:", "Human occupants frequently forget to switch off loads upon dismissal, causing waste."),
    ("Dynamic Environmental Fluctuation:", "Solar daylight streaming through perimeter windows often renders artificial lighting redundant.")
]
for i, (b_title, b_desc) in enumerate(bullets_s2):
    y_pos = 4.6 * inch - i * 1.1 * inch
    c.setFillColor(C_PRIMARY)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(1.0 * inch, y_pos, "• " + b_title)
    c.setFillColor(C_TEXT_MUTED)
    c.setFont("Helvetica", 10.5)
    c.drawString(1.2 * inch, y_pos - 0.22 * inch, b_desc)

if os.path.exists(IMAGE_CLASSROOM):
    c.drawImage(IMAGE_CLASSROOM, 7.7 * inch, 2.7 * inch, width=4.8 * inch, height=3.1 * inch, preserveAspectRatio=True)

draw_card(7.7 * inch, 1.1 * inch, 4.8 * inch, 1.45 * inch, bg=C_PRIMARY_LIGHT, stroke=C_PRIMARY)
c.setFillColor(C_PRIMARY)
c.setFont("Helvetica-Bold", 11)
c.drawString(7.9 * inch, 2.25 * inch, "CORE HYPOTHESIS")
c.setFillColor(C_PRIMARY_DARK)
c.setFont("Helvetica-Bold", 11.5)
c.drawString(7.9 * inch, 1.9 * inch, "Automated closed-loop regulation achieves up to 30–45% energy")
c.drawString(7.9 * inch, 1.65 * inch, "savings while simultaneously improving student learning comfort.")

c.showPage()

# ==============================================================================
# SLIDE 3: Problem Statement
# ==============================================================================
draw_header_and_footer("CHALLENGES IDENTIFIED", "Problem Statement", "Quantifying Inefficiencies in Conventional Institutional Infrastructure")

problems_data = [
    ("Daylight Ignorance", "Artificial lights burn at 100% capacity even when outdoor sunlight provides over 600 lux across student desktops through exterior windows.", C_DANGER),
    ("Zero-Occupancy Waste", "Ceiling fans and lights continue spinning and glowing during empty periods, between lecture slots, and after evening closures.", C_AMBER),
    ("Fixed-Speed Discomfort", "Fans operate on primitive binary or manual rotary step switches that do not adapt dynamically to fluctuating thermal loads.", C_PRIMARY),
    ("Absence of Telemetry", "Campus facility administrators possess no real-time telemetry regarding room thermal compliance, presence, or status.", C_TEXT_MUTED),
    ("Cumulative Utility Costs", "Across campuses with 50+ lecture halls, manual negligence translates to thousands of kilowatt-hours wasted annually, straining institution budgets.", C_TEXT_DARK),
]

for idx, (p_title, p_desc, col) in enumerate(problems_data):
    w = 3.75 * inch if idx < 3 else 5.75 * inch
    x = (0.8 + (idx % 3) * 3.95) * inch if idx < 3 else (0.8 + (idx - 3) * 5.95) * inch
    y = 3.4 * inch if idx < 3 else 1.1 * inch
    h = 2.2 * inch
    draw_card(x, y, w, h)
    
    c.setFillColor(col)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(x + 0.25 * inch, y + h - 0.45 * inch, p_title)
    
    c.setFillColor(C_TEXT_MUTED)
    c.setFont("Helvetica", 10)
    # Simple word wrapping
    words = p_desc.split(" ")
    lines = []
    curr = []
    for w_str in words:
        curr.append(w_str)
        if len(" ".join(curr)) > (38 if idx < 3 else 65):
            lines.append(" ".join(curr[:-1]))
            curr = [w_str]
    if curr:
        lines.append(" ".join(curr))
    for l_idx, line in enumerate(lines):
        c.drawString(x + 0.25 * inch, y + h - 0.8 * inch - l_idx * 14, line)

c.showPage()

# ==============================================================================
# SLIDE 4: Project Objectives
# ==============================================================================
draw_header_and_footer("GOALS & SPECIFICATIONS", "Project Objectives", "Clear, Measurable Engineering Deliverables of the Proposed System")

col1_objs = [
    ("01", "Environmental Sensory Acquisition", "Accurately sample ambient temperature, humidity, and daylight illuminance via digital & analog interfaces."),
    ("02", "Passive Human Occupancy Detection", "Detect human entrance, movement, and physical occupancy vectors without invasive biometric tracking."),
    ("03", "Dual-Condition Smart Lighting", "Automate high-voltage lighting circuits via solid-state relays only when both occupancy and daylight deficit occur."),
    ("04", "Proportional PWM Thermal Cooling", "Dynamically modulate DC fan velocity across distinct thermal brackets (30%, 60%, 100%) based on ambient heat load.")
]
col2_objs = [
    ("05", "Zero-Waste Inactivity Latch", "Automatically de-energize all lighting and cooling circuits after confirmed absence to eliminate overnight parasitic power draw."),
    ("06", "Wireless Telemetry & IoT Gateway", "Interface STM32 with ESP32 over UART to transmit continuous telemetry packets over Wi-Fi."),
    ("07", "Remote Operator Override Capability", "Enable facility managers to view live environmental trends and manually force actuators when specialized events require it.")
]

for idx, (num, title, desc) in enumerate(col1_objs):
    y = (4.6 - idx * 1.15) * inch
    draw_card(0.8 * inch, y, 5.7 * inch, 1.05 * inch)
    c.setFillColor(C_PRIMARY)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(1.0 * inch, y + 0.75 * inch, f"[{num}] {title}")
    c.setFillColor(C_TEXT_MUTED)
    c.setFont("Helvetica", 9)
    c.drawString(1.0 * inch, y + 0.45 * inch, desc[:85])
    c.drawString(1.0 * inch, y + 0.25 * inch, desc[85:])

for idx, (num, title, desc) in enumerate(col2_objs):
    y = (4.3 - idx * 1.5) * inch
    draw_card(6.8 * inch, y, 5.7 * inch, 1.35 * inch)
    c.setFillColor(C_SUCCESS)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(7.0 * inch, y + 1.05 * inch, f"[{num}] {title}")
    c.setFillColor(C_TEXT_MUTED)
    c.setFont("Helvetica", 9)
    c.drawString(7.0 * inch, y + 0.75 * inch, desc[:85])
    c.drawString(7.0 * inch, y + 0.55 * inch, desc[85:])

c.showPage()

# ==============================================================================
# SLIDE 5: Proposed System Overview
# ==============================================================================
draw_header_and_footer("SYSTEM TOPOLOGY", "Proposed System Overview", "High-Level Input-Process-Output Automation Topology")

# 1. Inputs
draw_card(0.8 * inch, 1.1 * inch, 3.6 * inch, 4.6 * inch)
c.setFillColor(C_PRIMARY)
c.setFont("Helvetica-Bold", 13)
c.drawString(1.0 * inch, 5.3 * inch, "1. SENSORY INPUTS")
sens = [("DHT22 Sensor", "Digital Single-Bus Temp & Humidity"), ("LDR Module", "Analog Lux Illuminance (12-bit ADC)"), ("PIR Motion", "Passive Infrared GPIO EXTI Interrupt")]
for i, (t, d) in enumerate(sens):
    c.setFillColor(C_TEXT_DARK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(1.0 * inch, 4.7 * inch - i * 1.2 * inch, "• " + t)
    c.setFillColor(C_TEXT_MUTED)
    c.setFont("Helvetica", 9.5)
    c.drawString(1.2 * inch, 4.45 * inch - i * 1.2 * inch, d)

# 2. Main MCU
draw_card(4.85 * inch, 1.1 * inch, 3.6 * inch, 4.6 * inch, bg=C_PRIMARY_LIGHT, stroke=C_PRIMARY)
c.setFillColor(C_PRIMARY_DARK)
c.setFont("Helvetica-Bold", 13)
c.drawCentredString(6.65 * inch, 5.3 * inch, "2. MAIN CONTROLLER")
c.drawCentredString(6.65 * inch, 5.05 * inch, "STM32 (ARM Cortex-M)")
mcu_points = [
    "Hardware Timer PWM (TIM2_CH1)",
    "Continuous multi-variable evaluation",
    "Inactivity countdown latch state machine",
    "USART2 packet assembly & serialization",
    "Deterministic sub-50ms execution loop"
]
for i, pt in enumerate(mcu_points):
    c.setFillColor(C_PRIMARY_DARK)
    c.setFont("Helvetica", 10)
    c.drawString(5.1 * inch, 4.4 * inch - i * 0.65 * inch, "✔  " + pt)

# 3. Outputs
draw_card(8.9 * inch, 1.1 * inch, 3.6 * inch, 4.6 * inch)
c.setFillColor(C_SUCCESS)
c.setFont("Helvetica-Bold", 13)
c.drawString(9.1 * inch, 5.3 * inch, "3. ACTUATORS & GATEWAY")
acts = [("Opto Relay", "230V AC Lighting Troffer Control"), ("MOSFET Driver", "PWM Speed Control for DC Fans"), ("ESP32 Gateway", "Wi-Fi TCP/HTTP Uplink to Dashboard")]
for i, (t, d) in enumerate(acts):
    c.setFillColor(C_TEXT_DARK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(9.1 * inch, 4.7 * inch - i * 1.2 * inch, "• " + t)
    c.setFillColor(C_TEXT_MUTED)
    c.setFont("Helvetica", 9.5)
    c.drawString(9.3 * inch, 4.45 * inch - i * 1.2 * inch, d)

c.showPage()

# ==============================================================================
# SLIDE 6: Detailed System Architecture
# ==============================================================================
draw_header_and_footer("HARDWARE INTERFACING", "Detailed System Architecture", "Pin-Level Interfacing and Signal Protocol Topology")

draw_card(0.8 * inch, 1.1 * inch, 11.7 * inch, 4.7 * inch, bg=C_DARK_BG, stroke=HexColor("#1E293B"))
c.setFillColor(HexColor("#60A5FA"))
c.setFont("Helvetica-Bold", 13)
c.drawString(1.1 * inch, 5.4 * inch, "SYSTEM PIN MAPPING & BUS TOPOLOGY SCHEMATIC")

# Left Box
draw_card(1.1 * inch, 1.4 * inch, 3.2 * inch, 3.6 * inch, bg=HexColor("#1E293B"), stroke=HexColor("#334155"))
c.setFillColor(HexColor("#F1F5F9"))
c.setFont("Helvetica-Bold", 11)
c.drawString(1.3 * inch, 4.6 * inch, "SENSORY TRANSDUCERS")
s_pins = [("DHT22:", "GPIO (Single-Wire Data Bus)"), ("LDR Sensor:", "ADC1_IN0 (0–3.3V Analog)"), ("PIR Motion:", "EXTI_Line0 (Interrupt Trigger)")]
for i, (k, v) in enumerate(s_pins):
    c.setFillColor(HexColor("#FB923C"))
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(1.3 * inch, 3.9 * inch - i * 0.9 * inch, k)
    c.setFillColor(HexColor("#CBD5E1"))
    c.setFont("Helvetica", 9.5)
    c.drawString(1.3 * inch, 3.65 * inch - i * 0.9 * inch, v)

# Center Box
draw_card(4.9 * inch, 1.4 * inch, 3.5 * inch, 3.6 * inch, bg=HexColor("#1E3A8A"), stroke=C_PRIMARY)
c.setFillColor(C_WHITE)
c.setFont("Helvetica-Bold", 12)
c.drawCentredString(6.65 * inch, 4.6 * inch, "MASTER MCU CORE: STM32")
c.setFillColor(HexColor("#BFDBFE"))
c.setFont("Helvetica", 10)
c.drawCentredString(6.65 * inch, 4.35 * inch, "ARM Cortex-M Embedded Architecture")
core_pins = [
    "• ADC1_IN0 (Continuous Lux Sampling)",
    "• TIM2_CH1 (Hardware PWM Timer)",
    "• GPIO_EXTI0 (Asynchronous Motion)",
    "• USART2 (ESP32 Serial Uplink)",
    "• Sub-50ms Deterministic Response"
]
for i, cp in enumerate(core_pins):
    c.drawString(5.1 * inch, 3.8 * inch - i * 0.45 * inch, cp)

# Right Box
draw_card(9.0 * inch, 1.4 * inch, 3.2 * inch, 3.6 * inch, bg=HexColor("#1E293B"), stroke=HexColor("#334155"))
c.setFillColor(HexColor("#F1F5F9"))
c.setFont("Helvetica-Bold", 11)
c.drawString(9.2 * inch, 4.6 * inch, "ACTUATORS & GATEWAY")
a_pins = [("Relay Module:", "230V AC Classroom Lighting"), ("MOSFET Driver:", "TIM2 PWM DC Fan Speed"), ("ESP32 Module:", "USART2 -> Wi-Fi Dashboard")]
for i, (k, v) in enumerate(a_pins):
    c.setFillColor(HexColor("#34D399"))
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(9.2 * inch, 3.9 * inch - i * 0.9 * inch, k)
    c.setFillColor(HexColor("#CBD5E1"))
    c.setFont("Helvetica", 9.5)
    c.drawString(9.2 * inch, 3.65 * inch - i * 0.9 * inch, v)

c.showPage()

# ==============================================================================
# SLIDE 7: Hardware Components Breakdown
# ==============================================================================
draw_header_and_footer("BILL OF MATERIALS", "Hardware Components Breakdown", "Technical Selection, Specifications and Operational Roles")

hw_items = [
    ("STM32 Microcontroller", "32-bit ARM Cortex-M processor delivering deterministic timer interrupts for PWM, hardware ADC, and USART serialization.", "Role: Master Core", C_PRIMARY),
    ("DHT22 (AM2302)", "Capacitive humidity sensor & thermistor (-40 to 80°C, ±0.5°C accuracy; 0–100% RH, ±2% accuracy).", "Role: Climate Monitor", C_AMBER),
    ("LDR Sensor Module", "Photoresistor with LM393 comparator providing continuous analog light lux voltage directly to ADC.", "Role: Lux Harvesting", C_PRIMARY),
    ("PIR Motion Sensor", "Pyroelectric sensor with faceted Fresnel lens (HC-SR501) detecting infrared shifts from occupant motion.", "Role: Occupancy Latch", C_SUCCESS),
    ("Optocoupled Relay", "Electromechanical relay with optocoupler isolation, allowing 3.3V logic to safely switch 230V AC troffers.", "Role: High-Voltage Light", C_DANGER),
    ("MOSFET Motor Driver", "Logic-level N-channel power MOSFET driven by high-frequency STM32 PWM to regulate ceiling fan speed.", "Role: Fan Modulation", C_PRIMARY),
    ("ESP32 Wi-Fi & BLE SoC", "Dual-core 240MHz wireless microcontroller acting as communications bridge: buffers UART packets and publishes telemetry.", "Role: IoT Gateway", HexColor("#9333EA"))
]

for idx, (title, desc, role, col) in enumerate(hw_items):
    if idx < 4:
        x = (0.8 + idx * 2.95) * inch
        y = 3.5 * inch
        w = 2.85 * inch
        h = 2.2 * inch
    else:
        x = (0.8 + (idx - 4) * 3.95) * inch
        y = 1.1 * inch
        w = 3.8 * inch
        h = 2.2 * inch
        
    draw_card(x, y, w, h)
    c.setFillColor(col)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(x + 0.15 * inch, y + h - 0.35 * inch, title)
    c.setFillColor(C_TEXT_MUTED)
    c.setFont("Helvetica", 9)
    words = desc.split(" ")
    lines = []
    curr = []
    for word in words:
        curr.append(word)
        if len(" ".join(curr)) > (28 if idx < 4 else 42):
            lines.append(" ".join(curr[:-1]))
            curr = [word]
    if curr:
        lines.append(" ".join(curr))
    for l_idx, line in enumerate(lines[:3]):
        c.drawString(x + 0.15 * inch, y + h - 0.65 * inch - l_idx * 13, line)
    
    c.setFillColor(C_TEXT_DARK)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(x + 0.15 * inch, y + 0.25 * inch, role)

c.showPage()

# ==============================================================================
# SLIDE 8: Working Principle & Closed-Loop Cycle
# ==============================================================================
draw_header_and_footer("SYSTEM OPERATION", "Working Principle & Closed-Loop Cycle", "Autonomous Sense-Process-Actuate Cycle")

wp_steps = [
    ("01", "Sensory Polling", ["DHT22 queried every 2s via bus.", "LDR sampled via 12-bit ADC.", "PIR latched via GPIO interrupt."], C_PRIMARY),
    ("02", "Threshold Logic", ["Compare LDR to threshold (< 40%).", "Compare temp to comfort brackets.", "Check occupancy timeout latch."], C_AMBER),
    ("03", "Actuator Dispatch", ["Trigger GPIO high/low for relay.", "Adjust PWM register (TIM2->CCR1).", "De-energize loads if timeout."], C_SUCCESS),
    ("04", "Uplink Telemetry", ["Assemble binary/JSON frame.", "Transmit packet over UART to ESP32.", "Publish data to web dashboard."], HexColor("#9333EA"))
]

for idx, (num, title, items, col) in enumerate(wp_steps):
    x = (0.8 + idx * 2.95) * inch
    draw_card(x, 1.8 * inch, 2.85 * inch, 4.0 * inch)
    c.setFillColor(col)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(x + 0.2 * inch, 5.4 * inch, f"STEP {num}")
    c.drawString(x + 0.2 * inch, 5.15 * inch, title)
    for i, it in enumerate(items):
        c.setFillColor(C_TEXT_MUTED)
        c.setFont("Helvetica", 9.5)
        c.drawString(x + 0.2 * inch, 4.6 * inch - i * 0.7 * inch, "• " + it)

draw_card(0.8 * inch, 1.0 * inch, 11.7 * inch, 0.65 * inch, bg=C_PRIMARY_LIGHT, stroke=C_PRIMARY)
c.setFillColor(C_PRIMARY_DARK)
c.setFont("Helvetica-Bold", 11)
c.drawCentredString(6.65 * inch, 1.25 * inch, "Deterministic Cycle Latency: Sub-50 millisecond decision loop guarantees immediate response.")

c.showPage()

# ==============================================================================
# SLIDE 9: Automatic Lighting Control Logic
# ==============================================================================
draw_header_and_footer("LIGHTING AUTOMATION", "Automatic Lighting Control Logic", "Dual-Condition Occupancy & Daylight Harvesting Algorithm")

draw_card(0.8 * inch, 1.1 * inch, 5.7 * inch, 4.7 * inch)
c.setFillColor(C_PRIMARY)
c.setFont("Helvetica-Bold", 12)
c.drawString(1.0 * inch, 5.4 * inch, "EMBEDDED DECISION RULE")
c.setFillColor(C_PRIMARY_DARK)
c.setFont("Helvetica-Bold", 10.5)
c.drawString(1.0 * inch, 5.0 * inch, "IF (Occupancy == TRUE && AmbientLight < 40%)")
c.drawString(1.2 * inch, 4.8 * inch, "→ RELAY_STATE = ON (Lights Energized)")
c.drawString(1.0 * inch, 4.55 * inch, "ELSE")
c.drawString(1.2 * inch, 4.35 * inch, "→ RELAY_STATE = OFF (Lights Extinguished)")

scs = [
    ("Scenario A: Occupied + Dark", "Students inside, cloudy day or evening -> LIGHTS ON"),
    ("Scenario B: Occupied + Ample Daylight", "Students inside, bright window sunlight > 40% -> LIGHTS OFF"),
    ("Scenario C: Vacant Classroom", "PIR inactive, zero occupants inside -> LIGHTS OFF")
]
for i, (st, sd) in enumerate(scs):
    c.setFillColor(C_TEXT_DARK)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(1.0 * inch, 3.8 * inch - i * 0.9 * inch, "• " + st)
    c.setFillColor(C_TEXT_MUTED)
    c.setFont("Helvetica", 9)
    c.drawString(1.2 * inch, 3.55 * inch - i * 0.9 * inch, sd)

# Right Diagram
draw_card(6.8 * inch, 1.1 * inch, 5.7 * inch, 4.7 * inch, bg=C_DARK_BG, stroke=HexColor("#1E293B"))
c.setFillColor(HexColor("#60A5FA"))
c.setFont("Helvetica-Bold", 13)
c.drawCentredString(9.65 * inch, 5.4 * inch, "LIGHTING DECISION FLOW")

fls = [
    ("1. Sample PIR Motion Interrupt", HexColor("#F1F5F9")),
    ("↓  [Human Motion Confirmed?]", HexColor("#94A3B8")),
    ("2. Sample LDR Analog Lux Channel", HexColor("#F1F5F9")),
    ("↓  [Is Daylight < 40% Deficit?]", HexColor("#94A3B8")),
    ("YES: Close Relay (Lights ON)", HexColor("#FBBF24")),
    ("NO: Open Relay (Lights OFF / Energy Saved)", HexColor("#94A3B8"))
]
for i, (t, col) in enumerate(fls):
    c.setFillColor(col)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawCentredString(9.65 * inch, 4.7 * inch - i * 0.65 * inch, t)

c.showPage()

# ==============================================================================
# SLIDE 10: Automatic Fan Control Logic
# ==============================================================================
draw_header_and_footer("FAN SPEED CONTROL", "Automatic Fan & Thermal Regulation", "Multi-Stage Temperature-to-PWM Modulation Logic")

fan_brackets = [
    ("BRACKET 1", "< 25.0°C", "Cool Baseline", "0% PWM (Fan OFF)", C_TEXT_MUTED, C_CARD_ALT),
    ("BRACKET 2", "25.0°C – 29.9°C", "Warm Mild Heat", "30% PWM (Low)", C_PRIMARY, C_PRIMARY_LIGHT),
    ("BRACKET 3", "30.0°C – 34.9°C", "Moderate Thermal Load", "60% PWM (Medium)", C_CYAN, HexColor("#ECFEFF")),
    ("BRACKET 4", "≥ 35.0°C", "High Heat Load", "100% PWM (Max)", C_DANGER, HexColor("#FEF2F2"))
]

for idx, (b_name, b_temp, b_desc, b_pwm, col, bg_col) in enumerate(fan_brackets):
    x = (0.8 + idx * 2.95) * inch
    draw_card(x, 2.7 * inch, 2.85 * inch, 3.1 * inch, bg=bg_col, stroke=col)
    c.setFillColor(col)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(x + 0.2 * inch, 5.45 * inch, b_name)
    c.setFillColor(C_TEXT_DARK)
    c.setFont("Helvetica-Bold", 15)
    c.drawString(x + 0.2 * inch, 5.0 * inch, b_temp)
    c.setFillColor(C_TEXT_MUTED)
    c.setFont("Helvetica", 9.5)
    c.drawString(x + 0.2 * inch, 4.6 * inch, b_desc)
    c.setFillColor(col)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(x + 0.2 * inch, 3.3 * inch, b_pwm)

draw_card(0.8 * inch, 1.1 * inch, 5.7 * inch, 1.35 * inch)
c.setFillColor(C_PRIMARY)
c.setFont("Helvetica-Bold", 11)
c.drawString(1.0 * inch, 2.15 * inch, "HARDWARE PWM GENERATION")
c.setFillColor(C_TEXT_MUTED)
c.setFont("Helvetica", 9)
c.drawString(1.0 * inch, 1.85 * inch, "Configured via STM32 General Purpose Timer (TIM2), clocked at 10 kHz")
c.drawString(1.0 * inch, 1.65 * inch, "with an 8-bit duty cycle counter (0–255 steps) yielding smooth motor torque.")

draw_card(6.8 * inch, 1.1 * inch, 5.7 * inch, 1.35 * inch)
c.setFillColor(C_DANGER)
c.setFont("Helvetica-Bold", 11)
c.drawString(7.0 * inch, 2.15 * inch, "VACANCY CUT-OFF SAFETY")
c.setFillColor(C_TEXT_MUTED)
c.setFont("Helvetica", 9)
c.drawString(7.0 * inch, 1.85 * inch, "Regardless of high room temperature, if PIR reports zero occupancy for longer")
c.drawString(7.0 * inch, 1.65 * inch, "than the inactivity timeout, the fan automatically cuts power to 0%.")

c.showPage()

# ==============================================================================
# SLIDE 11: Embedded Software Flowchart
# ==============================================================================
draw_header_and_footer("ALGORITHM FLOW", "Embedded System Software Flowchart", "Deterministic Main Loop Execution Model")

draw_card(0.8 * inch, 1.1 * inch, 6.8 * inch, 4.7 * inch, bg=C_DARK_BG, stroke=HexColor("#1E293B"))
c.setFillColor(HexColor("#60A5FA"))
c.setFont("Helvetica-Bold", 12)
c.drawCentredString(4.2 * inch, 5.4 * inch, "DETERMINISTIC MAIN EXECUTION LOOP")

fc_items = [
    ("[ START / POWER ON ]", C_PRIMARY),
    ("↓  Init Clocks, GPIO, ADC, TIM2 PWM, USART2", HexColor("#94A3B8")),
    ("↓  Sample Sensors (DHT22, LDR ADC, PIR State)", HexColor("#F1F5F9")),
    ("↓  < Is Classroom Occupied? >", HexColor("#60A5FA")),
    ("YES: Eval Light (Lux < 40%)  |  Eval Fan PWM", HexColor("#34D399")),
    ("NO: Decrement Inactivity Latch -> Cut All Loads", HexColor("#F87171")),
    ("↓  Transmit Telemetry Packet to ESP32 over UART", HexColor("#C084FC")),
    ("↓  Deterministic Non-blocking Loop Repeat", HexColor("#94A3B8"))
]
for i, (t, col) in enumerate(fc_items):
    c.setFillColor(col)
    c.setFont("Helvetica-Bold", 10)
    c.drawCentredString(4.2 * inch, 4.9 * inch - i * 0.48 * inch, t)

draw_card(7.9 * inch, 1.1 * inch, 4.6 * inch, 4.7 * inch)
c.setFillColor(C_TEXT_DARK)
c.setFont("Helvetica-Bold", 13)
c.drawString(8.1 * inch, 5.4 * inch, "CONTROL SAFETY FEATURES")

safety_bullets = [
    ("No Blocking Delays:", "Hardware interrupts maintain continuous system responsiveness."),
    ("Fail-Safe Design:", "Sensor timeout causes actuators to default to unpowered state."),
    ("Hardware Watchdog:", "Independent Watchdog (IWDG) reboots system if loop hangs."),
    ("Brownout Protection:", "Embedded BOR ensures clean reset during voltage dips.")
]
for i, (k, v) in enumerate(safety_bullets):
    c.setFillColor(C_PRIMARY)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(8.1 * inch, 4.7 * inch - i * 1.0 * inch, "• " + k)
    c.setFillColor(C_TEXT_MUTED)
    c.setFont("Helvetica", 9.5)
    c.drawString(8.3 * inch, 4.45 * inch - i * 1.0 * inch, v)

c.showPage()

# ==============================================================================
# SLIDE 12: Software Stack & IoT Communication
# ==============================================================================
draw_header_and_footer("COMMUNICATION PROTOCOL", "Software Stack & IoT Communication", "STM32 Embedded Firmware & ESP32 Network Bridge")

draw_card(0.8 * inch, 1.1 * inch, 5.7 * inch, 4.7 * inch)
c.setFillColor(C_PRIMARY)
c.setFont("Helvetica-Bold", 13)
c.drawString(1.0 * inch, 5.4 * inch, "STM32 EMBEDDED FIRMWARE")
c.setFillColor(C_TEXT_MUTED)
c.setFont("Helvetica", 10)
c.drawString(1.0 * inch, 5.15 * inch, "Bare-Metal C / STM32CubeIDE / HAL")

sw1 = [
    ("Hardware Abstraction Layer (HAL):", "Clean register abstractions for GPIO, ADC1, TIM2, and USART2 peripherals."),
    ("Interrupt Service Routines (ISR):", "EXTI pin trigger for immediate PIR motion event capture without CPU polling."),
    ("Structured Serial Packet Format:", "Serializes telemetry frames: #TEMP:28.5,HUM:55,LUX:32,PIR:1,FAN:60,LIGHT:1$"),
    ("Deterministic Timing:", "Strict loop scheduling with zero memory fragmentation.")
]
for i, (k, v) in enumerate(sw1):
    c.setFillColor(C_TEXT_DARK)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(1.0 * inch, 4.6 * inch - i * 0.95 * inch, "• " + k)
    c.setFillColor(C_TEXT_MUTED)
    c.setFont("Helvetica", 9)
    c.drawString(1.2 * inch, 4.35 * inch - i * 0.95 * inch, v)

draw_card(6.8 * inch, 1.1 * inch, 5.7 * inch, 4.7 * inch)
c.setFillColor(HexColor("#9333EA"))
c.setFont("Helvetica-Bold", 13)
c.drawString(7.0 * inch, 5.4 * inch, "ESP32 WIRELESS GATEWAY")
c.setFillColor(C_TEXT_MUTED)
c.setFont("Helvetica", 10)
c.drawString(7.0 * inch, 5.15 * inch, "Wi-Fi 802.11 b/g/n / FreeRTOS")

sw2 = [
    ("Hardware UART Ring Buffer:", "Reads STM32 packet stream via UART RX/TX without loading the main STM32 core."),
    ("Campus Wi-Fi Stack:", "Establishes connection to institutional Wi-Fi access points using WPA2-Enterprise / WPA2-PSK."),
    ("Telemetry Serving:", "Hosts asynchronous WebSocket or HTTP REST endpoints for real-time monitoring and manual override commands."),
    ("Decoupled Reliability:", "STM32 control continues operating safely even if Wi-Fi disconnects.")
]
for i, (k, v) in enumerate(sw2):
    c.setFillColor(C_TEXT_DARK)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(7.0 * inch, 4.6 * inch - i * 0.95 * inch, "• " + k)
    c.setFillColor(C_TEXT_MUTED)
    c.setFont("Helvetica", 9)
    c.drawString(7.2 * inch, 4.35 * inch - i * 0.95 * inch, v)

c.showPage()

# ==============================================================================
# SLIDE 13: Expected Operation & Test Scenarios
# ==============================================================================
draw_header_and_footer("SIMULATION & VALIDATION", "Expected Operation & Test Scenarios", "System Response Under Realistic Field Conditions")

scenarios = [
    ("Scenario 01: Classroom Vacant at Morning (7:00 AM)", "PIR reports 0 occupancy, external lux 20%, room temp 22°C.", "Lights: OFF | Fan: 0% (Idle Baseline)", C_TEXT_MUTED),
    ("Scenario 02: Students Enter on Rainy Morning (8:00 AM)", "PIR triggers active, external lux drops to 15% (insufficient daylight).", "Lights: ON (Auto Relay) | Fan: 0%", C_AMBER),
    ("Scenario 03: Sunny Afternoon Lecture (1:00 PM)", "Classroom fully occupied, outdoor solar lux surges to 85%, room temp hits 32°C.", "Lights: OFF (Daylight Harvest) | Fan: 60% PWM", C_PRIMARY),
    ("Scenario 04: Summer Heat Wave Peak (3:00 PM)", "Classroom occupied, thermal load surges to 37.5°C.", "Lights: Evaluated | Fan: 100% PWM Max Airflow", C_DANGER),
    ("Scenario 05: Class Dismissal / Evening Exit (5:00 PM)", "Students exit through doorway; PIR latches clear; inactivity countdown expires.", "Zero Waste Shutdown: All Actuators OFF", C_SUCCESS)
]

for idx, (title, cond, resp, col) in enumerate(scenarios):
    y = (4.7 - idx * 0.9) * inch
    draw_card(0.8 * inch, y, 11.7 * inch, 0.8 * inch)
    c.setFillColor(col)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(1.0 * inch, y + 0.52 * inch, title + "  →  " + resp)
    c.setFillColor(C_TEXT_MUTED)
    c.setFont("Helvetica", 9.5)
    c.drawString(1.0 * inch, y + 0.25 * inch, cond)

c.showPage()

# ==============================================================================
# SLIDE 14: Advantages & Future Expansion
# ==============================================================================
draw_header_and_footer("EVALUATION & ROADMAP", "Advantages & Future Expansion", "Quantifiable Engineering Benefits and Next-Phase Roadmap")

draw_card(0.8 * inch, 1.1 * inch, 5.7 * inch, 4.7 * inch)
c.setFillColor(C_PRIMARY)
c.setFont("Helvetica-Bold", 13)
c.drawString(1.0 * inch, 5.4 * inch, "CORE ADVANTAGES")
advs = [
    ("Up to 40% Energy Reduction:", "Eliminates human error, parasitic overnight loads, and unnecessary midday artificial lighting troffers."),
    ("Autonomous Student Comfort:", "Continuous proportional cooling prevents classroom thermal fatigue during intense lectures."),
    ("Decoupled Architecture:", "STM32 ensures rock-solid deterministic safety even if Wi-Fi or cloud networks disconnect."),
    ("Low Retrofit Cost:", "Compatible with standard legacy 230V fluorescent/LED arrays and common ceiling fan installations.")
]
for i, (k, v) in enumerate(advs):
    c.setFillColor(C_PRIMARY)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(1.0 * inch, 4.7 * inch - i * 1.0 * inch, "✔  " + k)
    c.setFillColor(C_TEXT_MUTED)
    c.setFont("Helvetica", 9.5)
    c.drawString(1.2 * inch, 4.45 * inch - i * 1.0 * inch, v)

draw_card(6.8 * inch, 1.1 * inch, 5.7 * inch, 4.7 * inch)
c.setFillColor(C_SUCCESS)
c.setFont("Helvetica-Bold", 13)
c.drawString(7.0 * inch, 5.4 * inch, "FUTURE EXPANSION ROADMAP")
fss = [
    ("Campus-Wide Mesh Deployment:", "Implement ESP-NOW or LoRaWAN mesh networking across hundreds of university lecture halls and labs."),
    ("Predictive Pre-Cooling with ML:", "Integrate academic timetable databases to automatically pre-condition rooms 5 minutes before scheduled classes."),
    ("Hardware Current Shunt Monitoring:", "Integrate INA219 current sensors to log exact real-time kilowatt-hour power consumption curves."),
    ("Motorized Blinds Integration:", "Modulate window blinds based on sun glare angle to further lower thermal absorption.")
]
for i, (k, v) in enumerate(fss):
    c.setFillColor(C_SUCCESS)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(7.0 * inch, 4.7 * inch - i * 1.0 * inch, "➔  " + k)
    c.setFillColor(C_TEXT_MUTED)
    c.setFont("Helvetica", 9.5)
    c.drawString(7.2 * inch, 4.45 * inch - i * 1.0 * inch, v)

c.showPage()

# ==============================================================================
# SLIDE 15: Conclusion
# ==============================================================================
draw_header_and_footer("FINAL SUMMARY", "Conclusion", "Project Summary & Engineering Value Proposition")

draw_card(0.8 * inch, 1.1 * inch, 7.5 * inch, 4.7 * inch)
c.setFillColor(C_PRIMARY)
c.setFont("Helvetica-Bold", 13)
c.drawString(1.0 * inch, 5.4 * inch, "PROJECT SUMMARY")
c.setFillColor(C_TEXT_DARK)
c.setFont("Helvetica", 11)
c.drawString(1.0 * inch, 5.0 * inch, "The proposed Smart Classroom Automation System Using STM32 delivers an integrated,")
c.drawString(1.0 * inch, 4.75 * inch, "cost-effective, and highly reliable embedded solution to combat energy waste in academia.")

con_pts = [
    ("Multi-Sensory Closed-Loop Control:", "Combines ambient lux (LDR), passive motion (PIR), and temperature (DHT22) for accurate decisions."),
    ("Energy & Comfort Balance:", "Eliminates daylight redundancy and empty classroom waste while maintaining adaptive proportional ventilation."),
    ("Dual-Layer IoT Scalability:", "Robust STM32 hardware controller paired with ESP32 Wi-Fi gateway for centralized oversight.")
]
for i, (k, v) in enumerate(con_pts):
    c.setFillColor(C_PRIMARY)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(1.0 * inch, 4.2 * inch - i * 0.9 * inch, "• " + k)
    c.setFillColor(C_TEXT_MUTED)
    c.setFont("Helvetica", 9.5)
    c.drawString(1.2 * inch, 3.95 * inch - i * 0.9 * inch, v)

c.setFillColor(C_PRIMARY_DARK)
c.setFont("Helvetica-BoldOblique", 13)
c.drawCentredString(4.55 * inch, 1.5 * inch, '"Smarter Classroom, Better Comfort, Efficient Energy Use"')

if os.path.exists(IMAGE_STM32):
    c.drawImage(IMAGE_STM32, 8.6 * inch, 1.1 * inch, width=3.9 * inch, height=4.7 * inch, preserveAspectRatio=True)

c.showPage()

# ==============================================================================
# SLIDE 16: Thank You
# ==============================================================================
c.setFillColor(C_BG)
c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)

draw_card(2.5 * inch, 1.5 * inch, 8.333 * inch, 4.5 * inch)
c.setFillColor(C_TEXT_DARK)
c.setFont("Helvetica-Bold", 38)
c.drawCentredString(6.666 * inch, 4.8 * inch, "THANK YOU")

c.setFillColor(C_PRIMARY)
c.setFont("Helvetica-Bold", 16)
c.drawCentredString(6.666 * inch, 4.1 * inch, "Questions, Discussions & Evaluator Feedback")

c.setFillColor(C_TEXT_MUTED)
c.setFont("Helvetica", 12)
c.drawCentredString(6.666 * inch, 3.3 * inch, "Project: Smart Classroom Automation System Using STM32")
c.drawCentredString(6.666 * inch, 2.95 * inch, "Department of Electronics & Communication / Embedded Systems Engineering")

c.setFillColor(C_SUCCESS)
c.setFont("Helvetica-Bold", 12)
c.drawCentredString(6.666 * inch, 2.2 * inch, "Interactive 3D Digital Twin Simulation Available for Live Evaluation Demonstration")

c.showPage()

# Save PDF
c.save()
print(f"SUCCESS: PDF generated at {PDF_PATH} with 16 pages")
