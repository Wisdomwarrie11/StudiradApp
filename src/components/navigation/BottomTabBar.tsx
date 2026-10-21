import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Home, BookOpen, Bot, Briefcase, Compass } from 'lucide-react';
import { NavTab } from '../../types';

export const BottomTabBar: React.FC = () => {
  const { activeTab, setActiveTab } = useAuth();

  const tabs: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'aiTutor', label: 'AI Tutor', icon: Bot },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'explore', label: 'Explore', icon: Compass },
  ];

  return (
    <nav 
      aria-label="Coursera-style Main Navigation"
      className="w-full bg-white border-t border-slate-200/90 px-3 py-2 flex items-center justify-around shrink-0 z-30 select-none shadow-[0_-2px_10px_rgba(0,0,0,0.03)]"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const IconComponent = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-h-[46px] flex flex-col items-center justify-center gap-1 transition-colors relative ${
              isActive
                ? 'text-[#002147]'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className="relative">
              <IconComponent
                className={`w-5 h-5 transition-transform duration-150 ${
                  isActive ? 'text-[#002147] stroke-[2.3]' : 'stroke-[1.6]'
                }`}
              />
              {/* Subtle Coursera-style active indicator dot in brand Light Orange */}
              {isActive && (
                <span className="absolute -top-0.5 -right-1 w-1.5 h-1.5 rounded-full bg-[#FF7F32]"></span>
              )}
            </div>
            <span
              className={`text-[11px] tracking-tight leading-none transition-colors ${
                isActive ? 'font-bold text-[#002147]' : 'font-medium text-slate-500'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
