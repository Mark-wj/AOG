import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-gold-soft/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-soft focus:border-transparent"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-gold-soft/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-soft focus:border-transparent"
            placeholder="Your Email"
            required
          />
        </div>
      </div>
      
      <div className="relative">
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/10 border border-gold-soft/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-soft focus:border-transparent"
          placeholder="Subject"
          required
        />
      </div>
      
      <div className="relative">
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="6"
          className="w-full px-4 py-3 bg-white/10 border border-gold-soft/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-soft focus:border-transparent resize-none"
          placeholder="Your Message"
          required
        ></textarea>
      </div>
      
      <motion.button
        type="submit"
        className="btn-primary w-full text-lg py-4"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Send Message
      </motion.button>
    </motion.form>
  );
};

export default ContactForm;