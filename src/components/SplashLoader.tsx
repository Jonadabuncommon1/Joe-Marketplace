import React, { useEffect } from 'react';

interface SplashProps {
  onComplete?: () => void;
}

export const SplashLoader: React.FC<SplashProps> = ({ onComplete }) => {
  useEffect(() => {
    if (onComplete) onComplete();
  }, [onComplete]);

  return null;
};

// Aliases
export const IntroAnimation = SplashLoader;
export const Onboarding = SplashLoader;
export const OnboardingModal = SplashLoader;