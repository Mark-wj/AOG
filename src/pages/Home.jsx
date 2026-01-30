import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import Section from '../components/Section';
import Card from '../components/Card';
import MeetOurPastor from '../components/MeetOurPastor';

const Home = () => {
  const events = [
    {
      title: "Sunday Worship Service",
      date: "Every Sunday, 10:00 AM",
      image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      path: "/events"
    },
    {
      title: "Youth Night",
      date: "Friday, 7:00 PM",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      path: "/events"
    }
  ];

  const sermons = [
    {
      title: "The Power of Faith",
      speaker: "Pastor Gary Morgan",
      date: "Nov 12, 2024",
      image: "https://images.unsplash.com/photo-1501281667305-0d4ebd5b1e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      path: "/sermons"
    },
    {
      title: "Walking in Grace",
      speaker: "Pastor Gary Morgan",
      date: "Nov 5, 2024",
      image: "https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      path: "/sermons"
    },
    {
      title: "Hope in Hard Times",
      speaker: "Pastor Gary Morgan",
      date: "Oct 29, 2024",
      image: "https://images.unsplash.com/photo-1465847899084-d164dfdded4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      path: "/sermons"
    },
    {
      title: "The Joy of Giving",
      speaker: "Pastor Gary Morgan",
      date: "Oct 22, 2024",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      path: "/sermons"
    }
  ];

  return (
    <div className="bg-celestial">
      <HeroSection />
      
      {/* Who We Are Section */}
      <Section 
        title="Who We Are" 
        subtitle="A community of believers walking in faith and love"
        className="animated-gradient pattern-dots"
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-amber-400/20 to-purple-600/20 rounded-3xl blur-2xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1563902341721-029085ad9347?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Church Community"
              className="relative rounded-3xl shadow-2xl border-4 border-white/10"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="glass-effect-strong rounded-3xl p-10 card-glow">
              <div className="inline-block px-4 py-2 bg-amber-400/20 rounded-full mb-6">
                <span className="text-amber-400 text-sm font-semibold tracking-wide uppercase">
                  Our Mission
                </span>
              </div>
              <h3 className="text-4xl font-bold text-white mb-6 font-display">
                Our Vision
              </h3>
              <p className="text-gray-200 text-lg mb-6 leading-relaxed">
                <span className="text-amber-400 font-semibold text-xl">
                  Arming People With The Word Of God, And The Gospel Of Jesus Christ In These Endtimes 
                </span>
                <br /><br />
                Because Jesus Christ Is Soon To Come. We are dedicated to equipping believers with biblical truth and spreading the good news to all nations.
              </p>
              
              <div className="space-y-3 mb-8">
                {['Proclaim the Gospel', 'Disciple Believers', 'Serve Our Community', 'Prepare for Christ\'s Return'].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
                    <span className="text-white font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>

              <Link to="/about">
                <motion.button 
                  className="btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More About Us →
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Meet Our Pastor Section */}
      <div className="bg-gradient-to-br from-midnight-900 via-royal-purple-900 to-midnight-900 pattern-grid">
        <MeetOurPastor />
      </div>

      {/* Upcoming Events */}
      <Section 
        title="Upcoming Events" 
        subtitle="Join us in fellowship and worship" 
        className="animated-gradient pattern-diagonal"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card hover={true} className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 font-display group-hover:text-amber-400 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-amber-400 mb-4 font-semibold flex items-center">
                    <span className="mr-2">📅</span>
                    {event.date}
                  </p>
                  <Link to={event.path}>
                    <button className="btn-outline w-full">
                      Learn More →
                    </button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link to="/events">
            <button className="btn-primary text-lg px-10 py-5">
              View All Events →
            </button>
          </Link>
        </motion.div>
      </Section>

      {/* Latest Sermons */}
      <Section 
        title="Latest Sermons" 
        subtitle="Messages to inspire and guide your spiritual journey"
        className="bg-gradient-to-br from-royal-purple-900 via-midnight-900 to-royal-purple-950 pattern-circuit"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sermons.map((sermon, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="group h-full">
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img 
                    src={sermon.image}
                    alt={sermon.title}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl text-gray-900">▶</span>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 font-display group-hover:text-amber-400 transition-colors">
                  {sermon.title}
                </h3>
                <p className="text-gray-300 text-sm mb-2">{sermon.speaker}</p>
                <p className="text-amber-400 text-sm font-semibold mb-4">{sermon.date}</p>
                
                <Link to={sermon.path} className="block">
                  <button className="btn-outline w-full text-sm py-2">
                    Watch Sermon →
                  </button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link to="/sermons">
            <button className="btn-primary text-lg px-10 py-5">
              Browse All Sermons →
            </button>
          </Link>
        </motion.div>
      </Section>

      {/* Ministries Preview */}
      <Section 
        title="Our Ministries" 
        subtitle="Find your place to serve and grow" 
        className="animated-gradient pattern-dots"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Children's Ministry",
              description: "Nurturing young hearts in faith through engaging activities and biblical teaching",
              icon: "👶",
              path: "/ministries"
            },
            {
              title: "Youth Group", 
              description: "Empowering the next generation to live boldly for Christ",
              icon: "🌟",
              path: "/ministries"
            },
            {
              title: "Outreach",
              description: "Serving our community and sharing God's love through action",
              icon: "🌍",
              path: "/ministries"
            }
          ].map((ministry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="text-center group relative overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative">
                  <motion.div 
                    className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-lg shadow-purple-500/30"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-5xl">{ministry.icon}</span>
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 font-display group-hover:text-amber-400 transition-colors">
                    {ministry.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {ministry.description}
                  </p>
                  
                  <Link to={ministry.path}>
                    <button className="btn-outline">
                      Learn More →
                    </button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link to="/ministries">
            <button className="btn-primary text-lg px-10 py-5">
              Explore All Ministries →
            </button>
          </Link>
        </motion.div>
      </Section>

      {/* Gallery Preview */}
      <Section 
        title="Heavenly Gallery" 
        subtitle="Capturing moments of faith and fellowship"
        className="bg-gradient-to-br from-midnight-900 via-royal-purple-900 to-midnight-900 pattern-grid"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1501281667305-0d4ebd5b1e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
          ].map((image, index) => (
            <motion.div 
              key={index} 
              className="relative group overflow-hidden rounded-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-amber-400/40 to-purple-600/40 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <img 
                  src={image} 
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-56 object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-end p-4">
                  <span className="text-white font-semibold">View Gallery</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link to="/gallery">
            <button className="btn-primary text-lg px-10 py-5">
              View Full Gallery →
            </button>
          </Link>
        </motion.div>
      </Section>
    </div>
  );
};

export default Home;