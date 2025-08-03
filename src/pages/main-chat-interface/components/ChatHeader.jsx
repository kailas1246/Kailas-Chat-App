import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ 
  onClearChat, 
  onNewChat, 
  messageCount = 0, 
  conversationTitle = '' 
}) => {
  return (
    <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
          <Icon name="MessageSquare" size={16} color="var(--color-accent-foreground)" />
        </div>
        <div>
          <h1 className="text-lg font-medium text-foreground">
            {conversationTitle || 'Chat'}
          </h1>
          {messageCount > 0 && (
            <p className="text-sm text-muted-foreground">
              {messageCount} message{messageCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {messageCount > 0 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={onNewChat}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="Plus" size={16} />
              <span className="ml-2 hidden sm:inline">New Chat</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearChat}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="Trash2" size={16} />
              <span className="ml-2 hidden sm:inline">Clear</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;