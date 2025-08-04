import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

/**
 * NotificationProvider component for managing global notifications
 * Handles success, error, and info messages throughout the app
 */
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  /**
   * Add a new notification
   */
  const addNotification = (message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random();
    const notification = { id, message, type, duration };
    
    setNotifications(prev => [...prev, notification]);

    return id;
  };

  /**
   * Remove a notification by ID
   */
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  /**
   * Clear all notifications
   */
  const clearNotifications = () => {
    setNotifications([]);
  };

  /**
   * Convenience methods for different notification types
   */
  const showSuccess = (message, duration) => addNotification(message, 'success', duration);
  const showError = (message, duration) => addNotification(message, 'error', duration);
  const showInfo = (message, duration) => addNotification(message, 'info', duration);

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    showSuccess,
    showError,
    showInfo
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

/**
 * Custom hook to use notification context
 */
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
