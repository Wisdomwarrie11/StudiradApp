/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SplashScreen } from './components/steps/SplashScreen';
import { OnboardingScreen } from './components/steps/OnboardingScreen';
import { AuthScreen } from './components/steps/AuthScreen';
import { PersonaliseScreen } from './components/steps/PersonaliseScreen';
import { Step1CompletionScreen } from './components/steps/Step1CompletionScreen';
import { MainAppShell } from './components/navigation/MainAppShell';

const AppContent: React.FC = () => {
  const { currentScreen } = useAuth();

  return (
    <div className="w-full min-h-[100dvh] h-[100dvh] bg-[#F1F4F9] flex justify-center items-center overflow-hidden">
      {/* Native App Viewport: 100% full screen on phones, clean mobile view on desktop */}
      <div className="w-full h-full max-w-md mx-auto bg-white flex flex-col relative overflow-hidden sm:shadow-2xl sm:border-x sm:border-slate-200">
        {currentScreen === 'splash' && <SplashScreen />}
        {currentScreen === 'onboarding' && <OnboardingScreen />}
        {currentScreen === 'auth' && <AuthScreen />}
        {currentScreen === 'personalise' && <PersonaliseScreen />}
        {currentScreen === 'completed' && <Step1CompletionScreen />}
        {currentScreen === 'app' && <MainAppShell />}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
