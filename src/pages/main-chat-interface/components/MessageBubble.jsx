import React from 'react';
import Icon from '../../../components/AppIcon';

const MessageBubble = ({ message, isUser, onCopy }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(message?.content);
    onCopy && onCopy();
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
        {/* Avatar */}
        {!isUser && (
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mb-1">
            <Icon name="Bot" size={16} color="var(--color-accent-foreground)" />
          </div>
        )}
        
        {/* Message Content */}
        <div className={`group relative ${isUser ? 'mr-2' : 'ml-2'}`}>
          <div
            className={`px-4 py-3 rounded-2xl message-elevation micro-interaction ${
              isUser
                ? 'bg-primary text-primary-foreground rounded-br-md'
                : 'bg-card text-card-foreground rounded-bl-md border border-border'
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {message?.content}
            </p>
            
            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className={`absolute -top-2 ${isUser ? '-left-8' : '-right-8'} opacity-0 group-hover:opacity-100 micro-interaction bg-muted hover:bg-muted/80 p-1.5 rounded-full`}
              title="Copy message"
            >
              <Icon name="Copy" size={12} color="var(--color-muted-foreground)" />
            </button>
          </div>
          
          {/* Timestamp and Status */}
          <div className={`flex items-center mt-1 space-x-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <span className="text-xs text-muted-foreground">
              {formatTime(message?.timestamp)}
            </span>
            {isUser && (
              <Icon 
                name={message?.status === 'read' ? 'CheckCheck' : 'Check'} 
                size={12} 
                color={message?.status === 'read' ? 'var(--color-accent)' : 'var(--color-muted-foreground)'} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;