import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Sparkles } from 'lucide-react';

interface SplashProps {
  onComplete?: () => void;
}

export const SplashLoader: React.FC<SplashProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Ultra-fast 850ms sequence
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 850);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleSkip = () => {
    setIsVisible(false);
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleSkip}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0B0E14] select-none cursor-pointer"
        >
          {/* Ambient Navy Core Glow */}
          <div className="absolute h-72 w-72 rounded-full bg-[#3626A7]/25 blur-[120px] pointer-events-none" />

          {/* Centered Brand Monogram & Name */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.04, y: -6 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="relative flex flex-col items-center"
          >
            {/* Logo Emblem with Cyan/Mint Rim */}
            <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-[#00F0FF]/30 bg-gradient-to-b from-[#1C2230] to-[#121620] shadow-[0_12px_40px_rgba(0,240,255,0.15)]">
              <Bot className="h-9 w-9 text-[#00F0FF]" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B4F000] opacity-75" />
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-[#B4F000]" />
              </span>
            </div>

            {/* Typography */}
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl font-bold tracking-tight text-white">
                Joe Tech
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#00F0FF]/15 px-2 py-0.5 text-[9px] font-bold tracking-wider text-[#00F0FF] border border-[#00F0FF]/30 uppercase">
                <Sparkles size={9} /> Official
              </span>
            </div>

            <p className="mt-1 text-xs text-gray-400 font-medium tracking-wide">
              Smart Tech • Verified Gadgets • Cisco AI
            </p>

            {/* Razor-Thin Precision Sweep Line */}
            <div className="relative mt-7 h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  repeat: Infinity,
                  duration: 0.85,
                  ease: 'easeInOut',
                }}
                className="h-full w-24 rounded-full bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent shadow-[0_0_8px_#00F0FF]"
              />
            </div>
          </motion.div>

          {/* Minimalist Skip Prompt */}
          <span className="absolute bottom-10 text-[10px] font-semibold tracking-widest text-gray-500 uppercase">
            Tap anywhere to skip
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Aliases in case imported under different names
export const IntroAnimation = SplashLoader;
export const Onboarding = SplashLoader;
export const OnboardingModal = SplashLoader;