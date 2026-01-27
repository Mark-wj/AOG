import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import Section from '../components/Section';
import Card from '../components/Card';

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
      speaker: "Pastor John Smith",
      date: "Nov 12, 2024",
      image: "https://images.unsplash.com/photo-1501281667305-0d4ebd5b1e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      path: "/sermons"
    },
    {
      title: "Walking in Grace",
      speaker: "Pastor Sarah Johnson",
      date: "Nov 5, 2024",
      image: "https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      path: "/sermons"
    },
    {
      title: "Hope in Hard Times",
      speaker: "Pastor John Smith",
      date: "Oct 29, 2024",
      image: "https://images.unsplash.com/photo-1465847899084-d164dfdded4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      path: "/sermons"
    },
    {
      title: "The Joy of Giving",
      speaker: "Deacon Robert Taylor",
      date: "Oct 22, 2024",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      path: "/sermons"
    }
  ];

  return (
    <div>
      <HeroSection />
      
      {/* Who We Are Section */}
      <Section 
        title="Who We Are" 
        subtitle="A community of believers walking in faith and love"
        className="bg-gradient-to-br from-purple-900 to-gold-soft"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1563902341721-029085ad9347?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Church Community"
              className="rounded-2xl shadow-2xl"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">Our Vision</h3>
            <p className="text-gray-200 text-lg mb-6">
              Arming People With The Word Of God, And The Gospel Of Jesus Christ In These Endtimes Because Jesus Christ Is Soon To Come.
            </p>
            <Link to="/about">
              <button className="btn-primary">Learn More About Us</button>
            </Link>
          </div>
        </div>
      </Section>

      {/* Upcoming Events */}
      <Section title="Upcoming Events" subtitle="Join us in fellowship and worship" className='bg-gradient-to-br from-gold-600 to-purple-900'>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {events.map((event, index) => (
            <Card key={index} hover={true}>
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
              <p className="text-gold-soft mb-4">{event.date}</p>
              <Link to={event.path}>
                <button className="btn-secondary w-full">Learn More</button>
              </Link>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/events">
            <button className="btn-primary text-lg px-8 py-4">
              View All Events
            </button>
          </Link>
        </div>
      </Section>

      {/* Latest Sermons */}
      <Section 
        title="Latest Sermons" 
        subtitle="Messages to inspire and guide your spiritual journey"
        className="bg-gradient-to-tr from-purple-900 to-gold-soft"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sermons.map((sermon, index) => (
            <Card key={index}>
              <img 
                src={sermon.image}
                alt={sermon.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-white mb-2">{sermon.title}</h3>
              <p className="text-gray-300 text-sm mb-1">{sermon.speaker}</p>
              <p className="text-gold-soft text-sm">{sermon.date}</p>
              <Link to={sermon.path} className="block mt-4">
                <button className="btn-secondary w-full text-sm py-2">
                  Watch Sermon
                </button>
              </Link>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/sermons">
            <button className="btn-primary text-lg px-8 py-4">
              Browse All Sermons
            </button>
          </Link>
        </div>
      </Section>

      {/* Ministries Preview */}
      <Section title="Our Ministries" subtitle="Find your place to serve and grow" className='bg-gradient-to-br from-gold-600 to-purple-900'>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Children's Ministry",
              description: "Nurturing young hearts in faith",
              icon: "👶",
              path: "/ministries"
            },
            {
              title: "Youth Group", 
              description: "Empowering the next generation",
              icon: "🌟",
              path: "/ministries"
            },
            {
              title: "Outreach",
              description: "Serving our community",
              icon: "🌍",
              path: "/ministries"
            }
          ].map((ministry, index) => (
            <Card key={index} className="text-center">
              <div className="text-4xl mb-4">{ministry.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{ministry.title}</h3>
              <p className="text-gray-300 mb-6">{ministry.description}</p>
              <Link to={ministry.path}>
                <button className="btn-secondary">Learn More</button>
              </Link>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/ministries">
            <button className="btn-primary text-lg px-8 py-4">
              Explore All Ministries
            </button>
          </Link>
        </div>
      </Section>

      {/* Gallery Preview */}
      <Section 
        title="Heavenly Gallery" 
        subtitle="Capturing moments of faith and fellowship"
        className="bg-gradient-to-br from-purple-900 to-gold-soft"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1501281667305-0d4ebd5b1e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
          ].map((image, index) => (
            <div key={index} className="relative group overflow-hidden rounded-xl">
              <img 
                src={image} 
                alt={`Gallery ${index + 1}`}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/gallery">
            <button className="btn-primary text-lg px-8 py-4">
              View Full Gallery
            </button>
          </Link>
        </div>
      </Section>
    </div>
  );
};

export default Home;