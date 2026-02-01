import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PhotoIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import Section from '../components/Section';
import { galleryAPI } from '../services/api';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchGallery();
  }, [selectedCategory]);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      setError(null);
      const category = selectedCategory === 'all' ? null : selectedCategory;
      const data = await galleryAPI.getAll(category);
      setImages(data);
    } catch (err) {
      console.error('Error fetching gallery:', err);
      setError('Failed to load gallery images. Please try again later.');
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: 'All', value: 'all' },
    { name: 'Worship', value: 'worship' },
    { name: 'Baptism', value: 'baptism' },
    { name: 'Youth', value: 'youth' },
    { name: 'Outreach', value: 'outreach' },
    { name: 'Special Events', value: 'special' }
  ];

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
              <span className="text-amber-400 text-sm font-semibold tracking-wide uppercase font-display">
                Photo Gallery
              </span>
            </div>
            <h1 className="heading-primary mb-6">Heavenly Gallery</h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-accent">
              Capturing moments of faith, fellowship, and divine encounters
            </p>
            <div className="ornamental-divider w-64 mx-auto mt-8"></div>
          </motion.div>
        </div>
      </Section>

      {/* Gallery Section */}
      <Section className="bg-gradient-to-br from-midnight-950 via-royal-purple-900 to-midnight-900 pattern-crosses-ornate">
        {/* Category Filter */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2">
          <div className="glass-effect-strong rounded-full p-2 flex gap-2 border border-white/10 min-w-max">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 lg:px-6 py-2 rounded-full transition-all duration-300 font-display font-semibold whitespace-nowrap text-sm lg:text-base ${
                  selectedCategory === category.value
                    ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white/5 rounded-2xl h-64 animate-pulse"></div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-6 bg-red-600/20 rounded-full flex items-center justify-center">
              <ExclamationCircleIcon className="w-16 h-16 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 font-display">{error}</h3>
            <button onClick={fetchGallery} className="btn-primary mt-4">
              Try Again
            </button>
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && !error && images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {images.map((image, index) => (
              <motion.div 
                key={image._id} 
                className="relative group overflow-hidden rounded-2xl cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-amber-400/40 to-purple-600/40 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                <div className="relative z-10">
                  <img 
                    src={image.imageUrl} 
                    alt={image.title}
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex flex-col items-start justify-end p-4">
                    <h3 className="text-white font-semibold text-base lg:text-lg mb-1 font-display">{image.title}</h3>
                    {image.description && (
                      <p className="text-gray-200 text-xs lg:text-sm line-clamp-2 font-accent">{image.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && images.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-purple-600/20 to-amber-400/20 rounded-full flex items-center justify-center">
              <PhotoIcon className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 font-display">
              No images in this category
            </h3>
            <p className="text-gray-300 font-accent">Try selecting a different category or check back later!</p>
          </div>
        )}
      </Section>

      {/* Call to Action */}
      <Section 
        className="min-h-[40vh] flex items-center relative overflow-hidden pattern-crosses-animated"
      >
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-amber-600/80 z-10" />
        
        <div className="relative z-20 text-center text-white w-full max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-display">
              Be Part Of The Story
            </h2>
            <p className="text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto font-accent">
              Join us and become part of our faith community. Your story matters, and we'd love to capture and celebrate it together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4">
                Join Us Sunday
              </button>
              <button className="btn-secondary text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4">
                View Events
              </button>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default Gallery;