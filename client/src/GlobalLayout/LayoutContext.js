// src/GlobalLayout/LayoutContext.js
import React, { createContext, useState, useRef, useEffect } from 'react';

// Create the context to store layout state globally
export const LayoutContext = createContext();

// LayoutProvider to manage layout states
export const LayoutProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false); // Dropdown open state
  const [isChatIconVisible, setIsChatIconVisible] = useState(false); // Chat icon visibility
  const [isChatOpen, setIsChatOpen] = useState(false); // Chat widget open state
  const hideIconTimerRef = useRef(null); // Timer reference to hide icon after delay

  // Manage chat icon visibility timer
  useEffect(() => {
    if (isChatIconVisible && !isChatOpen) {
      hideIconTimerRef.current = setTimeout(() => {
        setIsChatIconVisible(false);
      }, 10000);
    }
    return () => clearTimeout(hideIconTimerRef.current);
  }, [isChatIconVisible, isChatOpen]);

  // Toggle dropdown open state
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Layout state to be provided globally
  const layoutState = {
    isOpen,
    setIsOpen,
    isChatIconVisible,
    setIsChatIconVisible,
    isChatOpen,
    setIsChatOpen,
    toggleDropdown,
  };

  return (
    <LayoutContext.Provider value={layoutState}>
      {children}
    </LayoutContext.Provider>
  );
};
