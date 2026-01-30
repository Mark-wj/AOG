import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section 
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-royal-purple-900/90 via-midnight-900/80 to-royal-purple-950/90 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-transparent to-transparent z-10"></div>
      
      {/* Animated Pattern Overlay */}
      <div className="absolute inset-0 pattern-crosses opacity-30 z-10"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-10">
        {/* Floating orbs */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 2 === 0 
                ? 'radial-gradient(circle, rgba(251, 191, 36, 0.15), transparent)' 
                : 'radial-gradient(circle, rgba(168, 85, 247, 0.15), transparent)',
              filter: 'blur(40px)',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 30 - 15, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#a855f7' : '#ffffff',
              boxShadow: i % 3 === 0 
                ? '0 0 10px #fbbf24' 
                : i % 3 === 1 
                  ? '0 0 10px #a855f7' 
                  : '0 0 10px #ffffff',
            }}
            animate={{
              y: [0, -150, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center text-white max-w-6xl mx-auto px-4">
        {/* Church Logo/Emblem */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="w-32 h-32 mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-2xl shadow-amber-500/50 border-4 border-white/20">
              <span className="text-5xl">✝️</span>
            </div>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="heading-primary mb-6 leading-tight">
            Welcome to<br />
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Armor of God
            </span>
            <br />
            <span className="text-5xl md:text-6xl">
              Evangelical Worldwide Ministry
            </span>
          </h1>
        </motion.div>
        
        {/* Subtitle */}
        <motion.p 
          className="text-2xl md:text-3xl mb-4 font-accent text-amber-300 font-semibold"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Where Faith Meets Grace in Divine Harmony
        </motion.p>

        {/* Mission Statement */}
        <motion.div
          className="glass-effect-strong rounded-3xl p-8 mb-10 max-w-4xl mx-auto backdrop-blur-2xl border-2 border-amber-400/30"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <p className="text-xl md:text-2xl text-white/95 leading-relaxed italic">
            "Arming People With The Word Of God, And The Gospel Of Jesus Christ In These Endtimes Because 
            <span className="text-amber-400 font-bold"> Jesus Christ Is Soon To Come</span>"
          </p>
        </motion.div>
        
        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <motion.button 
            className="btn-primary text-lg px-10 py-5 relative group overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center">
              Join Us This Sunday
              <motion.span 
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
          
          <motion.button 
            className="btn-secondary text-lg px-10 py-5 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-2">▶</span>
            Watch Live Stream
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center">
          <span className="text-amber-400 text-sm font-semibold mb-2 tracking-wider">SCROLL TO EXPLORE</span>
          <div className="w-8 h-12 border-2 border-amber-400 rounded-full flex justify-center p-2">
            <motion.div 
              className="w-1.5 h-3 bg-amber-400 rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent z-20"></div>
    </section>
  );
};

export default HeroSection;