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

  // ── Real stock on the shelves ──
  { src: '/hero/iphone-11-stock.jpg', alt: 'A spread of unlocked iPhone 11 units in every colour' },
  { src: '/hero/iphone-12-stock.jpg', alt: 'A batch of unlocked iPhone 12 units in every colour' },
  { src: '/hero/iphone-13-stock.jpg', alt: 'iPhone 13 units in pink, red, starlight and midnight' },
  { src: '/hero/iphone-13-pro-stock.jpg', alt: 'iPhone 13 Pro units in alpine green, graphite, sierra blue and gold' },
  { src: '/hero/iphone-15-pro-stock.jpg', alt: 'iPhone 15 Pro units, battery and Face ID tested' },
  { src: '/hero/iphone-17-pro-stock.jpg', alt: 'iPhone 17 Pro units in silver, deep blue and orange' },
  { src: '/hero/iphone-xr-stock.jpg', alt: 'A batch of unlocked iPhone XR units in every colour' },
  { src: '/hero/phone-shelves.jpg', alt: 'Shelves of tested iPhones ready for sale' },
  { src: '/hero/google-pixel-stock.jpg', alt: 'A batch of Google Pixel phones, Pixel 7 through Pixel 10' },
  { src: '/hero/google-pixel-colours.jpg', alt: 'Google Pixel phones fanned out in every colour' },
  { src: '/hero/galaxy-ultra-vs-iphone-pro.jpg', alt: 'A Samsung Galaxy Ultra standing next to an iPhone Pro' },

  // ── Newest Apple lineup ──
  { src: '/hero/iphone-18-pro.jpg', alt: 'iPhone 18 Pro in deep red' },
  { src: '/hero/iphone-18-lineup.jpg', alt: 'The iPhone 18 lineup: 18e, 18, Air 2, Pro and Pro Max' },
  { src: '/hero/iphone-air-2.jpg', alt: 'iPhone Air 2 in lavender' },

  // ── Laptops, screens and parts ──
  { src: '/hero/surface-laptop-studio.jpg', alt: 'A Surface Laptop Studio open on a desk' },
  { src: '/hero/curved-monitor.jpg', alt: 'A curved widescreen monitor being set up' },
  { src: '/hero/laptop-ssds.jpg', alt: 'A pile of laptop SSDs ready for storage upgrades' },

  // ── Gaming ──
  { src: '/hero/ps5-console-boxed.jpg', alt: 'A PlayStation 5 unboxed with its controller and cables' },
  { src: '/hero/gaming-chair-desk.jpg', alt: 'A gaming chair and desk setup' },

  // ── New Age power and cables ──
  { src: '/hero/newage-power-bank-range.jpg', alt: 'The New Age power bank range: Turbo Ultra 6, Heavy Duty Nano and Heavy Duty' },
  { src: '/hero/newage-power-banks-available.jpg', alt: 'New Age Turbo Ultra 3 and Y107 Pro Max power banks with a Connect Prime 9 cable' },
  { src: '/hero/newage-perfect-pair.jpg', alt: 'A New Age Y107 Pro Max power bank paired with a Connect Prime 11 Duo cable' },
  { src: '/hero/newage-jump-starter.jpg', alt: 'A New Age jump starter reviving a car battery' },
  { src: '/hero/newage-connect-prime-11-duo-orange.jpg', alt: 'New Age Connect Prime 11 Duo, a 65W two-in-one charging cable' },
  { src: '/hero/newage-connect-prime-11-duo-silver.jpg', alt: 'New Age Connect Prime 11 Duo 65W braided cable' },
  { src: '/hero/newage-connect-prime-11-duo-black.jpg', alt: 'New Age Connect Prime 11 Duo with Type C and Lightning ends' },
  { src: '/hero/newage-connect-prime-11-27w.jpg', alt: 'New Age Connect Prime 11 27W Type C to Lightning cable with its box' },
  { src: '/hero/itel-power-go-pro.jpg', alt: 'An itel Energy Power Go Pro portable power station' },

  // ── Feature phones ──
  { src: '/hero/itel-it2160-phones.jpg', alt: 'Boxes of itel it2160 feature phones with wireless FM' },
  { src: '/hero/itel-it5627-metal-phones.jpg', alt: 'itel it5627 Metal feature phones with 70 day standby' },
  { src: '/hero/tecno-t302-phones.jpg', alt: 'Tecno T302 feature phones in their boxes' },

  // ── Budget Android and sealed stock ──
  { src: '/hero/redmi-a7-and-17.jpg', alt: 'Redmi A7 and Redmi 17 phones stacked above itel power stations' },
  { src: '/hero/redmi-17-stock.jpg', alt: 'Redmi 17 phones stacked on itel Power Go Pro units' },
  { src: '/hero/sealed-phone-boxes.jpg', alt: 'A stack of sealed iPhone and Samsung boxes' },

  // ── More laptops ──
  { src: '/hero/macbook-air-open.jpg', alt: 'A MacBook Air open on a soft grey rug' },
  { src: '/hero/dell-laptops.jpg', alt: 'A stack of Dell business laptops' },
  { src: '/hero/surface-laptops-stacked.jpg', alt: 'Surface Laptops stacked, the top one running a game' },

  // ── oraimo and BoomBest audio ──
  { src: '/hero/oraimo-booming-bass-headphones.jpg', alt: 'oraimo Booming Bass wireless headphones' },
  { src: '/hero/oraimo-airbuds-3.jpg', alt: 'oraimo Airbuds 3, waterproof true wireless earbuds' },
  { src: '/hero/oraimo-necklace-lite-earphones.jpg', alt: 'oraimo Necklace Lite neckband earphones' },
  { src: '/hero/boombest-ln1116plus-speaker.jpg', alt: 'BoomBest LN-1116Plus wireless speakers' },
  { src: '/hero/boombest-ln5316bt-speaker.jpg', alt: 'BoomBest LN-5316BT wireless speakers' },
  { src: '/hero/boombest-ln1028ant-speaker.jpg', alt: 'BoomBest LN-1028ANT wireless speakers with TF and USB' },

  // ── itel power stations ──
  { src: '/hero/itel-power-go-display.jpg', alt: 'itel Energy Power Go and Power Go Pro power stations on display' },

  // ── Infinix ──
  { src: '/hero/infinix-smart-10.jpg', alt: 'Infinix Smart 10 in silver and black' },
  { src: '/hero/infinix-note-50-pro.jpg', alt: 'Infinix Note 50 Pro in purple' },
  { src: '/hero/infinix-note-60-pro.jpg', alt: 'Infinix Note 60 Pro in orange' },
  { src: '/hero/infinix-note-edge.jpg', alt: 'Infinix Note Edge 5G' },

  // ── JBL and oraimo audio ──
  { src: '/hero/jbl-partybox.jpg', alt: 'A JBL PartyBox speaker with its ring lights lit' },
  { src: '/hero/jbl-charge-5-boxes.jpg', alt: 'JBL Charge 5 speakers boxed in red, blue and camo' },
  { src: '/hero/jbl-go-3.jpg', alt: 'JBL Go 3, a pocket-sized waterproof Bluetooth speaker' },
  { src: '/hero/oraimo-spacebuds.jpg', alt: 'oraimo SpaceBuds with hybrid noise cancelling' },
  { src: '/hero/oraimo-earbuds-black.jpg', alt: 'oraimo wireless earbuds in their charging case' },
  { src: '/hero/oraimo-necklace-2.jpg', alt: 'oraimo Necklace 2 neckband earphones with their box' },

  // ── Inverters and solar ──
  { src: '/hero/itel-inverter-installed.jpg', alt: 'An itel inverter and ESS battery installed on a wall' },
  { src: '/hero/itel-4kw-inverter.jpg', alt: 'An itel 4kW Pro hybrid inverter' },
  { src: '/hero/itel-solar-kit.jpg', alt: 'An itel Energy solar panel beside its battery unit' },
  { src: '/hero/solar-panels-stacked.jpg', alt: 'Solar panels lined up ready for installation' },
  { src: '/hero/colasolar-generator.jpg', alt: 'A ColaSolar portable solar generator' },

  // ── itel power banks and chargers ──
  { src: '/hero/itel-power-go-100000mah.jpg', alt: 'The itel Power Go, a 100,000mAh portable power station' },
  { src: '/hero/itel-power-go-130w.jpg', alt: 'The itel Power Go delivering 130W of portable power' },
  { src: '/hero/itel-power-supply-family.jpg', alt: 'The itel power bank and wall charger range' },
  { src: '/hero/apple-charger-cable.jpg', alt: 'A 20W USB-C charger with a Lightning cable' },
];
