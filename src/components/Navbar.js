import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, MapPin, User, LogOut, Settings } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

/**
 * Navigation component with responsive design and theme toggle
 * Features: Mobile hamburger menu, theme switching, active link highlighting
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  // Navigation links
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/destinations', label: 'Destinations' },
    { path: '/booking', label: 'Booking' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/20 dark:border-gray-700/20 transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 group"
            onClick={closeMenu}
          >
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl group-hover:from-green-600 group-hover:to-emerald-700 transition-all duration-300 group-hover:scale-110 shadow-lg">
              <MapPin className="h-7 w-7 text-white" />
            </div>
            <span className="group-hover:scale-105 transition-transform duration-300 text-2xl">Paradise Path</span>
          </Link>

          {/* Desktop Navigation with enhanced styling */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 relative group focus-visible-modern ${
                  isActiveLink(link.path)
                    ? 'text-white bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 glass-modern'
                }`}
              >
                {link.label}
                {!isActiveLink(link.path) && (
                  <span className="absolute inset-x-3 bottom-1 h-0.5 bg-gradient-to-r from-green-600 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                )}
              </Link>
            ))}
            
            {/* Enhanced Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-3 ml-4 rounded-2xl text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300 hover:scale-110 glass-modern group focus-visible-modern"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-6 w-6 group-hover:text-yellow-500 transition-colors duration-300" />
              ) : (
                <Moon className="h-6 w-6 group-hover:text-blue-500 transition-colors duration-300" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 bg-gray-50 dark:bg-gray-800/50"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 bg-gray-50 dark:bg-gray-800/50"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden animate-slide-in-bottom">
            <div className="px-6 pt-6 pb-6 space-y-3 glass-card-enhanced border-t border-gray-200/30 dark:border-gray-700/30 shadow-2xl">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={`block px-6 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover-scale-smooth focus-visible-modern ${
                    isActiveLink(link.path)
                      ? 'text-white bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 glass-modern'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
