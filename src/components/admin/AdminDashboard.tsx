import React, { useState } from 'react';
import { LogOut, Image, Images, Briefcase, Settings, Languages, Database, Search } from 'lucide-react';
import HeroManager from './HeroManager';
import GalleryManager from './GalleryManager';
import ServicesManager from './ServicesManager';
import SettingsManager from './SettingsManager';
import TranslationManager from './TranslationManager';
import DataInitializer from './DataInitializer';
import SEOManager from './SEOManager';

interface AdminDashboardProps {
  onLogout: () => void;
}

type TabType = 'init' | 'hero' | 'gallery' | 'services' | 'translations' | 'seo' | 'settings';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<TabType>('init');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabs = [
    { id: 'init' as TabType, label: 'Setup', icon: <Database className="h-5 w-5" /> },
    { id: 'hero' as TabType, label: 'Hero Section', icon: <Image className="h-5 w-5" /> },
    { id: 'gallery' as TabType, label: 'Gallery', icon: <Images className="h-5 w-5" /> },
    { id: 'services' as TabType, label: 'Services', icon: <Briefcase className="h-5 w-5" /> },
    { id: 'translations' as TabType, label: 'Translations', icon: <Languages className="h-5 w-5" /> },
    { id: 'seo' as TabType, label: 'SEO Settings', icon: <Search className="h-5 w-5" /> },
    { id: 'settings' as TabType, label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  const handleTabClick = (tabId: TabType) => {
    setActiveTab(tabId);
    setSidebarOpen(false); // Close mobile sidebar after selection
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-primary-dark">Admin Dashboard</h1>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Manage your website content</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="flex relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-30
          w-64 bg-white border-r
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:min-h-[calc(100vh-73px)]
          pt-16 lg:pt-0
        `}>
          <nav className="p-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-accent-purple text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full lg:w-auto overflow-x-hidden">
          {activeTab === 'init' && <DataInitializer />}
          {activeTab === 'hero' && <HeroManager />}
          {activeTab === 'gallery' && <GalleryManager />}
          {activeTab === 'services' && <ServicesManager />}
          {activeTab === 'translations' && <TranslationManager />}
          {activeTab === 'seo' && <SEOManager />}
          {activeTab === 'settings' && <SettingsManager />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

