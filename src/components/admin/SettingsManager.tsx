import React, { useState, useEffect } from 'react';
import { Save, Key, Youtube } from 'lucide-react';
import { updateAdminPassword, getSettings, saveSettings } from '../../services/dataService';
import { DEFAULT_TIKTOK_EMBED_ID, DEFAULT_TIKTOK_EMBED_ID_MOBILE } from '../TikTokProfileEmbed';

const SettingsManager: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [youtubeApiKey, setYoutubeApiKey] = useState('');
  const [youtubeChannelId, setYoutubeChannelId] = useState('');
  const [tiktokEmbedId, setTiktokEmbedId] = useState(DEFAULT_TIKTOK_EMBED_ID);
  const [tiktokEmbedIdMobile, setTiktokEmbedIdMobile] = useState(DEFAULT_TIKTOK_EMBED_ID_MOBILE);
  const [tiktokProfileUrl, setTiktokProfileUrl] = useState('https://vm.tiktok.com/ZNew77xKv/');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await getSettings();
      setYoutubeApiKey(settings.youtubeApiKey || '');
      setYoutubeChannelId(settings.youtubeChannelId || '');
      setTiktokEmbedId(settings.tiktokEmbedId || DEFAULT_TIKTOK_EMBED_ID);
      setTiktokEmbedIdMobile(settings.tiktokEmbedIdMobile || DEFAULT_TIKTOK_EMBED_ID_MOBILE);
      setTiktokProfileUrl(settings.tiktokProfileUrl || 'https://vm.tiktok.com/ZNew77xKv/');
    } catch (err) {
      console.error('Failed to load settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessageType('error');
      setMessage('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setMessageType('error');
      setMessage('Password must be at least 6 characters long');
      return;
    }

    try {
      await updateAdminPassword(newPassword);
      setMessageType('success');
      setMessage('Password updated successfully! Please remember your new password.');
      
      // Reset form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      setTimeout(() => setMessage(''), 5000);
    } catch (err) {
      console.error('Failed to update password:', err);
      setMessageType('error');
      setMessage('Failed to update password. Please try again.');
    }
  };

  const handleTikTokSettings = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tiktokEmbedId.trim()) {
      setMessageType('error');
      setMessage('Please enter a valid SociableKIT embed ID.');
      return;
    }

    try {
      const settings = await getSettings();
      await saveSettings({
        ...settings,
        tiktokEmbedId: tiktokEmbedId.trim(),
        tiktokEmbedIdMobile: tiktokEmbedIdMobile.trim(),
        tiktokProfileUrl,
      });

      setMessageType('success');
      setMessage('TikTok settings saved! Your feed widget will appear in the gallery.');
      setTimeout(() => setMessage(''), 5000);
    } catch (err) {
      console.error('Failed to update TikTok settings:', err);
      setMessageType('error');
      setMessage('Failed to update TikTok settings. Please try again.');
    }
  };

  const handleYouTubeSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const settings = await getSettings();
      await saveSettings({
        ...settings,
        youtubeApiKey,
        youtubeChannelId
      });
      
      setMessageType('success');
      setMessage('YouTube settings updated successfully! Gallery will now fetch from your channel.');
      setTimeout(() => setMessage(''), 5000);
    } catch (err) {
      console.error('Failed to update YouTube settings:', err);
      setMessageType('error');
      setMessage('Failed to update YouTube settings. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-primary-dark">Settings</h2>
        <p className="text-sm sm:text-base text-gray-600">Manage your admin panel settings</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message}
        </div>
      )}

      {/* YouTube API Settings */}
      <div className="max-w-full sm:max-w-md mb-8">
        <div className="flex items-center gap-3 mb-6 p-3 sm:p-4 bg-red-50 rounded-lg">
          <Youtube className="h-5 w-5 text-red-600" />
          <div>
            <h3 className="font-semibold text-gray-800">YouTube API Settings</h3>
            <p className="text-sm text-gray-600">Connect your YouTube channel to auto-fetch videos</p>
          </div>
        </div>

        <form onSubmit={handleYouTubeSettings} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              YouTube API Key
            </label>
            <input
              type="text"
              value={youtubeApiKey}
              onChange={(e) => setYoutubeApiKey(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple transition-colors font-mono text-sm"
              placeholder="AIzaSyD..."
            />
            <p className="mt-1 text-xs text-gray-500">
              Get your API key from <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Cloud Console</a>
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              YouTube Channel ID
            </label>
            <input
              type="text"
              value={youtubeChannelId}
              onChange={(e) => setYoutubeChannelId(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple transition-colors font-mono text-sm"
              placeholder="UCSe_xvuLLef..."
            />
            <p className="mt-1 text-xs text-gray-500">
              Find your channel ID in YouTube Studio → Settings → Channel
            </p>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            <Save className="h-4 w-4" />
            Save YouTube Settings
          </button>
        </form>
      </div>

      {/* TikTok Embed Settings */}
      <div className="max-w-full sm:max-w-md mb-8">
        <div className="flex items-center gap-3 mb-6 p-3 sm:p-4 bg-cyan-50 rounded-lg">
          <svg className="h-5 w-5 text-cyan-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
          </svg>
          <div>
            <h3 className="font-semibold text-gray-800">TikTok Settings</h3>
            <p className="text-sm text-gray-600">SociableKIT TikTok feed widget for the gallery</p>
          </div>
        </div>

        <form onSubmit={handleTikTokSettings} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              SociableKIT Embed ID (Desktop)
            </label>
            <input
              type="text"
              value={tiktokEmbedId}
              onChange={(e) => setTiktokEmbedId(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple transition-colors font-mono text-sm"
              placeholder="25697428"
            />
            <p className="mt-1 text-xs text-gray-500">
              Desktop widget — data-embed-id from SociableKIT
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              SociableKIT Embed ID (Mobile)
            </label>
            <input
              type="text"
              value={tiktokEmbedIdMobile}
              onChange={(e) => setTiktokEmbedIdMobile(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple transition-colors font-mono text-sm"
              placeholder="25697429"
            />
            <p className="mt-1 text-xs text-gray-500">
              Mobile widget — shown on screens 768px and below
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              TikTok Profile Link
            </label>
            <input
              type="text"
              value={tiktokProfileUrl}
              onChange={(e) => setTiktokProfileUrl(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple transition-colors text-sm"
              placeholder="https://www.tiktok.com/@foliensam"
            />
            <p className="mt-1 text-xs text-gray-500">
              Used for the &quot;Follow us on TikTok&quot; button
            </p>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full bg-[#00f2ea] text-black py-3 rounded-lg hover:bg-[#00d1ca] transition-colors font-semibold"
          >
            <Save className="h-4 w-4" />
            Save TikTok Settings
          </button>
        </form>
      </div>

      {/* Password Change Section */}
      <div className="max-w-full sm:max-w-md">
        <div className="flex items-center gap-3 mb-6 p-3 sm:p-4 bg-blue-50 rounded-lg">
          <Key className="h-5 w-5 text-blue-600" />
          <div>
            <h3 className="font-semibold text-gray-800">Change Admin Password</h3>
            <p className="text-sm text-gray-600">Update your admin panel password</p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple transition-colors"
              placeholder="Enter current password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple transition-colors"
              placeholder="Enter new password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple transition-colors"
              placeholder="Confirm new password"
              required
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full bg-accent-purple text-white py-3 rounded-lg hover:bg-accent-purple/90 transition-colors font-semibold"
          >
            <Save className="h-4 w-4" />
            Update Password
          </button>
        </form>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important Notes</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Make sure to remember your new password</li>
          <li>• There is no password recovery system in this version</li>
          <li>• All data including settings is stored on your PHP server</li>
          <li>• Changes sync across all devices automatically</li>
          <li>• YouTube API fetches latest videos automatically</li>
          <li>• TikTok uses SociableKIT widget — customize colors in your SociableKIT dashboard</li>
        </ul>
      </div>
    </div>
  );
};

export default SettingsManager;

