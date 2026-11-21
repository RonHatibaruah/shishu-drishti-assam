import React from 'react';
import { ASSAM_STATEWIDE_KPIS, HIGH_RISK_POCKETS, DEIC_FACILITIES } from '../data/assam_congenital_data';
import { 
  Baby, 
  Activity, 
  ShieldCheck, 
  AlertTriangle, 
  Users, 
  HeartHandshake, 
  Award, 
  Download, 
  ExternalLink,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  HeartPulse,
  Clock,
  Sparkles,
  MapPin
} from 'lucide-react';

export const ExecutiveCommand: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-6 rounded-2xl shadow-xl border border-emerald-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                NHM Assam • RBSK & DEIC State Mission
              </span>
              <span className="text-emerald-400/40">•</span>
              <span className="text-xs text-emerald-200">NESFIC-D-27 Operational Intelligence</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight mt-1">
              ShishuDrishti Executive Congenital Sentinel Cockpit
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Consolidated real-time decision-support system tracking neonatal screening coverage, AI deformity detection yield, 48-hour DEIC confirmation SLAs, and corrective surgical milestones.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/NESFIC_D27_Proposal_Ron_Hatibaruah.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-lg flex items-center gap-1.5 transition-all"
            >
              <Download className="w-4 h-4" />
              Download Proposal (PDF)
            </a>
          </div>
        </div>

        {/* Top 4 KPI Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-emerald-800/80">
          <div className="bg-slate-800/60 p-4 rounded-xl border border-emerald-700/30">
            <span className="text-xs text-emerald-300 font-medium">Newborns Screened YTD</span>
            <div className="text-2xl font-extrabold text-white mt-1">
              {ASSAM_STATEWIDE_KPIS.screenedYearToDate.toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> 92.4% institutional coverage
            </div>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-xl border border-emerald-700/30">
            <span className="text-xs text-emerald-300 font-medium">Congenital Cases Identified</span>
            <div className="text-2xl font-extrabold text-amber-300 mt-1">
              {ASSAM_STATEWIDE_KPIS.congenitalCasesIdentified.toLocaleString()}
            </div>
            <div className="text-[11px] text-amber-400 flex items-center gap-1 mt-1">
              <AlertTriangle className="w-3.5 h-3.5" /> 2.88% anomaly detection rate
            </div>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-xl border border-emerald-700/30">
            <span className="text-xs text-emerald-300 font-medium">DEIC 48h SLA Adherence</span>
            <div className="text-2xl font-extrabold text-emerald-400 mt-1">
              {ASSAM_STATEWIDE_KPIS.deicConfirmationUnder48hRate}%
            </div>
            <div className="text-[11px] text-emerald-300 flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Target: &gt; 85% closed-loop
            </div>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-xl border border-emerald-700/30">
            <span className="text-xs text-emerald-300 font-medium">Median Days to First Care</span>
            <div className="text-2xl font-extrabold text-cyan-300 mt-1">
              {ASSAM_STATEWIDE_KPIS.medianDaysToDeicCare} Days
            </div>
            <div className="text-[11px] text-cyan-400 flex items-center gap-1 mt-1">
              <ArrowDownRight className="w-3.5 h-3.5" /> Down from 135 days baseline
            </div>
          </div>
        </div>
      </div>

      {/* Specific Condition Treatment Milestones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              Cleft Lip & Palate Repair
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-200">
              Smile Train Partner
            </span>
          </div>
          <div className="text-2xl font-black text-slate-800">
            {ASSAM_STATEWIDE_KPIS.cleftSurgeriesCompleted} / 720
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Free cheiloplasty surgeries conducted at GMCH, AMC & Silchar MCH under Rule of 10s protocol.
          </p>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: '88.8%' }}></div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              Clubfoot (CTEV) Ponseti Care
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
              DEIC Orthotics
            </span>
          </div>
          <div className="text-2xl font-black text-slate-800">
            {ASSAM_STATEWIDE_KPIS.ponsetiClubfootEnrolled} Infants
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Enrolled in serial casting within Week 1-2 of birth; 94.2% achieve full functional correction without surgery.
          </p>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full" style={{ width: '92.5%' }}></div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>
              Critical CCHD Cardiac Interventions
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 bg-rose-50 text-rose-700 rounded border border-rose-200">
              Snehasparsh Scheme
            </span>
          </div>
          <div className="text-2xl font-black text-slate-800">
            {ASSAM_STATEWIDE_KPIS.criticalChdSaved} Neonates
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Detected via dual-site pulse oximetry before ductal closure; emergency transfer and surgical repair funded.
          </p>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-rose-600 h-full rounded-full" style={{ width: '95%' }}></div>
          </div>
        </div>
      </div>

      {/* High-Risk Pocket Surveillance & DEIC Facility Catchment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: High-Risk Pockets */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                Vulnerable Pockets (Tea Gardens & Chars)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Surveillance hotspots requiring targeted RBSK mobile health team visits
              </p>
            </div>
            <span className="text-xs font-semibold px-2 py-1 bg-amber-50 text-amber-800 rounded border border-amber-200">
              6 Sentinel Belts
            </span>
          </div>

          <div className="space-y-3">
            {HIGH_RISK_POCKETS.map((pocket) => (
              <div key={pocket.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">{pocket.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded font-medium">
                      {pocket.district}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-3">
                    <span>Type: <strong>{pocket.type}</strong></span>
                    <span>Top: <strong className="text-emerald-700">{pocket.topCondition}</strong></span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-rose-600">{pocket.prevalenceRate}% Prev</div>
                  <div className="text-[10px] text-slate-400">{pocket.anomaliesDetected} cases</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: DEIC Facility Hubs */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-emerald-600" />
                District Early Intervention Centres (DEIC)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Specialist hub capacity, 48h SLA performance and surgical queues
              </p>
            </div>
            <span className="text-xs font-semibold px-2 py-1 bg-emerald-50 text-emerald-800 rounded border border-emerald-200">
              {DEIC_FACILITIES.length} Nodal Hubs
            </span>
          </div>

          <div className="space-y-3">
            {DEIC_FACILITIES.map((facility) => (
              <div key={facility.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-slate-900">{facility.name}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Lead: {facility.leadPediatrician} • Active Cases: {facility.activeCasesUnderCare}
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {facility.slaAdherenceRate}% 48h SLA
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Cleft Wait: {facility.cleftSurgeryWaitlistDays}d
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
