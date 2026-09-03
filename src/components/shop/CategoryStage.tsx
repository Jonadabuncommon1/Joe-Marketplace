import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { GadgetIcon } from '../ui/ProductImage';

interface CategoryStageProps {
  /** Real product photos for this category, already deduped/capped by the caller. */
  images: string[];
  gradient: string;
  icon: string;
  className?: string;
  /** How long each photo stays on screen before crossfading to the next. */
  intervalMs?: number;
  /** Size of the centred icon on the no-photos-yet fallback. */
  fallbackIconClassName?: string;
}

/**
 * The category "hero" tile: a slideshow of real product photos when a
 * category has any, falling back to the original flat gradient + centred
 * icon when it does not (a brand-new category, or one with no images
 * uploaded yet).
 *
 * Used by both the categories grid (CategoriesView) and a single category's
 * banner (CategoryView) so the two stay visually consistent.
 */
export const CategoryStage: React.FC<CategoryStageProps> = ({
  images,
  gradient,
  icon,
  className = '',
  intervalMs = 3800,
  fallbackIconClassName = 'h-20 w-20',
}) => {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const photos = images.slice(0, 5);

  useEffect(() => {
    setIndex(0);
  }, [photos.length, photos[0]]);

  useEffect(() => {
    if (photos.length <= 1 || reduceMotion || paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % photos.length), intervalMs);
    return () => clearInterval(id);
  }, [photos.length, intervalMs, reduceMotion, paused]);

  if (photos.length === 0) {
    // No product photos yet for this category, keep the original look.
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} ${className}`}
      >
        <div className="absolute inset-0 circuit-grid opacity-25" />
        <GadgetIcon name={icon} className={`relative text-white/95 drop-shadow-lg ${fallbackIconClassName}`} />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-jt-ink ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={photos[index]}
          src={photos[index]}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {/* Brand-tinted wash so the category colour identity survives the photo,
          plus a dark base so light-coloured product shots stay legible. */}
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${gradient} opacity-25`} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
      <div className="pointer-events-none absolute inset-0 circuit-grid opacity-10" />

      {/* Icon watermark, small now that a real photo carries the tile. */}
      <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-xl bg-black/30 text-white backdrop-blur-sm">
        <GadgetIcon name={icon} className="h-4 w-4" />
      </span>

      {/* Progress dots, decorative only, not a control */}
      {photos.length > 1 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
          {photos.map((src, i) => (
            <span
              key={src + i}
              className={`h-1.5 rounded-full bg-white transition-all duration-500 ${
                i === index ? 'w-4 opacity-95' : 'w-1.5 opacity-40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryStage;
