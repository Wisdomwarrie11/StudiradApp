import React from 'react';
import { Course } from '../../types';
import { 
  X, 
  Star, 
  Clock, 
  Building2, 
  Award, 
  CheckCircle2, 
  Play, 
  Users, 
  BookOpen, 
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface CourseDetailsModalProps {
  course: Course | null;
  onClose: () => void;
  onOpenPlayer: (course: Course) => void;
}

export const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({
  course,
  onClose,
  onOpenPlayer,
}) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn text-slate-900">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div 
        className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col shadow-2xl z-10 overflow-hidden text-left animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between shrink-0 bg-white">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Course Overview
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
          {/* Hero Thumbnail */}
          <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-900 shadow-sm group">
            <img
              src={course.image}
              alt={course.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4">
              <span className="px-2 py-0.5 rounded bg-[#FF7F32] text-white text-[10px] font-bold w-fit mb-1">
                {course.cpdCredits}
              </span>
              <h2 className="text-base font-bold text-white leading-tight">
                {course.title}
              </h2>
            </div>
          </div>

          {/* Instructor & Institution */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Lead Clinical Instructor
              </span>
              <h3 className="text-xs font-bold text-[#002147] mt-0.5">
                {course.instructor}
              </h3>
              <p className="text-[11px] text-slate-500">
                {course.instructorRole}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1 justify-end">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{course.rating}</span>
              </span>
              <span className="text-[10px] text-slate-400">
                ({course.reviewsCount} reviews)
              </span>
            </div>
          </div>

          {/* Key Facts Strip */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <Clock className="w-4 h-4 text-slate-400 mx-auto mb-1" />
              <span className="font-bold text-slate-800 block text-[11px]">{course.duration}</span>
              <span className="text-[9px] text-slate-400">Duration</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <BookOpen className="w-4 h-4 text-slate-400 mx-auto mb-1" />
              <span className="font-bold text-slate-800 block text-[11px]">{course.modules.length} Modules</span>
              <span className="text-[9px] text-slate-400">Curriculum</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <Award className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <span className="font-bold text-slate-800 block text-[11px]">{course.cpdCredits}</span>
              <span className="text-[9px] text-slate-400">Accredited</span>
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-900">Course Overview</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {course.overview}
            </p>
          </div>

          {/* Learning Outcomes */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900">What You Will Learn</h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {course.learningOutcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Curriculum Preview */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900">Curriculum Structure</h4>
            <div className="space-y-2">
              {course.modules.map((mod) => (
                <div key={mod.id} className="p-3 rounded-xl border border-slate-200 bg-white shadow-2xs">
                  <div className="flex items-center justify-between text-xs font-bold text-[#002147]">
                    <span>{mod.title}</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      {mod.lessons.length} lessons
                    </span>
                  </div>
                  <ul className="mt-2 space-y-1 text-[11px] text-slate-600 pl-2 border-l border-slate-200">
                    {mod.lessons.map((les) => (
                      <li key={les.id} className="flex items-center justify-between py-0.5">
                        <span className="truncate pr-2">• {les.title}</span>
                        <span className="text-slate-400 shrink-0 font-mono text-[10px]">
                          {les.duration}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Sticky Action Bar */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] text-slate-400 font-medium block">Tuition Status</span>
            <span className="text-sm font-bold text-[#002147]">{course.price}</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenPlayer(course);
            }}
            className="py-2.5 px-5 rounded-xl bg-[#002147] hover:bg-[#001733] text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-[#002147]/20 active:scale-[0.98] transition-all"
          >
            <Play className="w-4 h-4 fill-white ml-0.5" />
            <span>{course.progressPercent ? 'Continue Course' : 'Enrol Now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
