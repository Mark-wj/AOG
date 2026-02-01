import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlayIcon, 
  PauseIcon, 
  SpeakerWaveIcon, 
  SpeakerXMarkIcon 
} from '@heroicons/react/24/solid';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [musicUrl, setMusicUrl] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  // Fetch music URL from API
  useEffect(() => {
    fetchMusicUrl();
  }, []);

  const fetchMusicUrl = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/settings/music`);
      if (response.ok) {
        const data = await response.json();
        if (data.musicUrl) {
          setMusicUrl(data.musicUrl);
        }
      }
    } catch (error) {
      console.error('Error fetching music URL:', error);
    }
  };

  // Initialize audio element
  useEffect(() => {
    if (musicUrl && audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = true;
    }
  }, [musicUrl, volume]);

  // Auto-play on scroll (after user interaction)
  useEffect(() => {
    const handleScroll = () => {
      if (!hasInteracted && window.scrollY > 100) {
        setHasInteracted(true);
      }
    };

    const handleClick = () => {
      setHasInteracted(true);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
    };
  }, [hasInteracted]);

  // Auto-play music when user has interacted
  useEffect(() => {
    if (hasInteracted && musicUrl && !isPlaying) {
      playMusic();
    }
  }, [hasInteracted, musicUrl]);

  const playMusic = () => {
    if (audioRef.current && musicUrl) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(error => console.error('Error playing music:', error));
    }
  };

  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  if (!musicUrl) return null;

  return (
    <>
      <audio ref={audioRef} src={musicUrl} />
      
      <motion.div
        className="fixed bottom-8 right-8 z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="glass-effect-strong rounded-2xl p-4 border-2 border-amber-400/20 shadow-2xl">
          <div className="flex items-center space-x-4">
            {/* Play/Pause Button */}
            <motion.button
              onClick={togglePlay}
              className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-midnight-950 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? (
                <PauseIcon className="w-6 h-6" />
              ) : (
                <PlayIcon className="w-6 h-6 ml-0.5" />
              )}
            </motion.button>

            {/* Volume Controls */}
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={toggleMute}
                className="text-white hover:text-amber-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMuted ? (
                  <SpeakerXMarkIcon className="w-6 h-6" />
                ) : (
                  <SpeakerWaveIcon className="w-6 h-6" />
                )}
              </motion.button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer music-slider"
              />
            </div>

            {/* Info */}
            <div className="hidden md:block">
              <p className="text-xs text-amber-400 font-semibold font-display">Worship Music</p>
            </div>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .music-slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(135deg, #fbbf24, #d97706);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .music-slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(135deg, #fbbf24, #d97706);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </>
  );
};

export default BackgroundMusic;