import os
import re
import xml.sax.saxutils as saxutils

# Read travellers block from existing dark.svg or vortex_dark.svg
source_svg = None
for candidate in ['vortex_dark.svg', '.github/assets/dark.svg', 'dark.svg', 'public/dark.svg']:
    if os.path.exists(candidate):
        with open(candidate, 'r', encoding='utf-8') as f:
            c = f.read()
            if '<g class="travellers">' in c:
                source_svg = c
                break

if not source_svg:
    raise ValueError("Could not find any SVG with travellers layer")

travellers_match = re.search(r'(<!-- TRAVELLER DOTS LAYER.*?-->\s*<g class="travellers">.*?</g>|<g class="travellers">.*?</g>)', source_svg, re.DOTALL)
if not travellers_match:
    raise ValueError("Could not find travellers layer")
travellers_xml = travellers_match.group(1)

# Read Gourab portrait path
with open('gourab_portrait_path.txt', 'r', encoding='utf-8') as f:
    gourab_portrait_path = f.read().strip()

rows_data = [
    ("Subject", "Gourab Dutta"),
    ("Role", "Robotics & IoT Architect • Computer Vision"),
    ("Origin", "Howrah, West Bengal, India"),
    ("Education", "B.Tech ECE, Academy of Technology (MAKAUT)"),
    ("Status", "4x Hackathon Winner • Building • Shipping"),
    ("ToolChain", "PlatformIO, Git, VS Code, Linux, KiCad, ROS, Docker"),
    ("Core.Lang", "C • C++ • Python • JavaScript • TypeScript"),
    ("Core.Hardware", "ESP32 • STM32 • Arduino • Raspberry Pi"),
    ("Core.Vision", "OpenCV • MediaPipe • YOLOv8 • Signal Processing"),
    ("Core.Protocols", "UART • SPI • I2C • MQTT • Wi-Fi • BLE"),
    ("Core.Web", "Node.js • React • WebSocket • Tailwind CSS"),
    ("Grid.Mail", "gourabd911@gmail.com"),
    ("Grid.Portfolio", "https://portfolio-354.vercel.app"),
    ("Grid.LinkedIn", "linkedin.com/in/gourabdutta354"),
    ("Grid.GitHub", "github.com/gourab354")
]

char_w = 8.4
info_rows_xml = []
start_y = 136
step_y = 28

for i, (label, val) in enumerate(rows_data):
    y = start_y + i * step_y
    x1 = 478 + len(label) * 8.8 + 12
    text_len = int(round(len(val) * char_w))
    x2 = 1130 - text_len - 12
    
    escaped_label = saxutils.escape(label)
    escaped_val = saxutils.escape(val)
    
    row_xml = f"""<g class="info-row">
  <text x="478" y="{y}" font-family="'Fira Code', 'Cascadia Code', monospace" font-size="14" font-weight="600" fill="#E52712">{escaped_label}</text>
  <line x1="{x1:.1f}" y1="{y-4}" x2="{x2:.1f}" y2="{y-4}" stroke="#E52712" stroke-width="1" stroke-dasharray="2 4" opacity="0.5"/>
  <text x="1130" y="{y}" font-family="'Fira Code', 'Cascadia Code', monospace" font-size="14" fill="#FFFFFF" text-anchor="end" textLength="{text_len}" lengthAdjust="spacingAndGlyphs">{escaped_val}</text>
</g>"""
    info_rows_xml.append(row_xml)

all_rows_str = "\n".join(info_rows_xml)

svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1180 610" width="1180" height="610">
  <defs>
    <style>
      @keyframes pulse-live {{
        0%, 100% {{ opacity: 1; transform: scale(1); }}
        50% {{ opacity: 0.3; transform: scale(0.85); }}
      }}
      .live-dot {{
        animation: pulse-live 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        transform-origin: 975px 90px;
      }}
      @keyframes portrait-drift {{
        0%, 10.0% {{ transform: translate(0px, 0px); opacity: 1; }}
        14.0%, 80.0% {{ transform: translate(-35px, 18px); opacity: 0.12; }}
        84.0%, 100% {{ transform: translate(0px, 0px); opacity: 1; }}
      }}
      .drift-portrait {{
        animation: portrait-drift 25.0s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      }}
      @keyframes intro-shimmer {{
        0% {{ opacity: 0; }}
        100% {{ opacity: 1; }}
      }}
      .intro-layer {{
        animation: intro-shimmer 2.0s ease-out 1 forwards;
      }}
    </style>
  </defs>

  <!-- Background Canvas -->
  <rect width="1180" height="610" fill="#000000" rx="16"/>

  <!-- Main Terminal Window Outer Container -->
  <rect x="16" y="16" width="1148" height="578" fill="#0A0A0A" stroke="#262626" stroke-width="1.5" rx="12"/>

  <!-- Terminal Window Title Bar Header -->
  <path d="M 16 28 A 12 12 0 0 1 28 16 L 1152 16 A 12 12 0 0 1 1164 28 L 1164 56 L 16 56 Z" fill="#121212"/>
  <line x1="16" y1="56" x2="1164" y2="56" stroke="#262626" stroke-width="1"/>

  <!-- Nothing Tech Red Accent Terminal Button + Dots -->
  <circle cx="42" cy="36" r="6" fill="#E52712"/>
  <circle cx="62" cy="36" r="6" fill="#71717A" opacity="0.6"/>
  <circle cx="82" cy="36" r="6" fill="#71717A" opacity="0.6"/>

  <!-- Terminal Title -->
  <text x="590" y="41" font-family="'Fira Code', 'Cascadia Code', monospace" font-size="13" font-weight="600" fill="#71717A" text-anchor="middle">profile.sh --live</text>

  <!-- Left Panel: VISUAL.MAP Frame -->
  <rect x="36" y="72" width="400" height="502" fill="none" stroke="#262626" stroke-width="1" rx="8" stroke-dasharray="3 3"/>
  <text x="52" y="94" font-family="'Fira Code', monospace" font-size="12" font-weight="700" fill="#E52712" letter-spacing="1.5">[ VISUAL.MAP ]</text>

  <!-- Right Panel: SYSTEM.INFO Frame Header & Controls -->
  <rect x="456" y="72" width="692" height="502" fill="none" stroke="#262626" stroke-width="1" rx="8"/>
  <text x="478" y="94" font-family="'Fira Code', monospace" font-size="13" font-weight="700" fill="#E52712" letter-spacing="1.5">[ SYSTEM.INFO ]</text>

  <!-- Pulsing Nothing Red LIVE Badge -->
  <g class="live-badge">
    <circle class="live-dot" cx="975" cy="90" r="5" fill="#E52712"/>
    <text x="987" y="94" font-family="'Fira Code', monospace" font-size="12" font-weight="700" fill="#E52712">LIVE</text>
  </g>

  <!-- Nothing Red Pill with Handle -->
  <rect x="1030" y="78" width="108" height="22" rx="11" fill="#E52712" opacity="0.15"/>
  <rect x="1030" y="78" width="108" height="22" rx="11" fill="none" stroke="#E52712" stroke-width="1" opacity="0.6"/>
  <text x="1084" y="93" font-family="'Fira Code', monospace" font-size="12" font-weight="700" fill="#E52712" text-anchor="middle">@gourab354</text>

  <!-- PORTRAIT LAYER (Layer 1: White Dot Matrix) -->
  <g class="intro-layer">
    <g class="drift-portrait">
      <path d="{gourab_portrait_path}" fill="#FFFFFF" shape-rendering="crispEdges"/>
    </g>
  </g>

  {travellers_xml}

  <!-- INFO PANEL READOUT ROWS -->
  <g class="info-readout">
  {all_rows_str}
  </g>
</svg>"""

out_paths = [
    os.path.join('.github', 'assets', 'dark.svg'),
    'dark.svg',
    os.path.join('public', 'dark.svg')
]

for p in out_paths:
    with open(p, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print(f"Generated {p} successfully! Size: {len(svg_content)} bytes")
