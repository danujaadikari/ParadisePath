import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { BookingProvider } from './contexts/BookingContext';
import { NotificationProvider } from './contexts/NotificationContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotificationContainer from './components/NotificationContainer';

// Pages
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailure from './pages/PaymentFailure';

/**
 * Main App component that sets up routing and global providers
 * Includes theme management, booking state, and notifications
 */
function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <BookingProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/destinations" element={<Destinations />} />
                  <Route path="/booking" element={<Booking />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/payment-success" element={<PaymentSuccess />} />
                  <Route path="/payment-failure" element={<PaymentFailure />} />
                </Routes>
              </main>
              <Footer />
              <NotificationContainer />
            </div>
          </Router>
        </BookingProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
