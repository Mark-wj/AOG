import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ title, subtitle, children, className = '' }) => {
  return (
    <section className={`section-padding ${className}`}>
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {title && <h2 className="heading-secondary text-glow">{title}</h2>}
            {subtitle && <p className="text-xl text-gold-soft mt-4">{subtitle}</p>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;