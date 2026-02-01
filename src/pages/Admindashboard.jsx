import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CalendarIcon, 
  MicrophoneIcon, 
  EnvelopeIcon, 
  PhotoIcon,
  PlusIcon,
  VideoCameraIcon,
  CameraIcon,
  InboxIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon,
  BoltIcon,
  CheckCircleIcon,
  ClockIcon,
  ServerIcon,
  CircleStackIcon,
  CloudIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalSermons: 0,
    totalMessages: 0,
    totalGalleryImages: 0,
  });

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    const adminUser = localStorage.getItem('adminUser');

    if (!token || !adminUser) {
      // Not logged in, redirect to login
      navigate('/admin/login');
    } else {
      setAdmin(JSON.parse(adminUser));
      fetchDashboardStats();
    }
  }, [navigate]);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('https://aog-backend-production.up.railway.app/api/admin/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Set mock data for now
      setStats({
        totalEvents: 12,
        totalSermons: 48,
        totalMessages: 25,
        totalGalleryImages: 156,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const statCards = [
    {
      title: 'Total Events',
      value: stats.totalEvents,
      icon: <CalendarIcon className="w-8 h-8" />,
      gradient: 'from-blue-500 to-blue-700',
      link: '/admin/events',
    },
    {
      title: 'Total Sermons',
      value: stats.totalSermons,
      icon: <MicrophoneIcon className="w-8 h-8" />,
      gradient: 'from-purple-500 to-purple-700',
      link: '/admin/sermons',
    },
    {
      title: 'New Messages',
      value: stats.totalMessages,
      icon: <EnvelopeIcon className="w-8 h-8" />,
      gradient: 'from-amber-500 to-amber-700',
      link: '/admin/messages',
    },
    {
      title: 'Gallery Images',
      value: stats.totalGalleryImages,
      icon: <PhotoIcon className="w-8 h-8" />,
      gradient: 'from-green-500 to-green-700',
      link: '/admin/gallery',
    },
  ];

  const quickActions = [
    { name: 'Add New Event', icon: <PlusIcon className="w-8 h-8" />, link: '/admin/events', gradient: 'from-blue-600 to-blue-800' },
    { name: 'Upload Sermon', icon: <VideoCameraIcon className="w-8 h-8" />, link: '/admin/sermons', gradient: 'from-purple-600 to-purple-800' },
    { name: 'Add to Gallery', icon: <CameraIcon className="w-8 h-8" />, link: '/admin/gallery', gradient: 'from-green-600 to-green-800' },
    { name: 'View Messages', icon: <InboxIcon className="w-8 h-8" />, link: '/admin/messages', gradient: 'from-amber-600 to-amber-800' },
  ];

  if (!admin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-midnight-950 via-royal-purple-900 to-midnight-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight-950 via-royal-purple-900 to-midnight-900 pattern-crosses-animated">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 150 + 100,
              height: Math.random() * 150 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 2 === 0 
                ? 'radial-gradient(circle, rgba(244, 208, 63, 0.1), transparent)' 
                : 'radial-gradient(circle, rgba(139, 92, 246, 0.1), transparent)',
              filter: 'blur(60px)',
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 40 - 20, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Decorative crosses */}
      <div className="absolute top-10 left-10 text-gold-soft/10 text-6xl font-display pointer-events-none">✝</div>
      <div className="absolute bottom-10 right-10 text-purple-500/10 text-6xl font-display pointer-events-none">✝</div>
      <div className="absolute top-1/2 right-20 text-gold-soft/5 text-8xl font-display pointer-events-none">✝</div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div
          className="glass-effect-divine rounded-3xl p-8 mb-8 border-2 border-gold-soft/20 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl shadow-amber-500/50">
                  <span className="text-white text-3xl font-bold">✝</span>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white font-display">
                    Welcome back, {admin.username}!
                  </h1>
                  <p className="text-gray-300 font-accent mt-1">
                    Armor of God Ministry - Admin Portal
                  </p>
                </div>
              </div>
              <div className="ornamental-divider w-48 mt-4"></div>
            </div>
            <motion.button
              onClick={handleLogout}
              className="btn-primary bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span>Logout</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link to={stat.link}>
                <div className="glass-effect-strong rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer border border-white/10 group card-glow">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {stat.icon}
                    </div>
                    <div className="text-right">
                      <motion.div 
                        className="text-5xl font-bold text-white font-display"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                      >
                        {stat.value}
                      </motion.div>
                    </div>
                  </div>
                  <h3 className="text-gray-300 font-semibold font-display">{stat.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6 font-display flex items-center">
            <BoltIcon className="w-8 h-8 text-amber-400 mr-3" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={action.name} to={action.link}>
                <motion.div
                  className={`bg-gradient-to-br ${action.gradient} rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer shadow-xl border border-white/20`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                >
                  <div className="text-white mb-3">{action.icon}</div>
                  <p className="text-white font-semibold font-display">{action.name}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity & Messages */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Activity */}
          <motion.div
            className="glass-effect-divine rounded-2xl p-6 border-2 border-gold-soft/20 shadow-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center font-display">
              <ChartBarIcon className="w-7 h-7 text-amber-400 mr-2" />
              Recent Activity
            </h3>
            <div className="space-y-4">
              {[
                { action: 'New sermon uploaded', time: '2 hours ago', icon: <MicrophoneIcon className="w-6 h-6" />, color: 'from-purple-500/20 to-purple-700/20' },
                { action: 'Event updated', time: '5 hours ago', icon: <CalendarIcon className="w-6 h-6" />, color: 'from-blue-500/20 to-blue-700/20' },
                { action: 'Gallery image added', time: '1 day ago', icon: <PhotoIcon className="w-6 h-6" />, color: 'from-green-500/20 to-green-700/20' },
                { action: 'New message received', time: '2 days ago', icon: <EnvelopeIcon className="w-6 h-6" />, color: 'from-amber-500/20 to-amber-700/20' },
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center justify-between p-4 bg-gradient-to-r ${activity.color} rounded-xl hover:scale-102 transition-all duration-300 border border-white/10`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-white">{activity.icon}</span>
                    <span className="text-gray-200 font-medium">{activity.action}</span>
                  </div>
                  <span className="text-gray-400 text-sm font-accent">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Messages */}
          <motion.div
            className="glass-effect-divine rounded-2xl p-6 border-2 border-gold-soft/20 shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center font-display">
                <EnvelopeIcon className="w-7 h-7 text-amber-400 mr-2" />
                Recent Messages
              </h3>
              <Link to="/admin/messages">
                <button className="text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors">
                  View All →
                </button>
              </Link>
            </div>
            <div className="space-y-4">
              {[
                { name: 'John Smith', message: 'Interested in joining the choir...', time: '1h ago', unread: true },
                { name: 'Sarah Johnson', message: 'Question about youth program...', time: '3h ago', unread: true },
                { name: 'Michael Brown', message: 'Thank you for the sermon...', time: '1d ago', unread: false },
              ].map((msg, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-xl transition-all duration-300 cursor-pointer border ${
                    msg.unread 
                      ? 'bg-gradient-to-r from-amber-500/20 to-amber-700/20 border-amber-500/30 hover:border-amber-400/50' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-sm font-bold">
                          {msg.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-white font-semibold font-display">{msg.name}</span>
                    </div>
                    <span className="text-gray-400 text-xs font-accent">{msg.time}</span>
                  </div>
                  <p className="text-gray-300 text-sm truncate ml-12">{msg.message}</p>
                  {msg.unread && (
                    <span className="inline-block mt-2 ml-12 px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs rounded-full font-semibold shadow-lg">
                      New
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* System Status */}
        <motion.div
          className="glass-effect-divine rounded-2xl p-6 border-2 border-gold-soft/20 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center font-display">
            <BoltIcon className="w-7 h-7 text-amber-400 mr-2" />
            System Status
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: 'Website Status', status: 'Online', color: 'text-green-400', gradient: 'from-green-500/20 to-green-700/20', icon: <CheckCircleIcon className="w-6 h-6" /> },
              { label: 'Database', status: 'Connected', color: 'text-green-400', gradient: 'from-blue-500/20 to-blue-700/20', icon: <CircleStackIcon className="w-6 h-6" /> },
              { label: 'Last Backup', status: '2 hours ago', color: 'text-blue-400', gradient: 'from-purple-500/20 to-purple-700/20', icon: <CloudIcon className="w-6 h-6" /> },
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className={`bg-gradient-to-br ${item.gradient} rounded-xl p-5 border border-white/10`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-gray-400 text-sm font-accent">{item.label}</p>
                  <span className={item.color}>{item.icon}</span>
                </div>
                <p className={`font-bold text-lg ${item.color} font-display`}>{item.status}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;