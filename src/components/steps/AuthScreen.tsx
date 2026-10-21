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
  ShieldCheck, 
  UserCheck, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  ChevronLeft
} from 'lucide-react';
import { AuthMode, ProfessionalRole } from '../../types';

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
    <div className="flex-1 w-full bg-slate-50 flex flex-col justify-between select-none">
      {/* Top Bar with Wordmark */}
      <div className="w-full px-5 pt-4 pb-3 flex flex-col items-center border-b border-slate-200/80 bg-white shrink-0">
        <Wordmark size="md" withSubtitle={true} />

        {/* Mode Toggle (Tabs) */}
        {mode !== 'forgotPassword' ? (
          <div className="w-full max-w-xs mt-4 p-1 bg-slate-100 rounded-xl flex items-center border border-slate-200">
            <button
              onClick={() => {
                setMode('signIn');
                setErrorMessage(null);
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === 'signIn'
                  ? 'bg-[#002147] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode('signUp');
                setErrorMessage(null);
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === 'signUp'
                  ? 'bg-[#002147] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
          </div>
        ) : (
          <div className="w-full flex items-center justify-between mt-3">
            <button
              onClick={() => {
                setMode('signIn');
                setErrorMessage(null);
                setResetSent(false);
              }}
              className="flex items-center gap-1 text-xs font-semibold text-[#002147] hover:underline"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Sign In</span>
            </button>
            <span className="text-xs font-bold text-slate-500">Account Recovery</span>
          </div>
        )}
      </div>

      {/* Main Form Body */}
      <div className="flex-1 w-full px-5 py-4 overflow-y-auto no-scrollbar flex flex-col justify-start">
        {/* Error notification */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        {/* SIGN IN VIEW */}
        {mode === 'signIn' && (
          <form onSubmit={handleSignIn} className="flex flex-col gap-3.5">
            {/* Quick Demo Pre-fill helper */}
            <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#002147]">Quick Test Demo:</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => fillDemo('student')}
                  className="px-2 py-0.5 bg-white border border-blue-200 text-[10px] font-bold text-[#002147] rounded-md shadow-2xs hover:bg-blue-50 transition-colors"
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => fillDemo('radiographer')}
                  className="px-2 py-0.5 bg-white border border-blue-200 text-[10px] font-bold text-[#FF7F32] rounded-md shadow-2xs hover:bg-orange-50 transition-colors"
                >
                  Radiographer
                </button>
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-1 text-left">
              <label className="text-xs font-bold text-slate-700">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="email"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  placeholder="name@hospital.org or university.edu"
                  required
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1 text-left">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={() => {
                    setMode('forgotPassword');
                    setErrorMessage(null);
                  }}
                  className="text-xs font-medium text-[#FF7F32] hover:text-[#e06720] transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent transition-all shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Sign In CTA */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 h-11 rounded-xl bg-[#002147] hover:bg-[#001733] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#002147]/20 active:scale-[0.98] transition-all disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to StudiRad</span>
                  <ArrowRight className="w-4 h-4 text-[#FF7F32]" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-2 flex items-center justify-center">
              <div className="w-full border-t border-slate-200"></div>
              <span className="absolute px-3 bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                or continue with
              </span>
            </div>

            {/* Google Authentication Button */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="w-full h-10 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 shadow-2xs active:scale-[0.98] transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Google Clinical Workspace</span>
            </button>
          </form>
        )}

        {/* CREATE ACCOUNT VIEW */}
        {mode === 'signUp' && (
          <form onSubmit={handleSignUp} className="flex flex-col gap-3">
            {/* Full Name */}
            <div className="flex flex-col gap-1 text-left">
              <label className="text-xs font-bold text-slate-700">Full Name & Credentials</label>
              <div className="relative flex items-center">
                <User className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  placeholder="e.g. Dr. Jordan Hayes / Taylor Reed, BSc"
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002147] transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1 text-left">
              <label className="text-xs font-bold text-slate-700">Institutional Email</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="email"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  placeholder="name@hospital.org"
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002147] transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Professional Role Selection */}
            <div className="flex flex-col gap-1 text-left">
              <label className="text-xs font-bold text-slate-700">Professional Stage</label>
              <select
                value={signUpRole}
                onChange={(e) => setSignUpRole(e.target.value as ProfessionalRole)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002147] transition-all shadow-2xs"
              >
                <option value="Radiography Student">Radiography Student (Undergraduate / MSc)</option>
                <option value="Qualified Radiographer">Qualified Diagnostic Radiographer</option>
                <option value="Imaging Technologist">CT / MRI Imaging Technologist</option>
                <option value="Clinical Educator">Clinical Practice Educator</option>
                <option value="Radiology Resident">Radiology Resident / Fellow</option>
              </select>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1 text-left">
              <label className="text-xs font-bold text-slate-700">Create Password (min 8 characters)</label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  placeholder="Create secure clinical password"
                  required
                  className="w-full pl-9 pr-10 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002147] transition-all shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-2 pt-1 text-left cursor-pointer">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-[#002147] focus:ring-[#002147]"
              />
              <span className="text-[11px] text-slate-600 leading-snug">
                I agree to the StudiRad Terms of Service, clinical guidelines, and student privacy policy.
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 h-11 rounded-xl bg-[#002147] hover:bg-[#001733] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#002147]/20 active:scale-[0.98] transition-all disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account & Continue</span>
                  <ArrowRight className="w-4 h-4 text-[#FF7F32]" />
                </>
              )}
            </button>
          </form>
        )}

        {/* FORGOT PASSWORD VIEW */}
        {mode === 'forgotPassword' && (
          <div className="flex flex-col gap-4 text-left">
            {resetSent ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col items-center text-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mb-1" />
                <h3 className="text-sm font-bold text-emerald-900">Recovery Instructions Sent</h3>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  We sent a secure password reset link to <span className="font-semibold">{resetEmail}</span>. Please check your inbox and hospital junk filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setMode('signIn');
                    setResetSent(false);
                  }}
                  className="mt-3 px-4 py-2 bg-[#002147] text-white text-xs font-semibold rounded-xl hover:bg-[#001733]"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleResetSubmit} className="flex flex-col gap-3">
                <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-xs text-amber-900 leading-relaxed">
                  Enter your registered institutional or personal email address. We will verify your account and dispatch a reset link.
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-700">Account Email</label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="your.email@hospital.org"
                      required
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002147] transition-all shadow-2xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 h-11 rounded-xl bg-[#002147] hover:bg-[#001733] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#002147]/20 transition-all disabled:opacity-70"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Recovery Instructions</span>
                      <ArrowRight className="w-4 h-4 text-[#FF7F32]" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Bottom Guest Mode Option */}
      <div className="w-full px-5 py-3 border-t border-slate-200/80 bg-white flex flex-col items-center gap-2 shrink-0">
        <button
          onClick={loginAsGuest}
          className="w-full py-2.5 px-3 rounded-xl border border-slate-300 hover:border-[#FF7F32] bg-slate-50 hover:bg-orange-50/30 text-slate-700 hover:text-[#002147] font-semibold text-xs flex items-center justify-center gap-2 transition-all group"
        >
          <UserCheck className="w-4 h-4 text-[#FF7F32]" />
          <span>Browse as Guest</span>
          <span className="text-[10px] text-slate-400 group-hover:text-slate-500">
            (No login needed)
          </span>
        </button>

        <span className="text-[10px] text-slate-400">
          StudiRad respects radiographer accreditation and privacy standards.
        </span>
      </div>
    </div>
  );
};
