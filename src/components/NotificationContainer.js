import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';

/**
 * Individual notification component
 */
const Notification = ({ notification, onRemove }) => {
  const { id, message, type, duration } = notification;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onRemove(id);
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [id, duration, onRemove]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5" />;
      case 'error':
        return <AlertCircle className="h-5 w-5" />;
      case 'info':
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getColorClasses = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 border-green-600';
      case 'error':
        return 'bg-red-500 border-red-600';
      case 'info':
      default:
        return 'bg-green-500 border-green-600';
    }
  };

  return (
    <div 
      className={`
        ${getColorClasses()}
        text-white p-4 rounded-lg shadow-lg border-l-4 
        max-w-sm w-full mx-auto mb-4 
        flex items-start space-x-3
        animate-slide-up
      `}
      role="alert"
    >
      <div className="flex-shrink-0">
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium break-words">
          {message}
        </p>
      </div>
      <button
        onClick={() => onRemove(id)}
        className="flex-shrink-0 ml-2 p-1 hover:bg-white/20 rounded-md transition-colors duration-200"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

/**
 * Notification container component
 * Displays all active notifications
 */
const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-24 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onRemove={removeNotification}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;
