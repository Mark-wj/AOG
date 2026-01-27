import React from 'react';
import Section from '../components/Section';
import ImageGallery from '../components/ImageGallery';

const Gallery = () => {
  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      alt: "Worship Service",
      title: "Sunday Worship"
    },
    {
      url: "https://images.unsplash.com/photo-1724035292068-f9e0b3ddd2b7?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Baptism",
      title: "Baptism Service"
    },
    {
      url: "https://images.unsplash.com/photo-1522543558187-768b6df7c25c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbW11bml0eSUyMG91dHJlYWNofGVufDB8fDB8fHww",
      alt: "Community Event",
      title: "Community Outreach"
    },
    {
      url: "https://images.unsplash.com/photo-1702399853315-dd6344d1c1e9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Christmas Service",
      title: "Christmas Eve"
    },
    {
      url: "https://images.unsplash.com/photo-1593896385987-16bcbf9451e5?q=80&w=997&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Youth Group",
      title: "Youth Ministry"
    },
    {
      url: "https://images.unsplash.com/photo-1641337261712-3cb3f398331f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Prayer Meeting",
      title: "Prayer Night"
    },
    {
      url: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Church Building",
      title: "Our Sanctuary"
    },
    {
      url: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      alt: "Bible Study",
      title: "Small Groups"
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
          <h1 className="heading-primary">Gallery</h1>
          <p className="text-xl text-gold-soft">Capturing moments of faith and fellowship</p>
        </div>
      </Section>

      <Section className='bg-gradient-to-br from-gold-600 to-purple-900'>
        <ImageGallery images={galleryImages} columns={4} />
      </Section>

      {/* Additional Gallery Sections */}
      <Section 
        title="Worship Moments" 
        subtitle="Capturing the spirit of our services"
        className="bg-gradient-to-br from-purple-900 to-gold-soft"
      >
        <ImageGallery images={galleryImages.slice(0, 6)} columns={3} />
      </Section>

      <Section 
        title="Community Events" 
        subtitle="Building relationships beyond our walls"
        className='bg-gradient-to-br from-gold-600 to-purple-900'
      >
        <ImageGallery images={galleryImages.slice(2, 8)} columns={4} />
      </Section>
    </div>
  );
};

export default Gallery;