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
  const [volume, setVolume] = useState(30); // 0-100 for YouTube
  const [musicUrl, setMusicUrl] = useState('');
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [playerType, setPlayerType] = useState(null); // 'audio' or 'youtube'
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
      // Remove trailing slash to prevent double slashes
      const apiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
      
      console.log('Fetching music settings from:', `${apiUrl}/api/settings/music`);
      const response = await fetch(`${apiUrl}/api/settings/music`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Music settings response:', data);
        
        if (data.musicUrl && data.musicUrl.trim() !== '') {
          const url = data.musicUrl.trim();
          
          // Determine player type
          if (isYouTubeUrl(url)) {
            console.log('✅ YouTube URL detected:', url);
            setPlayerType('youtube');
            setMusicUrl(url);
          } else {
            // Check if it's a valid audio file
            const validExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.aac'];
            const hasValidExtension = validExtensions.some(ext => url.toLowerCase().includes(ext));
            
            if (!hasValidExtension) {
              console.warn('⚠️ URL may not be a direct audio file:', url);
            }
            
            console.log('✅ Direct audio URL detected:', url);
            setPlayerType('audio');
            setMusicUrl(url);
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
      }
    } catch (error) {
      console.error('Error fetching music URL:', error);
    } finally {
      setIsLoading(false);
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
        },
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
            console.log('YouTube music is playing');
          } else if (event.data === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
          } else if (event.data === window.YT.PlayerState.ENDED) {
            // Loop should handle this, but just in case
            event.target.playVideo();
          }
        },
        onError: (event) => {
          console.error('YouTube player error:', event.data);
          // Error codes:
          // 2 - Invalid parameter
          // 5 - HTML5 player error
          // 100 - Video not found
          // 101/150 - Video not allowed to be played in embedded players
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
        // Attempt auto-play when ready
        if (!autoPlayAttemptedRef.current && musicEnabled) {
          autoPlayAttemptedRef.current = true;
          playAudioWithFallback();
        }
      };
      
      const handleError = (e) => {
        console.error('Audio error:', e);
        setIsPlaying(false);
      };
      
      const handlePlay = () => {
        setIsPlaying(true);
        console.log('Audio is playing');
      };
      
      const handlePause = () => {
        setIsPlaying(false);
      };
      
      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('error', handleError);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      
      return () => {
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
      };
    }
  }, [playerType, musicUrl, volume, musicEnabled]);

  // Fallback auto-play attempt with user interaction detection
  const playAudioWithFallback = async () => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
      console.log('Audio auto-play successful');
    } catch (error) {
      console.log('Auto-play blocked by browser, will play on first interaction');
      
      // Set up one-time event listener for user interaction
      const playOnInteraction = async () => {
        try {
          await audioRef.current.play();
          console.log('Audio started after user interaction');
          // Remove listeners after successful play
          document.removeEventListener('click', playOnInteraction);
          document.removeEventListener('scroll', playOnInteraction);
          document.removeEventListener('keydown', playOnInteraction);
          document.removeEventListener('touchstart', playOnInteraction);
        } catch (err) {
          console.error('Failed to play audio:', err);
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
      }
    } catch (error) {
      console.error('Error playing music:', error);
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
          autoPlay 
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
                className="text-white hover:text-amber-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
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
                className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer music-slider"
                aria-label="Volume control"
              />
            </div>

            {/* Info */}
            <div className="hidden md:block">
              <p className="text-xs text-amber-400 font-semibold font-display">
                {playerType === 'youtube' ? 'YouTube Music' : 'Worship Music'}
              </p>
              {isPlaying && (
                <p className="text-xs text-green-400">● Playing</p>
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
      `}</style>
    </>
  );
};

export default BackgroundMusic;