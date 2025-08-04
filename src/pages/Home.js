import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Calendar, Award, MapPin, Phone, Mail } from 'lucide-react';
import DestinationCard from '../components/DestinationCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getFeaturedDestinations } from '../data/destinations';

/**
 * Home page component with hero section, featured destinations, and company info
 * Features: Animated hero, destination showcase, testimonials, stats
 */
const Home = () => {
  const [featuredDestinations, setFeaturedDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      setFeaturedDestinations(getFeaturedDestinations());
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { number: '10K+', label: 'Happy Travelers', icon: Users },
    { number: '50+', label: 'Destinations', icon: MapPin },
    { number: '4.9', label: 'Average Rating', icon: Star },
    { number: '15+', label: 'Years Experience', icon: Award }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      comment: "Paradise Path made our honeymoon absolutely perfect! The attention to detail and personalized service exceeded all our expectations.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b1b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Toronto, Canada",
      rating: 5,
      comment: "Amazing experience! The team organized everything perfectly and we had the adventure of a lifetime in the Swiss Alps.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 3,
      name: "Emma Wilson",
      location: "London, UK",
      rating: 5,
      comment: "Professional, reliable, and truly caring about their customers. Our family trip to Bali was unforgettable thanks to Paradise Path.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/60"></div>
        
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6 animate-fade-in">
              <span className="inline-block px-4 py-2 bg-primary-600/20 backdrop-blur-sm border border-primary-400/30 rounded-full text-primary-300 text-sm font-medium mb-6">
                ✨ Premium Travel Experiences
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-8 animate-fade-in leading-tight">
              Discover Your Next
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 animate-gradient-x">
                Paradise Destination
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-gray-200 animate-slide-up max-w-3xl mx-auto leading-relaxed">
              Create unforgettable memories with our carefully curated travel experiences 
              designed to inspire and transform your journey into extraordinary adventures.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up">
              <Link
                to="/destinations"
                className="group bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center space-x-3 shadow-2xl hover:shadow-primary-500/25 transform hover:-translate-y-2 hover:scale-105"
              >
                <span>Explore Destinations</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/booking"
                className="group border-2 border-white/80 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 shadow-xl"
              >
                Plan Your Trip
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 animate-fade-in animation-delay-1000">
              <div className="flex flex-wrap justify-center items-center gap-8 text-white/80">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.9/5 Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span className="font-semibold">10K+ Happy Travelers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span className="font-semibold">15+ Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in animation-delay-2000">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-white/60 text-sm font-medium">Scroll to explore</span>
            <div className="animate-bounce-slow">
              <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm">
                <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Paradise Path?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're not just a travel company – we're your partners in creating extraordinary experiences 
              that go beyond typical tourist destinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full mb-4">
                    <IconComponent className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Destinations
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover our most popular travel destinations, carefully selected for their unique beauty, 
              culture, and unforgettable experiences.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center">
              <LoadingSpinner size="large" text="Loading amazing destinations..." />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {featuredDestinations.slice(0, 6).map((destination) => (
                  <DestinationCard key={destination.id} destination={destination} />
                ))}
              </div>
              
              <div className="text-center">
                <Link
                  to="/destinations"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center space-x-2"
                >
                  <span>View All Destinations</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Don't just take our word for it – hear from the thousands of satisfied travelers 
              who have experienced the magic of Paradise Path.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 italic">
                  "{testimonial.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied travelers and create memories that will last a lifetime.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/booking"
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <span>Book Your Trip</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          
          <div className="mt-8 flex items-center justify-center space-x-6 text-blue-100">
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>+94 77 123 4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>info@paradisepath.com</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
