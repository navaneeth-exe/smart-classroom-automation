import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# Initialize 16:9 widescreen presentation
prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
blank_slide_layout = prs.slide_layouts[6]

# Define Color Palette (Matching Website UI)
COLOR_BG = RGBColor(248, 250, 252)        # Slate 50
COLOR_CARD_BG = RGBColor(255, 255, 255)   # White
COLOR_CARD_ALT = RGBColor(241, 245, 249)  # Slate 100
COLOR_PRIMARY = RGBColor(37, 99, 235)     # Blue 600
COLOR_PRIMARY_DARK = RGBColor(30, 58, 138)# Blue 900
COLOR_PRIMARY_LIGHT = RGBColor(239, 246, 255) # Blue 50
COLOR_ACCENT = RGBColor(217, 119, 6)      # Amber 600
COLOR_SUCCESS = RGBColor(16, 185, 129)    # Emerald 500
COLOR_DANGER = RGBColor(239, 68, 68)      # Red 500
COLOR_TEXT_DARK = RGBColor(15, 23, 42)    # Slate 900
COLOR_TEXT_MUTED = RGBColor(100, 116, 139)# Slate 500
COLOR_BORDER = RGBColor(226, 232, 240)    # Slate 200

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
IMAGE_CLASSROOM = os.path.join(PROJECT_ROOT, "public", "images", "classroom_hero.jpg")
IMAGE_STM32 = os.path.join(PROJECT_ROOT, "public", "images", "stm32_board.jpg")
IMAGE_SENSORS = os.path.join(PROJECT_ROOT, "public", "images", "sensors_kit.jpg")
IMAGE_ESP32 = os.path.join(PROJECT_ROOT, "public", "images", "esp32_module.jpg")

def create_base_slide(category, title, subtitle):
    slide = prs.slides.add_slide(blank_slide_layout)
    
    # Background shape
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg.fill.solid()
    bg.fill.fore_color.rgb = COLOR_BG
    bg.line.fill.background()
    
    # Top Category Pill
    pill = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.4), Inches(2.8), Inches(0.35))
    pill.fill.solid()
    pill.fill.fore_color.rgb = COLOR_PRIMARY_LIGHT
    pill.line.color.rgb = COLOR_PRIMARY
    pill.line.width = Pt(1)
    tf_p = pill.text_frame
    tf_p.word_wrap = True
    p_p = tf_p.paragraphs[0]
    p_p.text = category.upper()
    p_p.font.size = Pt(10)
    p_p.font.bold = True
    p_p.font.color.rgb = COLOR_PRIMARY
    p_p.alignment = PP_ALIGN.CENTER

    # Header Title
    title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.85), Inches(11.7), Inches(0.9))
    tf = title_box.text_frame
    tf.word_wrap = True
    p1 = tf.paragraphs[0]
    p1.text = title
    p1.font.size = Pt(22)
    p1.font.bold = True
    p1.font.color.rgb = COLOR_TEXT_DARK
    
    if subtitle:
        p2 = tf.add_paragraph()
        p2.text = subtitle
        p2.font.size = Pt(12)
        p2.font.color.rgb = COLOR_TEXT_MUTED
        
    # Bottom Footer
    footer_box = slide.shapes.add_textbox(Inches(0.8), Inches(7.05), Inches(11.7), Inches(0.35))
    tf_f = footer_box.text_frame
    p_f = tf_f.paragraphs[0]
    p_f.text = "Smart Classroom Automation System Using STM32  |  Academic Engineering Presentation"
    p_f.font.size = Pt(9)
    p_f.font.color.rgb = COLOR_TEXT_MUTED
    
    return slide

def add_card(slide, left, top, width, height, bg_color=COLOR_CARD_BG, border_color=COLOR_BORDER):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(left), Inches(top), Inches(width), Inches(height))
    shape.fill.solid()
    shape.fill.fore_color.rgb = bg_color
    if border_color:
        shape.line.color.rgb = border_color
        shape.line.width = Pt(1.2)
    else:
        shape.line.fill.background()
    return shape

# ==============================================================================
# SLIDE 1: Title Slide
# ==============================================================================
s1 = prs.slides.add_slide(blank_slide_layout)
bg1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
bg1.fill.solid()
bg1.fill.fore_color.rgb = COLOR_BG
bg1.line.fill.background()

# Hero Left Container
tb_cat = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.8), Inches(4.5), Inches(0.4))
tb_cat.fill.solid()
tb_cat.fill.fore_color.rgb = COLOR_PRIMARY_LIGHT
tb_cat.line.color.rgb = COLOR_PRIMARY
p_cat = tb_cat.text_frame.paragraphs[0]
p_cat.text = "EMBEDDED SYSTEMS & IOT ENGINEERING PROJECT"
p_cat.font.size = Pt(11)
p_cat.font.bold = True
p_cat.font.color.rgb = COLOR_PRIMARY
p_cat.alignment = PP_ALIGN.CENTER

# Main Title
tb_t = s1.shapes.add_textbox(Inches(0.8), Inches(1.3), Inches(6.8), Inches(2.2))
tf_t = tb_t.text_frame
tf_t.word_wrap = True
p_t1 = tf_t.paragraphs[0]
p_t1.text = "Smart Classroom Automation System"
p_t1.font.size = Pt(32)
p_t1.font.bold = True
p_t1.font.color.rgb = COLOR_TEXT_DARK

p_t2 = tf_t.add_paragraph()
p_t2.text = "Using STM32"
p_t2.font.size = Pt(32)
p_t2.font.bold = True
p_t2.font.color.rgb = COLOR_PRIMARY

# Tagline Quote Box
tag_box = add_card(s1, 0.8, 3.6, 6.5, 0.7, bg_color=COLOR_PRIMARY_LIGHT, border_color=COLOR_PRIMARY)
tf_tag = tag_box.text_frame
p_tag = tf_tag.paragraphs[0]
p_tag.text = "\"Smarter Classroom, Better Comfort, Efficient Energy Use\""
p_tag.font.size = Pt(14)
p_tag.font.bold = True
p_tag.font.italic = True
p_tag.font.color.rgb = COLOR_PRIMARY_DARK
p_tag.alignment = PP_ALIGN.CENTER

# Description
tb_d = s1.shapes.add_textbox(Inches(0.8), Inches(4.4), Inches(6.5), Inches(1.2))
tf_d = tb_d.text_frame
tf_d.word_wrap = True
p_d = tf_d.paragraphs[0]
p_d.text = "A proposed closed-loop embedded automation architecture that integrates multi-sensor environmental acquisition with ARM Cortex-M processing to autonomously govern lighting, thermal comfort, and energy preservation in institutional learning spaces."
p_d.font.size = Pt(11)
p_d.font.color.rgb = COLOR_TEXT_MUTED

# Key Specs 3 Cards
spec_items = [
    ("CORE MCU", "STM32 (ARM Cortex)"),
    ("IOT GATEWAY", "ESP32 Wi-Fi"),
    ("TARGET OUTPUT", "Relay & PWM Cooling")
]
for idx, (lbl, val) in enumerate(spec_items):
    c = add_card(s1, 0.8 + idx * 2.2, 5.7, 2.05, 0.9, bg_color=COLOR_CARD_ALT)
    tf_c = c.text_frame
    p_lbl = tf_c.paragraphs[0]
    p_lbl.text = lbl
    p_lbl.font.size = Pt(9)
    p_lbl.font.bold = True
    p_lbl.font.color.rgb = COLOR_TEXT_MUTED
    p_val = tf_c.add_paragraph()
    p_val.text = val
    p_val.font.size = Pt(11)
    p_val.font.bold = True
    p_val.font.color.rgb = COLOR_TEXT_DARK

# Right Column Images
if os.path.exists(IMAGE_CLASSROOM):
    s1.shapes.add_picture(IMAGE_CLASSROOM, Inches(7.7), Inches(0.8), Inches(4.8), Inches(3.4))
if os.path.exists(IMAGE_STM32):
    s1.shapes.add_picture(IMAGE_STM32, Inches(7.7), Inches(4.4), Inches(2.35), Inches(2.2))
if os.path.exists(IMAGE_SENSORS):
    s1.shapes.add_picture(IMAGE_SENSORS, Inches(10.15), Inches(4.4), Inches(2.35), Inches(2.2))

# ==============================================================================
# SLIDE 2: Introduction & Context
# ==============================================================================
s2 = create_base_slide("PROJECT BACKGROUND", "Introduction & Context", "The Need for Intelligent Energy Management in Academic Spaces")

add_card(s2, 0.8, 1.8, 6.6, 5.0)
tb2_text = s2.shapes.add_textbox(Inches(1.0), Inches(1.9), Inches(6.2), Inches(4.8))
tf2 = tb2_text.text_frame
tf2.word_wrap = True

p = tf2.paragraphs[0]
p.text = "Academic classrooms and university lecture halls present dynamic physical environments characterized by erratic student schedules, shifting thermal loads, and variable outdoor daylight availability throughout the academic day."
p.font.size = Pt(12)
p.font.color.rgb = COLOR_TEXT_DARK

bullets = [
    ("Heavy Energy Footprint:", " High-bay fluorescent/LED lighting troffers and quad ceiling fan arrays run continuously regardless of whether rooms are populated."),
    ("Static Manual Control Dependence:", " Human occupants frequently forget to switch off electrical loads upon dismissal, resulting in zero-occupancy overnight electrical waste."),
    ("Dynamic Environmental Fluctuation:", " Solar daylight streaming through perimeter windows often renders artificial lighting redundant during midday periods.")
]

for b_title, b_desc in bullets:
    p_b = tf2.add_paragraph()
    p_b.space_before = Pt(12)
    run1 = p_b.add_run()
    run1.text = "• " + b_title
    run1.font.bold = True
    run1.font.size = Pt(11)
    run1.font.color.rgb = COLOR_PRIMARY
    run2 = p_b.add_run()
    run2.text = b_desc
    run2.font.size = Pt(11)
    run2.font.color.rgb = COLOR_TEXT_MUTED

if os.path.exists(IMAGE_CLASSROOM):
    s2.shapes.add_picture(IMAGE_CLASSROOM, Inches(7.7), Inches(1.8), Inches(4.8), Inches(3.2))

card_hyp = add_card(s2, 7.7, 5.15, 4.8, 1.65, bg_color=COLOR_PRIMARY_LIGHT, border_color=COLOR_PRIMARY)
tf_hyp = card_hyp.text_frame
tf_hyp.word_wrap = True
p_h1 = tf_hyp.paragraphs[0]
p_h1.text = "CORE HYPOTHESIS"
p_h1.font.size = Pt(11)
p_h1.font.bold = True
p_h1.font.color.rgb = COLOR_PRIMARY
p_h2 = tf_hyp.add_paragraph()
p_h2.text = "Automated embedded closed-loop regulation achieves up to 30–45% electrical energy savings while simultaneously improving student learning comfort."
p_h2.font.size = Pt(12)
p_h2.font.bold = True
p_h2.font.color.rgb = COLOR_PRIMARY_DARK

# ==============================================================================
# SLIDE 3: Problem Statement
# ==============================================================================
s3 = create_base_slide("CHALLENGES IDENTIFIED", "Problem Statement", "Quantifying Inefficiencies in Conventional Institutional Infrastructure")

problems = [
    ("Daylight Ignorance", "Artificial lights burn at 100% full capacity even when outdoor sunlight provides over 600 lux across student desktops through exterior windows.", COLOR_DANGER),
    ("Zero-Occupancy Waste", "Ceiling fans and lights continue spinning and glowing during empty periods, between lecture slots, and after evening university closures.", COLOR_ACCENT),
    ("Fixed-Speed Discomfort", "Fans operate on primitive binary or manual rotary step switches that do not adapt dynamically to fluctuating thermal heat loads or humidity spikes.", COLOR_PRIMARY),
    ("Absence of Telemetry", "Campus facility administrators possess no real-time telemetry regarding room thermal compliance, student presence, or device operational status.", COLOR_TEXT_MUTED),
    ("Cumulative Utility Costs", "Across campuses with 50+ lecture halls, manual negligence translates to thousands of kilowatt-hours wasted annually, straining institution budgets.", COLOR_TEXT_DARK),
]

for idx, (p_title, p_desc, col) in enumerate(problems):
    col_idx = idx % 3
    row_idx = idx // 3
    w = 3.75 if idx < 3 else 5.75
    l = 0.8 + col_idx * 3.95 if idx < 3 else 0.8 + (idx - 3) * 5.95
    t = 1.9 + row_idx * 2.5
    h = 2.3
    
    card = add_card(s3, l, t, w, h)
    tf = card.text_frame
    tf.word_wrap = True
    p1 = tf.paragraphs[0]
    p1.text = p_title
    p1.font.size = Pt(14)
    p1.font.bold = True
    p1.font.color.rgb = col
    p2 = tf.add_paragraph()
    p2.space_before = Pt(8)
    p2.text = p_desc
    p2.font.size = Pt(10.5)
    p2.font.color.rgb = COLOR_TEXT_MUTED

# ==============================================================================
# SLIDE 4: Project Objectives
# ==============================================================================
s4 = create_base_slide("GOALS & SPECIFICATIONS", "Project Objectives", "Clear, Measurable Engineering Deliverables of the Proposed System")

objs_col1 = [
    ("01", "Environmental Sensory Acquisition", "Accurately sample ambient temperature, relative humidity, and daylight illuminance via digital & analog interfaces."),
    ("02", "Passive Human Occupancy Detection", "Detect human entrance, movement, and physical occupancy vectors without invasive biometric tracking."),
    ("03", "Dual-Condition Smart Lighting", "Automate high-voltage lighting circuits via solid-state relays only when both occupancy and daylight deficit occur."),
    ("04", "Proportional PWM Thermal Cooling", "Dynamically modulate DC fan velocity across distinct thermal brackets (30%, 60%, 100%) based on ambient heat load.")
]
objs_col2 = [
    ("05", "Zero-Waste Inactivity Latch", "Automatically de-energize all lighting and cooling circuits after confirmed absence to eliminate overnight parasitic power draw."),
    ("06", "Wireless Telemetry & IoT Gateway", "Interface STM32 with ESP32 over UART to transmit continuous telemetry packets over Wi-Fi."),
    ("07", "Remote Operator Override Capability", "Enable facility managers to view live environmental trends and manually force actuators when specialized events require it.")
]

for idx, (num, title, desc) in enumerate(objs_col1):
    c = add_card(s4, 0.8, 1.8 + idx * 1.25, 5.7, 1.15)
    tf = c.text_frame
    tf.word_wrap = True
    p1 = tf.paragraphs[0]
    p1.text = f"[{num}] {title}"
    p1.font.size = Pt(12)
    p1.font.bold = True
    p1.font.color.rgb = COLOR_PRIMARY
    p2 = tf.add_paragraph()
    p2.text = desc
    p2.font.size = Pt(9.5)
    p2.font.color.rgb = COLOR_TEXT_MUTED

for idx, (num, title, desc) in enumerate(objs_col2):
    c = add_card(s4, 6.8, 1.8 + idx * 1.65, 5.7, 1.5)
    tf = c.text_frame
    tf.word_wrap = True
    p1 = tf.paragraphs[0]
    p1.text = f"[{num}] {title}"
    p1.font.size = Pt(12)
    p1.font.bold = True
    p1.font.color.rgb = COLOR_SUCCESS
    p2 = tf.add_paragraph()
    p2.text = desc
    p2.font.size = Pt(10)
    p2.font.color.rgb = COLOR_TEXT_MUTED

# ==============================================================================
# SLIDE 5: Proposed System Overview
# ==============================================================================
s5 = create_base_slide("SYSTEM TOPOLOGY", "Proposed System Overview", "High-Level Input-Process-Output Automation Topology")

# Input Box
c_in = add_card(s5, 0.8, 2.0, 3.6, 4.8)
tf_in = c_in.text_frame
tf_in.word_wrap = True
p = tf_in.paragraphs[0]
p.text = "1. SENSORY INPUTS"
p.font.size = Pt(13)
p.font.bold = True
p.font.color.rgb = COLOR_PRIMARY
items_in = [
    ("DHT22 Sensor", "Digital Single-Bus temperature & humidity sampling"),
    ("LDR Module", "Analog lux illuminance (0–3.3V to 12-bit ADC)"),
    ("PIR Sensor", "Passive infrared pyroelectric motion detection via GPIO EXTI")
]
for t, d in items_in:
    p_t = tf_in.add_paragraph()
    p_t.space_before = Pt(12)
    p_t.text = "• " + t
    p_t.font.bold = True
    p_t.font.size = Pt(11)
    p_t.font.color.rgb = COLOR_TEXT_DARK
    p_d = tf_in.add_paragraph()
    p_d.text = d
    p_d.font.size = Pt(9.5)
    p_d.font.color.rgb = COLOR_TEXT_MUTED

# Main Controller (Center)
c_mcu = add_card(s5, 4.85, 2.0, 3.6, 4.8, bg_color=COLOR_PRIMARY_LIGHT, border_color=COLOR_PRIMARY)
tf_mcu = c_mcu.text_frame
tf_mcu.word_wrap = True
p = tf_mcu.paragraphs[0]
p.text = "2. MAIN CONTROLLER\nSTM32 (ARM Cortex-M)"
p.font.size = Pt(13)
p.font.bold = True
p.font.color.rgb = COLOR_PRIMARY_DARK
p.alignment = PP_ALIGN.CENTER
mcu_roles = [
    "Hardware Timer PWM generation (TIM2_CH1)",
    "Continuous multi-variable decision evaluation",
    "Inactivity countdown latch state machine",
    "USART2 packet assembly & telemetry serialization",
    "Sub-50ms deterministic closed-loop cycle"
]
for r in mcu_roles:
    p_r = tf_mcu.add_paragraph()
    p_r.space_before = Pt(10)
    p_r.text = "✔ " + r
    p_r.font.size = Pt(10)
    p_r.font.color.rgb = COLOR_PRIMARY_DARK

# Outputs Box
c_out = add_card(s5, 8.9, 2.0, 3.6, 4.8)
tf_out = c_out.text_frame
tf_out.word_wrap = True
p = tf_out.paragraphs[0]
p.text = "3. ACTUATORS & GATEWAY"
p.font.size = Pt(13)
p.font.bold = True
p.font.color.rgb = COLOR_SUCCESS
items_out = [
    ("Opto-Isolated Relay", "Galvanic isolated 230V AC classroom lighting troffer control"),
    ("MOSFET Driver", "High-frequency PWM speed regulation for DC ceiling fans"),
    ("ESP32 Wi-Fi Gateway", "Wi-Fi TCP/HTTP telemetry uplink to campus facility dashboard")
]
for t, d in items_out:
    p_t = tf_out.add_paragraph()
    p_t.space_before = Pt(12)
    p_t.text = "• " + t
    p_t.font.bold = True
    p_t.font.size = Pt(11)
    p_t.font.color.rgb = COLOR_TEXT_DARK
    p_d = tf_out.add_paragraph()
    p_d.text = d
    p_d.font.size = Pt(9.5)
    p_d.font.color.rgb = COLOR_TEXT_MUTED

# ==============================================================================
# SLIDE 6: Detailed System Architecture
# ==============================================================================
s6 = create_base_slide("HARDWARE INTERFACING", "Detailed System Architecture", "Pin-Level Interfacing and Signal Protocol Topology")

# Full Technical Schematic Frame
c_arch = add_card(s6, 0.8, 1.8, 11.7, 5.0, bg_color=RGBColor(15, 23, 42), border_color=RGBColor(30, 41, 59))
tf_a = c_arch.text_frame
tf_a.word_wrap = True
p = tf_a.paragraphs[0]
p.text = "SYSTEM INTERFACE PIN MAPPING & PROTOCOL TOPOLOGY"
p.font.size = Pt(13)
p.font.bold = True
p.font.color.rgb = RGBColor(96, 165, 250)

# Left Sensors Box inside
c_s_box = add_card(s6, 1.2, 2.5, 3.2, 3.8, bg_color=RGBColor(30, 41, 59), border_color=RGBColor(51, 65, 85))
tf_sb = c_s_box.text_frame
p = tf_sb.paragraphs[0]
p.text = "SENSORY TRANSDUCERS\n"
p.font.size = Pt(11)
p.font.bold = True
p.font.color.rgb = RGBColor(241, 245, 249)
sb_items = [
    ("DHT22:", " GPIO (Single-Wire Data Bus)"),
    ("LDR Sensor:", " ADC1_IN0 (0–3.3V Analog)"),
    ("PIR Motion:", " EXTI_Line0 (Interrupt Trigger)")
]
for k, v in sb_items:
    p_item = tf_sb.add_paragraph()
    p_item.space_before = Pt(8)
    r1 = p_item.add_run()
    r1.text = k
    r1.font.bold = True
    r1.font.color.rgb = RGBColor(251, 146, 60)
    r2 = p_item.add_run()
    r2.text = v
    r2.font.color.rgb = RGBColor(203, 213, 225)

# Center STM32 Core
c_m_box = add_card(s6, 5.0, 2.3, 3.3, 4.2, bg_color=RGBColor(30, 58, 138), border_color=COLOR_PRIMARY)
tf_mb = c_m_box.text_frame
p = tf_mb.paragraphs[0]
p.text = "MASTER MCU CORE\nSTM32 (ARM Cortex-M)\n"
p.font.size = Pt(12)
p.font.bold = True
p.font.color.rgb = RGBColor(255, 255, 255)
p.alignment = PP_ALIGN.CENTER
mb_items = [
    "• ADC 12-bit Analog Conversion",
    "• TIM2 General Purpose Timer (PWM)",
    "• EXTI External Interrupt Controller",
    "• USART2 Asynchronous Serial",
    "• Brownout Reset & Watchdog Timer",
    "• Sub-50ms Closed-Loop Execution"
]
for item in mb_items:
    p_i = tf_mb.add_paragraph()
    p_i.text = item
    p_i.font.size = Pt(9.5)
    p_i.font.color.rgb = RGBColor(191, 219, 254)

# Right Actuators Box inside
c_act_box = add_card(s6, 8.9, 2.5, 3.2, 3.8, bg_color=RGBColor(30, 41, 59), border_color=RGBColor(51, 65, 85))
tf_ab = c_act_box.text_frame
p = tf_ab.paragraphs[0]
p.text = "ACTUATORS & GATEWAY\n"
p.font.size = Pt(11)
p.font.bold = True
p.font.color.rgb = RGBColor(241, 245, 249)
ab_items = [
    ("Relay (GPIO Output):", " 230V AC Classroom Lighting"),
    ("MOSFET (TIM2_CH1):", " 12V/24V DC Fan Variable PWM"),
    ("ESP32 (USART2):", " Wi-Fi Telemetry & Web Dashboard")
]
for k, v in ab_items:
    p_item = tf_ab.add_paragraph()
    p_item.space_before = Pt(8)
    r1 = p_item.add_run()
    r1.text = k
    r1.font.bold = True
    r1.font.color.rgb = RGBColor(52, 211, 153)
    r2 = p_item.add_run()
    r2.text = v
    r2.font.color.rgb = RGBColor(203, 213, 225)

# ==============================================================================
# SLIDE 7: Hardware Components Breakdown
# ==============================================================================
s7 = create_base_slide("BILL OF MATERIALS", "Hardware Components Breakdown", "Technical Selection, Specifications and Operational Roles")

hw_cards = [
    ("STM32 Microcontroller", "32-bit ARM Cortex-M processor delivering deterministic timer interrupts for multi-channel PWM, hardware 12-bit ADC, and USART serialization.", "Role: Master Automation Core", COLOR_PRIMARY),
    ("DHT22 (AM2302)", "Capacitive humidity sensor & thermistor. Temperature range: -40 to 80°C (±0.5°C accuracy); Humidity: 0–100% RH (±2% accuracy).", "Role: Climate Monitoring", COLOR_ACCENT),
    ("LDR Sensor Module", "Cadmium-sulfide photoresistor with voltage divider and LM393 comparator providing continuous analog light lux voltage directly to STM32 ADC.", "Role: Lux Harvesting", COLOR_PRIMARY),
    ("PIR Motion Sensor", "Pyroelectric sensor with faceted Fresnel lens (HC-SR501) detecting infrared radiation shifts caused by human occupant motion vectors.", "Role: Occupancy Latch", COLOR_SUCCESS),
    ("Optocoupled Relay", "Electromechanical relay with optocoupler galvanic isolation, allowing 3.3V logic signals to safely switch 230V AC classroom lighting troffers.", "Role: High-Voltage Switching", COLOR_DANGER),
    ("MOSFET Motor Driver", "Logic-level N-channel power MOSFET (e.g. IRLZ44N) driven by high-frequency STM32 PWM signals to smoothly regulate DC ceiling fan motor speed.", "Role: PWM Speed Regulation", COLOR_PRIMARY),
    ("ESP32 Wi-Fi & BLE SoC", "Dual-core 240MHz wireless microcontroller acting as a dedicated communications bridge: buffers UART packets and publishes telemetry to web dashboards.", "Role: Wireless IoT Gateway", RGBColor(147, 51, 234))
]

for idx, (title, desc, role, col) in enumerate(hw_cards):
    if idx < 4:
        c = add_card(s7, 0.8 + idx * 2.95, 1.8, 2.85, 2.45)
    else:
        w = 3.8 if idx < 6 else 4.0
        l = 0.8 if idx == 4 else (4.7 if idx == 5 else 8.6)
        c = add_card(s7, l, 4.4, w - 0.1, 2.45)
    
    tf = c.text_frame
    tf.word_wrap = True
    p1 = tf.paragraphs[0]
    p1.text = title
    p1.font.size = Pt(11.5)
    p1.font.bold = True
    p1.font.color.rgb = col
    p2 = tf.add_paragraph()
    p2.text = desc
    p2.font.size = Pt(9)
    p2.font.color.rgb = COLOR_TEXT_MUTED
    p3 = tf.add_paragraph()
    p3.space_before = Pt(6)
    p3.text = role
    p3.font.size = Pt(8.5)
    p3.font.bold = True
    p3.font.color.rgb = COLOR_TEXT_DARK

# ==============================================================================
# SLIDE 8: Working Principle & Closed-Loop Cycle
# ==============================================================================
s8 = create_base_slide("SYSTEM OPERATION", "Working Principle & Closed-Loop Cycle", "Autonomous Sense-Process-Actuate Cycle")

steps = [
    ("01", "Sensory Polling", [
        "DHT22 queried every 2 seconds via single-wire bus.",
        "LDR analog output sampled via 12-bit ADC.",
        "PIR pin state latched via external GPIO interrupt."
    ], COLOR_PRIMARY),
    ("02", "Threshold Logic", [
        "Compare LDR value to daylight threshold (< 40%).",
        "Compare temperature to thermal comfort brackets.",
        "Check occupancy status against timeout register."
    ], COLOR_ACCENT),
    ("03", "Actuator Dispatch", [
        "Trigger GPIO high/low to energize/open relay coil.",
        "Adjust PWM duty cycle register (TIM2->CCR1).",
        "De-energize all loads if inactivity timer expires."
    ], COLOR_SUCCESS),
    ("04", "Uplink Telemetry", [
        "Assemble structured binary/JSON telemetry frame.",
        "Transmit packet over UART to ESP32 coprocessor.",
        "Publish data to cloud/web monitoring dashboard."
    ], RGBColor(147, 51, 234))
]

for idx, (num, title, items, col) in enumerate(steps):
    c = add_card(s8, 0.8 + idx * 2.95, 1.8, 2.85, 4.3)
    tf = c.text_frame
    tf.word_wrap = True
    p1 = tf.paragraphs[0]
    p1.text = f"STEP {num}\n{title}"
    p1.font.size = Pt(13)
    p1.font.bold = True
    p1.font.color.rgb = col
    for item in items:
        pi = tf.add_paragraph()
        pi.space_before = Pt(8)
        pi.text = "• " + item
        pi.font.size = Pt(9.5)
        pi.font.color.rgb = COLOR_TEXT_MUTED

c_lat = add_card(s8, 0.8, 6.2, 11.7, 0.65, bg_color=COLOR_PRIMARY_LIGHT, border_color=COLOR_PRIMARY)
tf_lat = c_lat.text_frame
p_lat = tf_lat.paragraphs[0]
p_lat.text = "Deterministic Cycle Latency: Sub-50 millisecond decision processing loop guarantees immediate human-perceptible response."
p_lat.font.size = Pt(11)
p_lat.font.bold = True
p_lat.font.color.rgb = COLOR_PRIMARY_DARK
p_lat.alignment = PP_ALIGN.CENTER

# ==============================================================================
# SLIDE 9: Automatic Lighting Control Logic
# ==============================================================================
s9 = create_base_slide("LIGHTING AUTOMATION", "Automatic Lighting Control Logic", "Dual-Condition Occupancy & Daylight Harvesting Algorithm")

# Left Rule Box
c_rule = add_card(s9, 0.8, 1.8, 5.7, 5.0)
tf_r = c_rule.text_frame
tf_r.word_wrap = True
p = tf_r.paragraphs[0]
p.text = "EMBEDDED DECISION RULE"
p.font.size = Pt(12)
p.font.bold = True
p.font.color.rgb = COLOR_PRIMARY

p_code = tf_r.add_paragraph()
p_code.space_before = Pt(10)
p_code.text = "IF (Occupancy == TRUE && AmbientLight < 40%)\n   → RELAY_STATE = ON (Lights Energized)\nELSE\n   → RELAY_STATE = OFF (Lights Extinguished)"
p_code.font.size = Pt(11)
p_code.font.bold = True
p_code.font.color.rgb = COLOR_PRIMARY_DARK

scenarios = [
    ("Scenario A: Occupied + Dark", "Students inside, cloudy day or evening -> LIGHTS ON"),
    ("Scenario B: Occupied + Ample Daylight", "Students inside, bright window sunlight > 40% -> LIGHTS OFF"),
    ("Scenario C: Vacant Classroom", "PIR inactive, zero occupants inside -> LIGHTS OFF")
]
for sc_t, sc_d in scenarios:
    p_sc = tf_r.add_paragraph()
    p_sc.space_before = Pt(10)
    p_sc.text = "• " + sc_t + "\n  " + sc_d
    p_sc.font.size = Pt(10)
    p_sc.font.color.rgb = COLOR_TEXT_MUTED

# Right Flowchart Representation
c_flow = add_card(s9, 6.8, 1.8, 5.7, 5.0, bg_color=RGBColor(15, 23, 42), border_color=RGBColor(30, 41, 59))
tf_fl = c_flow.text_frame
tf_fl.word_wrap = True
p = tf_fl.paragraphs[0]
p.text = "LIGHTING DECISION FLOW\n"
p.font.size = Pt(13)
p.font.bold = True
p.font.color.rgb = RGBColor(96, 165, 250)
p.alignment = PP_ALIGN.CENTER

fl_steps = [
    ("1. Sample PIR Motion Interrupt", RGBColor(241, 245, 249)),
    ("↓  [Human Motion Confirmed?]", RGBColor(148, 163, 184)),
    ("2. Sample LDR Analog Lux Channel", RGBColor(241, 245, 249)),
    ("↓  [Is Daylight < 40% Deficit?]", RGBColor(148, 163, 184)),
    ("YES: Close Relay Coil (Lights ON)", RGBColor(251, 191, 36)),
    ("NO: Open Relay Coil (Lights OFF / Energy Saved)", RGBColor(148, 163, 184))
]
for text, col in fl_steps:
    p_s = tf_fl.add_paragraph()
    p_s.space_before = Pt(6)
    p_s.text = text
    p_s.font.size = Pt(11)
    p_s.font.bold = True
    p_s.font.color.rgb = col
    p_s.alignment = PP_ALIGN.CENTER

# ==============================================================================
# SLIDE 10: Automatic Fan Control Logic
# ==============================================================================
s10 = create_base_slide("FAN SPEED CONTROL", "Automatic Fan & Thermal Regulation", "Multi-Stage Temperature-to-PWM Modulation Logic")

brackets = [
    ("Bracket 1", "< 25.0°C", "Cool Baseline", "0% PWM (Fan OFF)", COLOR_TEXT_MUTED, COLOR_CARD_ALT),
    ("Bracket 2", "25.0°C – 29.9°C", "Warm Mild Heat", "30% PWM (Low Speed)", COLOR_PRIMARY, COLOR_PRIMARY_LIGHT),
    ("Bracket 3", "30.0°C – 34.9°C", "Moderate Thermal Load", "60% PWM (Medium Speed)", RGBColor(6, 182, 212), RGBColor(236, 254, 255)),
    ("Bracket 4", "≥ 35.0°C", "High Heat Load", "100% PWM (Maximum)", COLOR_DANGER, RGBColor(254, 242, 242))
]

for idx, (b_name, b_temp, b_desc, b_pwm, col, bg_col) in enumerate(brackets):
    c = add_card(s10, 0.8 + idx * 2.95, 1.8, 2.85, 3.4, bg_color=bg_col, border_color=col)
    tf = c.text_frame
    tf.word_wrap = True
    p1 = tf.paragraphs[0]
    p1.text = b_name.upper()
    p1.font.size = Pt(10)
    p1.font.bold = True
    p1.font.color.rgb = col
    p2 = tf.add_paragraph()
    p2.text = b_temp
    p2.font.size = Pt(16)
    p2.font.bold = True
    p2.font.color.rgb = COLOR_TEXT_DARK
    p3 = tf.add_paragraph()
    p3.text = b_desc
    p3.font.size = Pt(10)
    p3.font.color.rgb = COLOR_TEXT_MUTED
    p4 = tf.add_paragraph()
    p4.space_before = Pt(12)
    p4.text = b_pwm
    p4.font.size = Pt(12)
    p4.font.bold = True
    p4.font.color.rgb = col

# Bottom technical notes
c_tn1 = add_card(s10, 0.8, 5.4, 5.7, 1.4)
tf_tn1 = c_tn1.text_frame
tf_tn1.word_wrap = True
p = tf_tn1.paragraphs[0]
p.text = "HARDWARE PWM GENERATION"
p.font.size = Pt(11)
p.font.bold = True
p.font.color.rgb = COLOR_PRIMARY
p2 = tf_tn1.add_paragraph()
p2.text = "Configured via STM32 General Purpose Timer (TIM2), clocked at 10 kHz with an 8-bit duty cycle counter (0–255 steps), yielding silent, smooth motor torque control."
p2.font.size = Pt(9.5)
p2.font.color.rgb = COLOR_TEXT_MUTED

c_tn2 = add_card(s10, 6.8, 5.4, 5.7, 1.4)
tf_tn2 = c_tn2.text_frame
tf_tn2.word_wrap = True
p = tf_tn2.paragraphs[0]
p.text = "VACANCY CUT-OFF SAFETY"
p.font.size = Pt(11)
p.font.bold = True
p.font.color.rgb = COLOR_DANGER
p2 = tf_tn2.add_paragraph()
p2.text = "Regardless of high room temperature, if PIR reports zero occupancy for longer than the inactivity timeout, the fan automatically cuts power to 0%."
p2.font.size = Pt(9.5)
p2.font.color.rgb = COLOR_TEXT_MUTED

# ==============================================================================
# SLIDE 11: Embedded System Software Flowchart
# ==============================================================================
s11 = create_base_slide("ALGORITHM FLOW", "Embedded System Software Flowchart", "Deterministic Main Loop Execution Model")

# Flowchart Diagram in Dark Canvas
c_fc = add_card(s11, 0.8, 1.8, 6.8, 5.0, bg_color=RGBColor(15, 23, 42), border_color=RGBColor(30, 41, 59))
tf_fc = c_fc.text_frame
tf_fc.word_wrap = True

fc_nodes = [
    ("[ START / POWER ON ]", COLOR_PRIMARY),
    ("↓  Init Clocks, GPIO, ADC, TIM2 PWM, USART2", RGBColor(148, 163, 184)),
    ("↓  Sample Sensors (DHT22 Temp/Hum, LDR ADC, PIR State)", RGBColor(241, 245, 249)),
    ("↓  < Is Classroom Occupied? >", RGBColor(96, 165, 250)),
    ("YES: Evaluate Light (Lux < 40%)  |  Evaluate Fan PWM", RGBColor(52, 211, 153)),
    ("NO: Decrement Inactivity Latch -> Cut All Loads", RGBColor(248, 113, 113)),
    ("↓  Assemble & Transmit Serial Telemetry Packet to ESP32", RGBColor(192, 132, 252)),
    ("↓  Deterministic Non-blocking Delay -> Repeat Cycle", RGBColor(148, 163, 184))
]
for idx, (node_text, col) in enumerate(fc_nodes):
    p = tf_fc.paragraphs[0] if idx == 0 else tf_fc.add_paragraph()
    if idx > 0:
        p.space_before = Pt(4)
    p.text = node_text
    p.font.size = Pt(10.5)
    p.font.bold = True
    p.font.color.rgb = col
    p.alignment = PP_ALIGN.CENTER

# Right Explanatory Box
c_fcr = add_card(s11, 7.9, 1.8, 4.6, 5.0)
tf_fcr = c_fcr.text_frame
tf_fcr.word_wrap = True
p = tf_fcr.paragraphs[0]
p.text = "DETERMINISTIC EMBEDDED CONTROL"
p.font.size = Pt(13)
p.font.bold = True
p.font.color.rgb = COLOR_TEXT_DARK

fc_notes = [
    ("No Blocking Delays:", " Hardware interrupts and non-blocking timers maintain continuous responsiveness."),
    ("Fail-Safe Design:", " In the event of sensor timeout or disconnection, actuators default to safe unpowered state."),
    ("Hardware Watchdog:", " Independent Watchdog (IWDG) automatically reboots system if main loop hangs."),
    ("Brownout Protection:", " Embedded BOR ensures reliable reset during power fluctuations.")
]
for k, v in fc_notes:
    p_n = tf_fcr.add_paragraph()
    p_n.space_before = Pt(10)
    r1 = p_n.add_run()
    r1.text = "• " + k
    r1.font.bold = True
    r1.font.size = Pt(10.5)
    r1.font.color.rgb = COLOR_PRIMARY
    r2 = p_n.add_run()
    r2.text = v
    r2.font.size = Pt(10)
    r2.font.color.rgb = COLOR_TEXT_MUTED

# ==============================================================================
# SLIDE 12: Software Stack & IoT Communication
# ==============================================================================
s12 = create_base_slide("COMMUNICATION PROTOCOL", "Software Stack & IoT Communication", "STM32 Embedded Firmware & ESP32 Network Bridge")

# STM32 Firmware Card
c_sw1 = add_card(s12, 0.8, 1.8, 5.7, 5.0)
tf_sw1 = c_sw1.text_frame
tf_sw1.word_wrap = True
p = tf_sw1.paragraphs[0]
p.text = "STM32 EMBEDDED FIRMWARE\nBare-Metal C / STM32CubeIDE / HAL"
p.font.size = Pt(13)
p.font.bold = True
p.font.color.rgb = COLOR_PRIMARY

sw1_items = [
    ("Hardware Abstraction Layer (HAL):", " Clean register abstractions for GPIO, ADC1, TIM2, and USART2 peripherals."),
    ("Interrupt Service Routines (ISR):", " EXTI pin trigger for immediate PIR motion event capture without CPU polling overhead."),
    ("Structured Serial Packet Format:", " Serializes telemetry frames: #TEMP:28.5,HUM:55,LUX:32,PIR:1,FAN:60,LIGHT:1$"),
    ("Deterministic Timing:", " Strict loop scheduling with zero memory fragmentation.")
]
for k, v in sw1_items:
    pi = tf_sw1.add_paragraph()
    pi.space_before = Pt(10)
    r1 = pi.add_run()
    r1.text = "• " + k
    r1.font.bold = True
    r1.font.size = Pt(10.5)
    r1.font.color.rgb = COLOR_TEXT_DARK
    r2 = pi.add_run()
    r2.text = v
    r2.font.size = Pt(10)
    r2.font.color.rgb = COLOR_TEXT_MUTED

# ESP32 Gateway Card
c_sw2 = add_card(s12, 6.8, 1.8, 5.7, 5.0)
tf_sw2 = c_sw2.text_frame
tf_sw2.word_wrap = True
p = tf_sw2.paragraphs[0]
p.text = "ESP32 WIRELESS GATEWAY\nWi-Fi 802.11 b/g/n / FreeRTOS"
p.font.size = Pt(13)
p.font.bold = True
p.font.color.rgb = RGBColor(147, 51, 234)

sw2_items = [
    ("Hardware UART Ring Buffer:", " Reads STM32 packet stream via UART RX/TX without loading the main STM32 control core."),
    ("Campus Wi-Fi Stack:", " Establishes connection to institutional Wi-Fi access points using WPA2-Enterprise / WPA2-PSK."),
    ("Telemetry Serving:", " Hosts asynchronous WebSocket or HTTP REST endpoints for real-time monitoring and manual override commands."),
    ("Decoupled Reliability:", " STM32 control continues operating safely even if Wi-Fi disconnects.")
]
for k, v in sw2_items:
    pi = tf_sw2.add_paragraph()
    pi.space_before = Pt(10)
    r1 = pi.add_run()
    r1.text = "• " + k
    r1.font.bold = True
    r1.font.size = Pt(10.5)
    r1.font.color.rgb = COLOR_TEXT_DARK
    r2 = pi.add_run()
    r2.text = v
    r2.font.size = Pt(10)
    r2.font.color.rgb = COLOR_TEXT_MUTED

# ==============================================================================
# SLIDE 13: Expected Operation & Test Scenarios
# ==============================================================================
s13 = create_base_slide("SIMULATION & VALIDATION", "Expected Operation & Test Scenarios", "System Response Under Realistic Field Conditions")

scenarios_list = [
    ("Scenario 01: Classroom Vacant at Morning (7:00 AM)", "PIR reports 0 occupancy, external lux 20%, room temp 22°C.", "Lights: OFF | Fan: 0% (Idle Baseline)", COLOR_TEXT_MUTED),
    ("Scenario 02: Students Enter on Rainy Morning (8:00 AM)", "PIR triggers active, external lux drops to 15% (insufficient daylight).", "Lights: ON (Auto Relay) | Fan: 0%", COLOR_ACCENT),
    ("Scenario 03: Sunny Afternoon Lecture (1:00 PM)", "Classroom fully occupied, outdoor solar lux surges to 85%, room temp hits 32°C.", "Lights: OFF (Daylight Harvest) | Fan: 60% PWM", COLOR_PRIMARY),
    ("Scenario 04: Summer Heat Wave Peak (3:00 PM)", "Classroom occupied, thermal load surges to 37.5°C.", "Lights: Evaluated | Fan: 100% PWM Max Airflow", COLOR_DANGER),
    ("Scenario 05: Class Dismissal / Evening Exit (5:00 PM)", "Students exit through doorway; PIR latches clear; inactivity countdown expires.", "Zero Waste Shutdown: All Actuators OFF", COLOR_SUCCESS)
]

for idx, (title, cond, resp, col) in enumerate(scenarios_list):
    c = add_card(s13, 0.8, 1.8 + idx * 1.0, 11.7, 0.88)
    tf = c.text_frame
    tf.word_wrap = True
    p1 = tf.paragraphs[0]
    p1.text = title + "  ->  " + resp
    p1.font.size = Pt(11)
    p1.font.bold = True
    p1.font.color.rgb = col
    p2 = tf.add_paragraph()
    p2.text = cond
    p2.font.size = Pt(9.5)
    p2.font.color.rgb = COLOR_TEXT_MUTED

# ==============================================================================
# SLIDE 14: Advantages & Future Expansion
# ==============================================================================
s14 = create_base_slide("EVALUATION & ROADMAP", "Advantages & Future Expansion", "Quantifiable Engineering Benefits and Next-Phase Roadmap")

# Left Column: Advantages
c_adv = add_card(s14, 0.8, 1.8, 5.7, 5.0)
tf_adv = c_adv.text_frame
tf_adv.word_wrap = True
p = tf_adv.paragraphs[0]
p.text = "CORE ADVANTAGES"
p.font.size = Pt(13)
p.font.bold = True
p.font.color.rgb = COLOR_PRIMARY

adv_items = [
    ("Up to 40% Energy Reduction:", " Eliminates human error, parasitic overnight loads, and unnecessary midday artificial lighting troffers."),
    ("Autonomous Student Comfort:", " Continuous proportional cooling prevents classroom thermal fatigue during intense lectures."),
    ("Decoupled Dual-Processor Architecture:", " STM32 ensures rock-solid deterministic safety even if Wi-Fi or cloud networks disconnect."),
    ("Low Institutional Retrofit Cost:", " Compatible with standard legacy 230V fluorescent/LED arrays and common ceiling fan installations.")
]
for k, v in adv_items:
    pi = tf_adv.add_paragraph()
    pi.space_before = Pt(10)
    r1 = pi.add_run()
    r1.text = "✔ " + k
    r1.font.bold = True
    r1.font.size = Pt(10.5)
    r1.font.color.rgb = COLOR_PRIMARY
    r2 = pi.add_run()
    r2.text = v
    r2.font.size = Pt(10)
    r2.font.color.rgb = COLOR_TEXT_MUTED

# Right Column: Future Scope
c_fs = add_card(s14, 6.8, 1.8, 5.7, 5.0)
tf_fs = c_fs.text_frame
tf_fs.word_wrap = True
p = tf_fs.paragraphs[0]
p.text = "FUTURE EXPANSION ROADMAP"
p.font.size = Pt(13)
p.font.bold = True
p.font.color.rgb = COLOR_SUCCESS

fs_items = [
    ("Campus-Wide Mesh Deployment:", " Implement ESP-NOW or LoRaWAN mesh networking across hundreds of university lecture halls and labs."),
    ("Predictive Pre-Cooling with ML:", " Integrate academic timetable databases to automatically pre-condition rooms 5 minutes before scheduled classes."),
    ("Hardware Current Shunt Monitoring:", " Integrate INA219 current sensors to log exact real-time kilowatt-hour power consumption curves."),
    ("Automated Window Blind Actuation:", " Modulate motorized motorized blinds based on sun glare angle.")
]
for k, v in fs_items:
    pi = tf_fs.add_paragraph()
    pi.space_before = Pt(10)
    r1 = pi.add_run()
    r1.text = "➔ " + k
    r1.font.bold = True
    r1.font.size = Pt(10.5)
    r1.font.color.rgb = COLOR_SUCCESS
    r2 = pi.add_run()
    r2.text = v
    r2.font.size = Pt(10)
    r2.font.color.rgb = COLOR_TEXT_MUTED

# ==============================================================================
# SLIDE 15: Conclusion
# ==============================================================================
s15 = create_base_slide("FINAL SUMMARY", "Conclusion", "Project Summary & Engineering Value Proposition")

c_con = add_card(s15, 0.8, 1.8, 7.5, 5.0)
tf_con = c_con.text_frame
tf_con.word_wrap = True
p = tf_con.paragraphs[0]
p.text = "PROJECT SUMMARY"
p.font.size = Pt(13)
p.font.bold = True
p.font.color.rgb = COLOR_PRIMARY

p_desc = tf_con.add_paragraph()
p_desc.space_before = Pt(8)
p_desc.text = "The proposed Smart Classroom Automation System Using STM32 delivers an integrated, cost-effective, and highly reliable embedded solution to combat energy waste in institutional academic facilities."
p_desc.font.size = Pt(11)
p_desc.font.color.rgb = COLOR_TEXT_DARK

con_bullets = [
    ("Multi-Sensory Closed-Loop Control:", " Combines ambient lux (LDR), passive motion (PIR), and digital temperature/humidity (DHT22) for accurate decisions."),
    ("Energy & Comfort Balance:", " Eliminates daylight redundancy and empty classroom waste while maintaining adaptive proportional ventilation."),
    ("Dual-Layer IoT Scalability:", " Robust STM32 hardware controller paired with ESP32 Wi-Fi gateway for centralized facility oversight.")
]
for k, v in con_bullets:
    pi = tf_con.add_paragraph()
    pi.space_before = Pt(10)
    r1 = pi.add_run()
    r1.text = "• " + k
    r1.font.bold = True
    r1.font.size = Pt(10.5)
    r1.font.color.rgb = COLOR_PRIMARY
    r2 = pi.add_run()
    r2.text = v
    r2.font.size = Pt(10)
    r2.font.color.rgb = COLOR_TEXT_MUTED

p_motto = tf_con.add_paragraph()
p_motto.space_before = Pt(16)
p_motto.text = "\"Smarter Classroom, Better Comfort, Efficient Energy Use\""
p_motto.font.size = Pt(13)
p_motto.font.bold = True
p_motto.font.italic = True
p_motto.font.color.rgb = COLOR_PRIMARY_DARK

# Right Picture
if os.path.exists(IMAGE_STM32):
    s15.shapes.add_picture(IMAGE_STM32, Inches(8.6), Inches(1.8), Inches(3.9), Inches(4.0))

# ==============================================================================
# SLIDE 16: Thank You / Viva Q&A
# ==============================================================================
s16 = prs.slides.add_slide(blank_slide_layout)
bg16 = s16.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
bg16.fill.solid()
bg16.fill.fore_color.rgb = COLOR_BG
bg16.line.fill.background()

c_ty = add_card(s16, 2.5, 1.5, 8.333, 4.5, bg_color=COLOR_CARD_BG, border_color=COLOR_BORDER)
tf_ty = c_ty.text_frame
tf_ty.word_wrap = True

p1 = tf_ty.paragraphs[0]
p1.text = "THANK YOU"
p1.font.size = Pt(38)
p1.font.bold = True
p1.font.color.rgb = COLOR_TEXT_DARK
p1.alignment = PP_ALIGN.CENTER

p2 = tf_ty.add_paragraph()
p2.space_before = Pt(10)
p2.text = "Questions, Discussions & Evaluator Feedback"
p2.font.size = Pt(16)
p2.font.bold = True
p2.font.color.rgb = COLOR_PRIMARY
p2.alignment = PP_ALIGN.CENTER

p3 = tf_ty.add_paragraph()
p3.space_before = Pt(20)
p3.text = "Project: Smart Classroom Automation System Using STM32\nDepartment of Electronics & Communication / Embedded Systems Engineering"
p3.font.size = Pt(12)
p3.font.color.rgb = COLOR_TEXT_MUTED
p3.alignment = PP_ALIGN.CENTER

p4 = tf_ty.add_paragraph()
p4.space_before = Pt(16)
p4.text = "Interactive 3D Digital Twin Simulation Available for Live Evaluation Demonstration"
p4.font.size = Pt(12)
p4.font.bold = True
p4.font.color.rgb = COLOR_SUCCESS
p4.alignment = PP_ALIGN.CENTER

# Output presentation
output_dir = os.path.join(PROJECT_ROOT, "presentation")
os.makedirs(output_dir, exist_ok=True)
output_path = os.path.join(output_dir, "Smart_Classroom_Automation_System_STM32.pptx")
prs.save(output_path)
print(f"SUCCESS: PPTX generated at {output_path} with {len(prs.slides)} slides")
