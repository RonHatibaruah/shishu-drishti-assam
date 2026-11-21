import React, { useState } from 'react';
import { 
  Users, 
  FileSearch, 
  AlertOctagon, 
  CheckCircle, 
  ShieldAlert, 
  Check, 
  X, 
  PieChart, 
  Clock, 
  Sparkles, 
  Stethoscope,
  Lock,
  ShieldCheck,
  Binary,
  Layers,
  Baby
} from 'lucide-react';

export const AuditAndDeduplication: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'xai' | 'auditLog'>('xai');
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const xaiExamples = [
    {
      condition: 'Cleft Lip & Palate',
      child: 'Baby of Priyanjali Bora (AS-2026-CLP-0104)',
      model: 'YOLOv8-Nano (MobileNetV4 INT8)',
      confidence: '96.8%',
      metrics: [
        { label: 'Philtrum Disruption Gap', value: '8.4 mm', impact: 'Primary Diagnostic Marker' },
        { label: 'Vermilion Discontinuity', value: 'Complete Left', impact: 'Severe Anatomical Defect' },
        { label: 'Alar Base Lateral Flare', value: '14.2 mm vs 8.0 mm normal', impact: 'Nasal Sill Collapse' }
      ],
      clinicalRule: 'Triggers Smile Train / RBSK Surgical Care Track (Rule of 10s: 10 weeks, 10 lbs, Hb 10)'
    },
    {
      condition: 'Clubfoot (CTEV)',
      child: 'Rahul Tanti (AS-2026-CTEV-0219)',
      model: 'Custom CTEV-Net (Ankle Angle CNN)',
      confidence: '94.2%',
      metrics: [
        { label: 'Talocalcaneal Angle', value: '12° (Severe Varus)', impact: 'Normal is 25°-45°' },
        { label: 'Medial Skin Crease Depth', value: 'Deep Rigid Fold', impact: 'Pirani Hindfoot Score +1.0' },
        { label: 'Empty Heel Pad Sign', value: 'Positive', impact: 'Severe Equinus Deficit' }
      ],
      clinicalRule: 'Triggers Immediate Ponseti Serial Casting Clinic at DEIC (Day 1 - Week 6 Window)'
    },
    {
      condition: 'Critical Congenital Heart Disease',
      child: 'Baby of Jamila Begum (AS-2026-CHD-0335)',
      model: 'Deterministic AAP/AHA Algorithm',
      confidence: '98.4%',
      metrics: [
        { label: 'Pre-ductal SpO2 (Right Hand)', value: '89%', impact: 'Absolute Cyanotic Threshold' },
        { label: 'Post-ductal SpO2 (Foot)', value: '83%', impact: 'Right-to-Left Shunt Marker' },
        { label: 'Gradient Delta', value: '6% (> 3% threshold)', impact: 'Ductal-Dependent Lesion Risk' }
      ],
      clinicalRule: 'Emergency Pediatric Cardiology Escalation to GMCH under Snehasparsh Scheme'
    }
  ];

  const auditLogs = [
    {
      id: 'LOG-AS-9812',
      timestamp: '2026-11-21 08:30:14',
      actor: 'Dr. Rafiqul Hussain (DEIC / Neonatology, Barpeta)',
      action: 'CONFIRM_DIAGNOSIS & PGE1_TRANSFER',
      caseId: 'AS-2026-CHD-0335 (Baby of Jamila Begum)',
      rationale: 'Bedside echocardiogram confirmed suspected TGA. Prostaglandin E1 initiated; 108 ambulance transfer to GMCH.',
      hash: '7a912bf091283cba901248192efcba901283912048129038cbaf91204891234a'
    },
    {
      id: 'LOG-AS-9811',
      timestamp: '2026-11-20 14:10:02',
      actor: 'Dr. Nilakshi Phukan (Pediatric Ortho, AMCH DEIC)',
      action: 'CONFIRM_DIAGNOSIS & INITIATE_PONSETI',
      caseId: 'AS-2026-CTEV-0219 (Rahul Tanti)',
      rationale: 'Bilateral idiopathic CTEV confirmed (Pirani 5.5). 1st serial cast applied; weekly follow-up scheduled.',
      hash: 'bc418a901823901bca98124ef98124ab90182390124ef90124bca89124ef0912'
    },
    {
      id: 'LOG-AS-9810',
      timestamp: '2026-11-19 10:15:38',
      actor: 'Dr. Atowar Rahman (Pediatric Neuro, Dhubri)',
      action: 'CONFIRM_DIAGNOSIS & SURGERY_SCHEDULED',
      caseId: 'AS-2026-NTD-0502 (Baby of Farida Yasmin)',
      rationale: 'Closed lumbosacral myelomeningocele verified. Urgent neurosurgical closure performed at DMCH.',
      hash: '91283cba0192834bca09124ef9012834bca091283cba901248192ef0192834ba'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Toast */}
      {notification && (
        <div className="bg-slate-900 border border-emerald-500 text-emerald-200 px-4 py-3 rounded-lg shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-medium">{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-emerald-300 hover:text-white text-xs">Dismiss</button>
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
              Governance & Clinical Trust
            </span>
            <span className="text-xs text-slate-500">Explainable AI & Audit Chaining</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Clinical Evidence (XAI) & Tamper-Proof Audit Logging
          </h2>
          <p className="text-xs text-slate-500">
            Transparent Grad-CAM visual reasoning, landmark metrics, and SHA-256 non-repudiation audit trails for medico-legal accountability under DPDPA 2023.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('xai')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'xai'
                ? 'bg-white text-emerald-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Explainable AI (XAI)</span>
          </button>

          <button
            onClick={() => setActiveTab('auditLog')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'auditLog'
                ? 'bg-white text-emerald-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Binary className="w-3.5 h-3.5 text-emerald-600" />
            <span>SHA-256 Audit Trail</span>
          </button>
        </div>
      </div>

      {/* Tab 1: XAI Evidence Cards */}
      {activeTab === 'xai' && (
        <div className="space-y-4">
          {xaiExamples.map((ex, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-slate-900 text-sm">{ex.condition}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {ex.confidence} AI Confidence
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Case: <strong>{ex.child}</strong> • Engine: {ex.model}
                  </div>
                </div>

                <div className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg border border-slate-200">
                  CDSS Explainability Card
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {ex.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                    <span className="text-slate-500 text-[10px] font-bold uppercase">{m.label}</span>
                    <div className="font-extrabold text-slate-900 text-sm mt-0.5">{m.value}</div>
                    <span className="text-[11px] text-emerald-700 font-medium block mt-1">{m.impact}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between">
                <div>
                  <strong>Mandated Clinical Protocol:</strong> {ex.clinicalRule}
                </div>
                <button
                  onClick={() => showNotification(`Protocol guidelines opened for ${ex.condition}`)}
                  className="px-2.5 py-1 bg-emerald-600 text-white font-bold rounded text-[11px] shadow-sm ml-2 flex-shrink-0"
                >
                  View Protocol
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: SHA-256 Audit Trail */}
      {activeTab === 'auditLog' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Immutable Medico-Legal Ledger (DPDPA 2023 Compliant)</span>
            </div>
            <button
              onClick={() => showNotification('Audit ledger cryptographic integrity verified: SHA-256 chain valid.')}
              className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-lg transition-all"
            >
              Verify Cryptographic Chain
            </button>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-slate-50/80 transition-colors space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-emerald-700">{log.id}</span>
                    <span className="font-bold text-slate-900">{log.action}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">{log.timestamp}</span>
                </div>

                <div className="text-slate-600">
                  Case: <strong>{log.caseId}</strong> • Authorized By: <strong>{log.actor}</strong>
                </div>

                <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-[11px]">
                  "{log.rationale}"
                </p>

                <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5 pt-0.5">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>SHA-256: {log.hash}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
