# ShishuDrishti • শিশু দৃষ্টি (Assam Congenital Sentinel)
### AI-Powered Congenital Deformity Screening, Clinical Decision Support & DEIC Early Intervention Network
**National Health Mission (NHM) & Health & Family Welfare Department, Government of Assam**

[![Live Demo](https://img.shields.io/badge/Live_Prototype-shishu--drishti.pages.dev-059669?style=for-the-badge&logo=cloudflarepages)](https://shishu-drishti.pages.dev/)
[![Government of Assam](https://img.shields.io/badge/Government_of_Assam-Health_%26_Family_Welfare-065f46?style=for-the-badge)](https://nhm.assam.gov.in/)
[![Challenge ID](https://img.shields.io/badge/NESFIC_2026-Stream_1_--_NESFIC--D--27-0284c7?style=for-the-badge)](https://startup.assam.gov.in/nesfic26/problem-statements/nesfic-d-27)
[![RBSK DEIC](https://img.shields.io/badge/Integrated_with-RBSK_%7C_DEIC_Network-e11d48?style=for-the-badge)](https://nhm.assam.gov.in/)
[![React 18](https://img.shields.io/badge/Frontend-React_18_%7C_TypeScript_%7C_Tailwind-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Leaflet GIS](https://img.shields.io/badge/Geospatial-Leaflet_%7C_PostGIS-199900?style=for-the-badge&logo=leaflet)](https://leafletjs.com/)

> 🌐 **Live Interactive Prototype:** **[https://shishu-drishti.pages.dev/](https://shishu-drishti.pages.dev/)**  
> Explore the Congenital Anomaly Screening Worklist, Assam PostGIS Geospatial Hotspots, Closed-Loop DEIC Referral Cascade, DEIC Specialty Capacity Hub, and Admin Governance Cockpit.
>
> ⚡ **Demo Admin Access:** `admin@nhm.assam.gov.in` / `dispur2026`  
> 💻 **GitHub Repository:** [https://github.com/RonHatibaruah/shishu-drishti-assam](https://github.com/RonHatibaruah/shishu-drishti-assam)

---

## 🏛️ Executive Summary

**ShishuDrishti (শিশু দৃষ্টি)** is an enterprise AI-powered congenital deformity screening, clinical decision support (CDSS), and closed-loop early intervention network developed for the **National Health Mission (NHM) and Health & Family Welfare Department, Government of Assam** under **NESFIC-D-27 (Stream 1 — Government Track: Health Sector: Earlier Identification of Congenital Deformities for Timely Care)**.

In Assam, where ~9.5 lakh births occur annually, congenital anomalies account for 8–15% of neonatal mortality and represent a leading cause of preventable childhood disability. Crucial structural and functional deformities—such as **cleft lip/palate, clubfoot (CTEV), extra digits (polydactyly), neural tube defects (spina bifida), and critical congenital heart disease (CCHD)**—are frequently missed during manual, unstructured visual checks at delivery. Children in vulnerable populations (tea garden line bastis in Upper Assam and riverine char communities in Lower Assam) face acute diagnostic delays, presenting months or years later when critical therapeutic windows (such as Ponseti casting within the first 6 weeks of life) have passed. Furthermore, over 60% of flagged infants drop out of care due to absent referral tracking and parental stigma.

**ShishuDrishti transforms Assam’s neonatal screening from passive, delayed observation to proactive, closed-loop early intervention:**

1. **Multi-Defect On-Device Computer Vision (Edge AI):** Quantized INT8 deep learning models (YOLOv8-Nano / MobileNetV4) run 100% offline on standard ASHA and ANM Android smartphones, instantly flagging visible birth defects with 91.8% sensitivity and 95% specificity.
2. **Critical Congenital Heart Disease (CCHD) Triage:** Implements the standardized dual-site pulse oximetry protocol (pre-ductal right hand vs post-ductal foot SpO2 gradient) to catch ductal-dependent cardiac lesions before neonatal cardiovascular collapse.
3. **Statutory CDSS Guardrails:** All AI scores and bounding boxes operate strictly as Clinical Decision Support Systems (CDSS) that assist, rather than replace, clinical judgment by qualified medical officers and pediatricians.
4. **Closed-Loop DEIC Referral Cascade (< 48h SLA):** Generates automated e-referrals to District Early Intervention Centres (DEIC) with pre-booked slots, tracking child trajectories from birth detection to surgical completion and milestone rehabilitation.
5. **Geospatial Surveillance & RBSK Routing:** PostGIS spatial clustering identifies high-prevalence pockets in tea garden bastis and riverine chars, optimizing daily routes for RBSK mobile health teams.
6. **DEIC Specialist Cockpit & Surgical Linkage:** Coordinates serial Ponseti casting, Smile Train cleft surgical queues, and Snehasparsh financial sanctions for pediatric cardiac surgeries.
7. **Culturally Resonant Parental Support:** Delivers stigma-reducing voice and SMS guidance in Assamese, Bengali, Bodo, and Hindi directly to parents, confirming free treatment and travel allowances under Assam state welfare schemes.
8. **DPDP Act 2023 & ABDM Security Enclave:** Pediatric facial anonymization, cryptographic ABHA pseudonymization, and tamper-proof SHA-256 audit chaining for all clinical confirmations.

---

## 📸 Architectural Visualizations & Evidentiary Diagrams

### 1. Paradigm Shift: Manual Screening vs. ShishuDrishti Closed-Loop Care
![Paradigm Shift](assets/proposal_images/diagram_1_before_after_workflow.jpg)

### 2. ASDC Enterprise Architecture & On-Device Edge AI Pipeline
![Enterprise Architecture](assets/proposal_images/diagram_2_dual_system_reconciliation.jpg)

### 3. Congenital Anomaly Detection Catalog & Diagnostic Performance
![Anomaly Catalog](assets/proposal_images/diagram_3_cadastral_anomaly_catalog.jpg)

### 4. Assam Geospatial Congenital Surveillance & RBSK Mobile Health Router
![Geospatial Surveillance](assets/proposal_images/diagram_4_land_health_score_hierarchy.jpg)

### 5. 5-Stage Closed-Loop DEIC Referral Pipeline with 48-Hour SLA Tracking
![Referral Pipeline](assets/proposal_images/diagram_5_lat_mandal_mobile_app.jpg)

### 6. DEIC Specialist Cockpit & Snehasparsh / Smile Train Care Coordination
![DEIC Specialist Console](assets/proposal_images/diagram_6_citizen_land_health_certificate.jpg)

### 7. Algorithmic Safety, Explainability (XAI) & DPDP Act 2023 Enclave
![Security Enclave](assets/proposal_images/diagram_7_enterprise_system_architecture.jpg)

---

## 🛠️ Technology Architecture & Technical Feasibility

| Architectural Layer | Implementation Technology | Departmental Purpose & Production Feasibility |
| :--- | :--- | :--- |
| **Frontline Mobile Edge** | React 18, TypeScript, PWA, Tailwind CSS | 100% offline edge execution for ASHAs & ANMs in tea gardens & char areas |
| **Edge AI Inference** | TensorFlow Lite / ONNX Web Runtime (INT8) | Sub-40ms on-device inference on low-cost Android hardware |
| **State Cloud Enclave** | Assam State Data Centre (ASDC), Docker, K8s | Complete data residency within state boundaries; zero external cloud lock-in |
| **Spatial Database** | PostgreSQL 16 + PostGIS 3.4 | Micro-targeting high-risk clusters, tea garden bastis & DEIC isochrones |
| **National Standards** | ABDM (ABHA M1-M3), FHIR R4, RCH MCTS | Unified national health records, pediatric privacy & interoperability |
| **Security & Non-Repudiation** | AES-256 GCM, SHA-256 Audit Chaining | Full compliance with Digital Personal Data Protection (DPDP) Act 2023 |

---

## 🚀 Quick Start & Local Execution

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- Python 3.10+ (for diagram and PDF generation)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/RonHatibaruah/shishu-drishti-assam.git
cd shishu-drishti-assam
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Re-Generate Submission PDFs & Widescreen Visualizations
```bash
# Generate 16:9 Widescreen evidentiary diagrams
python3 generate_widescreen_diagrams.py

# Generate official PDF submission dossiers
python3 generate_pdfs.py

# Generate text-area compliant plain-text copies
python3 generate_text_versions.py
```

---

## 📑 Official NESFIC 2026 Submission Deliverables

- **Official Solution Proposal (PDF):** `NESFIC_D27_Proposal_Ron_Hatibaruah.pdf`
- **Proof of Work & Technical Evidence Dossier (PDF):** `NESFIC_D27_Proof_of_Work_Ron_Hatibaruah.pdf`
- **Text-Area Compliant Submission Copy:** `NESFIC_D27_Proposal_Ron_Hatibaruah.txt`
- **Technical Evidence Plain-Text Copy:** `NESFIC_D27_Proof_of_Work_Ron_Hatibaruah.txt`

---

## 👨‍💻 Innovator & Applicant

**Ron Hatibaruah**  
*Lead GovTech Architect & Machine Learning Engineer*  
📧 Email: [ron.hatibaruah@gmail.com](mailto:ron.hatibaruah@gmail.com)  
📍 Location: Guwahati, Assam, India  
🏛️ Challenge Track: **NESFIC 2026 (Stream 1 — Government Track: Health Sector: NESFIC-D-27)**
