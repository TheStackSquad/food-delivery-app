// src/GlobalLayout/Layout.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDropdown, toggleChat, updateInteraction } from '../redux/actions/layoutActions';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { isOpen, isChatIconVisible, isChatOpen, lastInteraction } = useSelector((state) => state.layout);


  useEffect(() => {
    // Set up the timer to hide the chat icon if the chat is closed
    let hideIconTimer;

    if (!isChatOpen) {
      hideIconTimer = setTimeout(() => {
        dispatch({ type: 'TOGGLE_CHAT' }); // Manually trigger the hide of the chat icon
      }, 10000); // 10 seconds

      return () => clearTimeout(hideIconTimer);
    }

  }, [isChatOpen, lastInteraction, dispatch]);

  const handleDropdownToggle = () => {
    dispatch(toggleDropdown());
  };

  const handleChatToggle = () => {
    dispatch(toggleChat());
  };

  const handleInteractionUpdate = () => {
    dispatch(updateInteraction());
  };

  return (
    <div>
      {/* Other layout components */}
      {children}
    </div>
  );
};

export default Layout;
