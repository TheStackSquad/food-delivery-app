import { useState, useCallback } from 'react';

const useFlashMessage = (duration = 5000) => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const showMessage = useCallback((text, type = 'success') => {
    setMessage(text);
    setMessageType(type);

    const timer = setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return [message, messageType, showMessage];
};

export default useFlashMessage;