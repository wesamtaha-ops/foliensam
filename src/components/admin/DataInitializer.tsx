import { useState } from 'react';
import { AlertCircle, CheckCircle, Upload } from 'lucide-react';
import { initializeCloudinaryData } from '../../services/cloudinaryDataService';

const CLOUDINARY_UPLOAD_PRESET = 'folien_sam_uploads';

/**
 * DataInitializer Component
 * 
 * One-time setup to initialize Cloudinary JSON storage
 * Run this once to create the data files in Cloudinary
 */
export default function DataInitializer() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleInitialize = async () => {
    setStatus('loading');
    setMessage('Initializing Cloudinary data storage...');
    
    try {
      console.log('🚀 Starting Cloudinary initialization...');
      await initializeCloudinaryData();
      setStatus('success');
      setMessage('✅ Cloudinary data storage initialized successfully! Check console for details.');
    } catch (error) {
      console.error('❌ Initialization failed:', error);
      setStatus('error');
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      setMessage(`❌ Failed to initialize: ${errorMsg}\n\nCheck browser console (F12) for details.\n\nMake sure your Cloudinary upload preset "${CLOUDINARY_UPLOAD_PRESET}" allows raw file uploads.`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Cloudinary Data Initializer
        </h2>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-2">First-Time Setup</p>
              <p>
                This will create JSON data files in your Cloudinary account.
                You only need to do this once. After initialization, your
                gallery and hero data will be stored in Cloudinary.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">What will be created:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
              <li>
                <code className="text-xs bg-gray-200 px-2 py-1 rounded">
                  folien_sam_data/gallery.json
                </code>
                {' '}- Gallery images and videos
              </li>
              <li>
                <code className="text-xs bg-gray-200 px-2 py-1 rounded">
                  folien_sam_data/hero.json
                </code>
                {' '}- Hero section data
              </li>
              <li>
                <code className="text-xs bg-gray-200 px-2 py-1 rounded">
                  folien_sam_data/services.json
                </code>
                {' '}- Services information
              </li>
              <li>
                <code className="text-xs bg-gray-200 px-2 py-1 rounded">
                  folien_sam_data/translations.json
                </code>
                {' '}- Custom translations
              </li>
              <li>
                <code className="text-xs bg-gray-200 px-2 py-1 rounded">
                  folien_sam_data/settings.json
                </code>
                {' '}- Admin settings & password
              </li>
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
              {status === 'loading' ? 'Initializing...' : 'Initialize Cloudinary Storage'}
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
              <p
                className={`text-sm ${
                  status === 'success'
                    ? 'text-green-900'
                    : status === 'error'
                    ? 'text-red-900'
                    : 'text-blue-900'
                }`}
              >
                {message}
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-900 font-semibold mb-2">
                🎉 Setup Complete!
              </p>
              <p className="text-sm text-green-800 mb-3">
                All data files created successfully in Cloudinary! You can now:
              </p>
              <ul className="text-sm text-green-800 list-disc list-inside space-y-1">
                <li>Add gallery images and videos</li>
                <li>Update hero section</li>
                <li>Manage services</li>
                <li>Edit translations</li>
                <li>Change admin settings</li>
              </ul>
              <p className="text-sm text-green-800 mt-3">
                All changes sync to Cloudinary automatically! ✨
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">
          How It Works
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-bold text-xs">1</span>
            </div>
            <p>
              <strong>Images:</strong> Uploaded to Cloudinary (unlimited storage, CDN delivery)
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-bold text-xs">2</span>
            </div>
            <p>
              <strong>Data:</strong> Stored as JSON files in Cloudinary (gallery, hero, services, translations, settings)
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-bold text-xs">3</span>
            </div>
            <p>
              <strong>Production:</strong> Your website reads data directly from Cloudinary
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-bold text-xs">4</span>
            </div>
            <p>
              <strong>No Server Needed:</strong> Everything works client-side, deploys to Vercel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

