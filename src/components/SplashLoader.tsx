import React, { useEffect } from 'react';

export const IntroAnimation = ({ onComplete }: { onComplete?: () => void }) => {
  useEffect(() => {
    if (onComplete) onComplete();
  }, [onComplete]);
  return null;
};

export const SplashLoader = IntroAnimation;
export const DotMatrixLoader = IntroAnimation;
export const Onboarding = IntroAnimation;
export const OnboardingModal = IntroAnimation;