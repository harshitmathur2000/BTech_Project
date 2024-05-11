import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ChatFeed from './ChatFeed'; // Import the ChatFeed component we created

const FloatingChatIcon = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: #007bff;
  color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 320px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(100%)')};
  height: ${({ isOpen }) => (isOpen ? '400px' : '0')};
  overflow: hidden;
`;

const ChatHeader = styled.div`
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ToggleButton = styled.div`
  background-color: transparent;
  color: #fff;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 14px;
  cursor: pointer;
`;

const ChatInputWrapper = styled.div`
  padding: 10px;
  border-top: 1px solid #ddd;
`;

const ChatInput = styled.input`
  width: calc(100% - 20px);
  border: none;
  outline: none;
  padding: 8px;
  border-radius: 5px;
  font-size: 14px;
`;

const ChatFeedWrapper = styled.div`
  height: calc(100% - 100px);
  overflow-y: auto;
  padding: 10px;
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const chatFeedRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Add welcome message when the chatbot is opened
      setMessages([
        { id: 0, message: 'Welcome! How can I assist you today?', sender: 'bot' },
        { id: 1, message: <ButtonWrapper>
                            <button onClick={() => handleInteraction('reportUser')}>Report a user</button><br />
                            <button onClick={() => handleInteraction('reportIssue')}>Report an issue</button><br />
                            <button onClick={() => handleInteraction('needHelp')}>Need help</button>
                          </ButtonWrapper>, sender: 'bot' }
      ]);
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleInteraction = (interactionType) => {
    let message = '';
    switch (interactionType) {
      case 'reportUser':
        message = 'Please provide details about the user you want to report.';
        break;
      case 'reportIssue':
        message = 'What issue are you facing? Please describe it.';
        break;
      case 'needHelp':
        message = 'How can I assist you?';
        break;
      default:
        break;
    }
    setMessages([
      ...messages,
      { id: messages.length + 1, message, sender: 'bot' }
    ]);
  };

  const handleNewUserMessage = (newMessage) => {
    // For now, let's just echo the user's message
    setMessages([
      ...messages,
      { id: messages.length + 1, message: newMessage, sender: 'user' },
      { id: messages.length + 2, message: `You said: ${newMessage}`, sender: 'bot' },
    ]);
    setInputValue(''); // Clear input value after sending message
  };

  return (
    <>
      <FloatingChatIcon onClick={handleToggle}>
        <i className={isOpen ? "fas fa-times" : "fas fa-comment"}></i>
      </FloatingChatIcon>
      <ChatbotContainer isOpen={isOpen}>
        <ChatHeader>
          Chatbot
          <ToggleButton onClick={handleToggle}>
            <i className="fas fa-times"></i>
          </ToggleButton>
        </ChatHeader>
        <ChatFeedWrapper ref={chatFeedRef}>
          <ChatFeed messages={messages} />
        </ChatFeedWrapper>
        <ChatInputWrapper>
          <ChatInput 
            type="text" 
            placeholder="Type a message..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleNewUserMessage(inputValue);
              }
            }} 
          />
        </ChatInputWrapper>
      </ChatbotContainer>
    </>
  );
};

export default ChatbotComponent;
