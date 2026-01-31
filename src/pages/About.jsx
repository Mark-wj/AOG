import React from 'react';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import Card from '../components/Card';

const About = () => {
  const values = ['Faith', 'Hope', 'Love', 'Service', 'Community'];
  
  const leaders = [
    {
      name: "Pastor Gary Morgan",
      role: "Senior Pastor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      bio: "Leading with compassion and wisdom for over 20 years, arming believers with the Word of God."
    },
    {
      name: "Minister Sarah Williams",
      role: "Worship Director",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      bio: "Bringing heavenly music to our worship services and leading praise teams."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <Section 
        className="min-h-[60vh] flex items-center relative overflow-hidden pattern-crosses-large"
      >
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight-950/95 via-royal-purple-900/90 to-midnight-900/95 z-10" />
        
        <div className="relative z-20 text-center text-white w-full max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-6 py-2 bg-amber-400/20 rounded-full mb-6 border border-amber-400/30">
              <span className="text-amber-400 text-sm font-semibold tracking-wide uppercase">
                Our Story
              </span>
            </div>
            <h1 className="heading-primary mb-6">About Our Church</h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              A journey of faith, hope, and love since our founding. Dedicated to arming people with the Word of God and the Gospel of Jesus Christ in these end times.
            </p>
            <div className="ornamental-divider w-64 mx-auto mt-8"></div>
          </motion.div>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section 
        title="Our Mission & Vision" 
        subtitle="Called to serve, empowered to transform"
        className="bg-gradient-to-br from-midnight-950 via-royal-purple-900 to-midnight-900 pattern-crosses-ornate"
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="glass-effect-strong rounded-3xl p-10 border-divine">
              <div className="inline-flex items-center px-4 py-2 bg-amber-400/20 rounded-full mb-6">
                <svg className="w-5 h-5 text-amber-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-amber-400 text-sm font-semibold tracking-wide uppercase">
                  Our Mission
                </span>
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-6 font-display">
                Arming Believers for Victory
              </h3>
              
              <p className="text-gray-200 text-lg mb-6 leading-relaxed">
                To create a welcoming community where individuals can experience spiritual transformation through God's love and grace, equipped with the full armor of God.
              </p>
              
              <div className="space-y-4">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-midnight-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white font-semibold text-lg">{value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-purple-600/20 to-amber-400/20 rounded-3xl blur-2xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1519070994522-88c6b756330e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Church Community"
              className="relative rounded-3xl shadow-2xl border-4 border-white/10 w-full"
            />
          </motion.div>
        </div>
      </Section>

      {/* What We Believe */}
      <Section 
        title="What We Believe" 
        subtitle="Foundational truths that guide our faith"
        className="animated-gradient pattern-crosses"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "The Holy Bible",
              description: "We believe the Bible is the inspired, inerrant Word of God and our ultimate authority for faith and practice.",
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              )
            },
            {
              title: "The Trinity",
              description: "We believe in one God eternally existing in three persons: Father, Son, and Holy Spirit.",
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              )
            },
            {
              title: "Salvation",
              description: "We believe salvation is by grace through faith in Jesus Christ alone, not by works.",
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              )
            },
            {
              title: "The Church",
              description: "We believe the Church is the body of Christ, called to worship God and make disciples.",
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              )
            },
            {
              title: "Second Coming",
              description: "We believe in the personal, visible return of Jesus Christ to establish His eternal kingdom.",
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              )
            },
            {
              title: "The Holy Spirit",
              description: "We believe the Holy Spirit empowers believers for holy living and effective service.",
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              )
            }
          ].map((belief, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group hover:border-amber-400/30 transition-all duration-300">
                <div className="flex flex-col h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {belief.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 font-display group-hover:text-amber-400 transition-colors">
                    {belief.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed flex-grow">
                    {belief.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Leadership */}
      <Section 
        title="Our Leadership" 
        subtitle="Dedicated servants called to shepherd God's flock"
        className="bg-gradient-to-br from-royal-purple-900 via-midnight-900 to-royal-purple-950 pattern-crosses-ornate"
      >
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {leaders.map((leader, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden group">
                <div className="relative overflow-hidden rounded-xl mb-6">
                  <img 
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white font-display">{leader.name}</h3>
                    <p className="text-amber-400 font-semibold">{leader.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">{leader.bio}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Call to Action */}
      <Section 
        className="min-h-[40vh] flex items-center relative overflow-hidden pattern-crosses-animated"
      >
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-amber-600/80 z-10" />
        
        <div className="relative z-20 text-center text-white w-full max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
              Come As You Are
            </h2>
            <p className="text-xl mb-8 leading-relaxed max-w-2xl mx-auto">
              You're invited to join our family. Experience the transforming power of God's love and the fellowship of believers walking together in faith.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4">
                Plan Your Visit
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default About;