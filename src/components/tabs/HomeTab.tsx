import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Wordmark } from '../brand/Wordmark';
import { Course, LiveClass, Opportunity } from '../../types';
import { MOCK_COURSES, MOCK_LIVE_CLASSES, MOCK_RESOURCES, MOCK_OPPORTUNITIES } from '../../data/mockData';
import { ThemeToggle } from '../common/ThemeToggle';
import { 
  Bell, 
  Video, 
  ChevronRight, 
  Play, 
  FileText, 
  Bot, 
  HelpCircle, 
  Clock, 
  Star, 
  ArrowRight,
  BookOpen,
  Calendar,
  Sparkles,
  Briefcase,
  GraduationCap,
  Award,
  MapPin,
  Building2,
  DollarSign
} from 'lucide-react';

interface HomeTabProps {
  onSelectCourse: (course: Course) => void;
  onOpenPlayer: (course: Course) => void;
  onSelectLiveClass: (liveClass: LiveClass) => void;
  onSelectOpportunity: (opportunity: Opportunity) => void;
  onStartQuiz: () => void;
  onOpenNotifications?: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  onSelectCourse,
  onOpenPlayer,
  onSelectLiveClass,
  onSelectOpportunity,
  onStartQuiz,
  onOpenNotifications,
}) => {
  const { currentUser, setActiveTab, unreadNotificationCount } = useAuth();

  // Time-of-day dynamic greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const firstName = currentUser?.fullName?.split(' ')[0] || 'Radiographer';

  // Live class & In-progress items
  const upcomingClass = MOCK_LIVE_CLASSES[0];
  const continueCourse = MOCK_COURSES[0];
  const recommendedItems = [
    MOCK_COURSES[1], // Emergency CT Neuroimaging
    MOCK_COURSES[2], // MRI Physics & Pulse Sequences
  ];

  // Opportunities snippets
  const featuredJobs = MOCK_OPPORTUNITIES.filter(
    (o) => o.type === 'NHS Locum' || o.type === 'Permanent'
  ).slice(0, 2);

  const featuredInternship = MOCK_OPPORTUNITIES.find((o) => o.type === 'Internship');
  const featuredScholarship = MOCK_OPPORTUNITIES.find((o) => o.type === 'Scholarship');

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F17] text-slate-800 dark:text-slate-100 flex flex-col pb-28 select-none">
      <div className="w-full max-w-md sm:max-w-xl mx-auto px-4 sm:px-6 pt-4 space-y-5">
        
        {/* ================= 1. HEADER ================= */}
        <header className="flex items-center justify-between pt-1">
          {/* StudiRad Wordmark at top left */}
          <Wordmark size="sm" withIcon={true} />

          {/* Theme Toggle & Notification bell at top right */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => onOpenNotifications && onOpenNotifications()}
              aria-label="Notifications"
              className="w-10 h-10 rounded-full bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 relative shadow-xs hover:border-[#002147] transition-colors"
            >
              <Bell className="w-5 h-5 stroke-[1.8]" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#FF7F32] ring-2 ring-white dark:ring-[#121824]"></span>
              )}
            </button>
          </div>
        </header>

        {/* Personalized Greeting & Motivational Subtitle */}
        <section className="text-left space-y-1 pt-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight">
            {getGreeting()}, {firstName} 👋
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Keep growing. Your future in radiography is within reach.
          </p>
        </section>

        {/* ================= 2. NEXT LIVE CLASS CARD ================= */}
        {upcomingClass ? (
          <section
            onClick={() => onSelectLiveClass(upcomingClass)}
            className="w-full bg-[#002147] text-white rounded-2xl p-5 shadow-lg relative overflow-hidden text-left cursor-pointer transition-transform active:scale-[0.99] group"
          >
            {/* Subtle radial ambient glow */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#FF7F32]/20 rounded-full blur-2xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col gap-3">
              {/* Header row with Section Title & Chevron */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF7F32] animate-pulse"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                    Next Live Class
                  </span>
                </div>
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/80 group-hover:text-white transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* Class Title */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {upcomingClass.title}
                </h2>
                <p className="text-xs text-blue-100/80 mt-1 line-clamp-1">
                  Instructor: {upcomingClass.instructor} ({upcomingClass.instructorRole.split(',')[0]})
                </p>
              </div>

              {/* Date & Start/End Times and Join Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/15">
                <div className="flex items-center gap-2 text-xs font-medium text-blue-100">
                  <Clock className="w-4 h-4 text-[#FF7F32] shrink-0" />
                  <span>{upcomingClass.date} · {upcomingClass.time}</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectLiveClass(upcomingClass);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#FF7F32] hover:bg-[#E86B20] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#FF7F32]/30 transition-all self-start sm:self-auto"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Join Class</span>
                </button>
              </div>
            </div>
          </section>
        ) : (
          <section className="w-full bg-[#002147] text-white rounded-2xl p-5 shadow-md text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
              Next Live Class
            </span>
            <h3 className="text-base font-bold text-white mt-1">No upcoming live classes scheduled today</h3>
            <p className="text-xs text-blue-100/70 mt-1">Check back soon for new expert sessions and webinars.</p>
          </section>
        )}

        {/* ================= 3. CONTINUE LEARNING CARD ================= */}
        <section className="text-left space-y-2">
          <div
            onClick={() => onOpenPlayer(continueCourse)}
            className="w-full bg-white dark:bg-[#121824] rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer hover:border-[#002147] dark:hover:border-[#38BDF8] transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Continue Learning
              </span>
              <span className="text-xs font-bold text-[#002147] dark:text-[#38BDF8] font-mono">
                {continueCourse.progressPercent}%
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-[#002147] dark:group-hover:text-[#38BDF8] transition-colors">
                {continueCourse.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                Last accessed: Module 2 · Lesson 4 (Window Width & Leveling)
              </p>
            </div>

            {/* Horizontal Progress Bar */}
            <div className="mt-3.5 w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#002147] to-[#FF7F32] rounded-full transition-all duration-300"
                style={{ width: `${continueCourse.progressPercent}%` }}
              ></div>
            </div>

            {/* Action Row */}
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 dark:text-slate-500 font-medium">
                Tap to resume from last saved position
              </span>
              <span className="font-bold text-[#002147] dark:text-[#38BDF8] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Resume</span>
              </span>
            </div>
          </div>
        </section>

        {/* ================= 4. QUICK ACCESS SHORTCUTS ================= */}
        <section className="pt-1">
          <div className="grid grid-cols-4 gap-2.5 text-center">
            {/* 1. Live Classes */}
            <button
              onClick={() => setActiveTab('learn')}
              className="flex flex-col items-center gap-2 p-2.5 rounded-2xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-xs hover:border-[#002147] active:scale-95 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#002147] dark:text-[#38BDF8] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Video className="w-5 h-5 stroke-[1.8]" />
              </div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-tight">
                Live Classes
              </span>
            </button>

            {/* 2. Resources */}
            <button
              onClick={() => setActiveTab('learn')}
              className="flex flex-col items-center gap-2 p-2.5 rounded-2xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-xs hover:border-[#002147] active:scale-95 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-[#FF7F32] flex items-center justify-center group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5 stroke-[1.8]" />
              </div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-tight">
                Resources
              </span>
            </button>

            {/* 3. AI Assistant */}
            <button
              onClick={() => setActiveTab('aiTutor')}
              className="flex flex-col items-center gap-2 p-2.5 rounded-2xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-xs hover:border-[#002147] active:scale-95 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Bot className="w-5 h-5 stroke-[1.8]" />
              </div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-tight">
                AI Assistant
              </span>
            </button>

            {/* 4. Quizzes */}
            <button
              onClick={onStartQuiz}
              className="flex flex-col items-center gap-2 p-2.5 rounded-2xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-xs hover:border-[#002147] active:scale-95 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <HelpCircle className="w-5 h-5 stroke-[1.8]" />
              </div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-tight">
                Quizzes
              </span>
            </button>
          </div>
        </section>

        {/* ================= 5. RECOMMENDED FOR YOU ================= */}
        <section className="text-left space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Recommended for You
            </h2>
            <button
              onClick={() => setActiveTab('learn')}
              className="text-xs font-bold text-[#002147] dark:text-[#38BDF8] hover:text-[#FF7F32] transition-colors"
            >
              View all
            </button>
          </div>

          <div className="space-y-3">
            {recommendedItems.map((course) => (
              <div
                key={course.id}
                onClick={() => onSelectCourse(course)}
                className="w-full bg-white dark:bg-[#121824] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3.5 hover:border-[#002147] dark:hover:border-[#38BDF8] transition-all cursor-pointer group"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-xl bg-slate-900 relative overflow-hidden shrink-0">
                  <img
                    src={course.image}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/25"></div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF7F32] block truncate">
                    {course.category.replace('_', ' ')}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-[#002147] dark:group-hover:text-[#38BDF8] transition-colors">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                    <span>·</span>
                    <span>{course.cpdCredits}</span>
                  </div>
                </div>

                {/* Chevron */}
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#002147] dark:group-hover:text-white transition-colors shrink-0" />
              </div>
            ))}
          </div>
        </section>

        {/* ================= 6. AVAILABLE JOBS & NHS LOCUM SNIPPETS ================= */}
        <section className="text-left space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-[#002147] dark:text-[#38BDF8] flex items-center justify-center">
                <Briefcase className="w-3.5 h-3.5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Available Clinical Jobs & Locums
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('explore')}
              className="text-xs font-bold text-[#002147] dark:text-[#38BDF8] hover:text-[#FF7F32] transition-colors"
            >
              View all
            </button>
          </div>

          <div className="space-y-2.5">
            {featuredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => onSelectOpportunity(job)}
                className="w-full bg-white dark:bg-[#121824] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-[#002147] dark:hover:border-[#38BDF8] transition-all cursor-pointer group text-left"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#002147] dark:text-[#38BDF8] text-[10px] font-bold">
                      {job.type}
                    </span>
                    {job.urgent && (
                      <span className="px-1.5 py-0.5 rounded-md bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 text-[10px] font-bold animate-pulse">
                        Urgent Locum
                      </span>
                    )}
                    <span className="text-[10px] font-semibold text-slate-400">
                      {job.deadline}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#002147] dark:group-hover:text-white shrink-0 mt-0.5 transition-colors" />
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-[#002147] dark:group-hover:text-[#38BDF8] transition-colors">
                  {job.title}
                </h3>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {job.organisation} · {job.location}
                </p>

                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {job.rate}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400">
                    {job.experienceLevel.split('(')[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 7. INTERNSHIPS & CLINICAL FELLOWSHIPS SNIPPET ================= */}
        {featuredInternship && (
          <section className="text-left space-y-2.5 pt-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <GraduationCap className="w-3.5 h-3.5" />
                </div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Clinical Internships & Fellowships
                </h2>
              </div>
              <button
                onClick={() => setActiveTab('explore')}
                className="text-xs font-bold text-[#002147] dark:text-[#38BDF8] hover:text-[#FF7F32] transition-colors"
              >
                Explore
              </button>
            </div>

            <div
              onClick={() => onSelectOpportunity(featuredInternship)}
              className="w-full bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 dark:from-emerald-950/30 dark:to-blue-950/20 bg-white dark:bg-[#121824] rounded-2xl p-4 border border-emerald-200/80 dark:border-emerald-800/60 shadow-xs hover:border-emerald-500 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                  Fully Funded Fellowship
                </span>
                <span className="text-[10px] text-slate-400">{featuredInternship.deadline}</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {featuredInternship.title}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                {featuredInternship.organisation}
              </p>
              <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-[11px]">
                  {featuredInternship.rate}
                </span>
                <span className="text-xs font-bold text-[#002147] dark:text-[#38BDF8] flex items-center gap-0.5">
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </section>
        )}

        {/* ================= 8. SCHOLARSHIPS & TRAVEL GRANTS SNIPPET ================= */}
        {featuredScholarship && (
          <section className="text-left space-y-2.5 pt-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-[#FF7F32] flex items-center justify-center">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Scholarships & Travel Grants
                </h2>
              </div>
              <button
                onClick={() => setActiveTab('explore')}
                className="text-xs font-bold text-[#002147] dark:text-[#38BDF8] hover:text-[#FF7F32] transition-colors"
              >
                All Grants
              </button>
            </div>

            <div
              onClick={() => onSelectOpportunity(featuredScholarship)}
              className="w-full bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/10 dark:from-amber-950/30 dark:to-orange-950/20 bg-white dark:bg-[#121824] rounded-2xl p-4 border border-amber-200/80 dark:border-amber-800/60 shadow-xs hover:border-[#FF7F32] transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-bold">
                  International Travel Grant
                </span>
                <span className="text-[10px] text-slate-400">{featuredScholarship.deadline}</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-[#FF7F32] transition-colors">
                {featuredScholarship.title}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                {featuredScholarship.organisation}
              </p>
              <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-bold text-amber-600 dark:text-amber-400 text-[11px]">
                  {featuredScholarship.rate}
                </span>
                <span className="text-xs font-bold text-[#002147] dark:text-[#38BDF8] flex items-center gap-0.5">
                  <span>Apply Now</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
