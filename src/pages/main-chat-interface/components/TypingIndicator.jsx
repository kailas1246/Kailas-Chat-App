import React from 'react';
import Icon from '../../../components/AppIcon';

const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-end space-x-2">
        {/* Bot Avatar */}
        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mb-1">
          <Icon name="Bot" size={16} color="var(--color-accent-foreground)" />
        </div>
        
        {/* Typing Bubble */}
        <div className="ml-2">
          <div className="bg-card text-card-foreground px-4 py-3 rounded-2xl rounded-bl-md border border-border message-elevation">
            <div className="flex items-center space-x-1">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-xs text-muted-foreground ml-2">KailasBot is typing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;