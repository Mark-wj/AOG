import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalSermons: 0,
    totalMessages: 0,
    totalGalleryImages: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Fetch dashboard stats
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/stats');
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

  const statCards = [
    {
      title: 'Total Events',
      value: stats.totalEvents,
      icon: '📅',
      color: 'from-blue-500 to-blue-700',
      link: '/admin/events',
    },
    {
      title: 'Total Sermons',
      value: stats.totalSermons,
      icon: '🎤',
      color: 'from-purple-500 to-purple-700',
      link: '/admin/sermons',
    },
    {
      title: 'New Messages',
      value: stats.totalMessages,
      icon: '✉️',
      color: 'from-amber-500 to-amber-700',
      link: '/admin/messages',
    },
    {
      title: 'Gallery Images',
      value: stats.totalGalleryImages,
      icon: '🖼️',
      color: 'from-green-500 to-green-700',
      link: '/admin/gallery',
    },
  ];

  const quickActions = [
    { name: 'Add New Event', icon: '➕', link: '/admin/events', color: 'bg-blue-600' },
    { name: 'Upload Sermon', icon: '🎥', link: '/admin/sermons', color: 'bg-purple-600' },
    { name: 'Add to Gallery', icon: '📸', link: '/admin/gallery', color: 'bg-green-600' },
    { name: 'View Messages', icon: '📧', link: '/admin/messages', color: 'bg-amber-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        className="glass-effect-strong rounded-3xl p-8 border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 font-display">
              Welcome back, Pastor Gary! 👋
            </h2>
            <p className="text-gray-300">
              Here's what's happening with your ministry today.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-6xl">✝️</div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Link to={stat.link}>
              <div className="glass-effect-strong rounded-2xl p-6 hover:scale-105 transition-transform duration-300 cursor-pointer border border-white/10 group">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-white">
                      {stat.value}
                    </div>
                  </div>
                </div>
                <h3 className="text-gray-300 font-semibold">{stat.title}</h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-white mb-6 font-display">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={action.name} to={action.link}>
              <motion.div
                className={`${action.color} rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg`}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-3">{action.icon}</div>
                <p className="text-white font-semibold">{action.name}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity & Messages */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          className="glass-effect-strong rounded-2xl p-6 border border-white/10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <span className="mr-2">📊</span>
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[
              { action: 'New sermon uploaded', time: '2 hours ago', icon: '🎤' },
              { action: 'Event updated', time: '5 hours ago', icon: '📅' },
              { action: 'Gallery image added', time: '1 day ago', icon: '🖼️' },
              { action: 'New message received', time: '2 days ago', icon: '✉️' },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{activity.icon}</span>
                  <span className="text-gray-200">{activity.action}</span>
                </div>
                <span className="text-gray-400 text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Messages */}
        <motion.div
          className="glass-effect-strong rounded-2xl p-6 border border-white/10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center">
              <span className="mr-2">📧</span>
              Recent Messages
            </h3>
            <Link to="/admin/messages">
              <button className="text-amber-400 hover:text-amber-300 text-sm font-semibold">
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
              <div
                key={index}
                className={`p-4 rounded-xl hover:bg-white/10 transition-colors duration-300 cursor-pointer ${
                  msg.unread ? 'bg-amber-500/10' : 'bg-white/5'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {msg.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="text-white font-semibold">{msg.name}</span>
                  </div>
                  <span className="text-gray-400 text-xs">{msg.time}</span>
                </div>
                <p className="text-gray-300 text-sm truncate">{msg.message}</p>
                {msg.unread && (
                  <span className="inline-block mt-2 px-2 py-1 bg-amber-500 text-white text-xs rounded-full">
                    New
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* System Status */}
      <motion.div
        className="glass-effect-strong rounded-2xl p-6 border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <span className="mr-2">⚡</span>
          System Status
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: 'Website Status', status: 'Online', color: 'text-green-400' },
            { label: 'Database', status: 'Connected', color: 'text-green-400' },
            { label: 'Last Backup', status: '2 hours ago', color: 'text-blue-400' },
          ].map((item, index) => (
            <div key={index} className="bg-white/5 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-1">{item.label}</p>
              <p className={`font-semibold ${item.color}`}>{item.status}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;