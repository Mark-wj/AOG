import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.admin));
        navigate('/admin');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden pattern-crosses-animated">
      {/* Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519070994522-88c6b756330e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-midnight-950/95 via-royal-purple-900/95 to-midnight-900/95 z-10"></div>
      
      {/* Floating orbs */}
      <div className="absolute inset-0 z-10">
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
                ? 'radial-gradient(circle, rgba(244, 208, 63, 0.15), transparent)' 
                : 'radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent)',
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

      {/* Login Card */}
      <motion.div
        className="relative z-20 max-w-md w-full mx-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="glass-effect-divine rounded-3xl p-10 shadow-2xl border-2 border-gold-soft/20">
          {/* Logo */}
          <motion.div 
            className="text-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl shadow-amber-500/50 mb-4">
              <span className="text-4xl">✝️</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-white mb-2">
              Admin Portal
            </h1>
            <p className="text-gray-300 font-accent">
              Armor of God Ministry
            </p>
            <div className="ornamental-divider w-32 mx-auto mt-4"></div>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl"
            >
              <p className="text-red-300 text-sm text-center font-semibold">
                {error}
              </p>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 font-semibold mb-2 font-display text-sm">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                  👤
                </span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold-soft focus:bg-white/10 transition-all duration-300"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-2 font-display text-sm">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                  🔒
                </span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold-soft focus:bg-white/10 transition-all duration-300"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-lg font-display disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>
        </div>

        {/* Back to Home */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <a
            href="/"
            className="text-gray-300 hover:text-gold-soft transition-colors duration-300 text-sm font-display inline-flex items-center space-x-2"
          >
            <span>←</span>
            <span>Back to Homepage</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Decorative crosses */}
      <div className="absolute top-10 left-10 text-gold-soft/20 text-6xl font-display z-10">✝</div>
      <div className="absolute bottom-10 right-10 text-purple-500/20 text-6xl font-display z-10">✝</div>
    </div>
  );
};

export default AdminLogin;