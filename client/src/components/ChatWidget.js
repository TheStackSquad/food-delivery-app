import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutContext } from '../GlobalLayout/LayoutContext';
import devImage from '../asset/img/mandela.webp';
import '../css/chatWidget.css';
import { chatBoxAnimation, chatIconAnimation } from '../animations/chatMotion';
import useSocket from '../hooks/useSocket';

const ChatWidget = () => {
  // Local state
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  
  // Socket state
  const { isConnected, isTyping, sendMessage, startTyping, stopTyping } = useSocket();
  
  // Context
  const { 
    isChatIconVisible, 
    isChatOpen, 
    toggleChat, 
    updateInteraction 
  } = useContext(LayoutContext);



  // Effect to handle user interactions
  useEffect(() => {
    const handleUserActivity = () => {
      if (isChatIconVisible && !isChatOpen) {
        updateInteraction();
      }
    };

    // Add listeners for user activity
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
    };
  }, [isChatIconVisible, isChatOpen, updateInteraction]);

  // Message handling
  const handleSendMessage = () => {
    if (input.trim()) {
      sendMessage({ sender: 'You', text: input });
      setMessages(prev => [...prev, { sender: 'You', text: input }]);
      setInput('');
      updateInteraction();
    }
  };

  // Input handling
  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (e.target.value) {
      startTyping();
      updateInteraction();
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
             
           Chat icon  {...chatIconAnimation}
            onClick={() => {
              toggleChat();
              updateInteraction();
            }}
          >
            <FontAwesomeIcon icon={faEnvelope} className="envelope-icon" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat box */}
      <AnimatePresence mode="wait">
        {isChatOpen && (
          <motion.div className="chat-box"
            
          {...chatBoxAnimation}
          layoutId='chat'>
            <div className="chat-header">
              <img src={devImage} alt="Alyson Smith" className="profile-pic" />
              <div>
                <h4>Dev Kitchen</h4>
                <p>The Stack Squad</p>
              </div>
              <div className='user-profile'></div>

              <button 
                className="close" 
                onClick={() => {
                  toggleChat();
                  updateInteraction();
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
                  updateInteraction();
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