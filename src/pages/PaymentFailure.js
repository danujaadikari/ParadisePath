import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { XCircle, RefreshCw, Phone, Mail, AlertTriangle } from 'lucide-react';

/**
 * Payment failure page             <a
              href="mailto:danujaadikari2001@gmail.com"
              className="flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-lg font-medium transition-colors duration-200"
            >
              <Mail className="h-4 w-4" />
              <span>Email Support</span>
            </a>
          </div>ayment fails or is cancelled
 * Features: Error information, retry options, support contact
 */
const PaymentFailure = () => {
  const location = useLocation();
  
  // Get error details and booking data from navigation state
  const error = location.state?.error;
  const bookingData = location.state?.bookingData;

  const commonIssues = [
    {
      issue: 'Card Declined',
      solution: 'Contact your bank to ensure your card is enabled for online transactions and has sufficient funds.'
    },
    {
      issue: 'Payment Gateway Timeout',
      solution: 'This usually happens due to slow internet connection. Please try again with a stable connection.'
    },
    {
      issue: 'Incorrect Card Details',
      solution: 'Double-check your card number, expiry date, and CVV code before trying again.'
    },
    {
      issue: 'Bank Authorization Failed',
      solution: 'Your bank may have blocked the transaction for security. Contact them to authorize online payments.'
    }
  ];

  const troubleshootingSteps = [
    'Ensure you have a stable internet connection',
    'Check that your card has sufficient funds',
    'Verify all card details are entered correctly',
    'Disable browser extensions that might interfere',
    'Try using a different browser or device',
    'Contact your bank to enable online transactions'
  ];

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      {/* Error Hero */}
      <section className="bg-gradient-to-r from-red-600 to-pink-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6">
            <XCircle className="h-12 w-12 text-red-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Payment Failed
          </h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            We couldn't process your payment. Don't worry - your booking is saved 
            and you can try again or contact our support team for assistance.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Error Details */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">
                  Error Details
                </h3>
                <p className="text-red-700 dark:text-red-200">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            What would you like to do?
          </h2>
          
          <div className="flex justify-center">
            <Link
              to="/booking"
              state={{ selectedDestination: location.state?.destination, retryBooking: bookingData }}
              className="flex items-center justify-center space-x-3 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-lg font-semibold transition-colors duration-200"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Try Payment Again</span>
            </Link>
          </div>
        </div>

        {/* Booking Summary (if available) */}
        {bookingData && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Your Booking Details (Saved)
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Destination:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {bookingData.destination}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Travelers:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {bookingData.numberOfTravelers}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Dates:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {bookingData.startDate} to {bookingData.endDate}
                </span>
              </div>
              <div className="flex justify-between border-t dark:border-gray-600 pt-2">
                <span className="text-gray-600 dark:text-gray-400">Total Amount:</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  ${bookingData.totalAmount}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
              Your booking details have been saved. You can continue with the payment or contact us for assistance.
            </p>
          </div>
        )}

        {/* Common Issues */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Common Payment Issues & Solutions
          </h3>
          <div className="space-y-4">
            {commonIssues.map((item, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {item.issue}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {item.solution}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Troubleshooting Steps
          </h3>
          <div className="space-y-3">
            {troubleshootingSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-xs">
                    {index + 1}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Still Having Issues?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Our support team is here to help you complete your booking. 
            We can process your payment over the phone or help troubleshoot any issues.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="tel:0786621310"
              className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-medium transition-colors duration-200"
            >
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </a>
            
            <a
              href="mailto:support@paradisepath.com"
              className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition-colors duration-200"
            >
              <Mail className="h-4 w-4" />
              <span>Email Support</span>
            </a>
            
            <Link
              to="/contact"
              className="flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-lg font-medium transition-colors duration-200"
            >
              <Mail className="h-4 w-4" />
              <span>Contact Form</span>
            </Link>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div>
                <strong className="text-gray-900 dark:text-white">Phone Support:</strong>
                <br />
                Mon - Fri: 9:00 AM - 6:00 PM
                <br />
                Sat: 9:00 AM - 2:00 PM
              </div>
              <div>
                <strong className="text-gray-900 dark:text-white">Email Support:</strong>
                <br />
                Response within 2 hours
                <br />
                Available 24/7
              </div>
            </div>
          </div>
        </div>

        {/* Alternative Actions */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Or explore other options:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/destinations"
              className="btn-secondary"
            >
              Browse Destinations
            </Link>
            <Link
              to="/"
              className="btn-secondary"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
