export type AppScreen = 'splash' | 'onboarding' | 'auth' | 'personalise' | 'completed' | 'app';

export type AuthMode = 'signIn' | 'signUp' | 'forgotPassword';

export type NavTab = 'home' | 'learn' | 'search' | 'aiTutor' | 'services' | 'explore' | 'profile';

export type ClinicalModality = 
  | 'all' 
  | 'xray' 
  | 'mri' 
  | 'ultrasound' 
  | 'ct' 
  | 'anatomy' 
  | 'hospital_practice' 
  | 'rad_physics';

export type ProfessionalRole = 
  | 'Radiography Student' 
  | 'Qualified Radiographer' 
  | 'Imaging Technologist' 
  | 'Clinical Educator' 
  | 'Radiology Resident'
  | 'Guest Explorer';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: ProfessionalRole;
  selectedTopics: string[];
  isGuest: boolean;
  institution?: string;
  avatarUrl?: string;
  createdAt: string;
  cpdCredits?: number;
  enrolledCourseIds?: string[];
  savedOpportunityIds?: number[];
  quizScores?: { quizTitle: string; score: number; total: number; date: string }[];
  bookings?: TutorBooking[];
}

export interface LearningTopic {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
  moduleCount: number;
}

export interface OnboardingSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'class' | 'job' | 'system' | 'quiz' | 'booking';
  actionTarget?: { tab: NavTab; itemId?: string };
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoDurationSec?: number;
  completed: boolean;
  type: 'video' | 'pdf' | 'interactive';
  summary: string;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  institution: string;
  instructor: string;
  instructorRole: string;
  rating: number;
  reviewsCount: string;
  learners: string;
  duration: string;
  level: string;
  category: string;
  cpdCredits: string;
  price: string;
  isFree: boolean;
  overview: string;
  learningOutcomes: string[];
  image: string;
  modules: CourseModule[];
  progressPercent?: number;
  modality?: ClinicalModality;
}

export interface LiveClass {
  id: string;
  title: string;
  instructor: string;
  instructorRole: string;
  date: string;
  time: string;
  duration: string;
  isLiveNow: boolean;
  isRegistered: boolean;
  cpdCredits: string;
  description: string;
  requirements: string[];
  relatedMaterials: string[];
  meetingLink?: string;
  modality?: ClinicalModality;
}

export interface ClinicalResource {
  id: string;
  title: string;
  category: string;
  format: 'PDF' | 'Checklist' | 'Guideline' | 'Slide Deck';
  size: string;
  description: string;
  downloadUrl?: string;
  modality?: ClinicalModality;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  clinicalTip: string;
}

export interface Quiz {
  id: string;
  title: string;
  topic: string;
  durationMin: number;
  questionCount: number;
  questions: QuizQuestion[];
}

export interface Tutor {
  id: string;
  name: string;
  role: string;
  hospital: string;
  specialties: string[];
  hourlyRate: string;
  rating: number;
  reviewCount: number;
  bio: string;
  availableDays: string[];
  avatar: string;
}

export interface TutorBooking {
  id: string;
  tutorName: string;
  tutorRole: string;
  topic: string;
  date: string;
  timeSlot: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
  meetingUrl: string;
}

export interface ResearchService {
  id: string;
  title: string;
  category: string;
  price: string;
  turnaround: string;
  description: string;
  deliverables: string[];
}

export interface Opportunity {
  id: number;
  title: string;
  organisation: string;
  location: string;
  type: 'NHS Locum' | 'Permanent' | 'Internship' | 'Scholarship';
  rate: string;
  specialty: string;
  deadline: string;
  experienceLevel: string;
  urgent: boolean;
  description: string;
  requirements: string[];
  howToApply: string;
  modality?: ClinicalModality;
}

export interface Webinar {
  id: string;
  title: string;
  speaker: string;
  speakerRole: string;
  duration: string;
  date: string;
  views: string;
  rating: number;
  cpdCredits: string;
  description: string;
  videoUrl?: string;
  thumbnail: string;
  modality?: ClinicalModality;
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  authorRole: string;
  readTime: string;
  publishedAt: string;
  category: string;
  summary: string;
  content: string;
  image?: string;
}

