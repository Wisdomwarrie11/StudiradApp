import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Wordmark } from '../brand/Wordmark';
import { ChevronRight, ChevronLeft, ArrowRight, BookOpen, Video, Briefcase } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { OnboardingSlide } from '../../types';

import radiographyImg from '../../assets/images/onboarding_radiography_1792606674447.jpg';
import classesImg from '../../assets/images/onboarding_classes_1792606674536.jpg';
import careersImg from '../../assets/images/onboarding_careers_1792606674049.jpg';

const SLIDES: OnboardingSlide[] = [
  {
    id: 0,
    title: 'Learn radiography skills from anywhere',
    subtitle: 'High-Yield Clinical Practice',
    description: 'Master anatomical positioning, image critique, radiation safety protocols, and pathology identification on your phone, tablet, or desktop.',
    image: radiographyImg,
    badge: 'Modular Curriculum',
  },
  {
    id: 1,
    title: 'Attend expert-led classes and improve your knowledge',
    subtitle: 'Interactive Masterclasses',
    description: 'Join live case reviews, CT & MRI specialty workshops, and clinical Q&As hosted by consultant radiologists and senior university educators.',
    image: classesImg,
    badge: 'Accredited CPD',
  },
  {
    id: 2,
    title: 'Discover jobs, internships, scholarships and locum opportunities',
    subtitle: 'Career Pathway Hub',
    description: 'Connect directly with verified NHS and private healthcare providers for locum shifts, residency posts, and international scholarships.',
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
      className="min-h-screen w-full bg-[var(--bg-canvas)] text-[var(--text-primary)] flex flex-col justify-between py-6 px-4 sm:px-6 md:px-8 select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-full max-w-2xl mx-auto flex flex-col flex-1 justify-between">
        {/* Top Header Bar */}
        <header className="w-full pb-4 flex items-center justify-between border-b border-[var(--border-subtle)] shrink-0">
          <Wordmark size="sm" withIcon={true} />

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={handleSkip}
              className="text-sm font-semibold text-slate-400 hover:text-[var(--text-primary)] px-4 py-2 rounded-xl hover:bg-[var(--bg-surface-elevated)] transition-colors min-h-[44px] flex items-center"
            >
              Skip to Sign In
            </button>
          </div>
        </header>

        {/* Slide Content with generous vertical spacing and natural scrolling */}
        <main className="my-auto py-6 sm:py-8 flex flex-col gap-6">
          {/* Visual Container */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-opacity duration-300"
            />

            {/* Gradient Scrim for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>

            {/* Unboxed Metadata Badge */}
            <div className="absolute bottom-4 left-4 text-xs font-semibold text-white/95 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
              {activeIndex === 0 && <BookOpen className="w-4 h-4 text-[#FF7F32]" />}
              {activeIndex === 1 && <Video className="w-4 h-4 text-[#FF7F32]" />}
              {activeIndex === 2 && <Briefcase className="w-4 h-4 text-[#FF7F32]" />}
              <span>{currentSlide.badge}</span>
            </div>
          </div>

          {/* Typography Scale */}
          <div className="flex flex-col text-left space-y-2">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FF7F32]">
              {currentSlide.subtitle}
            </span>
            <h1 className="heading-section text-[var(--text-primary)]">
              {currentSlide.title}
            </h1>
            <p className="body-standard text-[var(--text-secondary)] pt-1">
              {currentSlide.description}
            </p>
          </div>
        </main>

        {/* Bottom Navigation & Controls */}
        <footer className="w-full pt-4 border-t border-[var(--border-subtle)] flex flex-col gap-5 shrink-0">
          {/* Step Indicators */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {SLIDES.map((slide, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-8 bg-[#FF7F32]'
                        : 'w-2.5 bg-slate-600 dark:bg-slate-700 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                );
              })}
            </div>

            <span className="text-sm font-medium text-[var(--text-muted)] font-mono">
              Step {activeIndex + 1} of {SLIDES.length}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex items-center gap-4">
            {activeIndex > 0 && (
              <button
                onClick={handlePrev}
                className="w-14 h-12 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] active:scale-95 transition-all shrink-0 min-h-[48px]"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {activeIndex === SLIDES.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex-1 h-12 rounded-xl bg-[#FF7F32] hover:bg-[#E86B20] text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-[#FF7F32]/20 active:scale-[0.98] transition-all min-h-[48px]"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 h-12 rounded-xl bg-[#002147] dark:bg-[#1B447A] hover:bg-[#001733] dark:hover:bg-[#23589E] text-white font-bold text-base flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all min-h-[48px]"
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5 text-[#FF7F32]" />
              </button>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
};
