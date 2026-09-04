/**
 * Stills for the hero slideshow, served straight out of /public/hero.
 *
 * The order below is just how the list reads, never the running order — the
 * hero deals itself a freshly shuffled deck on every lap (see HeroVisual), so
 * the same two shots never keep following each other.
 */
export interface HeroShot {
  src: string;
  alt: string;
}

export const heroShots: HeroShot[] = [
  // Phones
  { src: '/hero/gadget-lineup.jpg', alt: 'Phones, tablets, consoles, speakers and headphones lined up together' },
  { src: '/hero/iphone-16-series.jpg', alt: 'The iPhone 16 series' },
  { src: '/hero/samsung-galaxy-s24-ultra.jpg', alt: 'Samsung Galaxy S24 Ultra in titanium black' },
  { src: '/hero/samsung-galaxy-s26-ultra.jpg', alt: 'Samsung Galaxy S26 Ultra' },
  { src: '/hero/samsung-galaxy-s10.jpg', alt: 'Samsung Galaxy S10, front and back' },
  { src: '/hero/google-pixel-10a.jpg', alt: 'Google Pixel 10a in obsidian' },
  { src: '/hero/google-pixel-10-pro-xl.jpg', alt: 'Google Pixel 10 Pro XL' },

  // Tablets
  { src: '/hero/ipad-blue-boxed.jpg', alt: 'A blue iPad resting on its box' },
  { src: '/hero/ipad-10-9.jpg', alt: 'iPad 10.9 inch' },
  { src: '/hero/android-tablet.jpg', alt: 'An Android tablet, front and back' },

  // Laptops
  { src: '/hero/macbook-air-and-pro.jpg', alt: 'MacBook Air and MacBook Pro' },
  { src: '/hero/macbook-pro-touchbar.jpg', alt: 'MacBook Pro with Touch Bar' },
  { src: '/hero/macbook-pro-retina-i5.jpg', alt: 'MacBook Pro with Intel Core i5 and a Retina display' },
  { src: '/hero/windows-11-laptop.jpg', alt: 'A slim laptop running Windows 11' },
  { src: '/hero/surface-laptop.jpg', alt: 'A clean UK used laptop with its charger' },
  { src: '/hero/laptops-7th-gen.jpg', alt: 'Brand new 7th generation laptops' },

  // Gaming
  { src: '/hero/gaming-laptop-4k.jpg', alt: 'A gaming laptop running 4K graphics' },
  { src: '/hero/asus-rog-gaming-laptop.jpg', alt: 'An ASUS ROG gaming laptop lit in neon' },
  { src: '/hero/gaming-pc-setup.jpg', alt: 'A full gaming PC setup' },
  { src: '/hero/xbox-controller-shock-blue.jpg', alt: 'Xbox wireless controller in shock blue' },
  { src: '/hero/xbox-controller-carbon-black.jpg', alt: 'Xbox wireless controller in carbon black' },

  // Audio
  { src: '/hero/anker-soundcore-life-q30.jpg', alt: 'Anker Soundcore Life Q30 headphones' },
  { src: '/hero/anker-soundcore-space-2.jpg', alt: 'Anker Soundcore Space 2 noise cancelling headphones' },

  // Power
  { src: '/hero/power-bank-40000mah.jpg', alt: 'A 40,000mAh power bank charging a laptop and a phone' },
  { src: '/hero/portable-power-banks.jpg', alt: 'A range of portable power banks' },
  { src: '/hero/itel-power-tank.jpg', alt: 'An itel Power Tank solar generator' },
  { src: '/hero/cola-1000-pro-inverter.jpg', alt: 'Cola 1000-Pro inverter with 300W output' },
  { src: '/hero/bzet-solar-generator.jpg', alt: 'A Bzet solar generator' },

  // Solar
  { src: '/hero/solar-panels-roof.jpg', alt: 'Solar panels installed across a rooftop' },
  { src: '/hero/solar-panel-kit.jpg', alt: 'A solar panel kit' },

  // Accessories
  { src: '/hero/chargers-and-cables.jpg', alt: 'Fast chargers and braided charging cables' },
  { src: '/hero/phone-gimbal-stabilizer.jpg', alt: 'A handheld gimbal holding a phone for smooth video' },
];
