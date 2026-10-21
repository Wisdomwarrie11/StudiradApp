import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Wordmark } from '../brand/Wordmark';
import { ChevronRight, ChevronLeft, ArrowRight, BookOpen, Video, Briefcase, Sparkles } from 'lucide-react';
import { OnboardingSlide } from '../../types';

// Verified generated high-resolution domain assets
import radiographyImg from '../../assets/images/onboarding_radiography_1792606674447.jpg';
import classesImg from '../../assets/images/onboarding_classes_1792606674536.jpg';
import careersImg from '../../assets/images/onboarding_careers_1792606674049.jpg';

const SLIDES: OnboardingSlide[] = [
  {
    id: 0,
    title: 'Learn radiography skills from anywhere',
    subtitle: 'High-Yield Clinical Practice',
    description: 'Master anatomical positioning, image critique, radiation safety protocols, and pathology identification on your phone or tablet.',
    image: radiographyImg,
    badge: 'Modular Curriculum',
  },
  {
    id: 1,
    title: 'Attend expert-led classes and improve your knowledge',
    subtitle: 'Interactive Masterclasses',
    description: 'Join live case reviews, CT & MRI specialty workshops, and clinical Q&As hosted by consultant radiologists and senior educators.',
    image: classesImg,
    badge: 'Live CME / CPD',
  },
  {
    id: 2,
    title: 'Discover jobs, internships, scholarships and locum opportunities',
    subtitle: 'Career Pathway Hub',
    description: 'Connect directly with verified NHS and private healthcare providers for locum shifts, training hospital residencies, and scholarships.',
    image: careersImg,
    badge: 'Verified Opportunities',
  },
];

export const OnboardingScreen: React.FC = () => {
  const { setScreen } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const minSwipeDistance = 45;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && activeIndex < SLIDES.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
    if (isRightSwipe && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else {
      setScreen('auth');
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    setScreen('auth');
  };

  const currentSlide = SLIDES[activeIndex];

  return (
    <div 
      className="flex-1 w-full bg-white flex flex-col justify-between select-none relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header Bar */}
      <div className="w-full px-5 pt-3 pb-2 flex items-center justify-between border-b border-slate-100 bg-white/95 backdrop-blur-sm z-20 shrink-0">
        <Wordmark size="sm" withIcon={true} />

        <button
          onClick={handleSkip}
          className="text-xs font-semibold text-slate-500 hover:text-[#002147] px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Slide Image & Content Area */}
      <div className="flex-1 flex flex-col justify-center px-6 py-3 relative overflow-hidden">
        {/* Slide Visual Container */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-100 mb-6 group">
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 ease-out"
          />

          {/* Subdued Gradient Scrim for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

          {/* Clean unboxed category tag in image corner */}
          <div className="absolute bottom-3 left-3 text-xs font-semibold text-white/95 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
            {activeIndex === 0 && <BookOpen className="w-3.5 h-3.5 text-[#FF7F32]" />}
            {activeIndex === 1 && <Video className="w-3.5 h-3.5 text-[#FF7F32]" />}
            {activeIndex === 2 && <Briefcase className="w-3.5 h-3.5 text-[#FF7F32]" />}
            <span>{currentSlide.badge}</span>
          </div>
        </div>

        {/* Text Details with clean hierarchy */}
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF7F32] mb-1.5">
            {currentSlide.subtitle}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#002147] leading-tight mb-3">
            {currentSlide.title}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {currentSlide.description}
          </p>
        </div>
      </div>

      {/* Bottom Navigation & Indicators */}
      <div className="w-full px-6 pb-6 pt-2 bg-gradient-to-t from-white via-white to-transparent flex flex-col gap-5 shrink-0 z-20">
        {/* Slide Indicators */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {SLIDES.map((slide, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={slide.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-7 bg-[#002147]'
                      : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              );
            })}
          </div>

          <span className="text-xs font-semibold text-slate-400">
            {activeIndex + 1} of {SLIDES.length}
          </span>
        </div>

        {/* Action Controls */}
        <div className="w-full flex items-center gap-3">
          {activeIndex > 0 && (
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#002147] hover:bg-slate-50 active:scale-95 transition-all shrink-0"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {activeIndex === SLIDES.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex-1 h-12 rounded-xl bg-[#002147] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#002147]/20 hover:bg-[#001733] active:scale-[0.98] transition-all"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-[#FF7F32]" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex-1 h-12 rounded-xl bg-[#002147] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#002147]/20 hover:bg-[#001733] active:scale-[0.98] transition-all"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4 text-[#FF7F32]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
