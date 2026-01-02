import { useState } from 'react';
import { AlertCircle, CheckCircle, Upload, Link2 } from 'lucide-react';
import { initializeAllData } from '../../services/phpDataService';

/**
 * DataInitializer Component
 * 
 * One-time setup to initialize PHP server data storage
 * After initialization, ALL devices read from the SAME server
 */
export default function DataInitializer() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const serverUrl = 'https://files.foliensam.de';

  const handleInitialize = async () => {
    setStatus('loading');
    setMessage('Initializing PHP server data storage...');
    
    try {
      console.log('🚀 Starting server initialization...');
      await initializeAllData();
      setStatus('success');
      setMessage('✅ Server data storage initialized successfully!');
    } catch (error) {
      console.error('❌ Initialization failed:', error);
      setStatus('error');
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      setMessage(`❌ Failed to initialize: ${errorMsg}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* PHP Server URL */}
      <div className="bg-blue-50 rounded-lg shadow-sm p-6 border border-blue-200">
        <div className="flex items-center space-x-2 mb-3">
          <Link2 className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-blue-900">
            Your PHP Server
          </h3>
        </div>
        
        <p className="text-sm text-blue-800 mb-3">
          This is the <strong>SINGLE source of truth</strong> for ALL devices. 
          All data is stored on your own server:
        </p>
        
        <div className="bg-white border border-blue-300 rounded-lg px-4 py-3">
          <code className="text-sm text-gray-800 break-all">{serverUrl}</code>
        </div>
        
        <p className="text-xs text-blue-700 mt-2">
          ✓ No API limits • ✓ Full control • ✓ No caching issues
        </p>
      </div>

      {/* Initialize Storage */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Initialize PHP Server Storage
        </h2>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-900">
              <p className="font-semibold mb-2">⚠️ First-Time Setup Only</p>
              <p>
                Run this once to create the initial JSON files on your PHP server.
                After that, all devices will automatically read from the same source.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">What will be created:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
              <li>Gallery data file (gallery.json)</li>
              <li>Hero section data (hero.json)</li>
              <li>Services information (services.json)</li>
              <li>Custom translations (translations.json)</li>
              <li>Admin settings (settings.json)</li>
            </ul>
          </div>

          <button
            onClick={handleInitialize}
            disabled={status === 'loading'}
            className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors ${
              status === 'loading'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <Upload className="w-5 h-5" />
            <span>
              {status === 'loading' ? 'Initializing...' : 'Initialize Storage'}
            </span>
          </button>

          {status !== 'idle' && (
            <div
              className={`p-4 rounded-lg flex items-start space-x-3 ${
                status === 'success'
                  ? 'bg-green-50 border border-green-200'
                  : status === 'error'
                  ? 'bg-red-50 border border-red-200'
                  : 'bg-blue-50 border border-blue-200'
              }`}
            >
              {status === 'success' && (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              )}
              {status === 'error' && (
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <p className={`text-sm whitespace-pre-wrap ${
                status === 'success' ? 'text-green-900' : status === 'error' ? 'text-red-900' : 'text-blue-900'
              }`}>
                {message}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">
          How It Works
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 font-bold text-xs">1</span>
            </div>
            <p>
              <strong>Your Server:</strong> All data stored on files.foliensam.de
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 font-bold text-xs">2</span>
            </div>
            <p>
              <strong>JSON Files:</strong> Separate files for gallery, hero, services, translations, settings
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 font-bold text-xs">3</span>
            </div>
            <p>
              <strong>Updates:</strong> When you save, JSON files are updated instantly on your server
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 font-bold text-xs">✓</span>
            </div>
            <p>
              <strong>All Devices Sync:</strong> Everyone reads from the same server = same data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
