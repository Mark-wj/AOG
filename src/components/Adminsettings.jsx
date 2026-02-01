import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Cog6ToothIcon,
  MusicalNoteIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    musicUrl: '',
    musicEnabled: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [urlInfo, setUrlInfo] = useState('');

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

  const detectUrlType = (url) => {
    if (!url || url.trim() === '') {
      setUrlInfo('');
      return;
    }

    const trimmedUrl = url.trim();

    // Check for YouTube URLs
    if (trimmedUrl.includes('youtube.com') || trimmedUrl.includes('youtu.be')) {
      setUrlInfo('✅ YouTube URL detected - Will use YouTube player');
      return;
    }

    // Check for valid audio extensions
    const validExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.aac'];
    const hasValidExtension = validExtensions.some(ext => trimmedUrl.toLowerCase().includes(ext));

    if (hasValidExtension) {
      setUrlInfo('✅ Direct audio file detected - Will use native audio player');
      return;
    }

    setUrlInfo('⚠️ URL format not recognized - May not work as expected');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setSettings(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Detect URL type as user types
    if (name === 'musicUrl') {
      detectUrlType(value);
    }
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
              {/* Music URL */}
              <div>
                <label className="block text-gray-300 font-semibold mb-2 font-display">
                  Music URL (YouTube or Direct Audio File)
                </label>
                <input
                  type="url"
                  name="musicUrl"
                  value={settings.musicUrl}
                  onChange={handleInputChange}
                  placeholder="https://youtube.com/watch?v=... or https://example.com/music.mp3"
                  className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-all duration-300 font-accent"
                />
                
                {/* URL Type Info */}
                {urlInfo && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-2 p-3 rounded-lg flex items-start ${
                      urlInfo.startsWith('✅')
                        ? 'bg-green-600/20 border border-green-500/30 text-green-400'
                        : 'bg-yellow-600/20 border border-yellow-500/30 text-yellow-400'
                    }`}
                  >
                    <InformationCircleIcon className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold">{urlInfo}</span>
                  </motion.div>
                )}

                {/* Instructions */}
                <div className="mt-3 p-4 bg-purple-600/10 border border-purple-500/20 rounded-lg">
                  <p className="text-purple-300 text-sm font-semibold mb-3">📖 Supported URL Types:</p>
                  
                  <div className="space-y-3">
                    {/* YouTube */}
                    <div className="bg-red-600/10 border border-red-500/20 rounded-lg p-3">
                      <p className="text-red-300 font-semibold text-sm mb-2">🎥 YouTube URLs (Recommended)</p>
                      <ul className="text-red-200 text-xs space-y-1 ml-4 list-disc">
                        <li>https://youtube.com/watch?v=VIDEO_ID</li>
                        <li>https://youtu.be/VIDEO_ID</li>
                        <li>Perfect for streaming worship music</li>
                        <li>No file hosting needed</li>
                      </ul>
                    </div>

                    {/* Direct Audio */}
                    <div className="bg-blue-600/10 border border-blue-500/20 rounded-lg p-3">
                      <p className="text-blue-300 font-semibold text-sm mb-2">🎵 Direct Audio Files</p>
                      <ul className="text-blue-200 text-xs space-y-1 ml-4 list-disc">
                        <li>Upload MP3 to Dropbox/Google Drive</li>
                        <li>Get shareable link ending in .mp3</li>
                        <li>Better quality control</li>
                        <li>Works offline</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-purple-500/20">
                    <p className="text-purple-300 text-sm font-semibold mb-2">✅ Example URLs:</p>
                    <div className="space-y-2">
                      <code className="text-green-200 text-xs block bg-black/30 p-2 rounded">
                        YouTube: https://youtube.com/watch?v=fPbtP00p6-U
                      </code>
                      <code className="text-green-200 text-xs block bg-black/30 p-2 rounded">
                        MP3: https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3
                      </code>
                    </div>
                  </div>
                </div>
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
                  
                  {settings.musicUrl.includes('youtube.com') || settings.musicUrl.includes('youtu.be') ? (
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${extractYouTubeId(settings.musicUrl)}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <>
                      <audio controls className="w-full" src={settings.musicUrl}>
                        Your browser does not support the audio element.
                      </audio>
                      <p className="text-gray-400 text-xs mt-2">
                        If the audio doesn't play above, the URL may not be valid.
                      </p>
                    </>
                  )}
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
            🎵 Music Guidelines
          </h3>
          <ul className="space-y-2 text-gray-300 font-accent">
            <li className="flex items-start">
              <span className="text-amber-400 mr-2">•</span>
              Use worship or instrumental music appropriate for church
            </li>
            <li className="flex items-start">
              <span className="text-amber-400 mr-2">•</span>
              Ensure you have proper licensing rights
            </li>
            <li className="flex items-start">
              <span className="text-amber-400 mr-2">•</span>
              Music auto-plays after user interaction
            </li>
            <li className="flex items-start">
              <span className="text-amber-400 mr-2">•</span>
              Users can control volume and pause
            </li>
          </ul>
        </div>

        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-3 font-display">
            🎥 YouTube vs MP3
          </h3>
          <div className="space-y-3 text-gray-300 font-accent text-sm">
            <div>
              <p className="text-white font-semibold mb-1">YouTube Benefits:</p>
              <ul className="space-y-1 ml-4 list-disc">
                <li>Easy to use - just paste the URL</li>
                <li>No file hosting required</li>
                <li>Huge music library available</li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold mb-1">Direct MP3 Benefits:</p>
              <ul className="space-y-1 ml-4 list-disc">
                <li>Better audio quality control</li>
                <li>Works offline</li>
                <li>No ads or interruptions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to extract YouTube video ID
const extractYouTubeId = (url) => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\?\/]+)/,
    /youtube\.com\/watch\?.*v=([^&]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) return match[1];
  }
  
  return '';
};

export default AdminSettings;