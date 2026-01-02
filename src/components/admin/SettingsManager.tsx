import React, { useState } from 'react';
import { Save, Key } from 'lucide-react';
import { updateAdminPassword } from '../../services/dataService';

const SettingsManager: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const handlePasswordChange = (e: React.FormEvent) => {
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

    updateAdminPassword(newPassword);
    setMessageType('success');
    setMessage('Password updated successfully! Please remember your new password.');
    
    // Reset form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    
    setTimeout(() => setMessage(''), 5000);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary-dark">Settings</h2>
        <p className="text-gray-600">Manage your admin panel settings</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message}
        </div>
      )}

      <div className="max-w-md">
        <div className="flex items-center gap-3 mb-6 p-4 bg-blue-50 rounded-lg">
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
          <li>• All data is stored in your browser's localStorage</li>
          <li>• Clearing browser data will reset everything to defaults</li>
        </ul>
      </div>
    </div>
  );
};

export default SettingsManager;

