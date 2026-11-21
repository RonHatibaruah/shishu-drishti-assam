import React, { useState } from 'react';
import { ASSAM_CHILD_RECORDS } from '../data/assam_congenital_data';
import { ChildRecord, ReferralStage } from '../types/congenital';
import { 
  GitCommit, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Send, 
  Search, 
  Filter, 
  FileCheck, 
  Truck,
  PhoneCall,
  ShieldCheck,
  Baby,
  HeartPulse
} from 'lucide-react';

export const ReferralTracker: React.FC = () => {
  const [children, setChildren] = useState<ChildRecord[]>(ASSAM_CHILD_RECORDS);
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('ALL');
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const filtered = children.filter(c => {
    const matchesSearch = 
      c.childName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.motherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.deicCentre.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStage = stageFilter === 'ALL' || c.referralStage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const triggerEscalation = (childId: string, name: string) => {
    setActionMessage(`Urgent 48h SLA breach alert sent to District Early Intervention Nodal Officer for ${name}`);
    setTimeout(() => setActionMessage(null), 4500);
  };

  const advanceStage = (childId: string) => {
    setChildren(prev => prev.map(c => {
      if (c.id === childId) {
        let nextStage: ReferralStage = c.referralStage;
        if (c.referralStage === 'SCREENED_FLAGGED') nextStage = 'DEIC_SCHEDULED';
        else if (c.referralStage === 'DEIC_SCHEDULED') nextStage = 'DEIC_CONFIRMED';
        else if (c.referralStage === 'DEIC_CONFIRMED') nextStage = 'INTERVENTION_UNDERWAY';
        else if (c.referralStage === 'INTERVENTION_UNDERWAY') nextStage = 'REHABILITATION_COMPLETE';

        return {
          ...c,
          referralStage: nextStage,
          elapsedHours: c.elapsedHours + 12,
          slaBreached: false
        };
      }
      return c;
    }));
    setActionMessage(`Care trajectory advanced to next milestone for ${childId}`);
    setTimeout(() => setActionMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {actionMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-slate-900 text-emerald-300 px-4 py-3 rounded-xl shadow-2xl border border-emerald-500/50 flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">{actionMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
              Zero-Leakage Care Cascade
            </span>
            <span className="text-xs text-slate-500">48-Hour SLA Tracking Engine</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Closed-Loop DEIC Early Intervention & Referral Tracker
          </h2>
          <p className="text-xs text-slate-500">
            Monitoring patient pathways from birth detection to DEIC confirmation, surgical intervention, and post-op rehabilitation.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filter referrals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="py-1.5 px-3 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="ALL">All Care Stages</option>
            <option value="SCREENED_FLAGGED">1. Screened & Flagged</option>
            <option value="DEIC_SCHEDULED">2. DEIC Scheduled</option>
            <option value="DEIC_CONFIRMED">3. DEIC Confirmed (&lt;48h)</option>
            <option value="INTERVENTION_UNDERWAY">4. Intervention Underway</option>
            <option value="REHABILITATION_COMPLETE">5. Rehab Complete</option>
          </select>
        </div>
      </div>

      {/* 5-Stage Visual Workflow Card */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xl overflow-x-auto">
        <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">
          Standardized 5-Stage Congenital Care Cascade (SLA &lt; 48h to Confirmation)
        </div>
        <div className="flex items-center justify-between min-w-[700px] text-xs">
          {[
            { step: '1', title: 'Birth Screening Flag', sub: 'Photo AI & Pulse Oximetry' },
            { step: '2', title: 'e-Referral Dispatched', sub: 'Pre-booked DEIC Slot' },
            { step: '3', title: 'DEIC Confirmation', sub: 'SLA < 48h Specialist Exam' },
            { step: '4', title: 'Corrective Care Step', sub: 'Ponseti / Cleft / Surgery' },
            { step: '5', title: 'Rehabilitation', sub: 'Milestone Tracking to Age 6' }
          ].map((st, idx) => (
            <React.Fragment key={st.step}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-700 text-emerald-100 flex items-center justify-center font-bold text-xs border border-emerald-400">
                  {st.step}
                </div>
                <div>
                  <div className="font-bold text-slate-100">{st.title}</div>
                  <div className="text-[10px] text-slate-400">{st.sub}</div>
                </div>
              </div>
              {idx < 4 && <ArrowRight className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Patient Referral Cards */}
      <div className="space-y-4">
        {filtered.map((child) => (
          <div key={child.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-slate-900">{child.childName}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {child.anomalyCategory}
                  </span>
                  <span className="text-xs text-slate-400">• ID: {child.id}</span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Mother: {child.motherName} • District: {child.district} • Pocket: {child.villageOrPocket}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-800 flex items-center gap-1 justify-end">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{child.elapsedHours} Hours Elapsed</span>
                  </div>
                  <div className={`text-[11px] font-semibold ${child.slaBreached ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {child.slaBreached ? '⚠️ SLA BREACH (>48h)' : '✓ Within 48h SLA'}
                  </div>
                </div>

                <button
                  onClick={() => advanceStage(child.id)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-sm transition-all flex items-center gap-1"
                >
                  <span>Advance Stage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="grid grid-cols-5 gap-2 pt-1 text-center text-[11px]">
              {[
                { stage: 'SCREENED_FLAGGED', label: '1. Flagged' },
                { stage: 'DEIC_SCHEDULED', label: '2. DEIC Booked' },
                { stage: 'DEIC_CONFIRMED', label: '3. Confirmed' },
                { stage: 'INTERVENTION_UNDERWAY', label: '4. In Care' },
                { stage: 'REHABILITATION_COMPLETE', label: '5. Rehab' }
              ].map((step, idx) => {
                const stages = ['SCREENED_FLAGGED', 'DEIC_SCHEDULED', 'DEIC_CONFIRMED', 'INTERVENTION_UNDERWAY', 'REHABILITATION_COMPLETE'];
                const currentIdx = stages.indexOf(child.referralStage);
                const isPassed = currentIdx >= idx;
                const isCurrent = currentIdx === idx;

                return (
                  <div
                    key={step.stage}
                    className={`p-2 rounded-lg font-bold border transition-all ${
                      isCurrent
                        ? 'bg-emerald-100 border-emerald-400 text-emerald-900 shadow-sm'
                        : isPassed
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    {step.label}
                  </div>
                );
              })}
            </div>

            {/* Footer Details */}
            <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 gap-2">
              <div className="flex items-center gap-4">
                <span>Nodal Centre: <strong>{child.deicCentre}</strong></span>
                <span>Doctor: <strong>{child.assignedPediatrician}</strong></span>
                <span>Scheme: <strong className="text-emerald-700">{child.welfareScheme}</strong></span>
              </div>

              {child.slaBreached && (
                <button
                  onClick={() => triggerEscalation(child.id, child.childName)}
                  className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 font-bold rounded text-[11px] transition-all flex items-center gap-1"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Escalate to District Nodal Officer</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
