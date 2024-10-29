import React, { createContext, useState, useRef, useEffect } from 'react';

export const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  // Core state
  const [isOpen, setIsOpen] = useState(false);              // Dropdown state
  const [isChatIconVisible, setIsChatIconVisible] = useState(false);  // Chat icon visibility
  const [isChatOpen, setIsChatOpen] = useState(false);      // Chat window state
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const hideIconTimerRef = useRef(null);

  // Handle inactivity timer
  useEffect(() => {
    // Only start timer if chat icon is visible but chat is not open
    if (isChatIconVisible && !isChatOpen) {
      if (hideIconTimerRef.current) {
        clearTimeout(hideIconTimerRef.current);
      }

      hideIconTimerRef.current = setTimeout(() => {
        setIsChatIconVisible(false);
      }, 10000); // 10 seconds inactivity timer
    }

    // Cleanup timer if chat is opened or icon is hidden
    return () => {
      if (hideIconTimerRef.current) {
        clearTimeout(hideIconTimerRef.current);
      }
    };
  }, [isChatIconVisible, isChatOpen, lastInteraction]);

  // Dropdown toggle
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Chat toggle with interaction tracking
  const toggleChat = () => {
    setLastInteraction(Date.now());
    setIsChatOpen(prev => !prev);
  };

  // Update last interaction time
  const updateInteraction = () => {
    setLastInteraction(Date.now());
  };

  const layoutState = {
    // State
    isOpen,
    isChatIconVisible,
    isChatOpen,
    lastInteraction,
    // Setters
    setIsOpen,
    setIsChatIconVisible,
    setIsChatOpen,
    // Actions
    toggleDropdown,
    toggleChat,
    updateInteraction,
  };

  return (
    <LayoutContext.Provider value={layoutState}>
      {children}
    </LayoutContext.Provider>
  );
};