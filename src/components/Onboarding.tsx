import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface OnboardingModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen = true, onClose }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Connecting to live catalog...');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 35) {
          setStatusText('Syncing stock & Cisco AI...');
          return prev + 12;
        }
        if (prev < 75) {
          setStatusText('Loading verified tech inventory...');
          return prev + 15;
        }
        if (prev >= 100) {
          clearInterval(timer);
          setStatusText('Storefront Ready!');
          setTimeout(() => {
            onClose();
          }, 400);
          return 100;
        }
        return prev + 18;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#07090E]/70 backdrop-blur-2xl px-4"
      >
        {/* Ambient Navy & Mint Glow Backdrops (No Purple) */}
        <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-[#3626A7]/30 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#00F0FF]/20 blur-[100px] pointer-events-none" />

        {/* Centered Frosted Glass 3D Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/15 bg-white/10 dark:bg-[#121620]/85 p-6 shadow-[0_25px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl text-center"
        >
          {/* Top Cyan Accent Line */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#3626A7] via-[#00F0FF] to-[#B4F000]" />

          {/* Logo / Cisco AI Emblem */}
          <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#00F0FF]/30 bg-gradient-to-tr from-[#3626A7] to-[#161B26] shadow-[0_0_25px_rgba(54,38,167,0.5)]">
            <Bot className="h-8 w-8 text-[#00F0FF]" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B4F000] opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-[#B4F000]" />
            </span>
          </div>

          {/* Headline */}
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <h2 className="font-display text-xl font-bold tracking-tight text-white">
              Joe Tech
            </h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#00F0FF]/15 px-2 py-0.5 text-[10px] font-bold text-[#00F0FF] border border-[#00F0FF]/25">
              <Sparkles size={10} /> Live
            </span>
          </div>

          <p className="text-xs font-medium text-gray-300 mb-5">
            {statusText}
          </p>

          {/* Brand High-Speed Progress Line */}
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#3626A7] via-[#00F0FF] to-[#B4F000]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.1 }}
            />
          </div>

          {/* Footer Highlights */}
          <div className="mt-5 flex items-center justify-between text-[11px] text-gray-400">
            <span className="flex items-center gap-1">
              <ShieldCheck size={13} className="text-[#00F0FF]" /> Verified Devices
            </span>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1 font-semibold text-[#00F0FF] hover:underline"
            >
              Enter Store <ArrowRight size={12} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export const Onboarding = OnboardingModal;