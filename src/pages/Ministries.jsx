import React from 'react';
import Section from '../components/Section';
import MinistryCard from '../components/MInistryCard';

const Ministries = () => {
  const ministries = [
    {
      title: "Children's Ministry",
      icon: "👶",
      description: "Nurturing young hearts in faith through engaging activities and biblical teaching.",
      schedule: "Sundays, 10:30 AM",
      leader: "Led by Sister Maria Gonzalez"
    },
    {
      title: "Youth Group",
      icon: "🌟",
      description: "Empowering teenagers to grow in their relationship with God and each other.",
      schedule: "Fridays, 7:00 PM",
      leader: "Led by Brother David Chen"
    },
    {
      title: "Women's Fellowship",
      icon: "💕",
      description: "Building strong women of faith through study, prayer, and community.",
      schedule: "Tuesdays, 6:30 PM",
      leader: "Led by Deaconess Sarah Williams"
    },
    {
      title: "Men's Ministry",
      icon: "⚔️",
      description: "Equipping men to be spiritual leaders in their families and communities.",
      schedule: "Mondays, 7:00 PM",
      leader: "Led by Elder Michael Brown"
    },
    {
      title: "Worship Team",
      icon: "🎵",
      description: "Leading the congregation in heartfelt worship through music and praise.",
      schedule: "Thursdays, 6:00 PM",
      leader: "Led by Pastor Sarah Johnson"
    },
    {
      title: "Outreach Ministry",
      icon: "🌍",
      description: "Serving our community and sharing God's love through practical acts of service.",
      schedule: "Saturdays, 9:00 AM",
      leader: "Led by Deacon Robert Taylor"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <Section 
        className="min-h-[50vh] flex items-center relative overflow-hidden bg-gradient-to-br from-gold-600 to-purple-900"
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1563902341721-029085ad9347?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-yellow-600/50" />
        <div className="relative z-10 text-center text-white w-full">
          <h1 className="heading-primary">Ministries</h1>
          <p className="text-xl text-gold-soft">Find your place to serve and grow</p>
        </div>
      </Section>
      <Section className='bg-gradient-to-br from-gold-600 to-purple-900'>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministries.map((ministry, index) => (
            <MinistryCard key={index} ministry={ministry} />
          ))}
        </div>
      </Section>

      {/* Call to Action */}
      <Section 
        className="bg-gradient-to-r from-purple-900 to-gold-soft text-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Involved?</h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Join one of our ministries and discover your gifts while serving others. 
          There's a place for everyone in God's family.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-primary bg-white text-purple-900 hover:bg-gray-100">
            Sign Up for a Ministry
          </button>
          <button className="btn-secondary border-white text-white hover:bg-white hover:text-purple-900">
            Contact Ministry Leader
          </button>
        </div>
      </Section>
    </div>
  );
};

export default Ministries;