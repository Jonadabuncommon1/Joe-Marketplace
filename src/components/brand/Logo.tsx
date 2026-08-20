import React from 'react';

/**
 * The Joe Tech mark.
 *
 * This is Joe's own artwork (`public/Logo.PNG`), cropped to the squircle with
 * the navy backdrop masked out so it sits cleanly on light and dark surfaces.
 * See `scripts/` notes in the README for how the derived sizes are produced.
 */
export const LogoMark: React.FC<{ className?: string; title?: string }> = ({
  className = 'h-10 w-10',
  title = 'Joe Tech',
}) => (
  <img
    src="/logo-mark.png"
    alt={title}
    width={512}
    height={512}
    className={`object-contain ${className}`}
  />
);

/**
 * The full "Main Logo" lockup — mark plus wordmark, as one image.
 *
 * Joe's artwork ships as a single PNG on a dark navy backdrop, so it is
 * extracted to transparency in two tints: the wordmark is white for dark
 * surfaces and ink for light ones. Both are rendered and swapped by theme
 * rather than filtered, because a CSS filter would recolour the blue mark too.
 */
export const LogoLockup: React.FC<{ className?: string; title?: string }> = ({
  className = 'h-9',
  title = 'Joe Tech',
}) => (
  <span className={`relative inline-block ${className}`} style={{ aspectRatio: '1708 / 565' }}>
    <img
      src="/brand/joe-tech-logo-dark.png"
      alt={title}
      width={1708}
      height={565}
      className="absolute inset-0 h-full w-full object-contain object-left dark:hidden"
    />
    <img
      src="/brand/joe-tech-logo.png"
      alt=""
      aria-hidden="true"
      width={1708}
      height={565}
      className="absolute inset-0 hidden h-full w-full object-contain object-left dark:block"
    />
  </span>
);

interface LogoProps {
  /** Hide the "Joe Tech" wordmark and show the squircle alone. */
  markOnly?: boolean;
  className?: string;
  markClassName?: string;
  /** Wordmark colour. 'auto' follows the current text colour. */
  tone?: 'auto' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: { mark: 'h-8 w-8', text: 'text-xl' },
  md: { mark: 'h-10 w-10', text: 'text-2xl' },
  lg: { mark: 'h-16 w-16', text: 'text-4xl' },
};

export const Logo: React.FC<LogoProps> = ({
  markOnly = false,
  className = '',
  markClassName,
  tone = 'auto',
  size = 'md',
}) => {
  const s = sizes[size];
  const toneClass =
    tone === 'light' ? 'text-white' : tone === 'dark' ? 'text-jt-ink' : 'text-jt-ink dark:text-white';

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={markClassName ?? s.mark} />
      {!markOnly && (
        <span
          className={`font-display font-semibold leading-none tracking-tight ${s.text} ${toneClass}`}
        >
          Joe Tech
        </span>
      )}
    </span>
  );
};
