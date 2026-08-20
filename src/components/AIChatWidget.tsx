import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User, Loader2, Minimize2, Wrench } from 'lucide-react';
import { sendChatMessage, ChatMessage } from '../lib/aiChat';
import { useAppContext } from '../store/AppContext';

const WELCOME_MESSAGE: ChatMessage = {
  role: 'assistant',
  content: "Welcome to Joe Tech. I'm **Joe**, and I'm here to help, whether you're comparing products, sorting out a repair, or have a question about an order. We're open **Monday to Saturday, 8am to 6pm**. What can I help you with today?",
};

const repairProcessSteps = [
  { title: 'Tell Joe what\'s wrong', detail: 'Describe the device and the fault, right here in chat or on the Repairs page.' },
  { title: 'Free diagnosis', detail: 'Drop it off (or request pickup) at either branch, we assess it at no charge.' },
  { title: 'Get an upfront quote', detail: 'We confirm the cost with you before any work begins, no surprises.' },
  { title: 'Same-day repair', detail: 'Most repairs are completed the same day by our technicians.' },
  { title: 'Collect or get it delivered', detail: 'Pick it up in-branch, or have it delivered back to you.' },
];

function renderMarkdown(text: string): React.ReactNode {
  // Simple markdown: bold **text**, line breaks
  const parts = text.split(/(\*\*[^*]+\*\*|\n)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part === '\n') return <br key={i} />;
    return part;
  });
}

export const AIChatWidget = () => {
  const { products, setCurrentView } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showRepairProcess, setShowRepairProcess] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const repairPanelRef = useRef<HTMLDivElement>(null);

  // Close repair process panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (repairPanelRef.current && !repairPanelRef.current.contains(e.target as Node)) {
        setShowRepairProcess(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
      setUnreadCount(0);
    }
  }, [messages, isOpen, isMinimized]);

  // Pulse badge after 3s to invite user
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setUnreadCount(1);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: trimmed };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      const reply = await sendChatMessage(trimmed, newHistory, products);
      const assistantMsg: ChatMessage = { role: 'assistant', content: reply };
      setMessages(prev => [...prev, assistantMsg]);
      if (!isOpen || isMinimized) {
        setUnreadCount(prev => prev + 1);
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Something went wrong on my end. Please try again, or reach our team directly on WhatsApp if it persists."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickPrompts = [
    "What's trending?",
    "Browse by category",
    "Walk me through ordering",
    "Best value products",
  ];

  const handlePromptSelect = (prompt: string) => {
    setInput(prompt);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleBookRepairNow = () => {
    setShowRepairProcess(false);
    setIsOpen(false);
    setCurrentView('services');
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: isMinimized ? 0 : 1, y: isMinimized ? 20 : 0, scale: isMinimized ? 0.95 : 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm"
            style={{ display: isMinimized ? 'none' : undefined }}
          >
            <div className="bg-white dark:bg-[#111] rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden"
              style={{ height: '520px' }}>
              
              {/* Header */}
              <div className="bg-gradient-to-r from-[#3626a7] to-[#281c7d] px-4 py-3 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="relative w-9 h-9 flex-shrink-0">
                    <img src="/ai-bot-icon.jpg" alt="Joe, AI Assistant" className="w-9 h-9 rounded-full object-cover border-2 border-white/30" />
                    <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#3626a7] animate-pulse" />
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-white font-bold text-sm leading-none">Joe, AI Assistant</p>
                    <p className="text-green-200 text-xs mt-0.5">Online now, always happy to help</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="text-gray-800 dark:text-white/70 hover:text-gray-800 dark:text-white transition-colors p-1"
                  >
                    <Minimize2 size={16} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-800 dark:text-white/70 hover:text-gray-800 dark:text-white transition-colors p-1"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-gray-50 dark:bg-[#0d0d0d]">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-full bg-[#3626a7] flex items-center justify-center flex-shrink-0 mb-1">
                        <Bot size={14} className="text-gray-800 dark:text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#3626a7] text-white rounded-br-sm'
                          : 'bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-100 shadow-sm border border-gray-100 dark:border-gray-800 rounded-bl-sm'
                      }`}
                    >
                      {renderMarkdown(msg.content)}
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 mb-1">
                        <User size={14} className="text-gray-500 dark:text-gray-300" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Interactive quick-reply chips, shown right after the welcome message */}
                {messages.length === 1 && !isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.15 }}
                    className="flex flex-wrap gap-1.5 pl-9"
                  >
                    {quickPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handlePromptSelect(prompt)}
                        className="text-xs font-medium px-3 py-1.5 rounded-full bg-white dark:bg-[#1a1a1a] border border-[#3626a7]/30 text-[#3626a7] dark:text-jt-mint hover:bg-[#3626a7] hover:text-white dark:hover:bg-jt-mint dark:hover:text-jt-ink transition-colors shadow-sm"
                      >
                        {prompt}
                      </button>
                    ))}
                  </motion.div>
                )}

                {isLoading && (
                  <div className="flex items-end gap-2 justify-start">
                    <div className="w-7 h-7 rounded-full bg-[#3626a7] flex items-center justify-center flex-shrink-0">
                      <Bot size={14} className="text-gray-800 dark:text-white" />
                    </div>
                    <div className="bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                      <div className="flex space-x-1.5 items-center h-4">
                        <span className="w-2 h-2 bg-[#3626a7] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-[#3626a7] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-[#3626a7] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Repair Process Dropdown */}
              <AnimatePresence>
                {showRepairProcess && (
                  <motion.div
                    ref={repairPanelRef}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-[68px] left-3 right-3 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-10 overflow-hidden"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 px-3 pt-2.5 pb-2">Our repair process</p>
                    <div className="max-h-56 overflow-y-auto px-3 pb-2 space-y-2.5">
                      {repairProcessSteps.map((step, i) => (
                        <div key={step.title} className="flex items-start gap-2.5">
                          <span className="w-5 h-5 flex-shrink-0 rounded-full bg-[#3626a7]/10 text-[#3626a7] dark:bg-jt-mint/10 dark:text-jt-mint text-[10px] font-bold flex items-center justify-center mt-0.5">
                            {i + 1}
                          </span>
                          <div>
                            <p className="text-xs font-semibold text-gray-800 dark:text-gray-100">{step.title}</p>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug">{step.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={handleBookRepairNow}
                      className="w-full text-center text-xs font-bold py-2.5 bg-[#3626a7] hover:bg-[#281c7d] text-white transition-colors border-t border-gray-100 dark:border-gray-800"
                    >
                      Book a Repair Now
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Input */}
              <div className="relative px-3 py-3 bg-white dark:bg-[#111] border-t border-gray-100 dark:border-gray-800 flex-shrink-0">
                <div className="flex items-center gap-2">
                  {/* Repair process trigger button */}
                  <button
                    onClick={() => setShowRepairProcess(prev => !prev)}
                    title="See our repair process"
                    className={`w-9 h-9 flex-shrink-0 rounded-xl flex items-center justify-center transition-all border ${
                      showRepairProcess
                        ? 'bg-[#3626a7] text-white border-[#3626a7]'
                        : 'bg-gray-50 dark:bg-[#1a1a1a] text-gray-400 border-gray-200 dark:border-gray-700 hover:border-[#3626a7] hover:brand-text'
                    }`}
                  >
                    <Wrench size={15} />
                  </button>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything..."
                    className="flex-1 text-sm bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#3626a7] dark:text-gray-800 dark:text-white placeholder-gray-400 transition-colors"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="w-10 h-10 bg-[#3626a7] hover:bg-[#281c7d] disabled:opacity-40 rounded-xl flex items-center justify-center text-white transition-all flex-shrink-0"
                  >
                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (isMinimized) setIsMinimized(false);
          setIsOpen(prev => !prev);
          setUnreadCount(0);
        }}
        className="fixed bottom-6 right-4 md:right-6 z-50 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 dark:text-gray-800 dark:text-white border border-gray-100 dark:border-gray-800"
        style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}
        aria-label="Open AI Chat Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen && !isMinimized ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} className="text-gray-600 dark:text-gray-800 dark:text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="w-full h-full rounded-full overflow-hidden">
              <img src="/ai-bot-icon.jpg" alt="AI Chat" className="w-full h-full object-cover" />
            </motion.div>
          )}
        </AnimatePresence>

        {(!isOpen || isMinimized) && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white dark:border-jt-ink animate-pulse" />
        )}

        {unreadCount > 0 && !isOpen && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-gray-800 dark:text-white text-[10px] font-bold rounded-full flex items-center justify-center"
          >
            {unreadCount}
          </motion.span>
        )}
      </motion.button>
    </>
  );
};
