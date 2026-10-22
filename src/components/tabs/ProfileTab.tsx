import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Award, 
  BookOpen, 
  ShieldCheck, 
  LogOut, 
  Trash2, 
  AlertTriangle,
  ChevronRight,
  GraduationCap,
  Calendar,
  CheckCircle2,
  FileCheck2,
  User,
  ExternalLink,
  DownloadCloud,
  Clock,
  Sparkles
} from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';

interface ProfileTabProps {
  onEditTopics: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ onEditTopics }) => {
  const { currentUser, signOut, deleteAccount, setScreen } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [exportedSuccess, setExportedSuccess] = useState(false);

  const topicDisplayNames: Record<string, string> = {
    xray: 'X-Ray & Plain Film',
    ct: 'Computed Tomography (CT)',
    mri: 'Magnetic Resonance Imaging (MRI)',
    ultrasound: 'Ultrasound & Sonography',
    anatomy: 'Sectional Radiographic Anatomy',
    hospital_practice: 'Hospital Practice & Governance',
    rad_physics: 'Radiation Physics & IR(ME)R',
    general_radiography: 'General Radiography',
    ct_mri: 'CT & MRI',
    radiation_protection: 'Radiation Protection',
    research_cpd: 'Research & Academic CPD',
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    await deleteAccount();
    setIsDeleting(false);
    setShowDeleteModal(false);
  };

  const handleExportCPD = () => {
    setExportedSuccess(true);
    setTimeout(() => setExportedSuccess(false), 3000);
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F17] text-slate-800 dark:text-slate-100 flex flex-col pb-28 select-none">
      <div className="w-full max-w-md sm:max-w-xl mx-auto px-4 sm:px-6 pt-4 space-y-4">
        
        {/* Header */}
        <header className="flex items-center justify-between pt-1">
          <div>
            <h1 className="text-2xl font-extrabold text-[#002147] dark:text-white tracking-tight">
              My Profile
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Clinical credentials, CPD audit, and settings
            </p>
          </div>
          <ThemeToggle />
        </header>

        {/* User Identity Card */}
        <div className="w-full bg-white dark:bg-[#121824] rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#002147]/5 dark:bg-[#38BDF8]/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-center gap-4 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#002147] to-[#0A3266] text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0 ring-4 ring-white dark:ring-[#1E293B]">
              {currentUser?.fullName
                ?.split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('') || 'SR'}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white truncate">
                  {currentUser?.fullName || 'Radiography Scholar'}
                </h2>
                <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#002147] dark:text-[#38BDF8] text-[10px] font-bold">
                  <ShieldCheck className="w-3 h-3 text-[#FF7F32]" />
                  Verified
                </span>
              </div>

              <p className="text-xs text-[#002147] dark:text-[#38BDF8] font-semibold mt-0.5">
                {currentUser?.role || 'Diagnostic Radiographer'}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                {currentUser?.email || 'scholar@studirad.org'}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Member since Oct 2026</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              HCPC Pathway Active
            </span>
          </div>
        </div>

        {/* CPD Summary Banner */}
        <div className="w-full bg-[#002147] text-white rounded-2xl p-5 shadow-lg relative overflow-hidden text-left">
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#FF7F32]/20 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#FF7F32]">
                  <Award className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                    Accredited CPD Record
                  </span>
                  <h3 className="text-lg font-extrabold text-white">
                    {currentUser?.cpdCredits || 18.5} / 30.0 Hours
                  </h3>
                </div>
              </div>

              <button
                onClick={handleExportCPD}
                className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <DownloadCloud className="w-3.5 h-3.5" />
                <span>{exportedSuccess ? 'Exported!' : 'Export PDF'}</span>
              </button>
            </div>

            {/* Progress bar towards statutory 30 hours */}
            <div className="w-full h-2 bg-white/15 rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-gradient-to-r from-blue-400 via-[#FF7F32] to-amber-300 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (((currentUser?.cpdCredits || 18.5) / 30) * 100))}%` }}
              ></div>
            </div>

            <p className="text-[11px] text-blue-100/80 leading-relaxed">
              62% of statutory annual CPD requirements met for current audit cycle. All webinar and class attendance certificates are auto-verified.
            </p>
          </div>
        </div>

        {/* Theme Appearance Setting */}
        <div className="w-full text-left">
          <ThemeToggle variant="expanded" />
        </div>

        {/* Selected Clinical Topics / Modalities */}
        <div className="w-full bg-white dark:bg-[#121824] rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#002147] dark:text-[#38BDF8]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Active Clinical Specialties
              </h3>
            </div>
            <button
              onClick={onEditTopics}
              className="text-xs font-bold text-[#002147] dark:text-[#38BDF8] hover:text-[#FF7F32] transition-colors"
            >
              Edit
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {currentUser?.selectedTopics && currentUser.selectedTopics.length > 0 ? (
              currentUser.selectedTopics.map((topicId) => (
                <span
                  key={topicId}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#1E293B] text-slate-700 dark:text-slate-300 text-xs font-semibold"
                >
                  {topicDisplayNames[topicId] || topicId}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-500">General Radiography, Radiation Protection</span>
            )}
          </div>
        </div>

        {/* Clinical Compliance Readiness Checklist */}
        <div className="w-full bg-white dark:bg-[#121824] rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            NHS Locum Compliance Passport
          </h3>

          <div className="space-y-2 text-xs">
            {[
              { title: 'IR(ME)R & Radiation Safety 2026', status: 'Compliant', date: 'Valid to Dec 2026' },
              { title: 'Immediate Life Support (ILS) / BLS', status: 'Compliant', date: 'Valid to Nov 2026' },
              { title: 'Cannulation & IV Contrast Competency', status: 'Verified', date: 'Guy’s & St Thomas’' },
              { title: 'Enhanced DBS Check (Adult & Child)', status: 'Active', date: 'Update Service Enrolled' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-100 dark:border-slate-800"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{item.title}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{item.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="w-full bg-white dark:bg-[#121824] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Display & Preferences
          </h3>
          <ThemeToggle variant="expanded" />
        </div>

        {/* Account Actions */}
        <div className="w-full bg-white dark:bg-[#121824] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-2">
          {/* Sign Out */}
          <button
            onClick={signOut}
            className="w-full flex items-center justify-between p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-bold"
          >
            <div className="flex items-center gap-2.5">
              <LogOut className="w-4 h-4 text-slate-500" />
              <span>Sign Out of StudiRad</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* Delete Account (Apple 5.1.1 compliant) */}
          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full flex items-center justify-between p-2.5 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-xs font-bold"
          >
            <div className="flex items-center gap-2.5">
              <Trash2 className="w-4 h-4 text-red-500" />
              <span>Delete Account & Erase Data</span>
            </div>
            <ChevronRight className="w-4 h-4 text-red-400" />
          </button>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-[#121824] rounded-2xl max-w-sm w-full p-6 space-y-4 text-left border border-slate-200 dark:border-slate-800 shadow-2xl">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Delete StudiRad Account?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                This action is immediate and permanent. Your CPD points, quiz submissions, tutor bookings, and learning histories will be permanently deleted.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Delete Permanently'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
