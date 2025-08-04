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
    <div className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 border border-gray-200/50 dark:border-gray-700/50 ${className}`}>
      {/* Image Container */}
      <div className="relative h-52 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="spinner border-primary-600"></div>
          </div>
        )}
        
        {!imageError ? (
          <img
            src={destination.image}
            alt={destination.name}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
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

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Featured Badge */}
        {destination.featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
              ⭐ Featured
            </span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium capitalize shadow-lg">
            {destination.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Rating */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
            {destination.name}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex space-x-1">
            {renderStars(destination.rating)}
          </div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {destination.rating} ({Math.floor(Math.random() * 100) + 50} reviews)
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-5 line-clamp-3 leading-relaxed">
          {destination.description}
        </p>

        {/* Highlights */}
        {destination.highlights && destination.highlights.length > 0 && (
          <div className="mb-5">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Highlights:
            </h4>
            <div className="flex flex-wrap gap-2">
              {destination.highlights.slice(0, 3).map((highlight, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 text-primary-700 dark:text-primary-300 px-3 py-1.5 rounded-full text-xs font-medium border border-primary-200 dark:border-primary-800"
                >
                  {highlight}
                </span>
              ))}
              {destination.highlights.length > 3 && (
                <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                  +{destination.highlights.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Details */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-6 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <Calendar className="h-4 w-4 text-primary-600 dark:text-primary-400" />
            </div>
            <span className="font-medium">{destination.duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <Users className="h-4 w-4 text-primary-600 dark:text-primary-400" />
            </div>
            <span className="font-medium">Max 12 people</span>
          </div>
        </div>

        {/* Price and Book Button */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-400 dark:to-primary-300 bg-clip-text text-transparent">
              {formatCurrency(destination.price)}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-1 font-medium">
              per person
            </span>
          </div>
          
          <Link
            to="/booking"
            state={{ selectedDestination: destination }}
            className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 group shadow-lg hover:shadow-xl hover:scale-105"
          >
            <span>Book Now</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
