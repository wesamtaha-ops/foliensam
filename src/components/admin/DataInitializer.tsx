import { useState } from 'react';
import { AlertCircle, CheckCircle, Upload, Link2 } from 'lucide-react';
import { initializeCloudinaryData, getManifestUrl } from '../../services/cloudinaryDataService';

/**
 * DataInitializer Component
 * 
 * One-time setup to initialize Cloudinary JSON storage
 * After initialization, ALL devices read from the SAME hardcoded manifest URL
 */
export default function DataInitializer() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const manifestUrl = getManifestUrl();

  const handleInitialize = async () => {
    setStatus('loading');
    setMessage('Initializing Cloudinary data storage...');
    
    try {
      console.log('🚀 Starting Cloudinary initialization...');
      await initializeCloudinaryData();
      setStatus('success');
      setMessage('✅ Cloudinary data storage initialized successfully!');
    } catch (error) {
      console.error('❌ Initialization failed:', error);
      setStatus('error');
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      setMessage(`❌ Failed to initialize: ${errorMsg}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hardcoded Manifest URL */}
      <div className="bg-blue-50 rounded-lg shadow-sm p-6 border border-blue-200">
        <div className="flex items-center space-x-2 mb-3">
          <Link2 className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-blue-900">
            Hardcoded Manifest URL
          </h3>
        </div>
        
        <p className="text-sm text-blue-800 mb-3">
          This is the <strong>SINGLE source of truth</strong> for ALL devices. 
          No localStorage - everyone reads from this URL:
        </p>
        
        <div className="bg-white border border-blue-300 rounded-lg px-4 py-3">
          <code className="text-sm text-gray-800 break-all">{manifestUrl}</code>
        </div>
        
        <p className="text-xs text-blue-700 mt-2">
          ✓ Works on all browsers • ✓ Works on mobile • ✓ No sync needed
        </p>
      </div>

      {/* Initialize Storage */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Initialize Cloudinary Storage
        </h2>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-900">
              <p className="font-semibold mb-2">⚠️ First-Time Setup Only</p>
              <p>
                Run this once to create the initial data files in Cloudinary.
                After that, all devices will automatically read from the same source.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">What will be created:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
              <li>Gallery images and videos</li>
              <li>Hero section data</li>
              <li>Services information</li>
              <li>Custom translations</li>
              <li>Admin settings & password</li>
              <li><strong>Manifest file</strong> - central index of all data</li>
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
              <strong>One Manifest URL:</strong> Hardcoded in the code, same for everyone
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 font-bold text-xs">2</span>
            </div>
            <p>
              <strong>Manifest Points to Data:</strong> Contains URLs to gallery, hero, services, etc.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 font-bold text-xs">3</span>
            </div>
            <p>
              <strong>Updates:</strong> When you save, new data file is created and manifest is updated
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 font-bold text-xs">✓</span>
            </div>
            <p>
              <strong>All Devices Sync:</strong> Everyone reads from the same manifest = same data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
