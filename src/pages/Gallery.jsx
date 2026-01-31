import React from 'react';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import ImageGallery from '../components/ImageGallery';

const Gallery = () => {
  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      alt: "Worship Service",
      title: "Sunday Worship",
      category: "worship"
    },
    {
      url: "https://images.unsplash.com/photo-1724035292068-f9e0b3ddd2b7?q=80&w=1169&auto=format&fit=crop",
      alt: "Baptism",
      title: "Baptism Service",
      category: "baptism"
    },
    {
      url: "https://images.unsplash.com/photo-1522543558187-768b6df7c25c?w=400&auto=format&fit=crop&q=60",
      alt: "Community Event",
      title: "Community Outreach",
      category: "outreach"
    },
    {
      url: "https://images.unsplash.com/photo-1702399853315-dd6344d1c1e9?q=80&w=687&auto=format&fit=crop",
      alt: "Christmas Service",
      title: "Christmas Eve",
      category: "special"
    },
    {
      url: "https://images.unsplash.com/photo-1593896385987-16bcbf9451e5?q=80&w=997&auto=format&fit=crop",
      alt: "Youth Group",
      title: "Youth Ministry",
      category: "youth"
    },
    {
      url: "https://images.unsplash.com/photo-1641337261712-3cb3f398331f?q=80&w=687&auto=format&fit=crop",
      alt: "Prayer Meeting",
      title: "Prayer Night",
      category: "prayer"
    },
    {
      url: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?q=80&w=1170&auto=format&fit=crop",
      alt: "Church Building",
      title: "Our Sanctuary",
      category: "building"
    },
    {
      url: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      alt: "Bible Study",
      title: "Small Groups",
      category: "study"
    },
    {
      url: "https://images.unsplash.com/photo-1501281667305-0d4ebd5b1e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      alt: "Praise and Worship",
      title: "Worship Team",
      category: "worship"
    },
    {
      url: "https://images.unsplash.com/photo-1465847899084-d164dfdded4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      alt: "Family Service",
      title: "Family Ministry",
      category: "family"
    },
    {
      url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      alt: "Easter Celebration",
      title: "Easter Sunday",
      category: "special"
    },
    {
      url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      alt: "Church Service",
      title: "Sunday Morning",
      category: "worship"
    }
  ];

  const categories = [
    { name: 'All', value: 'all', icon: '🖼️' },
    { name: 'Worship', value: 'worship', icon: '🎵' },
    { name: 'Baptism', value: 'baptism', icon: '💧' },
    { name: 'Youth', value: 'youth', icon: '👥' },
    { name: 'Outreach', value: 'outreach', icon: '🌍' },
    { name: 'Special Events', value: 'special', icon: '⭐' }
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
              <span className="text-amber-400 text-sm font-semibold tracking-wide uppercase">
                Photo Gallery
              </span>
            </div>
            <h1 className="heading-primary mb-6">Heavenly Gallery</h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Capturing moments of faith, fellowship, and divine encounters
            </p>
            <div className="ornamental-divider w-64 mx-auto mt-8"></div>
          </motion.div>
        </div>
      </Section>

      {/* Main Gallery */}
      <Section className="bg-gradient-to-br from-midnight-950 via-royal-purple-900 to-midnight-900 pattern-crosses-ornate">
        <ImageGallery images={galleryImages} columns={4} />
      </Section>

      {/* Worship Moments */}
      <Section 
        title="Worship Moments" 
        subtitle="Capturing the spirit of our services"
        className="animated-gradient pattern-crosses"
      >
        <ImageGallery 
          images={galleryImages.filter(img => img.category === 'worship')} 
          columns={3} 
        />
      </Section>

      {/* Community Events */}
      <Section 
        title="Community Events" 
        subtitle="Building relationships beyond our walls"
        className="bg-gradient-to-br from-royal-purple-900 via-midnight-900 to-royal-purple-950 pattern-crosses-large"
      >
        <ImageGallery 
          images={galleryImages.filter(img => img.category === 'outreach' || img.category === 'special')} 
          columns={4} 
        />
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
              Be Part Of The Story
            </h2>
            <p className="text-xl mb-8 leading-relaxed max-w-2xl mx-auto">
              Join us and become part of our faith community. Your story matters, and we'd love to capture and celebrate it together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4">
                Join Us Sunday
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
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