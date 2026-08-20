import React from 'react';
import { Phone, Mail, MapPin, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';
import { branches, site, waLink } from '../../config/site';

const supportMessage = `Hello,
Welcome to Joe Tech Customer Support.

Thank you for reaching out to us. Our support team is available to assist you with:
- General enquiries
- Product information
- Order support
- Delivery assistance
- Complaints or feedback
- Business enquiries

Kindly send us a message describing how we may assist you, and a representative will respond as soon as possible.

We appreciate your patience and thank you for choosing Joe Tech.`;

export const ContactView = () => {
  const { goBack } = useAppContext();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white dark:bg-jt-ink text-gray-900 dark:text-gray-100 transition-colors duration-500 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-start mb-6">
        <button
          onClick={() => {
            goBack();
            window.scrollTo(0, 0);
          }}
          className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-800 dark:text-white hover:brand-text transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>
      </div>
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-display text-gray-900 dark:text-white mb-4">Get in Touch</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          Questions about a product, an order, or a repair? Our team is a call, message, or visit away.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20 text-center">
        <div className="border border-gray-200 dark:border-gray-800 bg-[#ece9fa]/50 dark:bg-[#3626a7]/5 p-8 flex flex-col items-center rounded-2xl shadow-sm">
          <Phone className="brand-text dark:text-jt-mint mb-6" size={32} />
          <h3 className="font-display text-xl mb-4 text-gray-900 dark:text-gray-100">WhatsApp Support</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-1 text-center">Instant help with orders, products, and repairs.</p>
          <div className="flex flex-col space-y-3 items-center">
            <a
              href={waLink(supportMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="uppercase tracking-widest text-xs font-semibold brand-text dark:text-jt-mint hover:text-[#281c7d] dark:hover:text-[#22e03e] transition-colors pb-1 border-b border-gray-300 dark:border-gray-700 hover:border-[#3626a7] dark:hover:border-jt-mint inline-block"
            >
              08133727813
            </a>
          </div>
        </div>

        <a
          href={`mailto:${site.email}`}
          className="border border-gray-200 dark:border-gray-800 bg-[#ece9fa]/50 dark:bg-[#3626a7]/5 p-8 flex flex-col items-center hover:border-[#3626a7] dark:hover:border-jt-mint hover:scale-[1.02] transition-all rounded-2xl cursor-pointer block decoration-transparent group shadow-sm"
        >
          <Mail className="brand-text dark:text-jt-mint mb-6" size={32} />
          <h3 className="font-display text-xl mb-4 text-gray-900 dark:text-gray-100">Email</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-1">For orders, repairs, and general enquiries.</p>
          <span className="lowercase text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:brand-text dark:group-hover:text-[#281c7d] transition-colors pb-1 border-b border-gray-300 dark:border-gray-700 group-hover:border-[#3626a7] dark:group-hover:border-[#281c7d] inline-block whitespace-nowrap">
            {site.email}
          </span>
        </a>

        {branches.map((b) => (
          <div
            key={b.id}
            className="border border-gray-200 dark:border-gray-800 bg-[#ece9fa]/50 dark:bg-[#3626a7]/5 p-8 flex flex-col items-center hover:border-[#3626a7] dark:hover:border-jt-mint transition-all rounded-2xl shadow-sm"
          >
            <MapPin className="brand-text dark:text-jt-mint mb-6" size={32} />
            <h3 className="font-display text-xl mb-4 text-gray-900 dark:text-gray-100">{b.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-1">Open {b.hours}.</p>
            <span className="text-xs font-semibold text-gray-900 dark:text-gray-100 px-2 leading-relaxed">
              {b.street}, {b.city}, {b.state}
            </span>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto mb-20 text-left space-y-6">
        <h2 className="text-3xl font-display text-gray-900 dark:text-white mb-6 border-b dark:border-gray-800 pb-4">Customer Care</h2>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Our Commitment</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Joe Tech sells phones, laptops, gaming gear, and solar equipment, and repairs them too. We aim to make
          buying and fixing your devices straightforward, honest, and quick.
        </p>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Before You Buy</h3>
        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
          <li>Every phone and laptop is tested before it is listed, and again before it leaves the shop</li>
          <li>Condition (Brand New or UK Used) is stated clearly on every product</li>
          <li>Prices are fixed and shown upfront, no hidden charges at checkout</li>
          <li>Come see the device in person at either branch before you pay, if you prefer</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">After You Buy</h3>
        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
          <li>Warranty on phones, laptops, and repairs</li>
          <li>Free diagnosis on any repair, with a quote before we touch the device</li>
          <li>Most repairs done the same day</li>
          <li>Reach a real person on WhatsApp or by phone, not a call centre</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Contact Information</h3>
        <div className="bg-[#ece9fa]/50 dark:bg-[#3626a7]/10 p-6 rounded-xl border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-300 space-y-3">
          <p className="font-bold text-gray-900 dark:text-white">Joe Tech</p>
          {branches.map((b) => (
            <p key={b.id} className="flex items-start gap-2">
              <MapPin size={18} className="shrink-0 mt-0.5 brand-text dark:text-jt-mint" />
              <span>
                <strong>{b.name}:</strong> {b.street}, {b.city}, {b.state}
              </span>
            </p>
          ))}
          <p className="flex items-start gap-2">
            <Phone size={18} className="shrink-0 mt-0.5 brand-text dark:text-jt-mint" />
            <span>WhatsApp: 08133727813</span>
          </p>
          <p className="flex items-start gap-2">
            <Phone size={18} className="shrink-0 mt-0.5 brand-text dark:text-jt-mint" />
            <span>Call Lines: 08133727813 / 09071054193</span>
          </p>
          <p className="flex items-start gap-2">
            <Mail size={18} className="shrink-0 mt-0.5 brand-text dark:text-jt-mint" />
            <span>
              Email:{' '}
              <a
                href={`mailto:${site.email}`}
                className="hover:brand-text dark:hover:text-jt-mint transition-colors font-medium"
              >
                {site.email}
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
