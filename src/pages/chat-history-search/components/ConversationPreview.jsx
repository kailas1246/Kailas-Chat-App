import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationPreview = ({ conversation, onClose, onOpenFullChat }) => {
  if (!conversation) return null;

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
            <Icon name="Bot" size={16} color="var(--color-accent-foreground)" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">{conversation?.title}</h3>
            <p className="text-xs text-muted-foreground">
              {formatDate(conversation?.lastMessage)}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenFullChat(conversation)}
            iconName="ExternalLink"
            iconPosition="left"
            iconSize={14}
          >
            Open Chat
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={16}
          />
        </div>
      </div>
      {/* Messages Preview */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation?.messages?.slice(0, 10)?.map((message, index) => (
          <div
            key={index}
            className={`flex ${message?.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 ${
                message?.sender === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
              }`}
            >
              <p className="text-sm">{message?.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {new Date(message.timestamp)?.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        ))}
        
        {conversation?.messages?.length > 10 && (
          <div className="text-center py-2">
            <p className="text-xs text-muted-foreground">
              +{conversation?.messages?.length - 10} more messages
            </p>
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{conversation?.messageCount} total messages</span>
          {conversation?.tags && conversation?.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {conversation?.tags?.slice(0, 2)?.map((tag, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationPreview;