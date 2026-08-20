import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { SplashLoader } from './components/SplashLoader';
// other imports...

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && <SplashLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Your Normal Storefront Layout */}
      <div className="min-h-screen bg-jt-paper dark:bg-jt-ink transition-colors duration-300">
        {/* Navbar, Main Content, Cisco AIChatWidget */}
      </div>
    </>
  );
};