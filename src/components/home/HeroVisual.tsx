import React from 'react';
import { Battery, Star, Truck, Wifi, Wrench } from 'lucide-react';

/**
 * Static hero art: a phone + laptop mockup with a couple of floating trust
 * badges, built entirely from CSS/SVG. Replaces the old animated isometric
 * canvas scene (IsoHeroScene) — that scene ran a continuous requestAnimationFrame
 * simulation (particles, glowing conduits, ~90 ambient motes) on every visit,
 * which was the main thing making the homepage feel heavy on slower devices
 * and connections. This costs one paint and stays that way; the only motion
 * is two long, cheap CSS float loops, both already gated on
 * prefers-reduced-motion in index.css.
 */
export const HeroVisual: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative mx-auto w-full max-w-[420px] ${className}`} aria-hidden="true">
      {/* Soft color wash behind the mockup, cheap radial blurs instead of a canvas glow */}
      <div className="pointer-events-none absolute -top-10 right-0 h-64 w-64 rounded-full bg-jt-blue/20 blur-[70px] dark:bg-jt-blue/25" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-52 w-52 rounded-full bg-jt-mint/20 blur-[60px] dark:bg-jt-mint/15" />

      {/* Laptop card, peeking out behind the phone */}
      <div className="animate-floating-delayed absolute right-2 top-10 w-[78%] rounded-2xl border border-jt-ink/10 bg-white/90 p-3 shadow-xl backdrop-blur dark:border-white/10 dark:bg-jt-ink-soft/90 sm:top-14">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-jt-blue/40" />
          <span className="h-2 w-2 rounded-full bg-jt-mint/50" />
          <span className="h-2 w-2 rounded-full bg-jt-ink/15 dark:bg-white/20" />
        </div>
        <div className="mt-3 h-24 w-full rounded-xl bg-gradient-to-br from-jt-blue/15 to-jt-mint/10 dark:from-jt-blue/25 dark:to-jt-mint/15" />
        <div className="mt-3 h-2 w-3/4 rounded-full bg-jt-ink/10 dark:bg-white/15" />
        <div className="mt-2 h-2 w-1/2 rounded-full bg-jt-ink/10 dark:bg-white/15" />
      </div>

      {/* Phone card, main focal shape */}
      <div className="animate-floating relative ml-auto w-[64%] rounded-[2rem] border border-jt-ink/10 bg-white p-3 shadow-2xl dark:border-white/10 dark:bg-jt-ink-soft">
        <div className="mx-auto mb-2 h-1.5 w-10 rounded-full bg-jt-ink/15 dark:bg-white/20" />
        <div className="aspect-[9/16] w-full overflow-hidden rounded-[1.4rem] bg-gradient-to-b from-jt-blue to-jt-blue-deep">
          <div className="flex h-full flex-col justify-between p-4">
            <div className="flex items-center justify-between text-white/80">
              <Wifi className="h-3.5 w-3.5" />
              <Battery className="h-3.5 w-3.5" />
            </div>
            <div>
              <div className="mb-2 h-16 w-16 rounded-2xl bg-white/15 backdrop-blur" />
              <div className="h-2 w-20 rounded-full bg-white/30" />
              <div className="mt-2 h-2 w-14 rounded-full bg-white/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating trust badges */}
      <div className="animate-floating absolute -left-4 top-2 flex items-center gap-2 rounded-full border border-jt-ink/10 bg-white px-3.5 py-2 shadow-lg dark:border-white/10 dark:bg-jt-ink-soft sm:-left-8">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-jt-mint/15 text-jt-mint">
          <Star className="h-3.5 w-3.5 fill-current" />
        </span>
        <div className="leading-none">
          <p className="text-xs font-bold text-jt-ink dark:text-white">4.9 rated</p>
          <p className="mt-0.5 text-[10px] text-jt-ink/50 dark:text-jt-steel">by real customers</p>
        </div>
      </div>

      <div className="animate-floating-delayed absolute -bottom-4 -left-2 flex items-center gap-2 rounded-full border border-jt-ink/10 bg-white px-3.5 py-2 shadow-lg dark:border-white/10 dark:bg-jt-ink-soft sm:-left-6">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-jt-blue/15 text-jt-blue dark:text-jt-mint">
          <Wrench className="h-3.5 w-3.5" />
        </span>
        <p className="text-xs font-bold text-jt-ink dark:text-white">Free diagnosis</p>
      </div>

      <div className="animate-floating absolute -right-3 bottom-8 flex items-center gap-2 rounded-full border border-jt-ink/10 bg-white px-3.5 py-2 shadow-lg dark:border-white/10 dark:bg-jt-ink-soft sm:-right-6">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-jt-blue/15 text-jt-blue dark:text-jt-mint">
          <Truck className="h-3.5 w-3.5" />
        </span>
        <p className="text-xs font-bold text-jt-ink dark:text-white">Nationwide delivery</p>
      </div>
    </div>
  );
};
