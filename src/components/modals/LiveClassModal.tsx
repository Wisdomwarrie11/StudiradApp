import React, { useState } from 'react';
import { LiveClass } from '../../types';
import { 
  X, 
  Calendar, 
  Clock, 
  Award, 
  Video, 
  User, 
  CheckCircle2, 
  FileText, 
  ExternalLink,
  CalendarPlus
} from 'lucide-react';

interface LiveClassModalProps {
  liveClass: LiveClass | null;
  onClose: () => void;
}

export const LiveClassModal: React.FC<LiveClassModalProps> = ({
  liveClass,
  onClose,
}) => {
  if (!liveClass) return null;

  const [isRegistered, setIsRegistered] = useState(liveClass.isRegistered);
  const [calendarAdded, setCalendarAdded] = useState(false);

  const handleAddToCalendar = () => {
    setCalendarAdded(true);
    setTimeout(() => setCalendarAdded(false), 2500);
  };

  const [joinedRoom, setJoinedRoom] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn text-slate-900 dark:text-slate-100 select-none">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div 
        className="relative w-full max-w-lg bg-white dark:bg-[#121824] rounded-t-3xl sm:rounded-3xl max-h-[88vh] flex flex-col shadow-2xl z-10 overflow-hidden text-left animate-slideUp border border-slate-200 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 bg-white dark:bg-[#121824]">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF7F32]">
            <Video className="w-4 h-4" />
            <span>Live Interactive Masterclass</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
          {/* Main Title & Tag */}
          <div>
            <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/60 text-[#002147] dark:text-blue-300 text-[10px] font-bold">
              {liveClass.cpdCredits}
            </span>
            <h2 className="text-base font-bold text-[#002147] dark:text-white mt-1.5 leading-snug">
              {liveClass.title}
            </h2>
          </div>

          {/* Time & Calendar Strip */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-semibold">
                <Calendar className="w-4 h-4 text-[#FF7F32]" />
                <span>{liveClass.date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-mono">
                <Clock className="w-4 h-4" />
                <span>{liveClass.time} ({liveClass.duration})</span>
              </div>
            </div>

            <button
              onClick={handleAddToCalendar}
              className="w-full mt-2 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#121824] hover:bg-slate-50 dark:hover:bg-[#1A2438] text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <CalendarPlus className="w-4 h-4 text-[#002147] dark:text-[#38BDF8]" />
              <span>{calendarAdded ? '✓ Added to Device Calendar' : 'Add to Apple / Google Calendar'}</span>
            </button>
          </div>

          {/* Instructor Profile */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#002147] dark:bg-[#1B447A] text-white flex items-center justify-center font-bold text-sm shrink-0">
              {liveClass.instructor.charAt(0)}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Session Faculty
              </span>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                {liveClass.instructor}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {liveClass.instructorRole}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Clinical Focus & Agenda</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {liveClass.description}
            </p>
          </div>

          {/* Requirements */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Session Requirements</h4>
            <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
              {liveClass.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Materials */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Handouts & Post-Class Materials</h4>
            <div className="space-y-1 text-xs">
              {liveClass.relatedMaterials.map((mat, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <FileText className="w-3.5 h-3.5 text-[#FF7F32]" />
                    <span>{mat}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">PDF</span>
                </div>
              ))}
            </div>
          </div>

          {joinedRoom && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300">
              ✓ Connected to Live Class Stream. Audio & video stream syncing...
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121824] flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsRegistered(!isRegistered)}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all border ${
              isRegistered
                ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
            }`}
          >
            {isRegistered ? '✓ Registered' : 'Register for Free'}
          </button>

          <button
            onClick={() => setJoinedRoom(true)}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#002147] hover:bg-[#001733] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#002147]/20 active:scale-[0.98] transition-all"
          >
            <Video className="w-4 h-4 text-[#FF7F32]" />
            <span>Join Class Room</span>
            <ExternalLink className="w-3.5 h-3.5 text-white/70" />
          </button>
        </div>
      </div>
    </div>
  );
};
