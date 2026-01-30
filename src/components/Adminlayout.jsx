import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: '📊' },
    { name: 'Events', path: '/admin/events', icon: '📅' },
    { name: 'Sermons', path: '/admin/sermons', icon: '🎤' },
    { name: 'Gallery', path: '/admin/gallery', icon: '🖼️' },
    { name: 'Messages', path: '/admin/messages', icon: '✉️' },
    { name: 'Settings', path: '/admin/settings', icon: '⚙️' },
  ];

  const handleLogout = () => {
    // Add logout logic here
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight-950 via-royal-purple-950 to-midnight-950">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            className="fixed left-0 top-0 h-full w-72 glass-effect-strong border-r border-white/10 z-50 overflow-y-auto"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
          >
            {/* Logo */}
            <div className="p-6 border-b border-white/10">
              <Link to="/admin" className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">✝️</span>
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg">Admin Panel</h2>
                  <p className="text-amber-400 text-sm">Church Management</p>
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Admin Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 glass-effect">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">GA</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Gary Morgan</p>
                  <p className="text-gray-400 text-xs">Administrator</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-0'}`}>
        {/* Top Bar */}
        <header className="glass-effect-strong border-b border-white/10 sticky top-0 z-40">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors duration-300"
              >
                <span className="text-2xl">{isSidebarOpen ? '◀' : '▶'}</span>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white font-display">
                  {menuItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
                </h1>
                <p className="text-gray-400 text-sm">Armor of God Admin Portal</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors duration-300">
                <span className="text-xl">🔔</span>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>

              {/* View Site */}
              <Link
                to="/"
                target="_blank"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-300 flex items-center space-x-2"
              >
                <span>🌐</span>
                <span>View Site</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;