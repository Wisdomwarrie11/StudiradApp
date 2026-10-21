import React, { useState } from 'react';
import { Course, Lesson } from '../../types';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  FileText, 
  HelpCircle, 
  BookOpen, 
  Layers, 
  Volume2, 
  Maximize2
} from 'lucide-react';

interface CoursePlayerModalProps {
  course: Course | null;
  onClose: () => void;
  onOpenQuiz?: () => void;
}

export const CoursePlayerModal: React.FC<CoursePlayerModalProps> = ({
  course,
  onClose,
  onOpenQuiz,
}) => {
  if (!course) return null;

  // Flatten lessons for easy indexing
  const allLessons: Lesson[] = course.modules.flatMap((m) => m.lessons);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(
    allLessons.filter((l) => l.completed).map((l) => l.id)
  );
  const [showCurriculumDrawer, setShowCurriculumDrawer] = useState(false);

  const currentLesson = allLessons[currentLessonIndex] || allLessons[0];
  const isCurrentCompleted = completedLessonIds.includes(currentLesson.id);

  const handleNextLesson = () => {
    if (currentLessonIndex < allLessons.length - 1) {
      setCurrentLessonIndex((prev) => prev + 1);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex((prev) => prev - 1);
    }
  };

  const toggleComplete = () => {
    if (isCurrentCompleted) {
      setCompletedLessonIds((prev) => prev.filter((id) => id !== currentLesson.id));
    } else {
      setCompletedLessonIds((prev) => [...prev, currentLesson.id]);
    }
  };

  const progressPercent = Math.round(
    (completedLessonIds.length / allLessons.length) * 100
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity text-slate-900 animate-fadeIn select-none">
      <div 
        className="relative w-full max-w-xl h-full max-h-[92vh] bg-white rounded-t-3xl sm:rounded-3xl flex flex-col shadow-2xl overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-4 py-3 bg-[#002147] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 truncate pr-2">
            <button
              onClick={() => setShowCurriculumDrawer(!showCurriculumDrawer)}
              className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Lessons ({currentLessonIndex + 1}/{allLessons.length})</span>
            </button>
            <span className="text-xs font-medium text-blue-200 truncate">
              {course.title}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Screen Simulation */}
        <div className="relative w-full aspect-video bg-black flex flex-col justify-between p-3 shrink-0">
          {/* Simulated DICOM / Clinical Medical Scan Animation Graphic */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          </div>

          {/* Centered Scan Graphic */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border-2 border-[#FF7F32]/50 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border border-white/30 flex items-center justify-center text-center px-4">
                <span className="text-[11px] font-mono text-white/80">
                  {currentLesson.title}
                </span>
              </div>
            </div>
          </div>

          {/* Video Status Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-white text-[10px] font-mono">
              1080p HD · Radiography DICOM Player
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold bg-black/60 px-2 py-0.5 rounded">
              {currentLesson.duration}
            </span>
          </div>

          {/* Center Play/Pause button */}
          <div className="relative z-10 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 rounded-full bg-[#FF7F32]/90 hover:bg-[#FF7F32] text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-white" />
              ) : (
                <Play className="w-6 h-6 fill-white ml-0.5" />
              )}
            </button>
          </div>

          {/* Bottom Scrubber & Controls */}
          <div className="relative z-10 flex flex-col gap-1.5">
            <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-[#FF7F32] w-[45%]"></div>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-white/80">
              <span>06:45 / {currentLesson.duration}</span>
              <div className="flex items-center gap-2">
                <Volume2 className="w-3.5 h-3.5" />
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Information & Controls Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {/* Title & Completion Button */}
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold text-[#FF7F32] uppercase tracking-wider block mb-0.5">
                Lesson {currentLessonIndex + 1}
              </span>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {currentLesson.title}
              </h3>
            </div>

            <button
              onClick={toggleComplete}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 ${
                isCurrentCompleted
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{isCurrentCompleted ? 'Completed' : 'Mark Done'}</span>
            </button>
          </div>

          {/* Lesson Summary */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-800">Clinical Focus</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {currentLesson.summary}
            </p>
          </div>

          {/* Learning Progress Bar */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Course Progress</span>
              <span className="font-bold text-[#002147] font-mono">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#002147] transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-slate-500 block">
              {completedLessonIds.length} of {allLessons.length} lessons completed
            </span>
          </div>

          {/* Quick Links: Resources & Quiz */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button 
              onClick={() => {
                onClose();
                onOpenQuiz?.();
              }}
              className="p-3 rounded-xl border border-slate-200 hover:border-[#002147] bg-white flex items-center gap-2 text-left transition-colors shadow-2xs"
            >
              <HelpCircle className="w-4 h-4 text-purple-600 shrink-0" />
              <div>
                <span className="font-bold text-slate-900 block leading-tight">Module Quiz</span>
                <span className="text-[10px] text-slate-400">Test understanding</span>
              </div>
            </button>

            <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center gap-2 text-left shadow-2xs cursor-pointer">
              <FileText className="w-4 h-4 text-[#FF7F32] shrink-0" />
              <div>
                <span className="font-bold text-slate-900 block leading-tight">Handout PDF</span>
                <span className="text-[10px] text-slate-400">Notes & schematics</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Lesson Navigation Bar */}
        <div className="p-3.5 border-t border-slate-200 bg-white flex items-center justify-between shrink-0">
          <button
            onClick={handlePrevLesson}
            disabled={currentLessonIndex === 0}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-xs font-bold text-slate-400">
            {currentLessonIndex + 1} / {allLessons.length}
          </span>

          <button
            onClick={handleNextLesson}
            disabled={currentLessonIndex === allLessons.length - 1}
            className="px-4 py-2 rounded-xl bg-[#002147] hover:bg-[#001733] text-white text-xs font-bold disabled:opacity-40 flex items-center gap-1 transition-colors"
          >
            <span>Next Lesson</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
