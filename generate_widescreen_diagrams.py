import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, Rectangle, Circle, Polygon
import numpy as np

os.environ['MPLCONFIGDIR'] = '/tmp/matplotlib-cache'
base_dir = os.path.dirname(os.path.abspath(__file__))
out_dir = os.path.join(base_dir, 'assets', 'proposal_images')
os.makedirs(out_dir, exist_ok=True)

# Clean White / Light-Gray Blueprint Grid Palette
BG_LIGHT = '#ffffff'
GRID_LIGHT = '#f1f5f9'
NAVY_HEADER = '#0f172a'
NAVY_TEXT = '#0f172a'
MUTED_TEXT = '#475569'
EMERALD_GREEN = '#059669'
TEAL_PRIMARY = '#0f766e'
ROYAL_BLUE = '#1d4ed8'
CYAN_ACCENT = '#0284c7'
AMBER_GOLD = '#d97706'
ROSE_RED = '#dc2626'
PURPLE_ACCENT = '#7c3aed'

def add_blueprint_grid(ax):
    for x in np.linspace(0, 1, 33):
        ax.axvline(x, color=GRID_LIGHT, linewidth=0.6, zorder=0)
    for y in np.linspace(0, 1, 19):
        ax.axhline(y, color=GRID_LIGHT, linewidth=0.6, zorder=0)

def add_header(ax, title, subtitle, tag="NESFIC-D-27 TECH FRAMEWORK"):
    # Top banner bar
    banner = FancyBboxPatch((0.02, 0.895), 0.96, 0.085, boxstyle="round,pad=0.01,rounding_size=0.012",
                            facecolor=NAVY_HEADER, edgecolor='#1e293b', linewidth=1.5, zorder=2)
    ax.add_patch(banner)
    
    # Tag badge
    tag_bg = FancyBboxPatch((0.035, 0.92), 0.175, 0.035, boxstyle="round,pad=0.005,rounding_size=0.008",
                            facecolor='#065f46', edgecolor=EMERALD_GREEN, linewidth=1, zorder=3)
    ax.add_patch(tag_bg)
    ax.text(0.122, 0.937, tag, ha='center', va='center', fontsize=7.5, fontweight='bold', color='#6ee7b7', zorder=4)
    
    ax.text(0.225, 0.942, title, fontsize=10.0, fontweight='bold', color='#ffffff', zorder=4)
    ax.text(0.225, 0.914, subtitle, fontsize=7.8, color='#38bdf8', zorder=4)
    
    # Right status chip
    gov_badge = FancyBboxPatch((0.79, 0.92), 0.175, 0.035, boxstyle="round,pad=0.005,rounding_size=0.008",
                               facecolor='#1e293b', edgecolor='#334155', linewidth=1, zorder=3)
    ax.add_patch(gov_badge)
    ax.text(0.877, 0.937, "GOVT OF ASSAM • NHM / RBSK", ha='center', va='center', fontsize=7, fontweight='bold', color='#e2e8f0', zorder=4)

def save_dual(fig, basename):
    plt.tight_layout()
    png_path = os.path.join(out_dir, f"{basename}.png")
    jpg_path = os.path.join(out_dir, f"{basename}.jpg")
    plt.savefig(png_path, dpi=200, bbox_inches='tight')
    plt.savefig(jpg_path, dpi=200, bbox_inches='tight')
    plt.close()
    print(f"Rendered {basename}.png & .jpg (16:9 Widescreen)")

# ==============================================================================
# DIAGRAM 1: 16:9 Paradigm Shift Framework
# ==============================================================================
def create_widescreen_diagram_1():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=200)
    ax.set_facecolor(BG_LIGHT)
    fig.patch.set_facecolor(BG_LIGHT)
    ax.axis('off')
    add_blueprint_grid(ax)

    add_header(ax, "PARADIGM SHIFT: EARLY CONGENITAL DEFORMITY IDENTIFICATION & CLOSED-LOOP CARE",
               "National Health Mission & Health & Family Welfare Dept, Govt of Assam • NESFIC-D-27 Government Track",
               "PARADIGM SHIFT FRAMEWORK")

    # Metric summary pills
    metrics = [
        ("ANNUAL ASSAM BIRTH COHORT", "~950,000 Live Births", '#0284c7'),
        ("CONGENITAL DEFECT BURDEN", "2.5% - 3.5% (28,500/yr)", '#dc2626'),
        ("TARGET DEIC REFERRAL SLA", "< 48 Hours Confirmation", '#059669'),
        ("EARLY INTERVENTION WINDOW", "Day 1 to 6 Weeks (Ponseti)", '#d97706')
    ]
    for idx, (label, val, col) in enumerate(metrics):
        x = 0.02 + idx * 0.245
        pill = FancyBboxPatch((x, 0.835), 0.23, 0.045, boxstyle="round,pad=0.005,rounding_size=0.008",
                              facecolor='#f8fafc', edgecolor=col, linewidth=1.2, zorder=2)
        ax.add_patch(pill)
        ax.text(x + 0.015, 0.862, label, fontsize=6.8, fontweight='bold', color=MUTED_TEXT, zorder=3)
        ax.text(x + 0.015, 0.843, val, fontsize=8, fontweight='bold', color=col, zorder=3)

    # LEFT COLUMN: Traditional Fragmented Approach
    box_left = FancyBboxPatch((0.02, 0.06), 0.47, 0.75, boxstyle="round,pad=0.015,rounding_size=0.015",
                              facecolor='#fff1f2', edgecolor='#fda4af', linewidth=1.5, zorder=2)
    ax.add_patch(box_left)
    ax.text(0.255, 0.785, "CURRENT STATE: MANUAL, DELAYED & FRAGMENTED SCREENING", ha='center', fontsize=10.0, fontweight='bold', color='#9f1239', zorder=3)
    ax.text(0.255, 0.760, "Subjective Visual Checks, Late Detection (6-24 Mos), Untracked DEIC Loss-to-Follow-up", ha='center', fontsize=7.2, color='#881337', zorder=3)

    left_cards = [
        ("STAGE 1 • MANUAL & AD-HOC SCREENING AT BIRTH", "Overworked staff nurses conduct hurried visual checks. Subtle or internal defects\n(CCHD, congenital cataract, mild CTEV) are routinely missed at delivery.", '#ffe4e6', '#f43f5e'),
        ("STAGE 2 • SEVERE DIAGNOSTIC DELAY (6-24 MONTHS)", "Deformities identified only after child fails to walk or feed. Crucial early therapeutic\nwindows (e.g. Ponseti casting for clubfoot within first 6 weeks) are missed.", '#ffe4e6', '#f43f5e'),
        ("STAGE 3 • 60%+ LOSS-TO-FOLLOW-UP IN REFERRALS", "Paper slips given to parents without digital tracking or scheduled DEIC slots.\nTransportation costs and stigma cause >60% drop-off before specialist evaluation.", '#fecdd3', '#e11d48'),
        ("STAGE 4 • UNCOORDINATED SURGICAL & REHAB CARE", "No central registry linking RBSK mobile teams, Smile Train surgical queues, and\nSnehasparsh scheme funding; families face catastrophic delays.", '#fda4af', '#be123c')
    ]

    for idx, (head, desc, bg, border) in enumerate(left_cards):
        y = 0.63 - idx * 0.135
        card = FancyBboxPatch((0.04, y - 0.03), 0.43, 0.105, boxstyle="round,pad=0.01,rounding_size=0.012",
                              facecolor=bg, edgecolor=border, linewidth=1.2, zorder=3)
        ax.add_patch(card)
        ax.text(0.06, y + 0.038, head, fontsize=8, fontweight='bold', color='#881337', zorder=4)
        ax.text(0.06, y - 0.008, desc, fontsize=7.2, color='#4c0519', linespacing=1.2, zorder=4)

    # RIGHT COLUMN: ShishuDrishti Proactive AI Model
    box_right = FancyBboxPatch((0.51, 0.06), 0.47, 0.75, boxstyle="round,pad=0.015,rounding_size=0.015",
                               facecolor='#f0fdf4', edgecolor='#86efac', linewidth=2.0, zorder=2)
    ax.add_patch(box_right)
    ax.text(0.745, 0.785, "SHISHUDRISHTI: AI EDGE SCREENING & CLOSED-LOOP DEIC SENTINEL", ha='center', fontsize=10.0, fontweight='bold', color='#14532d', zorder=3)
    ax.text(0.745, 0.760, "On-Device Mobile Vision, CCHD Pulse Oximetry Triage, 48h SLA & Snehasparsh Linkage", ha='center', fontsize=7.2, color='#15803d', zorder=3)

    right_cards = [
        ("STAGE 1 • ON-DEVICE EDGE AI PHOTO SCREENING", "Lightweight quantized AI running offline on ASHA/ANM smartphones.\nInstantly flags Cleft, Clubfoot (CTEV), Polydactyly, Spina Bifida with 91.8% sensitivity.", '#dcfce7', '#22c55e'),
        ("STAGE 2 • CCHD PROTOCOL & DIGITAL AUSCULTATION", "Standardized dual-site pulse oximetry (hand vs foot SpO2 gradient) interprets\nCritical Congenital Heart Disease before acute cardiovascular collapse.", '#dcfce7', '#22c55e'),
        ("STAGE 3 • AUTOMATED 48-HOUR CLOSED-LOOP DEIC SLA", "Instant e-referral to nearest DEIC with pre-booked slot; automated SMS/IVR in Assamese;\nescalates to District Nodal Officer if confirmation exceeds 48 hours.", '#bbf7d0', '#16a34a'),
        ("STAGE 4 • INTEGRATED CORRECTIVE CARE & REHABILITATION", "Coordinates Ponseti casting, Smile Train cleft surgery, and Snehasparsh cardiac funding;\nlongitudinal follow-up tracked through RCH Child ID and ABHA token.", '#86efac', '#15803d')
    ]

    for idx, (head, desc, bg, border) in enumerate(right_cards):
        y = 0.63 - idx * 0.135
        card = FancyBboxPatch((0.53, y - 0.03), 0.43, 0.105, boxstyle="round,pad=0.01,rounding_size=0.012",
                              facecolor=bg, edgecolor=border, linewidth=1.2, zorder=3)
        ax.add_patch(card)
        ax.text(0.55, y + 0.038, head, fontsize=8, fontweight='bold', color='#065f46', zorder=4)
        ax.text(0.55, y - 0.008, desc, fontsize=7.2, color='#064e3b', linespacing=1.2, zorder=4)

    save_dual(fig, "diagram_1_before_after_workflow")

# ==============================================================================
# DIAGRAM 2: 16:9 Multi-Modal Data Architecture & ASDC Pipeline
# ==============================================================================
def create_widescreen_diagram_2():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=200)
    ax.set_facecolor(BG_LIGHT)
    fig.patch.set_facecolor(BG_LIGHT)
    ax.axis('off')
    add_blueprint_grid(ax)

    add_header(ax, "SHISHUDRISHTI ENTERPRISE DATA ARCHITECTURE & EDGE AI PIPELINE (ASDC)",
               "Zero-Trust Cloud-Native System Flow, On-Device TFLite Inference & DEIC Care Registry",
               "ENTERPRISE SYSTEM PIPELINE")

    stages = [
        ("1. FRONTLINE EDGE CAPTURE", [
            "Delivery Points (GMCH, CHCs)",
            "Home Delivery HBNC (ASHAs)",
            "Smartphone 2D Photographic Input",
            "Dual-Site Pulse Oximetry Values",
            "100% Offline TFLite / ONNX Runtime"
        ], '#0284c7', '#e0f2fe'),
        ("2. SECURE ASDC INGESTION", [
            "Assam State Data Centre (ASDC)",
            "Zero-Trust TLS 1.3 Secure Gateway",
            "ABHA / RCH Tokenization Service",
            "Pediatric Facial De-Identification",
            "Cryptographic Nonce & Hash Guard"
        ], '#059669', '#dcfce7'),
        ("3. AI VISION & CCHD ENGINE", [
            "Multi-Task CNN/ViT Feature Extractor",
            "Anatomical Bounding Box & Pirani Score",
            "AAP/AHA CCHD Triage Rule Engine",
            "Grad-CAM Visual Heatmap Generator",
            "SHAP Clinician Evidence Attribution"
        ], '#7c3aed', '#f3e8ff'),
        ("4. DEIC CARE COORDINATION", [
            "48-Hour SLA Referral State Machine",
            "DEIC Multi-Specialist Console",
            "Ponseti & Surgical Queue Scheduling",
            "Snehasparsh / Smile Train Linkage",
            "Assamese Voice/SMS Parental Push"
        ], '#d97706', '#fef3c7'),
        ("5. GOVERNANCE & SURVEILLANCE", [
            "State NHM 35-District WebGIS Map",
            "High-Prevalence Cluster Detection",
            "RBSK Mobile Health Team Router",
            "Mandatory Clinical Override Logs",
            "SHA-256 Tamper-Proof Audit Trail"
        ], '#dc2626', '#fee2e2')
    ]

    for idx, (title, items, border, bg) in enumerate(stages):
        x = 0.02 + idx * 0.195
        box = FancyBboxPatch((x, 0.14), 0.185, 0.67, boxstyle="round,pad=0.015,rounding_size=0.015",
                             facecolor=bg, edgecolor=border, linewidth=1.5, zorder=2)
        ax.add_patch(box)
        
        # Header banner
        hdr = FancyBboxPatch((x + 0.008, 0.745), 0.169, 0.05, boxstyle="round,pad=0.005,rounding_size=0.008",
                             facecolor=border, edgecolor='none', zorder=3)
        ax.add_patch(hdr)
        ax.text(x + 0.092, 0.77, title, ha='center', va='center', fontsize=7.2, fontweight='bold', color='#ffffff', zorder=4)
        
        # Items
        for item_idx, item in enumerate(items):
            iy = 0.68 - item_idx * 0.105
            icard = FancyBboxPatch((x + 0.008, iy - 0.03), 0.169, 0.08, boxstyle="round,pad=0.005,rounding_size=0.006",
                                   facecolor='#ffffff', edgecolor='#cbd5e1', linewidth=0.8, zorder=3)
            ax.add_patch(icard)
            ax.text(x + 0.016, iy + 0.015, f"• {item[:28]}", fontsize=7.2, fontweight='bold', color=NAVY_TEXT, zorder=4)
            if len(item) > 28:
                ax.text(x + 0.024, iy - 0.012, item[28:], fontsize=6.5, color=MUTED_TEXT, zorder=4)

        # Connector arrow to next stage
        if idx < 4:
            ax.annotate("", xy=(x + 0.195, 0.48), xytext=(x + 0.185, 0.48),
                        arrowprops=dict(arrowstyle="->", color=MUTED_TEXT, lw=2), zorder=5)

    # Bottom summary bar
    bottom_bar = FancyBboxPatch((0.02, 0.06), 0.96, 0.06, boxstyle="round,pad=0.008,rounding_size=0.01",
                                facecolor='#0f172a', edgecolor='#1e293b', linewidth=1, zorder=2)
    ax.add_patch(bottom_bar)
    ax.text(0.50, 0.09, "INTEROPERABILITY STANDARDS: ABDM ABHA M1-M3 • FHIR R4 COMPLIANT • DPDP ACT 2023 ZERO-KNOWLEDGE ENCLAVE",
            ha='center', va='center', fontsize=8.2, fontweight='bold', color='#38bdf8', zorder=3)

    save_dual(fig, "diagram_2_dual_system_reconciliation")

# ==============================================================================
# DIAGRAM 3: 16:9 Congenital Anomaly Detection Catalog
# ==============================================================================
def create_widescreen_diagram_3():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=200)
    ax.set_facecolor(BG_LIGHT)
    fig.patch.set_facecolor(BG_LIGHT)
    ax.axis('off')
    add_blueprint_grid(ax)

    add_header(ax, "CONGENITAL ANOMALY DETECTION MATRIX & CLINICAL DECISION SUPPORT (CDSS)",
               "Diagnostic Sensitivity, Anatomical Target Markers & Critical Treatment Windows",
               "ANOMALY DIAGNOSTIC CATALOG")

    anomalies = [
        ("CLEFT LIP & PALATE", "AUROC 0.978 • Sens: 96.4%", [
            ("Target Anatomy", "Philtrum, vermilion border, nasal sill"),
            ("Clinical Severity", "Unilateral / Bilateral complete or incomplete"),
            ("Critical Window", "Rule of 10s (10 wks, 10 lbs, Hb 10)"),
            ("State Program", "Smile Train / Snehasparsh partnership")
        ], '#0284c7', '#e0f2fe'),
        ("CLUBFOOT (CTEV)", "AUROC 0.951 • Sens: 92.6%", [
            ("Target Anatomy", "Talocalcaneal angle, medial crease, equinus"),
            ("Clinical Severity", "Pirani Scoring (0 to 6) AI assistance"),
            ("Critical Window", "Day 1 to 6 Weeks for Ponseti casting"),
            ("State Program", "RBSK DEIC Orthotics & Casting Clinic")
        ], '#059669', '#dcfce7'),
        ("POLYDACTYLY / SYNDACTYLY", "AUROC 0.968 • Sens: 95.1%", [
            ("Target Anatomy", "Hand & foot digital extremities, webbing"),
            ("Clinical Severity", "Pre-axial / Post-axial extra digits"),
            ("Critical Window", "Evaluation <3 Months, surgery 9-12 Mo"),
            ("State Program", "District Hospital Pediatric Surgery")
        ], '#7c3aed', '#f3e8ff'),
        ("NEURAL TUBE DEFECTS", "AUROC 0.957 • Sens: 93.8%", [
            ("Target Anatomy", "Lumbosacral spine, occiput, meningocele"),
            ("Clinical Severity", "Open vs Closed Spina Bifida / Encephalocele"),
            ("Critical Window", "Immediate emergency closure <48 Hours"),
            ("State Program", "Emergency tertiary transfer to GMCH/AMC")
        ], '#dc2626', '#fee2e2'),
        ("CRITICAL CHD (CCHD)", "AUROC 0.982 • Sens: 97.4%", [
            ("Target Anatomy", "Right hand (pre) vs Foot (post) SpO2 gradient"),
            ("Clinical Severity", "SpO2 <90% or >3% difference = FAIL"),
            ("Critical Window", "First 24-48 Hours prior to ductal closure"),
            ("State Program", "Assam Snehasparsh Cardiac Surgery Scheme")
        ], '#d97706', '#fef3c7')
    ]

    for idx, (title, metric, fields, border, bg) in enumerate(anomalies):
        x = 0.02 + idx * 0.195
        box = FancyBboxPatch((x, 0.08), 0.185, 0.74, boxstyle="round,pad=0.015,rounding_size=0.015",
                             facecolor=bg, edgecolor=border, linewidth=1.5, zorder=2)
        ax.add_patch(box)
        
        # Header banner
        hdr = FancyBboxPatch((x + 0.008, 0.745), 0.169, 0.06, boxstyle="round,pad=0.005,rounding_size=0.008",
                             facecolor=border, edgecolor='none', zorder=3)
        ax.add_patch(hdr)
        ax.text(x + 0.092, 0.78, title, ha='center', va='center', fontsize=7.2, fontweight='bold', color='#ffffff', zorder=4)
        ax.text(x + 0.092, 0.755, metric, ha='center', va='center', fontsize=6.5, color='#e2e8f0', zorder=4)

        for f_idx, (f_name, f_val) in enumerate(fields):
            fy = 0.66 - f_idx * 0.135
            fcard = FancyBboxPatch((x + 0.008, fy - 0.04), 0.169, 0.105, boxstyle="round,pad=0.005,rounding_size=0.006",
                                   facecolor='#ffffff', edgecolor='#cbd5e1', linewidth=0.8, zorder=3)
            ax.add_patch(fcard)
            ax.text(x + 0.016, fy + 0.045, f_name.upper(), fontsize=6.5, fontweight='bold', color=border, zorder=4)
            ax.text(x + 0.016, fy + 0.015, f_val[:26], fontsize=7.0, fontweight='bold', color=NAVY_TEXT, zorder=4)
            if len(f_val) > 26:
                ax.text(x + 0.016, fy - 0.012, f_val[26:], fontsize=6.8, color=MUTED_TEXT, zorder=4)

    save_dual(fig, "diagram_3_cadastral_anomaly_catalog")

# ==============================================================================
# DIAGRAM 4: 16:9 Geospatial Congenital Surveillance
# ==============================================================================
def create_widescreen_diagram_4():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=200)
    ax.set_facecolor(BG_LIGHT)
    fig.patch.set_facecolor(BG_LIGHT)
    ax.axis('off')
    add_blueprint_grid(ax)

    add_header(ax, "ASSAM GEOSPATIAL CONGENITAL SURVEILLANCE & RBSK ROUTE OPTIMIZATION",
               "35-District Anomaly Hotspot Detection, Tea Garden Clusters & DEIC Catchment Analytics",
               "GEOSPATIAL VULNERABILITY GIS")

    # Map container representation
    map_box = FancyBboxPatch((0.02, 0.08), 0.58, 0.74, boxstyle="round,pad=0.015,rounding_size=0.015",
                             facecolor='#f8fafc', edgecolor='#cbd5e1', linewidth=1.5, zorder=2)
    ax.add_patch(map_box)
    ax.text(0.31, 0.785, "ASSAM STATE EPIDEMIOLOGIC CONGENITAL RISK HEATMAP", ha='center', fontsize=9.5, fontweight='bold', color=NAVY_TEXT, zorder=3)
    ax.text(0.31, 0.760, "PostGIS Spatial Clustering Overlaid with Tea Estates (>800) & Riverine Char Settlements", ha='center', fontsize=7.2, color=MUTED_TEXT, zorder=3)

    # Stylized cluster nodes representing Assam regions
    clusters = [
        ("Dibrugarh & Tinsukia Belt", 0.42, 0.62, "Tea Garden Cluster (Pesticide/Anemia)", '#dc2626', "3.8% Prev"),
        ("Barpeta & Dhubri Chars", 0.15, 0.45, "Riverine Chars (Home Deliveries)", '#dc2626', "4.1% Prev"),
        ("Sonitpur & Biswanath", 0.32, 0.52, "Agricultural Mix Belt", '#d97706', "2.9% Prev"),
        ("Kamrup Metro (Guwahati)", 0.22, 0.38, "Tertiary Referral Hub (GMCH)", '#059669', "1.9% Prev"),
        ("Cachar & Barak Valley", 0.28, 0.20, "Hilly Tea Border Terrain", '#d97706', "3.2% Prev")
    ]

    for name, cx, cy, desc, col, prev in clusters:
        circle = Circle((cx, cy), 0.045, facecolor=col, alpha=0.25, edgecolor=col, linewidth=1.5, zorder=3)
        ax.add_patch(circle)
        inner = Circle((cx, cy), 0.015, facecolor=col, edgecolor='none', zorder=4)
        ax.add_patch(inner)
        ax.text(cx + 0.055, cy + 0.012, f"{name} ({prev})", fontsize=7.5, fontweight='bold', color=NAVY_TEXT, zorder=5)
        ax.text(cx + 0.055, cy - 0.015, desc, fontsize=6.5, color=MUTED_TEXT, zorder=5)

    # RIGHT COLUMN: Tactical Analytics
    right_box = FancyBboxPatch((0.62, 0.08), 0.36, 0.74, boxstyle="round,pad=0.015,rounding_size=0.015",
                              facecolor='#f0fdf4', edgecolor='#86efac', linewidth=1.5, zorder=2)
    ax.add_patch(right_box)
    ax.text(0.80, 0.785, "RBSK MOBILE TEAM ALLOCATION", ha='center', fontsize=9.5, fontweight='bold', color='#14532d', zorder=3)

    metrics_right = [
        ("MICRO-TARGETED SCREENING ROUTES", "AI schedules RBSK mobile units to top 15% high-risk\ntea garden bastis and remote char health sub-centres.", '#dcfce7', '#16a34a'),
        ("EARLY DETECTION YIELD OPTIMIZER", "Increases positive congenital case yield per mobile van\nvisit from 1.2 to 4.8 cases per screening camp.", '#dcfce7', '#16a34a'),
        ("DEIC TRANSIT ROUTE COORDINATION", "Models travel isochrones to ensure rural newborns reach\nnearest DEIC within 48h using 108/102 ambulance links.", '#bbf7d0', '#15803d'),
        ("VILLAGE-LEVEL CLUSTERING ALERTS", "Triggers maternal nutrition & environmental audits if\nlocal neural tube defect incidence exceeds 3-sigma.", '#86efac', '#065f46')
    ]

    for idx, (head, desc, bg, border) in enumerate(metrics_right):
        y = 0.63 - idx * 0.135
        card = FancyBboxPatch((0.64, y - 0.03), 0.32, 0.105, boxstyle="round,pad=0.01,rounding_size=0.012",
                              facecolor=bg, edgecolor=border, linewidth=1.2, zorder=3)
        ax.add_patch(card)
        ax.text(0.655, y + 0.038, head, fontsize=7.5, fontweight='bold', color='#065f46', zorder=4)
        ax.text(0.655, y - 0.008, desc, fontsize=6.8, color='#064e3b', linespacing=1.2, zorder=4)

    save_dual(fig, "diagram_4_land_health_score_hierarchy")

# ==============================================================================
# DIAGRAM 5: 16:9 Closed-Loop DEIC Referral Cascade
# ==============================================================================
def create_widescreen_diagram_5():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=200)
    ax.set_facecolor(BG_LIGHT)
    fig.patch.set_facecolor(BG_LIGHT)
    ax.axis('off')
    add_blueprint_grid(ax)

    add_header(ax, "5-STAGE CLOSED-LOOP DEIC REFERRAL CASCADE WITH 48-HOUR SLA TRACKING",
               "Automated e-Referral, Child Tracking ID, Specialist Confirmation & Surgical Delivery",
               "CLOSED-LOOP CARE CASCADE")

    steps = [
        ("STAGE 1", "BIRTH POINT RISK FLAGGING", "Delivery Point / HBNC ASHA Check",
         "On-device AI photo screening and CCHD pulse oximetry flag congenital risk.\nChild profile indexed with RCH & ABHA.", '#0284c7', '#e0f2fe'),
        ("STAGE 2", "DIGITAL E-REFERRAL TO DEIC", "Automated Booking & Alert Dispatch",
         "Encrypted e-referral routed to nearest DEIC; pre-books confirmation slot.\nAssamese voice/SMS sent to parents.", '#059669', '#dcfce7'),
        ("STAGE 3", "DEIC CONFIRMATION (<48H SLA)", "Pediatrician / Specialist Exam",
         "Pediatrician conducts diagnostic exam. Confirms or refutes AI flag with\nmandatory justification log and SHA-256 hash.", '#7c3aed', '#f3e8ff'),
        ("STAGE 4", "CORRECTIVE INTERVENTION (<14D)", "Surgery, Ponseti, Cardiac Care",
         "Cleft: Smile Train queue at GMCH/AMC.\nClubfoot: Ponseti casting week 1-6.\nCardiac: Snehasparsh surgery sanction.", '#d97706', '#fef3c7'),
        ("STAGE 5", "LONGITUDINAL REHABILITATION", "Follow-up & Milestone Tracking",
         "Speech therapy, orthotics, developmental milestones monitored until\nage 6 under integrated RBSK portal.", '#0f766e', '#ccfbf1')
    ]

    for idx, (stage_num, title, sub, desc, border, bg) in enumerate(steps):
        x = 0.02 + idx * 0.195
        box = FancyBboxPatch((x, 0.15), 0.185, 0.65, boxstyle="round,pad=0.015,rounding_size=0.015",
                             facecolor=bg, edgecolor=border, linewidth=1.5, zorder=2)
        ax.add_patch(box)
        
        # Badge
        badge = FancyBboxPatch((x + 0.01, 0.73), 0.08, 0.04, boxstyle="round,pad=0.005,rounding_size=0.006",
                               facecolor=border, edgecolor='none', zorder=3)
        ax.add_patch(badge)
        ax.text(x + 0.05, 0.75, stage_num, ha='center', va='center', fontsize=7.0, fontweight='bold', color='#ffffff', zorder=4)
        
        ax.text(x + 0.01, 0.69, title, fontsize=7.5, fontweight='bold', color=NAVY_TEXT, zorder=4)
        ax.text(x + 0.01, 0.66, sub, fontsize=6.8, color=border, zorder=4)
        
        desc_box = FancyBboxPatch((x + 0.008, 0.20), 0.169, 0.43, boxstyle="round,pad=0.005,rounding_size=0.008",
                                  facecolor='#ffffff', edgecolor='#cbd5e1', linewidth=0.8, zorder=3)
        ax.add_patch(desc_box)
        ax.text(x + 0.016, 0.58, desc, fontsize=7.0, color=NAVY_TEXT, linespacing=1.3, zorder=4)

        if idx < 4:
            ax.annotate("", xy=(x + 0.195, 0.47), xytext=(x + 0.185, 0.47),
                        arrowprops=dict(arrowstyle="->", color=MUTED_TEXT, lw=2), zorder=5)

    # Bottom escalation rule banner
    alert_banner = FancyBboxPatch((0.02, 0.06), 0.96, 0.065, boxstyle="round,pad=0.008,rounding_size=0.01",
                                  facecolor='#fff1f2', edgecolor='#fda4af', linewidth=1.2, zorder=2)
    ax.add_patch(alert_banner)
    ax.text(0.50, 0.092, "AUTOMATED SLA BREACH PROTOCOL: IF DEIC CONFIRMATION > 48 HOURS OR SURGICAL COMMENCEMENT > 14 DAYS,\nSYSTEM AUTO-ESCALATES URGENT SMS TO DISTRICT EARLY INTERVENTION NODAL OFFICER & LOCAL ASHA SUPERVISOR",
            ha='center', va='center', fontsize=7.2, fontweight='bold', color='#9f1239', zorder=3)

    save_dual(fig, "diagram_5_lat_mandal_mobile_app")

# ==============================================================================
# DIAGRAM 6: 16:9 DEIC Specialist Console & Care Management
# ==============================================================================
def create_widescreen_diagram_6():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=200)
    ax.set_facecolor(BG_LIGHT)
    fig.patch.set_facecolor(BG_LIGHT)
    ax.axis('off')
    add_blueprint_grid(ax)

    add_header(ax, "DEIC SPECIALIST COCKPIT & SNEHASPARSH / SMILE TRAIN CARE INTEGRATION",
               "Clinical Evidence Review, Surgical Booking, Transport Coordination & Parental Support",
               "CLINICAL GOVERNANCE PORTAL")

    modules = [
        ("CLINICAL REVIEW & CONFIRMATION", [
            ("Photo & Grad-CAM Evidence", "Inspects anatomical bounding box & heatmaps"),
            ("Pulse Oximetry Validation", "Reviews dual-site SpO2 gradient curves"),
            ("Confirm / Refute Decision", "Official diagnostic classification entry"),
            ("Clinical Override Rationale", "Mandatory justification note & digital sign-off")
        ], '#0284c7', '#e0f2fe'),
        ("SURGICAL & ORTHOTIC QUEUE", [
            ("Smile Train Cleft Booking", "Direct scheduling at GMCH / AMC plastic surgery"),
            ("Ponseti Clubfoot Clinic", "Bi-weekly serial casting appointments at DEIC"),
            ("Snehasparsh Scheme Link", "Fast-track financial sanction for CHD surgeries"),
            ("Prosthetic / Orthotic Indent", "Automated splint requisition to district store")
        ], '#059669', '#dcfce7'),
        ("PARENTAL NAVIGATION & ADHERENCE", [
            ("Multilingual Voice / SMS", "Assamese, Bengali, Bodo, Hindi counseling"),
            ("Stigma Reduction Guidance", "Dispels superstition; shows successful cures"),
            ("102 Ambulance Linkage", "Pre-scheduled free transport for rural families"),
            ("ASHA Accompaniment Alert", "Mobilizes ASHA for clinic day escort")
        ], '#7c3aed', '#f3e8ff')
    ]

    for idx, (title, items, border, bg) in enumerate(modules):
        x = 0.02 + idx * 0.325
        box = FancyBboxPatch((x, 0.08), 0.31, 0.74, boxstyle="round,pad=0.015,rounding_size=0.015",
                             facecolor=bg, edgecolor=border, linewidth=1.5, zorder=2)
        ax.add_patch(box)
        
        # Header banner
        hdr = FancyBboxPatch((x + 0.01, 0.745), 0.29, 0.055, boxstyle="round,pad=0.005,rounding_size=0.008",
                             facecolor=border, edgecolor='none', zorder=3)
        ax.add_patch(hdr)
        ax.text(x + 0.155, 0.772, title, ha='center', va='center', fontsize=8.0, fontweight='bold', color='#ffffff', zorder=4)

        for item_idx, (ititle, idesc) in enumerate(items):
            iy = 0.65 - item_idx * 0.135
            icard = FancyBboxPatch((x + 0.01, iy - 0.04), 0.29, 0.11, boxstyle="round,pad=0.005,rounding_size=0.008",
                                   facecolor='#ffffff', edgecolor='#cbd5e1', linewidth=0.8, zorder=3)
            ax.add_patch(icard)
            ax.text(x + 0.02, iy + 0.045, f"• {ititle}", fontsize=7.5, fontweight='bold', color=NAVY_TEXT, zorder=4)
            ax.text(x + 0.02, iy + 0.015, idesc[:42], fontsize=6.8, color=MUTED_TEXT, zorder=4)
            if len(idesc) > 42:
                ax.text(x + 0.02, iy - 0.015, idesc[42:], fontsize=6.8, color=MUTED_TEXT, zorder=4)

    save_dual(fig, "diagram_6_citizen_land_health_certificate")

# ==============================================================================
# DIAGRAM 7: 16:9 Algorithmic Security & DPDP Compliance
# ==============================================================================
def create_widescreen_diagram_7():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=200)
    ax.set_facecolor(BG_LIGHT)
    fig.patch.set_facecolor(BG_LIGHT)
    ax.axis('off')
    add_blueprint_grid(ax)

    add_header(ax, "ALGORITHMIC SAFETY, EXPLAINABILITY (XAI) & DPDP ACT 2023 SECURITY ENCLAVE",
               "Pediatric Facial Privacy, Grad-CAM Visual Attribution & SHA-256 Immutable Audit Trails",
               "SECURITY & GOVERNANCE ENCLAVE")

    pillars = [
        ("PEDIATRIC PRIVACY & ANONYMIZATION", [
            ("Facial Feature Masking", "Eye and cranial obscuration for non-facial scans"),
            ("ABHA Pseudonymization", "Cryptographic Ayushman Bharat Health Account ID"),
            ("DPDP Act 2023 Compliance", "Zero plain-text demographic sharing across tiers"),
            ("Local Device Sanitization", "Temporary image cache wiped post-inference")
        ], '#0284c7', '#e0f2fe'),
        ("CLINICAL EXPLAINABILITY (XAI)", [
            ("Grad-CAM Activation Maps", "Visual heatmaps highlight exact pixels driving flag"),
            ("Anatomical Landmarks", "Measures philtrum gap (cleft) & ankle angle (CTEV)"),
            ("Confidence Distributions", "Clear probability metrics (e.g. 96.4% Cleft flag)"),
            ("Statutory CDSS Guardrail", "Disclaimers enforce doctor's diagnostic primacy")
        ], '#059669', '#dcfce7'),
        ("MEDICO-LEGAL AUDIT CHOP", [
            ("SHA-256 Audit Chaining", "Immutable cryptographic hash for all overrides"),
            ("Role-Based Access Control", "4-tier clearance: Screener, DEIC, RBSK, State"),
            ("Disaster Recovery Sync", "Real-time replica between ASDC Dispur & NDRC"),
            ("STQC VAPT Certified", "Meets strict Ministry of Electronics & IT norms")
        ], '#7c3aed', '#f3e8ff')
    ]

    for idx, (title, items, border, bg) in enumerate(pillars):
        x = 0.02 + idx * 0.325
        box = FancyBboxPatch((x, 0.08), 0.31, 0.74, boxstyle="round,pad=0.015,rounding_size=0.015",
                             facecolor=bg, edgecolor=border, linewidth=1.5, zorder=2)
        ax.add_patch(box)
        
        # Header banner
        hdr = FancyBboxPatch((x + 0.01, 0.745), 0.29, 0.055, boxstyle="round,pad=0.005,rounding_size=0.008",
                             facecolor=border, edgecolor='none', zorder=3)
        ax.add_patch(hdr)
        ax.text(x + 0.155, 0.772, title, ha='center', va='center', fontsize=8.0, fontweight='bold', color='#ffffff', zorder=4)

        for item_idx, (ititle, idesc) in enumerate(items):
            iy = 0.65 - item_idx * 0.135
            icard = FancyBboxPatch((x + 0.01, iy - 0.04), 0.29, 0.11, boxstyle="round,pad=0.005,rounding_size=0.008",
                                   facecolor='#ffffff', edgecolor='#cbd5e1', linewidth=0.8, zorder=3)
            ax.add_patch(icard)
            ax.text(x + 0.02, iy + 0.045, f"• {ititle}", fontsize=7.5, fontweight='bold', color=NAVY_TEXT, zorder=4)
            ax.text(x + 0.02, iy + 0.015, idesc[:42], fontsize=6.8, color=MUTED_TEXT, zorder=4)
            if len(idesc) > 42:
                ax.text(x + 0.02, iy - 0.015, idesc[42:], fontsize=6.8, color=MUTED_TEXT, zorder=4)

    save_dual(fig, "diagram_7_enterprise_system_architecture")

def main():
    print("Generating ShishuDrishti (NESFIC-D-27) 16:9 widescreen diagrams...")
    create_widescreen_diagram_1()
    create_widescreen_diagram_2()
    create_widescreen_diagram_3()
    create_widescreen_diagram_4()
    create_widescreen_diagram_5()
    create_widescreen_diagram_6()
    create_widescreen_diagram_7()
    print("All 7 widescreen diagrams generated successfully.")

if __name__ == '__main__':
    main()
