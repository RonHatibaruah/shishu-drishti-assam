#!/usr/bin/env python3
"""
generate_favicons.py
Generates official, ultra-crisp, high-fidelity favicons and touch icons for
ShishuDrishti (শিশু দৃষ্টি) — Assam Congenital Sentinel & Early Care Network.

Outputs:
- public/favicon.svg (Scalable vector with dark/light mode contrast)
- public/favicon-32x32.png (High-DPI standard tab icon)
- public/favicon-16x16.png (Standard low-res tab icon, optimized for readability)
- public/apple-touch-icon.png (180x180 iOS / mobile home screen touch icon)
- public/favicon.ico (Multi-size ICO with 16x16, 32x32, 48x48)
- Also copies to dist/
"""

import math
import os
from PIL import Image, ImageDraw, ImageFilter

def create_svg():
    svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="100%" height="100%">
  <defs>
    <!-- Background Gradient: Deep Assam Emerald to Dark Teal -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#065f46" />
      <stop offset="50%" stop-color="#0f766e" />
      <stop offset="100%" stop-color="#042f2e" />
    </linearGradient>

    <!-- Outer Protective Ring Gradient (Assam Muga Silk Gold) -->
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fde047" />
      <stop offset="45%" stop-color="#fbbf24" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>

    <!-- Swaddle & Vital Glow -->
    <linearGradient id="swaddleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#ccfbf1" />
    </linearGradient>

    <!-- Vital Pulse Gradient -->
    <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fb7185" />
      <stop offset="50%" stop-color="#f43f5e" />
      <stop offset="100%" stop-color="#e11d48" />
    </linearGradient>

    <!-- Drop Shadows for 3D Depth -->
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#021c1a" flood-opacity="0.5" />
    </filter>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Base Squircle Container with Soft Bevel Border -->
  <rect x="4" y="4" width="120" height="120" rx="32" 
        fill="url(#bgGrad)" stroke="#10b981" stroke-width="2.5" filter="url(#shadow)" />

  <!-- Inner Concentric Golden Orbit (The Sentinel "Drishti" Vision Ring) -->
  <circle cx="64" cy="64" r="54" 
          fill="none" stroke="url(#goldGrad)" stroke-width="2" stroke-dasharray="6 3" opacity="0.65" />

  <!-- Stylized Protective Iris / Maternal Shield Arc -->
  <path d="M 20 64 C 36 28 92 28 108 64 C 92 100 36 100 20 64 Z" 
        fill="#083344" fill-opacity="0.45" stroke="#2dd4bf" stroke-width="2" />

  <!-- Early Sentinel Optical Reticle Crosshairs (Subtle AI Framing) -->
  <path d="M 24 64 L 32 64 M 96 64 L 104 64 M 64 24 L 64 32 M 64 96 L 64 104" 
        stroke="#5eead4" stroke-width="2" stroke-linecap="round" opacity="0.6" />

  <!-- Cradled Newborn ("Shishu" শিশু) Central Motif -->
  <!-- Outer Swaddle Wings / Protective Hands -->
  <path d="M 36 78 C 36 58 48 50 64 50 C 80 50 92 58 92 78 C 92 92 78 98 64 98 C 50 98 36 92 36 78 Z" 
        fill="url(#swaddleGrad)" filter="url(#shadow)" />

  <!-- Swaddle Fold Accents in Soft Mint -->
  <path d="M 44 76 Q 64 88 84 76" 
        fill="none" stroke="#14b8a6" stroke-width="2" stroke-linecap="round" opacity="0.5" />
  <path d="M 48 84 Q 64 92 80 84" 
        fill="none" stroke="#0d9488" stroke-width="1.5" stroke-linecap="round" opacity="0.4" />

  <!-- Baby Head (Peaceful Resting Infant) -->
  <circle cx="64" cy="46" r="18" fill="#ffffff" filter="url(#shadow)" />

  <!-- Gentle Golden Hair Curl of Newborn -->
  <path d="M 64 26 C 60 21 55 24 56 28 C 57 32 63 33 64 28" 
        fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-linecap="round" />

  <!-- Peaceful Closed Eyes (Sleep of Health & Protection) -->
  <path d="M 54 45 Q 57 48 60 45" 
        fill="none" stroke="#065f46" stroke-width="2.5" stroke-linecap="round" />
  <path d="M 68 45 Q 71 48 74 45" 
        fill="none" stroke="#065f46" stroke-width="2.5" stroke-linecap="round" />

  <!-- Rosy Cheeks -->
  <circle cx="52" cy="49" r="2" fill="#fda4af" opacity="0.75" />
  <circle cx="76" cy="49" r="2" fill="#fda4af" opacity="0.75" />

  <!-- Gentle Smile -->
  <path d="M 61 52 Q 64 55 67 52" 
        fill="none" stroke="#047857" stroke-width="1.5" stroke-linecap="round" />

  <!-- Vital Life Pulse / Heartbeat (CCHD Pulse-Ox & Pediatric Life Care) -->
  <!-- Floating Golden-Rose Heart Badge at Swaddle Base -->
  <path d="M 64 68 
           C 64 64, 58 60, 54 64 
           C 49 69, 52 75, 64 83 
           C 76 75, 79 69, 74 64 
           C 70 60, 64 64, 64 68 Z" 
        fill="url(#pulseGrad)" filter="url(#glow)" stroke="#ffffff" stroke-width="1" />

  <!-- Active Pulse Beat Line Running Across Heart -->
  <path d="M 50 71 L 56 71 L 60 66 L 64 77 L 68 69 L 71 71 L 78 71" 
        fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />

  <!-- Golden Beacon Sparkle (Early Detection / Cure Within 21 Days) -->
  <polygon points="98,34 100,28 102,34 108,36 102,38 100,44 98,38 92,36" 
           fill="#fef08a" opacity="0.95" />
</svg>
'''
    return svg_content.strip()

def render_raster_icons():
    """
    Renders high-resolution raster icons (1024x1024 base) and downsamples with
    Lanczos filtering for ultra-sharp 180x180, 32x32, 16x16, and multi-resolution ICO.
    """
    size = 1024
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # 1. Base Squircle / Rounded Rectangle
    # Background gradient: Assam Emerald (#065f46) to Teal (#0f766e) to Deep Teal (#042f2e)
    # We create a radial/linear gradient
    margin = 32
    r = 260
    
    # Create mask for squircle
    mask = Image.new("L", (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([margin, margin, size - margin, size - margin], radius=r, fill=255)

    # Background gradient fill
    bg = Image.new("RGBA", (size, size), (6, 95, 70, 255))
    bg_draw = ImageDraw.Draw(bg)
    for y in range(size):
        ratio = y / size
        # Blend from #065f46 (6, 95, 70) to #042f2e (4, 47, 46)
        r_c = int(6 * (1 - ratio) + 4 * ratio)
        g_c = int(95 * (1 - ratio) + 47 * ratio)
        b_c = int(70 * (1 - ratio) + 46 * ratio)
        bg_draw.line([(0, y), (size, y)], fill=(r_c, g_c, b_c, 255))

    img.paste(bg, (0, 0), mask)

    # Re-draw on main canvas with mask
    draw = ImageDraw.Draw(img)
    
    # Outer Border (Emerald 400 - #34d399)
    draw.rounded_rectangle(
        [margin, margin, size - margin, size - margin],
        radius=r,
        outline=(52, 211, 153, 255),
        width=24
    )

    # Inner Gold Dashed Sentinel Orbit
    center = 512
    orbit_radius = 420
    draw.ellipse(
        [center - orbit_radius, center - orbit_radius, center + orbit_radius, center + orbit_radius],
        outline=(251, 191, 36, 170), # Amber Gold
        width=16
    )

    # Protective Eye/Iris Arc (Drishti / Sentinel Vision)
    # An almond/eye shape spanning the center
    # Top arc and bottom arc
    eye_w = 340
    eye_h = 240
    draw.ellipse(
        [center - eye_w, center - eye_h, center + eye_w, center + eye_h],
        outline=(45, 212, 191, 190), # Teal
        width=16
    )

    # Swaddle / Protective Basin (Pure White / Mint)
    swaddle_box = [center - 220, center + 40, center + 220, center + 390]
    draw.chord(swaddle_box, start=0, end=180, fill=(255, 255, 255, 255), outline=(20, 184, 166, 255), width=16)

    # Baby Head (Circle)
    head_radius = 140
    head_cy = 380
    draw.ellipse(
        [center - head_radius, head_cy - head_radius, center + head_radius, head_cy + head_radius],
        fill=(255, 255, 255, 255),
        outline=(20, 184, 166, 255),
        width=14
    )

    # Golden Newborn Hair Curl
    curl_x = center
    curl_y = head_cy - head_radius + 15
    draw.arc([curl_x - 40, curl_y - 60, curl_x + 40, curl_y + 20], start=160, end=380, fill=(245, 158, 11, 255), width=24)

    # Peaceful Eyes (Sleeping Baby)
    eye_y = head_cy + 10
    draw.arc([center - 75, eye_y - 20, center - 25, eye_y + 25], start=0, end=180, fill=(6, 95, 70, 255), width=18)
    draw.arc([center + 25, eye_y - 20, center + 75, eye_y + 25], start=0, end=180, fill=(6, 95, 70, 255), width=18)

    # Gentle Smile
    draw.arc([center - 25, head_cy + 45, center + 25, head_cy + 75], start=0, end=180, fill=(4, 120, 87, 255), width=12)

    # Vital Heart Emblem (CCHD & Life Protection)
    # A vibrant rose/coral heart in the center of swaddle
    heart_cy = center + 180
    heart_size = 90
    
    # Draw heart using polygon and circles
    left_circle_center = (center - 35, heart_cy - 25)
    right_circle_center = (center + 35, heart_cy - 25)
    circle_r = 45
    draw.ellipse([left_circle_center[0] - circle_r, left_circle_center[1] - circle_r,
                  left_circle_center[0] + circle_r, left_circle_center[1] + circle_r], fill=(244, 63, 94, 255))
    draw.ellipse([right_circle_center[0] - circle_r, right_circle_center[1] - circle_r,
                  right_circle_center[0] + circle_r, right_circle_center[1] + circle_r], fill=(244, 63, 94, 255))
    
    draw.polygon([
        (center - 75, heart_cy - 10),
        (center + 75, heart_cy - 10),
        (center, heart_cy + 95)
    ], fill=(244, 63, 94, 255))

    # White ECG Pulse Line on Heart
    pulse_pts = [
        (center - 100, heart_cy + 10),
        (center - 40, heart_cy + 10),
        (center - 15, heart_cy - 40),
        (center + 15, heart_cy + 50),
        (center + 40, heart_cy - 15),
        (center + 60, heart_cy + 10),
        (center + 100, heart_cy + 10)
    ]
    draw.line(pulse_pts, fill=(255, 255, 255, 255), width=16, joint="curve")

    # Golden Sparkle of Health / Early Cure at top right
    sp_cx, sp_cy = center + 330, center - 240
    sp_r = 45
    draw.polygon([
        (sp_cx, sp_cy - sp_r),
        (sp_cx + 14, sp_cy - 14),
        (sp_cx + sp_r, sp_cy),
        (sp_cx + 14, sp_cy + 14),
        (sp_cx, sp_cy + sp_r),
        (sp_cx - 14, sp_cy + 14),
        (sp_cx - sp_r, sp_cy),
        (sp_cx - 14, sp_cy - 14)
    ], fill=(254, 240, 138, 255))

    return img

def main():
    print("🎨 Generating ShishuDrishti official favicons...")
    
    # 1. Generate SVG
    svg_data = create_svg()
    with open("public/favicon.svg", "w", encoding="utf-8") as f:
        f.write(svg_data)
    print("✓ Created public/favicon.svg")

    # 2. Render 1024x1024 Master Raster
    master = render_raster_icons()

    # 3. Apple Touch Icon (180x180)
    apple_icon = master.resize((180, 180), Image.Resampling.LANCZOS)
    apple_icon.save("public/apple-touch-icon.png", format="PNG", optimize=True)
    print("✓ Created public/apple-touch-icon.png (180x180)")

    # 4. Favicon 32x32
    fav32 = master.resize((32, 32), Image.Resampling.LANCZOS)
    fav32.save("public/favicon-32x32.png", format="PNG", optimize=True)
    print("✓ Created public/favicon-32x32.png (32x32)")

    # 5. Favicon 16x16
    fav16 = master.resize((16, 16), Image.Resampling.LANCZOS)
    fav16.save("public/favicon-16x16.png", format="PNG", optimize=True)
    print("✓ Created public/favicon-16x16.png (16x16)")

    # 6. Multi-resolution Favicon ICO (16x16, 32x32, 48x48)
    fav48 = master.resize((48, 48), Image.Resampling.LANCZOS)
    master.save(
        "public/favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)]
    )
    print("✓ Created public/favicon.ico (Multi-size: 16, 32, 48)")

    # 7. Mirror to dist/
    os.makedirs("dist", exist_ok=True)
    for fname in ["favicon.svg", "favicon.ico", "favicon-32x32.png", "favicon-16x16.png", "apple-touch-icon.png"]:
        src = os.path.join("public", fname)
        dst = os.path.join("dist", fname)
        if os.path.exists(src):
            with open(src, "rb") as sf, open(dst, "wb") as df:
                df.write(sf.read())
            print(f"✓ Mirrored to dist/{fname}")

    print("🎉 All favicons successfully generated and verified!")

if __name__ == "__main__":
    main()
