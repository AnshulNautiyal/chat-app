import { useState, useRef, useEffect } from 'react';
import { Send, User } from 'lucide-react';

const ChatWindow = ({ friend, messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus input when friend changes
    if (friend && inputRef.current) {
      inputRef.current.focus();
    }
  }, [friend]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() && friend) {
      onSendMessage(friend.id, newMessage.trim());
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (!friend) {
    return (
      <div className="chat-window">
        <div className="empty-state">
          <div className="empty-content">
            <div className="empty-avatar">
            <User className="w-8 h-8 text-gray-400" />
          </div>
            <h3 className="empty-title">
            Select a conversation
          </h3>
            <p className="empty-subtitle">
            Choose a friend from the sidebar to start messaging
          </p>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-window">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="chat-header-content">
          <div className={`chat-avatar ${friend.color.replace('bg-', '').replace('-500', '')}`}>
            <User className="w-5 h-5" />
          </div>
          <div className="chat-info">
            <h3>{friend.name}</h3>
            <p className="chat-status">
              {friend.online ? 'Active now' : 'Last seen recently'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="no-messages-state">
            <p className="no-messages-text">
              No messages yet. Start the conversation!
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}
            >
              <div
                className={`message-bubble ${message.sender === 'me' ? 'sent' : 'received'}`}
              >
                <p className="message-text">{message.text}</p>
                <p className={`message-time ${message.sender === 'me' ? 'sent' : 'received'}`}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="message-input-container">
        <form onSubmit={handleSubmit} className="message-form">
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message ${friend.name}...`}
            className="message-input"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="send-button"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;