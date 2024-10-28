import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import devImage from '../asset/img/mandela.webp';
import '../css/chatWidget.css';
import { chatBoxAnimation } from '../animations/chatMotion';
import useSocket from '../hooks/useSocket';

const ChatWidget = ({ isOpen, setIsChatOpen, isChatIconVisible }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { isConnected, isTyping, sendMessage, startTyping, stopTyping } = useSocket();
 // const hideIconTimerRef = useRef(null); // Use useRef to store timer ID


  const toggleChat = () => {
    if (typeof setIsChatOpen === 'function') {
      setIsChatOpen(!isOpen);
    }
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      sendMessage({ sender: 'You', text: input });
      setMessages([...messages, { sender: 'You', text: input }]);
      setInput('');
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (e.target.value) startTyping();
    else stopTyping();
  };

  return (
    <div className="chat-widget">
      {/*{isOpen || (  )} */}
      <div
        className={`chat-icon ${isOpen ? 'chat-icon-open' : ''}`}
        style={{ display: isChatIconVisible ? 'flex' : 'none' }} 
        onClick={toggleChat}
      >
        <FontAwesomeIcon icon={faEnvelope} className="envelope-icon" />
      </div>
   
      <AnimatePresence>
        {isOpen && (
          <motion.div className="chat-box" {...chatBoxAnimation}>
            <div className="chat-header">
              <img src={devImage} alt="Alyson Smith" className="profile-pic" />
              <div>
                <h4>Dev Kitchen</h4>
                <p>The Stack Squad</p>
              </div>
              <button className="close" onClick={toggleChat}>Close</button>
            </div>
            {!isConnected && <div className="chat-loading"><span>Connecting...</span></div>}
            <div className="chat-body">
              {messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.sender === 'You' ? 'sent' : 'received'}`}>
                  <span>{msg.text}</span>
                </div>
              ))}
              {isTyping && <div className="typing-indicator"><span>John Doe is typing...</span></div>}
            </div>
            <div className="chat-input">
              <input type="text" value={input} onChange={handleInputChange} onBlur={stopTyping} placeholder="Type a message..." />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;