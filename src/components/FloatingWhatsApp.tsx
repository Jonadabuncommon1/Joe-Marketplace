import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { useAppContext } from '../store/AppContext';
import { waLink } from '../config/site';

export const FloatingWhatsApp = () => {
  const { user, setCurrentView } = useAppContext();

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setCurrentView('auth');
    }
  };

  return (
    <motion.a
      href={waLink('Hello Joe Tech, I have a question about a product.')}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleWhatsAppClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      className="fixed bottom-28 right-4 md:right-6 z-40 w-14 h-14 bg-[#25D366] rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center justify-center group overflow-hidden"
      style={{ boxShadow: '0 4px 24px rgba(37,211,102,0.3)' }}
    >
      <MessageCircle size={28} className="text-gray-800 dark:text-white" />
      <span className="absolute right-full mr-4 bg-white dark:bg-[#1a1a1a] text-black dark:text-gray-800 dark:text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg border border-gray-100 dark:border-gray-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat to Buy
      </span>
    </motion.a>
  );
};

