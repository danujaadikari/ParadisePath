import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Download, Calendar, MapPin, Users, Mail, Phone } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import { formatCurrency, formatDate } from '../utils/helpers';

/**
 * Payment success page displayed after successful payment
 * Features: Booking confirmation, download option, contact information
 */
const PaymentSuccess = () => {
  const location = useLocation();
  const { clearBookingData } = useBooking();
  
  // Get booking data from navigation state
  const bookingDetails = location.state?.bookingData;
  const destination = location.state?.destination;

  useEffect(() => {
    // Clear booking data from context since payment is complete
    clearBookingData();
  }, [clearBookingData]);

  const handleDownloadConfirmation = () => {
    // Generate and download PDF confirmation
    // In a real application, this would generate a proper PDF
    const confirmationData = {
      bookingId: bookingDetails?.orderId || 'PP' + Date.now(),
      customerName: bookingDetails?.fullName,
      email: bookingDetails?.email,
      phone: bookingDetails?.phoneNumber,
      destination: bookingDetails?.destination,
      startDate: bookingDetails?.startDate,
      endDate: bookingDetails?.endDate,
      travelers: bookingDetails?.numberOfTravelers,
      totalAmount: bookingDetails?.totalAmount,
      paymentDate: new Date().toISOString()
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(confirmationData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `booking-confirmation-${confirmationData.bookingId}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const calculateTripDuration = () => {
    if (bookingDetails?.startDate && bookingDetails?.endDate) {
      const start = new Date(bookingDetails.startDate);
      const end = new Date(bookingDetails.endDate);
      const diffTime = Math.abs(end - start);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  if (!bookingDetails) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            No booking information found
          </h1>
          <Link
            to="/"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      {/* Success Hero */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Congratulations! Your booking has been confirmed. We've sent a confirmation email 
            with all the details of your upcoming adventure.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Booking Confirmation Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Booking Confirmation</h2>
            <p className="text-blue-100">Booking ID: {bookingDetails.orderId || 'PP' + Date.now()}</p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Customer Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Full Name</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {bookingDetails.fullName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {bookingDetails.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {bookingDetails.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>

              {/* Trip Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Trip Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Destination</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {bookingDetails.destination}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Travel Dates</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {formatDate(bookingDetails.startDate)} - {formatDate(bookingDetails.endDate)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ({calculateTripDuration()} days)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Travelers</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {bookingDetails.numberOfTravelers} {bookingDetails.numberOfTravelers === 1 ? 'Person' : 'People'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="border-t dark:border-gray-700 mt-6 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Payment Summary
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Amount Paid:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(bookingDetails.totalAmount)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Payment Method:</span>
                  <span className="font-medium text-gray-900 dark:text-white">PayHere</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Payment Date:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatDate(new Date())}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={handleDownloadConfirmation}
            className="btn-primary flex-1 flex items-center justify-center space-x-2"
          >
            <Download className="h-5 w-5" />
            <span>Download Confirmation</span>
          </button>
          
          <Link
            to="/destinations"
            className="btn-secondary flex-1 flex items-center justify-center space-x-2"
          >
            <MapPin className="h-5 w-5" />
            <span>Browse More Destinations</span>
          </Link>
        </div>

        {/* What's Next */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            What Happens Next?
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Confirmation Email</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  You'll receive a detailed confirmation email within the next few minutes with your itinerary and important travel information.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Travel Consultant Contact</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Our travel consultant will contact you within 24 hours to discuss your trip details and answer any questions.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Final Documentation</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  2 weeks before departure, you'll receive final travel documents, hotel confirmations, and departure instructions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Need Help or Have Questions?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our customer support team is here to help you with any questions about your booking.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:0786621310"
              className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              <Phone className="h-4 w-4" />
              <span>Call Support</span>
            </a>
            <a
              href="mailto:support@paradisepath.com"
              className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              <Mail className="h-4 w-4" />
              <span>Email Support</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
