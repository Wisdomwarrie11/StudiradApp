import React, { useState } from 'react';
import { Opportunity } from '../../types';
import { 
  X, 
  Building2, 
  MapPin, 
  Clock, 
  Award, 
  CheckCircle2, 
  ExternalLink,
  Briefcase,
  Share2,
  Bookmark
} from 'lucide-react';

interface OpportunityDetailsModalProps {
  opportunity: Opportunity | null;
  onClose: () => void;
}

export const OpportunityDetailsModal: React.FC<OpportunityDetailsModalProps> = ({
  opportunity,
  onClose,
}) => {
  if (!opportunity) return null;

  const [isSaved, setIsSaved] = useState(false);
  const [applied, setApplied] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn text-slate-900 select-none">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div 
        className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl max-h-[88vh] flex flex-col shadow-2xl z-10 overflow-hidden text-left animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF7F32]">
            <Briefcase className="w-4 h-4" />
            <span>Opportunity Details</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isSaved ? 'text-[#FF7F32] bg-orange-50' : 'text-slate-400 hover:text-slate-700 bg-slate-100'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#FF7F32]' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-md bg-blue-100 text-[#002147] text-[10px] font-bold">
                {opportunity.type}
              </span>
              {opportunity.urgent && (
                <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-700 text-[10px] font-bold">
                  Urgent Locum
                </span>
              )}
            </div>
            <h2 className="text-base font-bold text-slate-900 leading-snug">
              {opportunity.title}
            </h2>
          </div>

          {/* Org & Location Strip */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <Building2 className="w-4 h-4 text-slate-400" />
              <span>{opportunity.organisation}</span>
            </div>
            <div className="flex items-center justify-between text-slate-500 text-[11px]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{opportunity.location}</span>
              </span>
              <span className="flex items-center gap-1 text-red-600 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>{opportunity.deadline}</span>
              </span>
            </div>
          </div>

          {/* Rate / Remuneration Card */}
          <div className="p-3 rounded-xl bg-orange-50/60 border border-orange-200/60 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-700">Remuneration / Band:</span>
            <span className="text-sm font-bold text-[#FF7F32] font-mono">{opportunity.rate}</span>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-900">Clinical Overview</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {opportunity.description}
            </p>
          </div>

          {/* Requirements */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-900">Requirements & Accreditations</h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {opportunity.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How to Apply */}
          <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-[#002147] space-y-1">
            <span className="font-bold block">Application Instructions:</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              {opportunity.howToApply}
            </p>
          </div>
        </div>

        {/* Bottom Apply Action */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between gap-3 shrink-0">
          <div className="text-left">
            <span className="text-[10px] text-slate-400 block">Experience Level</span>
            <span className="text-xs font-bold text-slate-700">{opportunity.experienceLevel}</span>
          </div>

          <button
            onClick={() => setApplied(true)}
            className="py-2.5 px-5 rounded-xl bg-[#002147] hover:bg-[#001733] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#002147]/20 active:scale-[0.98] transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#FF7F32]" />
            <span>{applied ? '✓ Application Submitted' : 'Apply Now on Partner Portal'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
