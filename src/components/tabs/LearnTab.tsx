import React, { useState } from 'react';
import { Course, LiveClass } from '../../types';
import { MOCK_COURSES, MOCK_LIVE_CLASSES, MOCK_RESOURCES, MOCK_QUIZ } from '../../data/mockData';
import { 
  BookOpen, 
  Video, 
  FileText, 
  HelpCircle, 
  Calendar, 
  Clock, 
  Star, 
  Building2, 
  ArrowRight,
  Download,
  CheckCircle2,
  Play
} from 'lucide-react';

interface LearnTabProps {
  onSelectCourse: (course: Course) => void;
  onOpenPlayer: (course: Course) => void;
  onSelectLiveClass: (liveClass: LiveClass) => void;
  onStartQuiz: () => void;
}

export const LearnTab: React.FC<LearnTabProps> = ({
  onSelectCourse,
  onOpenPlayer,
  onSelectLiveClass,
  onStartQuiz,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'courses' | 'classes' | 'resources' | 'quizzes'>('courses');
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);

  const handleDownloadResource = (id: string) => {
    setDownloadedIds((prev) => [...prev, id]);
  };

  return (
    <div className="flex-1 w-full bg-[#F5F7FA] flex flex-col p-4 space-y-4 overflow-y-auto no-scrollbar text-left text-slate-900">
      {/* 4 Internal Sections Segmented Control */}
      <div className="w-full bg-slate-200/80 p-1 rounded-xl flex items-center text-xs shrink-0">
        <button
          onClick={() => setActiveSubTab('courses')}
          className={`flex-1 py-1.5 font-bold rounded-lg transition-all ${
            activeSubTab === 'courses'
              ? 'bg-white text-[#002147] shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Courses
        </button>
        <button
          onClick={() => setActiveSubTab('classes')}
          className={`flex-1 py-1.5 font-bold rounded-lg transition-all ${
            activeSubTab === 'classes'
              ? 'bg-white text-[#002147] shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Live Classes
        </button>
        <button
          onClick={() => setActiveSubTab('resources')}
          className={`flex-1 py-1.5 font-bold rounded-lg transition-all ${
            activeSubTab === 'resources'
              ? 'bg-white text-[#002147] shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Resources
        </button>
        <button
          onClick={() => setActiveSubTab('quizzes')}
          className={`flex-1 py-1.5 font-bold rounded-lg transition-all ${
            activeSubTab === 'quizzes'
              ? 'bg-white text-[#002147] shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Quizzes
        </button>
      </div>

      {/* 1. COURSES SECTION */}
      {activeSubTab === 'courses' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Showing {MOCK_COURSES.length} Specialist Curricula</span>
            <span className="font-semibold text-[#002147]">Accredited CPD</span>
          </div>

          <div className="space-y-3">
            {MOCK_COURSES.map((course) => (
              <div
                key={course.id}
                onClick={() => onSelectCourse(course)}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden hover:border-[#002147] transition-all cursor-pointer group"
              >
                <div className="w-full h-32 bg-slate-100 relative overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-xs text-[10px] font-bold text-white">
                    {course.cpdCredits}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                    <Building2 className="w-3 h-3 text-slate-400" />
                    <span>{course.institution}</span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-[#002147] transition-colors">
                    {course.title}
                  </h3>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="font-bold text-slate-800">{course.rating}</span>
                      <span className="text-slate-400">({course.reviewsCount})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenPlayer(course);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#002147] text-white text-[11px] font-bold flex items-center gap-1 hover:bg-[#001733]"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>{course.progressPercent ? 'Resume' : 'Start'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. LIVE CLASSES SECTION */}
      {activeSubTab === 'classes' && (
        <div className="space-y-3">
          <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-[#002147] leading-relaxed">
            Attend live interactive webinars led by consultant radiologists and senior university educators with accredited CPD certificates.
          </div>

          <div className="space-y-3">
            {MOCK_LIVE_CLASSES.map((lc) => (
              <div
                key={lc.id}
                onClick={() => onSelectLiveClass(lc)}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3 cursor-pointer hover:border-[#FF7F32] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-[#FF7F32]">
                    <Video className="w-4 h-4 text-[#FF7F32]" />
                    <span>Live Masterclass</span>
                  </span>
                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                    {lc.date} · {lc.time}
                  </span>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-900 leading-snug">
                    {lc.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Faculty: {lc.instructor} ({lc.instructorRole})
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-emerald-600 font-semibold">
                    {lc.cpdCredits}
                  </span>
                  <span className="text-xs font-bold text-[#002147] hover:text-[#FF7F32] flex items-center gap-1">
                    <span>{lc.isRegistered ? '✓ Registered · Details' : 'Register Free'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. RESOURCES SECTION */}
      {activeSubTab === 'resources' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Clinical Pocket Guides & Checklists</span>
            <span className="text-[#002147] font-semibold">Mobile Offline Ready</span>
          </div>

          <div className="space-y-2">
            {MOCK_RESOURCES.map((res) => {
              const isDownloaded = downloadedIds.includes(res.id);
              return (
                <div
                  key={res.id}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-2.5 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#FF7F32] flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 leading-snug truncate">
                        {res.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {res.description}
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                        {res.format} · {res.size}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownloadResource(res.id)}
                    className={`p-2 rounded-xl border flex items-center justify-center shrink-0 transition-colors ${
                      isDownloaded
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                        : 'bg-slate-50 text-[#002147] border-slate-200 hover:bg-slate-100'
                    }`}
                    title={isDownloaded ? 'Downloaded' : 'Download Resource'}
                  >
                    {isDownloaded ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. QUIZZES SECTION */}
      {activeSubTab === 'quizzes' && (
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-900 via-purple-950 to-indigo-950 text-white space-y-2 shadow-sm">
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
              Diagnostic Case Challenge
            </span>
            <h3 className="text-sm font-bold text-white">
              {MOCK_QUIZ.title}
            </h3>
            <p className="text-xs text-purple-200 leading-relaxed">
              Test your understanding of emergency radiographic criteria, radiation protection physics, and pathology localization.
            </p>
            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-purple-300 text-[11px]">
                {MOCK_QUIZ.questionCount} Questions · {MOCK_QUIZ.durationMin} Mins
              </span>
              <button
                onClick={onStartQuiz}
                className="py-1.5 px-3 rounded-xl bg-[#FF7F32] hover:bg-[#E86B20] text-white font-bold text-xs flex items-center gap-1 shadow-xs"
              >
                <span>Launch Quiz</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
