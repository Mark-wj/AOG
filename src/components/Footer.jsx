import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Ministries', path: '/ministries' },
    { name: 'Sermons', path: '/sermons' },
    { name: 'Events', path: '/events' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <footer className="bg-gradient-to-r from-purple-900 to-purple-700 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Church Info */}
          <div className="md:col-span-2">
            <Link to="/">
              <h3 className="text-2xl font-bold text-gold-soft mb-4">Armor Of God Evangelical Worldwide Ministry</h3>
            </Link>
            <p className="text-gray-300 mb-4">
              Where faith meets grace in the heart of our community. 
              Join us as we walk together in spiritual growth and service.
            </p>
            <div className="flex space-x-4">
              {['Facebook', 'YouTube', 'Instagram', 'Twitter'].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="text-gray-300 hover:text-gold-soft transition-colors duration-300"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-gold-soft transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-2 text-gray-300">
              <p>1849 Indian Grass</p>
              <p>Royse City, Texas 75189</p>
              <p>garymorgan716@gmail.com</p>
              <p>(972) 371-7582</p>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gold-soft/30 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">Stay Connected</h4>
              <p className="text-gray-300">Subscribe to our newsletter for updates</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Your email address"
                className="px-4 py-2 rounded-lg bg-white/10 border border-gold-soft/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-soft flex-grow md:flex-grow-0 md:w-64"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gold-soft/30 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Heavenly Church. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;