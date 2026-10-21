/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DeviceFrame } from './components/common/DeviceFrame';
import { SplashScreen } from './components/steps/SplashScreen';
import { OnboardingScreen } from './components/steps/OnboardingScreen';
import { AuthScreen } from './components/steps/AuthScreen';
import { PersonaliseScreen } from './components/steps/PersonaliseScreen';
import { Step1CompletionScreen } from './components/steps/Step1CompletionScreen';
import { MainAppShell } from './components/navigation/MainAppShell';

const AppContent: React.FC = () => {
  const { currentScreen } = useAuth();

  return (
    <DeviceFrame>
      {currentScreen === 'splash' && <SplashScreen />}
      {currentScreen === 'onboarding' && <OnboardingScreen />}
      {currentScreen === 'auth' && <AuthScreen />}
      {currentScreen === 'personalise' && <PersonaliseScreen />}
      {currentScreen === 'completed' && <Step1CompletionScreen />}
      {currentScreen === 'app' && <MainAppShell />}
    </DeviceFrame>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
