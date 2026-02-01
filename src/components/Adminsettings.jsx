import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Cog6ToothIcon,
  MusicalNoteIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    musicUrl: '',
    musicEnabled: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/settings`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Settings saved successfully!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: 'Failed to save settings' });
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage({ type: 'error', text: 'Error saving settings' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-xl font-display">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white font-display flex items-center">
            <Cog6ToothIcon className="w-10 h-10 text-amber-400 mr-3" />
            Site Settings
          </h1>
          <p className="text-gray-300 mt-2 font-accent">Manage your website configuration</p>
        </div>
      </div>

      {/* Settings Form */}
      <div className="glass-effect-divine rounded-3xl p-8 border-2 border-gold-soft/20">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Background Music Settings */}
          <div>
            <div className="flex items-center mb-6">
              <MusicalNoteIcon className="w-6 h-6 text-amber-400 mr-3" />
              <h2 className="text-2xl font-bold text-white font-display">
                Background Music
              </h2>
            </div>

            <div className="space-y-6 pl-9">
              {/* Music URL - Now always enabled */}
              <div>
                <label className="block text-gray-300 font-semibold mb-2 font-display">
                  Music URL
                </label>
                <input
                  type="url"
                  name="musicUrl"
                  value={settings.musicUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/worship-music.mp3"
                  className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-all duration-300 font-accent"
                />
                <p className="text-gray-500 text-sm mt-2 font-accent">
                  Enter a direct link to an MP3 or audio file. The music will play automatically when users scroll.
                </p>
              </div>

              {/* Enable/Disable Music */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="musicEnabled"
                  name="musicEnabled"
                  checked={settings.musicEnabled}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-2 border-white/20 bg-white/5 checked:bg-amber-500 checked:border-amber-500 focus:ring-2 focus:ring-amber-400 transition-all"
                />
                <label htmlFor="musicEnabled" className="text-white font-semibold font-display cursor-pointer">
                  Enable background music
                </label>
              </div>

              {/* Music Preview */}
              {settings.musicUrl && settings.musicEnabled && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="glass-effect rounded-xl p-4"
                >
                  <p className="text-white font-semibold mb-2 font-display">Preview:</p>
                  <audio controls className="w-full" src={settings.musicUrl}>
                    Your browser does not support the audio element.
                  </audio>
                </motion.div>
              )}
            </div>
          </div>

          {/* Success/Error Message */}
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center p-4 rounded-xl ${
                message.type === 'success'
                  ? 'bg-green-600/20 border border-green-500/30 text-green-400'
                  : 'bg-red-600/20 border border-red-500/30 text-red-400'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircleIcon className="w-5 h-5 mr-2" />
              ) : (
                <ExclamationCircleIcon className="w-5 h-5 mr-2" />
              )}
              <span className="font-semibold font-display">{message.text}</span>
            </motion.div>
          )}

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <motion.button
              type="submit"
              disabled={saving}
              className={`btn-primary px-8 py-4 text-lg ${
                saving ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              whileHover={saving ? {} : { scale: 1.02 }}
              whileTap={saving ? {} : { scale: 0.98 }}
            >
              {saving ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save Settings'
              )}
            </motion.button>
          </div>
        </form>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-3 font-display">
            Music Guidelines
          </h3>
          <ul className="space-y-2 text-gray-300 font-accent">
            <li className="flex items-start">
              <span className="text-amber-400 mr-2">•</span>
              Use worship or instrumental music appropriate for a church setting
            </li>
            <li className="flex items-start">
              <span className="text-amber-400 mr-2">•</span>
              Ensure you have proper licensing for the music
            </li>
            <li className="flex items-start">
              <span className="text-amber-400 mr-2">•</span>
              Recommended volume: Low to medium for background ambiance
            </li>
            <li className="flex items-start">
              <span className="text-amber-400 mr-2">•</span>
              Music will auto-play when users scroll on the page
            </li>
          </ul>
        </div>

        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-3 font-display">
            Recommended Sources
          </h3>
          <ul className="space-y-2 text-gray-300 font-accent">
            <li className="flex items-start">
              <span className="text-amber-400 mr-2">•</span>
              Upload music to a cloud storage service (Dropbox, Google Drive)
            </li>
            <li className="flex items-start">
              <span className="text-amber-400 mr-2">•</span>
              Use royalty-free music from sites like Soundcloud or YouTube
            </li>
            <li className="flex items-start">
              <span className="text-amber-400 mr-2">•</span>
              Ensure the URL is a direct link to the audio file
            </li>
            <li className="flex items-start">
              <span className="text-amber-400 mr-2">•</span>
              Test the music URL in the preview player before saving
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;