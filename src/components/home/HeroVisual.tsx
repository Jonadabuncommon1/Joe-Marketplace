import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Star, Truck, Wrench } from 'lucide-react';
import { heroShots, HeroShot } from './heroShots';

/** How long each shot holds before the next one slides in. */
const HOLD_MS = 3800;

/** Length of the slide itself, and how long the outgoing shot is kept around. */
const SLIDE_MS = 650;

/**
 * Hero art: real product shots sliding through a single frame, with a few
 * floating trust badges over them. It replaced a static CSS phone/laptop
 * mockup, which in turn replaced an animated canvas scene that ran a
 * continuous requestAnimationFrame simulation on every visit and was the main
 * thing making the homepage feel heavy on slower devices.
 *
 * So the slideshow is deliberately cheap: at most two shots are in the DOM at
 * once (never all 32), exactly one more is warmed ahead of them, nothing loads
 * or ticks below `lg` where the art is hidden anyway, a background tab doesn't
 * advance, and the movement is transform/opacity only so it stays on the
 * compositor.
 *
 * The outgoing shot is dropped on a timer rather than on an animation-complete
 * callback, and that is deliberate. Browsers throttle requestAnimationFrame to
 * a standstill for occluded windows while `document.hidden` stays false, so an
 * animation-driven cleanup can simply never fire and leave slides piling up in
 * the DOM. Timers keep running in that state, so the two-slot ceiling holds
 * whether or not the animations themselves ever get to play.
 */

/** Fisher-Yates over the shot indices. */
function shuffleIndices(length: number): number[] {
  const order = Array.from({ length }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

/**
 * A running order for the next lap. Reshuffling on its own would still let a
 * lap open on the shot the last one closed with, so the head gets swapped away
 * when that happens: no shot ever follows itself, and the sequence genuinely
 * differs every time round.
 */
function nextDeck(length: number, lastShown?: number): number[] {
  const order = shuffleIndices(length);
  if (order.length > 1 && order[0] === lastShown) {
    const swap = 1 + Math.floor(Math.random() * (order.length - 1));
    [order[0], order[swap]] = [order[swap], order[0]];
  }
  return order;
}

export const HeroVisual: React.FC<{ className?: string }> = ({ className = '' }) => {
  const reduceMotion = useReducedMotion();

  // HomeView only renders this from `lg` up, so on phones we skip the timer and
  // every image request rather than animating something nobody can see.
  const [isWide, setIsWide] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e: MediaQueryListEvent) => setIsWide(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const deckRef = useRef({ order: nextDeck(heroShots.length), pos: 0 });

  /** What the frame is showing: the shot sliding in, and the one sliding out. */
  const [frame, setFrame] = useState<{ current: HeroShot; outgoing: HeroShot | null; lap: number }>(
    () => ({ current: heroShots[deckRef.current.order[0]], outgoing: null, lap: 0 }),
  );

  useEffect(() => {
    if (!isWide) return;
    const id = window.setInterval(() => {
      // A background tab shouldn't burn through the deck, or pull down images
      // for slides nobody is looking at.
      if (document.hidden) return;

      const { order, pos } = deckRef.current;
      const leaving = heroShots[order[pos]];
      deckRef.current =
        pos + 1 < order.length
          ? { order, pos: pos + 1 }
          : { order: nextDeck(order.length, order[pos]), pos: 0 };

      const { order: nextOrder, pos: nextPos } = deckRef.current;
      setFrame((f) => ({ current: heroShots[nextOrder[nextPos]], outgoing: leaving, lap: f.lap + 1 }));
    }, HOLD_MS);
    return () => window.clearInterval(id);
  }, [isWide]);

  // Retire the outgoing shot once it has had time to slide away, so the frame
  // never holds more than the two slots.
  useEffect(() => {
    if (!frame.outgoing) return;
    const id = window.setTimeout(
      () => setFrame((f) => (f.lap === frame.lap ? { ...f, outgoing: null } : f)),
      SLIDE_MS,
    );
    return () => window.clearTimeout(id);
  }, [frame.lap, frame.outgoing]);

  // Warm exactly one shot ahead, so a slide never lands on a blank frame and
  // there are never more than two of these in flight.
  useEffect(() => {
    if (!isWide) return;
    const { order, pos } = deckRef.current;
    if (pos + 1 >= order.length) return;
    const img = new Image();
    img.src = heroShots[order[pos + 1]].src;
  }, [isWide, frame.lap]);

  return (
    <div className={`relative mx-auto w-full max-w-[420px] ${className}`}>
      {/* Soft color wash behind the frame, cheap radial blurs instead of a canvas glow */}
      <div className="pointer-events-none absolute -top-10 right-0 h-64 w-64 rounded-full bg-jt-blue/20 blur-[70px] dark:bg-jt-blue/25" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-52 w-52 rounded-full bg-jt-mint/20 blur-[60px] dark:bg-jt-mint/15" />

      {/* Slideshow frame. Shots are contained rather than cropped, because a
          good few of them carry their own printed specs near the edges. */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/15 bg-white shadow-2xl dark:border-white/10 dark:bg-jt-ink-soft">
        {frame.outgoing && (
          <motion.img
            key={`out-${frame.lap}`}
            src={frame.outgoing.src}
            alt=""
            aria-hidden="true"
            decoding="async"
            initial={{ opacity: 1, x: '0%' }}
            animate={reduceMotion ? { opacity: 0 } : { opacity: 0, x: '-32%' }}
            transition={{ duration: SLIDE_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full object-contain p-6"
          />
        )}
        <motion.img
          key={`in-${frame.lap}`}
          src={frame.current.src}
          alt={frame.current.alt}
          decoding="async"
          initial={frame.lap === 0 ? false : reduceMotion ? { opacity: 0 } : { opacity: 0, x: '32%' }}
          animate={{ opacity: 1, x: '0%' }}
          transition={{ duration: SLIDE_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-contain p-6"
        />
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
