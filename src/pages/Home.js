import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Calendar, Award, MapPin, Phone, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import DestinationCard from '../components/DestinationCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getFeaturedDestinations } from '../data/destinations';

/**
 * Hom          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 text-green-100 animate-fade-in animation-delay-2000">
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl">
              <Phone className="h-6 w-6 text-green-300" />
              <span className="font-semibold text-lg">+94 77 123 4567</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl">
              <Mail className="h-6 w-6 text-green-300" />
              <span className="font-semibold text-lg">info@paradisepath.com</span>
            </div>
          </div>ponent with hero section, featured destinations, and company info
 * Features: Animated hero, destination showcase, testimonials, stats
 */
const Home = () => {
  const [featuredDestinations, setFeaturedDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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

  // Auto-slide testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

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
        {/* Enhanced Background overlay with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-gray-900/30 to-green-900/40"></div>
        
        {/* Floating elements for visual interest */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-4000"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-orange-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow"></div>
        </div>
        
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 animate-fade-in">
              <span className="inline-block px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-400/30 rounded-full text-green-300 text-sm font-medium mb-6 animate-pulse-slow">
                ✨ Premium Travel Experiences Since 2008
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-10 animate-fade-in leading-tight">
              Discover Your Next
              <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 animate-gradient-x">
                Paradise Destination
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-gray-100 animate-slide-up max-w-4xl mx-auto leading-relaxed font-light">
              Embark on extraordinary journeys with our carefully curated travel experiences. 
              From pristine beaches to majestic mountains, create memories that will inspire you for a lifetime.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up animation-delay-1000">
              <Link
                to="/destinations"
                className="group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 py-5 rounded-3xl font-bold text-xl transition-all duration-500 flex items-center space-x-3 shadow-2xl hover:shadow-green-500/25 transform hover:-translate-y-3 hover:scale-105 border border-green-500/30"
              >
                <span>Explore Destinations</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              <Link
                to="/booking"
                className="group border-2 border-white/80 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 px-12 py-5 rounded-3xl font-bold text-xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 shadow-xl hover:shadow-white/25"
              >
                Plan Your Adventure
              </Link>
            </div>
            
            {/* Enhanced trust indicators */}
            <div className="mt-16 animate-fade-in animation-delay-2000">
              <div className="flex flex-wrap justify-center items-center gap-12 text-white/90">
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl">
                  <Star className="h-6 w-6 fill-yellow-400 text-yellow-400 animate-pulse-slow" />
                  <span className="font-semibold text-lg">4.9/5 Rating</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl">
                  <Users className="h-6 w-6 text-green-400" />
                  <span className="font-semibold text-lg">10K+ Happy Travelers</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl">
                  <Award className="h-6 w-6 text-purple-400" />
                  <span className="font-semibold text-lg">15+ Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in animation-delay-4000">
          <div className="flex flex-col items-center space-y-3">
            <span className="text-white/70 text-sm font-medium">Discover More</span>
            <div className="animate-bounce-slow">
              <div className="w-8 h-12 border-2 border-white/70 rounded-full flex justify-center backdrop-blur-sm bg-white/10">
                <div className="w-1.5 h-4 bg-white/90 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Why Choose Paradise Path?
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We're not just a travel company – we're your partners in creating extraordinary experiences 
              that go beyond typical tourist destinations and transform your journey into a life-changing adventure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={index} 
                  className="text-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 hover:-translate-y-2 group animate-zoom-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-4xl font-black text-gray-900 dark:text-white mb-3 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium text-lg">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-green-300/20 to-emerald-300/20 rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-300/20 to-teal-300/20 rounded-full filter blur-3xl animate-float animation-delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Featured Destinations
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Discover our most enchanting travel destinations, handpicked for their breathtaking beauty, 
              rich culture, and once-in-a-lifetime experiences that will leave you speechless.
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
      <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
              What Our Travelers Say
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Don't just take our word for it – hear from the thousands of satisfied adventurers 
              who have experienced the transformative magic of Paradise Path journeys.
            </p>
          </div>

          {/* Testimonials Carousel */}
          <div className="relative max-w-4xl mx-auto">
            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-full shadow-xl hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:scale-110 group"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-full shadow-xl hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:scale-110 group"
            >
              <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400" />
            </button>

            {/* Testimonial Cards Slider */}
            <div className="overflow-hidden rounded-3xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-12 rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 text-center">
                      
                      {/* Profile Image */}
                      <div className="flex justify-center mb-8">
                        <div className="relative">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-24 h-24 rounded-full object-cover ring-4 ring-green-200 dark:ring-green-800 shadow-xl"
                          />
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Stars Rating */}
                      <div className="flex justify-center mb-6">
                        {renderStars(testimonial.rating)}
                      </div>
                      
                      {/* Comment */}
                      <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed text-xl mb-8 font-light">
                        "{testimonial.comment}"
                      </p>
                      
                      {/* Name and Location */}
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-xl mb-2">
                          {testimonial.name}
                        </h4>
                        <p className="text-green-600 dark:text-green-400 font-medium">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-green-600 dark:bg-green-400 scale-125'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-green-400 dark:hover:bg-green-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-700 via-emerald-800 to-gray-900 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full filter blur-3xl animate-float animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Ready to Start Your
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300">
                Epic Adventure?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-green-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied travelers and create memories that will inspire you 
              for generations. Your perfect adventure awaits!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 animate-slide-up animation-delay-1000">
            <Link
              to="/booking"
              className="group bg-white text-purple-600 hover:bg-gray-100 px-12 py-5 rounded-3xl font-bold text-xl transition-all duration-500 flex items-center space-x-3 shadow-2xl hover:shadow-white/25 transform hover:-translate-y-2 hover:scale-105"
            >
              <span>Book Your Dream Trip</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
            <Link
              to="/destinations"
              className="group border-2 border-white/80 backdrop-blur-sm text-white hover:bg-white/20 px-12 py-5 rounded-3xl font-bold text-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
            >
              Explore Destinations
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 text-cyan-100 animate-fade-in animation-delay-2000">
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl">
              <Phone className="h-6 w-6 text-cyan-300" />
              <span className="font-semibold text-lg">+94 77 123 4567</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl">
              <Mail className="h-6 w-6 text-cyan-300" />
              <span className="font-semibold text-lg">info@paradisepath.com</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
