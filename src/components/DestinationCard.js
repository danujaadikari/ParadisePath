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
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden card-hover transition-all duration-300 ${className}`}>
      {/* Image Container */}
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="spinner border-primary-600"></div>
          </div>
        )}
        
        {!imageError ? (
          <img
            src={destination.image}
            alt={destination.name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-600">
            <MapPin className="h-12 w-12 text-gray-500 dark:text-gray-400" />
          </div>
        )}

        {/* Featured Badge */}
        {destination.featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-secondary-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs font-medium capitalize">
            {destination.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Rating */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2">
            {destination.name}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex space-x-1">
            {renderStars(destination.rating)}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {destination.rating} ({Math.floor(Math.random() * 100) + 50} reviews)
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {destination.description}
        </p>

        {/* Highlights */}
        {destination.highlights && destination.highlights.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Highlights:
            </h4>
            <div className="flex flex-wrap gap-1">
              {destination.highlights.slice(0, 3).map((highlight, index) => (
                <span
                  key={index}
                  className="bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 px-2 py-1 rounded text-xs"
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
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{destination.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>Max 12 people</span>
          </div>
        </div>

        {/* Price and Book Button */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {formatCurrency(destination.price)}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
              per person
            </span>
          </div>
          
          <Link
            to="/booking"
            state={{ selectedDestination: destination }}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 group"
          >
            <span>Book Now</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
