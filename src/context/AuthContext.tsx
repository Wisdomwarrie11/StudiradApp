import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, AppScreen, ProfessionalRole, NavTab, AppNotification } from '../types';

interface AuthContextType {
  currentUser: UserProfile | null;
  currentScreen: AppScreen;
  setScreen: (screen: AppScreen) => void;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  notifications: AppNotification[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotifications: () => void;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (data: { email: string; password: string; fullName: string; role: ProfessionalRole }) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  sendPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
  loginAsGuest: () => void;
  saveSelectedTopics: (topics: string[], navigateToApp?: boolean) => void;
  deleteAccount: () => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  resetToSplash: () => void;
}

const STORAGE_KEY_USER = 'studirad_current_user';
const STORAGE_KEY_SCREEN = 'studirad_current_screen';
const STORAGE_KEY_NOTIFS = 'studirad_notifications';

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_1',
    title: 'Live Masterclass Tomorrow',
    message: 'Dr. Thorne will host "Advanced Neuro MRI & Stroke Protocol Interpretations" at 18:00 BST.',
    timestamp: '10m ago',
    read: false,
    type: 'class',
  },
  {
    id: 'notif_2',
    title: 'New Locum Opening: Band 6 Radiographer',
    message: 'Guy\'s and St Thomas\' NHS Foundation Trust has posted a 3-month weekend locum post (£38/hr).',
    timestamp: '2h ago',
    read: false,
    type: 'job',
  },
  {
    id: 'notif_3',
    title: 'Weekly Clinical Case Challenge',
    message: 'Test your diagnostic skills: Pneumothorax vs Skin Fold on a Portable Supine Chest AP.',
    timestamp: '1d ago',
    read: true,
    type: 'quiz',
  },
  {
    id: 'notif_4',
    title: 'Welcome to StudiRad!',
    message: 'Your clinical radiography learning desk is active. Explore live classes, topic modules, and CPD records.',
    timestamp: '2d ago',
    read: true,
    type: 'system',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [currentScreen, setCurrentScreenState] = useState<AppScreen>('splash');
  const [activeTab, setActiveTab] = useState<NavTab>('home');

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_NOTIFS);
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_NOTIFS, JSON.stringify(notifications));
    } catch (e) {
      console.warn('Could not persist notifications', e);
    }
  }, [notifications]);

  const setScreen = (screen: AppScreen) => {
    setCurrentScreenState(screen);
    try {
      localStorage.setItem(STORAGE_KEY_SCREEN, screen);
    } catch (e) {
      console.warn('Could not persist screen state', e);
    }
  };

  // Ensure first-time users or unauthenticated users always see onboarding before entering the app
  useEffect(() => {
    if (!currentUser && currentScreen === 'app') {
      setCurrentScreenState('onboarding');
    }
  }, [currentUser, currentScreen]);

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise((res) => setTimeout(res, 500));

    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid academic or professional email address.' };
    }
    if (!password || password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    const mockName = email.split('@')[0].replace(/[._-]/g, ' ');
    const formattedName = mockName.charAt(0).toUpperCase() + mockName.slice(1);

    const user: UserProfile = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      email: email.trim().toLowerCase(),
      fullName: formattedName || 'Radiology Scholar',
      role: email.includes('student') ? 'Radiography Student' : 'Qualified Radiographer',
      selectedTopics: currentUser?.selectedTopics || ['general_radiography', 'radiation_protection'],
      isGuest: false,
      createdAt: new Date().toISOString(),
      cpdCredits: 18.5,
    };

    setCurrentUser(user);
    setScreen('personalise');
    return { success: true };
  };

  const signUp = async (data: {
    email: string;
    password: string;
    fullName: string;
    role: ProfessionalRole;
  }): Promise<{ success: boolean; error?: string }> => {
    await new Promise((res) => setTimeout(res, 600));

    if (!data.fullName.trim()) {
      return { success: false, error: 'Please enter your full clinical or academic name.' };
    }
    if (!data.email || !data.email.includes('@')) {
      return { success: false, error: 'Please provide a valid institutional email address.' };
    }
    if (data.password.length < 8) {
      return { success: false, error: 'Password must be at least 8 characters.' };
    }

    const newUser: UserProfile = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      email: data.email.trim().toLowerCase(),
      fullName: data.fullName.trim(),
      role: data.role,
      selectedTopics: [],
      isGuest: false,
      createdAt: new Date().toISOString(),
      cpdCredits: 0,
    };

    setCurrentUser(newUser);
    setScreen('personalise');
    return { success: true };
  };

  const signInWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    await new Promise((res) => setTimeout(res, 600));
    const googleUser: UserProfile = {
      id: 'usr_goog_' + Math.random().toString(36).substring(2, 8),
      email: 'alex.morgan@nhs.uk',
      fullName: 'Alex Morgan, BSc Rad',
      role: 'Qualified Radiographer',
      selectedTopics: ['ct_mri', 'radiation_protection'],
      isGuest: false,
      createdAt: new Date().toISOString(),
      cpdCredits: 24.0,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    };
    setCurrentUser(googleUser);
    setScreen('personalise');
    return { success: true };
  };

  const sendPasswordReset = async (email: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise((res) => setTimeout(res, 500));
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    return { success: true };
  };

  const loginAsGuest = () => {
    const guestUser: UserProfile = {
      id: 'guest_' + Math.random().toString(36).substring(2, 7),
      email: 'guest.radiographer@studirad.org',
      fullName: 'Guest Imaging Scholar',
      role: 'Guest Explorer',
      selectedTopics: ['general_radiography'],
      isGuest: true,
      createdAt: new Date().toISOString(),
      cpdCredits: 0,
    };
    setCurrentUser(guestUser);
    setScreen('personalise');
  };

  const saveSelectedTopics = (topics: string[], navigateToApp: boolean = true) => {
    if (currentUser) {
      const updated = { ...currentUser, selectedTopics: topics };
      setCurrentUser(updated);
    }
    if (navigateToApp) {
      setScreen('app');
    } else {
      setScreen('completed');
    }
  };

  // Apple App Store Guideline 5.1.1(v) Compliant Account Deletion
  const deleteAccount = async (): Promise<{ success: boolean; error?: string }> => {
    await new Promise((res) => setTimeout(res, 800));
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_SCREEN);
    localStorage.removeItem(STORAGE_KEY_NOTIFS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setScreen('auth');
    return { success: true };
  };

  const signOut = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY_USER);
    setScreen('onboarding');
  };

  const resetToSplash = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_SCREEN);
    setNotifications(INITIAL_NOTIFICATIONS);
    setActiveTab('home');
    setScreen('splash');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentScreen,
        setScreen,
        activeTab,
        setActiveTab,
        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearNotifications,
        signIn,
        signUp,
        signInWithGoogle,
        sendPasswordReset,
        loginAsGuest,
        saveSelectedTopics,
        deleteAccount,
        signOut,
        resetToSplash,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
