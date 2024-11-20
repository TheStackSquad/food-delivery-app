import React, { useEffect } from 'react';
import '../../css/Alert.css';

const Alert = ({ 
  isVisible, 
  type = 'info', 
  message = '', 
  userName = '', 
  onClose, 
  autoCloseTime = 5000 
}) => {
  useEffect(() => {
    let timer;
    if (isVisible && autoCloseTime > 0) {
      timer = setTimeout(() => {
        onClose();
      }, autoCloseTime);
    }
    return () => clearTimeout(timer);
  }, [isVisible, autoCloseTime, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`alert-overlay ${type}`}>
      <div className={`alert-container ${type}`}>
        {userName && <p className="alert-username">{userName}</p>}
        <p className="alert-message">{message}</p>
        <button className="alert-close" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default Alert;