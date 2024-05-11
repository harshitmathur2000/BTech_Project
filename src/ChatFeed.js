// ChatFeed.js
import React from 'react';
import styled from 'styled-components';

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${({ sender }) => (sender === 'bot' ? 'flex-start' : 'flex-end')};
  margin-bottom: 10px;
`;

const MessageBubble = styled.div`
  background-color: ${({ sender }) => (sender === 'bot' ? '#007bff' : '#4caf50')};
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  max-width: 70%;
`;

const MessageText = styled.span`
  word-wrap: break-word;
`;

const ChatFeed = ({ messages }) => {
  return (
    <MessageWrapper>
      {messages.map((message) => (
        <MessageContainer key={message.id} sender={message.sender}>
          <MessageBubble sender={message.sender}>
            <MessageText>{message.message}</MessageText>
          </MessageBubble>
        </MessageContainer>
      ))}
    </MessageWrapper>
  );
};

export default ChatFeed;
