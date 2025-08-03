import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const MessageInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !disabled) {
      onSendMessage(message?.trim());
      setMessage('');
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e?.target?.value);
    
    // Auto-resize textarea
    if (textareaRef?.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef?.current?.scrollHeight, 120) + 'px';
    }
  };

  useEffect(() => {
    if (textareaRef?.current) {
      textareaRef?.current?.focus();
    }
  }, []);

  return (
    <div className="border-t border-border bg-background p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            disabled={disabled}
            rows={1}
            className="w-full resize-none bg-input border border-border rounded-2xl px-4 py-3 pr-12 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent micro-interaction disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
          
          {/* Character count for long messages */}
          {message?.length > 100 && (
            <div className="absolute -top-6 right-0 text-xs text-muted-foreground">
              {message?.length}/1000
            </div>
          )}
        </div>

        {/* Send Button */}
        <Button
          type="submit"
          variant="default"
          size="icon"
          disabled={!message?.trim() || disabled}
          className="h-12 w-12 rounded-2xl micro-interaction"
          title="Send message"
        >
          <Icon name="Send" size={18} />
        </Button>
      </form>
      {/* Quick Actions */}
      <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span>Press Enter to send, Shift+Enter for new line</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={12} />
          <span>Fast AI responses</span>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;