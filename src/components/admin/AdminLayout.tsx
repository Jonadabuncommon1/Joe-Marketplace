import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './Sidebar';
import { DashboardHome } from './DashboardHome';
import { ProductsManager } from './ProductsManager';
import { CategoriesManager } from './CategoriesManager';
import { MediaManager } from './MediaManager';
import { Settings } from './Settings';
import { Menu, X } from 'lucide-react';

export type AdminView = 'dashboard' | 'products' | 'categories' | 'media' | 'settings';

export const AdminLayout = () => {
  const [currentView, setCurrentView] = useState<AdminView>(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#admin/')) {
      return hash.replace('#admin/', '') as AdminView;
    }
    return 'dashboard';
  });
  
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#admin/')) {
        setCurrentView(hash.replace('#admin/', '') as AdminView);
      } else if (hash === '#admin') {
        setCurrentView('dashboard');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = useCallback((view: AdminView) => {
    window.location.hash = `#admin/${view}`;
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'products':
        return <ProductsManager />;
      case 'categories':
        return <CategoriesManager />;
      case 'media':
        return <MediaManager />;
      case 'settings':
        return <Settings />;
      case 'dashboard':
      default:
        return <DashboardHome onChangeView={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#000000] text-gray-900 dark:text-gray-100 flex font-sans z-50 transition-colors duration-500">
      {/* Mobile & Desktop Sidebar Overlay Button */}
      {!sidebarOpen && (
        <button 
          className="fixed top-6 left-4 z-50 p-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-lg shadow-sm text-gray-700 dark:text-gray-300 hover:brand-text transition-colors"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={20} />
        </button>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-[#0a0a0a] border-r border-gray-200 dark:border-white/10 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar currentView={currentView} onChangeView={navigateTo} closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
        <div className="p-4 md:p-10 max-w-7xl mx-auto min-h-screen relative">
          {renderView()}
        </div>
      </div>
    </div>
  );
};
