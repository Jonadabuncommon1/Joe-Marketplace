import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot,
  Send,
  X,
  Sparkles,
  Wrench,
  ShoppingBag,
  MapPin,
  ShieldCheck,
  MessageCircle,
  Minimize2,
  Maximize2,
} from 'lucide-react';
import { useAppContext } from '../../store/AppContext';
import { branches, contacts, site, waLink } from '../../config/site';
import { formatPrice } from '../../data';

interface Message {
  id: string;
  sender: 'user' | 'cisco';
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: () => void }[];
}

export const ChatWidget: React.FC = () => {
  const { products, setCurrentView, setActiveCategory, setActiveProductId } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'cisco',
      text: "Hey there! 👋 I'm **Cisco**, your Joe Tech assistant. Looking for a new gadget, need pricing, or want to book a free repair diagnosis?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickActions: [
        { label: '📱 View iPhones', action: () => openCategory('iphones') },
        { label: '💻 Laptops & MacBooks', action: () => openCategory('laptops') },
        { label: '🛠️ Free Repair Quote', action: () => goToRepairs() },
      ],
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const openCategory = (id: string) => {
    setActiveCategory(id);
    setCurrentView('category');
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  const goToRepairs = () => {
    setCurrentView('services');
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  const generateCiscoResponse = (userText: string): { reply: string; quickActions?: { label: string; action: () => void }[] } => {
    const q = userText.toLowerCase().trim();

    // 1. Casual Chat & Status
    if (q.includes('how are you') || q.includes('how far') || q.includes('how r u')) {
      return {
        reply: "I'm running at full speed and ready to help! 🚀 How can I assist you with your tech today?",
      };
    }

    if (q.includes('who are you') || q.includes('your name') || q.includes('cisco')) {
      return {
        reply: "I'm **Cisco**, Joe Tech's automated tech advisor! I help you find gadgets, check stock, look up repair estimates, and connect with our team in Lagos and Nsukka.",
      };
    }

    if (q === 'hello' || q === 'hi' || q === 'hey' || q === 'good morning' || q === 'good afternoon' || q === 'good evening') {
      const greetings = [
        "Hello! Great to have you here. What tech are you searching for today?",
        "Hey! Cisco here. Need help finding a phone, laptop, or solar gear?",
        "Welcome to Joe Tech! How can I make your tech shopping easier today?",
      ];
      return {
        reply: greetings[Math.floor(Math.random() * greetings.length)],
        quickActions: [
          { label: 'Shop Phones', action: () => openCategory('iphones') },
          { label: 'Shop Laptops', action: () => openCategory('laptops') },
        ],
      };
    }

    // 2. Repairs & Maintenance
    if (q.includes('repair') || q.includes('fix') || q.includes('screen') || q.includes('battery issue') || q.includes('fault') || q.includes('water')) {
      return {
        reply: "We offer **100% Free Diagnosis** on all phones, laptops, and inverters! Bring it to our Nsukka or Lagos branches—we diagnose the fault and quote you before touching anything. Most repairs take just 1 day and include a 2-week warranty.",
        quickActions: [
          { label: '🛠️ Book Repair Now', action: () => goToRepairs() },
          { label: '💬 WhatsApp Technician', action: () => window.open(waLink('Hello Joe Tech, I need a repair quote.'), '_blank') },
        ],
      };
    }

    // 3. iPhones & Apple
    if (q.includes('iphone') || q.includes('ipad') || q.includes('apple')) {
      const appleProducts = products.filter((p) => p.name.toLowerCase().includes('iphone') || p.name.toLowerCase().includes('ipad'));
      const sample = appleProducts.slice(0, 3).map((p) => `• **${p.name}** — ${formatPrice(p.price)}`).join('\n');

      return {
        reply: `We stock clean UK-used and brand-new iPhones and iPads with battery health verified and iCloud cleared:\n\n${sample || 'All models available in store.'}`,
        quickActions: [
          { label: 'Browse Apple Stock', action: () => openCategory('iphones') },
        ],
      };
    }

    // 4. Android & Samsung
    if (q.includes('android') || q.includes('samsung') || q.includes('pixel') || q.includes('tecno') || q.includes('infinix')) {
      return {
        reply: "We have authentic Samsung Galaxy flagships, Google Pixels, Tecno, and Infinix devices tested and ready to ship.",
        quickActions: [
          { label: 'Browse Androids', action: () => openCategory('android') },
        ],
      };
    }

    // 5. Laptops & Computers
    if (q.includes('laptop') || q.includes('macbook') || q.includes('dell') || q.includes('hp') || q.includes('computer')) {
      const laptopList = products.filter((p) => p.category?.toLowerCase().includes('laptop') || p.name.toLowerCase().includes('macbook') || p.name.toLowerCase().includes('laptop'));
      const sample = laptopList.slice(0, 3).map((p) => `• **${p.name}** — ${formatPrice(p.price)}`).join('\n');

      return {
        reply: `Here are some popular laptops available right now:\n\n${sample || 'Full range available in store with warranty.'}`,
        quickActions: [
          { label: 'Browse All Laptops', action: () => openCategory('laptops') },
        ],
      };
    }

    // 6. Solar & Inverters
    if (q.includes('solar') || q.includes('inverter') || q.includes('battery') || q.includes('panel') || q.includes('power')) {
      return {
        reply: "We supply complete solar systems, lithium & tubular batteries, hybrid inverters, and high-efficiency mono panels with full installation support.",
        quickActions: [
          { label: 'Browse Solar Range', action: () => openCategory('solar') },
        ],
      };
    }

    // 7. Location & Branches
    if (q.includes('where') || q.includes('location') || q.includes('branch') || q.includes('address') || q.includes('lagos') || q.includes('nsukka')) {
      return {
        reply: `We have 2 physical branches where you can test devices before payment:\n\n📍 **Nsukka Branch**: ${branches[0]?.street || 'University Rd'}, ${branches[0]?.city || 'Nsukka'}\n📍 **Lagos Branch**: ${branches[1]?.street || 'Computer Village'}, ${branches[1]?.city || 'Ikeja'}\n\n🕒 Mon - Sat: 8:00 AM - 7:00 PM`,
      };
    }

    // 8. Warranty & Delivery
    if (q.includes('warranty') || q.includes('guarantee') || q.includes('delivery') || q.includes('waybill') || q.includes('ship')) {
      return {
        reply: "Every phone and laptop comes with verified store warranty. We provide nationwide doorstep delivery across Nigeria, or you can pick up at our Lagos or Nsukka shops.",
      };
    }

    // 9. Talk to Human / WhatsApp
    if (q.includes('human') || q.includes('person') || q.includes('agent') || q.includes('whatsapp') || q.includes('call')) {
      return {
        reply: "You can speak directly with our team right now on WhatsApp or call our support line!",
        quickActions: [
          { label: '💬 Chat on WhatsApp', action: () => window.open(waLink('Hello Joe Tech, I need assistance.'), '_blank') },
          { label: `📞 Call ${contacts.primary}`, action: () => window.open(`tel:${contacts.primary}`) },
        ],
      };
    }

    // 10. Intelligent Fallback
    const matching = products.filter((p) => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
    if (matching.length > 0) {
      const p = matching[0];
      return {
        reply: `I found **${p.name}** for ${formatPrice(p.price)}! Would you like to view its full specs?`,
        quickActions: [
          {
            label: 'View Product Details',
            action: () => {
              setActiveProductId(p.id);
              setCurrentView('product');
              setIsOpen(false);
            },
          },
        ],
      };
    }

    return {
      reply: `I'm on it! You can explore our catalog or tell me specific specs you want (like *"iPhone 14"*, *"gaming monitor"*, or *"repair cost"*). What would you prefer?`,
      quickActions: [
        { label: '🛍️ Explore Shop', action: () => { setCurrentView('categories'); setIsOpen(false); } },
        { label: '💬 Speak to Human', action: () => window.open(waLink(`Hello Joe Tech, I am asking about: ${userText}`), '_blank') },
      ],
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateCiscoResponse(query);
      const ciscoMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'cisco',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: response.quickActions,
      };
      setMessages((prev) => [...prev, ciscoMessage]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* ── Floating Launcher with Glowing Cisco AI Avatar ── */}
      <div className="fixed bottom-5 right-5 z-50">
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-jt-blue to-jt-blue-soft text-white shadow-[0_8px_25px_rgba(54,38,167,0.45)] border border-jt-mint/30"
          aria-label="Open Cisco AI Chat"
        >
          {/* Animated Glow Rings */}
          <span className="absolute -inset-1 animate-pulse rounded-full bg-jt-mint/25 blur-sm" />
          <span className="relative flex h-full w-full items-center justify-center">
            {isOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <div className="relative">
                <Bot className="h-7 w-7 text-jt-mint" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-jt-lime opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-jt-lime" />
                </span>
              </div>
            )}
          </span>
        </motion.button>
      </div>

      {/* ── Chat Modal Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-22 right-4 z-50 flex h-[540px] max-h-[82vh] w-[calc(100vw-32px)] max-w-[390px] flex-col overflow-hidden rounded-3xl border border-jt-blue/20 bg-white shadow-2xl dark:border-white/15 dark:bg-[#121620]"
          >
            {/* Header with Glowing Cisco Avatar */}
            <div className="relative flex items-center justify-between bg-gradient-to-r from-jt-blue via-jt-blue-deep to-jt-ink px-4 py-3.5 text-white">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-jt-mint/40 bg-jt-mint/15 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                  <Bot className="h-5 w-5 text-jt-mint" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-jt-lime ring-2 ring-jt-blue" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-display text-sm font-bold text-white">Cisco</p>
                    <span className="rounded-full bg-jt-mint/20 px-2 py-0.2 text-[9px] font-bold uppercase tracking-wider text-jt-mint">
                      AI Assistant
                    </span>
                  </div>
                  <p className="text-[11px] text-jt-steel">Online now · Always happy to help</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-jt-steel hover:bg-white/10 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-jt-paper/60 dark:bg-[#0D1017]">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-end gap-2 max-w-[86%]">
                    {m.sender === 'cisco' && (
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-jt-blue/15 text-jt-blue dark:bg-jt-mint/15 dark:text-jt-mint">
                        <Bot size={13} />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                        m.sender === 'user'
                          ? 'rounded-br-none bg-jt-blue text-white shadow-sm'
                          : 'rounded-bl-none border border-jt-ink/8 bg-white text-jt-ink shadow-sm dark:border-white/10 dark:bg-jt-ink-soft dark:text-white'
                      }`}
                    >
                      <p className="whitespace-pre-line">{m.text}</p>
                    </div>
                  </div>

                  {/* Quick Action Pills */}
                  {m.quickActions && m.quickActions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5 pl-8">
                      {m.quickActions.map((qa, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={qa.action}
                          className="rounded-full border border-jt-blue/25 bg-white px-2.5 py-1 text-[11px] font-semibold text-jt-blue shadow-xs transition-all hover:bg-jt-blue hover:text-white dark:border-jt-mint/30 dark:bg-jt-ink-soft dark:text-jt-mint dark:hover:bg-jt-mint dark:hover:text-jt-ink"
                        >
                          {qa.label}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="mt-1 text-[9px] text-jt-steel px-8">{m.timestamp}</span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 pl-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-jt-blue/15 text-jt-blue dark:bg-jt-mint/15 dark:text-jt-mint">
                    <Bot size={13} />
                  </div>
                  <div className="rounded-2xl rounded-bl-none border border-jt-ink/8 bg-white px-3 py-2 text-xs text-jt-steel dark:border-white/10 dark:bg-jt-ink-soft">
                    <span className="inline-flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-jt-blue dark:bg-jt-mint" style={{ animationDelay: '0ms' }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-jt-blue dark:bg-jt-mint" style={{ animationDelay: '150ms' }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-jt-blue dark:bg-jt-mint" style={{ animationDelay: '300ms' }} />
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 border-t border-jt-ink/10 bg-white p-2.5 dark:border-white/10 dark:bg-jt-ink-soft"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Cisco anything..."
                className="flex-1 bg-transparent px-3 py-2 text-xs text-jt-ink placeholder:text-jt-steel focus:outline-none dark:text-white"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-jt-blue text-white transition-opacity disabled:opacity-40 hover:bg-jt-blue-soft dark:bg-jt-mint dark:text-jt-ink"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};