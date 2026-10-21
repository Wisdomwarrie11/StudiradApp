import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Wordmark } from '../brand/Wordmark';
import { Bell, Moon, Sun } from 'lucide-react';
import { NavTab } from '../../types';

interface AppHeaderProps {
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onOpenNotifications,
  onOpenProfile,
}) => {
  const { currentUser, unreadNotificationCount, activeTab, setActiveTab } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const userInitial = currentUser?.fullName
    ? currentUser.fullName.charAt(0).toUpperCase()
    : 'R';

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'learn', label: 'Learn Hub' },
    { id: 'services', label: 'Services & Requests' },
    { id: 'aiTutor', label: 'AI Tutor' },
    { id: 'explore', label: 'Opportunities' },
  ];

  return (
    <header className="w-full bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] sticky top-0 z-30 select-none transition-colors duration-200">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 focus:outline-none hover:opacity-90 transition-opacity"
            title="Go to StudiRad Home"
            aria-label="StudiRad Home"
          >
            <Wordmark
              size="sm"
              theme={theme === 'dark' ? 'dark' : 'light'}
              withIcon={true}
            />
          </button>
        </div>

        {/* Zone 2: Desktop Navigation Links (Coursera-style top navigation on tablet/desktop) */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2 text-sm font-semibold">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap min-h-[44px] flex items-center ${
                  isActive
                    ? 'text-[#FF7F32] bg-[#FF7F32]/10 font-bold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Theme Toggle, Notifications, Profile) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Accessible Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="w-10 h-10 rounded-xl bg-[var(--bg-surface-elevated)] hover:bg-[var(--border-subtle)] text-[var(--text-primary)] flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-[#002147]" />
            )}
          </button>

          {/* Notifications */}
          <button
            onClick={onOpenNotifications}
            aria-label="View notifications"
            className="w-10 h-10 rounded-xl bg-[var(--bg-surface-elevated)] hover:bg-[var(--border-subtle)] text-[var(--text-primary)] flex items-center justify-center transition-colors relative min-h-[44px] min-w-[44px]"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#FF7F32] ring-2 ring-[var(--bg-surface)]"></span>
            )}
          </button>

          {/* Profile Drawer Trigger */}
          <button
            onClick={onOpenProfile}
            aria-label="Open user profile & settings"
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-[var(--bg-surface-elevated)] transition-colors min-h-[44px]"
          >
            <div className="w-9 h-9 rounded-full bg-[#002147] dark:bg-[#1B447A] text-white flex items-center justify-center font-bold text-sm ring-2 ring-[var(--border-subtle)]">
              {currentUser?.avatarUrl ? (
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.fullName}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                userInitial
              )}
            </div>
            <span className="hidden lg:inline text-xs font-bold text-[var(--text-primary)] truncate max-w-[120px]">
              {currentUser?.fullName?.split(' ')[0] || 'Profile'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
