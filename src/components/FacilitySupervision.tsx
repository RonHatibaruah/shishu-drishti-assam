import React, { useState } from 'react';
import { DEIC_FACILITIES } from '../data/assam_congenital_data';
import { DEICFacility } from '../types/congenital';
import { 
  Building2, 
  HeartPulse, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Boxes, 
  Calendar, 
  UserCheck, 
  Clock,
  Sparkles,
  Stethoscope,
  Scissors
} from 'lucide-react';

export const FacilitySupervision: React.FC = () => {
  const [facilities, setFacilities] = useState<DEICFacility[]>(DEIC_FACILITIES);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [notice, setNotice] = useState<string | null>(null);

  const filtered = facilities.filter(f => 
    selectedDistrict === 'ALL' || f.district === selectedDistrict
  );

  const handleRequisitionSplints = (name: string) => {
    setNotice(`Emergency Ponseti casting plaster and Steenbeek abduction brace restock dispatched to ${name}.`);
    setTimeout(() => setNotice(null), 4500);
  };

  const handleScheduleSurgeryDay = (name: string) => {
    setNotice(`Smile Train cleft surgical camp flagged & confirmed for ${name}. 12 pediatric slots opened.`);
    setTimeout(() => setNotice(null), 4500);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {notice && (
        <div className="fixed bottom-4 right-4 z-50 bg-slate-900 text-emerald-300 px-4 py-3 rounded-xl shadow-2xl border border-emerald-500/50 flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">{notice}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
              Specialty Clinical Hubs
            </span>
            <span className="text-xs text-slate-500">DEIC & Tertiary Surgical Centres</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            District Early Intervention Centre (DEIC) Capacity & Surgical Management
          </h2>
          <p className="text-xs text-slate-500">
            Real-time monitoring of DEIC caseloads, Ponseti casting capacity, Smile Train queues, and Snehasparsh cardiology transfers.
          </p>
        </div>

        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="py-1.5 px-3 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="ALL">All DEIC Facilities ({facilities.length})</option>
          <option value="Kamrup Metropolitan">Kamrup Metropolitan</option>
          <option value="Dibrugarh">Dibrugarh</option>
          <option value="Barpeta">Barpeta</option>
          <option value="Sonitpur">Sonitpur</option>
          <option value="Dhubri">Dhubri</option>
        </select>
      </div>

      {/* Facility Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((facility) => (
          <div key={facility.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-700">{facility.type}</span>
                  <span className="text-xs text-slate-400">• {facility.district}</span>
                </div>
                <h3 className="font-extrabold text-slate-900 text-base mt-0.5">
                  {facility.name}
                </h3>
                <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Lead Pediatrician: <strong>{facility.leadPediatrician}</strong></span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {facility.slaAdherenceRate}% 48h SLA
                </span>
                <div className="text-[10px] text-slate-400 mt-1">
                  Active Under Care: <strong>{facility.activeCasesUnderCare}</strong>
                </div>
              </div>
            </div>

            {/* Performance Indicators */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-500 text-[10px] block">Ponseti Slots</span>
                <strong className="text-base text-emerald-700">{facility.ponsetiCastingSlotsAvailable}</strong>
                <span className="text-[10px] text-slate-400 block mt-0.5">Available/wk</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-500 text-[10px] block">Cleft Waitlist</span>
                <strong className="text-base text-slate-800">{facility.cleftSurgeryWaitlistDays}d</strong>
                <span className="text-[10px] text-slate-400 block mt-0.5">To operation</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-500 text-[10px] block">CHD to GMCH</span>
                <strong className="text-base text-rose-600">{facility.chdEscalationToGMCH}</strong>
                <span className="text-[10px] text-slate-400 block mt-0.5">Cardiac cases</span>
              </div>
            </div>

            {/* Fast Action Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-2">
              <button
                onClick={() => handleRequisitionSplints(facility.name)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-all flex items-center gap-1.5"
              >
                <Boxes className="w-3.5 h-3.5 text-slate-600" />
                <span>Indent Casting Supplies</span>
              </button>

              <button
                onClick={() => handleScheduleSurgeryDay(facility.name)}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>Open Surgery Slots</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
