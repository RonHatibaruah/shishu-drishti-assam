import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { TBRiskWorklist } from './components/TBRiskWorklist';
import { VulnerabilityMap } from './components/VulnerabilityMap';
import { ReferralTracker } from './components/ReferralTracker';
import { FacilitySupervision } from './components/FacilitySupervision';
import { AuditAndDeduplication } from './components/AuditAndDeduplication';
import { ExecutiveCommand } from './components/ExecutiveCommand';
import { TutorialModal } from './components/TutorialModal';
import { AdminLogin, AdminUser } from './components/AdminLogin';
import { AdminConsole } from './components/AdminConsole';
import { 
  Baby, 
  MapPin, 
  GitCommit, 
  Building2, 
  FileSearch, 
  ShieldAlert, 
  HelpCircle,
  FileText,
  BookOpen,
  Copy,
  Download,
  Lock,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('executive');
  const [selectedRole, setSelectedRole] = useState<string>('STATE_NODAL');
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  // Restore previous admin session if exists
  useEffect(() => {
    const saved = localStorage.getItem('shishudrishti_admin_session');
    if (saved) {
      try {
        setAdminUser(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem('shishudrishti_admin_session');
      }
    }
  }, []);

  // Handle URL deep-linking for SEO, GEO and Direct Navigation (#tutorial, /tutorial, #gis, #worklist, etc.)
  useEffect(() => {
    const handleNavigationFromUrl = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const pathname = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();

      // Check tutorial trigger from URL
      if (hash === 'tutorial' || pathname === '/tutorial' || search.includes('tutorial=true') || search.includes('tutorial')) {
        setIsTutorialOpen(true);
      }

      // Check valid functional tabs
      const validTabs = ['executive', 'worklist', 'gis', 'referrals', 'facilities', 'audit', 'admin'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      } else if (validTabs.includes(pathname.replace('/', ''))) {
        setActiveTab(pathname.replace('/', ''));
      }
    };

    handleNavigationFromUrl();
    window.addEventListener('hashchange', handleNavigationFromUrl);
    window.addEventListener('popstate', handleNavigationFromUrl);
    return () => {
      window.removeEventListener('hashchange', handleNavigationFromUrl);
      window.removeEventListener('popstate', handleNavigationFromUrl);
    };
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = tab;
  };

  const handleOpenTutorial = () => {
    setIsTutorialOpen(true);
    window.location.hash = 'tutorial';
  };

  const handleCloseTutorial = () => {
    setIsTutorialOpen(false);
    if (window.location.hash.toLowerCase() === '#tutorial') {
      window.history.replaceState(null, '', window.location.pathname + (activeTab ? `#${activeTab}` : ''));
    }
  };

  const handleLoginSuccess = (user: AdminUser) => {
    setAdminUser(user);
    localStorage.setItem('shishudrishti_admin_session', JSON.stringify(user));
    setActiveTab('admin');
  };

  const handleLogout = () => {
    setAdminUser(null);
    localStorage.removeItem('shishudrishti_admin_session');
    setActiveTab('executive');
  };

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    if (role === 'STATE_NODAL') {
      setActiveTab('executive');
    } else if (role === 'DEIC_SPECIALIST') {
      setActiveTab('worklist');
    } else if (role === 'FRONTLINE') {
      setActiveTab('worklist');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        selectedRole={selectedRole}
        setSelectedRole={handleRoleChange}
        onOpenTutorial={handleOpenTutorial}
        adminUser={adminUser}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
      />

      {/* Role Indicator & Quick Actions Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Active View:</span>
          <span className="font-bold text-slate-800 bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-sm flex items-center gap-1.5">
            {activeTab === 'admin' ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-amber-800">
                  ShishuDrishti Governance & Admin Cockpit
                </span>
              </>
            ) : selectedRole === 'STATE_NODAL' ? (
              'State Nodal Officer (Statewide Surveillance & RBSK Mission)' 
            ) : selectedRole === 'DEIC_SPECIALIST' ? (
              'DEIC Pediatric Specialist (Clinical Confirmation & Care Management)' 
            ) : (
              'Frontline Screener (ASHA / ANM Edge AI Capture & Field Triage)'
            )}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!adminUser && (
            <button
              onClick={() => setIsAdminLoginOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 rounded-lg text-xs font-bold shadow-sm transition-all"
            >
              <Lock className="w-3.5 h-3.5 text-amber-700" />
              <span>Demo Admin Login</span>
            </button>
          )}

          <button
            onClick={handleOpenTutorial}
            className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-lg text-xs font-bold shadow-sm transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>How to Use & Test</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full">
        {activeTab === 'executive' && <ExecutiveCommand />}
        {activeTab === 'worklist' && <TBRiskWorklist />}
        {activeTab === 'gis' && <VulnerabilityMap />}
        {activeTab === 'referrals' && <ReferralTracker />}
        {activeTab === 'facilities' && <FacilitySupervision />}
        {activeTab === 'audit' && <AuditAndDeduplication />}
        
        {/* Admin Console View */}
        {activeTab === 'admin' && (
          adminUser ? (
            <AdminConsole 
              currentUser={adminUser} 
              onLogout={handleLogout}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-lg mx-auto shadow-sm space-y-4 my-12">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center mx-auto">
                <Lock className="w-7 h-7 text-amber-700" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Admin Authentication Required</h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                The ShishuDrishti Management Console is restricted to authorized State Nodal Officers, DEIC Pediatricians, and Health Administrators. Please sign in using the provided demo credentials to explore the admin capabilities.
              </p>
              <button
                onClick={() => setIsAdminLoginOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
              >
                <Lock className="w-4 h-4" />
                <span>Open Admin Login (Demo Credentials)</span>
              </button>
            </div>
          )
        )}
      </main>

      {/* Admin Login Modal */}
      <AdminLogin
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Comprehensive Tutorial & Guide Modal */}
      <TutorialModal
        isOpen={isTutorialOpen}
        onClose={handleCloseTutorial}
        setActiveTab={handleTabChange}
      />

      {/* Footer */}
      <Footer onOpenAdminLogin={() => setIsAdminLoginOpen(true)} />
    </div>
  );
};
