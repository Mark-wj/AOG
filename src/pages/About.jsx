import React from 'react';
import Section from '../components/Section';
import Card from '../components/Card';

const About = () => {
  const leaders = [
    {
      name: "Pastor John Smith",
      role: "Senior Pastor",
      image: "https://images.unsplash.com/photo-1580301762386-5b5d4a5d3b3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      bio: "Leading with compassion and wisdom for over 15 years."
    },
    {
      name: "Sarah Johnson",
      role: "Worship Director",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      bio: "Bringing heavenly music to our worship services."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <Section 
        className="min-h-[60vh] flex items-center relative overflow-hidden"
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/80 to-purple-700/80" />
        <div className="relative z-10 text-center text-white w-full">
          <h1 className="heading-primary">Our Story</h1>
          <p className="text-xl text-gold-soft">A journey of faith, hope, and love since 1995</p>
        </div>
      </Section>

      {/* Mission & Values */}
      <Section title="Our Mission & Values" className='bg-gradient-to-tr from-purple-900 to-gold-soft'>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Our Mission</h3>
            <p className="text-gray-200 text-lg mb-6">
              To create a welcoming community where individuals can experience 
              spiritual transformation through God's love and grace.
            </p>
            <div className="space-y-4">
              {['Faith', 'Hope', 'Love', 'Service', 'Community'].map((value) => (
                <div key={value} className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gold-soft rounded-full"></div>
                  <span className="text-white font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1519070994522-88c6b756330e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Church Community"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </Section>

      {/* Leadership */}
      <Section title="Our Mission & Values" className='bg-gradient-to-tr from-purple-900 to-gold-soft'>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1519070994522-88c6b756330e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Church Community"
              className="rounded-2xl shadow-2xl"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Our Mission</h3>
            <p className="text-gray-200 text-lg mb-6">
              To create a welcoming community where individuals can experience 
              spiritual transformation through God's love and grace.
            </p>
            <div className="space-y-4">
              {['Faith', 'Hope', 'Love', 'Service', 'Community'].map((value) => (
                <div key={value} className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gold-soft rounded-full"></div>
                  <span className="text-white font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Section>
    </div>
  );
};

export default About;