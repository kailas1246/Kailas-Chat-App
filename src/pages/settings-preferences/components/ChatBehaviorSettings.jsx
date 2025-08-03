import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const ChatBehaviorSettings = ({ 
  autoScroll, 
  onAutoScrollChange, 
  typingIndicator, 
  onTypingIndicatorChange,
  responseSpeed,
  onResponseSpeedChange,
  soundNotifications,
  onSoundNotificationsChange
}) => {
  const responseSpeedOptions = [
    { value: 'instant', label: 'Instant (0ms delay)' },
    { value: 'fast', label: 'Fast (500ms delay)' },
    { value: 'normal', label: 'Normal (1s delay)' },
    { value: 'slow', label: 'Slow (2s delay)' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
          <Icon name="MessageSquare" size={20} color="var(--color-success-foreground)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Chat Behavior</h3>
          <p className="text-sm text-muted-foreground">Configure chat interaction preferences</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Auto Scroll */}
        <div>
          <Checkbox
            label="Auto-scroll to latest messages"
            description="Automatically scroll to new messages as they arrive"
            checked={autoScroll}
            onChange={(e) => onAutoScrollChange(e?.target?.checked)}
            className="mb-0"
          />
        </div>

        {/* Typing Indicator */}
        <div>
          <Checkbox
            label="Show typing indicator"
            description="Display animated dots when AI is generating response"
            checked={typingIndicator}
            onChange={(e) => onTypingIndicatorChange(e?.target?.checked)}
            className="mb-0"
          />
        </div>

        {/* Sound Notifications */}
        <div>
          <Checkbox
            label="Sound notifications"
            description="Play sound when receiving new messages"
            checked={soundNotifications}
            onChange={(e) => onSoundNotificationsChange(e?.target?.checked)}
            className="mb-0"
          />
        </div>

        {/* Response Speed */}
        <div>
          <Select
            label="Response Speed"
            description="Control AI response timing for better user experience"
            options={responseSpeedOptions}
            value={responseSpeed}
            onChange={onResponseSpeedChange}
            className="mb-0"
          />
        </div>

        {/* Behavior Preview */}
        <div className="border border-border rounded-lg p-4 bg-muted">
          <p className="text-xs text-muted-foreground mb-3">Current Settings</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Icon 
                name={autoScroll ? "Check" : "X"} 
                size={16} 
                color={autoScroll ? "var(--color-success)" : "var(--color-error)"} 
              />
              <span className="text-foreground">Auto-scroll</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon 
                name={typingIndicator ? "Check" : "X"} 
                size={16} 
                color={typingIndicator ? "var(--color-success)" : "var(--color-error)"} 
              />
              <span className="text-foreground">Typing indicator</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon 
                name={soundNotifications ? "Check" : "X"} 
                size={16} 
                color={soundNotifications ? "var(--color-success)" : "var(--color-error)"} 
              />
              <span className="text-foreground">Sound alerts</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={16} color="var(--color-accent)" />
              <span className="text-foreground capitalize">{responseSpeed} speed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBehaviorSettings;