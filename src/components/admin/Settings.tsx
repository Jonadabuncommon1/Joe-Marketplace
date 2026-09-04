import React, { useState } from 'react';
import { Lock, Mail } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

export const Settings = () => {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Email update initiated. Please check both your old and new email addresses to confirm the change.');
      setNewEmail('');
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Password updated successfully!');
      setNewPassword('');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Store Settings</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Configure global platform behavior and security.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0a0a0a] p-6 rounded-2xl border dark:border-white/10 shadow-sm space-y-8 transition-colors duration-500">

        {/* Info Setup */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold border-b dark:border-white/10 pb-2">Business Details</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Company name, WhatsApp numbers, branch addresses and bank details are set in one place in
            the code (<code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/10 text-xs">src/config/site.ts</code>),
            not here, so every part of the site (checkout, footer, contact page, AI assistant) always
            shows the same values. Tell your developer what to change and it updates everywhere at once.
          </p>
        </div>

        {/* Security / Admin Credentials */}
        <div className="space-y-4 pt-4">
          <h2 className="text-lg font-bold border-b dark:border-white/10 pb-2 text-red-600 dark:text-red-400">Security & Authentication</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Update your admin login credentials below. This communicates directly with your Supabase Authentication backend.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <form onSubmit={handleUpdateEmail} className="space-y-3 p-4 border dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5">
              <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Mail size={16} /> Change Email
              </label>
              <input 
                type="email" 
                placeholder="New email address" 
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-gray-800 dark:text-white rounded-lg focus:outline-none focus:border-[#3626a7] transition-colors" 
                required 
              />
              <button disabled={loading} className="w-full flex items-center justify-center space-x-2 bg-white dark:bg-black dark:bg-white dark:text-black hover:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
                <span>Update Email</span>
              </button>
            </form>

            <form onSubmit={handleUpdatePassword} className="space-y-3 p-4 border dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5">
              <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Lock size={16} /> Change Password
              </label>
              <input 
                type="password" 
                placeholder="New password (min 6 chars)" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-gray-800 dark:text-white rounded-lg focus:outline-none focus:border-[#3626a7] transition-colors" 
                required 
                minLength={6}
              />
              <button disabled={loading} className="w-full flex items-center justify-center space-x-2 bg-white dark:bg-black dark:bg-white dark:text-black hover:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
                <span>Update Password</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};
