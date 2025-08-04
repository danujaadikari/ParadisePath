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
        { label: 'Booking', path: '/booking' },
        { label: 'Contact', path: '/contact' }
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
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-primary-400 mb-4">
              <MapPin className="h-6 w-6" />
              <span>Paradise Path</span>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your gateway to extraordinary travel experiences. We create unforgettable journeys 
              that inspire and transform lives through the power of travel.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300">+94 786621310</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300">danujaadikari2001@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary-400 mt-1" />
                <span className="text-gray-300">
                  No 17 Yaya 07 Katiyawa, Eppawal<br />
                  Anuradhapura, Sri Lanka
                </span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media and Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Media Links */}
            <div className="flex space-x-4 mb-4 md:mb-0">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 hover:bg-primary-600 rounded-full transition-colors duration-200 group"
                    aria-label={social.label}
                  >
                    <IconComponent className="h-5 w-5 text-gray-300 group-hover:text-white" />
                  </a>
                );
              })}
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © {currentYear} Paradise Path. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Developed by <span className="text-primary-400 font-medium">Danuja Adikari</span>
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">
              Stay Updated
            </h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for travel tips and exclusive deals
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
