import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Course, LiveClass, Opportunity } from '../../types';
import { MOCK_COURSES, MOCK_LIVE_CLASSES, MOCK_OPPORTUNITIES } from '../../data/mockData';
import { 
  Play, 
  Clock, 
  ArrowRight, 
  Search, 
  Video, 
  Star, 
  HelpCircle, 
  Bot, 
  Layers, 
  ChevronRight,
  ShieldCheck,
  Building2
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

  const inProgressCourse = MOCK_COURSES[0];
  const upcomingClass = MOCK_LIVE_CLASSES[0];
  const featuredCourses = MOCK_COURSES.slice(0, 3);
  const featuredOpportunity = MOCK_OPPORTUNITIES[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveTab('learn');
    }
  };

  return (
    <div className="w-full flex flex-col space-y-8 sm:space-y-10 py-6 sm:py-8 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
      {/* 1. HERO SECTION: Clean, calm, learning-focused Coursera-inspired greeting */}
      <section className="w-full rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 sm:p-10 shadow-sm relative overflow-hidden text-left">
        {/* Subtle accent backdrop */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#002147]/10 dark:bg-[#1B447A]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-[#FF7F32]/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF7F32]">
            Radiography Learning Portal
          </span>

          <h1 className="heading-display text-[var(--text-primary)]">
            Welcome back, {currentUser?.fullName?.split(' ')[0] || 'Radiography Professional'}
          </h1>

          <p className="body-large text-[var(--text-secondary)] leading-relaxed">
            Advance your clinical radiography practice with consultant-led masterclasses, accredited imaging curricula, and diagnostic case reviews.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="pt-2">
            <div className="relative flex items-center max-w-2xl">
              <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, clinical protocols, CT/MRI physics, locums..."
                className="w-full pl-12 pr-28 h-13 rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-sm sm:text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#FF7F32] shadow-inner transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 h-9 px-4 rounded-xl bg-[#002147] dark:bg-[#1B447A] hover:bg-[#001733] dark:hover:bg-[#23589E] text-white font-bold text-xs sm:text-sm transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Primary & Secondary Dual Action Buttons */}
          <div className="pt-3 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActiveTab('learn')}
              className="h-12 px-6 rounded-xl bg-[#FF7F32] hover:bg-[#E86B20] text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-md shadow-[#FF7F32]/20 active:scale-[0.98] transition-all min-h-[48px]"
            >
              <span>Explore Learning Resources</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveTab('explore')}
              className="h-12 px-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] font-bold text-sm sm:text-base flex items-center gap-2 transition-all min-h-[48px]"
            >
              <span>Explore Career Opportunities</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. CONTINUE LEARNING (High-contrast progress section) */}
      <section className="space-y-4 text-left">
        <div className="flex items-center justify-between">
          <h2 className="heading-section text-[var(--text-primary)]">
            Continue Learning
          </h2>
          <button
            onClick={() => setActiveTab('learn')}
            className="text-sm font-bold text-[#FF7F32] hover:underline flex items-center gap-1"
          >
            <span>View All Courses</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div 
          onClick={() => onOpenPlayer(inProgressCourse)}
          className="bg-[var(--bg-surface)] rounded-3xl p-5 sm:p-6 border border-[var(--border-subtle)] shadow-sm hover:border-[#FF7F32] transition-all cursor-pointer group"
        >
          <div className="flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
            {/* Visual & Course Info */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
              <div className="relative w-full sm:w-40 aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 shrink-0">
                <img
                  src={inProgressCourse.image}
                  alt={inProgressCourse.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#FF7F32] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 flex-1 min-w-0">
                <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
                  {inProgressCourse.institution} · {inProgressCourse.category.replace('_', ' ')}
                </span>
                <h3 className="heading-card text-[var(--text-primary)] group-hover:text-[#FF7F32] transition-colors">
                  {inProgressCourse.title}
                </h3>
                <p className="body-secondary text-[var(--text-secondary)]">
                  Next: Lesson 4 · Image Reconstruction Algorithms & Filtered Back Projection
                </p>
                <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-[var(--text-muted)]">
                  <span>{inProgressCourse.progressPercent}% Completed</span>
                  <span>·</span>
                  <span>{inProgressCourse.cpdCredits}</span>
                </div>
              </div>
            </div>

            {/* Resume Action */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-3 items-stretch md:items-end shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[var(--border-subtle)]">
              <div className="w-full md:w-48 h-2.5 bg-[var(--bg-canvas)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
                <div
                  className="h-full bg-gradient-to-r from-[#002147] via-[#1B447A] to-[#FF7F32] rounded-full"
                  style={{ width: `${inProgressCourse.progressPercent}%` }}
                ></div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenPlayer(inProgressCourse);
                }}
                className="h-11 px-5 rounded-xl bg-[#002147] dark:bg-[#1B447A] hover:bg-[#001733] dark:hover:bg-[#23589E] text-white font-bold text-sm flex items-center justify-center gap-2 min-h-[44px] transition-colors"
              >
                <span>Resume Lesson</span>
                <ChevronRight className="w-4 h-4 text-[#FF7F32]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. UPCOMING LIVE CLASS */}
      {upcomingClass && (
        <section className="space-y-4 text-left">
          <h2 className="heading-section text-[var(--text-primary)]">
            Upcoming Clinical Masterclass
          </h2>

          <div
            onClick={() => onSelectLiveClass(upcomingClass)}
            className="bg-[var(--bg-surface)] rounded-3xl p-6 sm:p-7 border border-[var(--border-subtle)] shadow-sm hover:border-[#FF7F32] transition-all cursor-pointer space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2 text-sm font-bold text-[#FF7F32]">
                <Video className="w-5 h-5 text-[#FF7F32]" />
                <span className="uppercase tracking-wider">Live Interactive Webinar</span>
              </div>
              <span className="text-xs sm:text-sm font-bold text-[var(--text-secondary)] font-mono">
                {upcomingClass.date} · {upcomingClass.time}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="heading-card text-[var(--text-primary)]">
                {upcomingClass.title}
              </h3>
              <p className="body-standard text-[var(--text-secondary)]">
                {upcomingClass.description}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#002147] dark:bg-[#1B447A] text-white flex items-center justify-center font-bold text-sm">
                  {upcomingClass.instructor.charAt(0)}
                </div>
                <div>
                  <span className="text-sm font-bold text-[var(--text-primary)] block">
                    {upcomingClass.instructor}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">
                    {upcomingClass.instructorRole}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
                  {upcomingClass.cpdCredits}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectLiveClass(upcomingClass);
                  }}
                  className="h-11 px-5 rounded-xl bg-[#FF7F32] hover:bg-[#E86B20] text-white font-bold text-sm flex items-center gap-2 min-h-[44px] transition-colors"
                >
                  <span>View Details & Register</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. FEATURED CURATED LEARNING MODULES */}
      <section className="space-y-4 text-left">
        <div className="flex items-center justify-between">
          <h2 className="heading-section text-[var(--text-primary)]">
            Featured Curricula
          </h2>
          <button
            onClick={() => setActiveTab('learn')}
            className="text-sm font-bold text-[#FF7F32] hover:underline flex items-center gap-1"
          >
            <span>See All Curricula</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => onSelectCourse(course)}
              className="bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-subtle)] shadow-sm overflow-hidden hover:border-[#FF7F32] transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="w-full aspect-[16/10] bg-slate-900 relative overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-xs text-xs font-bold text-white">
                    {course.cpdCredits}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
                    {course.institution}
                  </span>
                  <h3 className="heading-card text-[var(--text-primary)] group-hover:text-[#FF7F32] transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="body-secondary text-[var(--text-secondary)] line-clamp-2">
                    {course.overview}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                <div className="flex items-center gap-1 font-bold text-[var(--text-primary)]">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>{course.rating}</span>
                  <span className="text-[var(--text-muted)] font-normal">({course.reviewsCount})</span>
                </div>
                <span>{course.duration.split('·')[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. QUICK LEARNING ACTIONS STRIP */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
        <button
          onClick={onStartQuiz}
          className="p-5 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[#FF7F32] shadow-sm flex items-center gap-4 transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="heading-card text-[var(--text-primary)] mb-0.5">
              Daily Diagnostic Quiz
            </h3>
            <p className="body-secondary text-[var(--text-secondary)]">
              5-minute clinical image critique & emergency signs challenge.
            </p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('aiTutor')}
          className="p-5 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[#FF7F32] shadow-sm flex items-center gap-4 transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#FF7F32]/10 text-[#FF7F32] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="heading-card text-[var(--text-primary)] mb-0.5">
              Radiography AI Tutor
            </h3>
            <p className="body-secondary text-[var(--text-secondary)]">
              Ask questions on scan protocols, anatomy, and radiation physics.
            </p>
          </div>
        </button>
      </section>

      {/* 6. OPPORTUNITIES PREVIEW (Secondary discovery per requirement 5) */}
      {featuredOpportunity && (
        <section className="space-y-4 text-left pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="heading-section text-[var(--text-primary)]">
                Featured Clinical Opportunity
              </h2>
              <span className="body-secondary text-[var(--text-muted)]">
                Verified NHS and private healthcare placements
              </span>
            </div>

            <button
              onClick={() => setActiveTab('explore')}
              className="text-sm font-bold text-[#FF7F32] hover:underline flex items-center gap-1"
            >
              <span>Explore All Opportunities</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div
            onClick={() => onSelectOpportunity(featuredOpportunity)}
            className="p-5 sm:p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-sm hover:border-[#FF7F32] transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-bold">
                  {featuredOpportunity.type}
                </span>
                {featuredOpportunity.urgent && (
                  <span className="px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 text-xs font-bold">
                    Urgent Cover
                  </span>
                )}
              </div>
              <h3 className="heading-card text-[var(--text-primary)]">
                {featuredOpportunity.title}
              </h3>
              <p className="body-secondary text-[var(--text-secondary)] flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>{featuredOpportunity.organisation} · {featuredOpportunity.location}</span>
              </p>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-[var(--border-subtle)]">
              <span className="text-base sm:text-lg font-bold text-[#FF7F32] font-mono">
                {featuredOpportunity.rate}
              </span>
              <span className="text-xs text-[var(--text-muted)]">
                Deadline: {featuredOpportunity.deadline}
              </span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
