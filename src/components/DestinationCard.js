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
    <div className={`group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 border border-gray-200/50 dark:border-gray-700/50 hover:border-purple-300/50 dark:hover:border-purple-600/50 ${className}`}>
      {/* Image Container */}
      <div className="relative h-56 bg-gradient-to-br from-cyan-200 to-purple-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
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

        {/* Enhanced overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

        {/* Floating elements for visual interest */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-4 left-4 w-16 h-16 bg-white/20 rounded-full blur-lg animate-pulse-slow"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 bg-purple-400/30 rounded-full blur-lg animate-pulse-slow animation-delay-1000"></div>
        </div>

        {/* Featured Badge */}
        {destination.featured && (
          <div className="absolute top-4 left-4 animate-float">
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm border border-yellow-400/50">
              ⭐ Featured Destination
            </span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 right-4 animate-slide-in-right">
          <span className="bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-semibold capitalize shadow-lg border border-white/20">
            {destination.category}
          </span>
        </div>

        {/* Hover overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-cyan-500/0 to-pink-500/0 group-hover:from-purple-600/20 group-hover:via-cyan-500/20 group-hover:to-pink-500/20 transition-all duration-700"></div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Title and Rating */}
        <div className="flex justify-between items-start mb-5">
          <h3 className="text-2xl font-black text-gray-900 dark:text-white line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-cyan-600 transition-all duration-500">
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
                  className="bg-gradient-to-r from-purple-100 to-cyan-100 dark:from-purple-900/30 dark:to-cyan-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-xs font-semibold border border-purple-200 dark:border-purple-700 hover:scale-105 transition-transform duration-300"
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
            <div className="p-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl shadow-md">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white">{destination.duration}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl shadow-md">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white">Max 12</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Travelers</p>
            </div>
          </div>
        </div>

        {/* Enhanced Price and Book Button */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-3xl font-black bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              {formatCurrency(destination.price)}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
              per person
            </span>
          </div>
          
          <Link
            to="/booking"
            state={{ selectedDestination: destination }}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-500 flex items-center space-x-3 group shadow-xl hover:shadow-2xl hover:scale-105 border border-purple-500/30"
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
