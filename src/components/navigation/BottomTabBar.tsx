import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, 
  BookOpen, 
  Search, 
  Bot, 
  Briefcase, 
  Compass, 
  User 
} from 'lucide-react';
import { NavTab } from '../../types';

export const BottomTabBar: React.FC = () => {
  const { activeTab, setActiveTab } = useAuth();

  const tabs: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'aiTutor', label: 'AI', icon: Bot },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'explore', label: 'Careers', icon: Compass },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav 
      aria-label="Main Application Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0B0F17]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-1.5 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] select-none safe-area-pb"
    >
      <div className="max-w-md sm:max-w-xl mx-auto flex items-center justify-between">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const IconComponent = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-h-[46px] flex flex-col items-center justify-center gap-0.5 transition-all relative py-1 px-0.5 ${
                isActive
                  ? 'text-[#002147] dark:text-[#38BDF8]'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <div className="relative">
                <IconComponent
                  className={`w-4.5 h-4.5 transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.6]'
                  }`}
                />
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#FF7F32]"></span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium tracking-tight text-center truncate max-w-full ${
                  isActive ? 'font-bold text-[#002147] dark:text-[#38BDF8]' : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
