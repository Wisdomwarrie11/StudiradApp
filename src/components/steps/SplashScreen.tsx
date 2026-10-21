import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Wordmark } from '../brand/Wordmark';
import { Activity, ShieldCheck, Zap } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { setScreen } = useAuth();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress increment
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 4;
      });
    }, 70);

    // Auto-transition to onboarding when ready
    const timer = setTimeout(() => {
      setScreen('onboarding');
    }, 2400);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [setScreen]);

  return (
    <div 
      onClick={() => setScreen('onboarding')}
      className="relative flex-1 w-full bg-[#002147] text-white flex flex-col justify-between items-center p-8 select-none cursor-pointer overflow-hidden transition-colors"
    >
      {/* Background Radiographic Beam / Ambient Glow FX */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft Radial Gradient */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#0A3A75] rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#FF7F32]/25 rounded-full blur-3xl opacity-40"></div>
        
        {/* Radiographic Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        ></div>
      </div>

      {/* Top Clinical Tagline */}
      <div className="w-full flex justify-between items-center pt-2 z-10">
        <span className="text-[11px] font-semibold tracking-wider uppercase text-blue-200/80">
          Medical Imaging Suite
        </span>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-medium text-amber-200">
          <Activity className="w-3 h-3 text-[#FF7F32] animate-pulse" />
          <span>v2.4 Clinical Ready</span>
        </div>
      </div>

      {/* Center Wordmark & Pulse Animation */}
      <div className="flex flex-col items-center justify-center my-auto z-10 text-center">
        {/* Multi-ring Pulsing Radiology Target */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Outer Pulsing Wave */}
          <div className="absolute w-36 h-36 rounded-full border border-[#FF7F32]/30 animate-ping opacity-30"></div>
          {/* Middle Pulse Ring */}
          <div className="absolute w-28 h-28 rounded-full border border-white/20 animate-pulse-glow"></div>
          {/* Inner Core Container */}
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#002147] via-[#0A3060] to-[#001733] border-2 border-[#FF7F32]/80 flex items-center justify-center shadow-[0_0_35px_rgba(255,127,50,0.35)]">
            {/* Clinical Radiology Emblem */}
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12"
            >
              <circle cx="24" cy="24" r="14" stroke="#FF7F32" strokeWidth="3" strokeDasharray="5 3" />
              <circle cx="24" cy="24" r="6" fill="#FF7F32" />
              <path d="M24 4V13" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M24 35V44" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M4 24H13" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M35 24H44" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Brand Wordmark: "Studi" in Oxford Blue (white here on dark), "Rad" in Light Orange (#FF7F32) */}
        <div className="mb-2">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight flex items-center justify-center">
            <span className="text-white drop-shadow-sm">Studi</span>
            <span className="text-[#FF7F32] drop-shadow-[0_2px_12px_rgba(255,127,50,0.5)]">Rad</span>
          </h1>
        </div>

        <p className="text-sm font-medium text-slate-300 max-w-xs leading-relaxed">
          The Premier Learning & Career Platform for Radiography Professionals
        </p>
      </div>

      {/* Bottom Loading Progress & Tap Affordance */}
      <div className="w-full flex flex-col items-center gap-3 z-10 pb-4">
        {/* Progress Bar with Light Orange glow */}
        <div className="w-48 h-1.5 bg-white/15 rounded-full overflow-hidden p-0.5 backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-[#FF7F32] to-[#FFA266] rounded-full transition-all duration-150 ease-out shadow-[0_0_8px_#FF7F32]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between w-full max-w-xs text-[11px] text-blue-200/70 pt-1">
          <span>Initializing Clinical Modules</span>
          <span className="font-mono text-[#FF7F32] font-semibold">{progress}%</span>
        </div>

        <span className="text-[10px] text-slate-400 mt-2 hover:text-white transition-colors">
          Tap anywhere to continue
        </span>
      </div>
    </div>
  );
};
