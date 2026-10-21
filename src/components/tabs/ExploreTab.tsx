import React, { useState } from 'react';
import { Opportunity } from '../../types';
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
  ShieldCheck
} from 'lucide-react';

interface ExploreTabProps {
  onSelectOpportunity: (opportunity: Opportunity) => void;
}

export const ExploreTab: React.FC<ExploreTabProps> = ({
  onSelectOpportunity,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'NHS Locum' | 'Permanent' | 'Internship' | 'Scholarship'>('all');

  const filteredOpportunities = MOCK_OPPORTUNITIES.filter((opp) => {
    const matchesType = typeFilter === 'all' || opp.type === typeFilter;
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organisation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="flex-1 w-full bg-[#F5F7FA] flex flex-col p-4 space-y-4 overflow-y-auto no-scrollbar text-left text-slate-900">
      {/* Search Input Box */}
      <div className="w-full bg-white px-3 py-2.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-2">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by hospital, specialty, or NHS Trust..."
          className="w-full text-xs text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none"
        />
      </div>

      {/* Type Filter Pills (Coursera style horizontal scroll) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {[
          { id: 'all', label: 'All Opportunities' },
          { id: 'NHS Locum', label: '⚡ Locum Shifts' },
          { id: 'Permanent', label: 'Permanent Jobs' },
          { id: 'Internship', label: 'Fellowships' },
          { id: 'Scholarship', label: 'Scholarships' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setTypeFilter(tab.id as any)}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              typeFilter === tab.id
                ? 'bg-[#002147] text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Opportunities List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{filteredOpportunities.length} Verified Vacancies</span>
          <span className="text-[#002147] font-semibold">Priority Application</span>
        </div>

        {filteredOpportunities.map((opp) => (
          <div
            key={opp.id}
            onClick={() => onSelectOpportunity(opp)}
            className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5 hover:border-[#002147] transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#002147] text-[10px] font-bold">
                    {opp.type}
                  </span>
                  {opp.urgent && (
                    <span className="px-1.5 py-0.5 rounded-md bg-red-100 text-red-700 text-[10px] font-bold">
                      Urgent Locum
                    </span>
                  )}
                </div>

                <h3 className="text-xs font-bold text-slate-900 leading-snug group-hover:text-[#002147] transition-colors">
                  {opp.title}
                </h3>

                <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{opp.organisation}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{opp.location}</span>
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <Clock className="w-3 h-3" />
                <span>{opp.deadline}</span>
              </span>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-[#FF7F32] font-mono">
                {opp.rate}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectOpportunity(opp);
                }}
                className="text-xs font-bold text-[#002147] hover:text-[#FF7F32] flex items-center gap-1 transition-colors"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Locum Availability Directory Callout */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-700 space-y-1.5">
        <div className="flex items-center gap-1.5 font-bold text-[#002147]">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Verified Radiographer Locum Network</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          StudiRad connects accredited NHS Band 6/7/8 radiographers with hospital imaging trusts for urgent shift cover and locum contracts.
        </p>
      </div>
    </div>
  );
};
