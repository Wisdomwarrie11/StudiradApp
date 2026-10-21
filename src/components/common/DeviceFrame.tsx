import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Smartphone, 
  Maximize2, 
  RotateCcw, 
  Wifi, 
  Battery, 
  Sliders, 
  ShieldCheck,
  Sparkles,
  Info
} from 'lucide-react';
import { AppScreen } from '../../types';

interface DeviceFrameProps {
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  const { currentScreen, setScreen, resetToSplash, currentUser } = useAuth();
  const [currentTime, setCurrentTime] = useState('09:41');
  const [deviceMode, setDeviceMode] = useState<'framed' | 'full'>('framed');
  const [showTesterDrawer, setShowTesterDrawer] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  const screens: { id: AppScreen; label: string; stepDesc: string }[] = [
    { id: 'splash', label: '1. Splash', stepDesc: 'Pulse animation & auto-transition' },
    { id: 'onboarding', label: '2. Onboard', stepDesc: '3 swipeable cards with images' },
    { id: 'auth', label: '3. Auth', stepDesc: 'Sign In, Create, Reset, Guest' },
    { id: 'personalise', label: '4. Topics', stepDesc: '6 Radiography topic selectors' },
    { id: 'app', label: 'StudiRad App', stepDesc: 'Home, Learn, AI Tutor, Services, Explore' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#00142B] to-slate-900 text-slate-100 flex flex-col items-center justify-start p-2 sm:p-4 lg:p-6 select-none font-sans">
      {/* Top Desktop Controls Toolbar */}
      <header className="w-full max-w-5xl mb-3 sm:mb-5 flex flex-wrap items-center justify-between gap-3 px-3 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF7F32] shadow-[0_0_8px_#FF7F32]"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              StudiRad Mobile Preview
            </span>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">|</span>
          <span className="text-xs font-medium text-emerald-400 hidden sm:inline">
            Step 2: Main Navigation Shell Active
          </span>
        </div>

        {/* Step Jumpers for Quick Review Testing */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="hidden md:flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
            {screens.map((s) => {
              const isActive = currentScreen === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setScreen(s.id)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#FF7F32] text-white shadow-sm font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                  title={s.stepDesc}
                >
                  {s.label}
                </button>
              );
            })}
          </div>

          {/* Mode switch */}
          <button
            onClick={() => setDeviceMode(deviceMode === 'framed' ? 'full' : 'framed')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 transition-colors"
            title="Toggle between mobile phone mockup and direct responsive canvas"
          >
            {deviceMode === 'framed' ? (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Expand Canvas</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Phone Frame</span>
              </>
            )}
          </button>

          {/* Reset flow button */}
          <button
            onClick={resetToSplash}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-red-500/15 text-red-200 hover:bg-red-500/25 border border-red-500/30 transition-colors"
            title="Restart flow from initial Splash screen"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Restart Flow</span>
          </button>
        </div>
      </header>

      {/* Main Preview Container */}
      <div className="w-full flex justify-center items-start flex-1">
        {deviceMode === 'framed' ? (
          /* Realistic Smartphone Chassis */
          <div className="relative w-full max-w-[412px] h-[855px] max-h-[calc(100vh-80px)] rounded-[48px] p-3.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.12),inset_0_0_0_2px_rgba(0,0,0,0.8)] border border-slate-700/60 flex flex-col transition-all">
            {/* Phone Outer Edge Accent Highlights */}
            <div className="absolute top-24 -left-4 w-1 h-12 bg-slate-600 rounded-l-md"></div>
            <div className="absolute top-40 -left-4 w-1 h-12 bg-slate-600 rounded-l-md"></div>
            <div className="absolute top-28 -right-4 w-1 h-16 bg-slate-600 rounded-r-md"></div>

            {/* Inner Screen Bezel */}
            <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-white text-slate-900 flex flex-col shadow-inner border border-black/40">
              {/* Dynamic Island / Status Bar */}
              <div className="w-full h-11 bg-transparent px-6 flex items-center justify-between text-xs font-semibold z-50 shrink-0 pointer-events-none select-none">
                {/* Clock */}
                <span className="text-current text-[13px] tracking-tight pl-1 opacity-90">
                  {currentTime}
                </span>

                {/* Dynamic Pill Notch */}
                <div className="w-24 h-5 bg-black rounded-full flex items-center justify-end px-2 gap-1.5 shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-blue-950/80"></div>
                  </div>
                </div>

                {/* Status Icons */}
                <div className="flex items-center gap-1.5 pr-1 opacity-90">
                  <Wifi className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold">5G</span>
                  <Battery className="w-4 h-4" />
                </div>
              </div>

              {/* Mobile Viewport Screen Body */}
              <div className="flex-1 w-full overflow-y-auto overflow-x-hidden relative no-scrollbar flex flex-col">
                {children}
              </div>

              {/* Bottom Home Indicator Bar */}
              <div className="w-full h-5 bg-transparent flex items-center justify-center shrink-0 z-50 pointer-events-none">
                <div className="w-32 h-1 bg-slate-400/60 rounded-full"></div>
              </div>
            </div>
          </div>
        ) : (
          /* Expanded Canvas Mode (Full Responsive view) */
          <div className="w-full max-w-lg min-h-[780px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col relative">
            <div className="flex-1 w-full overflow-y-auto no-scrollbar flex flex-col text-slate-900">
              {children}
            </div>
          </div>
        )}
      </div>

      {/* Quick Mobile Step Navigation Strip on Small Screens */}
      <div className="md:hidden w-full max-w-sm mt-3 px-2 py-1.5 bg-black/60 backdrop-blur rounded-xl border border-white/10 flex items-center justify-between text-xs">
        <span className="text-slate-400">Jump Step:</span>
        <div className="flex items-center gap-1">
          {screens.map((s) => (
            <button
              key={s.id}
              onClick={() => setScreen(s.id)}
              className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                currentScreen === s.id
                  ? 'bg-[#FF7F32] text-white font-bold'
                  : 'text-slate-300'
              }`}
            >
              {s.id === 'app' ? 'App' : s.id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
