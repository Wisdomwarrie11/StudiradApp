import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Course, LiveClass, Opportunity } from '../../types';
import { MOCK_COURSES, MOCK_LIVE_CLASSES, MOCK_OPPORTUNITIES } from '../../data/mockData';
import { 
  Play, 
  Clock, 
  Calendar, 
  Star, 
  Award, 
  ArrowRight, 
  Building2, 
  Video, 
  ChevronRight, 
  HelpCircle, 
  Sparkles, 
  Layers, 
  Activity, 
  Waves, 
  ShieldAlert, 
  BookOpen, 
  Flame, 
  Search, 
  CalendarPlus, 
  CheckCircle2, 
  MapPin, 
  ExternalLink 
} from 'lucide-react';

interface HomeTabProps {
  onSelectCourse: (course: Course) => void;
  onOpenPlayer: (course: Course) => void;
  onSelectLiveClass: (liveClass: LiveClass) => void;
  onSelectOpportunity: (opportunity: Opportunity) => void;
  onStartQuiz: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  onSelectCourse,
  onOpenPlayer,
  onSelectLiveClass,
  onSelectOpportunity,
  onStartQuiz,
}) => {
  const { currentUser, setActiveTab } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'in_progress' | 'live' | 'safety'>('all');

  const inProgressCourse = MOCK_COURSES[0];
  const featuredLiveClass = MOCK_LIVE_CLASSES[0];
  const previewOpportunity = MOCK_OPPORTUNITIES[0];

  const filteredCourses = MOCK_COURSES.filter((c) => {
    if (filterTab === 'in_progress') return (c.progressPercent || 0) > 0;
    if (filterTab === 'safety') return c.category === 'radiation_protection';
    if (!searchQuery.trim()) return true;
    return (
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="flex-1 w-full bg-[#F1F4F9] flex flex-col pb-8 overflow-y-auto no-scrollbar text-left text-slate-900 select-none">
      {/* 1. COURSERA 'LEARN' HERO SECTION */}
      <section className="w-full bg-gradient-to-b from-[#002147] via-[#001D40] to-[#0A2F5C] text-white pt-4 pb-7 px-5 rounded-b-[32px] shadow-lg relative overflow-hidden shrink-0">
        {/* Soft Ambient Lighting Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#FF7F32]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-400/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          {/* Personalized Greeting & Learner Metrics */}
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold text-blue-200/90 uppercase tracking-wider block mb-0.5">
                Radiography Education Portal
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Welcome back, {currentUser?.fullName?.split(' ')[0] || 'Radiographer'}
              </h1>
              <p className="text-xs text-blue-100/80 mt-1">
                What would you like to learn or review today?
              </p>
            </div>

            {/* Streak & CPD Hours Metric Pills */}
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <div className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-1.5 text-[11px] font-bold text-amber-300">
                <Flame className="w-3.5 h-3.5 fill-[#FF7F32] text-[#FF7F32]" />
                <span>4-Day Streak</span>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-1.5 text-[11px] font-bold text-blue-100">
                <Award className="w-3.5 h-3.5 text-[#FF7F32]" />
                <span>18.5 CPD hrs</span>
              </div>
            </div>
          </div>

          {/* Prominent Elevated Search Bar */}
          <div className="w-full bg-white rounded-2xl shadow-xl border border-slate-200/90 px-3.5 py-3 flex items-center gap-2.5 text-slate-800 transition-all focus-within:ring-2 focus-within:ring-[#FF7F32]">
            <Search className="w-4 h-4 text-[#002147] shrink-0 stroke-[2.5]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, scan protocols, CT/MRI, locums..."
              className="w-full bg-transparent text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold text-slate-400 hover:text-slate-700 px-1"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Filter Status Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
            {[
              { id: 'all', label: 'All Curricula' },
              { id: 'in_progress', label: 'In Progress (2)' },
              { id: 'live', label: 'Live Masterclasses (2)' },
              { id: 'safety', label: 'Radiation Safety' },
            ].map((pill) => (
              <button
                key={pill.id}
                onClick={() => setFilterTab(pill.id as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  filterTab === pill.id
                    ? 'bg-white text-[#002147] shadow-sm'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CARD-BASED BODY */}
      <div className="px-4 space-y-4 -mt-2 relative z-20">
        {/* 2. HIGH-CONTRAST "CONTINUE LEARNING" IN-PROGRESS CARD */}
        <section 
          onClick={() => onOpenPlayer(inProgressCourse)}
          className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-[0_6px_24px_rgba(0,33,71,0.06)] transition-all cursor-pointer hover:border-[#002147] group space-y-3.5"
        >
          {/* Card Header Status */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF7F32] animate-pulse"></span>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#002147]">
                In Progress · Continue Learning
              </span>
            </div>
            <span className="text-xs font-bold text-slate-700 font-mono">
              {inProgressCourse.progressPercent}% Completed
            </span>
          </div>

          {/* Split Course Visual & Details */}
          <div className="flex gap-4 items-center">
            {/* 16:9 Thumbnail with Overlay Play Button */}
            <div className="relative w-28 h-20 rounded-2xl overflow-hidden bg-slate-900 shrink-0 shadow-xs">
              <img
                src={inProgressCourse.image}
                alt={inProgressCourse.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
              />
              <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#FF7F32] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </div>
              </div>
            </div>

            {/* Title & Next Lesson */}
            <div className="flex-1 min-w-0 space-y-0.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block truncate">
                {inProgressCourse.institution}
              </span>
              <h3 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-[#002147] transition-colors">
                {inProgressCourse.title}
              </h3>
              <p className="text-[11px] text-slate-600 font-medium truncate pt-0.5">
                Next: Lesson 4 · Window Width & Leveling
              </p>
            </div>
          </div>

          {/* Progress Bar & High-Contrast Resume Action */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#002147] via-[#0A3266] to-[#FF7F32] rounded-full transition-all duration-300"
                style={{ width: `${inProgressCourse.progressPercent}%` }}
              ></div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenPlayer(inProgressCourse);
              }}
              className="py-2 px-4 rounded-xl bg-[#002147] hover:bg-[#001733] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-[0.98] transition-all shrink-0"
            >
              <span>Resume Lesson</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#FF7F32]" />
            </button>
          </div>
        </section>

        {/* 3. HIGH-CONTRAST "UPCOMING LIVE MASTERCLASS" CARD */}
        {featuredLiveClass && (
          <section 
            onClick={() => onSelectLiveClass(featuredLiveClass)}
            className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-[0_6px_24px_rgba(0,33,71,0.06)] space-y-3.5 cursor-pointer hover:border-[#FF7F32] transition-colors"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="flex items-center gap-1.5 text-xs font-bold text-[#FF7F32]">
                <Video className="w-4 h-4 text-[#FF7F32]" />
                <span className="uppercase tracking-wider text-[11px]">Live Masterclass</span>
              </span>
              <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-lg">
                {featuredLiveClass.date} · {featuredLiveClass.time.split(' ')[0]}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {featuredLiveClass.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                {featuredLiveClass.description}
              </p>
            </div>

            {/* Inner Surface for Faculty & Accreditation */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#002147] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {featuredLiveClass.instructor.charAt(0)}
                </div>
                <div>
                  <span className="font-bold text-slate-800 block text-[11px]">
                    {featuredLiveClass.instructor}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {featuredLiveClass.instructorRole.split(',')[0]}
                  </span>
                </div>
              </div>

              <span className="font-bold text-emerald-700 text-[11px] bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                {featuredLiveClass.cpdCredits}
              </span>
            </div>

            {/* Action Bar */}
            <div className="pt-1 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-500 font-medium">
                Accredited Live Interactive Session
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectLiveClass(featuredLiveClass);
                }}
                className="py-1.5 px-3.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#FF7F32] font-bold text-xs flex items-center gap-1 transition-colors border border-orange-200"
              >
                <span>Join / Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>
        )}

        {/* 4. RECOMMENDED SPECIALIZATIONS (High-Contrast Course Stack) */}
        <section className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Recommended Specializations
              </h2>
              <span className="text-[11px] text-slate-500">
                Accredited clinical radiography modules
              </span>
            </div>

            <button
              onClick={() => setActiveTab('learn')}
              className="text-xs font-bold text-[#002147] hover:text-[#FF7F32] transition-colors"
            >
              See all ({filteredCourses.length})
            </button>
          </div>

          <div className="space-y-3">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => onSelectCourse(course)}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_4px_16px_rgba(0,33,71,0.04)] overflow-hidden hover:border-[#002147] transition-all cursor-pointer group"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Thumbnail with CPD badge */}
                  <div className="w-full sm:w-36 h-32 bg-slate-900 relative overflow-hidden shrink-0">
                    <img
                      src={course.image}
                      alt={course.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-[10px] font-bold text-white">
                      {course.cpdCredits}
                    </span>
                  </div>

                  {/* Metadata */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{course.institution}</span>
                      </div>

                      <h3 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-[#002147] transition-colors">
                        {course.title}
                      </h3>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1 font-bold text-slate-800">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>{course.rating}</span>
                        <span className="text-slate-400 font-normal">({course.reviewsCount})</span>
                      </div>

                      <div className="flex items-center gap-1 text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{course.duration.split('·')[0]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. RADIOGRAPHY SPECIALTY TILES */}
        <section className="space-y-2.5 pt-1">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Explore Disciplines
          </h2>

          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <button
              onClick={() => setActiveTab('learn')}
              className="p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#002147] flex items-center gap-3 text-left transition-colors shadow-2xs group"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#002147] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block leading-tight">General X-Ray</span>
                <span className="text-[10px] text-slate-500">42 Modules</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('learn')}
              className="p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#002147] flex items-center gap-3 text-left transition-colors shadow-2xs group"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block leading-tight">CT & MRI</span>
                <span className="text-[10px] text-slate-500">38 Modules</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('learn')}
              className="p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#002147] flex items-center gap-3 text-left transition-colors shadow-2xs group"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Waves className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block leading-tight">Ultrasound</span>
                <span className="text-[10px] text-slate-500">29 Modules</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('learn')}
              className="p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#002147] flex items-center gap-3 text-left transition-colors shadow-2xs group"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block leading-tight">Radiation Safety</span>
                <span className="text-[10px] text-slate-500">31 Modules</span>
              </div>
            </button>
          </div>
        </section>

        {/* 6. QUICK CLINICAL TOOLS STRIP */}
        <section className="space-y-2.5 pt-1">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Clinical Tools & Desks
          </h2>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              onClick={onStartQuiz}
              className="p-3 rounded-2xl bg-white border border-slate-200/90 hover:border-purple-600 shadow-2xs text-left transition-colors flex flex-col justify-between group"
            >
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block text-[11px]">Daily Quiz</span>
                <span className="text-[9px] text-slate-400">5-min challenge</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('aiTutor')}
              className="p-3 rounded-2xl bg-white border border-slate-200/90 hover:border-[#FF7F32] shadow-2xs text-left transition-colors flex flex-col justify-between group"
            >
              <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#FF7F32] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block text-[11px]">AI Tutor</span>
                <span className="text-[9px] text-slate-400">Instant answers</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className="p-3 rounded-2xl bg-white border border-slate-200/90 hover:border-[#002147] shadow-2xs text-left transition-colors flex flex-col justify-between group"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#002147] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block text-[11px]">Private Desk</span>
                <span className="text-[9px] text-slate-400">1-on-1 coaching</span>
              </div>
            </button>
          </div>
        </section>

        {/* 7. LATEST LOCUM & CAREER OPENINGS PREVIEW */}
        {previewOpportunity && (
          <section className="space-y-2.5 pt-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Locum & Hospital Openings
                </h2>
                <span className="text-[11px] text-slate-500">
                  Verified NHS Trust & private imaging shifts
                </span>
              </div>

              <button
                onClick={() => setActiveTab('explore')}
                className="text-xs font-bold text-[#002147] hover:text-[#FF7F32] transition-colors"
              >
                View all →
              </button>
            </div>

            <div
              onClick={() => onSelectOpportunity(previewOpportunity)}
              className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_16px_rgba(0,33,71,0.04)] hover:border-[#002147] transition-all cursor-pointer space-y-2.5 group"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#002147] text-[10px] font-bold">
                      {previewOpportunity.type}
                    </span>
                    {previewOpportunity.urgent && (
                      <span className="px-1.5 py-0.5 rounded-md bg-red-100 text-red-700 text-[10px] font-bold">
                        Urgent Locum
                      </span>
                    )}
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 leading-snug group-hover:text-[#002147] transition-colors">
                    {previewOpportunity.title}
                  </h3>

                  <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{previewOpportunity.organisation}</span>
                  </span>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-[#FF7F32] font-mono block">
                    {previewOpportunity.rate.split('–')[0]}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {previewOpportunity.deadline}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{previewOpportunity.location}</span>
                </span>
                <span className="text-xs font-bold text-[#002147] group-hover:text-[#FF7F32] flex items-center gap-1">
                  <span>Apply Now</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
