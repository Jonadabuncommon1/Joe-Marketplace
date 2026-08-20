import React from 'react';
import {
  Armchair,
  Backpack,
  BatteryCharging,
  Cable,
  Droplets,
  Fan,
  Gamepad2,
  Gauge,
  HardDrive,
  Headphones,
  Keyboard,
  Laptop,
  MemoryStick,
  Monitor,
  Mouse,
  Package,
  Plug,
  ShieldCheck,
  Smartphone,
  Square,
  Sun,
  Table,
  Tablet,
  Usb,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react';

/**
 * Explicit registry rather than `import * as Icons`, a namespace import pulls
 * the entire Lucide set into the bundle.
 */
const ICONS: Record<string, LucideIcon> = {
  Armchair,
  Backpack,
  BatteryCharging,
  Cable,
  Droplets,
  Fan,
  Gamepad2,
  Gauge,
  HardDrive,
  Headphones,
  Keyboard,
  Laptop,
  MemoryStick,
  Monitor,
  Mouse,
  Plug,
  ShieldCheck,
  Smartphone,
  Square,
  Sun,
  Table,
  Tablet,
  Usb,
  Wrench,
  Zap,
};

export const GadgetIcon: React.FC<{ name?: string; className?: string }> = ({
  name,
  className = 'h-6 w-6',
}) => {
  const Icon = (name && ICONS[name]) || Package;
  return <Icon className={className} strokeWidth={1.6} />;
};

/** Deterministic tint per product id, so a given product always looks the same. */
const TINTS = [
  'from-[#3626a7]/12 to-[#657ed4]/12',
  'from-[#657ed4]/14 to-[#3626a7]/10',
  'from-[#ff331f]/14 to-[#657ed4]/12',
  'from-[#657ed4]/14 to-[#3626a7]/10',
];

function tintFor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  return TINTS[Math.abs(hash) % TINTS.length];
}

interface ProductImageProps {
  src?: string;
  alt: string;
  icon?: string;
  /** Used to pick a stable placeholder tint. */
  seed?: string;
  className?: string;
  iconClassName?: string;
}

/**
 * Shows the real product photo when there is one, and a branded illustrated
 * tile when there is not, so an unstocked catalog never renders broken images.
 */
export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  icon,
  seed = alt,
  className = '',
  iconClassName = 'h-16 w-16',
}) => {
  const [failed, setFailed] = React.useState(false);
  const showPhoto = Boolean(src) && !failed;

  if (showPhoto) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br ${tintFor(
        seed,
      )} ${className}`}
    >
      {/* Faint circuit grid gives the tile some texture */}
      <div className="absolute inset-0 circuit-grid opacity-50" />
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-jt-blue/10 blur-2xl" />
      <GadgetIcon
        name={icon}
        className={`relative z-10 text-jt-blue/70 dark:text-jt-steel ${iconClassName}`}
      />
    </div>
  );
};
