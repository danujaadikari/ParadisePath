import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Users, MapPin, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import { useNotification } from '../contexts/NotificationContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { destinations } from '../data/destinations';
import { formatCurrency, getTodayDate, getTomorrowDate, calculateDaysBetween } from '../utils/helpers';
import { processPayment, isPayHereAvailable, loadPayHere } from '../utils/payhere';

/**
 * Booking page with comprehensive form and payment integration
 * Features: Form validation, PayHere integration, confirmation modal
 */
const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData, updateBookingData, validateBooking, errors, isLoading, setIsLoading } = useBooking();
  const { showSuccess, showError, showInfo } = useNotification();
  
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  // Get selected destination from navigation state or default to first destination
  const selectedDestination = location.state?.selectedDestination || destinations[0];

  useEffect(() => {
    // Pre-fill destination if coming from destination card
    if (selectedDestination && bookingData.destination !== selectedDestination.name) {
      updateBookingData({
        destination: selectedDestination.name,
        totalAmount: selectedDestination.price * bookingData.numberOfTravelers
      });
    }
  }, [selectedDestination, bookingData.destination, bookingData.numberOfTravelers, updateBookingData]);

  useEffect(() => {
    // Calculate total amount when number of travelers changes
    if (selectedDestination) {
      const total = selectedDestination.price * bookingData.numberOfTravelers;
      updateBookingData({ totalAmount: total });
    }
  }, [bookingData.numberOfTravelers, selectedDestination, updateBookingData]);

  useEffect(() => {
    // Load PayHere script
    loadPayHere().catch(() => {
      showError('Payment gateway is not available. Please try again later.');
    });
  }, [showError]);

  const handleInputChange = (field, value) => {
    updateBookingData({ [field]: value });
  };

  const handleDestinationChange = (destinationName) => {
    const destination = destinations.find(dest => dest.name === destinationName);
    if (destination) {
      updateBookingData({
        destination: destinationName,
        totalAmount: destination.price * bookingData.numberOfTravelers
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateBooking()) {
      setShowConfirmModal(true);
    } else {
      showError('Please fix the errors in the form before proceeding.');
    }
  };

  const handleConfirmBooking = async () => {
    if (!isPayHereAvailable()) {
      showError('Payment gateway is not available. Please try again later.');
      return;
    }

    setPaymentProcessing(true);
    setShowConfirmModal(false);

    try {
      showInfo('Redirecting to payment gateway...', 3000);

      const paymentResult = await processPayment(
        bookingData,
        (orderId) => {
          showSuccess('Payment completed successfully!');
          navigate('/payment-success', { 
            state: { 
              bookingData: { ...bookingData, orderId },
              destination: selectedDestination 
            }
          });
        },
        (error) => {
          showError(`Payment failed: ${error}`);
          navigate('/payment-failure', { 
            state: { error, bookingData }
          });
        },
        () => {
          showInfo('Payment was cancelled.');
        }
      );

    } catch (error) {
      console.error('Payment processing error:', error);
      showError('Failed to process payment. Please try again.');
    } finally {
      setPaymentProcessing(false);
    }
  };

  const calculateTripDuration = () => {
    if (bookingData.startDate && bookingData.endDate) {
      return calculateDaysBetween(bookingData.startDate, bookingData.endDate);
    }
    return 0;
  };

  const getTotalAmount = () => {
    const destination = destinations.find(dest => dest.name === bookingData.destination);
    if (destination) {
      return destination.price * bookingData.numberOfTravelers;
    }
    return 0;
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-purple-600 to-secondary-600 py-20">
        {/* Floating Particles */}
        <div className="absolute inset-0">
          <div className="floating-particles">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
            <div className="particle particle-4"></div>
            <div className="particle particle-5"></div>
          </div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card-subtle p-8 max-w-4xl mx-auto backdrop-blur-sm">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 text-shimmer">
              Book Your Dream Adventure
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Complete your booking in just a few steps and embark on an unforgettable journey through paradise.
            </p>
            
            {/* Progress Indicators */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <span className="text-white/80 text-sm font-medium">Details</span>
              </div>
              <div className="w-12 h-0.5 bg-white/30"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-white/60 font-bold text-sm">2</span>
                </div>
                <span className="text-white/60 text-sm font-medium">Payment</span>
              </div>
              <div className="w-12 h-0.5 bg-white/20"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-white/60 font-bold text-sm">3</span>
                </div>
                <span className="text-white/60 text-sm font-medium">Confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Booking Form */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8 animate-staggered-fade-in">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 text-shimmer">
                  Booking Information
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information Section */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <span>Personal Information</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="form-label text-base font-semibold">
                        Full Name *
                      </label>
                      <div className="relative group">
                        <input
                          type="text"
                          id="fullName"
                          value={bookingData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className={`form-input-glass focus-visible-modern ${errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                          placeholder="Enter your full name"
                        />
                        <div className="input-glow-effect"></div>
                      </div>
                      {errors.fullName && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-400 animate-staggered-fade-in flex items-center space-x-2">
                          <span className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0 animate-pulse"></span>
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="form-label text-base font-semibold">
                        Email Address *
                      </label>
                      <div className="relative group">
                        <input
                          type="email"
                          id="email"
                          value={bookingData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`form-input-glass focus-visible-modern ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                          placeholder="Enter your email"
                        />
                        <div className="input-glow-effect"></div>
                      </div>
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-400 animate-staggered-fade-in flex items-center space-x-2">
                          <span className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0 animate-pulse"></span>
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phoneNumber" className="form-label text-base font-semibold">
                      Phone Number *
                    </label>
                    <div className="relative group">
                      <input
                        type="tel"
                        id="phoneNumber"
                        value={bookingData.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        className={`form-input-glass focus-visible-modern ${errors.phoneNumber ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                        placeholder="Enter your phone number"
                      />
                      <div className="input-glow-effect"></div>
                    </div>
                    {errors.phoneNumber && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400 animate-staggered-fade-in flex items-center space-x-2">
                        <span className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0 animate-pulse"></span>
                        <span>{errors.phoneNumber}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Trip Information Section */}
                <div className="space-y-6 border-t border-gray-200 dark:border-gray-700 pt-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <span>Trip Details</span>
                  </h3>
                  
                  <div className="space-y-2">
                    <label htmlFor="destination" className="form-label text-base font-semibold">
                      Destination *
                    </label>
                    <div className="relative group">
                      <select
                        id="destination"
                        value={bookingData.destination}
                        onChange={(e) => handleDestinationChange(e.target.value)}
                        className={`form-input-glass focus-visible-modern ${errors.destination ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                      >
                        <option value="">Select a destination</option>
                        {destinations.map((dest) => (
                          <option key={dest.id} value={dest.name}>
                            {dest.name} - {formatCurrency(dest.price)}
                          </option>
                        ))}
                      </select>
                      <div className="input-glow-effect"></div>
                    </div>
                    {errors.destination && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400 animate-staggered-fade-in flex items-center space-x-2">
                        <span className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0 animate-pulse"></span>
                        <span>{errors.destination}</span>
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="startDate" className="form-label text-base font-semibold">
                        Start Date *
                      </label>
                      <div className="relative group">
                        <input
                          type="date"
                          id="startDate"
                          value={bookingData.startDate}
                          onChange={(e) => handleInputChange('startDate', e.target.value)}
                          min={getTodayDate()}
                          className={`form-input-glass focus-visible-modern ${errors.startDate ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                        />
                        <div className="input-glow-effect"></div>
                      </div>
                      {errors.startDate && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-400 animate-staggered-fade-in flex items-center space-x-2">
                          <span className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0 animate-pulse"></span>
                          <span>{errors.startDate}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="endDate" className="form-label text-base font-semibold">
                        End Date *
                      </label>
                      <div className="relative group">
                        <input
                          type="date"
                          id="endDate"
                          value={bookingData.endDate}
                          onChange={(e) => handleInputChange('endDate', e.target.value)}
                          min={bookingData.startDate || getTomorrowDate()}
                          className={`form-input-glass focus-visible-modern ${errors.endDate ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                        />
                        <div className="input-glow-effect"></div>
                      </div>
                      {errors.endDate && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-400 animate-staggered-fade-in flex items-center space-x-2">
                          <span className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0 animate-pulse"></span>
                          <span>{errors.endDate}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="numberOfTravelers" className="form-label text-base font-semibold">
                      Number of Travelers *
                    </label>
                    <div className="relative group">
                      <select
                        id="numberOfTravelers"
                        value={bookingData.numberOfTravelers}
                        onChange={(e) => handleInputChange('numberOfTravelers', parseInt(e.target.value))}
                        className={`form-input-glass focus-visible-modern ${errors.numberOfTravelers ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Person' : 'People'}
                          </option>
                        ))}
                      </select>
                      <div className="input-glow-effect"></div>
                    </div>
                    {errors.numberOfTravelers && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400 animate-staggered-fade-in flex items-center space-x-2">
                        <span className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0 animate-pulse"></span>
                        <span>{errors.numberOfTravelers}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Enhanced Submit Button */}
                <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="submit"
                    disabled={isLoading || paymentProcessing}
                    className="w-full btn-glass text-lg py-4 px-8 disabled:opacity-50 disabled:cursor-not-allowed hover-glow-purple flex items-center justify-center space-x-3 group"
                  >
                    {isLoading || paymentProcessing ? (
                      <>
                        <div className="modern-spinner w-6 h-6"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                        <span>Proceed to Secure Payment</span>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Enhanced Booking Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card p-8 sticky top-24 animate-staggered-fade-in">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 text-shimmer">
                  Booking Summary
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
              </div>

              {bookingData.destination ? (
                <div className="space-y-6">
                  {/* Destination */}
                  <div className="glass-card-subtle p-4 hover:scale-105 transition-all duration-300 group">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl group-hover:from-primary-500/30 group-hover:to-secondary-500/30 transition-all duration-300">
                        <MapPin className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 dark:text-white text-lg">
                          {bookingData.destination}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          Destination
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  {bookingData.startDate && bookingData.endDate && (
                    <div className="glass-card-subtle p-4 hover:scale-105 transition-all duration-300 group">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                          <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-900 dark:text-white text-lg">
                            {new Date(bookingData.startDate).toLocaleDateString()} - {new Date(bookingData.endDate).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                            {calculateTripDuration()} days adventure
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Travelers */}
                  <div className="glass-card-subtle p-4 hover:scale-105 transition-all duration-300 group">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
                        <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 dark:text-white text-lg">
                          {bookingData.numberOfTravelers} {bookingData.numberOfTravelers === 1 ? 'Person' : 'People'}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          Travelers
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="glass-card-subtle p-6 space-y-4">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg"></div>
                      <span>Price Breakdown</span>
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">
                          Price per person:
                        </span>
                        <span className="font-bold text-gray-900 dark:text-white">
                          {formatCurrency(getTotalAmount() / bookingData.numberOfTravelers)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">
                          Number of travelers:
                        </span>
                        <span className="font-bold text-gray-900 dark:text-white">
                          {bookingData.numberOfTravelers}
                        </span>
                      </div>
                      
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-lg border border-primary-200 dark:border-primary-700">
                          <span className="text-xl font-bold text-gray-900 dark:text-white">Total:</span>
                          <span className="text-2xl font-black text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text">
                            {formatCurrency(getTotalAmount())}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Security Info */}
                  <div className="glass-card-subtle p-6 bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-green-900 dark:text-green-100 mb-2">
                          Secure Payment
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-200 leading-relaxed">
                          Your payment is processed securely through PayHere payment gateway with industry-standard encryption.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    Select a destination to view booking summary
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-staggered-fade-in">
          <div className="glass-card max-w-lg w-full p-8 animate-scale-in">
            {/* Modal Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 text-shimmer">
                Confirm Your Booking
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-center leading-relaxed">
              Please review your booking details before proceeding to payment. 
              You will be redirected to PayHere to complete your payment securely.
            </p>
            
            {/* Booking Summary in Modal */}
            <div className="glass-card-subtle p-6 mb-8 space-y-4">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"></div>
                <span>Booking Summary</span>
              </h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Destination:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{bookingData.destination}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Travelers:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{bookingData.numberOfTravelers}</span>
                </div>
                
                {bookingData.startDate && bookingData.endDate && (
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Duration:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{calculateTripDuration()} days</span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-lg border border-primary-200 dark:border-primary-700">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">Total Amount:</span>
                    <span className="text-2xl font-black text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text">
                      {formatCurrency(getTotalAmount())}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Security Notice */}
            <div className="glass-card-subtle p-4 bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 mb-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-green-900 dark:text-green-100">
                    Secure Payment Gateway
                  </p>
                  <p className="text-xs text-green-700 dark:text-green-200">
                    256-bit SSL encryption • PCI DSS compliant
                  </p>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 btn-glass-secondary text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-3 px-6 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                disabled={paymentProcessing}
                className="flex-1 btn-glass disabled:opacity-50 py-3 px-6 flex items-center justify-center space-x-2 hover-glow-green group"
              >
                {paymentProcessing ? (
                  <>
                    <div className="modern-spinner w-5 h-5"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span>Confirm & Pay</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
