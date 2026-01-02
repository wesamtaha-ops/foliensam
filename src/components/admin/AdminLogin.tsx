import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { checkAdminPassword } from '../../services/dataService';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isValid = await checkAdminPassword(password);
      if (isValid) {
        onLogin();
        setError('');
      } else {
        setError('Invalid password');
      }
    } catch (err) {
      console.error('Failed to check password:', err);
      setError('Failed to verify password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark to-gray-900 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-accent-purple rounded-full mb-3 sm:mb-4">
            <Lock className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary-dark">Admin Panel</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">Enter your password to continue</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-purple transition-colors"
                placeholder="Enter admin password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-accent-purple text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-accent-purple/90 transition-colors"
          >
            Login
          </button>
        </form>

        <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500">
          <p>Default password: admin123</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

