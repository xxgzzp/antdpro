import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
export const ToastContext = React.createContext();
export const ToastProvider = ({ children }) => {
  const [showToast, setShowToast] = useState(false);
  return (
    <ToastContext.Provider value={{ showToast, setShowToast }}>
      {showToast && <ToastContainer />}
      {children}
    </ToastContext.Provider>
  );
};
