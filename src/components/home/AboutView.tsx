import React from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import {
  ShieldCheck,
  Heart,
  Star,
  Layers,
  Tag,
  CheckCircle,
  ChevronDown,
  Users,
  Smartphone,
  Laptop,
  Keyboard,
  Headphones,
  Sun,
  Gamepad2,
  Wifi,
  Monitor,
  Tablet,
  HardDrive,
  Zap,
  Battery,
  Cpu,
  Target,
  Compass,
} from 'lucide-react';
import { FaApple, FaAndroid, FaWindows, FaLinux, FaGamepad, FaSolarPanel } from 'react-icons/fa';
import { MdSolarPower, MdCable } from 'react-icons/md';
import { useAppContext } from '../../store/AppContext';

const heroBgIcons = [
  // Row 1
  { Icon: Laptop, top: '8%', left: '5%', size: 140, rotate: '-15deg' },
  { Icon: FaWindows, top: '6%', left: '20%', size: 160, rotate: '10deg' },
  { Icon: Sun, top: '4%', left: '36%', size: 180, rotate: '0deg' },
  { Icon: FaApple, top: '8%', left: '52%', size: 150, rotate: '-8deg' },
  { Icon: Cpu, top: '5%', left: '68%', size: 170, rotate: '20deg' },
  { Icon: FaAndroid, top: '7%', left: '84%', size: 145, rotate: '-5deg' },
  { Icon: Smartphone, top: '4%', left: '96%', size: 120, rotate: '12deg' },
  // Row 2
  { Icon: Monitor, top: '38%', left: '3%', size: 200, rotate: '8deg' },
  { Icon: FaLinux, top: '36%', left: '18%', size: 130, rotate: '-22deg' },
  { Icon: Battery, top: '40%', left: '33%', size: 155, rotate: '35deg' },
  { Icon: FaGamepad, top: '34%', left: '50%', size: 210, rotate: '-12deg' },
  { Icon: Wifi, top: '38%', left: '67%', size: 140, rotate: '18deg' },
  { Icon: MdSolarPower, top: '36%', left: '82%', size: 180, rotate: '-30deg' },
  { Icon: Tablet, top: '40%', left: '95%', size: 130, rotate: '5deg' },
  // Row 3
  { Icon: Zap, top: '72%', left: '8%', size: 160, rotate: '-10deg' },
  { Icon: FaApple, top: '70%', left: '22%', size: 220, rotate: '25deg' },
  { Icon: Laptop, top: '74%', left: '38%', size: 150, rotate: '-5deg' },
  { Icon: FaWindows, top: '68%', left: '55%', size: 175, rotate: '40deg' },
  { Icon: HardDrive, top: '72%', left: '70%', size: 140, rotate: '-18deg' },
  { Icon: FaAndroid, top: '70%', left: '86%', size: 165, rotate: '8deg' },
  { Icon: FaSolarPanel, top: '92%', left: '5%', size: 160, rotate: '12deg' },
  { Icon: Cpu, top: '90%', left: '25%', size: 130, rotate: '-25deg' },
  { Icon: MdCable, top: '93%', left: '50%', size: 120, rotate: '-15deg' },
  { Icon: Monitor, top: '90%', left: '78%', size: 140, rotate: '18deg' },
  { Icon: Headphones, top: '93%', left: '93%', size: 110, rotate: '-12deg' },
];

const supportMessage = `Hello 👋
Welcome to Joe Tech Customer Support.

Thank you for reaching out to us. Our support team is available to assist you with:
• General enquiries
• Product information
• Order support
• Delivery assistance
• Complaints or feedback
• Business enquiries

Kindly send us a message describing how we may assist you, and a representative will respond as soon as possible.

We appreciate your patience and thank you for choosing Joe Tech.

Precision, Quality, and Reliability at Its Finest.`;

const productDetails = [
  {
    title: 'iPhones & iPads',
    desc: 'Brand new and clean UK-used iPhones and iPads, battery-tested and iCloud-clear with a warranty.',
    icon: <Smartphone className="text-jt-blue dark:text-jt-mint" />,
  },
  {
    title: 'Android Phones',
    desc: 'Samsung, Google Pixel, Tecno, Infinix and Xiaomi, from flagship power to solid everyday budget phones.',
    icon: <Smartphone className="text-jt-blue dark:text-jt-mint" />,
  },
  {
    title: 'Laptops & Tablets',
    desc: 'MacBooks, business ultrabooks, gaming rigs and Android tablets, configured and ready to work.',
    icon: <Laptop className="text-jt-blue dark:text-jt-mint" />,
  },
  {
    title: 'Phone Accessories',
    desc: 'Chargers, power banks, earbuds, cases and screen protection, genuine parts only.',
    icon: <Headphones className="text-jt-blue dark:text-jt-mint" />,
  },
  {
    title: 'Laptop Accessories',
    desc: 'SSD and RAM upgrades, docking stations, keyboards, mice, cooling pads and bags.',
    icon: <Keyboard className="text-jt-blue dark:text-jt-mint" />,
  },
  {
    title: 'Gaming Monitors, Chairs & Table',
    desc: 'High-refresh monitors, ergonomic gaming chairs, tables and the accessories that finish the setup.',
    icon: <Gamepad2 className="text-jt-blue dark:text-jt-mint" />,
  },
  {
    title: 'Solar Machines & Devices',
    desc: 'Inverters, panels, lithium and tubular batteries, charge controllers and full solar kits.',
    icon: <Sun className="text-jt-blue dark:text-jt-mint" />,
  },
  {
    title: 'Repair & Maintenance Services',
    desc: 'Screens, batteries, charging ports, water damage and solar installation, diagnosed before you pay.',
    icon: <Zap className="text-jt-blue dark:text-jt-mint" />,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

export const AboutView = () => {
  const [activeProductIdx, setActiveProductIdx] = React.useState<number | null>(null);
  const { user, setCurrentView } = useAppContext();

  const commitments = [
    'Delivering authentic and quality products',
    'Maintaining excellent customer service',
    'Building long-term customer relationships',
    'Conducting business ethically and responsibly',
    'Continuously improving our services and operations',
  ];

  const reasons = [
    {
      icon: ShieldCheck,
      title: 'Quality Assurance',
      body: 'We are committed to offering products that meet high standards of quality and value.',
    },
    {
      icon: Heart,
      title: 'Customer Satisfaction',
      body: 'Our customers remain at the centre of everything we do. We aim to provide a seamless and satisfying shopping experience.',
    },
    {
      icon: Star,
      title: 'Reliability & Trust',
      body: 'We conduct our business with integrity, transparency, and professionalism.',
    },
    {
      icon: Layers,
      title: 'Diverse Product Range',
      body: 'From phones and laptops to solar power and gaming setups, we provide a broad selection under one trusted brand.',
    },
    {
      icon: Tag,
      title: 'Affordable Pricing',
      body: 'We aim to make quality products accessible at competitive and fair prices.',
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-24 pt-24 text-gray-900 transition-colors duration-500 dark:bg-[#0A0A0A] dark:text-gray-100">
      {/* Hero Banner */}
      <div className="relative mb-20 flex h-[55vh] min-h-[380px] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-jt-blue via-jt-blue-deep to-jt-ink px-4 text-center shadow-xl">
        {/* Scattered tech icons background */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" style={{ opacity: 0.12 }}>
          {heroBgIcons.map((item, index) => {
            const { Icon, top, left, size, rotate } = item;
            return (
              <div
                key={index}
                className="absolute text-white"
                style={{ top, left, transform: `translate(-50%, -50%) rotate(${rotate})` }}
              >
                <Icon size={size} />
              </div>
            );
          })}
        </div>

        {/* Ambient radial glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-jt-mint/15 filter blur-3xl" />

        {/* Modern Framed Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
          className="relative z-10 mb-6 flex h-32 w-32 items-center justify-center rounded-full border-2 border-jt-mint/40 bg-white/5 shadow-[0_0_35px_rgba(0,240,255,0.25)] backdrop-blur-md transition-transform duration-300 hover:scale-105 md:h-40 md:w-40"
        >
          <Users className="h-16 w-16 text-jt-mint drop-shadow-[0_0_12px_rgba(0,240,255,0.6)] md:h-20 md:w-20" strokeWidth={2.2} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative z-10 mb-2 text-xs font-bold uppercase tracking-[0.2em] text-jt-mint"
        >
          About Us
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Joe Tech
        </motion.h1>
      </div>

      <div className="mx-auto max-w-5xl space-y-20 px-4 sm:px-6 lg:px-8">
        {/* Who We Are */}
        <section className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-jt-blue dark:text-jt-mint">
              Who We Are
            </span>
            <h2 className="mb-6 font-display text-3xl font-bold leading-tight text-gray-900 dark:text-white">
              A Dynamic, Customer-Focused Business
            </h2>
            <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300">
              <strong>Joe Tech</strong> is a customer-focused gadget store with branches in Nsukka, Enugu State, and Ikeja, Lagos State. We sell phones, laptops, gaming gear, and solar power, and we repair them too, priding ourselves on value, authenticity, and customer satisfaction in every transaction.
            </p>
            <p className="leading-relaxed text-gray-600 dark:text-gray-300">
              Our company operates with professionalism, integrity, and a strong commitment to excellence, serving individuals, families, and businesses with a wide range of products tailored to modern lifestyle and everyday needs.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="circuit-grid relative overflow-hidden rounded-3xl border border-jt-blue/15 bg-jt-paper/50 p-8 dark:bg-white/5"
          >
            <div className="relative z-10 grid grid-cols-2 gap-4 text-center sm:gap-6">
              {[
                { value: '8', label: 'Product Categories' },
                { value: '2', label: 'Branches in Nigeria' },
                { value: '100%', label: 'Tested Before Sale' },
                { value: 'WhatsApp', label: 'Order & Support', isLink: true },
              ].map((stat) =>
                stat.isLink ? (
                  <a
                    key={stat.label}
                    href={`https://wa.me/2348133727813?text=${encodeURIComponent(supportMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (!user) {
                        e.preventDefault();
                        setCurrentView('auth');
                      }
                    }}
                    className="block cursor-pointer rounded-2xl border border-jt-blue/10 bg-white p-5 text-center shadow-sm transition-transform hover:scale-105 hover:border-jt-blue dark:border-white/10 dark:bg-jt-ink-soft"
                  >
                    <p className="font-display text-2xl font-bold text-jt-blue dark:text-jt-mint">{stat.value}</p>
                    <p className="mt-1 text-xs font-medium text-gray-500 dark:text-jt-steel">{stat.label}</p>
                  </a>
                ) : (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-jt-blue/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-jt-ink-soft"
                  >
                    <p className="font-display text-2xl font-bold text-jt-blue dark:text-jt-mint">{stat.value}</p>
                    <p className="mt-1 text-xs font-medium text-gray-500 dark:text-jt-steel">{stat.label}</p>
                  </div>
                )
              )}
            </div>
          </motion.div>
        </section>

        {/* Products & Services */}
        <section>
          <div className="mb-10 text-center">
            <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-jt-blue dark:text-jt-mint">
              What We Offer
            </span>
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white">Our Products &amp; Services</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-500 dark:text-jt-steel">
              We offer carefully selected products and services across various categories, combining quality, durability, style, and affordability.
            </p>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {productDetails.map((item, idx) => {
              const isExpanded = activeProductIdx === idx;
              return (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  onClick={() => setActiveProductIdx(isExpanded ? null : idx)}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all duration-300 md:p-5 ${
                    isExpanded
                      ? 'scale-[1.01] border-jt-blue bg-jt-blue/5 shadow-md dark:bg-jt-blue/20'
                      : 'border-gray-200 bg-white hover:border-jt-blue/50 hover:shadow-sm dark:border-white/10 dark:bg-jt-ink-soft'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-gray-100 md:text-base">
                        {item.title}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-400 dark:text-jt-steel"
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 border-l-2 border-jt-blue pl-8 text-xs leading-relaxed text-gray-600 dark:text-gray-300 md:text-sm">
                          {item.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
          {/* Mission Card */}
          <div className="relative overflow-hidden rounded-3xl border border-jt-blue/20 bg-white p-8 shadow-lg transition-all duration-300 hover:scale-[1.01] dark:bg-jt-ink-soft">
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-jt-blue/10 text-jt-blue dark:bg-jt-mint/10 dark:text-jt-mint">
                <Target size={20} />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-jt-blue dark:text-jt-mint">Our Mission</span>
            </div>
            <p className="text-sm font-normal leading-relaxed text-gray-700 dark:text-gray-300 md:text-base">
              To provide high-quality phones, laptops, gaming gear, and solar power, backed by honest repairs and dependable service. At <strong>Joe Tech</strong>, we are committed to delivering real value on every purchase while maintaining professionalism, customer satisfaction, and integrity in everything we do.
            </p>
          </div>

          {/* Vision Card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-jt-blue to-jt-blue-deep p-8 text-white shadow-xl transition-all duration-300 hover:scale-[1.01]">
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-jt-mint">
                <Compass size={20} />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-jt-mint">Our Vision</span>
            </div>
            <p className="text-sm font-normal leading-relaxed text-white/90 md:text-base">
              To become Nigeria's most trusted name for gadgets and device repairs, known for genuine products, fair prices, and technicians people actually recommend to their friends and family.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section>
          <div className="mb-10 text-center">
            <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-jt-blue dark:text-jt-mint">
              Why Choose Us
            </span>
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white">Why Customers Trust Joe Tech</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r) => (
              <div
                key={r.title}
                className="group rounded-2xl border border-gray-200/80 bg-white p-6 transition-all hover:border-jt-blue/40 hover:shadow-md dark:border-white/10 dark:bg-jt-ink-soft"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-jt-blue/10 transition-colors group-hover:bg-jt-blue dark:bg-white/5">
                  <r.icon size={22} className="text-jt-blue transition-colors group-hover:text-white dark:text-jt-mint" />
                </div>
                <h3 className="mb-2 font-display text-base font-bold text-gray-900 dark:text-white">{r.title}</h3>
                <p className="text-xs leading-relaxed text-gray-600 dark:text-jt-steel sm:text-sm">{r.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Commitment */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-jt-blue via-jt-blue to-jt-blue-deep p-8 text-white shadow-xl md:p-12">
          {/* Scattered tech icons background */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" style={{ opacity: 0.12 }}>
            {heroBgIcons.map((item, index) => {
              const { Icon, top, left, size, rotate } = item;
              return (
                <div
                  key={index}
                  className="absolute text-white"
                  style={{ top, left, transform: `translate(-50%, -50%) rotate(${rotate})` }}
                >
                  <Icon size={size} />
                </div>
              );
            })}
          </div>

          <div className="relative z-10 mb-8 text-center">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-jt-mint">Our Commitment</span>
            <h2 className="font-display text-3xl font-bold text-white">What We Stand For</h2>
          </div>
          <div className="relative z-10 mx-auto max-w-xl space-y-3">
            {commitments.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-3.5 shadow-sm backdrop-blur-md"
              >
                <CheckCircle size={18} className="mt-0.5 flex-shrink-0 text-jt-mint" />
                <span className="text-xs font-semibold text-white sm:text-sm">{item}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};