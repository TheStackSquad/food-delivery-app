// src/GlobalLayout/LayoutContext.js
import React, { createContext, useState, useRef, useEffect } from 'react';

export const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  // Core state
  const [isOpen, setIsOpen] = useState(false);
  const [isChatIconVisible, setIsChatIconVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const hideIconTimerRef = useRef(null);

  useEffect(() => {
    if (isChatIconVisible && !isChatOpen) {
      if (hideIconTimerRef.current) {
        clearTimeout(hideIconTimerRef.current);
      }

      hideIconTimerRef.current = setTimeout(() => {
        setIsChatIconVisible(false);
      }, 10000);
    }

    return () => {
      if (hideIconTimerRef.current) {
        clearTimeout(hideIconTimerRef.current);
      }
    };
  }, [isChatIconVisible, isChatOpen, lastInteraction]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const toggleChat = () => {
    setLastInteraction(Date.now());
    setIsChatOpen(prev => !prev);
  };

  const updateInteraction = () => {
    setLastInteraction(Date.now());
  };

  const layoutState = {
    isOpen,
    isChatIconVisible,
    isChatOpen,
    lastInteraction,
    setIsOpen,
    setIsChatIconVisible,
    setIsChatOpen,
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