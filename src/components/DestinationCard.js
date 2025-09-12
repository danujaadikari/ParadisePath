import React, { useState } from 'react';
import { Star, MapPin, Calendar, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/helpers';

/**
 * Destination card component for displaying destination information
 * Features: Image, rating, pricing, highlights, and booking link
 */
const DestinationCard = ({ destination, className = '' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="card-enhanced group hover-lift-rotate overflow-hidden animate-staggered-fade-in">
      {/* Image Container with enhanced loading state */}
      <div className="relative h-64 bg-gradient-to-br from-green-200 to-emerald-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="modern-spinner"></div>
          </div>
        )}
        
        {!imageError ? (
          <img
            src={destination.image}
            alt={destination.name}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700">
            <MapPin className="h-12 w-12 text-gray-500 dark:text-gray-400" />
          </div>
        )}

        {/* Enhanced overlay gradient with micro-interactions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-all duration-500"></div>

        {/* Floating particles for visual interest */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute top-6 left-6 w-3 h-3 bg-white/40 rounded-full animate-floating-particle"></div>
          <div className="absolute top-12 right-8 w-2 h-2 bg-green-400/60 rounded-full animate-floating-particle animation-delay-1000"></div>
          <div className="absolute bottom-8 left-8 w-4 h-4 bg-purple-400/50 rounded-full animate-floating-particle animation-delay-2000"></div>
        </div>

        {/* Featured Badge with enhanced styling */}
        {destination.featured && (
          <div className="absolute top-6 left-6 animate-staggered-fade-in">
            <span className="glass-modern bg-gradient-to-r from-green-500/80 to-emerald-600/80 text-white px-4 py-2.5 rounded-full text-xs font-bold shadow-2xl border border-green-400/30 hover-glow-green">
              ⭐ Featured Destination
            </span>
          </div>
        )}

        {/* Category Badge with glassmorphism */}
        <div className="absolute top-6 right-6 animate-slide-in-right">
          <span className="glass-modern bg-black/50 text-white px-4 py-2.5 rounded-full text-xs font-semibold capitalize shadow-lg border border-white/20 backdrop-blur-lg">
            {destination.category}
          </span>
        </div>

        {/* Enhanced hover overlay with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:from-green-500/10 group-hover:via-emerald-500/5 group-hover:to-purple-500/10 transition-all duration-700"></div>
      </div>

      {/* Enhanced Content Section */}
      <div className="p-8 space-y-6">
        {/* Title and Rating with enhanced typography */}
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-black text-gray-900 dark:text-white line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-emerald-600 transition-all duration-500 hover-scale-smooth">
            {destination.name}
          </h3>
        </div>

        {/* Enhanced Rating */}
        <div className="flex items-center space-x-3 mb-5">
          <div className="flex space-x-1">
            {renderStars(destination.rating)}
          </div>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
            {destination.rating} ({Math.floor(Math.random() * 100) + 50} reviews)
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-base mb-6 line-clamp-3 leading-relaxed">
          {destination.description}
        </p>

        {/* Enhanced Highlights */}
        {destination.highlights && destination.highlights.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
              What's Included:
            </h4>
            <div className="flex flex-wrap gap-2">
              {destination.highlights.slice(0, 3).map((highlight, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-xs font-semibold border border-green-200 dark:border-green-700 hover:scale-105 transition-transform duration-300"
                >
                  {highlight}
                </span>
              ))}
              {destination.highlights.length > 3 && (
                <span className="text-xs text-gray-500 dark:text-gray-400 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-full font-medium">
                  +{destination.highlights.length - 3} more features
                </span>
              )}
            </div>
          </div>
        )}

        {/* Enhanced Details */}
        <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 mb-7 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-2xl border border-gray-200/50 dark:border-gray-600/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-md">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white">{destination.duration}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-md">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white">Max 12</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Travelers</p>
            </div>
          </div>
        </div>

        {/* Enhanced Price and Book Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col">
            <span className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent animate-text-shimmer">
              {formatCurrency(destination.price)}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
              per person
            </span>
          </div>
          
          <Link
            to="/booking"
            state={{ selectedDestination: destination }}
            className="btn-modern group flex items-center space-x-3 text-lg px-8 py-4 hover-glow-green relative overflow-hidden"
          >
            <span>Book Adventure</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
