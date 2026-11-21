import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Key, 
  ArrowRight, 
  UserCheck, 
  AlertCircle, 
  Building2, 
  Eye, 
  EyeOff, 
  X, 
  CheckCircle2, 
  Baby,
  Stethoscope,
  Sparkles
} from 'lucide-react';

export interface AdminUser {
  name: string;
  role: 'STATE_NODAL' | 'DEIC_SPECIALIST' | 'FRONTLINE';
  designation: string;
  email: string;
  district: string;
}

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AdminUser) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  // Preset Demo Accounts
  const DEMO_ACCOUNTS: { [key: string]: AdminUser & { pass: string } } = {
    'admin@nhm.assam.gov.in': {
      name: 'Dr. Hemanta Kr. Bora',
      role: 'STATE_NODAL',
      designation: 'State Nodal Officer (RBSK & Maternal-Child Health)',
      email: 'admin@nhm.assam.gov.in',
      district: 'Statewide / Assam HQ (Dispur)',
      pass: 'dispur2026'
    },
    'deic.kamrup@nhm.assam.gov.in': {
      name: 'Dr. Bhaskar Jyoti Sarma',
      role: 'DEIC_SPECIALIST',
      designation: 'DEIC Specialist & Pediatric Nodal',
      email: 'deic.kamrup@nhm.assam.gov.in',
      district: 'Kamrup Metropolitan (GMCH)',
      pass: 'dispur2026'
    },
    'deic.dibrugarh@nhm.assam.gov.in': {
      name: 'Dr. Nilakshi Phukan',
      role: 'DEIC_SPECIALIST',
      designation: 'DEIC Pediatric Orthopedics Lead',
      email: 'deic.dibrugarh@nhm.assam.gov.in',
      district: 'Dibrugarh (AMCH)',
      pass: 'dispur2026'
    },
    'rbsk.field@nhm.assam.gov.in': {
      name: 'Dipali Kalita',
      role: 'FRONTLINE',
      designation: 'RBSK Mobile Health Supervisor & ANM Lead',
      email: 'rbsk.field@nhm.assam.gov.in',
      district: 'Barpeta (Char & Rural Belt)',
      pass: 'dispur2026'
    }
  };

  const handleQuickLogin = (demoEmail: string) => {
    const acc = DEMO_ACCOUNTS[demoEmail];
    if (acc) {
      setEmail(acc.email);
      setPassword(acc.pass);
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const match = DEMO_ACCOUNTS[email.trim().toLowerCase()];
      if (match && match.pass === password) {
        setIsLoading(false);
        onLoginSuccess(match);
        onClose();
      } else {
        setIsLoading(false);
        setError('Invalid credentials. Use demo credentials shown below.');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg">
              <Lock className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold">ShishuDrishti Administrative Cockpit</h3>
                <span className="text-[10px] bg-emerald-800 text-emerald-200 px-1.5 py-0.5 rounded font-mono">
                  Demo
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Government of Assam • National Health Mission • NESFIC-D-27
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg font-bold p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Authorized Email Address:
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@nhm.assam.gov.in"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Security Password / Token:
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="dispur2026"
                  className="w-full pl-9 pr-9 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              {isLoading ? (
                <span>Authenticating with ASDC Enclave...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authenticate & Open Governance Cockpit</span>
                </>
              )}
            </button>
          </form>

          {/* Preset Demo Accounts Picker */}
          <div className="pt-3 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Click to Auto-Fill Evaluator Demo Credentials:
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin@nhm.assam.gov.in')}
                className="p-2.5 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-lg text-left transition-all"
              >
                <div className="font-bold text-slate-800">State Nodal Officer</div>
                <div className="text-[10px] text-slate-500">admin@nhm.assam.gov.in</div>
                <div className="text-[9px] text-emerald-700 font-mono">pass: dispur2026</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('deic.kamrup@nhm.assam.gov.in')}
                className="p-2.5 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-lg text-left transition-all"
              >
                <div className="font-bold text-slate-800">DEIC Pediatric Lead</div>
                <div className="text-[10px] text-slate-500">deic.kamrup@nhm.assam.gov.in</div>
                <div className="text-[9px] text-emerald-700 font-mono">pass: dispur2026</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('deic.dibrugarh@nhm.assam.gov.in')}
                className="p-2.5 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-lg text-left transition-all"
              >
                <div className="font-bold text-slate-800">DEIC Ortho Specialist</div>
                <div className="text-[10px] text-slate-500">deic.dibrugarh@nhm.assam.gov.in</div>
                <div className="text-[9px] text-emerald-700 font-mono">pass: dispur2026</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('rbsk.field@nhm.assam.gov.in')}
                className="p-2.5 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-lg text-left transition-all"
              >
                <div className="font-bold text-slate-800">RBSK Mobile Lead</div>
                <div className="text-[10px] text-slate-500">rbsk.field@nhm.assam.gov.in</div>
                <div className="text-[9px] text-emerald-700 font-mono">pass: dispur2026</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
