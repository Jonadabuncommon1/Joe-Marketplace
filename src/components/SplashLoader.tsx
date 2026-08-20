import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Sparkles, CheckCircle2 } from 'lucide-react';

interface SplashLoaderProps {
  onComplete: () => void;
}

export const SplashLoader: React.FC<SplashLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Connecting to live catalog...');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 40) {
          setStatusText('Syncing stock & Cisco AI...');
          return prev + 12;
        }
        if (prev < 80) {
          setStatusText('Loading verified gadgets...');
          return prev + 18;
        }
        if (prev >= 100) {
          clearInterval(timer);
          setStatusText('Storefront Ready!');
          setTimeout(onComplete, 350);
          return 100;
        }
        return prev + 15;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#07090E]/60 backdrop-blur-2xl px-4"
    >
      {/* Ambient background glow rings in Navy & Mint */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#3626A7]/25 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#00F0FF]/15 blur-[120px] pointer-events-none" />

      {/* Centered Frosted Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -10 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/15 bg-white/10 dark:bg-[#121620]/75 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl text-center"
      >
        {/* Glow Top Accent */}
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#00F0FF]/60 to-transparent" />

        {/* Brand Icon & Ping Indicator */}
        <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#00F0FF]/30 bg-gradient-to-tr from-[#3626A7] to-[#1E1460] shadow-[0_0_25px_rgba(54,38,167,0.5)]">
          <Bot className="h-8 w-8 text-[#00F0FF]" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B4F000] opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-[#B4F000]" />
          </span>
        </div>

        {/* Title */}
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <h2 className="font-display text-lg font-bold tracking-tight text-white">
            Joe Tech
          </h2>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#00F0FF]/15 px-2 py-0.5 text-[10px] font-bold text-[#00F0FF] border border-[#00F0FF]/25">
            <Sparkles size={10} /> Live
          </span>
        </div>

        <p className="text-xs font-medium text-gray-300 dark:text-gray-400 mb-5">
          {statusText}
        </p>

        {/* High-speed brand progress track */}
        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10 dark:bg-black/40">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#3626A7] via-[#00F0FF] to-[#B4F000]"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.15 }}
          />
        </div>

        {/* Footer Tagline */}
        <div className="mt-4 flex items-center justify-between text-[11px] text-gray-400">
          <span className="flex items-center gap-1">
            <CheckCircle2 size={12} className="text-[#00F0FF]" /> Verified Stock
          </span>
          <span className="font-mono text-gray-300">{Math.min(progress, 100)}%</span>
        </div>
      </motion.div>
    </motion.div>
  );
};