import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlayIcon, 
  PauseIcon, 
  SpeakerWaveIcon, 
  SpeakerXMarkIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/solid';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(30); // 0-100 for YouTube
  const [musicUrl, setMusicUrl] = useState('');
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [playerType, setPlayerType] = useState(null); // 'audio' or 'youtube'
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const audioRef = useRef(null);
  const youtubePlayerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const autoPlayAttemptedRef = useRef(false);

  // Load YouTube IFrame API
  useEffect(() => {
    // Check if YouTube API is already loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // YouTube API ready callback
    window.onYouTubeIframeAPIReady = () => {
      console.log('YouTube IFrame API Ready');
    };
  }, []);

  // Fetch music URL from API
  useEffect(() => {
    fetchMusicUrl();
  }, []);

  const fetchMusicUrl = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Remove trailing slash to prevent double slashes
      const apiUrl = (import.meta.env.VITE_API_URL || 'https://aog-backend-production.up.railway.app/').replace(/\/$/, '');
      
      console.log('Fetching music settings from:', `${apiUrl}/api/settings/music`);
      const response = await fetch(`${apiUrl}/api/settings/music`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Music settings response:', data);
        
        if (data.musicUrl && data.musicUrl.trim() !== '') {
          let url = data.musicUrl.trim();
          
          // Fix Dropbox URLs
          url = fixDropboxUrl(url);
          
          // Determine player type
          if (isYouTubeUrl(url)) {
            console.log('✅ YouTube URL detected:', url);
            setPlayerType('youtube');
            setMusicUrl(url);
          } else if (isDropboxUrl(url)) {
            console.log('✅ Dropbox URL detected and fixed:', url);
            setPlayerType('audio');
            setMusicUrl(url);
          } else {
            // Regular audio URL
            const validationResult = await validateAudioUrl(url);
            if (validationResult.isValid) {
              console.log('✅ Valid audio URL detected:', url);
              setPlayerType('audio');
              setMusicUrl(url);
            } else {
              console.error('❌ Invalid audio URL:', validationResult.error);
              setError(validationResult.error);
              setShowError(true);
              setMusicEnabled(false);
              return;
            }
          }
          
          // Check if music is enabled
          const settingsResponse = await fetch(`${apiUrl}/api/settings`);
          if (settingsResponse.ok) {
            const settingsData = await settingsResponse.json();
            console.log('Full settings response:', settingsData);
            setMusicEnabled(settingsData.musicEnabled !== false);
          } else {
            setMusicEnabled(true);
          }
        } else {
          console.log('No valid music URL found in settings');
          setMusicEnabled(false);
        }
      } else {
        console.error('Failed to fetch music settings:', response.status);
        setError('Failed to load music settings');
      }
    } catch (error) {
      console.error('Error fetching music URL:', error);
      setError('Network error loading music');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to check if URL is Dropbox
  const isDropboxUrl = (url) => {
    return url.includes('dropbox.com');
  };

  // Fix Dropbox URLs to be direct download links
  const fixDropboxUrl = (url) => {
    if (!isDropboxUrl(url)) return url;
    
    // Replace www.dropbox.com with dl.dropboxusercontent.com for direct download
    // OR change dl=0 to dl=1 for direct download
    if (url.includes('www.dropbox.com')) {
      // Method 1: Change dl=0 to dl=1
      if (url.includes('dl=0')) {
        const fixedUrl = url.replace('dl=0', 'dl=1');
        console.log('Fixed Dropbox URL (dl=1):', fixedUrl);
        return fixedUrl;
      }
      // If no dl parameter, add it
      if (!url.includes('dl=')) {
        const separator = url.includes('?') ? '&' : '?';
        const fixedUrl = url + separator + 'dl=1';
        console.log('Fixed Dropbox URL (added dl=1):', fixedUrl);
        return fixedUrl;
      }
    }
    
    return url;
  };

  // Validate audio URL before using it
  const validateAudioUrl = async (url) => {
    try {
      // Check if it has a valid audio extension
      const validExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac', '.opus'];
      const hasValidExtension = validExtensions.some(ext => url.toLowerCase().includes(ext));
      
      if (!hasValidExtension && !isDropboxUrl(url)) {
        // Try to check the content-type header
        try {
          const response = await fetch(url, { method: 'HEAD' });
          const contentType = response.headers.get('content-type');
          
          if (!contentType || !contentType.startsWith('audio/')) {
            return {
              isValid: false,
              error: `URL does not point to an audio file (Content-Type: ${contentType || 'unknown'})`
            };
          }
        } catch (fetchError) {
          console.warn('Could not validate URL via HEAD request:', fetchError);
          // If HEAD request fails, we'll try to play it anyway
        }
      }
      
      return { isValid: true };
    } catch (error) {
      return {
        isValid: false,
        error: 'Could not validate audio URL'
      };
    }
  };

  // Helper function to check if URL is YouTube
  const isYouTubeUrl = (url) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\?\/]+)/,
      /youtube\.com\/watch\?.*v=([^&]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) return match[1];
    }
    
    return null;
  };

  // Initialize YouTube player when URL is set
  useEffect(() => {
    if (playerType === 'youtube' && musicUrl && window.YT && window.YT.Player) {
      initYouTubePlayer();
    }
  }, [playerType, musicUrl]);

  const initYouTubePlayer = () => {
    const videoId = getYouTubeVideoId(musicUrl);
    if (!videoId) {
      console.error('Could not extract YouTube video ID from:', musicUrl);
      setError('Invalid YouTube URL');
      setShowError(true);
      return;
    }

    console.log('Initializing YouTube player with video ID:', videoId);

    // Destroy existing player if any
    if (youtubePlayerRef.current) {
      youtubePlayerRef.current.destroy();
    }

    // Create player with autoplay
    youtubePlayerRef.current = new window.YT.Player(playerContainerRef.current, {
      height: '0',
      width: '0',
      videoId: videoId,
      playerVars: {
        autoplay: 1, // Auto-play immediately
        controls: 0,
        loop: 1,
        playlist: videoId, // Required for looping
        playsinline: 1,
        enablejsapi: 1,
        mute: 0, // Start unmuted
      },
      events: {
        onReady: (event) => {
          console.log('YouTube player ready - starting auto-play');
          event.target.setVolume(volume);
          // Force play in case autoplay didn't work
          event.target.playVideo();
          setIsPlaying(true);
          setError(null);
        },
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
            setError(null);
            console.log('YouTube music is playing');
          } else if (event.data === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
          } else if (event.data === window.YT.PlayerState.ENDED) {
            // Loop should handle this, but just in case
            event.target.playVideo();
          }
        },
        onError: (event) => {
          const errorMessages = {
            2: 'Invalid YouTube video parameter',
            5: 'HTML5 player error',
            100: 'Video not found or has been removed',
            101: 'Video cannot be embedded',
            150: 'Video cannot be embedded'
          };
          const errorMsg = errorMessages[event.data] || `YouTube error code: ${event.data}`;
          console.error('YouTube player error:', errorMsg);
          setError(errorMsg);
          setShowError(true);
          setIsPlaying(false);
        }
      }
    });
  };

  // Initialize audio element for non-YouTube URLs with auto-play
  useEffect(() => {
    if (playerType === 'audio' && musicUrl && audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.loop = true;
      
      const audio = audioRef.current;
      
      const handleCanPlay = () => {
        console.log('Audio can play - attempting auto-play');
        setError(null);
        // Attempt auto-play when ready
        if (!autoPlayAttemptedRef.current && musicEnabled) {
          autoPlayAttemptedRef.current = true;
          playAudioWithFallback();
        }
      };
      
      const handleError = (e) => {
        console.error('Audio error event:', e);
        
        // Get more specific error information
        const audio = e.target || e.currentTarget;
        let errorMessage = 'Audio playback error';
        
        if (audio && audio.error) {
          const errorCodes = {
            1: 'Audio loading aborted',
            2: 'Network error loading audio - Check your internet connection',
            3: 'Audio decoding failed - File format may be corrupted or unsupported',
            4: 'Audio source not supported, not found, or blocked by CORS'
          };
          errorMessage = errorCodes[audio.error.code] || `Audio error code: ${audio.error.code}`;
          
          // Special handling for CORS errors
          if (audio.error.code === 4 || audio.error.code === 2) {
            if (isDropboxUrl(musicUrl)) {
              errorMessage += '. Try using dl=1 in the Dropbox URL or use a different hosting service.';
            } else {
              errorMessage += '. The audio file may be blocked by CORS policy or does not exist.';
            }
          }
        }
        
        console.error('Detailed audio error:', errorMessage);
        console.error('Audio URL:', musicUrl);
        setError(errorMessage);
        setShowError(true);
        setIsPlaying(false);
      };
      
      const handlePlay = () => {
        setIsPlaying(true);
        setError(null);
        console.log('Audio is playing');
      };
      
      const handlePause = () => {
        setIsPlaying(false);
      };
      
      const handleLoadStart = () => {
        console.log('Audio loading started from:', musicUrl);
      };
      
      const handleLoadedMetadata = () => {
        console.log('Audio metadata loaded successfully');
      };
      
      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('error', handleError);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('loadstart', handleLoadStart);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      // Try to load the audio
      audio.load();
      
      return () => {
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('loadstart', handleLoadStart);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [playerType, musicUrl, volume, musicEnabled]);

  // Fallback auto-play attempt with user interaction detection
  const playAudioWithFallback = async () => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
      console.log('Audio auto-play successful');
      setError(null);
    } catch (error) {
      console.log('Auto-play blocked by browser, will play on first interaction');
      
      // Set up one-time event listener for user interaction
      const playOnInteraction = async () => {
        try {
          await audioRef.current.play();
          console.log('Audio started after user interaction');
          setError(null);
          // Remove listeners after successful play
          document.removeEventListener('click', playOnInteraction);
          document.removeEventListener('scroll', playOnInteraction);
          document.removeEventListener('keydown', playOnInteraction);
          document.removeEventListener('touchstart', playOnInteraction);
        } catch (err) {
          console.error('Failed to play audio:', err);
          setError('Unable to play audio - check the audio URL');
          setShowError(true);
        }
      };

      document.addEventListener('click', playOnInteraction, { once: true });
      document.addEventListener('scroll', playOnInteraction, { once: true });
      document.addEventListener('keydown', playOnInteraction, { once: true });
      document.addEventListener('touchstart', playOnInteraction, { once: true });
    }
  };

  const playMusic = async () => {
    if (!musicUrl || musicUrl.trim() === '') {
      console.log('Cannot play music: no URL');
      return;
    }

    try {
      if (playerType === 'youtube' && youtubePlayerRef.current) {
        console.log('Playing YouTube video');
        youtubePlayerRef.current.playVideo();
      } else if (playerType === 'audio' && audioRef.current) {
        console.log('Playing audio file');
        await audioRef.current.play();
        setIsPlaying(true);
        setError(null);
      }
    } catch (error) {
      console.error('Error playing music:', error);
      setError('Playback failed - check audio source');
      setShowError(true);
      setIsPlaying(false);
    }
  };

  const pauseMusic = () => {
    if (playerType === 'youtube' && youtubePlayerRef.current) {
      youtubePlayerRef.current.pauseVideo();
    } else if (playerType === 'audio' && audioRef.current) {
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
    if (playerType === 'youtube' && youtubePlayerRef.current) {
      if (isMuted) {
        youtubePlayerRef.current.unMute();
      } else {
        youtubePlayerRef.current.mute();
      }
      setIsMuted(!isMuted);
    } else if (playerType === 'audio' && audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    
    if (playerType === 'youtube' && youtubePlayerRef.current) {
      youtubePlayerRef.current.setVolume(newVolume);
      if (isMuted && newVolume > 0) {
        youtubePlayerRef.current.unMute();
        setIsMuted(false);
      }
    } else if (playerType === 'audio' && audioRef.current) {
      audioRef.current.volume = newVolume / 100;
      if (isMuted && newVolume > 0) {
        audioRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (youtubePlayerRef.current) {
        youtubePlayerRef.current.destroy();
      }
    };
  }, []);

  if (isLoading || !musicUrl || !musicEnabled) return null;

  return (
    <>
      {/* Hidden players - Audio only, no video visible */}
      {playerType === 'audio' && (
        <audio 
          ref={audioRef} 
          src={musicUrl} 
          preload="auto"
          style={{ display: 'none' }} 
        />
      )}
      {playerType === 'youtube' && (
        <div 
          ref={playerContainerRef} 
          style={{ 
            display: 'none',
            position: 'absolute',
            width: '0',
            height: '0',
            overflow: 'hidden',
            visibility: 'hidden'
          }} 
        />
      )}
      
      {/* Error notification */}
      <AnimatePresence>
        {error && showError && (
          <motion.div
            className="fixed bottom-32 right-8 z-50 max-w-sm"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <div className="glass-effect-strong rounded-xl p-4 border-2 border-red-400/30 shadow-xl">
              <div className="flex items-start space-x-3">
                <ExclamationTriangleIcon className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-400 mb-1">Music Player Error</p>
                  <p className="text-xs text-white/80 leading-relaxed">{error}</p>
                  {isDropboxUrl(musicUrl) && (
                    <p className="text-xs text-amber-300 mt-2">
                      💡 Tip: Change your Dropbox URL from dl=0 to dl=1 for direct download
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setShowError(false)}
                  className="text-white/60 hover:text-white transition-colors text-xl leading-none"
                >
                  ×
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        className="fixed bottom-8 right-8 z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className={`glass-effect-strong rounded-2xl p-4 border-2 ${
          error ? 'border-red-400/30' : 'border-amber-400/20'
        } shadow-2xl`}>
          <div className="flex items-center space-x-4">
            {/* Play/Pause Button */}
            <motion.button
              onClick={togglePlay}
              disabled={!!error}
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                error 
                  ? 'bg-gray-600 cursor-not-allowed opacity-50' 
                  : 'bg-gradient-to-br from-amber-400 to-amber-600 text-midnight-950 hover:shadow-xl'
              }`}
              whileHover={error ? {} : { scale: 1.1 }}
              whileTap={error ? {} : { scale: 0.9 }}
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
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
                disabled={!!error}
                className={`transition-colors ${
                  error 
                    ? 'text-gray-500 cursor-not-allowed' 
                    : 'text-white hover:text-amber-400'
                }`}
                whileHover={error ? {} : { scale: 1.1 }}
                whileTap={error ? {} : { scale: 0.9 }}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
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
                max="100"
                step="5"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                disabled={!!error}
                className={`w-20 h-1 bg-white/20 rounded-lg appearance-none music-slider ${
                  error ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                }`}
                aria-label="Volume control"
              />
            </div>

            {/* Info */}
            <div className="hidden md:block">
              <p className={`text-xs font-semibold font-display ${
                error ? 'text-red-400' : 'text-amber-400'
              }`}>
                {error ? 'Error' : (playerType === 'youtube' ? 'YouTube Music' : 'Worship Music')}
              </p>
              {isPlaying && !error && (
                <p className="text-xs text-green-400">● Playing</p>
              )}
              {error && (
                <button
                  onClick={() => setShowError(true)}
                  className="text-xs text-red-300 hover:text-red-200 underline"
                >
                  View error
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
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

        .music-slider:disabled::-webkit-slider-thumb {
          background: #6b7280;
          cursor: not-allowed;
        }

        .music-slider:disabled::-moz-range-thumb {
          background: #6b7280;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
};

export default BackgroundMusic;