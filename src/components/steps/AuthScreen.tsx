import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Wordmark } from '../brand/Wordmark';
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  ChevronLeft,
  UserCheck
} from 'lucide-react';
import { AuthMode, ProfessionalRole } from '../../types';
import { ThemeToggle } from '../common/ThemeToggle';

export const AuthScreen: React.FC = () => {
  const { signIn, signUp, signInWithGoogle, sendPasswordReset, loginAsGuest } = useAuth();
  const [mode, setMode] = useState<AuthMode>('signIn');

  // Sign In State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Sign Up State
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpRole, setSignUpRole] = useState<ProfessionalRole>('Radiography Student');
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Forgot Password State
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  // Status & Feedback
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);
    const res = await signIn(signInEmail, signInPassword);
    setIsLoading(false);
    if (!res.success && res.error) {
      setErrorMessage(res.error);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!agreedTerms) {
      setErrorMessage('Please accept the Radiography Education terms to proceed.');
      return;
    }
    setIsLoading(true);
    const res = await signUp({
      fullName: signUpName,
      email: signUpEmail,
      password: signUpPassword,
      role: signUpRole,
    });
    setIsLoading(false);
    if (!res.success && res.error) {
      setErrorMessage(res.error);
    }
  };

  const handleGoogleAuth = async () => {
    setErrorMessage(null);
    setIsLoading(true);
    const res = await signInWithGoogle();
    setIsLoading(false);
    if (!res.success && res.error) {
      setErrorMessage(res.error);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);
    const res = await sendPasswordReset(resetEmail);
    setIsLoading(false);
    if (res.success) {
      setResetSent(true);
    } else if (res.error) {
      setErrorMessage(res.error);
    }
  };

  const fillDemo = (role: 'student' | 'radiographer') => {
    if (role === 'student') {
      setSignInEmail('student.jordan@university.edu');
      setSignInPassword('Clinical2026!');
    } else {
      setSignInEmail('alex.morgan@nhs.uk');
      setSignInPassword('RadiologyLead#1');
    }
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen w-full bg-[var(--bg-canvas)] text-[var(--text-primary)] flex flex-col justify-between py-6 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-xl mx-auto flex flex-col flex-1 justify-between">
        {/* Top Header */}
        <header className="w-full pb-4 flex flex-col items-center border-b border-[var(--border-subtle)] shrink-0 relative">
          <div className="absolute right-0 top-0">
            <ThemeToggle />
          </div>
          <Wordmark size="md" withSubtitle={true} className="mb-4" />

          {/* Mode Tabs */}
          {mode !== 'forgotPassword' ? (
            <div className="w-full max-w-xs p-1 bg-[var(--bg-surface-elevated)] rounded-xl flex items-center border border-[var(--border-subtle)]">
              <button
                type="button"
                onClick={() => {
                  setMode('signIn');
                  setErrorMessage(null);
                }}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                  mode === 'signIn'
                    ? 'bg-[#002147] dark:bg-[#1B447A] text-white shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signUp');
                  setErrorMessage(null);
                }}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                  mode === 'signUp'
                    ? 'bg-[#002147] dark:bg-[#1B447A] text-white shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Create Account
              </button>
            </div>
          ) : (
            <div className="w-full flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => {
                  setMode('signIn');
                  setErrorMessage(null);
                  setResetSent(false);
                }}
                className="flex items-center gap-1.5 text-sm font-bold text-[#FF7F32] hover:underline"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Sign In</span>
              </button>
              <span className="text-sm font-semibold text-[var(--text-muted)]">Password Recovery</span>
            </div>
          )}
        </header>

        {/* Main Form Area */}
        <main className="py-6 sm:py-8 flex-1 flex flex-col justify-start">
          {errorMessage && (
            <div className="mb-5 p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
              <span className="leading-snug">{errorMessage}</span>
            </div>
          )}

          {/* SIGN IN */}
          {mode === 'signIn' && (
            <form onSubmit={handleSignIn} className="flex flex-col gap-5">
              {/* Quick Demo Pre-fill */}
              <div className="p-3.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-between">
                <span className="label-ui text-[var(--text-secondary)]">Quick Demo Fill:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fillDemo('student')}
                    className="px-3 py-1.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-bold text-[#002147] dark:text-blue-300 rounded-lg hover:border-[#FF7F32] transition-colors"
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => fillDemo('radiographer')}
                    className="px-3 py-1.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-bold text-[#FF7F32] rounded-lg hover:border-[#FF7F32] transition-colors"
                  >
                    Radiographer
                  </button>
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="label-ui text-[var(--text-primary)]">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                  <input
                    type="email"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder="name@hospital.org or university.edu"
                    required
                    className="w-full pl-11 pr-4 h-12 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#FF7F32] transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5 text-left">
                <div className="flex items-center justify-between">
                  <label className="label-ui text-[var(--text-primary)]">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgotPassword');
                      setErrorMessage(null);
                    }}
                    className="text-xs font-bold text-[#FF7F32] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-11 pr-12 h-12 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#FF7F32] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-slate-400 hover:text-[var(--text-primary)] p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Sign In CTA */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 mt-2 rounded-xl bg-[#002147] dark:bg-[#1B447A] hover:bg-[#001733] dark:hover:bg-[#23589E] text-white font-bold text-base flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all disabled:opacity-60"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In to StudiRad</span>
                    <ArrowRight className="w-5 h-5 text-[#FF7F32]" />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative my-2 flex items-center justify-center">
                <div className="w-full border-t border-[var(--border-subtle)]"></div>
                <span className="absolute px-3 bg-[var(--bg-canvas)] text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  or continue with
                </span>
              </div>

              {/* Google Workspace */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] font-bold text-sm flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z" />
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                </svg>
                <span>Google Institutional Workspace</span>
              </button>
            </form>
          )}

          {/* SIGN UP */}
          {mode === 'signUp' && (
            <form onSubmit={handleSignUp} className="flex flex-col gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="label-ui text-[var(--text-primary)]">
                  Full Name & Professional Title <span className="text-red-400">*</span>
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    placeholder="e.g. Jordan Hayes, BSc Diagnostic Radiography"
                    required
                    className="w-full pl-11 pr-4 h-12 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#FF7F32] transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="label-ui text-[var(--text-primary)]">
                  Institutional / Academic Email <span className="text-red-400">*</span>
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                  <input
                    type="email"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    placeholder="name@hospital.org or university.ac.uk"
                    required
                    className="w-full pl-11 pr-4 h-12 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#FF7F32] transition-all"
                  />
                </div>
              </div>

              {/* Role */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="label-ui text-[var(--text-primary)]">
                  Professional Practice Stage <span className="text-red-400">*</span>
                </label>
                <select
                  value={signUpRole}
                  onChange={(e) => setSignUpRole(e.target.value as ProfessionalRole)}
                  className="w-full px-4 h-12 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm font-medium text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#FF7F32] transition-all"
                >
                  <option value="Radiography Student">Radiography Student (Undergraduate / MSc)</option>
                  <option value="Qualified Radiographer">Qualified Diagnostic Radiographer</option>
                  <option value="Imaging Technologist">CT / MRI Imaging Technologist</option>
                  <option value="Clinical Educator">Clinical Practice Educator</option>
                  <option value="Radiology Resident">Radiology Resident / Fellow</option>
                </select>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="label-ui text-[var(--text-primary)]">
                  Create Password (minimum 8 characters) <span className="text-red-400">*</span>
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    placeholder="Create a strong password"
                    required
                    className="w-full pl-11 pr-12 h-12 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#FF7F32] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-slate-400 hover:text-[var(--text-primary)] p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 pt-1 text-left cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-[var(--border-subtle)] text-[#FF7F32] focus:ring-[#FF7F32]"
                />
                <span className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  I agree to the StudiRad Terms of Service, clinical guidelines, and student privacy policy.
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 mt-2 rounded-xl bg-[#FF7F32] hover:bg-[#E86B20] text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-[#FF7F32]/20 active:scale-[0.98] transition-all disabled:opacity-60"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Create Account & Continue</span>
                    <ArrowRight className="w-5 h-5 text-white" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* FORGOT PASSWORD */}
          {mode === 'forgotPassword' && (
            <div className="flex flex-col gap-5 text-left">
              {resetSent ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex flex-col items-center text-center gap-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-1" />
                  <h2 className="heading-card text-emerald-100">Recovery Instructions Dispatched</h2>
                  <p className="body-standard text-emerald-200/90 leading-relaxed max-w-sm">
                    A secure password reset verification has been sent to <strong>{resetEmail}</strong>. Please check your inbox and institutional junk filter.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signIn');
                      setResetSent(false);
                    }}
                    className="mt-4 px-6 h-12 bg-[#002147] dark:bg-[#1B447A] text-white font-bold rounded-xl"
                  >
                    Return to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleResetSubmit} className="flex flex-col gap-4">
                  <div className="p-4 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] rounded-xl text-sm text-[var(--text-secondary)] leading-relaxed">
                    Enter your registered email address. We will verify your account records and dispatch a secure reset link.
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="label-ui text-[var(--text-primary)]">
                      Registered Email <span className="text-red-400">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <Mail className="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                      <input
                        type="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="your.email@hospital.org"
                        required
                        className="w-full pl-11 pr-4 h-12 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#FF7F32] transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 mt-2 rounded-xl bg-[#002147] dark:bg-[#1B447A] hover:bg-[#001733] text-white font-bold text-base flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-60"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Send Recovery Instructions</span>
                        <ArrowRight className="w-5 h-5 text-[#FF7F32]" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </main>

        {/* Bottom Guest Mode */}
        <footer className="w-full pt-4 border-t border-[var(--border-subtle)] flex flex-col items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={loginAsGuest}
            className="w-full h-12 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[#FF7F32] text-[var(--text-primary)] font-bold text-sm flex items-center justify-center gap-2.5 transition-all"
          >
            <UserCheck className="w-5 h-5 text-[#FF7F32]" />
            <span>Browse as Guest Explorer</span>
            <span className="text-xs text-[var(--text-muted)]">(No account needed)</span>
          </button>

          <span className="text-xs text-[var(--text-muted)] text-center">
            StudiRad complies with HCPC and ISRRT clinical education guidelines.
          </span>
        </footer>
      </div>
    </div>
  );
};
