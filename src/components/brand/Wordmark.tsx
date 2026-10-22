import React from 'react';

interface WordmarkProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  theme?: 'auto' | 'light' | 'dark' | 'onOxford';
  withSubtitle?: boolean;
  withIcon?: boolean;
  className?: string;
}

export const Wordmark: React.FC<WordmarkProps> = ({
  size = 'md',
  theme = 'auto',
  withSubtitle = false,
  withIcon = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-xl tracking-tight',
    md: 'text-2xl tracking-tight',
    lg: 'text-3xl tracking-tight font-bold',
    xl: 'text-4xl tracking-tight font-extrabold',
    hero: 'text-5xl tracking-tighter font-extrabold',
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-9 h-9',
    xl: 'w-11 h-11',
    hero: 'w-14 h-14',
  };

  // On light backgrounds: Studi is Oxford Blue (#002147), Rad is Light Orange (#FF7F32)
  // On dark/Oxford backgrounds: Studi is crisp bright white (#FFFFFF), Rad is Light Orange (#FF7F32)
  const studiColor =
    theme === 'onOxford' || theme === 'dark'
      ? 'text-white'
      : theme === 'light'
      ? 'text-[#002147]'
      : 'text-[#002147] dark:text-white';
  const radColor = 'text-[#FF7F32]';

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex items-center gap-2 select-none">
        {withIcon && (
          <div
            className={`relative flex items-center justify-center rounded-xl transition-transform ${iconSizes[size]}`}
          >
            {/* Clinical Radiology Aperture / Focal Beam Graphic */}
            <svg
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-sm"
            >
              <rect
                width="40"
                height="40"
                rx="10"
                fill={theme === 'onOxford' ? '#0A2B54' : '#002147'}
              />
              {/* Radiography Beam / Crosshair Focal Lines */}
              <circle cx="20" cy="20" r="11" stroke="#FF7F32" strokeWidth="2.5" strokeDasharray="4 2" />
              <circle cx="20" cy="20" r="4.5" fill="#FF7F32" />
              <path d="M20 5V12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
              <path d="M20 28V35" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
              <path d="M5 20H12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
              <path d="M28 20H35" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
            </svg>
          </div>
        )}

        <div className={`font-extrabold ${sizeClasses[size]}`}>
          <span className={studiColor}>Studi</span>
          <span className={radColor}>Rad</span>
        </div>
      </div>

      {withSubtitle && (
        <span
          className={`text-xs tracking-wider uppercase font-semibold mt-1 ${
            theme === 'onOxford' || theme === 'dark'
              ? 'text-slate-300/80'
              : theme === 'light'
              ? 'text-slate-500'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          Radiography & Medical Imaging
        </span>
      )}
    </div>
  );
};
