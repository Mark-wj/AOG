import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, MapPinIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import Section from '../components/Section';
import Card from '../components/Card';
import { eventsAPI } from '../services/api';

const Events = () => {
  const [filter, setFilter] = useState('upcoming');
  const [events, setEvents] = useState({ upcoming: [], past: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all events
      const allEvents = await eventsAPI.getAll();
      
      // Separate into upcoming and past
      const upcoming = allEvents.filter(event => event.category === 'upcoming');
      const past = allEvents.filter(event => event.category === 'past');
      
      setEvents({ upcoming, past });
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events. Please try again later.');
      setEvents({ upcoming: [], past: [] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <Section 
        className="min-h-[50vh] flex items-center relative overflow-hidden pattern-crosses-large"
      >
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1501281667305-0d4ebd5b1e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight-950/95 via-purple-900/90 to-midnight-900/95 z-10" />
        
        <div className="relative z-20 text-center text-white w-full max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-6 py-2 bg-amber-400/20 rounded-full mb-6 border border-amber-400/30">
              <span className="text-amber-400 text-sm font-semibold tracking-wide uppercase">
                Church Calendar
              </span>
            </div>
            <h1 className="heading-primary mb-6">Upcoming Events</h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Join us for fellowship, worship, and community gatherings
            </p>
            <div className="ornamental-divider w-64 mx-auto mt-8"></div>
          </motion.div>
        </div>
      </Section>

      {/* Events Section */}
      <Section className="bg-gradient-to-br from-midnight-950 via-royal-purple-900 to-midnight-900 pattern-crosses-ornate">
        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="glass-effect-strong rounded-full p-2 flex border border-white/10">
            {['upcoming', 'past'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-8 py-3 rounded-full transition-all duration-300 font-display font-semibold ${
                  filter === tab 
                    ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid lg:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-effect-strong rounded-2xl p-6 animate-pulse">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-48 h-48 bg-white/10 rounded-xl"></div>
                  <div className="flex-1 space-y-4">
                    <div className="bg-white/10 h-6 rounded w-3/4"></div>
                    <div className="bg-white/10 h-4 rounded w-1/2"></div>
                    <div className="bg-white/10 h-4 rounded w-2/3"></div>
                    <div className="bg-white/10 h-20 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <div className="w-32 h-32 mx-auto mb-6 bg-red-600/20 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 font-display">{error}</h3>
            <button 
              onClick={fetchEvents}
              className="btn-primary mt-4"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && (
          <>
            {events[filter].length > 0 ? (
              <div className="grid lg:grid-cols-2 gap-8">
                {events[filter].map((event, index) => (
                  <motion.div
                    key={event._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Card className="hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 overflow-hidden group">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Event Image */}
                        <div className="w-full md:w-48 h-48 flex-shrink-0 relative overflow-hidden rounded-xl">
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                        </div>
                        
                        {/* Event Details */}
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-4 font-display group-hover:text-amber-400 transition-colors">
                            {event.title}
                          </h3>
                          
                          <div className="space-y-3 mb-6">
                            <div className="flex items-center text-amber-400">
                              <CalendarIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                              <span className="font-semibold">{event.date}</span>
                            </div>
                            <div className="flex items-center text-gray-300">
                              <ClockIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center text-gray-300">
                              <MapPinIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-300 mb-6 leading-relaxed line-clamp-2">
                            {event.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-3">
                            <button className="btn-primary flex items-center space-x-2">
                              <span>Learn More</span>
                            </button>
                            <button className="btn-secondary flex items-center space-x-2">
                              <PlusCircleIcon className="w-5 h-5" />
                              <span>Add to Calendar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-purple-600/20 to-amber-400/20 rounded-full flex items-center justify-center">
                  <CalendarIcon className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 font-display">
                  No {filter} events
                </h3>
                <p className="text-gray-300">Check back later for upcoming events!</p>
              </motion.div>
            )}
          </>
        )}
      </Section>

      {/* Subscribe Section */}
      <Section 
        title="Stay Updated" 
        subtitle="Never miss an event - subscribe to our calendar"
        className="animated-gradient pattern-crosses"
      >
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4 font-display">
              Get Event Notifications
            </h3>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Subscribe to our newsletter to receive updates about upcoming events, special services, and community gatherings.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Your email address"
                className="flex-1 px-6 py-4 rounded-xl bg-white/5 border-2 border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:bg-white/10 transition-all duration-300"
              />
              <button className="btn-primary px-8 py-4 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </Card>
        </div>
      </Section>
    </div>
  );
};

export default Events;