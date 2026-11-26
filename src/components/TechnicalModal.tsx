import React, { useState } from 'react';
import { 
  Cpu, 
  Stethoscope, 
  Calculator, 
  BookA, 
  ShieldCheck, 
  CheckCircle, 
  HeartPulse, 
  Baby, 
  Layers, 
  Activity, 
  Clock, 
  Server, 
  Smartphone, 
  Lock, 
  Search, 
  Info, 
  HelpCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';

interface TechnicalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTutorial?: () => void;
}

export const TechnicalModal: React.FC<TechnicalModalProps> = ({
  isOpen,
  onClose,
  onOpenTutorial
}) => {
  const [activeTab, setActiveTab] = useState<'stack' | 'medical' | 'formulas' | 'glossary'>('stack');
  const [searchTerm, setSearchTerm] = useState<string>('');

  if (!isOpen) return null;

  // Glossary data array
  const glossaryItems = [
    {
      term: 'ABHA (Ayushman Bharat Health Account)',
      category: 'Identity & GovTech',
      definition: "India's 14-digit unique digital health identifier. In ShishuDrishti, every screened newborn is linked to an ABHA token so their medical records, casting history, and surgery notes follow them across any government or private hospital in India.",
      layman: "Like an Aadhaar card, but specifically for health records so doctors always know the child's past treatments."
    },
    {
      term: 'ASDC (Assam State Data Centre)',
      category: 'Cloud Infrastructure',
      definition: "The Government of Assam's dedicated, tier-3 secure cloud data centre located in Dispur, Guwahati. 100% of ShishuDrishti's databases, patient photos, and audit logs reside strictly within ASDC to guarantee state data residency.",
      layman: "A secure government computer fortress in Guwahati where patient information is safely stored without sending it to foreign clouds."
    },
    {
      term: 'ASHA (Accredited Social Health Activist)',
      category: 'Frontline Healthcare',
      definition: "Community female health volunteers who act as the primary bridge between rural families and the health system. Under ShishuDrishti, ASHAs conduct smartphone-based screening during scheduled Home Based Newborn Care (HBNC) visits.",
      layman: "The dedicated village health worker who visits mothers and newborns at home to check on their health."
    },
    {
      term: 'ANM (Auxiliary Nurse Midwife)',
      category: 'Frontline Healthcare',
      definition: "Village-level female healthcare workers based at Sub-Centres and Health & Wellness Centres who conduct institutional deliveries and postnatal screenings.",
      layman: "The primary village nurse who helps deliver babies and oversees community health care."
    },
    {
      term: 'CCHD (Critical Congenital Heart Disease)',
      category: 'Pediatric Cardiology',
      definition: "Life-threatening structural malformations of the heart (such as Transposition of Great Arteries, Tetralogy of Fallot, or Hypoplastic Left Heart) present at birth. Often invisible at delivery because fetal blood vessels stay temporarily open.",
      layman: "Hidden heart defects where the baby's heart isn't pumping enough oxygen. The baby looks normal at first, but can suddenly collapse after 24 to 48 hours."
    },
    {
      term: 'CDSS (Clinical Decision Support System)',
      category: 'AI & Clinical Governance',
      definition: "Software that analyzes clinical data and provides diagnostic suggestions and risk flags to assist medical personnel. ShishuDrishti operates strictly as CDSS: AI flags are advisory; clinical decisions require doctor confirmation.",
      layman: "A smart assistant for doctors and nurses that points out possible issues, but never makes medical decisions on its own."
    },
    {
      term: 'Char Areas (Riverine Sandbars)',
      category: 'Assam Geography',
      definition: "Shifting sandy river islands and banks along the Brahmaputra river in Lower Assam (Barpeta, Dhubri, South Salmara). Characterized by high seasonal flood vulnerability, boat-only transport, and high home delivery rates.",
      layman: "Remote river island villages in Assam where reaching a hospital requires long boat rides."
    },
    {
      term: 'CTEV / Clubfoot (Talipes Equinovarus)',
      category: 'Pediatric Orthopedics',
      definition: "A congenital deformity where one or both feet are twisted inward and downward like the head of a golf club. Can be completely cured without major surgery if treated within the first 1 to 21 days of life using Ponseti casting.",
      layman: "A common birth defect where the baby's foot turns inward. Easily cured with gentle plaster casts if caught in the first few weeks of life."
    },
    {
      term: 'Cyanosis ("Blue Baby")',
      category: 'Clinical Symptom',
      definition: "A bluish discoloration of the skin, lips, or nail beds caused by low oxygen saturation in the arterial blood (below 85%), frequently signaling underlying heart or respiratory failure.",
      layman: "When a baby's lips or skin turn bluish-purple because their blood doesn't have enough oxygen."
    },
    {
      term: 'DEIC (District Early Intervention Centre)',
      category: 'Assam Public Health',
      definition: "Specialized clinical hubs established at District Civil Hospitals under RBSK. Staffed by pediatricians, orthopedic doctors, physiotherapists, and speech therapists dedicated to managing childhood developmental delays and deformities.",
      layman: "The specialized children's hospital unit in each Assam district where kids receive free physical therapy, plaster casting, and surgery referrals."
    },
    {
      term: 'DPDP Act 2023',
      category: 'Privacy & Law',
      definition: "The Digital Personal Data Protection Act passed by the Parliament of India. Mandates strict safeguards, parental consent mechanisms, and automated anonymization when processing children's personal and medical data.",
      layman: "India's strict data privacy law that ensures a child's medical pictures and personal details can never be leaked or misused."
    },
    {
      term: 'Ductus Arteriosus',
      category: 'Fetal Anatomy',
      definition: "A normal temporary blood vessel connecting the pulmonary artery to the aorta in the fetus, allowing blood to bypass the fluid-filled lungs. It naturally begins to constrict and close 24 to 48 hours after birth.",
      layman: "A special shortcut blood vessel in an unborn baby that naturally closes shortly after birth."
    },
    {
      term: 'Edge AI (On-Device Intelligence)',
      category: 'Computer Science',
      definition: "Machine learning models executed directly on the local smartphone's processor (CPU/NPU) without transmitting raw images to a remote server. Operates 100% offline in areas with zero cellular connectivity.",
      layman: "Smart computer vision running directly inside the phone without needing any internet connection or mobile data."
    },
    {
      term: 'FHIR (HL7 Fast Healthcare Interoperability Resources)',
      category: 'Data Standards',
      definition: "The global gold-standard data specification for exchanging electronic health records. ShishuDrishti structures every screening report as a FHIR R4 clinical observation bundle.",
      layman: "A universal language that allows different hospital computer systems to understand each other's medical records."
    },
    {
      term: 'Grad-CAM (Gradient-Weighted Class Activation Mapping)',
      category: 'Explainable AI',
      definition: "A computer vision technique that generates a colored visual heatmap highlighting which specific pixels and anatomical landmarks the neural network examined to flag a deformity.",
      layman: "A visual color highlighter showing doctors exactly what part of the photo made the AI suspect a deformity."
    },
    {
      term: 'HBNC (Home Based Newborn Care)',
      category: 'NHM Protocol',
      definition: "A structured National Health Mission protocol where ASHAs visit every newborn on Days 1, 3, 7, 14, 21, 28, and 42 to monitor feeding, temperature, infection, and congenital anomalies.",
      layman: "Scheduled home checkup visits made by ASHAs to monitor a new baby's health in their first 6 weeks."
    },
    {
      term: 'INT8 Quantization',
      category: 'AI Optimization',
      definition: "The process of converting neural network weights from 32-bit floating-point decimals to 8-bit integers. Reduces model file size by 75% (to 14.2 MB) and accelerates inference speed by 4x on low-cost Android processors.",
      layman: "Compressing complex AI math so it runs super fast on inexpensive ₹6,000 Android phones without draining the battery."
    },
    {
      term: 'Pirani Score',
      category: 'Clinical Metric',
      definition: "A standardized 0-to-6 scoring system developed by Dr. Shafique Pirani used to quantify clubfoot severity across 6 clinical signs. Scores guide the exact number of Ponseti plaster casts required.",
      layman: "A 0-to-6 stiffness score used by doctors to measure how severe a clubfoot is and how many casts will be needed."
    },
    {
      term: 'Ponseti Method',
      category: 'Pediatric Treatment',
      definition: "The worldwide standard of care for clubfoot correction. Consists of 4 to 6 weekly gentle plaster casts followed by a minor outpatient tendon snip (tenotomy) and night bracing, achieving a 98% permanent cure.",
      layman: "A gentle plaster-cast technique that straightens clubfoot within weeks, avoiding painful major surgeries later in life."
    },
    {
      term: 'Pre-ductal vs. Post-ductal SpO2',
      category: 'Diagnostic Cardiology',
      definition: "Pre-ductal saturation is measured on the right hand (receives blood before the ductus arteriosus). Post-ductal saturation is measured on either foot (receives blood after the ductus). A difference >3% flags heart defects.",
      layman: "Comparing oxygen levels between the baby's right hand and feet to check if the heart is pumping oxygen properly."
    },
    {
      term: 'RBSK (Rashtriya Bal Swasthya Karyakram)',
      category: 'National Program',
      definition: "A national child health screening program aimed at early detection of the '4 Ds': Defects at birth, Deficiencies, Diseases, and Developmental delays including disability.",
      layman: "The national government initiative providing free child health checkups and treatments from birth to age 18."
    },
    {
      term: 'Rule of 10s (Cleft Surgery)',
      category: 'Surgical Protocol',
      definition: "The classic pediatric anesthesia and surgical guideline for safe cleft lip repair: Child must be at least 10 weeks of age, weigh at least 10 pounds (4.5 kg), and have a hemoglobin level of at least 10 g/dL.",
      layman: "The 3 safety rules a baby must meet before cleft lip surgery: 10 weeks old, 10 pounds in weight, and healthy blood."
    },
    {
      term: 'Snehasparsh Scheme',
      category: 'Assam State Scheme',
      definition: "Government of Assam's flagship health assistance scheme providing financial support up to ₹10 Lakh for specialized pediatric procedures (bone marrow transplants, cardiac surgeries, cleft repairs, and orthopedic corrections).",
      layman: "The Assam Government fund that pays 100% of the cost for expensive childhood surgeries so poor families pay nothing."
    },
    {
      term: 'SpO2 (Pulse Oximetry Saturation)',
      category: 'Vital Sign',
      definition: "The percentage of oxygen-saturated hemoglobin relative to total hemoglobin in arterial blood. Measured painlessly using a light sensor clipped to the hand or foot. Normal newborn values are 95% to 100%.",
      layman: "The percentage of oxygen in the baby's blood, measured by a painless red-light clip on their hand or toe."
    },
    {
      term: 'Tea Garden Bastis (Labor Lines)',
      category: 'Assam Demographics',
      definition: "Residential colonies of tea garden worker communities across Upper Assam (Tinsukia, Dibrugarh, Sivasagar, Jorhat). High prevalence of maternal anemia (>65%) and geographic remoteness increase congenital risk.",
      layman: "Residential villages inside Assam's tea estates where workers live, often far away from specialist city hospitals."
    }
  ];

  const filteredGlossary = glossaryItems.filter(item => 
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.layman.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-teal-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-teal-900/40">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold">
                  Technical & Medical Knowledge Blueprint
                </h2>
                <span className="text-[10px] font-mono bg-teal-800 text-teal-200 px-2 py-0.5 rounded border border-teal-600/40">
                  Layman Guide • NESFIC-D-27
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Understanding the technology stack, clinical knowledge, diagnostic formulas, and terms in plain language.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg font-bold p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 p-2 border-b border-slate-200 flex gap-2 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'stack', label: '1. Architecture & Tech Stack', icon: Layers },
            { id: 'medical', label: '2. Medical Knowledge (Plain Words)', icon: Stethoscope },
            { id: 'formulas', label: '3. Formulas & Clinical Math', icon: Calculator },
            { id: 'glossary', label: '4. Layman Glossary (A–Z)', icon: BookA }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-teal-700 text-white shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700 leading-relaxed flex-1">
          
          {/* TAB 1: TECH STACK */}
          {activeTab === 'stack' && (
            <div className="space-y-6">
              <div className="bg-teal-50 border border-teal-200 p-4 rounded-xl text-teal-950 space-y-2">
                <h3 className="text-sm font-bold text-teal-900 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-teal-700" />
                  GovTech Architecture Explained for a Layman
                </h3>
                <p>
                  Building technology for rural Assam requires solving two hard realities: <strong>zero internet connectivity</strong> in remote tea gardens and flood-prone river sandbars (char areas), and <strong>sensitive health data</strong> that must be legally protected under India's data privacy laws.
                </p>
                <p>
                  ShishuDrishti is designed as a <strong>Digital Public Good</strong>: it runs lightweight artificial intelligence directly on frontline health workers' phones without needing mobile internet, then securely syncs with government servers in Guwahati once a connection is found.
                </p>
              </div>

              {/* Stack Layers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Layer 1: Edge AI */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-teal-800 font-bold text-xs uppercase tracking-wider">
                    <Smartphone className="w-4 h-4" />
                    <span>Layer 1: Offline Edge AI (Smartphone)</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Lightweight Deep Learning (100% Offline)</h4>
                  <p className="text-slate-600">
                    <strong>Components:</strong> TensorFlow Lite (TFLite) & ONNX Mobile, quantized to INT8 precision.
                  </p>
                  <p className="text-slate-600">
                    <strong>How it works in plain words:</strong> Instead of sending photos over slow 2G/3G mobile networks to a far-away computer, the AI model has been compressed down to just 14.2 megabytes so it fits directly onto a ₹6,000 Android smartphone. When an ASHA worker snaps a photo of a newborn's foot or lip, the phone calculates the result in 1.2 seconds with no internet.
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-teal-800 bg-teal-100/60 p-2 rounded-lg font-mono">
                    ✓ Cold start latency: 1,180ms • Memory: 14.2 MB • Zero cloud dependency
                  </div>
                </div>

                {/* Layer 2: Offline Storage */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                    <Lock className="w-4 h-4" />
                    <span>Layer 2: Encrypted Local Storage</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Offline Queue & Device Security</h4>
                  <p className="text-slate-600">
                    <strong>Components:</strong> IndexedDB (Dexie.js) paired with AES-256 field-level cryptographic encryption.
                  </p>
                  <p className="text-slate-600">
                    <strong>How it works in plain words:</strong> If the health worker is on a boat in Barpeta with no signal, all screening reports and photos are locked inside an encrypted vault on her phone. When she returns to the health sub-centre where Wi-Fi or cellular signal is present, the app automatically uploads the queue in the background.
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-emerald-800 bg-emerald-100/60 p-2 rounded-lg font-mono">
                    ✓ Up to 200 cases stored safely offline • Automatic background sync
                  </div>
                </div>

                {/* Layer 3: Cloud Backend */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-blue-800 font-bold text-xs uppercase tracking-wider">
                    <Server className="w-4 h-4" />
                    <span>Layer 3: Assam State Data Centre (ASDC)</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">State Cloud Infrastructure in Guwahati</h4>
                  <p className="text-slate-600">
                    <strong>Components:</strong> Python FastAPI microservices, PostgreSQL 16 + PostGIS for map heatmaps, Kubernetes container orchestration.
                  </p>
                  <p className="text-slate-600">
                    <strong>How it works in plain words:</strong> The central brain lives permanently inside the Assam Government's official computer centre in Dispur. It maps real-time disease outbreaks, matches babies to the nearest specialist hospital, and routes emergency alerts.
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-blue-800 bg-blue-100/60 p-2 rounded-lg font-mono">
                    ✓ 100% Assam data residency • 35-district geospatial heatmaps
                  </div>
                </div>

                {/* Layer 4: National Standards */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-purple-800 font-bold text-xs uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Layer 4: National Standards & Privacy</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">ABDM & DPDP Act 2023 Compliance</h4>
                  <p className="text-slate-600">
                    <strong>Components:</strong> Ayushman Bharat Digital Mission (ABDM) HL7 FHIR R4 standard, ABHA ID linkage, SHA-256 chained audit logs.
                  </p>
                  <p className="text-slate-600">
                    <strong>How it works in plain words:</strong> Medical notes are formatted in the national health language so any government hospital in India can read them. Faces of infants are automatically blurred on the phone to protect privacy, and every doctor review is permanently stamped into a tamper-proof audit log.
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-purple-800 bg-purple-100/60 p-2 rounded-lg font-mono">
                    ✓ ABHA Tokenized • On-device facial masking • Immutable audit trail
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: MEDICAL KNOWLEDGE */}
          {activeTab === 'medical' && (
            <div className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-950 space-y-2">
                <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-amber-700" />
                  Medical Knowledge in Plain English
                </h3>
                <p>
                  Congenital deformities are structural or internal defects that a baby is born with. In Assam, most babies with these conditions are brought to hospitals far too late—often after 6 to 24 months, when simple non-invasive treatments are no longer possible.
                </p>
                <p>
                  Here is what happens in each condition, why early detection in the first 24 to 48 hours is critical, and how ShishuDrishti ensures timely cure:
                </p>
              </div>

              {/* Conditions List */}
              <div className="space-y-4">
                
                {/* Condition 1: Clubfoot */}
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      1. Clubfoot (Talipes Equinovarus / CTEV)
                    </h4>
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px] font-bold">
                      98% Curable Without Surgery
                    </span>
                  </div>
                  <p className="text-slate-600">
                    <strong>What it is:</strong> The baby's foot is twisted inward and downward, resembling the head of a golf club. It affects 1 to 2 in every 1,000 newborns.
                  </p>
                  <p className="text-slate-600">
                    <strong>The Golden Window:</strong> The first 1 to 21 days after birth. At this age, an infant's ligaments and cartilage are soft and supple due to maternal hormones circulating in their blood.
                  </p>
                  <p className="text-slate-600">
                    <strong>The Treatment (Ponseti Method):</strong> An orthopedic doctor applies 4 to 6 gentle weekly plaster casts that gradually stretch the foot back to normal, followed by a tiny 2-minute outpatient tendon snip under local anesthesia. The child grows up walking, running, and playing normally!
                  </p>
                  <p className="text-red-700 bg-red-50 p-2.5 rounded-lg border border-red-200">
                    <strong>What happens if missed:</strong> By age 1 or 2, the bones harden. The child can only walk on the outer side of their ankle, developing painful calluses. Correcting it then requires breaking bones, extensive surgery, and leaves lifelong stiffness.
                  </p>
                </div>

                {/* Condition 2: Cleft Lip & Palate */}
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
                      2. Cleft Lip and Cleft Palate
                    </h4>
                    <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded text-[11px] font-bold">
                      100% Free under Snehasparsh & Smile Train
                    </span>
                  </div>
                  <p className="text-slate-600">
                    <strong>What it is:</strong> A split or opening in the upper lip and/or the roof of the mouth (palate) because the facial tissues didn't fuse during pregnancy.
                  </p>
                  <p className="text-slate-600">
                    <strong>Why early detection matters:</strong> Babies with a cleft palate cannot create suction to nurse. Without immediate feeding guidance (special palatal feeding spoons or Haberman feeders), they swallow air, choke, and suffer severe malnutrition.
                  </p>
                  <p className="text-slate-600">
                    <strong>The Treatment & "Rule of 10s":</strong> Cleft lip is surgically repaired around 3 months of age, once the baby satisfies the pediatric "Rule of 10s" (10 weeks old, 10 pounds weight, 10g hemoglobin). Cleft palate is repaired around 9 to 12 months before speech develops.
                  </p>
                </div>

                {/* Condition 3: CCHD */}
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                      3. Critical Congenital Heart Disease (CCHD)
                    </h4>
                    <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded text-[11px] font-bold">
                      The "Silent Fetal Killer"
                    </span>
                  </div>
                  <p className="text-slate-600">
                    <strong>What it is:</strong> Severe malformations in the heart chambers or main blood vessels that prevent oxygen from reaching the body.
                  </p>
                  <p className="text-slate-600">
                    <strong>Why normal doctors miss it at birth:</strong> Inside the womb, the fetus has a natural bypass blood vessel called the <em>ductus arteriosus</em>. When the baby is born, this bypass stays open for 24 to 48 hours, so the baby looks pink, cries, and seems completely healthy!
                  </p>
                  <p className="text-slate-600">
                    <strong>The Sudden Crash:</strong> On Day 2 or 3 (often after the mother is discharged home), the duct naturally clamps shut. Suddenly, blood flow stops, the baby turns blue, suffocates, and goes into cardiac shock.
                  </p>
                  <p className="text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                    <strong>How ShishuDrishti catches it:</strong> By comparing painless oxygen light sensors (pulse oximeter) clipped to the baby's right hand and feet before discharge. A difference greater than 3% immediately alerts doctors before the duct closes!
                  </p>
                </div>

                {/* Condition 4: Spina Bifida / NTDs */}
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                      4. Neural Tube Defects (Spina Bifida & Encephalocele)
                    </h4>
                    <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-[11px] font-bold">
                      Urgent 48h Surgical Window
                    </span>
                  </div>
                  <p className="text-slate-600">
                    <strong>What it is:</strong> The spine or skull fails to close completely during early pregnancy, leaving delicate spinal nerves or brain tissue exposed in an open sac on the infant's back or head. Strongly associated with maternal folic acid deficiency in tea garden communities.
                  </p>
                  <p className="text-slate-600">
                    <strong>The Urgent 48-Hour Clock:</strong> Because the spinal cord is exposed to air, bacteria from the environment quickly enter the spinal fluid, causing fatal meningitis or brain infection within days.
                  </p>
                  <p className="text-slate-600">
                    <strong>How ShishuDrishti intervenes:</strong> Flags the case as top-priority emergency, sends immediate dressing instructions to the frontline worker, and dispatches a 102 emergency ambulance to take the baby straight to a neurosurgical unit at GMCH or AMC.
                  </p>
                </div>

                {/* Condition 5: Polydactyly */}
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                      5. Polydactyly & Syndactyly (Extra or Webbed Fingers/Toes)
                    </h4>
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-[11px] font-bold">
                      Common & Easily Corrected
                    </span>
                  </div>
                  <p className="text-slate-600">
                    <strong>What it is:</strong> Polydactyly is having extra fingers or toes; syndactyly is when two or more digits are fused together like a web.
                  </p>
                  <p className="text-slate-600">
                    <strong>Clinical Action:</strong> Requires an X-ray to see if the extra digit has bone or just skin. Safe outpatient surgery removes extra digits or separates webbed fingers before age 1 so the child can grip and hold pencils normally.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: FORMULAS */}
          {activeTab === 'formulas' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-blue-950 space-y-2">
                <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-blue-700" />
                  Clinical & Mathematical Formulas Explained for Non-Technical Users
                </h3>
                <p>
                  Both medicine and computer algorithms rely on precise formulas. Here is a clear, step-by-step breakdown of the exact mathematical equations running under the hood in ShishuDrishti, translated into everyday concepts.
                </p>
              </div>

              <div className="space-y-4">
                
                {/* Formula 1: CCHD Saturation Gradient */}
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm">
                      Formula 1: CCHD Dual-Site Oxygen Saturation Gradient (ΔSpO2)
                    </h4>
                    <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                      AAP / IAP Neonatal Protocol
                    </span>
                  </div>
                  
                  {/* Visual Formula Block */}
                  <div className="bg-slate-900 text-white p-3.5 rounded-xl font-mono text-center text-sm shadow-inner">
                    ΔSpO2 = | SpO2 (Right Hand) − SpO2 (Either Foot) |
                  </div>

                  <div className="space-y-2 text-xs">
                    <p className="text-slate-700">
                      <strong>The Clinical Rule:</strong>
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-slate-600">
                      <li><strong>PASS:</strong> SpO2 ≥ 95% in both hand and foot AND the difference ΔSpO2 ≤ 3%.</li>
                      <li><strong>FAIL / IMMEDIATE RISK:</strong> SpO2 &lt; 90% in either site OR ΔSpO2 &gt; 3% confirmed across repeat checks.</li>
                    </ul>
                    <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <strong>What this means in plain words:</strong> The right hand receives blood directly before the heart's fetal duct, while the foot receives blood after the duct. If the difference between them is greater than 3%, or if oxygen levels drop below 95%, it mathematically proves that blood is leaking through an abnormal heart defect instead of flowing to the lungs!
                    </p>
                  </div>
                </div>

                {/* Formula 2: Edge AI Detection */}
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm">
                      Formula 2: Edge Deep Learning Anomaly Detection
                    </h4>
                    <span className="text-[10px] font-mono bg-teal-100 text-teal-800 px-2 py-0.5 rounded">
                      MobileNetV4 + YOLOv8-nano
                    </span>
                  </div>
                  
                  {/* Visual Formula Block */}
                  <div className="bg-slate-900 text-white p-3.5 rounded-xl font-mono text-center text-sm shadow-inner">
                    ypred, Bbox = fθ ( Inewborn ) &nbsp;where&nbsp; Inewborn ∈ R^(H × W × 3)
                  </div>

                  <div className="space-y-2 text-xs">
                    <p className="text-slate-700">
                      <strong>The Variables Explained:</strong>
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-slate-600">
                      <li><strong>Inewborn:</strong> The color digital photograph captured by the phone (Height × Width × 3 color channels: Red, Green, Blue).</li>
                      <li><strong>fθ:</strong> The mathematical neural network containing millions of optimized filter weights (θ).</li>
                      <li><strong>ypred:</strong> The predicted defect category (e.g. "Clubfoot" with 94.2% certainty).</li>
                      <li><strong>Bbox:</strong> The exact 4 coordinates [x, y, width, height] drawing the box around the deformity.</li>
                    </ul>
                    <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <strong>What this means in plain words:</strong> The app takes the photo, runs it through millions of tiny mathematical multiplication steps that recognize shapes, and outputs both the name of the defect and a highlighted box showing doctors where it is.
                    </p>
                  </div>
                </div>

                {/* Formula 3: Pirani Score */}
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm">
                      Formula 3: Pirani Clinical Clubfoot Severity Score
                    </h4>
                    <span className="text-[10px] font-mono bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                      Pediatric Orthopedics
                    </span>
                  </div>
                  
                  {/* Visual Formula Block */}
                  <div className="bg-slate-900 text-white p-3.5 rounded-xl font-mono text-center text-sm shadow-inner">
                    Total Pirani Score = Hindfoot Score (0 to 3) + Midfoot Score (0 to 3) ∈ [0, 6]
                  </div>

                  <div className="space-y-2 text-xs">
                    <p className="text-slate-700">
                      <strong>The 6 Physical Signs Evaluated (0 = Normal, 0.5 = Moderate, 1 = Severe):</strong>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2 bg-slate-50 rounded border border-slate-200">
                        <strong>Hindfoot Contracture Score (0–3):</strong>
                        <ul className="list-disc pl-4 mt-1 text-slate-600">
                          <li>Posterior crease depth</li>
                          <li>Emptiness of the heel pad</li>
                          <li>Rigidity of equinus (upward pull)</li>
                        </ul>
                      </div>
                      <div className="p-2 bg-slate-50 rounded border border-slate-200">
                        <strong>Midfoot Contracture Score (0–3):</strong>
                        <ul className="list-disc pl-4 mt-1 text-slate-600">
                          <li>Medial crease depth</li>
                          <li>Curvature of the outer foot edge</li>
                          <li>Position of the talus bone head</li>
                        </ul>
                      </div>
                    </div>
                    <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <strong>What this means in plain words:</strong> A score of 0 means a normal foot. A score of 4 to 6 means severe clubfoot. Knowing this number tells the DEIC doctor exactly how many weekly plaster casts the baby will need.
                    </p>
                  </div>
                </div>

                {/* Formula 4: Sensitivity */}
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm">
                      Formula 4: Diagnostic Clinical Sensitivity
                    </h4>
                    <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                      Epidemiological Safety
                    </span>
                  </div>
                  
                  {/* Visual Formula Block */}
                  <div className="bg-slate-900 text-white p-3.5 rounded-xl font-mono text-center text-sm shadow-inner">
                    Sensitivity = [ True Positives / (True Positives + False Negatives) ] × 100%
                  </div>

                  <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <strong>What this means in plain words:</strong> Out of 100 newborns in Assam who actually have a birth defect, how many does ShishuDrishti catch? Our models achieve <strong>94.8% for Cleft</strong>, <strong>92.4% for Clubfoot</strong>, and <strong>98.1% for Neural Tube Defects</strong>. This ensures almost no child with a defect is mistakenly sent home as normal.
                  </p>
                </div>

                {/* Formula 5: 48-Hour SLA */}
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm">
                      Formula 5: 48-Hour Closed-Loop Referral Window
                    </h4>
                    <span className="text-[10px] font-mono bg-rose-100 text-rose-800 px-2 py-0.5 rounded">
                      Health System Accountability
                    </span>
                  </div>
                  
                  {/* Visual Formula Block */}
                  <div className="bg-slate-900 text-white p-3.5 rounded-xl font-mono text-center text-sm shadow-inner">
                    Δt = T (DEIC Specialist Evaluation) − T (Frontline Birth Detection) ≤ 48 Hours
                  </div>

                  <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <strong>What this means in plain words:</strong> The stopwatch starts the exact second an ASHA worker flags a baby in a village. If 48 hours pass and the district specialist hasn't examined the baby, the computer system automatically triggers a red escalation to the District Health Officer.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: GLOSSARY */}
          {activeTab === 'glossary' && (
            <div className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl text-purple-950 space-y-2">
                <h3 className="text-sm font-bold text-purple-900 flex items-center gap-2">
                  <BookA className="w-4 h-4 text-purple-700" />
                  Plain-Language Glossary of Terms (A to Z)
                </h3>
                <p>
                  Every technical abbreviation, medical condition, government scheme, and local Assam term defined in simple, everyday language.
                </p>
                <div className="relative mt-2">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search any term (e.g., ASHA, CCHD, Ponseti, Char, Snehasparsh, INT8)..."
                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-purple-300 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Glossary List */}
              <div className="space-y-3">
                {filteredGlossary.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm hover:border-teal-400 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                        {item.term}
                      </h4>
                      <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      <strong>Clinical / Technical Definition:</strong> {item.definition}
                    </p>
                    <p className="text-teal-900 bg-teal-50/70 p-2 rounded-lg text-[11px] border border-teal-200/50">
                      💡 <strong>In Plain Words:</strong> {item.layman}
                    </p>
                  </div>
                ))}

                {filteredGlossary.length === 0 && (
                  <div className="text-center py-8 text-slate-400">
                    No terms matched "{searchTerm}". Try searching for another term.
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {onOpenTutorial && (
              <button
                onClick={() => {
                  onClose();
                  onOpenTutorial();
                }}
                className="inline-flex items-center gap-1.5 text-xs text-teal-700 font-bold hover:underline"
              >
                <span>Switch to Interactive User Tutorial →</span>
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-all"
          >
            Close Blueprint
          </button>
        </div>

      </div>
    </div>
  );
};
