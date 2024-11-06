// src/GlobalLayout/LayoutContext.js
import React, { createContext, useState, useRef, useEffect } from 'react';

export const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  // Core state
  const [isOpen, setIsOpen] = useState(false);
  const [isChatIconVisible, setIsChatIconVisible] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const hideIconTimerRef = useRef(null);




  useEffect(() => {
    // Only start the hide timer if the chat is not open
    if (!isChatOpen) {
      if (hideIconTimerRef.current) {
        clearTimeout(hideIconTimerRef.current);
      }

      hideIconTimerRef.current = setTimeout(() => {
        console.log("Timer triggered - hiding chat icon");
        setIsChatIconVisible(false);
      }, 10000);
    }

    return () => {
      if (hideIconTimerRef.current) {
        clearTimeout(hideIconTimerRef.current);
      }
    };
  }, [isChatOpen, lastInteraction]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  console.log(toggleDropdown);
  

 const toggleChat = () => {
  console.log("toggleChat called - current states:", { isChatOpen, isChatIconVisible });
  setIsChatIconVisible(true); // Ensure icon is visible when toggling
  setIsChatOpen(prev => !prev);
  setLastInteraction(Date.now());
};
  

const updateInteraction = () => {
  setLastInteraction(Date.now());
  setIsChatIconVisible(true); // Ensure icon is visible on interaction
};

  const layoutState = {
    isOpen,
    isChatIconVisible,
    isChatOpen,
    lastInteraction,
    setIsOpen,
    setIsChatIconVisible,
    setIsChatOpen,
    toggleDropdown: () => setIsOpen(!isOpen),
    toggleChat,
    updateInteraction,
  };

  return (
    <LayoutContext.Provider value={layoutState}>
      {children}
    </LayoutContext.Provider>
  );
};