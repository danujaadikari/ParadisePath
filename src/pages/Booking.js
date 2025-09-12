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
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Book Your Dream Trip
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Fill out the form below to reserve your spot on an unforgettable adventure.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="card-enhanced p-8 animate-staggered-fade-in">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8 text-center">
                Booking Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="form-label text-base font-semibold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={bookingData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`form-input-modern focus-visible-modern ${errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400 animate-staggered-fade-in flex items-center space-x-2">
                        <span className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0"></span>
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="form-label text-base font-semibold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={bookingData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`form-input-modern focus-visible-modern ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400 animate-staggered-fade-in flex items-center space-x-2">
                        <span className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0"></span>
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phoneNumber" className="form-label text-base font-semibold">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={bookingData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className={`form-input ${errors.phoneNumber ? 'border-red-500' : ''}`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                {/* Trip Information */}
                <div>
                  <label htmlFor="destination" className="form-label">
                    Destination *
                  </label>
                  <select
                    id="destination"
                    value={bookingData.destination}
                    onChange={(e) => handleDestinationChange(e.target.value)}
                    className={`form-input ${errors.destination ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select a destination</option>
                    {destinations.map((dest) => (
                      <option key={dest.id} value={dest.name}>
                        {dest.name} - {formatCurrency(dest.price)}
                      </option>
                    ))}
                  </select>
                  {errors.destination && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.destination}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="startDate" className="form-label">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      value={bookingData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      min={getTodayDate()}
                      className={`form-input ${errors.startDate ? 'border-red-500' : ''}`}
                    />
                    {errors.startDate && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.startDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="endDate" className="form-label">
                      End Date *
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      value={bookingData.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      min={bookingData.startDate || getTomorrowDate()}
                      className={`form-input ${errors.endDate ? 'border-red-500' : ''}`}
                    />
                    {errors.endDate && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.endDate}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="numberOfTravelers" className="form-label">
                    Number of Travelers *
                  </label>
                  <select
                    id="numberOfTravelers"
                    value={bookingData.numberOfTravelers}
                    onChange={(e) => handleInputChange('numberOfTravelers', parseInt(e.target.value))}
                    className={`form-input ${errors.numberOfTravelers ? 'border-red-500' : ''}`}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Person' : 'People'}
                      </option>
                    ))}
                  </select>
                  {errors.numberOfTravelers && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.numberOfTravelers}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || paymentProcessing}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading || paymentProcessing ? (
                    <>
                      <LoadingSpinner size="small" color="white" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      <span>Proceed to Payment</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Booking Summary
              </h3>

              {bookingData.destination && (
                <div className="space-y-4">
                  {/* Destination */}
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {bookingData.destination}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Destination
                      </p>
                    </div>
                  </div>

                  {/* Dates */}
                  {bookingData.startDate && bookingData.endDate && (
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {new Date(bookingData.startDate).toLocaleDateString()} - {new Date(bookingData.endDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {calculateTripDuration()} days
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Travelers */}
                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {bookingData.numberOfTravelers} {bookingData.numberOfTravelers === 1 ? 'Person' : 'People'}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Travelers
                      </p>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="border-t dark:border-gray-700 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Price per person:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatCurrency(getTotalAmount() / bookingData.numberOfTravelers)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Number of travelers:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {bookingData.numberOfTravelers}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t dark:border-gray-700 pt-2">
                      <span className="text-gray-900 dark:text-white">Total:</span>
                      <span className="text-primary-600 dark:text-primary-400">
                        {formatCurrency(getTotalAmount())}
                      </span>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mt-6">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-green-900 dark:text-green-100">
                          Secure Payment
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-200">
                          Your payment is processed securely through PayHere payment gateway.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Confirm Your Booking
              </h3>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Please review your booking details before proceeding to payment. 
              You will be redirected to PayHere to complete your payment securely.
            </p>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Destination:</span>
                  <span className="font-medium">{bookingData.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span>Travelers:</span>
                  <span className="font-medium">{bookingData.numberOfTravelers}</span>
                </div>
                <div className="flex justify-between font-semibold text-base pt-2 border-t dark:border-gray-600">
                  <span>Total Amount:</span>
                  <span className="text-primary-600 dark:text-primary-400">
                    {formatCurrency(getTotalAmount())}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                disabled={paymentProcessing}
                className="flex-1 btn-primary disabled:opacity-50"
              >
                {paymentProcessing ? 'Processing...' : 'Confirm & Pay'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
