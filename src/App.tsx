/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useAppContext } from './store/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WhatsAppCart } from './components/WhatsAppCart';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

const HomeView = React.lazy(() => import('./components/home/HomeView').then(m => ({ default: m.HomeView })));
const ProductDetailView = React.lazy(() => import('./components/shop/ProductDetailView').then(m => ({ default: m.ProductDetailView })));
const WishlistView = React.lazy(() => import('./components/shop/WishlistView').then(m => ({ default: m.WishlistView })));
const AboutView = React.lazy(() => import('./components/home/AboutView').then(m => ({ default: m.AboutView })));
const ContactView = React.lazy(() => import('./components/home/ContactView').then(m => ({ default: m.ContactView })));
const TermsView = React.lazy(() => import('./components/home/TermsView').then(m => ({ default: m.TermsView })));
const PrivacyView = React.lazy(() => import('./components/home/PrivacyView').then(m => ({ default: m.PrivacyView })));
const AdminLayout = React.lazy(() => import('./components/admin/AdminLayout').then(m => ({ default: m.AdminLayout })));
const AdminLogin = React.lazy(() => import('./components/admin/AdminLogin').then(m => ({ default: m.AdminLogin })));
const CategoriesView = React.lazy(() => import('./components/shop/CategoriesView').then(m => ({ default: m.CategoriesView })));
const CategoryView = React.lazy(() => import('./components/shop/CategoryView').then(m => ({ default: m.CategoryView })));
const AuthView = React.lazy(() => import('./components/auth/AuthView').then(m => ({ default: m.AuthView })));
const ChatWidget = React.lazy(() => import('./components/chat/ChatModal').then(m => ({ default: m.ChatWidget })));
const ServicesView = React.lazy(() => import('./components/home/ServicesView').then(m => ({ default: m.ServicesView })));
const CheckoutView = React.lazy(() => import('./components/shop/CheckoutView').then(m => ({ default: m.CheckoutView })));

import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from 'react-hot-toast';
import { SplashScreen } from './components/SplashScreen';

function AppContent() {
  const { currentView, isAdminAuthenticated, loadingAuth } = useAppContext();

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-transparent dark:bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3626a7]"></div>
      </div>
    );
  }

  if (currentView === 'admin') {
    if (!isAdminAuthenticated) {
      return (
        <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3626a7]"></div></div>}>
          <AdminLogin />
        </React.Suspense>
      );
    }
    return (
      <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3626a7]"></div></div>}>
        <AdminLayout />
      </React.Suspense>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 dark:text-gray-100 bg-transparent dark:bg-black overflow-x-hidden selection:bg-[#3626a7]/10 transition-colors duration-500 relative">
      {/* Global Dynamic Animated Background Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 0.9, 1],
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#ece9fa] dark:bg-[#3626a7]/10 blur-[150px] rounded-full pointer-events-none -z-10 transition-colors"
      />
      <motion.div
        animate={{
          scale: [1, 0.9, 1.1, 1],
          x: [0, -20, 40, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-[#ece9fa] dark:bg-[#3626a7]/10 blur-[150px] rounded-full pointer-events-none -z-10 transition-colors"
      />

      {currentView !== 'auth' && <Navbar />}

      <main className="flex-grow w-full">
        <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3626a7]"></div></div>}>
          {currentView === 'home' && <HomeView />}
          {currentView === 'shop' && <CategoryView />}
          {currentView === 'categories' && <CategoriesView />}
          {currentView === 'category' && <CategoryView />}
          {currentView === 'product' && <ProductDetailView />}
          {currentView === 'wishlist' && <WishlistView />}
          {currentView === 'about' && <AboutView />}
          {currentView === 'contact' && <ContactView />}
          {currentView === 'services' && <ServicesView />}
          {currentView === 'checkout' && <CheckoutView />}
          {currentView === 'terms' && <TermsView />}
          {currentView === 'privacy' && <PrivacyView />}
          {currentView === 'auth' && <AuthView />}
        </React.Suspense>
      </main>

      {currentView === 'home' && <Footer />}
      {currentView !== 'auth' && <WhatsAppCart />}
      {currentView === 'home' && (
        <>
          <FloatingWhatsApp />
          <React.Suspense fallback={null}>
            <ChatWidget />
          </React.Suspense>
        </>
      )}
    </div>
  );
}

function App() {
  const [showSplash, setShowSplash] = React.useState(true);
  const hideSplash = React.useCallback(() => setShowSplash(false), []);

  return (
    <AppProvider>
      {showSplash && <SplashScreen onDone={hideSplash} />}
      <AppContent />
      <Toaster position="top-right" />
    </AppProvider>
  );
}

export default App;