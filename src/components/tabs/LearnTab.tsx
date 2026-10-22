import React, { useState, useMemo } from 'react';
import { Course, LiveClass, ClinicalResource, Webinar, BlogPost, ClinicalModality } from '../../types';
import { 
  MOCK_COURSES, 
  MOCK_LIVE_CLASSES, 
  MOCK_RESOURCES, 
  MOCK_WEBINARS, 
  MOCK_BLOGS 
} from '../../data/mockData';
import { 
  Search, 
  Bookmark, 
  ChevronRight, 
  Video, 
  BookOpen, 
  Sparkles, 
  FileText, 
  Newspaper, 
  Play, 
  Star, 
  Clock, 
  Download, 
  CheckCircle2, 
  ArrowLeft,
  Calendar,
  Building2,
  X,
  Filter,
  Layers,
  GraduationCap
} from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';

interface LearnTabProps {
  onSelectCourse: (course: Course) => void;
  onOpenPlayer: (course: Course) => void;
  onSelectLiveClass: (liveClass: LiveClass) => void;
  onStartQuiz: () => void;
}

type ContentCategoryType = 'all' | 'courses' | 'classes' | 'webinars' | 'materials' | 'blogs';

const MODALITIES: { id: ClinicalModality; label: string }[] = [
  { id: 'all', label: 'All Modalities' },
  { id: 'xray', label: 'X-ray' },
  { id: 'mri', label: 'MRI' },
  { id: 'ultrasound', label: 'Ultrasound' },
  { id: 'ct', label: 'CT' },
  { id: 'anatomy', label: 'Anatomy' },
  { id: 'hospital_practice', label: 'Hospital practice' },
  { id: 'rad_physics', label: 'Rad physics' },
];

export const LearnTab: React.FC<LearnTabProps> = ({
  onSelectCourse,
  onOpenPlayer,
  onSelectLiveClass,
  onStartQuiz,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModality, setSelectedModality] = useState<ClinicalModality>('all');
  const [activeCategory, setActiveCategory] = useState<ContentCategoryType>('all');
  const [downloadedResources, setDownloadedResources] = useState<string[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  const handleDownload = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDownloadedResources((prev) => [...prev, id]);
  };

  const filterQuery = searchQuery.trim().toLowerCase();

  // Modality + Search filtered courses
  const filteredCourses = useMemo(() => {
    return MOCK_COURSES.filter((c) => {
      const matchModality = selectedModality === 'all' || c.modality === selectedModality;
      const matchQuery = !filterQuery || 
        c.title.toLowerCase().includes(filterQuery) || 
        c.institution.toLowerCase().includes(filterQuery) ||
        c.overview.toLowerCase().includes(filterQuery);
      return matchModality && matchQuery;
    });
  }, [selectedModality, filterQuery]);

  // Modality + Search filtered live classes
  const filteredClasses = useMemo(() => {
    return MOCK_LIVE_CLASSES.filter((c) => {
      const matchModality = selectedModality === 'all' || c.modality === selectedModality;
      const matchQuery = !filterQuery || 
        c.title.toLowerCase().includes(filterQuery) || 
        c.instructor.toLowerCase().includes(filterQuery) ||
        c.description.toLowerCase().includes(filterQuery);
      return matchModality && matchQuery;
    });
  }, [selectedModality, filterQuery]);

  // Modality + Search filtered webinars
  const filteredWebinars = useMemo(() => {
    return MOCK_WEBINARS.filter((w) => {
      const matchModality = selectedModality === 'all' || w.modality === selectedModality;
      const matchQuery = !filterQuery || 
        w.title.toLowerCase().includes(filterQuery) || 
        w.speaker.toLowerCase().includes(filterQuery) ||
        w.description.toLowerCase().includes(filterQuery);
      return matchModality && matchQuery;
    });
  }, [selectedModality, filterQuery]);

  // Modality + Search filtered clinical materials
  const filteredMaterials = useMemo(() => {
    return MOCK_RESOURCES.filter((r) => {
      const matchModality = selectedModality === 'all' || r.modality === selectedModality;
      const matchQuery = !filterQuery || 
        r.title.toLowerCase().includes(filterQuery) || 
        r.category.toLowerCase().includes(filterQuery) ||
        r.description.toLowerCase().includes(filterQuery);
      return matchModality && matchQuery;
    });
  }, [selectedModality, filterQuery]);

  const filteredBlogs = useMemo(() => {
    return MOCK_BLOGS.filter(
      (b) => !filterQuery || b.title.toLowerCase().includes(filterQuery) || b.summary.toLowerCase().includes(filterQuery)
    );
  }, [filterQuery]);

  // Modality grouping for materials
  const modalityGroups: { key: ClinicalModality | 'others'; title: string }[] = [
    { key: 'xray', title: 'X-Ray & Plain Film Protocols' },
    { key: 'ct', title: 'Computed Tomography (CT) Guidelines' },
    { key: 'mri', title: 'MRI Safety & Sequence Manuals' },
    { key: 'ultrasound', title: 'Ultrasound & POCUS References' },
    { key: 'anatomy', title: 'Sectional Radiographic Anatomy' },
    { key: 'hospital_practice', title: 'Hospital Practice & Patient Governance' },
    { key: 'rad_physics', title: 'Radiation Physics & IR(ME)R Compliance' },
    { key: 'others', title: 'Clinical Audits & Research References' },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F17] text-slate-800 dark:text-slate-100 flex flex-col pb-28 select-none">
      <div className="w-full max-w-md sm:max-w-xl mx-auto px-4 sm:px-6 pt-4 space-y-4">
        
        {/* ================= 1. HEADER ================= */}
        <header className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            {activeCategory !== 'all' && (
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSelectedBlog(null);
                }}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#121824] flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-[#002147] dark:hover:text-white mr-1"
                aria-label="Back to overview"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                Learn
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Radiography curriculum, masterclasses & clinical materials
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsSavedDrawerOpen(true)}
              aria-label="Saved learning content"
              className="w-10 h-10 rounded-full bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 relative shadow-xs hover:border-[#002147] transition-colors"
            >
              <Bookmark className="w-5 h-5 stroke-[1.8]" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#FF7F32]"></span>
            </button>
          </div>
        </header>

        {/* Rounded Search Field */}
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search classes, webinars, materials..."
            className="w-full pl-10 pr-9 h-11 rounded-full bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002147] dark:focus:ring-[#38BDF8] shadow-xs transition-all font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold"
            >
              Clear
            </button>
          )}
        </div>

        {/* ================= 2. MODALITY SORTING BAR (X-ray, MRI, Ultrasound, CT, Anatomy, Hospital practice, Rad physics) ================= */}
        <div className="space-y-1 text-left">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <Layers className="w-3 h-3 text-[#FF7F32]" />
              Clinical Modalities
            </span>
            {selectedModality !== 'all' && (
              <button
                onClick={() => setSelectedModality('all')}
                className="text-[11px] font-bold text-[#002147] dark:text-[#38BDF8] hover:underline"
              >
                Clear Modality
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {MODALITIES.map((mod) => {
              const isSelected = selectedModality === mod.id;

              return (
                <button
                  key={mod.id}
                  onClick={() => setSelectedModality(mod.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-xs ${
                    isSelected
                      ? 'bg-[#002147] text-white shadow-sm ring-2 ring-[#002147]/20 dark:ring-blue-400/30'
                      : 'bg-white dark:bg-[#121824] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-400'
                  }`}
                >
                  {mod.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filters (All, Courses, Live Classes, Webinars, Materials) */}
        <section className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {[
            { id: 'all', label: 'All Content' },
            { id: 'courses', label: `Courses (${filteredCourses.length})` },
            { id: 'classes', label: `Live Classes (${filteredClasses.length})` },
            { id: 'webinars', label: `Webinars (${filteredWebinars.length})` },
            { id: 'materials', label: `Materials (${filteredMaterials.length})` },
            { id: 'blogs', label: 'Clinical Insights' },
          ].map((chip) => {
            const isSelected = activeCategory === chip.id;

            return (
              <button
                key={chip.id}
                onClick={() => {
                  setActiveCategory(chip.id as ContentCategoryType);
                  setSelectedBlog(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-xs min-h-[34px] flex items-center justify-center ${
                  isSelected
                    ? 'bg-[#FF7F32] text-white shadow-xs'
                    : 'bg-white/80 dark:bg-[#121824]/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </section>

        {/* ================= 3. OVERVIEW CARDS (When activeCategory === 'all') ================= */}
        {activeCategory === 'all' && (
          <div className="space-y-6 pt-1 text-left">
            
            {/* A. Live Classes Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-[#FF7F32] flex items-center justify-center">
                    <Video className="w-3.5 h-3.5" />
                  </div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Live Masterclasses {selectedModality !== 'all' && `· ${selectedModality.toUpperCase()}`}
                  </h2>
                </div>
                <button
                  onClick={() => setActiveCategory('classes')}
                  className="text-xs font-bold text-[#002147] dark:text-[#38BDF8] hover:text-[#FF7F32] transition-colors"
                >
                  View all ({filteredClasses.length})
                </button>
              </div>

              <div className="space-y-2.5">
                {filteredClasses.slice(0, 2).map((cls) => (
                  <div
                    key={cls.id}
                    onClick={() => onSelectLiveClass(cls)}
                    className="p-4 rounded-2xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 cursor-pointer hover:border-[#002147] dark:hover:border-[#38BDF8] transition-all group"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#FF7F32] flex items-center gap-1">
                        <Video className="w-3.5 h-3.5" />
                        <span>{cls.modality ? cls.modality.toUpperCase() : 'LIVE'}</span>
                      </span>
                      <span className="text-slate-400 font-mono text-[11px]">{cls.date} · {cls.time.split('(')[0]}</span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-[#002147] dark:group-hover:text-[#38BDF8] transition-colors">
                      {cls.title}
                    </h3>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      Instructor: {cls.instructor} ({cls.instructorRole.split(',')[0]})
                    </p>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{cls.cpdCredits}</span>
                      <span className="font-bold text-[#002147] dark:text-[#38BDF8] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>{cls.isRegistered ? 'Join Class' : 'Register Now'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* B. Courses Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-[#002147] dark:text-[#38BDF8] flex items-center justify-center">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Structured Clinical Courses
                  </h2>
                </div>
                <button
                  onClick={() => setActiveCategory('courses')}
                  className="text-xs font-bold text-[#002147] dark:text-[#38BDF8] hover:text-[#FF7F32] transition-colors"
                >
                  View all ({filteredCourses.length})
                </button>
              </div>

              <div className="space-y-2.5">
                {filteredCourses.slice(0, 3).map((c) => (
                  <div
                    key={c.id}
                    onClick={() => onSelectCourse(c)}
                    className="p-3.5 rounded-2xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-xs flex gap-3.5 items-center hover:border-[#002147] dark:hover:border-[#38BDF8] transition-all cursor-pointer group"
                  >
                    <div className="w-16 h-16 rounded-xl bg-slate-900 overflow-hidden shrink-0 relative">
                      <img
                        src={c.image}
                        alt={c.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase text-[#FF7F32]">
                          {c.modality?.toUpperCase() || c.category}
                        </span>
                        <span className="text-[10px] text-slate-400">· {c.cpdCredits}</span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-1 group-hover:text-[#002147] dark:group-hover:text-[#38BDF8] transition-colors">
                        {c.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {c.instructor} · {c.duration.split('·')[0]}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#002147] dark:group-hover:text-white shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* C. Learning Materials Arranged by Modality */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Clinical Protocols & Guides by Modality
                  </h2>
                </div>
                <button
                  onClick={() => setActiveCategory('materials')}
                  className="text-xs font-bold text-[#002147] dark:text-[#38BDF8] hover:text-[#FF7F32] transition-colors"
                >
                  All Materials ({filteredMaterials.length})
                </button>
              </div>

              <div className="space-y-2">
                {filteredMaterials.slice(0, 4).map((res) => {
                  const isDownloaded = downloadedResources.includes(res.id);

                  return (
                    <div
                      key={res.id}
                      className="p-3.5 rounded-2xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#002147] dark:text-[#38BDF8] text-[10px] uppercase">
                            {res.modality ? res.modality.toUpperCase() : res.category}
                          </span>
                          <span className="text-[10px] text-slate-400">· {res.format} ({res.size})</span>
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1 mt-0.5">
                          {res.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {res.description}
                        </p>
                      </div>

                      <button
                        onClick={(e) => handleDownload(res.id, e)}
                        className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shrink-0 transition-all ${
                          isDownloaded
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                            : 'bg-[#002147] text-white hover:bg-[#002d62]'
                        }`}
                      >
                        {isDownloaded ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Saved</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            <span>Download</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* ================= 4. SPECIFIC CATEGORY VIEWS ================= */}
        {activeCategory !== 'all' && (
          <div className="space-y-3 text-left">
            
            {/* Live Classes Category View */}
            {activeCategory === 'classes' && (
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {filteredClasses.length} Live Classes Available
                </span>

                {filteredClasses.map((cls) => (
                  <div
                    key={cls.id}
                    onClick={() => onSelectLiveClass(cls)}
                    className="p-4 rounded-2xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5 cursor-pointer hover:border-[#002147] transition-all group"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#FF7F32] flex items-center gap-1">
                        <Video className="w-3.5 h-3.5" />
                        <span>{cls.modality?.toUpperCase() || 'LIVE'}</span>
                      </span>
                      <span className="text-slate-400 font-mono">{cls.date} · {cls.time}</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-[#002147] dark:group-hover:text-[#38BDF8] transition-colors">
                      {cls.title}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {cls.description}
                    </p>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{cls.cpdCredits}</span>
                      <span className="font-bold text-[#002147] dark:text-[#38BDF8] flex items-center gap-1">
                        <span>{cls.isRegistered ? 'View Details' : 'Join / Register'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Courses Category View */}
            {activeCategory === 'courses' && (
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {filteredCourses.length} Accredited Radiography Courses
                </span>

                {filteredCourses.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => onSelectCourse(c)}
                    className="p-4 rounded-2xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-xs flex gap-3.5 items-start hover:border-[#002147] transition-all cursor-pointer group"
                  >
                    <div className="w-24 h-20 rounded-xl bg-slate-900 overflow-hidden shrink-0 relative">
                      <img
                        src={c.image}
                        alt={c.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase text-[#FF7F32]">
                          {c.modality?.toUpperCase() || c.category}
                        </span>
                        <span className="text-[10px] text-slate-400">· {c.institution}</span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-[#002147] dark:group-hover:text-[#38BDF8] transition-colors">
                        {c.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span className="text-amber-500 font-bold">★ {c.rating}</span>
                        <span>·</span>
                        <span>{c.cpdCredits}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Webinars Category View */}
            {activeCategory === 'webinars' && (
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {filteredWebinars.length} Recorded Masterclasses
                </span>

                {filteredWebinars.map((webinar) => (
                  <div
                    key={webinar.id}
                    className="p-4 rounded-2xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 cursor-pointer hover:border-[#002147] transition-all group"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#FF7F32]">{webinar.cpdCredits}</span>
                      <span className="text-slate-400 font-mono">{webinar.duration} · {webinar.views}</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-[#002147] dark:group-hover:text-[#38BDF8] transition-colors">
                      {webinar.title}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {webinar.description}
                    </p>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">{webinar.speaker}</span>
                      <span className="font-bold text-[#002147] dark:text-[#38BDF8] flex items-center gap-1">
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Watch Webinar</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Learning Materials Arranged by Modality */}
            {activeCategory === 'materials' && (
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                  Arranged According to Modality ({filteredMaterials.length} Items)
                </span>

                {modalityGroups.map((group) => {
                  const groupItems = filteredMaterials.filter((m) => {
                    if (group.key === 'others') {
                      return !m.modality || (m.modality !== 'xray' && m.modality !== 'ct' && m.modality !== 'mri' && m.modality !== 'ultrasound' && m.modality !== 'anatomy' && m.modality !== 'hospital_practice' && m.modality !== 'rad_physics');
                    }
                    return m.modality === group.key;
                  });

                  if (groupItems.length === 0) return null;

                  return (
                    <div key={group.key} className="space-y-2 bg-slate-50 dark:bg-[#121824]/50 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-[#002147] dark:text-[#38BDF8] flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-[#FF7F32]" />
                          <span>{group.title}</span>
                        </h4>
                        <span className="text-[10px] text-slate-400 font-bold">
                          {groupItems.length} {groupItems.length === 1 ? 'file' : 'files'}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {groupItems.map((res) => {
                          const isDownloaded = downloadedResources.includes(res.id);

                          return (
                            <div
                              key={res.id}
                              className="p-3 rounded-xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-2xs flex items-center justify-between gap-2.5 text-xs"
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[9px] font-bold text-emerald-600 uppercase">
                                    {res.format}
                                  </span>
                                  <span className="text-[9px] text-slate-400">· {res.size}</span>
                                </div>
                                <h5 className="font-bold text-slate-900 dark:text-white line-clamp-1 mt-0.5">
                                  {res.title}
                                </h5>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                                  {res.description}
                                </p>
                              </div>

                              <button
                                onClick={() => handleDownload(res.id)}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 transition-all ${
                                  isDownloaded
                                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                                    : 'bg-[#002147] text-white hover:bg-[#002d62]'
                                }`}
                              >
                                {isDownloaded ? 'Downloaded' : 'Download'}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Articles & Blogs */}
            {activeCategory === 'blogs' && (
              <div className="space-y-3">
                {filteredBlogs.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBlog(b)}
                    className="p-4 rounded-2xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-xs space-y-1.5 cursor-pointer hover:border-[#002147] transition-all group"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-bold text-[#002147] dark:text-[#38BDF8]">{b.category}</span>
                      <span>{b.readTime}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#002147] dark:group-hover:text-[#38BDF8] transition-colors">
                      {b.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {b.summary}
                    </p>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>

      {/* Bookmarked / Saved Items Drawer */}
      {isSavedDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs select-none">
          <div className="absolute inset-0" onClick={() => setIsSavedDrawerOpen(false)}></div>
          <div className="relative w-full max-w-sm h-full bg-white dark:bg-[#0B0F17] shadow-2xl flex flex-col z-10 p-5 space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-[#FF7F32]" />
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Saved Learning Content
                </h3>
              </div>
              <button
                onClick={() => setIsSavedDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 overflow-y-auto flex-1 no-scrollbar">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#121824] border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-[#FF7F32] uppercase">Saved Course</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Chest Radiography Mastery: Silhouette Signs & Emergency Pathology
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Last accessed Module 2 · 65% completed
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#121824] border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-blue-600 uppercase">Saved Masterclass</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Pediatric Trauma & Non-Accidental Injury (NAI) Skeletal Surveys
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Tomorrow, Oct 22 at 18:00 BST · Dr. Marcus Thorne
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#121824] border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-emerald-600 uppercase">Downloaded Clinical PDF</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  C-Spine Open Mouth (Peg) Positioning Clinical Cheat Sheet
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Ready for offline viewing in trauma suite (1.4 MB)
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setIsSavedDrawerOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#002147] text-white text-xs font-bold"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selected Blog Article Reading Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#121824] rounded-2xl max-w-md w-full p-6 space-y-4 text-left border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-xs font-bold text-[#FF7F32]">{selectedBlog.category}</span>
              <button
                onClick={() => setSelectedBlog(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
              {selectedBlog.title}
            </h3>

            <div className="text-xs text-slate-400">
              By {selectedBlog.author} ({selectedBlog.authorRole}) · {selectedBlog.readTime}
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {selectedBlog.content}
            </p>

            <button
              onClick={() => setSelectedBlog(null)}
              className="w-full py-2.5 rounded-xl bg-[#002147] text-white text-xs font-bold"
            >
              Done Reading
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
