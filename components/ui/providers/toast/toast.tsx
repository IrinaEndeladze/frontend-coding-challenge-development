'use client';
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
  const [toasts, setToasts] = useState<string>();

  const renderToast = useCallback((type: ToastType, message: string) => {
    setToasts(message);
    //  remove the toast after a delay
    setTimeout(() => {
      setToasts('');
    }, 2000);
  }, []);

  const removeToast = useCallback(() => {
    setToasts('');
  }, []);

  return (
    <ToastContext.Provider value={{ renderToast }}>
      {children}
      {toasts && (
        <div className='fixed top-0 right-0 p-4'>
          <div
            className={`toast selection ${toasts !== 'Success!' ? 'bg-bg_red text-white' : 'bg-bg_geen text-white'} mb-2 p-4 rounded shadow-lg`}
            onClick={() => removeToast()}>
            {toasts}
          </div>
        </div>
      )}
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
