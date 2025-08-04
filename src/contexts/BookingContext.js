import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

/**
 * BookingProvider component for managing booking state
 * Handles form data, validation, and booking flow
 */
export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    destination: '',
    startDate: '',
    endDate: '',
    numberOfTravelers: 1,
    totalAmount: 0
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  /**
   * Update booking data
   */
  const updateBookingData = (data) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  /**
   * Clear booking data
   */
  const clearBookingData = () => {
    setBookingData({
      fullName: '',
      email: '',
      phoneNumber: '',
      destination: '',
      startDate: '',
      endDate: '',
      numberOfTravelers: 1,
      totalAmount: 0
    });
    setErrors({});
  };

  /**
   * Validate booking form
   */
  const validateBooking = () => {
    const newErrors = {};

    if (!bookingData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!bookingData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!bookingData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(bookingData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!bookingData.destination) {
      newErrors.destination = 'Please select a destination';
    }

    if (!bookingData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!bookingData.endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (bookingData.startDate && bookingData.endDate) {
      const start = new Date(bookingData.startDate);
      const end = new Date(bookingData.endDate);
      if (end <= start) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    if (bookingData.numberOfTravelers < 1) {
      newErrors.numberOfTravelers = 'Number of travelers must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const value = {
    bookingData,
    updateBookingData,
    clearBookingData,
    validateBooking,
    errors,
    setErrors,
    isLoading,
    setIsLoading
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

/**
 * Custom hook to use booking context
 */
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
