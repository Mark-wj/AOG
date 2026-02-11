import React, { useMemo } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import {
  HomeIcon,
  CalendarIcon,
  MicrophoneIcon,
  EnvelopeIcon,
  PhotoIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Generate stable random values ONCE using useMemo to prevent flickering
  const backgroundElements = useMemo(() => {
    return [...Array(6)].map((_, i) => ({
      id: `bg-element-${i}`,
      width: Math.random() * 150 + 100,
      height: Math.random() * 150 + 100,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      background: i % 2 === 0 
        ? 'radial-gradient(circle, rgba(244, 208, 63, 0.08), transparent)' 
        : 'radial-gradient(circle, rgba(139, 92, 246, 0.08), transparent)',
      yMotion: [0, -(Math.random() * 40 + 20), 0],
      xMotion: [0, Math.random() * 40 - 20, 0],
      duration: Math.random() * 8 + 6,
    }));
  }, []); // Empty dependency array = only runs ONCE on mount

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: HomeIcon },
    { name: 'Events', path: '/admin/events', icon: CalendarIcon },
    { name: 'Sermons', path: '/admin/sermons', icon: MicrophoneIcon },
    { name: 'Messages', path: '/admin/messages', icon: EnvelopeIcon },
    { name: 'Gallery', path: '/admin/gallery', icon: PhotoIcon },
    { name: 'Settings', path: '/admin/settings', icon: Cog6ToothIcon },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight-950 via-royal-purple-900 to-midnight-900 pattern-crosses-animated">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {backgroundElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute rounded-full"
            style={{
              width: element.width,
              height: element.height,
              left: element.left,
              top: element.top,
              background: element.background,
              filter: 'blur(60px)',
              opacity: 0.4, // Fixed opacity instead of animated
            }}
            animate={{
              y: element.yMotion,
              x: element.xMotion,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Decorative crosses */}
      <div className="absolute top-10 left-10 text-gold-soft/5 text-6xl font-display pointer-events-none">✝</div>
      <div className="absolute bottom-10 right-10 text-purple-500/5 text-6xl font-display pointer-events-none">✝</div>

      <div className="relative z-10 flex">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-72 min-h-screen glass-effect-divine border-r-2 border-gold-soft/10 p-6"
        >
          {/* Logo/Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                <span className="text-white text-2xl font-bold">✝</span>
              </div>
              <div>
                <h2 className="text-white font-bold text-lg font-display">Admin Portal</h2>
                <p className="text-gray-400 text-xs font-accent">Armor of God</p>
              </div>
            </div>
            <div className="ornamental-divider w-full mt-4"></div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                    whileHover={{ x: isActive ? 0 : 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold font-display">{item.name}</span>
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="mt-auto pt-8">
            <motion.button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-600/20 border-2 border-red-500/30 text-red-400 hover:bg-red-600/30 hover:border-red-500/50 rounded-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span className="font-semibold">Logout</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;