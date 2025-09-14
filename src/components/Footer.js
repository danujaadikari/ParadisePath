import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

/**
 * Footer component with contact information and social media links
 * Features: Company info, navigation links, social media icons, responsive design
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Quick Links',
      links: [
        { label: 'Home', path: '/' },
        { label: 'Destinations', path: '/destinations' },
        { label: 'Booking', path: '/booking' }
      ]
    },
    {
      title: 'Services',
      links: [
        { label: 'Package Tours', path: '/destinations' },
        { label: 'Custom Trips', path: '/booking' },
        { label: 'Group Travel', path: '/contact' },
        { label: 'Travel Insurance', path: '/contact' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', path: '/contact' },
        { label: 'Terms of Service', path: '#' },
        { label: 'Privacy Policy', path: '#' },
        { label: 'FAQ', path: '/contact' }
      ]
    }
  ];

  const socialLinks = [
    { 
      icon: Facebook, 
      href: 'https://facebook.com/paradisepath',
      label: 'Facebook'
    },
    { 
      icon: Twitter, 
      href: 'https://twitter.com/paradisepath',
      label: 'Twitter'
    },
    { 
      icon: Instagram, 
      href: 'https://instagram.com/paradisepath',
      label: 'Instagram'
    },
    { 
      icon: Youtube, 
      href: 'https://youtube.com/paradisepath',
      label: 'YouTube'
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="lg:col-span-1 group">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-primary-400 mb-6 group-hover:text-primary-300 transition-colors duration-300">
              <div className="p-2 bg-primary-600/20 rounded-lg group-hover:bg-primary-600/30 transition-colors duration-300">
                <MapPin className="h-6 w-6" />
              </div>
              <span>Paradise Path</span>
            </Link>
            <p className="text-gray-300 mb-8 leading-relaxed text-sm">
              Your gateway to extraordinary travel experiences. We create unforgettable journeys 
              that inspire and transform lives through the power of travel.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-4">
              <a href="tel:+94786621310" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300 group">
                <div className="p-2 bg-primary-600/20 rounded-lg group-hover:bg-primary-600/30 transition-colors duration-300">
                  <Phone className="h-4 w-4 text-primary-400" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">+94 786621310</span>
              </a>
              <a href="mailto:danujaadikari2001@gmail.com" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300 group">
                <div className="p-2 bg-primary-600/20 rounded-lg group-hover:bg-primary-600/30 transition-colors duration-300">
                  <Mail className="h-4 w-4 text-primary-400" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">danujaadikari2001@gmail.com</span>
              </a>
              <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300 group">
                <div className="p-2 bg-primary-600/20 rounded-lg group-hover:bg-primary-600/30 transition-colors duration-300">
                  <MapPin className="h-4 w-4 text-primary-400 mt-0.5" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                  No 07 Colombo, Sri Lanka
                </span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-6 relative">
                {section.title}
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-primary-400 transition-all duration-300 text-sm flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media and Copyright */}
        <div className="border-t border-gray-700/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Media Links */}
            <div className="flex space-x-4 mb-6 md:mb-0">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800/50 hover:bg-primary-600 rounded-xl transition-all duration-300 group hover:scale-110 hover:shadow-lg hover:shadow-primary-600/25"
                    aria-label={social.label}
                  >
                    <IconComponent className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                  </a>
                );
              })}
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm mb-1">
                © {currentYear} Paradise Path. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs">
                Developed by <span className="text-primary-400 font-medium hover:text-primary-300 transition-colors duration-300">Danuja Adikari</span>
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-700/50 mt-8 pt-8">
          <div className="text-center">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-white mb-3 relative">
                Stay Updated
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full"></div>
              </h3>
              <p className="text-gray-300 mb-6 text-sm">
                Subscribe to our newsletter for travel tips and exclusive deals
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 backdrop-blur-sm"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary-600/25">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
