import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Mail, Phone, Lock, UserCheck, Calendar, MapPin, CreditCard } from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Account page with login, registration, and user dashboard
 * Features: Tabbed interface, form validation, user profile management
 */
const Account = () => {
  const { showSuccess, showError } = useNotification();
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Registration form state
  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  // Form errors
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('paradisePath_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
      setActiveTab('dashboard');
    }
  }, []);

  const validateLoginForm = () => {
    const newErrors = {};

    if (!loginData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!loginData.password) {
      newErrors.password = 'Password is required';
    } else if (loginData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegisterForm = () => {
    const newErrors = {};

    if (!registerData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (registerData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!registerData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!registerData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[\d\s\-\(\)]{10,}$/.test(registerData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!registerData.password) {
      newErrors.password = 'Password is required';
    } else if (registerData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!registerData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateLoginForm()) {
      showError('Please fix the errors in the form before proceeding.');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real application, you would authenticate with your backend
      const userData = {
        id: Date.now(),
        fullName: 'John Doe', // This would come from your backend
        email: loginData.email,
        phone: '+1234567890',
        joinDate: new Date().toISOString(),
        bookings: []
      };
      
      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem('paradisePath_user', JSON.stringify(userData));
      setActiveTab('dashboard');
      
      showSuccess('Welcome back! You have successfully logged in.');
      
    } catch (error) {
      showError('Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateRegisterForm()) {
      showError('Please fix the errors in the form before proceeding.');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real application, you would register with your backend
      const userData = {
        id: Date.now(),
        fullName: registerData.fullName,
        email: registerData.email,
        phone: registerData.phone,
        joinDate: new Date().toISOString(),
        bookings: []
      };
      
      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem('paradisePath_user', JSON.stringify(userData));
      setActiveTab('dashboard');
      
      showSuccess('Account created successfully! Welcome to Paradise Path.');
      
    } catch (error) {
      showError('Registration failed. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('paradisePath_user');
    setActiveTab('login');
    setLoginData({ email: '', password: '' });
    setRegisterData({ fullName: '', email: '', phone: '', password: '', confirmPassword: '' });
    setErrors({});
    showSuccess('You have been logged out successfully.');
  };

  const handleInputChange = (formType, field, value) => {
    if (formType === 'login') {
      setLoginData(prev => ({ ...prev, [field]: value }));
    } else {
      setRegisterData(prev => ({ ...prev, [field]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg'
          : 'bg-white/10 dark:bg-gray-800/20 text-gray-600 dark:text-gray-400 hover:bg-white/20 dark:hover:bg-gray-800/30'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </button>
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
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
            <div className="glass-card-subtle p-8 max-w-2xl mx-auto backdrop-blur-sm">
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 text-shimmer">
                Welcome to Paradise Path
              </h1>
              <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
                Sign in to your account or create a new one to start planning your dream adventure.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Tab Navigation */}
          <div className="flex space-x-4 mb-8 p-2 bg-white/5 dark:bg-gray-800/10 backdrop-blur-sm rounded-xl">
            <TabButton
              id="login"
              label="Sign In"
              icon={User}
              isActive={activeTab === 'login'}
              onClick={() => setActiveTab('login')}
            />
            <TabButton
              id="register"
              label="Create Account"
              icon={UserCheck}
              isActive={activeTab === 'register'}
              onClick={() => setActiveTab('register')}
            />
          </div>

          {/* Login Form */}
          {activeTab === 'login' && (
            <div className="glass-card p-8 animate-staggered-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 text-shimmer">
                  Sign In
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="loginEmail" className="form-label text-base font-semibold">
                    Email Address *
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      id="loginEmail"
                      value={loginData.email}
                      onChange={(e) => handleInputChange('login', 'email', e.target.value)}
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

                <div className="space-y-2">
                  <label htmlFor="loginPassword" className="form-label text-base font-semibold">
                    Password *
                  </label>
                  <div className="relative group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="loginPassword"
                      value={loginData.password}
                      onChange={(e) => handleInputChange('login', 'password', e.target.value)}
                      className={`form-input-glass focus-visible-modern pr-12 ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                    <div className="input-glow-effect"></div>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 animate-staggered-fade-in flex items-center space-x-2">
                      <span className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0 animate-pulse"></span>
                      <span>{errors.password}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-glass text-lg py-4 px-8 disabled:opacity-50 disabled:cursor-not-allowed hover-glow-purple flex items-center justify-center space-x-3 group"
                >
                  {isLoading ? (
                    <>
                      <div className="modern-spinner w-6 h-6"></div>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <User className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                      <span>Sign In</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Registration Form */}
          {activeTab === 'register' && (
            <div className="glass-card p-8 animate-staggered-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 text-shimmer">
                  Create Account
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
              </div>

              <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="registerName" className="form-label text-base font-semibold">
                    Full Name *
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      id="registerName"
                      value={registerData.fullName}
                      onChange={(e) => handleInputChange('register', 'fullName', e.target.value)}
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
                  <label htmlFor="registerEmail" className="form-label text-base font-semibold">
                    Email Address *
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      id="registerEmail"
                      value={registerData.email}
                      onChange={(e) => handleInputChange('register', 'email', e.target.value)}
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

                <div className="space-y-2">
                  <label htmlFor="registerPhone" className="form-label text-base font-semibold">
                    Phone Number *
                  </label>
                  <div className="relative group">
                    <input
                      type="tel"
                      id="registerPhone"
                      value={registerData.phone}
                      onChange={(e) => handleInputChange('register', 'phone', e.target.value)}
                      className={`form-input-glass focus-visible-modern ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                      placeholder="Enter your phone number"
                    />
                    <div className="input-glow-effect"></div>
                  </div>
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 animate-staggered-fade-in flex items-center space-x-2">
                      <span className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0 animate-pulse"></span>
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="registerPassword" className="form-label text-base font-semibold">
                    Password *
                  </label>
                  <div className="relative group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="registerPassword"
                      value={registerData.password}
                      onChange={(e) => handleInputChange('register', 'password', e.target.value)}
                      className={`form-input-glass focus-visible-modern pr-12 ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                    <div className="input-glow-effect"></div>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 animate-staggered-fade-in flex items-center space-x-2">
                      <span className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0 animate-pulse"></span>
                      <span>{errors.password}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="form-label text-base font-semibold">
                    Confirm Password *
                  </label>
                  <div className="relative group">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      value={registerData.confirmPassword}
                      onChange={(e) => handleInputChange('register', 'confirmPassword', e.target.value)}
                      className={`form-input-glass focus-visible-modern pr-12 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                    <div className="input-glow-effect"></div>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 animate-staggered-fade-in flex items-center space-x-2">
                      <span className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0 animate-pulse"></span>
                      <span>{errors.confirmPassword}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-glass text-lg py-4 px-8 disabled:opacity-50 disabled:cursor-not-allowed hover-glow-green flex items-center justify-center space-x-3 group"
                >
                  {isLoading ? (
                    <>
                      <div className="modern-spinner w-6 h-6"></div>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <UserCheck className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                      <span>Create Account</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }

  // User Dashboard
  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      {/* Dashboard Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-purple-600 to-secondary-600 py-16">
        <div className="absolute inset-0">
          <div className="floating-particles">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card-subtle p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4 text-shimmer">
                  Welcome back, {user.fullName}!
                </h1>
                <p className="text-xl text-green-100">
                  Manage your account and view your booking history
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="btn-glass-secondary text-white hover:text-gray-200 px-6 py-3"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <div className="lg:col-span-1">
            <div className="glass-card p-8 sticky top-24">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                  {user.fullName}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Member since {new Date(user.joinDate).toLocaleDateString()}
                </p>
              </div>

              <div className="space-y-4">
                <div className="glass-card-subtle p-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                      <p className="font-medium text-gray-900 dark:text-white">{user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card-subtle p-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                      <p className="font-medium text-gray-900 dark:text-white">{user.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card-subtle p-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Bookings</p>
                      <p className="font-medium text-gray-900 dark:text-white">{user.bookings.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8 text-shimmer">
                Account Dashboard
              </h2>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card-subtle p-6 text-center">
                  <CreditCard className="h-12 w-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{user.bookings.length}</h3>
                  <p className="text-gray-600 dark:text-gray-400">Total Bookings</p>
                </div>

                <div className="glass-card-subtle p-6 text-center">
                  <MapPin className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">0</h3>
                  <p className="text-gray-600 dark:text-gray-400">Destinations Visited</p>
                </div>

                <div className="glass-card-subtle p-6 text-center">
                  <Calendar className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">0</h3>
                  <p className="text-gray-600 dark:text-gray-400">Upcoming Trips</p>
                </div>
              </div>

              {/* Recent Bookings */}
              <div className="glass-card-subtle p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Recent Bookings
                </h3>
                
                {user.bookings.length === 0 ? (
                  <div className="text-center py-12">
                    <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-4">
                      No bookings yet
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 mb-6">
                      Start planning your dream adventure today!
                    </p>
                    <a
                      href="/destinations"
                      className="btn-glass inline-flex items-center space-x-2 px-6 py-3"
                    >
                      <MapPin className="h-5 w-5" />
                      <span>Explore Destinations</span>
                    </a>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {user.bookings.map((booking, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {booking.destination}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {booking.startDate} - {booking.endDate}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">
                              {booking.numberOfTravelers} travelers
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded-full text-sm font-medium">
                            Confirmed
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;