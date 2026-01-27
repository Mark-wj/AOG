import React from 'react';
import Section from '../components/Section';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <div>
      {/* Hero Section */}
      <Section 
        className="min-h-[50vh] flex items-center relative overflow-hidden"
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519070994522-88c6b756330e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-yellow-600/50" />
        <div className="relative z-10 text-center text-white w-full">
          <h1 className="heading-primary">Get In Touch</h1>
          <p className="text-xl text-gold-soft">We'd love to hear from you</p>
        </div>
      </Section>

      <Section className="bg-gradient-to-br from-gold-600 to-purple-900">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-purple-900 mb-8">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-gold-soft rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">📍</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-900 mb-1">Address</h3>
                  <p className="text-gray-700">123 Heavenly Street<br />Grace City, GC 12345</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-gold-soft rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">📞</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-900 mb-1">Phone</h3>
                  <p className="text-gray-700">(555) 123-HEAVEN<br />Mon-Fri: 9AM-5PM</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-gold-soft rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">✉️</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-900 mb-1">Email</h3>
                  <p className="text-gray-700">info@heavenlychurch.org<br />prayer@heavenlychurch.org</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-gold-soft rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">🕒</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-900 mb-1">Service Times</h3>
                  <p className="text-gray-700">
                    Sunday: 8:30AM & 10:30AM<br />
                    Wednesday: 7:00PM<br />
                    Friday Youth: 7:00PM
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {['Facebook', 'YouTube', 'Instagram', 'Twitter'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-12 h-12 bg-purple-600 hover:bg-gold-soft rounded-full flex items-center justify-center text-white transition-colors duration-300"
                  >
                    {social[0]}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-effect rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Send us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Contact;