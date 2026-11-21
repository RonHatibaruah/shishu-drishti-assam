import React from 'react';
import { 
  Baby, 
  Shield, 
  AlertTriangle, 
  Database, 
  MapPin, 
  Stethoscope, 
  CheckCircle2, 
  BookOpen, 
  HelpCircle,
  Lock,
  ShieldCheck,
  UserCheck,
  HeartPulse
} from 'lucide-react';
import { AdminUser } from './AdminLogin';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  onOpenTutorial: () => void;
  adminUser: AdminUser | null;
  onOpenAdminLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedRole,
  setSelectedRole,
  onOpenTutorial,
  adminUser,
  onOpenAdminLogin
}) => {
  return (
    <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-md border-b border-emerald-800">
      {/* Top Government Strip */}
      <div className="bg-emerald-950 text-emerald-200 text-xs px-4 py-1.5 flex flex-wrap justify-between items-center border-b border-emerald-800/60">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white tracking-wide flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            GOVERNMENT OF ASSAM
          </span>
          <span className="text-emerald-400/50">•</span>
          <span>National Health Mission (NHM) & Health & Family Welfare Dept</span>
          <span className="text-emerald-400/50">•</span>
          <span className="bg-emerald-900 text-emerald-300 px-1.5 py-0.5 rounded text-[11px] font-mono font-medium">
            NESFIC-D-27: Govt Track
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:inline text-emerald-300/80">
            Rashtriya Bal Swasthya Karyakram (RBSK) • DEIC Network
          </span>
          <span className="bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Decision-Support Only (CDSS)
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('executive')}>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-900/30">
            <Baby className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                ShishuDrishti <span className="text-emerald-400 text-sm font-normal">শিশু দৃষ্টি</span>
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-emerald-800/80 text-emerald-200 rounded border border-emerald-600/40">
                Assam Congenital Sentinel
              </span>
            </div>
            <p className="text-xs text-slate-300">
              AI Congenital Deformity Screening & DEIC Early Intervention Network
            </p>
          </div>
        </div>

        {/* Action Controls: Tutorial Button, Admin Button & Role Selector */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Prominent Tutorial Link */}
          <button
            onClick={onOpenTutorial}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all border border-emerald-400/50"
            title="What the application is and how to use it"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Tutorial & Guide</span>
          </button>

          {/* Admin Login / Console Access Button */}
          {adminUser ? (
            <button
              onClick={() => setActiveTab('admin')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-md border border-amber-400/50 transition-all"
              title="Open Admin Management Cockpit"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-200" />
              <span>Admin: {adminUser.role}</span>
            </button>
          ) : (
            <button
              onClick={onOpenAdminLogin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/40 shadow-sm transition-all"
              title="Sign in with Demo Credentials to manage application"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Login</span>
              <span className="text-[10px] bg-emerald-900/80 text-emerald-200 px-1 rounded font-mono hidden sm:inline">Demo</span>
            </button>
          )}

          {/* Role Selector */}
          <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-lg border border-slate-700">
            <span className="text-xs text-slate-400 px-2 font-medium hidden sm:inline">Role:</span>
            {[
              { id: 'STATE_NODAL', label: 'State Nodal (NHM)', icon: Shield },
              { id: 'DEIC_SPECIALIST', label: 'DEIC Pediatrician', icon: Stethoscope },
              { id: 'FRONTLINE', label: 'ASHA / ANM Screener', icon: HeartPulse }
            ].map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow border border-emerald-500/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{role.label}</span>
                  <span className="sm:hidden">{role.id}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-slate-800/95 border-t border-slate-700/60 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex space-x-1 sm:space-x-2 overflow-x-auto py-1.5 scrollbar-thin">
          {[
            { id: 'executive', label: 'Executive Mission Cockpit' },
            { id: 'worklist', label: 'Congenital Screening Worklist' },
            { id: 'gis', label: 'Geospatial Hotspots & RBSK Routes' },
            { id: 'referrals', label: 'Closed-Loop DEIC Referrals (48h SLA)' },
            { id: 'facilities', label: 'DEIC Capacity & Surgical Queues' },
            { id: 'audit', label: 'Clinical Evidence & XAI Logs' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-700/80 text-white shadow border border-emerald-500/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {tab.label}
            </button>
          ))}

          {/* Dedicated Admin Console Tab */}
          <button
            onClick={() => {
              if (adminUser) {
                setActiveTab('admin');
              } else {
                onOpenAdminLogin();
              }
            }}
            className={`whitespace-nowrap px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-all ${
              activeTab === 'admin'
                ? 'bg-amber-600 text-white shadow border border-amber-400/60'
                : 'text-amber-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Admin Console</span>
            {!adminUser && (
              <span className="text-[10px] bg-slate-900/80 text-amber-300 border border-amber-500/30 px-1 rounded font-mono">
                Auth
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
