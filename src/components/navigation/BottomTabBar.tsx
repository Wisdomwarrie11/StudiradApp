import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Home, BookOpen, Bot, FileSpreadsheet, Compass } from 'lucide-react';
import { NavTab } from '../../types';

export const BottomTabBar: React.FC = () => {
  const { activeTab, setActiveTab } = useAuth();

  const tabs: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'aiTutor', label: 'AI Tutor', icon: Bot },
    { id: 'services', label: 'Requests', icon: FileSpreadsheet },
    { id: 'explore', label: 'Explore', icon: Compass },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] px-2 py-1 flex items-center justify-around z-40 select-none shadow-lg transition-colors duration-200"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const IconComponent = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-h-[50px] flex flex-col items-center justify-center gap-1 transition-colors relative ${
              isActive
                ? 'text-[#FF7F32]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <div className="relative">
              <IconComponent
                className={`w-5 h-5 transition-transform duration-150 ${
                  isActive ? 'stroke-[2.4] scale-105' : 'stroke-[1.7]'
                }`}
              />
              {isActive && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FF7F32]"></span>
              )}
            </div>
            <span
              className={`text-[11px] tracking-tight leading-none ${
                isActive ? 'font-bold text-[#FF7F32]' : 'font-medium'
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
