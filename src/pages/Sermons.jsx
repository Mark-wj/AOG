// src/pages/Sermons.js
import React, { useState } from 'react';
import Section from '../components/Section';
import Card from '../components/Card';

const Sermons = () => {
  const [selectedSermon, setSelectedSermon] = useState(null);

  const sermons = [
    {
      id: 1,
      title: "The Power of Faith",
      speaker: "Pastor John Smith",
      date: "November 12, 2024",
      series: "Foundations of Faith",
      image: "https://images.unsplash.com/photo-1501281667305-0d4ebd5b1e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      videoUrl: "#",
      description: "Exploring the transformative power of faith in our daily lives and how it shapes our relationship with God."
    },
    {
      id: 2,
      title: "Walking in Grace",
      speaker: "Pastor Sarah Johnson",
      date: "November 5, 2024",
      series: "Grace Journey",
      image: "https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      videoUrl: "#",
      description: "Understanding God's grace and how to walk in it every day of our lives."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <Section 
        className="min-h-[50vh] flex items-center relative overflow-hidden"
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1465847899084-d164dfdded4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-yellow-600/50" />
        <div className="relative z-10 text-center text-white w-full">
          <h1 className="heading-primary">Sermons</h1>
          <p className="text-xl text-gold-soft">Messages to inspire and transform</p>
        </div>
      </Section>

      <Section className="bg-gradient-to-br from-purple-900 to-gold-soft">
        {/* Featured Sermon */}
        <div className="mb-16">
          <h2 className="heading-secondary mb-12">Featured Message</h2>
          <Card className="!p-0 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="relative">
                <img 
                  src={sermons[0].image}
                  alt={sermons[0].title}
                  className="w-full h-64 lg:h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-transparent lg:hidden" />
                <button 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gold-soft rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                  onClick={() => setSelectedSermon(sermons[0])}
                >
                  <span className="text-2xl text-white">▶</span>
                </button>
              </div>
              <div className="p-8">
                <span className="text-gold-soft font-semibold">{sermons[0].series}</span>
                <h3 className="text-3xl font-bold text-white my-4">{sermons[0].title}</h3>
                <p className="text-gray-300 mb-6">{sermons[0].description}</p>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-white font-semibold">{sermons[0].speaker}</p>
                    <p className="text-gold-soft">{sermons[0].date}</p>
                  </div>
                  <button className="btn-primary">Watch Now</button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sermons Grid */}
        <h2 className="heading-secondary mb-12">Recent Sermons</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sermons.map((sermon) => (
            <Card key={sermon.id} className="text-center">
              <div className="relative mb-4">
                <img 
                  src={sermon.image}
                  alt={sermon.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gold-soft rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                  onClick={() => setSelectedSermon(sermon)}
                >
                  <span className="text-white">▶</span>
                </button>
              </div>
              <span className="text-gold-soft text-sm font-semibold">{sermon.series}</span>
              <h3 className="text-xl font-bold text-white my-3">{sermon.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{sermon.speaker}</p>
              <p className="text-gold-soft text-sm">{sermon.date}</p>
              <button className="btn-secondary w-full mt-4">Watch Sermon</button>
            </Card>
          ))}
        </div>
      </Section>

      {/* Video Modal */}
      {selectedSermon && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-4 max-w-4xl w-full">
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">🎬</div>
                <p>Video player would be embedded here</p>
                <p className="text-lg font-semibold mt-2">{selectedSermon.title}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedSermon.title}</h3>
                <p className="text-gray-600">{selectedSermon.speaker}</p>
              </div>
              <button 
                className="text-gray-500 hover:text-gray-700 text-2xl"
                onClick={() => setSelectedSermon(null)}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sermons;