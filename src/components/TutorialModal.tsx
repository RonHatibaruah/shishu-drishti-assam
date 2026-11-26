import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle, 
  Copy, 
  Download, 
  ExternalLink, 
  HelpCircle, 
  Layers, 
  MapPin, 
  Shield, 
  ShieldAlert, 
  Stethoscope, 
  Activity, 
  HeartPulse, 
  FileText, 
  Clock, 
  Baby, 
  Sparkles 
} from 'lucide-react';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: string) => void;
  onOpenTechnical?: () => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({
  isOpen,
  onClose,
  setActiveTab,
  onOpenTechnical
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (filename: string, textUrl: string) => {
    fetch(textUrl)
      .then(r => r.text())
      .then(text => {
        navigator.clipboard.writeText(text);
        setCopiedNotice(`Copied full text of ${filename} to clipboard!`);
        setTimeout(() => setCopiedNotice(null), 3500);
      })
      .catch(() => {
        setCopiedNotice(`Please download ${filename} directly via the link below.`);
        setTimeout(() => setCopiedNotice(null), 3500);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold">
                  Tutorial & System Guide: ShishuDrishti (শিশু দৃষ্টি)
                </h2>
                <span className="text-[10px] font-mono bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded border border-emerald-600/40">
                  NESFIC-D-27
                </span>
              </div>
              <p className="text-xs text-slate-300">
                What the application is, how to use it, and how to verify every departmental capability.
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

        {/* Step Navigation Pill Tabs */}
        <div className="bg-slate-100 p-2 border-b border-slate-200 flex gap-2 overflow-x-auto text-xs font-semibold">
          {[
            { step: 1, label: '1. What It Is' },
            { step: 2, label: '2. User Roles' },
            { step: 3, label: '3. Feature Tour' },
            { step: 4, label: '4. Official Proposal' }
          ].map(s => (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                activeStep === s.step
                  ? 'bg-emerald-700 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Notification Toast */}
        {copiedNotice && (
          <div className="bg-emerald-800 text-white text-xs px-4 py-2 font-medium flex items-center gap-2 animate-fadeIn">
            <CheckCircle className="w-4 h-4 text-emerald-300" />
            <span>{copiedNotice}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 leading-relaxed flex-1">
          
          {/* STEP 1: What is ShishuDrishti? */}
          {activeStep === 1 && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-emerald-950">
                <h3 className="text-sm font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                  <Baby className="w-4 h-4 text-emerald-700" />
                  What is ShishuDrishti?
                </h3>
                <p>
                  <strong>ShishuDrishti (শিশু দৃষ্টি)</strong> is an artificial intelligence-powered congenital deformity screening, clinical decision support (CDSS), and closed-loop early intervention platform built specifically for the <strong>National Health Mission (NHM) and Health & Family Welfare Department, Government of Assam</strong> under <strong>NESFIC-D-27 (Stream 1 — Government Track: Health Sector)</strong>.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">The Real-World Challenge in Assam:</h4>
                <ul className="space-y-2 pl-2">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0"></span>
                    <span><strong>Delayed Detection Cascade:</strong> Many congenital anomalies (cleft lip/palate, clubfoot, polydactyly, neural tube defects, critical CHD) are detected only after birth or months later, causing missed critical therapeutic windows (e.g. Ponseti casting within 0-6 weeks).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0"></span>
                    <span><strong>Vulnerable Geography:</strong> Tea garden line bastis (Upper Assam) and flood-prone riverine char sandbars (Lower Assam) have high home-delivery rates and limited access to pediatric specialists.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0"></span>
                    <span><strong>Referral Drop-Off:</strong> Over 60% of flagged infants drop out before specialist evaluation at District Early Intervention Centres (DEIC) due to absent digital appointment tracking, travel costs, and parental stigma.</span>
                  </li>
                </ul>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-300 text-amber-900">
                <strong>Statutory Guardrail:</strong> In strict compliance with the challenge mandate, all AI screening outputs function as <em>decision support only</em> and do not replace clinical diagnosis or medical authority.
              </div>

              {onOpenTechnical && (
                <div className="p-4 bg-teal-50 rounded-xl border border-teal-200 flex items-center justify-between gap-3">
                  <div>
                    <h5 className="font-bold text-teal-950 text-xs">Looking for the Technical & Medical Blueprint?</h5>
                    <p className="text-[11px] text-teal-800">
                      Explore the tech stack, medical conditions explained simply, formulas, and layman glossary.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenTechnical();
                    }}
                    className="px-3 py-1.5 bg-teal-700 hover:bg-teal-600 text-white rounded-lg font-bold text-xs shadow-sm transition-all whitespace-nowrap"
                  >
                    Open Tech Blueprint →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: User Roles */}
          {activeStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Role-Based Consoles (Switch using top navigation bar):
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    State Nodal (NHM)
                  </span>
                  <h4 className="font-bold text-slate-900">Executive Surveillance</h4>
                  <p className="text-slate-600">
                    Macro epidemiologic trends, 35-district anomaly heatmaps, state-wide 48h SLA metrics, and budget tracking.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                    DEIC Specialist
                  </span>
                  <h4 className="font-bold text-slate-900">Clinical Confirmation</h4>
                  <p className="text-slate-600">
                    Inspects raw and Grad-CAM images, confirms/refutes AI flags, schedules Ponseti serial casting, and links Snehasparsh funds.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                    ASHA / ANM Screener
                  </span>
                  <h4 className="font-bold text-slate-900">Frontline Edge Screener</h4>
                  <p className="text-slate-600">
                    100% offline edge AI image capture, CCHD pulse oximetry input, and instant DEIC e-referral generation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Feature Tour */}
          {activeStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                Core Capabilities Demonstrated in This Live Prototype:
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-3">
                  <Baby className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">1. Congenital Screening Worklist:</strong>
                    <p className="text-slate-600 mt-0.5">
                      Triage worklist with filterable categories (Cleft, Clubfoot, Polydactyly, Spina Bifida, CCHD) and interactive modal with Bounding Box & Grad-CAM toggles.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">2. Geospatial Hotspots & RBSK Routes:</strong>
                    <p className="text-slate-600 mt-0.5">
                      Interactive Leaflet map showing high-prevalence pockets in tea gardens and chars, with travel time to nearest DEIC.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">3. Closed-Loop DEIC Referral Cascade (48h SLA):</strong>
                    <p className="text-slate-600 mt-0.5">
                      5-stage finite state machine with automatic breach alerts if DEIC evaluation exceeds 48 hours.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">4. Explainable AI & SHA-256 Audit Trails:</strong>
                    <p className="text-slate-600 mt-0.5">
                      Objective landmark metrics (e.g. 8.4mm philtrum gap) and tamper-proof SHA-256 cryptographic logs for every specialist confirmation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Official Proposal Artifacts */}
          {activeStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Official Submission Documents (NESFIC 2026):
              </h3>
              <p className="text-slate-600">
                All artifacts strictly comply with the Assam Startup Uniform Solution Proposal Requirements (USPR).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-3">
                  <h4 className="font-bold text-emerald-950 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-700" />
                    Official Proposal Document
                  </h4>
                  <p className="text-[11px] text-emerald-900">
                    Complete field-by-field responses for Field 1 to Field 5 with embedded 16:9 widescreen diagrams.
                  </p>
                  <div className="flex items-center gap-2">
                    <a
                      href="/downloads/NESFIC_D27_Proposal_Ron_Hatibaruah.pdf"
                      target="_blank"
                      className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded text-xs flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download PDF
                    </a>
                    <button
                      onClick={() => handleCopy('Proposal Text', '/downloads/NESFIC_D27_Proposal_Ron_Hatibaruah.txt')}
                      className="px-3 py-1.5 bg-white border border-emerald-300 text-emerald-800 font-bold rounded text-xs flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Copy Text
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-3">
                  <h4 className="font-bold text-emerald-950 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-700" />
                    Proof of Work (PoW) Dossier
                  </h4>
                  <p className="text-[11px] text-emerald-900">
                    Empirical model benchmarks, edge latency results, CCHD triage protocol, and DPDP Act security enclave.
                  </p>
                  <div className="flex items-center gap-2">
                    <a
                      href="/downloads/NESFIC_D27_Proof_of_Work_Ron_Hatibaruah.pdf"
                      target="_blank"
                      className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded text-xs flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download PDF
                    </a>
                    <button
                      onClick={() => handleCopy('PoW Text', '/downloads/NESFIC_D27_Proof_of_Work_Ron_Hatibaruah.txt')}
                      className="px-3 py-1.5 bg-white border border-emerald-300 text-emerald-800 font-bold rounded text-xs flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Copy Text
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-slate-400 text-[11px]">
            Applicant: Ron Hatibaruah • NESFIC-D-27
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-all"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
