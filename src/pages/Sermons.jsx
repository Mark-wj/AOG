import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayIcon, XMarkIcon, CalendarIcon, UserIcon, EyeIcon } from '@heroicons/react/24/outline';
import Section from '../components/Section';
import Card from '../components/Card';
import { sermonsAPI } from '../services/api';

const Sermons = () => {
  const [sermons, setSermons] = useState([]);
  const [selectedSermon, setSelectedSermon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSermons();
  }, []);

  const fetchSermons = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await sermonsAPI.getAll();
      setSermons(data);
    } catch (err) {
      console.error('Error fetching sermons:', err);
      setError('Failed to load sermons. Please try again later.');
      setSermons([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSermonClick = async (sermon) => {
    try {
      // Fetch sermon by ID to increment view count
      const updatedSermon = await sermonsAPI.getById(sermon._id);
      setSelectedSermon(updatedSermon);
    } catch (err) {
      console.error('Error loading sermon:', err);
      setSelectedSermon(sermon);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <Section 
        className="min-h-[50vh] flex items-center relative overflow-hidden pattern-crosses-large"
      >
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1465847899084-d164dfdded4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight-950/95 via-purple-900/90 to-midnight-900/95 z-10" />
        
        <div className="relative z-20 text-center text-white w-full max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-6 py-2 bg-amber-400/20 rounded-full mb-6 border border-amber-400/30">
              <span className="text-amber-400 text-sm font-semibold tracking-wide uppercase">
                Messages
              </span>
            </div>
            <h1 className="heading-primary mb-6">Sermons</h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Messages to inspire and transform your spiritual journey
            </p>
            <div className="ornamental-divider w-64 mx-auto mt-8"></div>
          </motion.div>
        </div>
      </Section>

      {/* Sermons Content */}
      <Section className="bg-gradient-to-br from-midnight-950 via-royal-purple-900 to-midnight-900 pattern-crosses-ornate">
        {/* Loading State */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass-effect-strong rounded-2xl p-6 animate-pulse">
                <div className="bg-white/10 h-48 rounded-xl mb-4"></div>
                <div className="bg-white/10 h-6 rounded mb-2"></div>
                <div className="bg-white/10 h-4 rounded w-3/4 mb-2"></div>
                <div className="bg-white/10 h-4 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-6 bg-red-600/20 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 font-display">{error}</h3>
            <button onClick={fetchSermons} className="btn-primary mt-4">
              Try Again
            </button>
          </div>
        )}

        {/* Sermons Grid */}
        {!loading && !error && sermons.length > 0 && (
          <>
            {/* Featured Sermon */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="text-center mb-12">
                <div className="inline-block px-6 py-2 bg-amber-400/20 rounded-full mb-4 border border-amber-400/30">
                  <span className="text-amber-400 text-sm font-semibold tracking-wide uppercase">
                    Featured Message
                  </span>
                </div>
                <h2 className="heading-secondary">Latest Sermon</h2>
              </div>

              <Card className="overflow-hidden group cursor-pointer" onClick={() => handleSermonClick(sermons[0])}>
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-96 lg:h-auto">
                    <img 
                      src={sermons[0].image}
                      alt={sermons[0].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent lg:from-gray-900/50"></div>
                    
                    <button 
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-2xl"
                    >
                      <PlayIcon className="w-10 h-10 text-midnight-950 ml-1" />
                    </button>
                  </div>
                  
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    {sermons[0].series && (
                      <div className="inline-block px-4 py-2 bg-purple-600/30 rounded-lg mb-4 self-start">
                        <span className="text-purple-300 font-semibold text-sm">{sermons[0].series}</span>
                      </div>
                    )}
                    
                    <h3 className="text-4xl font-bold text-white my-4 font-display">
                      {sermons[0].title}
                    </h3>
                    
                    <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                      {sermons[0].description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-6 mb-6">
                      <div className="flex items-center text-white">
                        <UserIcon className="w-5 h-5 mr-2 text-amber-400" />
                        <span className="font-semibold">{sermons[0].speaker}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CalendarIcon className="w-5 h-5 mr-2 text-amber-400" />
                        <span>{sermons[0].date}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <EyeIcon className="w-5 h-5 mr-2 text-amber-400" />
                        <span>{sermons[0].views || 0} views</span>
                      </div>
                    </div>
                    
                    <button className="btn-primary w-full lg:w-auto">
                      Watch Now
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Recent Sermons */}
            {sermons.length > 1 && (
              <>
                <div className="text-center mb-12">
                  <h2 className="heading-secondary">Recent Messages</h2>
                  <p className="text-gray-300 text-lg mt-4">
                    Browse our sermon archive for biblical teaching and inspiration
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sermons.slice(1).map((sermon, index) => (
                    <motion.div
                      key={sermon._id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <Card 
                        className="group h-full cursor-pointer" 
                        onClick={() => handleSermonClick(sermon)}
                      >
                        <div className="relative overflow-hidden rounded-xl mb-4">
                          <img 
                            src={sermon.image}
                            alt={sermon.title}
                            className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                              <PlayIcon className="w-8 h-8 text-midnight-950 ml-1" />
                            </div>
                          </div>
                        </div>
                        
                        {sermon.series && (
                          <div className="inline-block px-3 py-1 bg-purple-600/30 rounded-lg mb-3">
                            <span className="text-purple-300 text-xs font-semibold">{sermon.series}</span>
                          </div>
                        )}
                        
                        <h3 className="text-xl font-bold text-white mb-3 font-display group-hover:text-amber-400 transition-colors line-clamp-2">
                          {sermon.title}
                        </h3>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-gray-300 text-sm">
                            <UserIcon className="w-4 h-4 mr-2 text-amber-400" />
                            <span>{sermon.speaker}</span>
                          </div>
                          <div className="flex items-center text-gray-300 text-sm">
                            <CalendarIcon className="w-4 h-4 mr-2 text-amber-400" />
                            <span>{sermon.date}</span>
                          </div>
                          <div className="flex items-center text-gray-300 text-sm">
                            <EyeIcon className="w-4 h-4 mr-2 text-amber-400" />
                            <span>{sermon.views || 0} views</span>
                          </div>
                        </div>
                        
                        <button className="btn-outline w-full text-sm py-2">
                          Watch Sermon
                        </button>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && !error && sermons.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-purple-600/20 to-amber-400/20 rounded-full flex items-center justify-center">
              <PlayIcon className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 font-display">No sermons available</h3>
            <p className="text-gray-300">Check back later for new messages!</p>
          </div>
        )}
      </Section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedSermon && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSermon(null)}
          >
            <motion.div
              className="glass-effect-strong rounded-3xl p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  {selectedSermon.series && (
                    <div className="inline-block px-3 py-1 bg-purple-600/30 rounded-lg mb-2">
                      <span className="text-purple-300 text-sm font-semibold">{selectedSermon.series}</span>
                    </div>
                  )}
                  <h3 className="text-3xl font-bold text-white font-display">{selectedSermon.title}</h3>
                </div>
                <button 
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors duration-300"
                  onClick={() => setSelectedSermon(null)}
                >
                  <XMarkIcon className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Video Player */}
              <div className="aspect-video bg-gray-900 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden">
                <div className="absolute inset-0 pattern-crosses opacity-10"></div>
                <div className="relative z-10 text-center text-white">
                  <div className="w-24 h-24 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PlayIcon className="w-12 h-12 text-midnight-950 ml-1" />
                  </div>
                  <p className="text-lg">Video player would be embedded here</p>
                  {selectedSermon.videoUrl && (
                    <p className="text-sm text-gray-400 mt-2">{selectedSermon.videoUrl}</p>
                  )}
                </div>
              </div>

              {/* Sermon Details */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center text-white">
                    <UserIcon className="w-5 h-5 mr-2 text-amber-400" />
                    <span className="font-semibold">{selectedSermon.speaker}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CalendarIcon className="w-5 h-5 mr-2 text-amber-400" />
                    <span>{selectedSermon.date}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <EyeIcon className="w-5 h-5 mr-2 text-amber-400" />
                    <span>{selectedSermon.views || 0} views</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-2 font-display">Description</h4>
                  <p className="text-gray-300 leading-relaxed">{selectedSermon.description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sermons;