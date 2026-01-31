import React from 'react';
import { motion } from 'framer-motion';

const MinistryCard = ({ ministry }) => {
  return (
    <motion.div
      className="glass-effect rounded-2xl p-6 text-center group cursor-pointer"
      whileHover={{ 
        y: -10,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-gold-soft flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <span className="text-2xl text-white">{ministry.icon}</span>
      </div>
      
      <h3 className="text-xl font-bold text-black mb-3">{ministry.title}</h3>
      <p className="text-gray-500 mb-4">{ministry.description}</p>
      
      <div className="text-royal-purple-300 font-semibold">
        <p>{ministry.schedule}</p>
        <p className="text-sm mt-2">{ministry.leader}</p>
      </div>
      
      <button className="mt-4 px-6 py-2 border border-gold-soft text-gray-400 rounded-lg hover:bg-gold-soft hover:text-white transition-all duration-300">
        Learn More
      </button>
    </motion.div>
  );
};

export default MinistryCard;