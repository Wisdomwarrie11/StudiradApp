import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Course, LiveClass, Opportunity, Tutor, ResearchService, TutorBooking } from '../../types';
import { MOCK_COURSES, MOCK_LIVE_CLASSES, MOCK_QUIZ } from '../../data/mockData';
import { AppHeader } from './AppHeader';
import { BottomTabBar } from './BottomTabBar';
import { NotificationCenter } from '../drawers/NotificationCenter';
import { ProfileDrawer } from '../drawers/ProfileDrawer';
import { HomeTab } from '../tabs/HomeTab';
import { LearnTab } from '../tabs/LearnTab';
import { AiTutorTab } from '../tabs/AiTutorTab';
import { ServicesTab } from '../tabs/ServicesTab';
import { ExploreTab } from '../tabs/ExploreTab';

// Interactive Modals
import { CourseDetailsModal } from '../modals/CourseDetailsModal';
import { CoursePlayerModal } from '../modals/CoursePlayerModal';
import { LiveClassModal } from '../modals/LiveClassModal';
import { QuizRunnerModal } from '../modals/QuizRunnerModal';
import { OpportunityDetailsModal } from '../modals/OpportunityDetailsModal';
import { TutorBookingModal } from '../modals/TutorBookingModal';
import { ResearchRequestModal } from '../modals/ResearchRequestModal';

export const MainAppShell: React.FC = () => {
  const { activeTab, setActiveTab, setScreen, currentUser } = useAuth();

  // Drawer states
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Modal active item states
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [playerCourse, setPlayerCourse] = useState<Course | null>(null);
  const [selectedLiveClass, setSelectedLiveClass] = useState<LiveClass | null>(null);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [selectedResearchService, setSelectedResearchService] = useState<ResearchService | null>(null);

  // Active bookings state
  const [activeBookings, setActiveBookings] = useState<TutorBooking[]>([
    {
      id: 'bk_1',
      tutorName: 'Dr. Marcus Thorne',
      tutorRole: 'Consultant Thoracic Radiologist',
      topic: 'Trauma C-Spine & Pelvic Clearing',
      date: 'Tomorrow',
      timeSlot: '17:00 - 17:45 BST',
      status: 'Confirmed',
      meetingUrl: 'https://meet.studirad.org/tutor/dr-thorne-session',
    },
  ]);

  const handleConfirmBooking = (details: {
    tutorName: string;
    tutorRole: string;
    topic: string;
    date: string;
    timeSlot: string;
  }) => {
    const newBooking: TutorBooking = {
      id: 'bk_' + Date.now(),
      tutorName: details.tutorName,
      tutorRole: details.tutorRole,
      topic: details.topic,
      date: details.date,
      timeSlot: details.timeSlot,
      status: 'Confirmed',
      meetingUrl: 'https://meet.studirad.org/room/' + Math.random().toString(36).substring(2, 7),
    };
    setActiveBookings((prev) => [newBooking, ...prev]);
  };

  return (
    <div className="flex-1 w-full h-full flex flex-col justify-between bg-white relative overflow-hidden text-slate-900">
      {/* 1. Coursera-style Mobile Header */}
      <AppHeader
        onOpenNotifications={() => setIsNotificationOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* 2. Scrollable Body: Active Tab View */}
      <main className="flex-1 w-full overflow-y-auto no-scrollbar flex flex-col relative bg-[#F5F7FA]">
        {activeTab === 'home' && (
          <HomeTab
            onSelectCourse={(course) => setSelectedCourse(course)}
            onOpenPlayer={(course) => setPlayerCourse(course)}
            onSelectLiveClass={(lc) => setSelectedLiveClass(lc)}
            onSelectOpportunity={(opp) => setSelectedOpportunity(opp)}
            onStartQuiz={() => setIsQuizActive(true)}
          />
        )}

        {activeTab === 'learn' && (
          <LearnTab
            onSelectCourse={(course) => setSelectedCourse(course)}
            onOpenPlayer={(course) => setPlayerCourse(course)}
            onSelectLiveClass={(lc) => setSelectedLiveClass(lc)}
            onStartQuiz={() => setIsQuizActive(true)}
          />
        )}

        {activeTab === 'aiTutor' && <AiTutorTab />}

        {activeTab === 'services' && (
          <ServicesTab
            onBookTutor={(tutor) => setSelectedTutor(tutor)}
            onRequestResearch={(srv) => setSelectedResearchService(srv)}
            activeBookings={activeBookings}
          />
        )}

        {activeTab === 'explore' && (
          <ExploreTab
            onSelectOpportunity={(opp) => setSelectedOpportunity(opp)}
          />
        )}
      </main>

      {/* 3. Persistent 5-Tab Bottom Navigation Bar */}
      <BottomTabBar />

      {/* 4. Slide-in Notification Center Sheet */}
      <NotificationCenter
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />

      {/* 5. Slide-out Profile Drawer with App Store account deletion */}
      <ProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onEditTopics={() => {
          setIsProfileOpen(false);
          setScreen('personalise');
        }}
      />

      {/* 6. Interactive Modals */}
      <CourseDetailsModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onOpenPlayer={(c) => setPlayerCourse(c)}
      />

      <CoursePlayerModal
        course={playerCourse}
        onClose={() => setPlayerCourse(null)}
        onOpenQuiz={() => setIsQuizActive(true)}
      />

      <LiveClassModal
        liveClass={selectedLiveClass}
        onClose={() => setSelectedLiveClass(null)}
      />

      <QuizRunnerModal
        quiz={isQuizActive ? MOCK_QUIZ : null}
        onClose={() => setIsQuizActive(false)}
      />

      <OpportunityDetailsModal
        opportunity={selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
      />

      <TutorBookingModal
        tutor={selectedTutor}
        onClose={() => setSelectedTutor(null)}
        onConfirmBooking={handleConfirmBooking}
      />

      <ResearchRequestModal
        service={selectedResearchService}
        onClose={() => setSelectedResearchService(null)}
        onSubmitRequest={(req) => console.log('Submitted research request', req)}
      />
    </div>
  );
};
