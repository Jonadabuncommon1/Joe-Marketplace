import React, { useEffect } from 'react';

export const SplashScreen: React.FC<{ onComplete?: () => void; onFinish?: () => void }> = ({ onComplete, onFinish }) => {
  useEffect(() => {
    if (onComplete) onComplete();
    if (onFinish) onFinish();
  }, [onComplete, onFinish]);

  return null;
};

export default SplashScreen;