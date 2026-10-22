import React, { useState, useMemo } from 'react';
import { Opportunity, ClinicalModality } from '../../types';
import { MOCK_OPPORTUNITIES } from '../../data/mockData';
import { 
  Compass, 
  Search, 
  Building2, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Filter, 
  Briefcase, 
  Bookmark,
  Users,
  ShieldCheck,
  Award,
  GraduationCap,
  Sparkles,
  DollarSign,
  TrendingUp,
  FileCheck2,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';

interface ExploreTabProps {
  onSelectOpportunity: (opportunity: Opportunity) => void;
}

type OpportunityTypeFilter = 'all' | 'NHS Locum' | 'Permanent' | 'Internship' | 'Scholarship';

const MODALITY_FILTERS: { id: ClinicalModality | 'all'; label: string }[] = [
  { id: 'all', label: 'All Modalities' },
  { id: 'xray', label: 'X-ray' },
  { id: 'ct', label: 'CT' },
  { id: 'mri', label: 'MRI' },
  { id: 'ultrasound', label: 'Ultrasound' },
  { id: 'anatomy', label: 'Anatomy' },
  { id: 'hospital_practice', label: 'Hospital practice' },
  { id: 'rad_physics', label: 'Rad physics' },
];

export const ExploreTab: React.FC<ExploreTabProps> = ({
  onSelectOpportunity,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<OpportunityTypeFilter>('all');
  const [modalityFilter, setModalityFilter] = useState<ClinicalModality | 'all'>('all');
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [savedOppIds, setSavedOppIds] = useState<number[]>([101]);
  const [showPayGuideModal, setShowPayGuideModal] = useState(false);

  const toggleSave = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedOppIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredOpportunities = useMemo(() => {
    return MOCK_OPPORTUNITIES.filter((opp) => {
      const matchesType = typeFilter === 'all' || opp.type === typeFilter;
      const matchesModality = modalityFilter === 'all' || opp.modality === modalityFilter;
      const matchesUrgent = !urgentOnly || opp.urgent;
      const cleanSearch = searchQuery.trim().toLowerCase();
      const matchesSearch = !cleanSearch ||
        opp.title.toLowerCase().includes(cleanSearch) ||
        opp.organisation.toLowerCase().includes(cleanSearch) ||
        opp.location.toLowerCase().includes(cleanSearch) ||
        opp.specialty.toLowerCase().includes(cleanSearch) ||
        opp.description.toLowerCase().includes(cleanSearch);

      return matchesType && matchesModality && matchesUrgent && matchesSearch;
    });
  }, [typeFilter, modalityFilter, urgentOnly, searchQuery]);

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F17] text-slate-800 dark:text-slate-100 flex flex-col pb-28 select-none text-left">
      <div className="w-full max-w-md sm:max-w-xl mx-auto px-4 sm:px-6 pt-4 space-y-4">
        
        {/* Header */}
        <header className="flex items-center justify-between pt-1">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight">
              Opportunities
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              NHS locums, permanent roles, fellowships & travel grants
            </p>
          </div>
          <ThemeToggle />
        </header>

        {/* Live NHS Trust Bank Banner */}
        <div className="w-full bg-[#002147] text-white rounded-2xl p-4 shadow-md relative overflow-hidden flex items-center justify-between gap-3">
          <div className="space-y-1 relative z-10">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF7F32] animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                Direct NHS Trust Fast-Track
              </span>
            </div>
            <h3 className="text-sm font-bold text-white leading-snug">
              Priority recruitment for verified StudiRad radiographers
            </h3>
            <p className="text-[11px] text-blue-100/80">
              Skip agency fees. Direct compliance clearance with UK health boards.
            </p>
          </div>

          <button
            onClick={() => setShowPayGuideModal(true)}
            className="px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold shrink-0 transition-colors"
          >
            Pay Guide
          </button>
        </div>

        {/* Search Input Box */}
        <div className="w-full bg-white dark:bg-[#121824] px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-2.5 focus-within:border-[#002147] dark:focus-within:border-[#38BDF8] transition-colors">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by NHS Trust, hospital, modality, or city..."
            className="w-full text-xs sm:text-sm text-slate-800 dark:text-white placeholder:text-slate-400 bg-transparent focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Filter Pills (Type) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {[
            { id: 'all', label: 'All Opportunities' },
            { id: 'NHS Locum', label: '⚡ Locum Shifts' },
            { id: 'Permanent', label: 'Permanent Roles' },
            { id: 'Internship', label: 'Fellowships' },
            { id: 'Scholarship', label: 'Scholarships & Grants' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTypeFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-xs ${
                typeFilter === tab.id
                  ? 'bg-[#002147] text-white shadow-sm'
                  : 'bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modality Filter Chips */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Filter by Modality
            </span>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={urgentOnly}
                  onChange={(e) => setUrgentOnly(e.target.checked)}
                  className="rounded border-slate-300 text-[#FF7F32] focus:ring-[#FF7F32] w-3.5 h-3.5"
                />
                <span className="text-red-600 dark:text-red-400 font-bold">Urgent Cover Only</span>
              </label>
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {MODALITY_FILTERS.map((mod) => (
              <button
                key={mod.id}
                onClick={() => setModalityFilter(mod.id)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  modalityFilter === mod.id
                    ? 'bg-[#FF7F32] text-white shadow-xs'
                    : 'bg-white/80 dark:bg-[#121824]/80 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-400'
                }`}
              >
                {mod.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count & Priority Badge */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
          <span className="font-semibold">{filteredOpportunities.length} Verified Vacancies Available</span>
          <span className="text-[#002147] dark:text-[#38BDF8] font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF7F32]" />
            HCPC Compliant Direct Apply
          </span>
        </div>

        {/* Opportunities List */}
        <div className="space-y-3">
          {filteredOpportunities.length === 0 ? (
            <div className="py-12 text-center bg-white dark:bg-[#121824] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                No vacancies match current criteria
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                Try toggling off 'Urgent Cover' or selecting 'All Modalities' to see more opportunities.
              </p>
              <button
                onClick={() => {
                  setTypeFilter('all');
                  setModalityFilter('all');
                  setUrgentOnly(false);
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-[#002147] text-white text-xs font-bold"
              >
                Reset Opportunity Filters
              </button>
            </div>
          ) : (
            filteredOpportunities.map((opp) => {
              const isSaved = savedOppIds.includes(opp.id);

              return (
                <div
                  key={opp.id}
                  onClick={() => onSelectOpportunity(opp)}
                  className="p-4 rounded-2xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5 hover:border-[#002147] dark:hover:border-[#38BDF8] transition-all cursor-pointer group"
                >
                  {/* Top tags row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#002147] dark:text-[#38BDF8] text-[10px] font-bold">
                        {opp.type}
                      </span>
                      {opp.urgent && (
                        <span className="px-1.5 py-0.5 rounded-md bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 text-[10px] font-bold animate-pulse">
                          Urgent Cover
                        </span>
                      )}
                      {opp.modality && (
                        <span className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-semibold uppercase">
                          {opp.modality}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => toggleSave(opp.id, e)}
                      aria-label={isSaved ? 'Unbookmark vacancy' : 'Bookmark vacancy'}
                      className="p-1 text-slate-400 hover:text-[#FF7F32] transition-colors"
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#FF7F32] text-[#FF7F32]' : ''}`} />
                    </button>
                  </div>

                  {/* Title & Organisation */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-[#002147] dark:group-hover:text-[#38BDF8] transition-colors">
                      {opp.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{opp.organisation}</span>
                    </div>
                  </div>

                  {/* Location & Rates */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-[11px]">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{opp.location}</span>
                    </div>
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-xs">
                      {opp.rate}
                    </span>
                  </div>

                  {/* Description snippet */}
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {opp.description}
                  </p>

                  {/* Bottom Action Footer */}
                  <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#FF7F32]" />
                      <span>{opp.deadline}</span>
                    </span>

                    <span className="font-bold text-[#002147] dark:text-[#38BDF8] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>View & Fast-Apply</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* Pay Band & Locum Rate Guide Modal */}
      {showPayGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#121824] rounded-2xl max-w-sm w-full p-6 space-y-4 text-left border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  NHS Radiography Pay Guide
                </h3>
              </div>
              <button
                onClick={() => setShowPayGuideModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Standard Agenda for Change (AfC) pay scales and typical NHS agency locum hourly rates (UK 2026):
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                  <span>Band 5 (Newly Qualified)</span>
                  <span className="text-emerald-600">£29,970 - £36,483</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">Locum rate: £26 - £32 / hr</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                  <span>Band 6 (Specialist / Rotational)</span>
                  <span className="text-emerald-600">£37,338 - £44,962</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">Locum rate: £38 - £45 / hr</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                  <span>Band 7 (Advanced / Team Lead)</span>
                  <span className="text-emerald-600">£46,148 - £52,809</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">Locum rate: £48 - £58 / hr</p>
              </div>
            </div>

            <button
              onClick={() => setShowPayGuideModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#002147] text-white text-xs font-bold"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
