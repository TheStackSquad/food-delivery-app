// src/hooks/useSocket.js

// eslint-disable-next-line
import { useEffect, useState } from 'react';
import io from 'socket.io-client'; // Import Socket.IO

const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Connect to the Socket.IO server
    const newSocket = io('http://localhost:5000', { transports: ['websocket'] });
    setSocket(newSocket);

    // Set connection state
    newSocket.on('connect', () => {
      setIsConnected(true);
    });

    // Listen for typing event
    newSocket.on('typing', () => {
      setIsTyping(true);
    });

    // Listen for typing stopped event
    newSocket.on('stopTyping', () => {
      setIsTyping(false);
    });

    // Handle disconnection
    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    // Cleanup on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Function to emit a new message
  const sendMessage = (message) => {
    if (socket) {
      socket.emit('newMessage', message);
    }
  };

  // Function to emit typing event
  const startTyping = () => {
    if (socket) {
      socket.emit('typing');
    }
  };

  // Function to emit stop typing event
  const stopTyping = () => {
    if (socket) {
      socket.emit('stopTyping');
    }
  };

  return { isConnected, isTyping, sendMessage, startTyping, stopTyping };
};

export default useSocket;
