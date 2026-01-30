import React, { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Ministries', path: '/ministries' },
    { name: 'Sermons', path: '/sermons' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'glass-effect-strong shadow-xl border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo with Cross Icon */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
              className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-2xl">✝️</span>
            </motion.div>
            <div className="hidden lg:block">
              <div className="font-display text-xl font-bold">
                <span className="text-gold-soft">Armor of God</span>
              </div>
              <div className="font-accent text-sm text-gray-300 italic">
                Evangelical Worldwide Ministry
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 font-display text-sm relative group ${
                    isActivePath(item.path)
                      ? 'text-gold-soft bg-white/10'
                      : 'text-white hover:text-gold-soft hover:bg-white/5'
                  }`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gold-soft transform origin-left transition-transform duration-300 ${
                    isActivePath(item.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </Link>
              ))}
              
              {/* Admin Link */}
              <Link
                to="/admin"
                className="ml-4 px-5 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg transition-all duration-300 font-display text-sm flex items-center space-x-2 shadow-lg hover:shadow-purple-500/50"
              >
                <span>⚙️</span>
                <span>Admin</span>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <Link
              to="/admin"
              className="px-3 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg text-sm"
            >
              <span>⚙️</span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gold-soft transition-colors p-2"
            >
              {isOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="glass-effect-strong rounded-2xl my-4 py-4 border border-white/10">
                <div className="px-4 space-y-2">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={item.path}
                        className={`block px-4 py-3 transition-colors rounded-xl font-display ${
                          isActivePath(item.path)
                            ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-gold-soft border border-gold-soft/30'
                            : 'text-white hover:text-gold-soft hover:bg-white/10'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navigation.length * 0.05 }}
                  >
                    <Link
                      to="/admin"
                      className="block px-4 py-3 mt-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-display text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      ⚙️ Admin Panel
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative bottom border */}
      {scrolled && (
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-soft to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </nav>
  );
};

export default Navbar;