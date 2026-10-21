import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Wordmark } from '../brand/Wordmark';

export const SplashScreen: React.FC = () => {
  const { setScreen, currentUser } = useAuth();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 60);

    const timer = setTimeout(() => {
      if (currentUser) {
        setScreen('app');
      } else {
        setScreen('onboarding');
      }
    }, 1600);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [setScreen, currentUser]);

  const handleContinue = () => {
    if (currentUser) {
      setScreen('app');
    } else {
      setScreen('onboarding');
    }
  };

  return (
    <div 
      onClick={handleContinue}
      className="min-h-screen w-full bg-[#0B0F17] text-white flex flex-col justify-between items-center py-10 px-6 select-none cursor-pointer relative"
    >
      {/* Subtle radial depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#002147]/50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#FF7F32]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full flex justify-center items-center z-10 pt-4">
        <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">
          Professional Radiography Education
        </span>
      </div>

      {/* Center Wordmark */}
      <div className="flex flex-col items-center justify-center my-auto z-10 text-center max-w-md">
        <Wordmark size="hero" theme="dark" withIcon={true} withSubtitle={false} className="mb-4" />

        <p className="body-standard text-slate-300 mt-2 max-w-sm">
          Empowering radiography students, diagnostic radiographers, and medical imaging professionals worldwide.
        </p>
      </div>

      {/* Bottom Loading Progress */}
      <div className="w-full max-w-xs flex flex-col items-center gap-3 z-10 pb-6">
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#002147] via-[#0A3266] to-[#FF7F32] rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <span className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
          Tap anywhere to continue
        </span>
      </div>
    </div>
  );
};
