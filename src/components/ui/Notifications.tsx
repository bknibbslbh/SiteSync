import React from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';
import { NotificationType } from '../../types';

const Notifications: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  // If there are no notifications, don't render anything
  if (notifications.length === 0) {
    return null;
  }

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-success-500" size={20} />;
      case 'error':
        return <AlertCircle className="text-error-500" size={20} />;
      case 'warning':
        return <AlertTriangle className="text-warning-500" size={20} />;
      case 'info':
        return <Info className="text-primary-500" size={20} />;
      default:
        return <Info className="text-primary-500" size={20} />;
    }
  };

  const getBgColor = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'bg-success-50 border-success-500';
      case 'error':
        return 'bg-error-50 border-error-500';
      case 'warning':
        return 'bg-warning-50 border-warning-500';
      case 'info':
        return 'bg-primary-50 border-primary-500';
      default:
        return 'bg-primary-50 border-primary-500';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 w-80">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`rounded-md border-l-4 shadow-md ${getBgColor(notification.type)} animate-slide-in`}
        >
          <div className="p-4 flex items-start">
            <div className="flex-shrink-0 mr-3">
              {getIcon(notification.type)}
            </div>
            <div className="flex-1 mr-2">
              <p className="text-sm text-gray-800">{notification.message}</p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;