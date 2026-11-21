import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Settings, 
  Users, 
  Package, 
  Calendar, 
  Sliders, 
  FileText, 
  Download, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  Search, 
  Filter, 
  Truck, 
  Zap, 
  Activity, 
  LogOut,
  Stethoscope,
  MapPin,
  Clock,
  ArrowUpRight,
  Database,
  Lock,
  ChevronRight,
  Info,
  Baby,
  HeartPulse,
  Scissors
} from 'lucide-react';
import { AdminUser } from './AdminLogin';

interface AdminConsoleProps {
  currentUser: AdminUser;
  onLogout: () => void;
  onNavigateTab: (tab: string) => void;
}

interface CongenitalAdminRecord {
  id: string;
  childName: string;
  motherName: string;
  gender: string;
  ageDays: number;
  district: string;
  deliveryPoint: string;
  category: string;
  subtype: string;
  severity: 'EMERGENCY' | 'CRITICAL' | 'MODERATE' | 'MILD';
  aiConfidence: number;
  referralStage: string;
  assignedDeic: string;
  overridden: boolean;
  overrideReason?: string;
}

interface DeicSupplyStock {
  district: string;
  deicFacility: string;
  supplyType: string;
  currentStock: number;
  weeklyBurnRate: number;
  bufferDays: number;
  status: 'Critical' | 'Adequate' | 'Surplus';
}

interface RbskTour {
  id: string;
  targetPocket: string;
  district: string;
  pocketType: string;
  priorityScore: number;
  leadOfficer: string;
  focusCondition: string;
  status: 'Scheduled' | 'In Progress' | 'Completed';
  scheduledDate: string;
}

interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  ip: string;
}

export const AdminConsole: React.FC<AdminConsoleProps> = ({ currentUser, onLogout, onNavigateTab }) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'cases' | 'logistics' | 'tours' | 'rules' | 'audit'>('overview');

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('All');

  // Cases State
  const [cases, setCases] = useState<CongenitalAdminRecord[]>([
    {
      id: 'AS-2026-CLP-0104',
      childName: 'Baby of Priyanjali Bora',
      motherName: 'Priyanjali Bora',
      gender: 'Female',
      ageDays: 2,
      district: 'Kamrup Metropolitan',
      deliveryPoint: 'Sonapur District Model Hospital',
      category: 'Cleft Lip & Palate',
      subtype: 'Unilateral Left Complete Cleft Lip',
      severity: 'CRITICAL',
      aiConfidence: 96.8,
      referralStage: 'DEIC Scheduled',
      assignedDeic: 'Gauhati Medical College DEIC',
      overridden: false
    },
    {
      id: 'AS-2026-CTEV-0219',
      childName: 'Rahul Tanti',
      motherName: 'Sumitra Tanti',
      gender: 'Male',
      ageDays: 4,
      district: 'Dibrugarh',
      deliveryPoint: 'Assam Medical College (AMCH)',
      category: 'Clubfoot (CTEV)',
      subtype: 'Bilateral Severe CTEV (Pirani 5.5)',
      severity: 'CRITICAL',
      aiConfidence: 94.2,
      referralStage: 'DEIC Confirmed',
      assignedDeic: 'AMCH DEIC Dibrugarh',
      overridden: true,
      overrideReason: 'Confirmed rigid idiopathic CTEV; serial Ponseti cast applied'
    },
    {
      id: 'AS-2026-CHD-0335',
      childName: 'Baby of Jamila Begum',
      motherName: 'Jamila Begum',
      gender: 'Female',
      ageDays: 1,
      district: 'Barpeta',
      deliveryPoint: 'Home Delivery (Riverine Sandbar)',
      category: 'Critical CCHD',
      subtype: 'Suspected Transposition of Great Arteries',
      severity: 'EMERGENCY',
      aiConfidence: 98.4,
      referralStage: 'Intervention Underway',
      assignedDeic: 'Barpeta FAAMC DEIC',
      overridden: false
    },
    {
      id: 'AS-2026-POLY-0418',
      childName: 'Parikshit Das',
      motherName: 'Anjana Das',
      gender: 'Male',
      ageDays: 6,
      district: 'Sonitpur',
      deliveryPoint: 'Dhekiajuli FRU',
      category: 'Polydactyly',
      subtype: 'Post-axial Hexadactyly Right Hand',
      severity: 'MODERATE',
      aiConfidence: 95.6,
      referralStage: 'DEIC Confirmed',
      assignedDeic: 'Tezpur Medical College DEIC',
      overridden: false
    }
  ]);

  // Inventory State
  const [supplies, setSupplies] = useState<DeicSupplyStock[]>([
    { district: 'Barpeta', deicFacility: 'Barpeta FAAMC DEIC', supplyType: 'Steenbeek Abduction Braces', currentStock: 14, weeklyBurnRate: 6, bufferDays: 16, status: 'Critical' },
    { district: 'Dhubri', deicFacility: 'Dhubri Medical College DEIC', supplyType: 'Ponseti Quick-Cast Plaster', currentStock: 22, weeklyBurnRate: 8, bufferDays: 19, status: 'Critical' },
    { district: 'Dibrugarh', deicFacility: 'AMCH DEIC Dibrugarh', supplyType: 'Haberman Feeder Kits', currentStock: 48, weeklyBurnRate: 5, bufferDays: 67, status: 'Adequate' },
    { district: 'Kamrup Metro', deicFacility: 'GMCH Central Buffer', supplyType: 'Neonatal Dual-Site Pulse Oximeters', currentStock: 120, weeklyBurnRate: 8, bufferDays: 105, status: 'Surplus' },
    { district: 'Sonitpur', deicFacility: 'Tezpur Medical College DEIC', supplyType: 'Ponseti Quick-Cast Plaster', currentStock: 65, weeklyBurnRate: 7, bufferDays: 65, status: 'Adequate' }
  ]);

  // RBSK Tours State
  const [tours, setTours] = useState<RbskTour[]>([
    { id: 'TOUR-AS-201', targetPocket: 'Mandia Riverine Chars', district: 'Barpeta', pocketType: 'Char Area', priorityScore: 92.4, leadOfficer: 'Dipali Kalita (ANM Lead)', focusCondition: 'Home Delivery CCHD & NTD Checks', status: 'Scheduled', scheduledDate: '2026-11-23' },
    { id: 'TOUR-AS-202', targetPocket: 'Maijan Tea Estate Line 4', district: 'Dibrugarh', pocketType: 'Tea Garden', priorityScore: 89.1, leadOfficer: 'Dr. Nilakshi Phukan', focusCondition: 'Early Clubfoot Pirani & Cleft Screen', status: 'In Progress', scheduledDate: '2026-11-21' },
    { id: 'TOUR-AS-203', targetPocket: 'Doomdooma Tea Belt', district: 'Tinsukia', pocketType: 'Tea Garden', priorityScore: 86.5, leadOfficer: 'RBSK Mobile Unit 1', focusCondition: 'Cleft Lip & Palate Nutrition Care', status: 'Scheduled', scheduledDate: '2026-11-25' }
  ]);

  // AI Rules State
  const [confidenceCutoff, setConfidenceCutoff] = useState<number>(85);
  const [spo2GradientCutoff, setSpo2GradientCutoff] = useState<number>(3);
  const [slaEscalationHours, setSlaEscalationHours] = useState<number>(48);
  const [rulesNotice, setRulesNotice] = useState<string | null>(null);

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<AuditEntry[]>([
    { id: 'AUD-AS-8101', timestamp: '2026-11-21 16:12:05', user: currentUser.name, action: 'ADMIN_SESSION_INIT', details: `Session active on ASDC Enclave (${currentUser.designation})`, ip: '10.14.22.84' },
    { id: 'AUD-AS-8100', timestamp: '2026-11-21 14:05:18', user: 'Dr. Rafiqul Hussain', action: 'CCHD_EMERGENCY_TRANSFER', details: 'Case AS-2026-CHD-0335 transferred to GMCH via 108', ip: '10.14.33.12' },
    { id: 'AUD-AS-8099', timestamp: '2026-11-21 11:40:22', user: 'Dr. Nilakshi Phukan', action: 'PONSETI_CASTING_INITIATED', details: 'Case AS-2026-CTEV-0219 enrolled in weekly casting', ip: '10.14.55.91' }
  ]);

  // Modals & Forms
  const [isOverrideModalOpen, setIsOverrideModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<CongenitalAdminRecord | null>(null);
  const [overrideText, setOverrideText] = useState('');
  const [dispatchDistrict, setDispatchDistrict] = useState('Barpeta');
  const [dispatchQty, setDispatchQty] = useState(25);
  const [dispatchMsg, setDispatchMsg] = useState('');

  const handleSaveRules = () => {
    setRulesNotice('CDSS decision parameters updated in ASDC cluster.');
    setAuditLogs([
      {
        id: `AUD-AS-${Date.now().toString().slice(-4)}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        user: currentUser.name,
        action: 'CDSS_RULES_UPDATED',
        details: `Confidence Cutoff: >${confidenceCutoff}%, SpO2 Delta: >${spo2GradientCutoff}%, SLA: ${slaEscalationHours}h`,
        ip: '10.14.22.84'
      },
      ...auditLogs
    ]);
    setTimeout(() => setRulesNotice(null), 4000);
  };

  const handleApplyOverride = () => {
    if (!selectedCase || !overrideText.trim()) return;

    setCases(cases.map(c => {
      if (c.id === selectedCase.id) {
        return {
          ...c,
          overridden: true,
          overrideReason: overrideText,
          referralStage: 'DEIC Confirmed'
        };
      }
      return c;
    }));

    setAuditLogs([
      {
        id: `AUD-AS-${Date.now().toString().slice(-4)}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        user: currentUser.name,
        action: 'CLINICAL_OVERRIDE_RECORDED',
        details: `Case ${selectedCase.id} confirmed: "${overrideText}"`,
        ip: '10.14.22.84'
      },
      ...auditLogs
    ]);

    setIsOverrideModalOpen(false);
    setSelectedCase(null);
    setOverrideText('');
  };

  const handleDispatchBuffer = (e: React.FormEvent) => {
    e.preventDefault();
    setDispatchMsg(`Dispatched ${dispatchQty} Steenbeek Abduction Braces to ${dispatchDistrict} DEIC Store.`);
    setSupplies(supplies.map(s => {
      if (s.district === dispatchDistrict) {
        return {
          ...s,
          currentStock: s.currentStock + dispatchQty,
          bufferDays: s.bufferDays + 25,
          status: 'Adequate'
        };
      }
      return s;
    }));
    setTimeout(() => setDispatchMsg(''), 4500);
  };

  const handleExportAudit = (format: 'json' | 'csv') => {
    const dataStr = format === 'json'
      ? JSON.stringify(auditLogs, null, 2)
      : 'ID,Timestamp,User,Action,Details,IP\n' + auditLogs.map(l => `${l.id},${l.timestamp},${l.user},${l.action},"${l.details}",${l.ip}`).join('\n');

    const blob = new Blob([dataStr], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shishudrishti_audit_${Date.now()}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl border border-emerald-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-900/40">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 bg-emerald-800 text-emerald-200 rounded">
                  ASDC Enterprise Enclave
                </span>
                <span className="text-xs text-slate-400">• NESFIC-D-27 Admin Console</span>
              </div>
              <h2 className="text-xl font-bold mt-1 text-white">
                ShishuDrishti Administrative & Clinical Governance Console
              </h2>
              <p className="text-xs text-slate-300">
                Authenticated as: <strong>{currentUser.name}</strong> ({currentUser.designation}) • Catchment: <strong>{currentUser.district}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateTab('worklist')}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 transition-all"
            >
              Open Worklist
            </button>
            <button
              onClick={onLogout}
              className="px-3 py-1.5 bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Subtab Navigation */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'overview', label: 'Console Overview', icon: Activity },
            { id: 'cases', label: 'Congenital Cases & Overrides', icon: Baby },
            { id: 'logistics', label: 'DEIC Casting & Splint Logistics', icon: Package },
            { id: 'tours', label: 'RBSK Mobile Camp Scheduler', icon: Calendar },
            { id: 'rules', label: 'CDSS AI Rules & Cutoffs', icon: Sliders },
            { id: 'audit', label: 'DPDPA & ABDM Audit Export', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SUBTAB 1: Overview */}
      {activeSubTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs text-slate-500 font-medium">Flagged Congenital Cases</span>
            <div className="text-2xl font-black text-slate-900">{cases.length} Active Records</div>
            <p className="text-xs text-slate-500">
              {cases.filter(c => c.overridden).length} verified with physician clinical override
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs text-slate-500 font-medium">DEIC Orthotic Stock Status</span>
            <div className="text-2xl font-black text-emerald-700">5 Districts Active</div>
            <p className="text-xs text-slate-500">
              Steenbeek braces & Ponseti plaster reserves in central warehouse
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs text-slate-500 font-medium">Scheduled RBSK Mobile Camps</span>
            <div className="text-2xl font-black text-purple-700">{tours.length} Camps Ready</div>
            <p className="text-xs text-slate-500">
              Targeting top-risk tea garden bastis and riverine sandbar chars
            </p>
          </div>
        </div>
      )}

      {/* SUBTAB 2: Cases & Overrides */}
      {activeSubTab === 'cases' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="font-bold text-xs text-slate-700">
              Clinical Triage Manager & Overrides
            </div>
            <span className="text-xs text-slate-400">
              Enforcing SHA-256 Non-Repudiation for Every Specialist Finding
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {cases.map((c) => (
              <div key={c.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{c.childName}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {c.category}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">{c.id}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {c.district} • {c.deliveryPoint} • Stage: <strong>{c.referralStage}</strong>
                  </div>
                  {c.overridden && (
                    <div className="text-[11px] text-emerald-700 font-medium mt-1">
                      Override: "{c.overrideReason}"
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedCase(c);
                      setIsOverrideModalOpen(true);
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-all"
                  >
                    Clinical Override
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: Logistics Buffer */}
      {activeSubTab === 'logistics' && (
        <div className="space-y-6">
          {dispatchMsg && (
            <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>{dispatchMsg}</span>
            </div>
          )}

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm mb-3">
              One-Click Emergency Buffer Allocation (Guwahati Central Store &gt; District DEIC)
            </h3>
            <form onSubmit={handleDispatchBuffer} className="flex flex-wrap items-center gap-3">
              <select
                value={dispatchDistrict}
                onChange={(e) => setDispatchDistrict(e.target.value)}
                className="py-1.5 px-3 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Barpeta">Barpeta FAAMC DEIC</option>
                <option value="Dhubri">Dhubri Medical College DEIC</option>
                <option value="Dibrugarh">AMCH DEIC Dibrugarh</option>
                <option value="Sonitpur">Tezpur Medical College DEIC</option>
              </select>

              <input
                type="number"
                value={dispatchQty}
                onChange={(e) => setDispatchQty(Number(e.target.value))}
                min={5}
                max={100}
                className="w-24 py-1.5 px-3 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <button
                type="submit"
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-sm transition-all flex items-center gap-1.5"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Dispatch Emergency Supplies</span>
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">District & Facility</th>
                  <th className="py-3 px-4">Supply Item</th>
                  <th className="py-3 px-4">Current Stock</th>
                  <th className="py-3 px-4">Buffer Days</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {supplies.map((s, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80">
                    <td className="py-3 px-4 font-bold text-slate-900">{s.deicFacility}</td>
                    <td className="py-3 px-4 text-slate-700">{s.supplyType}</td>
                    <td className="py-3 px-4 font-bold">{s.currentStock} units</td>
                    <td className="py-3 px-4">{s.bufferDays} days left</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        s.status === 'Critical' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 4: RBSK Tours */}
      {activeSubTab === 'tours' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-xs">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="font-bold text-slate-700">RBSK Mobile Health Team Camp Schedules</span>
            <span className="text-[11px] text-slate-400">Algorithmic Route Optimization</span>
          </div>

          <div className="divide-y divide-slate-100">
            {tours.map((t) => (
              <div key={t.id} className="p-4 flex items-center justify-between hover:bg-slate-50/80">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{t.targetPocket}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px]">
                      {t.district} • {t.pocketType}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Focus: <strong>{t.focusCondition}</strong> • Lead: {t.leadOfficer}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-emerald-700">{t.scheduledDate}</div>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
                    {t.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 5: Rules */}
      {activeSubTab === 'rules' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 max-w-2xl text-xs">
          {rulesNotice && (
            <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>{rulesNotice}</span>
            </div>
          )}

          <h3 className="font-bold text-slate-900 text-sm">
            CDSS Edge AI & CCHD Protocol Calibration
          </h3>
          <p className="text-slate-500 text-[11px]">
            Tune on-device computer vision classification confidence and CCHD pulse oximetry delta thresholds.
          </p>

          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Computer Vision Positive Detection Cutoff ({confidenceCutoff}%):
              </label>
              <input
                type="range"
                min={70}
                max={98}
                value={confidenceCutoff}
                onChange={(e) => setConfidenceCutoff(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                CCHD Dual-Site Pulse Oximetry Delta Threshold ({spo2GradientCutoff}%):
              </label>
              <input
                type="range"
                min={2}
                max={5}
                value={spo2GradientCutoff}
                onChange={(e) => setSpo2GradientCutoff(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                DEIC Referral SLA Breach Threshold ({slaEscalationHours} Hours):
              </label>
              <input
                type="range"
                min={24}
                max={72}
                step={12}
                value={slaEscalationHours}
                onChange={(e) => setSlaEscalationHours(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            <button
              onClick={handleSaveRules}
              className="mt-4 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-sm transition-all"
            >
              Update CDSS Parameters in ASDC
            </button>
          </div>
        </div>
      )}

      {/* SUBTAB 6: Audit Export */}
      {activeSubTab === 'audit' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 max-w-2xl text-xs">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            DPDP Act 2023 & ABDM Audit Trail Export
          </h3>
          <p className="text-slate-500 text-[11px]">
            Download certified, cryptographically validated audit trails recording all clinical decisions, overrides, and administrative buffer movements.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => handleExportAudit('json')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export Audit Trail (JSON)</span>
            </button>

            <button
              onClick={() => handleExportAudit('csv')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg border border-slate-300 flex items-center gap-1.5 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export Audit Sheet (CSV)</span>
            </button>
          </div>
        </div>
      )}

      {/* Clinical Override Modal */}
      {isOverrideModalOpen && selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Apply Authorized Clinical Override: {selectedCase.childName}
            </h3>
            <p className="text-xs text-slate-500">
              Record specialist confirmation notes or corrective treatment directives.
            </p>

            <textarea
              rows={3}
              value={overrideText}
              onChange={(e) => setOverrideText(e.target.value)}
              placeholder="Enter specialist evaluation, confirmed diagnosis, or care schedule..."
              className="w-full text-xs p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setIsOverrideModalOpen(false);
                  setSelectedCase(null);
                }}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyOverride}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold shadow-sm"
              >
                Sign & Authorize Override
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
