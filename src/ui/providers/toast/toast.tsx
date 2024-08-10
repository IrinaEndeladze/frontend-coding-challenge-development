import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ToastType } from './types'; // Adjust the import according to your project structure

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastProps {
  renderToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastProps | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const renderToast = useCallback((type: ToastType, message: string) => {
    // Check if a toast with the same message already exists
    const existingToast = toasts.find(toast => toast.message === message);

    if (!existingToast) {
      const id = Date.now().toString();
      setToasts(prevToasts => [...prevToasts, { id, type, message }]);
      //  remove the toast after a delay
      setTimeout(() => {
        setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
      }, 3000);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ renderToast }}>
      {children}
      <div className='fixed top-0 right-0 p-4'>
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`toast selection ${toast.type === 'error' ? 'bg-bg_red text-white' : 'bg-bg_geen text-white'} mb-2 p-4 rounded shadow-lg`}
            onClick={() => removeToast(toast.id)}>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};
