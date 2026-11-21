import React from 'react';
import { Baby, ExternalLink, Mail, AlertTriangle, FileText, Download, Lock } from 'lucide-react';

interface FooterProps {
  onOpenAdminLogin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdminLogin }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Prominent Statutory Disclaimer Box */}
        <div className="mb-8 p-4 bg-slate-800/90 rounded-xl border border-amber-500/40 text-amber-200/90 text-xs shadow-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-amber-300 uppercase tracking-wider text-[11px] block">
                Statutory Clinical & Implementation Disclaimer (NESFIC-D-27 Mandate)
              </strong>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                ShishuDrishti (শিশু দৃষ্টি) is an artificial intelligence-driven clinical decision-support and early intervention platform (CDSS) developed for the <strong>National Health Mission (NHM) and Health & Family Welfare Department, Government of Assam</strong> under <strong>NESFIC-D-27 (Stream 1 — Government Track: Health Sector)</strong>.
              </p>
              <p className="text-amber-200/80 leading-relaxed text-[11px]">
                <strong>Important Notice:</strong> Automated computer vision screening, anatomical landmark flagging, and CCHD pulse oximetry risk calculations are <strong>clinical decision-support tools only and must NOT replace clinical diagnosis, pediatric evaluation, or authorized decisions</strong> by certified medical officers and DEIC specialists. Patient health records are processed in strict compliance with the <strong>Digital Personal Data Protection (DPDP) Act 2023</strong> and <strong>Ayushman Bharat Digital Mission (ABDM / ABHA)</strong> privacy standards.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Col 1: Platform Overview */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-base mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              ShishuDrishti • শিশু দৃষ্টি (Assam Congenital Sentinel)
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              AI-Powered Congenital Deformity Screening & DEIC Early Intervention Network submitted under{' '}
              <strong className="text-slate-200">NESFIC-D-27 (Stream 1 — Government Track: Health Sector)</strong> for the{' '}
              <strong className="text-slate-200">National Health Mission (NHM) & Health & Family Welfare Department, Government of Assam</strong>.
            </p>

            {/* Contact Email Box & Admin Link */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="p-3 bg-slate-800/80 rounded-lg border border-emerald-700/50 flex flex-wrap items-center justify-between gap-2 max-w-xl flex-1">
                <div className="flex items-center gap-2 text-slate-200">
                  <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-xs">
                    Technical Lead & Innovator:
                  </span>
                </div>
                <a
                  href="mailto:ron.hatibaruah@gmail.com"
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-md shadow transition-colors"
                >
                  <span>ron.hatibaruah@gmail.com</span>
                </a>
              </div>

              {onOpenAdminLogin && (
                <button
                  onClick={onOpenAdminLogin}
                  className="px-3 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Sign-In</span>
                </button>
              )}
            </div>
          </div>

          {/* Col 2: Official Submission Artifacts & Fast Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3 border-b border-slate-700 pb-1">
              Official NESFIC-D-27 Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/NESFIC_D27_Proposal_Ron_Hatibaruah.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 flex items-center gap-1.5 transition-colors font-medium text-slate-300"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Official Proposal (PDF)</span>
                </a>
              </li>
              <li>
                <a
                  href="/NESFIC_D27_Proof_of_Work_Ron_Hatibaruah.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 flex items-center gap-1.5 transition-colors font-medium text-slate-300"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Proof of Work Dossier (PDF)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/RonHatibaruah/shishu-drishti-assam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 flex items-center gap-1.5 transition-colors text-slate-400"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <a
                  href="https://startup.assam.gov.in/nesfic26/problem-statements/nesfic-d-27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 flex items-center gap-1.5 transition-colors text-slate-400"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Official Problem Statement</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Metadata & Credits */}
        <div className="pt-6 border-t border-slate-800 flex flex-wrap justify-between items-center text-[11px] text-slate-300 gap-2">
          <div>
            &copy; 2026 <strong>ShishuDrishti (শিশু দৃষ্টি)</strong> • Built for the Government of Assam • Lead Innovator: <strong>Ron Hatibaruah</strong>
          </div>
          <div className="flex items-center gap-4">
            <span>Assam State Data Centre (ASDC) Ready</span>
            <span>•</span>
            <span>ABDM ABHA M1-M3</span>
            <span>•</span>
            <span>DPDPA 2023 Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
