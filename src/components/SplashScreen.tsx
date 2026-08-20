import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogoMark } from './brand/Logo';

const GRID = 7;
const DOT = 12;
const GAP = 12;

/**
 * Ripple dot grid: every dot pulses on the same keyframes, but its delay is
 * proportional to its distance from the grid centre, so the pulse reads as a
 * ring travelling outward rather than all dots blinking together.
 */
const RippleDotGrid: React.FC = () => {
  const dots = useMemo(() => {
    const centre = (GRID - 1) / 2;
    const maxDist = Math.hypot(centre, centre);
    const out: { key: string; delay: number; t: number }[] = [];

    for (let row = 0; row < GRID; row++) {
      for (let col = 0; col < GRID; col++) {
        const dist = Math.hypot(row - centre, col - centre);
        const t = dist / maxDist; // 0 at centre → 1 at the corners
        out.push({ key: `${row}-${col}`, delay: t * 0.9, t });
      }
    }
    return out;
  }, []);

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${GRID}, ${DOT}px)`,
        gap: GAP,
      }}
      role="status"
      aria-label="Loading Joe Tech"
    >
      {dots.map(({ key, delay, t }) => (
        <span
          key={key}
          className="ripple-dot rounded-full"
          style={{
            width: DOT,
            height: DOT,
            // The splash background is brand blue, so dots run white at the
            // centre (for contrast) and resolve outward into the accent red.
            backgroundColor: t < 0.45 ? '#ffffff' : t < 0.75 ? '#657ed4' : '#ff331f',
            boxShadow: t < 0.45 ? '0 0 12px rgba(255,255,255,0.7)' : '0 0 12px rgba(255,51,31,0.55)',
            ['--ripple-delay' as string]: `${delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export const SplashScreen: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [visible, setVisible] = useState(true);
  // 'loading' shows the ripple grid, 'welcome' shows the greeting.
  const [phase, setPhase] = useState<'loading' | 'welcome'>('loading');

  useEffect(() => {
    const toWelcome = setTimeout(() => setPhase('welcome'), 1900);
    const toDone = setTimeout(() => setVisible(false), 4000);
    // Exit animations run on requestAnimationFrame, which browsers freeze in a
    // hidden/background tab, so onExitComplete may never fire and the overlay
    // would sit there forever. This timer tears it down regardless.
    const hardStop = setTimeout(onDone, 4800);
    return () => {
      clearTimeout(toWelcome);
      clearTimeout(toDone);
      clearTimeout(hardStop);
    };
  }, [onDone]);

  // Let people skip the intro.
  useEffect(() => {
    const skip = () => setVisible(false);
    window.addEventListener('keydown', skip);
    return () => window.removeEventListener('keydown', skip);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          onClick={() => setVisible(false)}
          className="fixed inset-0 z-[9999] flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-jt-blue"
        >
          {/* Ambient glow behind the grid */}
          <div className="pointer-events-none absolute inset-0 circuit-grid opacity-60" />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute h-[520px] w-[520px] rounded-full bg-white/10 blur-[130px]"
          />

          <div className="relative flex min-h-[300px] flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {phase === 'loading' ? (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.15, filter: 'blur(6px)' }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <RippleDotGrid />
                </motion.div>
              ) : (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center px-6 text-center"
                >
                  <motion.div
                    initial={{ opacity: 0, y: -14, rotate: -8 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <LogoMark className="mb-6 h-20 w-20 drop-shadow-[0_0_28px_rgba(255,255,255,0.55)]" />
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-3xl font-semibold leading-tight text-white sm:text-5xl"
                  >
                    Welcome to <span className="text-jt-lime">Joe Tech</span>
                    <br className="sm:hidden" />
                    <span className="sm:ml-3">Online Shop</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45, duration: 0.5 }}
                    className="mt-4 font-sans text-sm uppercase tracking-[0.3em] text-white/70"
                  >
                    Your Surest Plug
                  </motion.p>

                  {/* Progress sliver that runs out as the splash ends */}
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: 140 }}
                    transition={{ delay: 0.3, duration: 1.6, ease: 'linear' }}
                    className="mt-8 block h-[3px] rounded-full bg-gradient-to-r from-white via-jt-mint to-jt-lime"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="absolute bottom-8 font-sans text-[11px] uppercase tracking-widest text-white/50">
            Tap anywhere to skip
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
