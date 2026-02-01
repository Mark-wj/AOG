import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { messagesAPI } from '../services/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear status when user starts typing
    if (status.message) {
      setStatus({ type: '', message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({
        type: 'error',
        message: 'Please fill in all fields'
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address'
      });
      return;
    }

    try {
      setLoading(true);
      setStatus({ type: '', message: '' });
      
      // Submit message to API
      await messagesAPI.submit(formData);
      
      // Success
      setStatus({
        type: 'success',
        message: 'Thank you for your message! We\'ll get back to you within 24 hours.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Error submitting message:', error);
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to send message. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-white font-semibold mb-2">
          Full Name <span className="text-amber-400">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          className="w-full px-6 py-4 rounded-xl bg-white/5 border-2 border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:bg-white/10 transition-all duration-300"
          disabled={loading}
        />
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-white font-semibold mb-2">
          Email Address <span className="text-amber-400">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          className="w-full px-6 py-4 rounded-xl bg-white/5 border-2 border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:bg-white/10 transition-all duration-300"
          disabled={loading}
        />
      </div>

      {/* Subject Field */}
      <div>
        <label htmlFor="subject" className="block text-white font-semibold mb-2">
          Subject <span className="text-amber-400">*</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="How can we help you?"
          className="w-full px-6 py-4 rounded-xl bg-white/5 border-2 border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:bg-white/10 transition-all duration-300"
          disabled={loading}
        />
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-white font-semibold mb-2">
          Message <span className="text-amber-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us what's on your mind..."
          rows="6"
          className="w-full px-6 py-4 rounded-xl bg-white/5 border-2 border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:bg-white/10 transition-all duration-300 resize-none"
          disabled={loading}
        />
      </div>

      {/* Status Message */}
      {status.message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl ${
            status.type === 'success' 
              ? 'bg-green-600/20 border border-green-500/30 text-green-400' 
              : 'bg-red-600/20 border border-red-500/30 text-red-400'
          }`}
        >
          <div className="flex items-center">
            {status.type === 'success' ? (
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span>{status.message}</span>
          </div>
        </motion.div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`btn-primary w-full text-lg py-4 flex items-center justify-center space-x-2 ${
          loading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Sending...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Send Message</span>
          </>
        )}
      </button>

      <p className="text-gray-400 text-sm text-center">
        We respect your privacy and will never share your information.
      </p>
    </form>
  );
};

export default ContactForm;