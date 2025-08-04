/**
 * PayHere payment gateway integration
 * Handles payment processing for the travel booking system
 */

// PayHere configuration (sandbox)
const PAYHERE_CONFIG = {
  sandbox: true, // Set to false for production
  merchant_id: "1226149", // Replace with your PayHere merchant ID
  currency: "USD",
  country: "LK",
  callback_url: window.location.origin + "/payment-success",
  cancel_url: window.location.origin + "/payment-failure",
  notify_url: window.location.origin + "/api/payment/notify" // Backend endpoint
};

/**
 * Process payment using PayHere
 */
export const processPayment = (bookingData, onSuccess, onError, onCancel) => {
  return new Promise((resolve, reject) => {
    try {
      // Check if PayHere is loaded
      if (typeof window.payhere === 'undefined') {
        throw new Error('PayHere payment gateway is not loaded');
      }

      // Generate order ID
      const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Prepare payment object
      const payment = {
        sandbox: PAYHERE_CONFIG.sandbox,
        merchant_id: PAYHERE_CONFIG.merchant_id,
        return_url: PAYHERE_CONFIG.callback_url,
        cancel_url: PAYHERE_CONFIG.cancel_url,
        notify_url: PAYHERE_CONFIG.notify_url,
        order_id: orderId,
        items: `Travel Package - ${bookingData.destination}`,
        amount: bookingData.totalAmount.toFixed(2),
        currency: PAYHERE_CONFIG.currency,
        hash: generateHash(orderId, bookingData.totalAmount), // You need to implement this on backend
        first_name: bookingData.fullName.split(' ')[0] || '',
        last_name: bookingData.fullName.split(' ').slice(1).join(' ') || '',
        email: bookingData.email,
        phone: bookingData.phoneNumber,
        address: "No address provided",
        city: "Colombo",
        country: PAYHERE_CONFIG.country,
        delivery_address: "No delivery address",
        delivery_city: "Colombo",
        delivery_country: PAYHERE_CONFIG.country,
        custom_1: JSON.stringify({
          destination: bookingData.destination,
          startDate: bookingData.startDate,
          endDate: bookingData.endDate,
          numberOfTravelers: bookingData.numberOfTravelers
        }),
        custom_2: ""
      };

      // Set up payment callbacks
      window.payhere.onCompleted = function onCompleted(orderId) {
        console.log("Payment completed. OrderID:" + orderId);
        onSuccess && onSuccess(orderId);
        resolve({ success: true, orderId });
      };

      window.payhere.onDismissed = function onDismissed() {
        console.log("Payment dismissed");
        onCancel && onCancel();
        resolve({ success: false, dismissed: true });
      };

      window.payhere.onError = function onError(error) {
        console.log("Error:" + error);
        onError && onError(error);
        reject(new Error(error));
      };

      // Start payment
      window.payhere.startPayment(payment);

    } catch (error) {
      console.error('Payment processing error:', error);
      onError && onError(error.message);
      reject(error);
    }
  });
};

/**
 * Generate payment hash (simplified version)
 * In production, this should be done on the backend for security
 */
const generateHash = (orderId, amount) => {
  // This is a simplified hash generation
  // In production, use your merchant secret and proper hashing
  const merchantSecret = "your_merchant_secret"; // Replace with actual secret
  const hashString = `${PAYHERE_CONFIG.merchant_id}${orderId}${amount.toFixed(2)}${PAYHERE_CONFIG.currency}${merchantSecret}`;
  
  // Simple hash (use crypto library in production)
  let hash = 0;
  for (let i = 0; i < hashString.length; i++) {
    const char = hashString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
};

/**
 * Validate payment response
 */
export const validatePaymentResponse = (response) => {
  // Add validation logic here
  return response && response.order_id && response.payment_id;
};

/**
 * Format payment data for storage
 */
export const formatPaymentData = (bookingData, paymentResponse) => {
  return {
    orderId: paymentResponse.order_id,
    paymentId: paymentResponse.payment_id,
    amount: bookingData.totalAmount,
    currency: PAYHERE_CONFIG.currency,
    status: 'completed',
    bookingDetails: {
      fullName: bookingData.fullName,
      email: bookingData.email,
      phoneNumber: bookingData.phoneNumber,
      destination: bookingData.destination,
      startDate: bookingData.startDate,
      endDate: bookingData.endDate,
      numberOfTravelers: bookingData.numberOfTravelers
    },
    timestamp: new Date().toISOString()
  };
};

/**
 * Check if PayHere is available
 */
export const isPayHereAvailable = () => {
  return typeof window.payhere !== 'undefined';
};

/**
 * Load PayHere script dynamically if not already loaded
 */
export const loadPayHere = () => {
  return new Promise((resolve, reject) => {
    if (isPayHereAvailable()) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.payhere.lk/lib/payhere.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load PayHere script'));
    document.head.appendChild(script);
  });
};
