import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Wordmark } from '../brand/Wordmark';
import { 
  Check, 
  Sparkles, 
  ShieldAlert, 
  Activity, 
  Layers, 
  Waves, 
  HeartHandshake, 
  BookMarked,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { LearningTopic } from '../../types';

const CLINICAL_TOPICS: LearningTopic[] = [
  {
    id: 'general_radiography',
    title: 'General Radiography',
    category: 'Foundational Imaging',
    description: 'Skeletal positioning, chest X-rays, trauma protocols, pediatric views, and grid physics.',
    iconName: 'general',
    moduleCount: 42,
  },
  {
    id: 'ct_mri',
    title: 'CT & MRI',
    category: 'Cross-Sectional',
    description: 'Computed tomography reconstruction, MRI sequence physics, contrast safety, and neuro/cardiac imaging.',
    iconName: 'cross_sectional',
    moduleCount: 38,
  },
  {
    id: 'ultrasound',
    title: 'Ultrasound',
    category: 'Sonography',
    description: 'Abdominal, vascular Doppler, musculoskeletal scanning, and point-of-care emergency ultrasound.',
    iconName: 'ultrasound',
    moduleCount: 29,
  },
  {
    id: 'mammography',
    title: 'Mammography',
    category: 'Specialist Screening',
    description: 'Breast anatomy, compression technique, 3D tomosynthesis, biopsy assistance, and quality audit.',
    iconName: 'mammography',
    moduleCount: 24,
  },
  {
    id: 'radiation_protection',
    title: 'Radiation Protection',
    category: 'Safety & Regulations',
    description: 'ALARA / ALARP principles, diagnostic reference levels, dosimetry calculations, and IRR/IRMER compliance.',
    iconName: 'safety',
    moduleCount: 31,
  },
  {
    id: 'research_cpd',
    title: 'Research & Professional Development',
    category: 'Academic & Career',
    description: 'Dissertation support, clinical audit, journal appraisal, CPD portfolio, and locum interview prep.',
    iconName: 'research',
    moduleCount: 26,
  },
];

export const PersonaliseScreen: React.FC = () => {
  const { currentUser, saveSelectedTopics, setScreen } = useAuth();
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>(() => {
    // Default pre-select 2 primary foundational topics for quick start
    return currentUser?.selectedTopics?.length
      ? currentUser.selectedTopics
      : ['general_radiography', 'radiation_protection'];
  });

  const toggleTopic = (id: string) => {
    setSelectedTopicIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedTopicIds.length === CLINICAL_TOPICS.length) {
      setSelectedTopicIds([]);
    } else {
      setSelectedTopicIds(CLINICAL_TOPICS.map((t) => t.id));
    }
  };

  const handleSave = () => {
    saveSelectedTopics(selectedTopicIds);
  };

  const handleSkip = () => {
    // Allow user to proceed with empty or existing selection
    saveSelectedTopics(selectedTopicIds);
  };

  const getTopicIcon = (iconName: string, isSelected: boolean) => {
    const iconColor = isSelected ? 'text-[#FF7F32]' : 'text-slate-500';
    switch (iconName) {
      case 'general':
        return <Layers className={`w-5 h-5 ${iconColor}`} />;
      case 'cross_sectional':
        return <Activity className={`w-5 h-5 ${iconColor}`} />;
      case 'ultrasound':
        return <Waves className={`w-5 h-5 ${iconColor}`} />;
      case 'mammography':
        return <HeartHandshake className={`w-5 h-5 ${iconColor}`} />;
      case 'safety':
        return <ShieldAlert className={`w-5 h-5 ${iconColor}`} />;
      case 'research':
        return <BookMarked className={`w-5 h-5 ${iconColor}`} />;
      default:
        return <Sparkles className={`w-5 h-5 ${iconColor}`} />;
    }
  };

  return (
    <div className="flex-1 w-full bg-slate-50 flex flex-col justify-between select-none">
      {/* Top Header */}
      <div className="w-full px-5 pt-3 pb-3 border-b border-slate-200/80 bg-white flex items-center justify-between shrink-0">
        <Wordmark size="sm" withIcon={true} />

        <button
          onClick={handleSkip}
          className="text-xs font-semibold text-slate-500 hover:text-[#002147] px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full px-5 py-4 overflow-y-auto no-scrollbar flex flex-col">
        {/* Title & Introduction */}
        <div className="text-left mb-4">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#FF7F32] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tailor Your Experience</span>
          </div>
          <h1 className="text-xl font-bold text-[#002147] tracking-tight mb-1">
            Personalise Learning
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            Select the radiography disciplines you wish to prioritize for live classes, case quizzes, and job opportunities.
          </p>

          {/* Quick Select All Toggle */}
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">
              {selectedTopicIds.length} of {CLINICAL_TOPICS.length} topics selected
            </span>
            <button
              onClick={handleSelectAll}
              className="text-[#002147] hover:text-[#FF7F32] font-semibold text-xs transition-colors"
            >
              {selectedTopicIds.length === CLINICAL_TOPICS.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
        </div>

        {/* 6 Topic Cards Grid */}
        <div className="flex flex-col gap-2.5 pb-2">
          {CLINICAL_TOPICS.map((topic) => {
            const isSelected = selectedTopicIds.includes(topic.id);
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => toggleTopic(topic.id)}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 relative ${
                  isSelected
                    ? 'bg-blue-50/60 border-[#002147] shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Topic Icon Container */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-[#002147] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {getTopicIcon(topic.iconName, isSelected)}
                </div>

                {/* Topic Info */}
                <div className="flex-1 pr-6">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-bold text-[#002147] leading-snug">
                      {topic.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 block mb-1">
                    {topic.category} · {topic.moduleCount} Clinical Modules
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {topic.description}
                  </p>
                </div>

                {/* Custom Check Indicator */}
                <div
                  className={`absolute top-3.5 right-3.5 w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                    isSelected
                      ? 'bg-[#FF7F32] border-[#FF7F32] text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sticky Bottom Actions Bar */}
      <div className="w-full px-5 py-3.5 border-t border-slate-200/80 bg-white flex items-center gap-3 shrink-0">
        <button
          onClick={handleSkip}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 font-semibold text-xs hover:bg-slate-50 transition-colors"
        >
          Skip
        </button>

        <button
          onClick={handleSave}
          className="flex-1 py-2.5 px-4 rounded-xl bg-[#002147] hover:bg-[#001733] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#002147]/20 active:scale-[0.98] transition-all"
        >
          <span>Save Preferences</span>
          <ArrowRight className="w-4 h-4 text-[#FF7F32]" />
        </button>
      </div>
    </div>
  );
};
