import React, { useState } from 'react';
import { LogOut, Image, Images, Briefcase, Settings, Languages, Database } from 'lucide-react';
import HeroManager from './HeroManager';
import GalleryManager from './GalleryManager';
import ServicesManager from './ServicesManager';
import SettingsManager from './SettingsManager';
import TranslationManager from './TranslationManager';
import DataInitializer from './DataInitializer';

interface AdminDashboardProps {
  onLogout: () => void;
}

type TabType = 'init' | 'hero' | 'gallery' | 'services' | 'translations' | 'settings';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<TabType>('init');

  const tabs = [
    { id: 'init' as TabType, label: 'Setup', icon: <Database className="h-5 w-5" /> },
    { id: 'hero' as TabType, label: 'Hero Section', icon: <Image className="h-5 w-5" /> },
    { id: 'gallery' as TabType, label: 'Gallery', icon: <Images className="h-5 w-5" /> },
    { id: 'services' as TabType, label: 'Services', icon: <Briefcase className="h-5 w-5" /> },
    { id: 'translations' as TabType, label: 'Translations', icon: <Languages className="h-5 w-5" /> },
    { id: 'settings' as TabType, label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary-dark">Admin Dashboard</h1>
            <p className="text-sm text-gray-600">Manage your website content</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white min-h-[calc(100vh-73px)] border-r">
          <nav className="p-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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
        <main className="flex-1 p-8">
          {activeTab === 'init' && <DataInitializer />}
          {activeTab === 'hero' && <HeroManager />}
          {activeTab === 'gallery' && <GalleryManager />}
          {activeTab === 'services' && <ServicesManager />}
          {activeTab === 'translations' && <TranslationManager />}
          {activeTab === 'settings' && <SettingsManager />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

