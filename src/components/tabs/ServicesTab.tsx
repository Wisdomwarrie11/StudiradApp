import React, { useState } from 'react';
import { Tutor, ResearchService, TutorBooking } from '../../types';
import { MOCK_TUTORS, MOCK_RESEARCH_SERVICES } from '../../data/mockData';
import { 
  Briefcase, 
  UserCheck, 
  GraduationCap, 
  Calendar, 
  Clock, 
  Star, 
  ArrowRight,
  ShieldCheck,
  Video,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface ServicesTabProps {
  onBookTutor: (tutor: Tutor) => void;
  onRequestResearch: (service: ResearchService) => void;
  activeBookings: TutorBooking[];
}

export const ServicesTab: React.FC<ServicesTabProps> = ({
  onBookTutor,
  onRequestResearch,
  activeBookings,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'tutors' | 'research'>('tutors');

  return (
    <div className="flex-1 w-full bg-[#F5F7FA] flex flex-col p-4 space-y-4 overflow-y-auto no-scrollbar text-left text-slate-900">
      {/* Sub-tab selector */}
      <div className="w-full bg-slate-200/80 p-1 rounded-xl flex items-center text-xs shrink-0">
        <button
          onClick={() => setActiveSubTab('tutors')}
          className={`flex-1 py-1.5 font-bold rounded-lg transition-all ${
            activeSubTab === 'tutors'
              ? 'bg-white text-[#002147] shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          1-on-1 Private Tutors
        </button>
        <button
          onClick={() => setActiveSubTab('research')}
          className={`flex-1 py-1.5 font-bold rounded-lg transition-all ${
            activeSubTab === 'research'
              ? 'bg-white text-[#002147] shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Research & Dissertation Desk
        </button>
      </div>

      {/* ACTIVE SESSIONS STATUS (If any booked) */}
      {activeBookings.length > 0 && activeSubTab === 'tutors' && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Confirmed Upcoming Session</span>
            </span>
            <span className="text-[10px] font-semibold text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
              Active
            </span>
          </div>

          {activeBookings.map((b) => (
            <div key={b.id} className="p-2.5 rounded-xl bg-white border border-emerald-100 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#002147]">{b.tutorName}</span>
                <span className="text-[11px] font-mono text-slate-500">{b.date} · {b.timeSlot}</span>
              </div>
              <p className="text-[11px] text-slate-600">Focus: {b.topic}</p>
              <div className="pt-1 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Meeting Room:</span>
                <a
                  href={b.meetingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[#002147] hover:text-[#FF7F32] flex items-center gap-1"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Join Video Call</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 1. PRIVATE TUTORS SUB-TAB */}
      {activeSubTab === 'tutors' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Verified Superintendents & University Lecturers</span>
            <span className="text-[#002147] font-semibold">1-on-1 Clinical Desk</span>
          </div>

          <div className="space-y-3">
            {MOCK_TUTORS.map((tutor) => (
              <div
                key={tutor.id}
                className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={tutor.avatar}
                    alt={tutor.name}
                    className="w-12 h-12 rounded-full object-cover shrink-0 border border-slate-100"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-slate-900 truncate">
                        {tutor.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>{tutor.rating}</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">
                      {tutor.role}
                    </p>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {tutor.hospital}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {tutor.bio}
                </p>

                {/* Specialties Tags */}
                <div className="flex flex-wrap gap-1">
                  {tutor.specialties.map((spec, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Pricing & Booking Action */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Rate</span>
                    <span className="font-bold text-[#FF7F32] font-mono">{tutor.hourlyRate}</span>
                  </div>

                  <button
                    onClick={() => onBookTutor(tutor)}
                    className="py-1.5 px-4 rounded-xl bg-[#002147] hover:bg-[#001733] text-white font-bold text-xs flex items-center gap-1 shadow-2xs transition-colors"
                  >
                    <span>Book Session</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. RESEARCH & DISSERTATION ASSISTANCE SUB-TAB */}
      {activeSubTab === 'research' && (
        <div className="space-y-3">
          <div className="p-3 bg-purple-50/70 border border-purple-100 rounded-xl text-xs text-purple-900 leading-relaxed">
            Get structured academic support for your radiography BSc dissertation, clinical audit design, SPSS biostatistics, and CV for Band 6/7 promotions.
          </div>

          <div className="space-y-3">
            {MOCK_RESEARCH_SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                    {srv.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    Turnaround: {srv.turnaround}
                  </span>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-900">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                {/* Deliverables preview */}
                <ul className="space-y-1 text-[11px] text-slate-500 pl-1">
                  {srv.deliverables.map((del, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Fee</span>
                    <span className="font-bold text-[#002147] font-mono">{srv.price}</span>
                  </div>

                  <button
                    onClick={() => onRequestResearch(srv)}
                    className="py-1.5 px-4 rounded-xl bg-[#002147] hover:bg-[#001733] text-white font-bold text-xs flex items-center gap-1 shadow-2xs transition-colors"
                  >
                    <span>Request Support</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
