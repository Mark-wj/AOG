import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true }) => {
  return (
    <motion.div
      className={`glass-effect rounded-2xl p-6 ${hover ? 'hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300' : ''} ${className}`}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default Card;