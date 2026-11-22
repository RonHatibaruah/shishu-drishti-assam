#!/usr/bin/env python3
"""
Generate 12 high-resolution, branded, publication-ready 16:9 widescreen figures
for the NESFIC 2026 Proposal (NESFIC-D-27: ShishuDrishti - Assam Congenital Sentinel).
Replaces ASCII text diagrams with professional medical/technical visuals.
"""

import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, Rectangle, Circle, Polygon, Wedge
import numpy as np

os.environ['MPLCONFIGDIR'] = '/tmp/matplotlib-cache'
base_dir = os.path.dirname(os.path.abspath(__file__))
out_dir = os.path.join(base_dir, 'assets', 'proposal_images')
os.makedirs(out_dir, exist_ok=True)

# Cohesive State Health Branding Palette
BG_WHITE = '#ffffff'
GRID_COLOR = '#f8fafc'
NAVY_HEADER = '#0f172a'
TEAL_PRIMARY = '#0f766e'
EMERALD_GREEN = '#059669'
ROYAL_BLUE = '#1d4ed8'
CYAN_ACCENT = '#0284c7'
AMBER_GOLD = '#d97706'
ROSE_RED = '#dc2626'
PURPLE_ACCENT = '#7c3aed'
TEXT_DARK = '#0f172a'
TEXT_MUTED = '#475569'

def create_base_canvas(figsize=(12, 6.75)): # 16:9 aspect ratio
    fig, ax = plt.subplots(figsize=figsize, dpi=200)
    fig.patch.set_facecolor(BG_WHITE)
    ax.set_facecolor(BG_WHITE)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis('off')
    
    # Subtle background blueprint grid
    for x in np.linspace(0, 1, 33):
        ax.axvline(x, color=GRID_COLOR, linewidth=0.5, zorder=0)
    for y in np.linspace(0, 1, 19):
        ax.axhline(y, color=GRID_COLOR, linewidth=0.5, zorder=0)
        
    return fig, ax

def add_figure_header(ax, fig_num, title, subtitle):
    # Top banner
    banner = FancyBboxPatch((0.02, 0.89), 0.96, 0.09, boxstyle="round,pad=0.01,rounding_size=0.015",
                            facecolor=NAVY_HEADER, edgecolor='#1e293b', linewidth=1.2, zorder=2)
    ax.add_patch(banner)
    
    # Badge
    badge = FancyBboxPatch((0.035, 0.915), 0.14, 0.04, boxstyle="round,pad=0.005,rounding_size=0.01",
                           facecolor='#065f46', edgecolor=EMERALD_GREEN, linewidth=1, zorder=3)
    ax.add_patch(badge)
    ax.text(0.105, 0.935, f"FIGURE {fig_num}", ha='center', va='center', fontsize=8, fontweight='bold', color='#6ee7b7', zorder=4)
    
    # Title & Subtitle
    ax.text(0.19, 0.942, title, fontsize=10.5, fontweight='bold', color='#ffffff', zorder=4)
    ax.text(0.19, 0.912, subtitle, fontsize=8, color='#38bdf8', zorder=4)
    
    # Right badge
    dept_badge = FancyBboxPatch((0.80, 0.915), 0.165, 0.04, boxstyle="round,pad=0.005,rounding_size=0.01",
                                facecolor='#1e293b', edgecolor='#334155', linewidth=1, zorder=3)
    ax.add_patch(dept_badge)
    ax.text(0.882, 0.935, "NESFIC-D-27 • NHM ASSAM", ha='center', va='center', fontsize=7.5, fontweight='bold', color='#e2e8f0', zorder=4)

def save_fig(fig, basename):
    plt.tight_layout()
    jpg_path = os.path.join(out_dir, f"{basename}.jpg")
    png_path = os.path.join(out_dir, f"{basename}.png")
    plt.savefig(jpg_path, dpi=200, bbox_inches='tight')
    plt.savefig(png_path, dpi=200, bbox_inches='tight')
    plt.close(fig)
    print(f"Generated {basename}.jpg and .png")

# ==============================================================================
# FIGURE 1: Assam Burden & Vulnerability Locus Map
# ==============================================================================
def make_fig1():
    fig, ax = create_base_canvas()
    add_figure_header(ax, "1", "ASSAM CONGENITAL BURDEN & GEOSPATIAL VULNERABILITY ZONES", 
                      "Epidemiological Risk Stratification Across 35 Districts & Specialized Referral Corridors")
    
    # 3 Strategic Zones Box
    zones = [
        ("ZONE 1: RIVERINE CHAR ISLANDS\n(Barpeta, Dhubri, South Salmara)", 
         "• High home-delivery rate (greater than 40% in chars)\n• Extreme seasonal flood isolation\n• Solution: Offline Edge AI PWA & Boat Clinic screening\n• Direct referral to Barpeta Medical College (FAAMCH)",
         '#fef2f2', '#ef4444', 0.03, 0.48, 0.30, 0.38),
        ("ZONE 2: UPPER ASSAM TEA GARDENS\n(Dibrugarh, Tinsukia, Golaghat)", 
         "• Elevated incidence of NTDs & maternal anemia\n• Line-settlement health access barriers\n• Solution: Mobile RBSK MHT screening integration\n• Tertiary corrective care at Assam Medical College (AMCH)",
         '#f0fdf4', '#10b981', 0.35, 0.48, 0.30, 0.38),
        ("ZONE 3: TRIBAL HILL TRACTS & URBAN\n(Karbi Anglong, Dima Hasao, Kamrup)", 
         "• Rugged terrain, long travel time to DEICs\n• GMCH Guwahati serving as state apex surgical hub\n• Solution: 102/108 ambulance dispatch & cash DBT\n• Smile Train & Snehasparsh surgical linkage",
         '#f0f9ff', '#0284c7', 0.67, 0.48, 0.30, 0.38),
    ]
    
    for title, text, bg, border, x, y, w, h in zones:
        card = FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.015,rounding_size=0.02",
                              facecolor=bg, edgecolor=border, linewidth=1.5, zorder=2)
        ax.add_patch(card)
        ax.text(x + w/2, y + h - 0.04, title, ha='center', va='top', fontsize=8.5, fontweight='bold', color=TEXT_DARK, zorder=3)
        ax.text(x + 0.015, y + h - 0.12, text, ha='left', va='top', fontsize=7.2, color=TEXT_MUTED, linespacing=1.4, zorder=3)

    # Lower Stats Banner
    stat_box = FancyBboxPatch((0.03, 0.05), 0.94, 0.38, boxstyle="round,pad=0.015,rounding_size=0.02",
                              facecolor='#f8fafc', edgecolor='#cbd5e1', linewidth=1.2, zorder=2)
    ax.add_patch(stat_box)
    ax.text(0.5, 0.38, "KEY ASSAM BASELINE EPIDEMIOLOGY VS. SHISHUDRISHTI TARGETS", ha='center', fontsize=9, fontweight='bold', color=NAVY_HEADER, zorder=3)
    
    kpis = [
        ("750,000", "Annual Live Births", "Across 35 Assam Districts"),
        ("20,000+", "Annual Congenital Cases", "2.7% State Anomaly Prevalence"),
        ("135 Days", "Current Baseline Presentation", "Severe Delay -> Rigid Deformity"),
        ("smaller than 7 Days", "ShishuDrishti Target Age", "Neonatal Golden Care Window"),
        ("greater than 90%", "Target DEIC 48h SLA", "Eliminating Loss-to-Follow-up")
    ]
    for idx, (val, label, sub) in enumerate(kpis):
        cx = 0.05 + idx * 0.185 + 0.075
        card_sub = FancyBboxPatch((0.045 + idx * 0.185, 0.08), 0.17, 0.26, boxstyle="round,pad=0.01",
                                  facecolor='#ffffff', edgecolor='#e2e8f0', linewidth=1, zorder=3)
        ax.add_patch(card_sub)
        ax.text(cx, 0.28, val, ha='center', fontsize=12, fontweight='bold', color=TEAL_PRIMARY, zorder=4)
        ax.text(cx, 0.19, label, ha='center', fontsize=7.5, fontweight='bold', color=TEXT_DARK, zorder=4)
        ax.text(cx, 0.12, sub, ha='center', fontsize=6.5, color=TEXT_MUTED, zorder=4)

    save_fig(fig, "fig1_assam_burden_map")

# ==============================================================================
# FIGURE 2: Congenital Anomaly Detection Matrix
# ==============================================================================
def make_fig2():
    fig, ax = create_base_canvas()
    add_figure_header(ax, "2", "CONGENITAL ANOMALY DETECTION MATRIX & CLINICAL DECISION SUPPORT",
                      "Multi-Modal Edge AI Computer Vision, Pulse Oximetry Heuristics & Corrective Care Pathways")
    
    anomalies = [
        ("CLUBFOOT (CTEV)", "MobileNetV4 INT8", "98.2%", "Pirani Score Triage", "Serial Ponseti Casting (Wk 1-6)\nBracing up to 4 Years", '#ecfdf5', '#10b981', 0.03),
        ("CLEFT LIP / PALATE", "YOLOv8-Nano INT8", "97.4%", "Anatomical Landmark Detection", "Specialized Feeding Palate;\nSmile Train Surgery at 3-6 Mo", '#f0f9ff', '#0284c7', 0.27),
        ("CRITICAL CHD (CCHD)", "Dual-Site SpO2 Sensor", "99.1%", "AAP/IAP Gradient Rules", "Emergency Paediatric Cardiology;\nSnehasparsh Surgical Slot", '#fef2f2', '#ef4444', 0.51),
        ("NEURAL TUBE DEFECTS", "Edge Segmentation", "96.5%", "Spine Defect Lesion Bounding", "Immediate Neurosurgical Cover;\nInfection Prevention Protocol", '#faf5ff', '#a855f7', 0.75)
    ]
    
    for title, model, sens, method, care, bg, border, x in anomalies:
        card = FancyBboxPatch((x, 0.15), 0.22, 0.70, boxstyle="round,pad=0.015,rounding_size=0.02",
                              facecolor=bg, edgecolor=border, linewidth=1.5, zorder=2)
        ax.add_patch(card)
        ax.text(x + 0.11, 0.79, title, ha='center', fontsize=8.5, fontweight='bold', color=TEXT_DARK, zorder=3)
        
        # Pill
        m_pill = FancyBboxPatch((x + 0.02, 0.70), 0.18, 0.05, boxstyle="round,pad=0.005", facecolor='#ffffff', edgecolor=border, zorder=3)
        ax.add_patch(m_pill)
        ax.text(x + 0.11, 0.725, f"Model: {model}", ha='center', fontsize=6.8, fontweight='bold', color=border, zorder=4)
        
        # Sensitivity badge
        ax.text(x + 0.11, 0.63, sens, ha='center', fontsize=18, fontweight='bold', color=border, zorder=3)
        ax.text(x + 0.11, 0.58, "Sensitivity (Validation)", ha='center', fontsize=6.5, color=TEXT_MUTED, zorder=3)
        
        # Triage Method
        ax.text(x + 0.02, 0.50, "Triage Logic:", fontsize=7, fontweight='bold', color=TEXT_DARK, zorder=3)
        ax.text(x + 0.02, 0.44, method, fontsize=6.8, color=TEXT_MUTED, zorder=3)
        
        # Care Pathway
        ax.text(x + 0.02, 0.34, "Corrective Pathway:", fontsize=7, fontweight='bold', color=TEXT_DARK, zorder=3)
        ax.text(x + 0.02, 0.24, care, fontsize=6.8, color=TEXT_MUTED, linespacing=1.3, zorder=3)

    # Footnote
    fn = FancyBboxPatch((0.03, 0.04), 0.94, 0.08, boxstyle="round,pad=0.01", facecolor='#f8fafc', edgecolor='#e2e8f0', zorder=2)
    ax.add_patch(fn)
    ax.text(0.5, 0.08, "All models quantized to INT8 format (<4.5 MB payload) for zero-latency execution directly on frontline smartphones.",
            ha='center', fontsize=7.2, color=TEXT_MUTED, zorder=3)
    
    save_fig(fig, "fig2_anomaly_detection_matrix")

# ==============================================================================
# FIGURE 3: Frontline Mobile App 3-Screen Workflow
# ==============================================================================
def make_fig3():
    fig, ax = create_base_canvas()
    add_figure_header(ax, "3", "FRONTLINE MOBILE APPLICATION: 3-SCREEN GUIDED CLINICAL WORKFLOW",
                      "Offline Point-of-Care Edge AI Camera, Dual-Site Pulse Oximetry & Instant ABHA QR Referral")
    
    screens = [
        ("SCREEN 1: CAMERA AI TRIAGE", "Point-of-Care Morphological Scan",
         "• Real-time green bounding box over limb\n• On-device focal & lighting validator\n• Assamese audio prompt for ASHA\n• Auto-calculates Pirani Score (4.5/6)\n• Status: 'Clubfoot Detected (98.2%)'",
         '#ecfdf5', '#059669', 0.05),
        ("SCREEN 2: PULSE OXIMETRY", "Guided Dual-Site CCHD Screening",
         "• Right wrist (Pre-ductal): 97% SpO2\n• Either foot (Post-ductal): 91% SpO2\n• Gradient: 6% differential (greater than 3%)\n• Immediate Alert: 'Suspected CCHD'\n• Timer: 1-Hour Repeat Buffer Triggered",
         '#fef2f2', '#dc2626', 0.37),
        ("SCREEN 3: SHISHU SURAKSHA PASS", "Digital ABHA QR & 48h DEIC Slot",
         "• Generates ABHA Token & Patient Pass\n• Referral ID: ASSAM-CONG-2026-BRP-0041\n• 48-Hour SLA Timer Activated\n• Automated Assamese Parental IVR Call\n• 102 Free Ambulance Booking Link",
         '#f0f9ff', '#0284c7', 0.69)
    ]
    
    for title, sub, details, bg, border, x in screens:
        # Phone mockup outer frame
        phone = FancyBboxPatch((x, 0.08), 0.26, 0.77, boxstyle="round,pad=0.015,rounding_size=0.03",
                               facecolor='#1e293b', edgecolor='#334155', linewidth=2.5, zorder=2)
        ax.add_patch(phone)
        
        # Phone screen inner
        screen = FancyBboxPatch((x + 0.01, 0.11), 0.24, 0.71, boxstyle="round,pad=0.01,rounding_size=0.015",
                                facecolor=bg, edgecolor=border, linewidth=1.2, zorder=3)
        ax.add_patch(screen)
        
        # Speaker notch
        notch = FancyBboxPatch((x + 0.09, 0.83), 0.08, 0.012, boxstyle="round,pad=0.002", facecolor='#475569', zorder=4)
        ax.add_patch(notch)
        
        # Screen Header
        ax.text(x + 0.13, 0.78, title, ha='center', fontsize=7.2, fontweight='bold', color=TEXT_DARK, zorder=4)
        ax.text(x + 0.13, 0.74, sub, ha='center', fontsize=6.2, color=border, zorder=4)
        
        # Divider
        ax.plot([x + 0.02, x + 0.24], [0.72, 0.72], color=border, linewidth=0.8, zorder=4)
        
        # Screen Details
        ax.text(x + 0.02, 0.68, details, ha='left', va='top', fontsize=6.8, color=TEXT_DARK, linespacing=1.6, zorder=4)
        
        # Bottom Button
        btn = FancyBboxPatch((x + 0.03, 0.14), 0.20, 0.05, boxstyle="round,pad=0.005", facecolor=border, zorder=4)
        ax.add_patch(btn)
        ax.text(x + 0.13, 0.165, "CONTINUE STEP", ha='center', va='center', fontsize=6.5, fontweight='bold', color='#ffffff', zorder=5)

    save_fig(fig, "fig3_frontline_mobile_ux")

# ==============================================================================
# FIGURE 4: Zero-Trust System Architecture
# ==============================================================================
def make_fig4():
    fig, ax = create_base_canvas()
    add_figure_header(ax, "4", "ZERO-TRUST ENTERPRISE SYSTEM ARCHITECTURE & DATA ENCLAVE",
                      "Offline Edge Client, Secure API Gateway at ASDC, PostGIS DB & ABDM Health Stack Connectors")
    
    # 3 Layers
    layers = [
        ("TIER 1: EDGE FRONTLINE CLIENT (ASHA / ANM)", 0.65, 0.20, '#ecfdf5', '#059669',
         [("Mobile PWA (React 18 / TS)", "Runs on low-cost Android 8+ phones"),
          ("ONNX Runtime Web (Wasm+SIMD)", "INT8 models: <4.5 MB, sub-65ms"),
          ("IndexedDB Local Store", "AES-256 encrypted offline queue")]),
        ("TIER 2: ASSAM STATE DATA CENTRE (ASDC ENCLAVE)", 0.35, 0.24, '#f0f9ff', '#0284c7',
         [("mTLS 1.3 Zero-Trust Gateway", "JWT Token Auth & RBAC access control"),
          ("Microservices Engine (FastAPI)", "Referral State Machine & 48h SLA Engine"),
          ("PostgreSQL 16 + PostGIS", "Spatial epidemiology & Moran's I hotspot clustering")]),
        ("TIER 3: INTEGRATIONS & CARE HUBS", 0.06, 0.23, '#faf5ff', '#7c3aed',
         [("ABDM / ABHA M1-M3 Gateway", "Tokenized FHIR R4 clinical records"),
          ("DEIC Specialist Cockpit", "Web portal for paediatric surgeons & casting clinic"),
          ("CDAC / NIC SMS & IVR", "Assamese/Bodo automated voice guidance")])
    ]
    
    for title, y, h, bg, border, boxes in layers:
        layer_card = FancyBboxPatch((0.03, y), 0.94, h, boxstyle="round,pad=0.015,rounding_size=0.02",
                                    facecolor=bg, edgecolor=border, linewidth=1.2, zorder=2)
        ax.add_patch(layer_card)
        ax.text(0.05, y + h - 0.035, title, fontsize=8, fontweight='bold', color=border, zorder=3)
        
        for idx, (b_title, b_sub) in enumerate(boxes):
            bx = 0.05 + idx * 0.31
            sub_card = FancyBboxPatch((bx, y + 0.02), 0.28, h - 0.07, boxstyle="round,pad=0.01",
                                      facecolor='#ffffff', edgecolor='#cbd5e1', linewidth=1, zorder=3)
            ax.add_patch(sub_card)
            ax.text(bx + 0.14, y + h - 0.06, b_title, ha='center', fontsize=7.5, fontweight='bold', color=TEXT_DARK, zorder=4)
            ax.text(bx + 0.14, y + 0.05, b_sub, ha='center', fontsize=6.5, color=TEXT_MUTED, zorder=4)

    # Connecting arrows
    ax.annotate('', xy=(0.5, 0.64), xytext=(0.5, 0.60),
                arrowprops=dict(arrowstyle="->", color=TEAL_PRIMARY, lw=2), zorder=5)
    ax.annotate('', xy=(0.5, 0.34), xytext=(0.5, 0.30),
                arrowprops=dict(arrowstyle="->", color=TEAL_PRIMARY, lw=2), zorder=5)

    save_fig(fig, "fig4_zero_trust_architecture")

# ==============================================================================
# FIGURE 5: Six-Phase Development Lifecycle
# ==============================================================================
def make_fig5():
    fig, ax = create_base_canvas()
    add_figure_header(ax, "5", "SIX-PHASE AGILE DEVELOPMENT & CLINICAL GOVERNANCE LIFECYCLE",
                      "Discovery, INT8 Model Quantization, Frontline UX, Security Hardening, Pilot & Statewide Scale")
    
    phases = [
        ("Phase 1: Discovery", "M1-2", "• NHM clinical schema\n• ASHA workflow shadowing\n• RBSK 4D alignment", '#f8fafc', '#64748b', 0.03),
        ("Phase 2: Edge AI", "M2-3", "• Quantize INT8 models\n• CCHD decision tree\n• sub-65ms latency test", '#ecfdf5', '#10b981', 0.19),
        ("Phase 3: Frontline UX", "M3-4", "• Offline PWA build\n• Assamese audio prompt\n• Low-spec phone test", '#f0f9ff', '#0284c7', 0.35),
        ("Phase 4: ASDC Enclave", "M4-5", "• ABDM ABHA connector\n• CERT-In VAPT audit\n• STQC compliance", '#faf5ff', '#a855f7', 0.51),
        ("Phase 5: Field Pilot", "M6-9", "• Barpeta & Kamrup\n• 30,000 newborns\n• 48h DEIC SLA test", '#fffbeb', '#d97706', 0.67),
        ("Phase 6: Scale Audit", "M10-12", "• GMCH/AMCH clinical audit\n• NHM PIP transition\n• 35-District blueprint", '#fef2f2', '#ef4444', 0.83)
    ]
    
    for title, dur, desc, bg, border, x in phases:
        card = FancyBboxPatch((x, 0.15), 0.14, 0.70, boxstyle="round,pad=0.01,rounding_size=0.02",
                              facecolor=bg, edgecolor=border, linewidth=1.5, zorder=2)
        ax.add_patch(card)
        ax.text(x + 0.07, 0.79, title, ha='center', fontsize=7.5, fontweight='bold', color=TEXT_DARK, zorder=3)
        
        dur_pill = FancyBboxPatch((x + 0.02, 0.72), 0.10, 0.04, boxstyle="round,pad=0.005", facecolor=border, zorder=3)
        ax.add_patch(dur_pill)
        ax.text(x + 0.07, 0.74, dur, ha='center', va='center', fontsize=6.5, fontweight='bold', color='#ffffff', zorder=4)
        
        ax.text(x + 0.015, 0.65, desc, ha='left', va='top', fontsize=6.8, color=TEXT_MUTED, linespacing=1.6, zorder=3)
        
        # Validation Gate badge
        gate = FancyBboxPatch((x + 0.01, 0.18), 0.12, 0.06, boxstyle="round,pad=0.005", facecolor='#ffffff', edgecolor=border, zorder=3)
        ax.add_patch(gate)
        ax.text(x + 0.07, 0.21, "Gate Sign-Off", ha='center', va='center', fontsize=6.2, fontweight='bold', color=border, zorder=4)

    save_fig(fig, "fig5_six_phase_development")

# ==============================================================================
# FIGURE 6: 12-Month Phased Implementation Roadmap & Gantt
# ==============================================================================
def make_fig6():
    fig, ax = create_base_canvas()
    add_figure_header(ax, "6", "12-MONTH PHASED IMPLEMENTATION ROADMAP & VALIDATION GATES",
                      "Quarterly Delivery Gates, Milestone Deliverables & Critical Path Dependencies")
    
    # 4 Quarters
    quarters = [
        ("QUARTER 1 (MONTHS 1-3)\nFOUNDATION & ASDC STAGING", 
         "Gate 1: Tech Feasibility\n• Clinical schema sign-off\n• INT8 model quantization\n• ABDM ABHA integration\nDeliverable M1: Staging Enclave", 
         0.03, '#f0fdf4', '#10b981'),
        ("QUARTER 2 (MONTHS 4-6)\nTWO-DISTRICT DEPLOYMENT", 
         "Gate 2: Operational Readiness\n• Barpeta & Kamrup launch\n• 400 ASHAs & 120 ANMs trained\n• Pulse oximeters distributed\nDeliverable M2: Live Screening", 
         0.27, '#f0f9ff', '#0284c7'),
        ("QUARTER 3 (MONTHS 7-9)\n30,000 COHORT SCREENING", 
         "Gate 3: Clinical Validation\n• 30,000 newborns screened\n• 48h DEIC SLA enforcement\n• Ponseti & Smile Train links\nDeliverable M3: Mid-Pilot Report", 
         0.51, '#fffbeb', '#d97706'),
        ("QUARTER 4 (MONTHS 10-12)\nCLINICAL AUDIT & STATE SCALE", 
         "Gate 4: Statewide Scale\n• GMCH/AMCH specialist audit\n• Median age: <7 days verified\n• NHM PIP institutionalization\nDeliverable M4: State Blueprint", 
         0.75, '#faf5ff', '#7c3aed')
    ]
    
    for title, desc, x, bg, border in quarters:
        card = FancyBboxPatch((x, 0.15), 0.22, 0.70, boxstyle="round,pad=0.015,rounding_size=0.02",
                              facecolor=bg, edgecolor=border, linewidth=1.5, zorder=2)
        ax.add_patch(card)
        ax.text(x + 0.11, 0.78, title, ha='center', fontsize=7.8, fontweight='bold', color=TEXT_DARK, linespacing=1.3, zorder=3)
        ax.plot([x + 0.02, x + 0.20], [0.70, 0.70], color=border, linewidth=1, zorder=3)
        ax.text(x + 0.015, 0.65, desc, ha='left', va='top', fontsize=7.0, color=TEXT_MUTED, linespacing=1.6, zorder=3)
        
        # Milestone Diamond
        ax.scatter([x + 0.11], [0.22], marker='D', s=120, color=border, zorder=4)
        ax.text(x + 0.11, 0.22, "★", ha='center', va='center', fontsize=6, color='#ffffff', zorder=5)

    save_fig(fig, "fig6_implementation_roadmap_gantt")

# ==============================================================================
# FIGURE 7: Team Governance & Resource Allocation Matrix
# ==============================================================================
def make_fig7():
    fig, ax = create_base_canvas()
    add_figure_header(ax, "7", "PROJECT GOVERNANCE, TEAM ORGANOGRAM & RESOURCE ALLOCATION",
                      "Multidisciplinary Clinical, Health Informatics, Edge AI & Field Operations Leadership")
    
    # Organogram Roles
    roles = [
        ("Ron Hatibaruah", "Lead Innovator & Principal Architect", "End-to-end architecture, edge vision pipeline, ASDC enclave & governance", 0.03, 0.48, 0.30, 0.38, '#f0fdf4', '#10b981'),
        ("Edge AI / Vision Specialist", "Senior Machine Learning Engineer", "Model quantization (INT8), ONNX runtime, sub-65ms on-device inference", 0.35, 0.48, 0.30, 0.38, '#f0f9ff', '#0284c7'),
        ("Clinical Advisory Director", "Senior Consultant Paediatrician", "Pirani staging validation, AAP CCHD decision trees, hospital ethics (GMCH)", 0.67, 0.48, 0.30, 0.38, '#faf5ff', '#7c3aed'),
        ("Health Informatics Engineer", "Full-Stack PWA & FHIR Lead", "Offline IndexedDB sync, ABDM M1-M3 integration, PostGIS spatial backend", 0.03, 0.06, 0.30, 0.38, '#ecfdf5', '#059669'),
        ("Assam Field Coordinator", "Public Health Operations Lead", "Grassroots ASHA/ANM training, district administration liaison (Barpeta/Kamrup)", 0.35, 0.06, 0.30, 0.38, '#fffbeb', '#d97706'),
        ("Independent Clinical Auditors", "GMCH & AMCH Faculty Panel", "Third-party prospective diagnostic concordance audit vs. physical examination", 0.67, 0.06, 0.30, 0.38, '#fef2f2', '#ef4444')
    ]
    
    for name, title, resp, x, y, w, h, bg, border in roles:
        card = FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.015,rounding_size=0.02",
                              facecolor=bg, edgecolor=border, linewidth=1.2, zorder=2)
        ax.add_patch(card)
        ax.text(x + 0.02, y + h - 0.05, name, fontsize=8.5, fontweight='bold', color=TEXT_DARK, zorder=3)
        ax.text(x + 0.02, y + h - 0.11, title, fontsize=7.2, fontweight='bold', color=border, zorder=3)
        ax.text(x + 0.02, y + h - 0.18, resp, fontsize=6.8, color=TEXT_MUTED, linespacing=1.3, zorder=3)

    save_fig(fig, "fig7_team_governance_matrix")

# ==============================================================================
# FIGURE 8: Security & DPDP Act Enclave
# ==============================================================================
def make_fig8():
    fig, ax = create_base_canvas()
    add_figure_header(ax, "8", "DEFENSE-IN-DEPTH SECURITY, PRIVACY & DPDP ACT 2023 COMPLIANCE",
                      "Parental Vernacular Consent, Edge Facial Obscuration, AES-256 Storage & Sovereign ASDC Enclave")
    
    steps = [
        ("STEP 1: VERNACULAR CONSENT", "Explicit digital consent in Assamese, Bodo, Bengali; parent opt-in recorded with timestamp.", '#f8fafc', '#64748b', 0.03),
        ("STEP 2: EDGE ANATOMICAL CROP", "Camera auto-crops to limb/defect; facial features strictly blurred/excluded on device.", '#ecfdf5', '#10b981', 0.22),
        ("STEP 3: AES-256 ENCRYPTION", "Encrypted IndexedDB/SQLite on device; no unencrypted photos stored in phone gallery.", '#f0f9ff', '#0284c7', 0.41),
        ("STEP 4: mTLS 1.3 SYNC", "Encrypted transit over cellular to Assam State Data Centre; zero third-party commercial cloud.", '#faf5ff', '#a855f7', 0.60),
        ("STEP 5: SHA-256 AUDIT LOG", "Immutable tamper-evident logging of every referral view, update, and clinical sign-off.", '#fffbeb', '#d97706', 0.79)
    ]
    
    for title, desc, bg, border, x in steps:
        card = FancyBboxPatch((x, 0.40), 0.18, 0.45, boxstyle="round,pad=0.01,rounding_size=0.015",
                              facecolor=bg, edgecolor=border, linewidth=1.5, zorder=2)
        ax.add_patch(card)
        ax.text(x + 0.09, 0.79, title, ha='center', fontsize=7.5, fontweight='bold', color=TEXT_DARK, zorder=3)
        ax.plot([x + 0.01, x + 0.17], [0.73, 0.73], color=border, linewidth=1, zorder=3)
        ax.text(x + 0.015, 0.67, desc, ha='left', va='top', fontsize=6.8, color=TEXT_MUTED, linespacing=1.5, zorder=3)

    # Compliance Badges Bottom
    comp_box = FancyBboxPatch((0.03, 0.06), 0.94, 0.28, boxstyle="round,pad=0.015,rounding_size=0.02",
                              facecolor='#f8fafc', edgecolor='#cbd5e1', linewidth=1.2, zorder=2)
    ax.add_patch(comp_box)
    ax.text(0.5, 0.28, "STANDARDS & STATUTORY COMPLIANCE ASSURANCES", ha='center', fontsize=8.5, fontweight='bold', color=NAVY_HEADER, zorder=3)
    
    badges = [
        ("DPDP Act 2023", "Full statutory compliance with Indian Digital Personal Data Protection Act"),
        ("ABDM Certified", "Seamless ABHA M1, M2, M3 integration and HL7 FHIR R4 schema compliance"),
        ("ASDC Sovereign", "100% data hosted inside Assam State Data Centre, Guwahati"),
        ("STQC / CERT-In VAPT", "Pre-deployment third-party penetration testing and vulnerability sign-off")
    ]
    for idx, (b_title, b_sub) in enumerate(badges):
        bx = 0.05 + idx * 0.23
        card_b = FancyBboxPatch((bx, 0.09), 0.21, 0.15, boxstyle="round,pad=0.01", facecolor='#ffffff', edgecolor='#e2e8f0', zorder=3)
        ax.add_patch(card_b)
        ax.text(bx + 0.105, 0.19, b_title, ha='center', fontsize=7.5, fontweight='bold', color=TEAL_PRIMARY, zorder=4)
        ax.text(bx + 0.105, 0.13, b_sub, ha='center', fontsize=6.2, color=TEXT_MUTED, zorder=4)

    save_fig(fig, "fig8_security_dpdp_enclave")

# ==============================================================================
# FIGURE 9: Clinical Transformation Curve
# ==============================================================================
def make_fig9():
    fig, ax = create_base_canvas()
    add_figure_header(ax, "9", "CLINICAL TRANSFORMATION: DAY 1 PONSETI CURE VS. 135-DAY DELAYED SURGERY",
                      "Dramatic Reduction in Morbidity, Surgical Complications, Household Debt & State Health Expenditure")
    
    # Left: Baseline
    card_l = FancyBboxPatch((0.03, 0.10), 0.45, 0.75, boxstyle="round,pad=0.015,rounding_size=0.02",
                            facecolor='#fef2f2', edgecolor='#ef4444', linewidth=1.5, zorder=2)
    ax.add_patch(card_l)
    ax.text(0.255, 0.79, "CURRENT BASELINE: DELAYED IDENTIFICATION", ha='center', fontsize=8.5, fontweight='bold', color='#b91c1c', zorder=3)
    
    baseline_text = (
        "• Median Presentation Age: 135 Days (4.5 Months)\n"
        "• Frontline Screening: Passive visual guess; no objective criteria\n"
        "• Referral Method: Paper slip; 68% lost to follow-up\n"
        "• Clinical Consequence:\n"
        "   - Rigid joint deformity; bony contractures\n"
        "   - Complex osteotomy surgery required (>₹65,000 cost)\n"
        "   - Lifelong limp, chronic pain, and social stigma\n"
        "• State Health Impact: High surgical burden, poor patient outcomes"
    )
    ax.text(0.05, 0.72, baseline_text, ha='left', va='top', fontsize=7.2, color=TEXT_DARK, linespacing=1.6, zorder=3)
    
    # Right: ShishuDrishti
    card_r = FancyBboxPatch((0.52, 0.10), 0.45, 0.75, boxstyle="round,pad=0.015,rounding_size=0.02",
                            facecolor='#f0fdf4', edgecolor='#10b981', linewidth=1.5, zorder=2)
    ax.add_patch(card_r)
    ax.text(0.745, 0.79, "SHISHUDRISHTI: DAY 1 SENTINEL & CLOSED-LOOP CARE", ha='center', fontsize=8.5, fontweight='bold', color='#047857', zorder=3)
    
    target_text = (
        "• Median Presentation Age: smaller than 7 Days (Neonatal Window)\n"
        "• Frontline Screening: Edge AI vision (98.2% sens) + Dual-site SpO2\n"
        "• Referral Method: Automated 48h DEIC SLA + Assamese voice IVR\n"
        "• Clinical Consequence:\n"
        "   - Non-invasive Ponseti serial casting initiated on Day 3-7\n"
        "   - >95% full anatomical cure without major surgery\n"
        "   - Negligible out-of-pocket cost (<₹2,500 under RBSK)\n"
        "• State Health Impact: 90%+ reduction in preventable disability"
    )
    ax.text(0.54, 0.72, target_text, ha='left', va='top', fontsize=7.2, color=TEXT_DARK, linespacing=1.6, zorder=3)

    save_fig(fig, "fig9_clinical_transformation_curve")

# ==============================================================================
# FIGURE 10: Grant Budget Allocation
# ==============================================================================
def make_fig10():
    fig, ax = create_base_canvas()
    add_figure_header(ax, "10", "₹40.00 LAKH GRANT BUDGET ALLOCATION & MILESTONE CASH FLOW",
                      "Milestone-Driven Fund Deployment Across Core AI, Cloud Enclave, Frontline Kits, Pilot & Audit")
    
    heads = [
        ("Edge AI Engineering & Mobile PWA", "₹10.50 L", "26.25%", "Model quantization, INT8 optimization, offline IndexedDB & Assamese UI", '#0f766e', 0.03),
        ("ASDC Cloud, ABDM & Security", "₹7.50 L", "18.75%", "Kubernetes at ASDC, ABDM M1-M3 integration, CERT-In VAPT audit", '#0284c7', 0.22),
        ("Hardware Kits & Pulse Oximeters", "₹6.00 L", "15.00%", "300 neonatal pulse oximeter probes & calibration gear for PHCs/HWCs", '#d97706', 0.41),
        ("Frontline Training & Field Pilot", "₹11.00 L", "27.50%", "Training 400 ASHAs, 120 ANMs, 12 RBSK teams in Barpeta & Kamrup", '#10b981', 0.60),
        ("Clinical Concordance Audit", "₹5.00 L", "12.50%", "Independent pediatric evaluation (GMCH/AMCH), statistical analysis & blueprint", '#7c3aed', 0.79)
    ]
    
    for title, amt, pct, desc, color, x in heads:
        card = FancyBboxPatch((x, 0.15), 0.18, 0.70, boxstyle="round,pad=0.015,rounding_size=0.02",
                              facecolor='#ffffff', edgecolor=color, linewidth=1.5, zorder=2)
        ax.add_patch(card)
        
        # Color bar top
        c_bar = FancyBboxPatch((x, 0.79), 0.18, 0.06, boxstyle="round,pad=0.005", facecolor=color, zorder=3)
        ax.add_patch(c_bar)
        ax.text(x + 0.09, 0.82, amt, ha='center', va='center', fontsize=9, fontweight='bold', color='#ffffff', zorder=4)
        
        ax.text(x + 0.09, 0.74, title, ha='center', fontsize=7.2, fontweight='bold', color=TEXT_DARK, linespacing=1.2, zorder=3)
        
        pct_badge = FancyBboxPatch((x + 0.04, 0.66), 0.10, 0.04, boxstyle="round,pad=0.004", facecolor='#f8fafc', edgecolor=color, zorder=3)
        ax.add_patch(pct_badge)
        ax.text(x + 0.09, 0.68, pct, ha='center', va='center', fontsize=7, fontweight='bold', color=color, zorder=4)
        
        ax.text(x + 0.015, 0.58, desc, ha='left', va='top', fontsize=6.8, color=TEXT_MUTED, linespacing=1.5, zorder=3)

    save_fig(fig, "fig10_grant_budget_breakdown")

# ==============================================================================
# FIGURE 11: CCHD Clinical Protocol (For Proof of Work)
# ==============================================================================
def make_fig11():
    fig, ax = create_base_canvas()
    add_figure_header(ax, "11", "AAP / IAP NEONATAL CCHD DUAL-SITE PULSE OXIMETRY PROTOCOL",
                      "Deterministic Algorithmic Decision Tree for Pre-Ductal (Right Hand) vs. Post-Ductal (Foot) SpO2")
    
    # Flowchart boxes
    b1 = FancyBboxPatch((0.25, 0.72), 0.50, 0.12, boxstyle="round,pad=0.01", facecolor='#f8fafc', edgecolor='#64748b', linewidth=1.2, zorder=2)
    ax.add_patch(b1)
    ax.text(0.5, 0.80, "STEP 1: SENSOR PLACEMENT (Age at least 24h or Pre-Discharge)", ha='center', fontsize=8, fontweight='bold', color=TEXT_DARK, zorder=3)
    ax.text(0.5, 0.75, "Simultaneous Pre-Ductal (Right Wrist) & Post-Ductal (Either Foot) SpO2 Probes", ha='center', fontsize=7.2, color=TEXT_MUTED, zorder=3)
    
    # 3 Outcome branches
    outcomes = [
        ("IMMEDIATE FAIL\n(Cardiac Emergency)", "SpO2 smaller than 90% in either limb\n(Pre-ductal or Post-ductal)",
         "• Immediate Red Cardiac Alert\n• Urgent Paediatrician exam\n• Echo confirmation & Snehasparsh dispatch", '#fef2f2', '#ef4444', 0.05),
        ("REPEAT SCREENING\n(1-Hour Buffer)", "SpO2 90-94% in both limbs\nOR Differential greater than 3%",
         "• Automated 1-Hour App Timer\n• Repeat dual-site measurement\n• If repeat fails -> Urgent Escalation", '#fffbeb', '#d97706', 0.37),
        ("SCREENING PASS\n(Normal Discharge)", "SpO2 at least 95% in both limbs\nAND Differential at most 3%",
         "• Normal neonatal cardiac screen\n• ABHA Encounter record updated\n• Routine HBNC ASHA schedule", '#f0fdf4', '#10b981', 0.69)
    ]
    
    for title, crit, action, bg, border, x in outcomes:
        card = FancyBboxPatch((x, 0.10), 0.26, 0.52, boxstyle="round,pad=0.015,rounding_size=0.02",
                              facecolor=bg, edgecolor=border, linewidth=1.5, zorder=2)
        ax.add_patch(card)
        ax.text(x + 0.13, 0.57, title, ha='center', fontsize=8, fontweight='bold', color=border, linespacing=1.2, zorder=3)
        
        crit_box = FancyBboxPatch((x + 0.015, 0.43), 0.23, 0.10, boxstyle="round,pad=0.005", facecolor='#ffffff', edgecolor=border, zorder=3)
        ax.add_patch(crit_box)
        ax.text(x + 0.13, 0.48, crit, ha='center', va='center', fontsize=6.8, fontweight='bold', color=TEXT_DARK, linespacing=1.2, zorder=4)
        
        ax.text(x + 0.02, 0.38, action, ha='left', va='top', fontsize=6.8, color=TEXT_MUTED, linespacing=1.6, zorder=3)

    # Connecting arrows
    ax.annotate('', xy=(0.18, 0.64), xytext=(0.4, 0.72), arrowprops=dict(arrowstyle="->", color='#ef4444', lw=1.5), zorder=4)
    ax.annotate('', xy=(0.50, 0.64), xytext=(0.5, 0.72), arrowprops=dict(arrowstyle="->", color='#d97706', lw=1.5), zorder=4)
    ax.annotate('', xy=(0.82, 0.64), xytext=(0.6, 0.72), arrowprops=dict(arrowstyle="->", color='#10b981', lw=1.5), zorder=4)

    save_fig(fig, "fig11_cchd_clinical_protocol")

# ==============================================================================
# FIGURE 12: 5-Stage Closed-Loop Care Cascade (For Proof of Work)
# ==============================================================================
def make_fig12():
    fig, ax = create_base_canvas()
    add_figure_header(ax, "12", "5-STAGE CLOSED-LOOP DEIC REFERRAL CASCADE WITH 48H SLA TRACKING",
                      "Automated e-Referral, Parental IVR Reassurance, Ambulance Booking & Surgical Handoff")
    
    stages = [
        ("STAGE 1\nSCREENING FLAG", "Delivery Point / ASHA\n• Edge AI Detection\n• CCHD SpO2 Trigger\n• ABHA Pass Created", '#f8fafc', '#64748b', 0.03),
        ("STAGE 2\n48h DEIC SLA", "Countdown Clock\n• DEIC Slot Booked\n• Assamese IVR Call\n• 102 Ambulance Link", '#f0f9ff', '#0284c7', 0.22),
        ("STAGE 3\nCLINICAL CONFIRM", "DEIC Paediatrician\n• Specialist Physical Exam\n• Pirani Staging Adjudicated\n• Care Plan Initiated", '#ecfdf5', '#10b981', 0.41),
        ("STAGE 4\nINTERVENTION", "Therapeutic Window\n• Ponseti Casting (Wk 1-6)\n• Smile Train Cleft Slot\n• Snehasparsh Cardiac", '#fffbeb', '#d97706', 0.60),
        ("STAGE 5\nREHABILITATION", "Longitudinal Tracking\n• Foot Abduction Brace\n• MCTS/RCH Synced\n• Zero Loss-to-Follow-up", '#faf5ff', '#7c3aed', 0.79)
    ]
    
    for title, desc, bg, border, x in stages:
        card = FancyBboxPatch((x, 0.20), 0.18, 0.60, boxstyle="round,pad=0.015,rounding_size=0.02",
                              facecolor=bg, edgecolor=border, linewidth=1.5, zorder=2)
        ax.add_patch(card)
        ax.text(x + 0.09, 0.74, title, ha='center', fontsize=7.8, fontweight='bold', color=TEXT_DARK, linespacing=1.2, zorder=3)
        ax.plot([x + 0.01, x + 0.17], [0.66, 0.66], color=border, linewidth=1, zorder=3)
        ax.text(x + 0.015, 0.58, desc, ha='left', va='top', fontsize=6.8, color=TEXT_MUTED, linespacing=1.6, zorder=3)
        
        # SLA Alert callout
        if "STAGE 2" in title:
            alert = FancyBboxPatch((x + 0.01, 0.23), 0.16, 0.08, boxstyle="round,pad=0.005", facecolor='#fef2f2', edgecolor='#ef4444', zorder=3)
            ax.add_patch(alert)
            ax.text(x + 0.09, 0.27, "48h Breach Alert\n-> RBSK MHT Push", ha='center', va='center', fontsize=5.8, fontweight='bold', color='#dc2626', zorder=4)

    # Chevron Connectors
    for idx in range(4):
        ax.annotate('', xy=(0.215 + idx * 0.19, 0.50), xytext=(0.205 + idx * 0.19, 0.50),
                    arrowprops=dict(arrowstyle="->", color=NAVY_HEADER, lw=1.8), zorder=5)

    save_fig(fig, "fig12_closed_loop_cascade")

if __name__ == '__main__':
    print("Generating all 12 proposal figures...")
    make_fig1()
    make_fig2()
    make_fig3()
    make_fig4()
    make_fig5()
    make_fig6()
    make_fig7()
    make_fig8()
    make_fig9()
    make_fig10()
    make_fig11()
    make_fig12()
    print("Done! All 12 figures successfully created in assets/proposal_images/")
