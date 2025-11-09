
// ==================== TOAST NOTIFICATION COMPONENT ====================

import { useState, useEffect } from "react";
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';


export function Toast({ type = 'info', message, onClose, autoClose = true, duration = 5000 }) {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) {
          setTimeout(onClose, 300);
        }
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);
  
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      setTimeout(onClose, 300);
    }
  };
  
  const types = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconColor: 'text-green-600',
      textColor: 'text-green-900'
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      iconColor: 'text-red-600',
      textColor: 'text-red-900'
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      iconColor: 'text-yellow-600',
      textColor: 'text-yellow-900'
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-900'
    }
  };
  
  const config = types[type];
  const Icon = config.icon;
  
  if (!isVisible) return null;
  
  return (
    <div 
      className={`${config.bgColor} ${config.borderColor} border rounded-lg shadow-lg p-4 flex items-start space-x-3 min-w-[320px] max-w-md transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
    >
      <Icon className={`${config.iconColor} w-5 h-5 flex-shrink-0 mt-0.5`} />
      <div className="flex-1">
        <p className={`${config.textColor} text-sm font-medium`}>{message}</p>
      </div>
      <button 
        onClick={handleClose}
        className={`${config.iconColor} hover:opacity-70 transition-opacity flex-shrink-0`}
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

// Toast Container (for multiple toasts)
export function ToastContainer({ toasts = [], removeToast }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

