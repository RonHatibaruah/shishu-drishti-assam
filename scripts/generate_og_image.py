#!/usr/bin/env python3
"""
generate_og_image.py
Generates the official 1200x630 Open Graph (og:image.jpg) for ShishuDrishti (শিশু দৃষ্টি).
Designed for maximum social share impact on WhatsApp, Twitter, LinkedIn, and Facebook previews.
"""

import math
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_og_image():
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), (6, 32, 29)) # Deep emerald base
    draw = ImageDraw.Draw(img)

    # 1. Background Gradient: Deep slate to rich Assam emerald/teal
    for y in range(H):
        ratio = y / H
        # Blend from #021a17 (2, 26, 23) to #064e3b (6, 78, 59) to #091e28 (9, 30, 40)
        if ratio < 0.5:
            sub = ratio / 0.5
            r = int(2 * (1 - sub) + 6 * sub)
            g = int(26 * (1 - sub) + 78 * sub)
            b = int(23 * (1 - sub) + 59 * sub)
        else:
            sub = (ratio - 0.5) / 0.5
            r = int(6 * (1 - sub) + 9 * sub)
            g = int(78 * (1 - sub) + 30 * sub)
            b = int(59 * (1 - sub) + 40 * sub)
        draw.line([(0, y), (W, y)], fill=(r, g, b))

    # 2. Geometric High-Tech Grid & Telemetry Orbits (Subtle lines)
    grid_color = (20, 184, 166, 28) # Subtle teal
    # Vertical grid
    for x in range(0, W, 60):
        draw.line([(x, 0), (x, H)], fill=grid_color, width=1)
    # Horizontal grid
    for y in range(0, H, 60):
        draw.line([(0, y), (W, y)], fill=grid_color, width=1)

    # Ambient Glow Orbits on the right side behind the hero card
    cx, cy = 940, 315
    for radius in [120, 200, 280, 360]:
        draw.ellipse([cx - radius, cy - radius, cx + radius, cy + radius],
                     outline=(45, 212, 191, 35), width=1)

    # 3. Fonts Setup
    font_bold = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
    font_reg = "/System/Library/Fonts/Supplemental/Arial.ttf"
    font_bengali = "/System/Library/Fonts/KohinoorBangla.ttc"
    font_helv = "/System/Library/Fonts/Helvetica.ttc"

    f_title = ImageFont.truetype(font_bold, 62)
    f_bengali_title = ImageFont.truetype(font_bengali, 52)
    f_tagline = ImageFont.truetype(font_bold, 24)
    f_desc = ImageFont.truetype(font_reg, 18)
    f_pill = ImageFont.truetype(font_bold, 13)
    f_header = ImageFont.truetype(font_bold, 13)
    f_card_num = ImageFont.truetype(font_bold, 30)
    f_card_lbl = ImageFont.truetype(font_bold, 12)
    f_footer = ImageFont.truetype(font_reg, 13)
    f_footer_bold = ImageFont.truetype(font_bold, 13)

    # 4. Top Government Strip / Bar
    top_bar_y = 38
    # Glowing green indicator
    draw.ellipse([50, top_bar_y + 3, 62, top_bar_y + 15], fill=(52, 211, 153))
    # Government of Assam text
    draw.text((72, top_bar_y), "GOVERNMENT OF ASSAM", font=f_header, fill=(255, 255, 255))
    draw.text((260, top_bar_y), "•  NATIONAL HEALTH MISSION & HEALTH & FAMILY WELFARE DEPT", font=f_header, fill=(167, 243, 208))

    # Right side badge: NESFIC-D-27
    badge_w, badge_h = 290, 28
    badge_x = W - badge_w - 50
    draw.rounded_rectangle([badge_x, top_bar_y - 5, badge_x + badge_w, top_bar_y + 23], radius=6, fill=(4, 47, 46), outline=(16, 185, 129), width=1)
    draw.text((badge_x + 14, top_bar_y), "NESFIC 2026: STREAM 1 • NESFIC-D-27", font=f_header, fill=(251, 191, 36))

    # Divider line under top bar
    draw.line([(50, 78), (W - 50, 78)], fill=(16, 185, 129, 90), width=1)

    # 5. Main Title & Identity (Left Area)
    title_y = 112
    draw.text((50, title_y), "ShishuDrishti", font=f_title, fill=(255, 255, 255))
    
    # Calculate width of "ShishuDrishti" to place "শিশু দৃষ্টি" next to it
    bbox_title = draw.textbbox((50, title_y), "ShishuDrishti", font=f_title)
    shishu_x = bbox_title[2] + 20
    draw.text((shishu_x, title_y + 4), "শিশু দৃষ্টি", font=f_bengali_title, fill=(251, 191, 36))

    # Category Pill: Assam Congenital Sentinel
    cat_y = title_y + 74
    draw.rounded_rectangle([50, cat_y, 350, cat_y + 26], radius=6, fill=(6, 78, 59), outline=(45, 212, 191), width=1)
    draw.text((62, cat_y + 5), "ASSAM CONGENITAL SENTINEL & EARLY CARE NETWORK", font=ImageFont.truetype(font_bold, 11), fill=(167, 243, 208))

    # Tagline
    tagline_y = cat_y + 40
    draw.text((50, tagline_y), "AI-Powered Congenital Deformity Screening & DEIC Early Intervention", font=f_tagline, fill=(94, 234, 212))

    # Paragraph Description
    desc_y = tagline_y + 40
    line1 = "Transforming neonatal survival across Assam's Tea Gardens and Riverine Chars through 100% offline"
    line2 = "edge AI vision (Cleft Lip/Palate, Clubfoot, NTDs, Polydactyly), AAP/IAP dual-site CCHD pulse oximetry,"
    line3 = "and an automated 48-Hour DEIC Closed-Loop Care Escalation Cascade."
    draw.text((50, desc_y), line1, font=f_desc, fill=(226, 232, 240))
    draw.text((50, desc_y + 26), line2, font=f_desc, fill=(203, 213, 225))
    draw.text((50, desc_y + 52), line3, font=f_desc, fill=(203, 213, 225))

    # Key Capability Feature Badges (Pills)
    pill_y = desc_y + 92
    pills = [
        ("📱 100% Offline Edge AI", (6, 78, 59), (52, 211, 153)),
        ("🫀 Dual-Site CCHD Pulse-Ox", (76, 29, 149), (196, 181, 253)),
        ("🦶 Day 1 Ponseti Clubfoot Cure", (30, 64, 175), (147, 197, 253)),
        ("⏱️ 48-Hour DEIC Care SLA", (153, 27, 27), (252, 165, 165)),
        ("🔒 ASDC Cloud • DPDP Act", (17, 24, 39), (209, 213, 219)),
    ]

    curr_x = 50
    for text, bg_c, txt_c in pills:
        bbox = draw.textbbox((curr_x, pill_y), text, font=f_pill)
        w = bbox[2] - bbox[0] + 24
        draw.rounded_rectangle([curr_x, pill_y, curr_x + w, pill_y + 30], radius=8, fill=bg_c, outline=txt_c, width=1)
        draw.text((curr_x + 12, pill_y + 7), text, font=f_pill, fill=txt_c)
        curr_x += w + 12

    # 6. Right Side Glassmorphic Hero Card (Metrics & Sentinel Emblem)
    card_x = 760
    card_y = 110
    card_w = 390
    card_h = 445

    # Card background (dark glassmorphic with teal rim)
    draw.rounded_rectangle([card_x, card_y, card_x + card_w, card_y + card_h], radius=24, fill=(4, 47, 46, 220), outline=(20, 184, 166), width=2)

    # Inner Card Header with Brand Icon & Badge
    emblem_cx = card_x + 65
    emblem_cy = card_y + 65
    # Draw mini infant sentinel icon
    draw.ellipse([emblem_cx - 40, emblem_cy - 40, emblem_cx + 40, emblem_cy + 40], fill=(6, 95, 70), outline=(251, 191, 36), width=3)
    # Head & Swaddle
    draw.ellipse([emblem_cx - 16, emblem_cy - 20, emblem_cx + 16, emblem_cy + 12], fill=(255, 255, 255))
    draw.arc([emblem_cx - 28, emblem_cy - 5, emblem_cx + 28, emblem_cy + 30], start=0, end=180, fill=(255, 255, 255), width=8)
    draw.ellipse([emblem_cx - 8, emblem_cy + 12, emblem_cx + 8, emblem_cy + 24], fill=(244, 63, 94)) # Heart badge

    # Text next to emblem
    draw.text((card_x + 120, card_y + 40), "ShishuDrishti Core", font=ImageFont.truetype(font_bold, 18), fill=(255, 255, 255))
    draw.text((card_x + 120, card_y + 66), "GovTech Decision Support (CDSS)", font=ImageFont.truetype(font_bold, 11), fill=(94, 234, 212))

    # Divider inside card
    draw.line([(card_x + 20, card_y + 115), (card_x + card_w - 20, card_y + 115)], fill=(20, 184, 166, 80), width=1)

    # 4 Key Metrics (2x2 Grid)
    metrics = [
        ("30,000+", "Target Newborn Cohort", (52, 211, 153)),
        ("> 94%", "Clinical AUROC Sensitivity", (251, 191, 36)),
        ("< 21 Days", "Median Age at First Care", (56, 189, 248)),
        ("35 Districts", "Statewide RBSK & DEIC Mesh", (232, 121, 249))
    ]

    m_box_w = 165
    m_box_h = 80
    coords = [
        (card_x + 20, card_y + 135),
        (card_x + 205, card_y + 135),
        (card_x + 20, card_y + 235),
        (card_x + 205, card_y + 235)
    ]

    for (val, lbl, col), (mx, my) in zip(metrics, coords):
        draw.rounded_rectangle([mx, my, mx + m_box_w, my + m_box_h], radius=12, fill=(2, 30, 27), outline=(20, 184, 166, 90), width=1)
        draw.text((mx + 14, my + 10), val, font=f_card_num, fill=col)
        draw.text((mx + 14, my + 50), lbl, font=f_card_lbl, fill=(203, 213, 225))

    # Lower Card Status Strip
    stat_y = card_y + 340
    draw.rounded_rectangle([card_x + 20, stat_y, card_x + card_w - 20, stat_y + 80], radius=12, fill=(6, 78, 59, 120), outline=(16, 185, 129), width=1)
    draw.text((card_x + 36, stat_y + 14), "✓ 14.2 MB INT8 Quantized Mobile Model", font=ImageFont.truetype(font_bold, 12), fill=(167, 243, 208))
    draw.text((card_x + 36, stat_y + 34), "✓ 100% ASDC Assam Data Residency", font=ImageFont.truetype(font_bold, 12), fill=(167, 243, 208))
    draw.text((card_x + 36, stat_y + 54), "✓ Automated 48-Hour Escalation SLA", font=ImageFont.truetype(font_bold, 12), fill=(167, 243, 208))

    # 7. Bottom Footer Strip
    footer_y = H - 48
    draw.line([(50, footer_y - 12), (W - 50, footer_y - 12)], fill=(16, 185, 129, 90), width=1)

    draw.text((50, footer_y), "Applicant / Lead GovTech Architect: ", font=f_footer, fill=(148, 163, 184))
    draw.text((290, footer_y), "Ron Hatibaruah", font=f_footer_bold, fill=(255, 255, 255))
    draw.text((410, footer_y), "•  Stream 1: Government Track (Health)", font=f_footer, fill=(148, 163, 184))

    portal_text = "Portal: https://shishu-drishti.pages.dev  •  Dispur, Guwahati"
    bbox_portal = draw.textbbox((0, 0), portal_text, font=f_footer_bold)
    pw = bbox_portal[2] - bbox_portal[0]
    draw.text((W - 50 - pw, footer_y), portal_text, font=f_footer_bold, fill=(94, 234, 212))

    return img

def main():
    print("🎨 Generating ShishuDrishti official 1200x630 og:image.jpg...")
    img = create_og_image()

    # Save to public/
    os.makedirs("public", exist_ok=True)
    img.save("public/og-image.jpg", format="JPEG", quality=95, optimize=True)
    print("✓ Saved public/og-image.jpg (1200x630, High Quality)")

    # Save to dist/
    os.makedirs("dist", exist_ok=True)
    img.save("dist/og-image.jpg", format="JPEG", quality=95, optimize=True)
    print("✓ Saved dist/og-image.jpg (1200x630, High Quality)")

    print("🎉 Open Graph social share image successfully generated!")

if __name__ == "__main__":
    main()
