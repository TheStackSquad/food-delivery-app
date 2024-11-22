// client/src/components/ChatWidget.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import devImage from '../asset/img/mandela.webp';
import '../css/chatWidget.css';
import { chatBoxAnimation, chatIconAnimation } from '../animations/chatMotion';
import useSocket from '../hooks/useSocket';
import { useSelector, useDispatch } from 'react-redux';
import { toggleChat, updateInteraction } from '../redux/actions/layoutActions'; // Redux actions

const ChatWidget = () => {
  // Local state
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Redux state
  const { isChatIconVisible, isChatOpen } = useSelector(state => state.layout);
  const dispatch = useDispatch();

  // Socket state
  const { isConnected, isTyping, sendMessage, startTyping, stopTyping } = useSocket();

  // Effect to handle user interactions
  useEffect(() => {
    const handleUserActivity = () => {
      if (isChatIconVisible && !isChatOpen) {
        dispatch(updateInteraction());
      }
    };

    // Add listeners for user activity
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
    };
  }, [isChatIconVisible, isChatOpen, dispatch]);

  // Message handling
  const handleSendMessage = () => {
    if (input.trim()) {
      sendMessage({ sender: 'You', text: input });
      setMessages(prev => [...prev, { sender: 'You', text: input }]);
      setInput('');
      dispatch(updateInteraction());
    }
  };

  // Input handling
  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (e.target.value) {
      startTyping();
      dispatch(updateInteraction());
    } else {
      stopTyping();
    }
  };

  // Early return if chat icon shouldn't be visible
  if (!isChatIconVisible) {
    return null;
  }

  return (
    <div className="chat-widget">
      {/* Chat icon */}
      <AnimatePresence mode="wait">
        {!isChatOpen && isChatIconVisible && (
          <motion.div
            className="chat-icon"
            {...chatIconAnimation}
            onClick={() => {
              dispatch(toggleChat());
              dispatch(updateInteraction());
            }}
          >
            <FontAwesomeIcon icon={faEnvelope} className="envelope-icon" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat box */}
      <AnimatePresence mode="wait">
        {isChatOpen && (
          <motion.div className="chat-box" {...chatBoxAnimation} layoutId="chat">
            <div className="chat-header">
              <img src={devImage} alt="Alyson Smith" className="profile-pic" />
              <div>
                <h4>Dev Kitchen</h4>
                <p>The Stack Squad</p>
              </div>
              <div className="user-profile"></div>

              <button 
                className="close" 
                onClick={() => {
                  dispatch(toggleChat());
                  dispatch(updateInteraction());
                }}
              >
                Close
              </button>
            </div>

            {/* Connection status */}
            {!isConnected && (
              <div className="chat-loading">
                <span>Connecting...</span>
              </div>
            )}

            {/* Messages */}
            <div className="chat-body">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`chat-message ${msg.sender === 'You' ? 'sent' : 'received'}`}
                >
                  <span>{msg.text}</span>
                </div>
              ))}
              {isTyping && (
                <div className="typing-indicator">
                  <span>John Doe is typing...</span>
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="chat-input">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onBlur={() => {
                  stopTyping();
                  dispatch(updateInteraction());
                }}
                placeholder="Type a message..."
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;
