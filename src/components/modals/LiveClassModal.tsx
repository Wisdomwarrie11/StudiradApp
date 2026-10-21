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

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn text-slate-900">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div 
        className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl max-h-[88vh] flex flex-col shadow-2xl z-10 overflow-hidden text-left animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF7F32]">
            <Video className="w-4 h-4" />
            <span>Live Interactive Masterclass</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
          {/* Main Title & Tag */}
          <div>
            <span className="px-2 py-0.5 rounded-md bg-blue-100 text-[#002147] text-[10px] font-bold">
              {liveClass.cpdCredits}
            </span>
            <h2 className="text-base font-bold text-[#002147] mt-1.5 leading-snug">
              {liveClass.title}
            </h2>
          </div>

          {/* Time & Calendar Strip */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <Calendar className="w-4 h-4 text-[#FF7F32]" />
                <span>{liveClass.date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500 font-mono">
                <Clock className="w-4 h-4" />
                <span>{liveClass.time} ({liveClass.duration})</span>
              </div>
            </div>

            <button
              onClick={handleAddToCalendar}
              className="w-full mt-2 py-2 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <CalendarPlus className="w-4 h-4 text-[#002147]" />
              <span>{calendarAdded ? '✓ Added to Device Calendar' : 'Add to Apple / Google Calendar'}</span>
            </button>
          </div>

          {/* Instructor Profile */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#002147] text-white flex items-center justify-center font-bold text-sm shrink-0">
              {liveClass.instructor.charAt(0)}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Session Faculty
              </span>
              <h3 className="text-xs font-bold text-slate-900">
                {liveClass.instructor}
              </h3>
              <p className="text-[11px] text-slate-500">
                {liveClass.instructorRole}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-900">Clinical Focus & Agenda</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {liveClass.description}
            </p>
          </div>

          {/* Requirements */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-900">Session Requirements</h4>
            <ul className="space-y-1 text-xs text-slate-600">
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
            <h4 className="text-xs font-bold text-slate-900">Handouts & Post-Class Materials</h4>
            <div className="space-y-1 text-xs">
              {liveClass.relatedMaterials.map((mat, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-700">
                    <FileText className="w-3.5 h-3.5 text-[#FF7F32]" />
                    <span>{mat}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">PDF</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsRegistered(!isRegistered)}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all border ${
              isRegistered
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
          >
            {isRegistered ? '✓ Registered' : 'Register for Free'}
          </button>

          <button
            onClick={() => {
              if (liveClass.meetingLink) {
                window.open(liveClass.meetingLink, '_blank');
              }
            }}
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
