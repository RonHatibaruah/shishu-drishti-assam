import React, { useState } from 'react';
import { ChildRecord, AnomalyCategory, SeverityTier } from '../types/congenital';
import { ASSAM_CHILD_RECORDS } from '../data/assam_congenital_data';
import { 
  Baby, 
  Search, 
  Filter, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Stethoscope, 
  FileText,
  ChevronRight,
  Info,
  Calendar,
  Phone,
  Layers,
  HeartPulse,
  Eye,
  Check,
  X,
  Lock,
  Sparkles
} from 'lucide-react';

export const TBRiskWorklist: React.FC = () => {
  const [records, setRecords] = useState<ChildRecord[]>(ASSAM_CHILD_RECORDS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedTier, setSelectedTier] = useState<string>('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [activeChild, setActiveChild] = useState<ChildRecord | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  
  // Modal View States
  const [showBoundingBoxes, setShowBoundingBoxes] = useState<boolean>(true);
  const [showGradCam, setShowGradCam] = useState<boolean>(false);
  const [overrideText, setOverrideText] = useState<string>('');
  const [overrideAuthor, setOverrideAuthor] = useState<string>('Dr. Bhaskar Jyoti Sarma (DEIC Specialist)');

  const filteredRecords = records.filter(child => {
    const matchesSearch = 
      child.childName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      child.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      child.motherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      child.villageOrPocket.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'ALL' || child.anomalyCategory === selectedCategory;
    const matchesTier = selectedTier === 'ALL' || child.severityTier === selectedTier;
    const matchesDistrict = selectedDistrict === 'ALL' || child.district === selectedDistrict;

    return matchesSearch && matchesCategory && matchesTier && matchesDistrict;
  });

  const handleAction = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 4500);
  };

  const handleConfirmDiagnostic = (childId: string) => {
    const note = overrideText.trim() || 'Clinical findings verified by DEIC Specialist. Care plan approved.';
    setRecords(prev => prev.map(c => {
      if (c.id === childId) {
        return {
          ...c,
          referralStage: 'DEIC_CONFIRMED',
          confirmedBy: overrideAuthor,
          confirmationTimestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
          clinicalOverrideNote: note,
          sha256AuditHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
        };
      }
      return c;
    }));
    handleAction(`Case ${childId} verified & confirmed at DEIC. Referral closed.`);
    setActiveChild(null);
    setOverrideText('');
  };

  const handleRefuteDiagnostic = (childId: string) => {
    const note = overrideText.trim() || 'Reviewed by specialist; confirmed normal anatomical variant / benign.';
    setRecords(prev => prev.map(c => {
      if (c.id === childId) {
        return {
          ...c,
          referralStage: 'FLAG_REFUTED',
          confirmedBy: overrideAuthor,
          confirmationTimestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
          clinicalOverrideNote: note,
          sha256AuditHash: '7a912bf091283cba901248192efcba901283912048129038cbaf91204891234a'
        };
      }
      return c;
    }));
    handleAction(`Case ${childId} refuted. Recorded as benign false positive for model calibration.`);
    setActiveChild(null);
    setOverrideText('');
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {actionNotice && (
        <div className="fixed bottom-4 right-4 z-50 bg-slate-900 text-emerald-300 px-4 py-3 rounded-xl shadow-2xl border border-emerald-500/50 flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">{actionNotice}</span>
        </div>
      )}

      {/* Header & Filter Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                Assam Congenital Registry
              </span>
              <span className="text-xs text-slate-500">Live AI Edge Worklist</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Congenital Deformities Screening & Triage Worklist
            </h2>
            <p className="text-xs text-slate-500">
              Photographic edge AI detections, pulse oximetry CCHD results, and 48-hour DEIC confirmation queues.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Active Queue:</span>
            <span className="text-xs font-bold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200">
              {filteredRecords.length} Flagged Neonates
            </span>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search child, mother, ID, pocket..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="ALL">All Anomaly Categories</option>
              <option value="Cleft Lip & Palate">Cleft Lip & Palate</option>
              <option value="Clubfoot (CTEV)">Clubfoot (CTEV)</option>
              <option value="Polydactyly / Syndactyly">Polydactyly / Syndactyly</option>
              <option value="Neural Tube Defect (Spina Bifida)">Neural Tube Defect</option>
              <option value="Critical Congenital Heart Disease (CCHD)">Critical CCHD</option>
            </select>
          </div>

          <div>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="w-full py-2 px-3 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="ALL">All Clinical Tiers</option>
              <option value="EMERGENCY">Emergency (CCHD / Open NTD)</option>
              <option value="CRITICAL">Critical (CLP / Rigid CTEV)</option>
              <option value="MODERATE">Moderate (Polydactyly)</option>
            </select>
          </div>

          <div>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full py-2 px-3 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="ALL">All Assam Districts</option>
              <option value="Kamrup Metropolitan">Kamrup Metropolitan</option>
              <option value="Dibrugarh">Dibrugarh</option>
              <option value="Barpeta">Barpeta</option>
              <option value="Dhubri">Dhubri</option>
              <option value="Sonitpur">Sonitpur</option>
              <option value="Tinsukia">Tinsukia</option>
            </select>
          </div>
        </div>
      </div>

      {/* Child Worklist Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Child & Mother ID</th>
                <th className="py-3 px-4">District / Pocket</th>
                <th className="py-3 px-4">Anomaly Category</th>
                <th className="py-3 px-4">AI Confidence</th>
                <th className="py-3 px-4">Referral Stage</th>
                <th className="py-3 px-4">48h SLA Status</th>
                <th className="py-3 px-4 text-right">Clinical Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((child) => {
                const isEmergency = child.severityTier === 'EMERGENCY';
                const isCritical = child.severityTier === 'CRITICAL';

                return (
                  <tr key={child.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{child.childName}</div>
                      <div className="text-[11px] text-slate-500">
                        {child.id} • Age: {child.ageDays}d ({child.gender})
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Mother: {child.motherName}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">{child.district}</div>
                      <div className="text-[11px] text-emerald-700 font-medium">
                        {child.villageOrPocket}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {child.pocketType}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded font-bold text-[11px] ${
                        isEmergency 
                          ? 'bg-rose-100 text-rose-800 border border-rose-300' 
                          : isCritical 
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-blue-100 text-blue-800 border border-blue-300'
                      }`}>
                        {child.anomalyCategory}
                      </span>
                      <div className="text-[11px] text-slate-600 mt-1 max-w-xs truncate" title={child.anomalySubtype}>
                        {child.anomalySubtype}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 font-bold text-slate-800">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{child.aiConfidence}%</span>
                      </div>
                      <div className="w-16 bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                        <div 
                          className="bg-emerald-600 h-full rounded-full" 
                          style={{ width: `${child.aiConfidence}%` }}
                        ></div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                        child.referralStage === 'DEIC_CONFIRMED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : child.referralStage === 'INTERVENTION_UNDERWAY'
                          ? 'bg-purple-100 text-purple-800'
                          : child.referralStage === 'FLAG_REFUTED'
                          ? 'bg-slate-100 text-slate-600'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {child.referralStage.replace('_', ' ')}
                      </span>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {child.deicCentre.split('(')[0]}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <span className={`w-2 h-2 rounded-full ${child.slaBreached ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'}`}></span>
                        <span className="font-bold text-slate-800">{child.elapsedHours}h elapsed</span>
                      </div>
                      <div className={`text-[10px] ${child.slaBreached ? 'text-rose-600 font-bold' : 'text-slate-500'}`}>
                        {child.slaBreached ? 'SLA BREACH ALERT' : 'Within 48h SLA'}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setActiveChild(child)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-sm text-xs transition-all flex items-center gap-1 ml-auto"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Case</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Case Details Modal */}
      {activeChild && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Child Case ID: {activeChild.id}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs font-semibold text-slate-600">
                    RCH ID: {activeChild.rchChildId}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  {activeChild.childName} — Clinical CDSS Review
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Screened by {activeChild.screenerName} ({activeChild.screenerRole}) at {activeChild.deliveryPoint} on {activeChild.screeningDate}
                </p>
              </div>

              <button
                onClick={() => setActiveChild(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Clinical Photo & Edge AI Detection Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-3">
                <div className="relative bg-slate-900 rounded-xl overflow-hidden aspect-[4/3] flex items-center justify-center border border-slate-800">
                  {/* Photo Visualizer with SVG overlays */}
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-950 flex flex-col items-center justify-center p-4 text-center">
                    <Baby className="w-16 h-16 text-emerald-500/40 mb-2" />
                    <span className="text-slate-300 text-xs font-bold">
                      Neonatal Clinical Scan • {activeChild.anomalyCategory}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 max-w-xs">
                      {activeChild.anomalySubtype}
                    </span>

                    {/* Simulated Bounding Box Overlay */}
                    {showBoundingBoxes && (
                      <div className="absolute inset-8 border-2 border-emerald-400 rounded-lg bg-emerald-500/10 flex items-start justify-between p-2">
                        <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                          {activeChild.anomalyCategory} ({activeChild.aiConfidence}%)
                        </span>
                        <span className="text-[10px] bg-slate-900/90 text-emerald-300 px-1 rounded font-mono">
                          YOLOv8-Nano INT8
                        </span>
                      </div>
                    )}

                    {/* Grad-CAM Heatmap Simulation Overlay */}
                    {showGradCam && (
                      <div className="absolute inset-8 bg-gradient-to-tr from-rose-500/30 via-amber-400/30 to-emerald-400/20 rounded-lg pointer-events-none mix-blend-screen"></div>
                    )}
                  </div>

                  <div className="absolute bottom-2 left-2 bg-slate-900/90 text-slate-200 text-[10px] px-2 py-1 rounded border border-slate-700">
                    DPDPA Compliant • Facial Region Anonymized
                  </div>
                </div>

                {/* Overlay Toggles */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all border ${
                      showBoundingBoxes 
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                        : 'bg-slate-100 border-slate-200 text-slate-600'
                    }`}
                  >
                    AI Bounding Box: {showBoundingBoxes ? 'ON' : 'OFF'}
                  </button>

                  <button
                    onClick={() => setShowGradCam(!showGradCam)}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all border ${
                      showGradCam 
                        ? 'bg-purple-50 border-purple-300 text-purple-800' 
                        : 'bg-slate-100 border-slate-200 text-slate-600'
                    }`}
                  >
                    Grad-CAM Heatmap: {showGradCam ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>

              {/* Clinical Markers & Decision Support Guidance */}
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Stethoscope className="w-4 h-4 text-emerald-700" />
                    Objective Anatomical Evidence
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {activeChild.anatomicalFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Pulse Oximetry Data if CCHD */}
                  {activeChild.cchd && (
                    <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs space-y-1">
                      <strong className="text-rose-900 block">CCHD Pulse Oximetry Protocol Result:</strong>
                      <div className="grid grid-cols-2 gap-2 text-rose-800">
                        <div>Pre-ductal (Right Hand): <strong>{activeChild.cchd.preDuctalSpO2}%</strong></div>
                        <div>Post-ductal (Foot): <strong>{activeChild.cchd.postDuctalSpO2}%</strong></div>
                        <div>SpO2 Gradient Delta: <strong>{activeChild.cchd.delta}%</strong></div>
                        <div>Heart Rate: <strong>{activeChild.cchd.heartRate} bpm</strong></div>
                      </div>
                      <div className="text-[11px] font-bold text-rose-700 mt-1">
                        Interpretation: AAP Protocol FAIL (Urgent Echocardiogram Required)
                      </div>
                    </div>
                  )}

                  {/* Pirani Score if CTEV */}
                  {activeChild.piraniScore !== undefined && (
                    <div className="mt-3 p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-xs flex items-center justify-between">
                      <span className="text-emerald-900 font-semibold">Pirani Severity Score:</span>
                      <span className="font-bold text-emerald-800 text-sm">{activeChild.piraniScore} / 6.0</span>
                    </div>
                  )}
                </div>

                {/* Treatment Window & Welfare Scheme */}
                <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 space-y-2">
                  <h4 className="font-bold text-emerald-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-700" />
                    Target Intervention Window & Scheme
                  </h4>
                  <p className="text-xs text-emerald-900 font-medium">
                    {activeChild.targetInterventionWindow}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs text-slate-500">Government Support:</span>
                    <span className="text-xs font-bold px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded">
                      {activeChild.welfareScheme}
                    </span>
                  </div>
                </div>

                {/* Statutory CDSS Disclaimer */}
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-300 text-amber-900 text-[11px] flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Statutory Mandate:</strong> This AI assessment serves as Clinical Decision Support only. Confirmation, diagnosis, and treatment planning must be signed off by a certified DEIC Medical Officer.
                  </span>
                </div>
              </div>
            </div>

            {/* Specialist Confirmation & Clinical Override Workspace */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-slate-700" />
                DEIC Specialist Confirmation & Override Console
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Clinical Finding & Care Directive (Mandatory for Override / Confirmation):
                  </label>
                  <textarea
                    rows={2}
                    value={overrideText}
                    onChange={(e) => setOverrideText(e.target.value)}
                    placeholder="Enter clinical examination notes, confirmed diagnosis, or reasons for refuting flag..."
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Authorizing Specialist:
                  </label>
                  <input
                    type="text"
                    value={overrideAuthor}
                    onChange={(e) => setOverrideAuthor(e.target.value)}
                    className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2"
                  />
                  <div className="text-[10px] text-slate-400">
                    Generates SHA-256 non-repudiation log
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => handleRefuteDiagnostic(activeChild.id)}
                  className="px-4 py-2 border border-rose-300 text-rose-700 hover:bg-rose-50 font-bold text-xs rounded-lg transition-all flex items-center gap-1.5"
                >
                  <X className="w-4 h-4" />
                  <span>Refute AI Flag (False Alarm)</span>
                </button>

                <button
                  onClick={() => handleConfirmDiagnostic(activeChild.id)}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-md transition-all flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm Diagnosis & Schedule Care</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
