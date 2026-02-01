import React from 'react';
import { motion } from 'framer-motion';

const MeetOurPastor = () => {
  const pastor = {
    name: "Pastor Gary Morgan",
    title: "Senior Pastor & Founder",
    image: "/12422-removebg-preview.png",
    quote: "Arming People With The Word Of God, And The Gospel Of Jesus Christ In These Endtimes Because Jesus Christ Is Soon To Come.",
    bio: "Pastor Gary Morgan has been faithfully serving the Lord for over 20 years. His passion for evangelism and deep understanding of God's Word has transformed countless lives. With a heart for the lost and a vision for end-times ministry, Pastor Gary leads our congregation with wisdom, compassion, and unwavering faith.",
    credentials: [
      "Master of Divinity",
      "Ordained Minister",
      "Biblical Studies Scholar",
      "Missionary Experience - 15 countries"
    ],
    contact: {
      email: "garymorgan716@gmail.com",
      phone: "(972) 371-7582"
    }
  };

  return (
    <section className="relative section-padding overflow-hidden pattern-crosses">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block mb-4">
            <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">
              Spiritual Leadership
            </span>
          </div>
          <h2 className="heading-secondary text-glow">Meet Our Pastor</h2>
          <div className="ornamental-divider max-w-md mx-auto"></div>
        </motion.div>

        {/* Pastor Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Decorative frame */}
            <div className="absolute -inset-4 bg-gradient-to-br from-purple-600/20 to-amber-400/20 rounded-3xl blur-xl"></div>
            
            <div className="relative glass-effect-strong rounded-3xl p-4 card-glow">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={pastor.image}
                  alt={pastor.name}
                  className="w-[600px] h-[600px] object-contain object-center"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                
                {/* Name tag on image */}
                <div className="absolute bottom-8 left-8 right-8">
                  <motion.div 
                    className="glass-effect-strong rounded-2xl p-6 backdrop-blur-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-3xl font-bold text-white mb-1 font-display">
                      {pastor.name}
                    </h3>
                    <p className="text-amber-400 font-semibold text-lg">
                      {pastor.title}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-amber-400 rounded-tl-3xl"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-purple-600 rounded-br-3xl"></div>
            </div>

            {/* Floating decorative elements */}
            <motion.div
              className="absolute -top-6 -right-6 w-24 h-24 bg-amber-400/20 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-600/20 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Quote */}
            <div className="relative">
              <div className="absolute -left-4 -top-4 text-6xl text-amber-400/20 font-display">
                "
              </div>
              <blockquote className="relative glass-effect-strong rounded-2xl p-8 border-l-4 border-amber-400">
                <p className="text-xl text-white/90 italic font-accent leading-relaxed">
                  {pastor.quote}
                </p>
              </blockquote>
            </div>

            {/* Bio */}
            <div className="glass-effect rounded-2xl p-8">
              <h4 className="text-2xl font-bold text-white mb-4 font-display">
                About Pastor Gary
              </h4>
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                {pastor.bio}
              </p>

              {/* Credentials */}
              <div className="space-y-3">
                <h5 className="text-amber-400 font-semibold text-lg mb-3">
                  Ministry Credentials
                </h5>
                {pastor.credentials.map((credential, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
                    <span className="text-gray-200">{credential}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="glass-effect-strong rounded-2xl p-8">
              <h4 className="text-xl font-bold text-white mb-6 font-display">
                Connect With Pastor Gary
              </h4>
              <div className="space-y-4">
                <a 
                  href={`mailto:${pastor.contact.email}`}
                  className="flex items-center space-x-4 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">✉️</span>
                  </div>
                  <div>
                    <p className="text-amber-400 text-sm font-semibold">Email</p>
                    <p className="text-white group-hover:text-amber-400 transition-colors">
                      {pastor.contact.email}
                    </p>
                  </div>
                </a>

                <a 
                  href={`tel:${pastor.contact.phone}`}
                  className="flex items-center space-x-4 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">📞</span>
                  </div>
                  <div>
                    <p className="text-amber-400 text-sm font-semibold">Phone</p>
                    <p className="text-white group-hover:text-amber-400 transition-colors">
                      {pastor.contact.phone}
                    </p>
                  </div>
                </a>
              </div>

              <motion.button
                className="btn-primary w-full mt-6"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Schedule a Meeting
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MeetOurPastor;