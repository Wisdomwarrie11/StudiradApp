import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Wordmark } from '../brand/Wordmark';
import { Bell } from 'lucide-react';

interface AppHeaderProps {
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onOpenNotifications,
  onOpenProfile,
}) => {
  const { currentUser, unreadNotificationCount, activeTab, setActiveTab } = useAuth();

  const isHome = activeTab === 'home';

  const userInitial = currentUser?.fullName
    ? currentUser.fullName.charAt(0).toUpperCase()
    : 'R';

  const tabLabels: Record<string, string> = {
    learn: 'Learn Hub',
    aiTutor: 'AI Tutor',
    services: 'Services Desk',
    explore: 'Explore',
  };

  return (
    <header
      className={`w-full h-14 sticky top-0 z-30 select-none transition-colors duration-200 border-b ${
        isHome
          ? 'bg-[#002147] text-white border-white/10'
          : 'bg-white text-slate-900 border-slate-200/90 shadow-2xs'
      }`}
    >
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left: Brand Wordmark (tap to return to Home) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-1.5 focus:outline-none active:opacity-80 transition-opacity"
            title="Go to StudiRad Home"
          >
            <Wordmark
              size="sm"
              theme={isHome ? 'onOxford' : 'light'}
              withIcon={true}
            />
          </button>

          {!isHome && tabLabels[activeTab] && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-[#002147] text-[11px] font-bold border border-slate-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7F32]"></span>
              {tabLabels[activeTab]}
            </span>
          )}
        </div>

        {/* Right: Notifications & Profile */}
        <div className="flex items-center gap-2">
          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            aria-label="View notifications"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors relative ${
              isHome
                ? 'text-blue-200 hover:text-white hover:bg-white/10'
                : 'text-slate-600 hover:text-[#002147] hover:bg-slate-100'
            }`}
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF7F32] shadow-[0_0_6px_#FF7F32]"></span>
            )}
          </button>

          {/* Profile Avatar */}
          <button
            onClick={onOpenProfile}
            aria-label="Open profile drawer"
            className={`w-8 h-8 rounded-full flex items-center justify-center p-0.5 border transition-colors group ${
              isHome
                ? 'border-white/30 hover:border-[#FF7F32]'
                : 'border-slate-200 hover:border-[#FF7F32]'
            }`}
          >
            {currentUser?.avatarUrl ? (
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.fullName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div
                className={`w-full h-full rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  isHome
                    ? 'bg-[#FF7F32] text-white'
                    : 'bg-[#002147] text-white group-hover:bg-[#001733]'
                }`}
              >
                {userInitial}
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
