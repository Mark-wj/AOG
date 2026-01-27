import React, { useState } from 'react';
import Section from '../components/Section';
import Card from '../components/Card';

const Events = () => {
  const [filter, setFilter] = useState('upcoming');

  const events = {
    upcoming: [
      {
        id: 1,
        title: "Christmas Eve Candlelight Service",
        date: "December 24, 2024",
        time: "6:00 PM",
        location: "Main Sanctuary",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        description: "Join us for a magical Christmas Eve service with candlelight, carols, and celebration of Christ's birth."
      },
      {
        id: 2,
        title: "New Year's Prayer Night",
        date: "December 31, 2024",
        time: "9:00 PM",
        location: "Prayer Chapel",
        image: "https://images.unsplash.com/photo-1530016555861-3d1f3f5ca94b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        description: "Welcome the new year in prayer and worship. Let's dedicate 2025 to God's purpose."
      }
    ],
    past: [
      {
        id: 3,
        title: "Fall Harvest Festival",
        date: "October 31, 2024",
        time: "4:00 PM",
        location: "Church Grounds",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        description: "A wonderful community event with games, food, and fellowship for all ages."
      }
    ]
  };

  return (
    <div>
      {/* Hero Section */}
      <Section 
        className="min-h-[50vh] flex items-center relative overflow-hidden"
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1501281667305-0d4ebd5b1e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-yellow-600/50" />
        <div className="relative z-10 text-center text-white w-full">
          <h1 className="heading-primary">Church Events</h1>
          <p className="text-xl text-gold-soft">Join us for fellowship and worship</p>
        </div>
      </Section>

      <Section className='bg-gradient-to-br from-gold-600 to-purple-900'>
        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="glass-effect rounded-full p-2 flex">
            {['upcoming', 'past'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  filter === tab 
                    ? 'bg-gradient-to-r from-purple-600 to-gold-soft text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {events[filter].map((event) => (
            <Card key={event.id} className="hover:shadow-2xl hover:shadow-purple-500/30">
              <div className="flex flex-col md:flex-row gap-6">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full md:w-48 h-48 object-cover rounded-xl flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">{event.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gold-soft">
                      <span className="mr-2">📅</span>
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <span className="mr-2">📍</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-6">{event.description}</p>
                  <div className="flex space-x-4">
                    <button className="btn-primary">Learn More</button>
                    <button className="btn-secondary">Add to Calendar</button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* No Events Message */}
        {events[filter].length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-bold text-white mb-2">No {filter} events</h3>
            <p className="text-gray-300">Check back later for upcoming events!</p>
          </div>
        )}
      </Section>
    </div>
  );
};

export default Events;