import React from 'react';
import Icon from '../../../components/AppIcon';

import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const AppearanceSettings = ({ 
  isDarkTheme, 
  onThemeToggle, 
  fontSize, 
  onFontSizeChange, 
  chatBubbleStyle, 
  onChatBubbleStyleChange 
}) => {
  const fontSizeOptions = [
    { value: 'small', label: 'Small (14px)' },
    { value: 'medium', label: 'Medium (16px)' },
    { value: 'large', label: 'Large (18px)' },
    { value: 'extra-large', label: 'Extra Large (20px)' }
  ];

  const bubbleStyleOptions = [
    { value: 'rounded', label: 'Rounded Corners' },
    { value: 'sharp', label: 'Sharp Corners' },
    { value: 'minimal', label: 'Minimal Style' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
          <Icon name="Palette" size={20} color="var(--color-accent-foreground)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Appearance</h3>
          <p className="text-sm text-muted-foreground">Customize your visual experience</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Dark Theme Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Checkbox
              label="Dark Theme"
              description="Enable premium dark mode interface"
              checked={isDarkTheme}
              onChange={(e) => onThemeToggle(e?.target?.checked)}
              className="mb-0"
            />
          </div>
          <div className="ml-4">
            <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
              isDarkTheme ? 'bg-accent' : 'bg-border'
            }`}>
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 mt-0.5 ${
                isDarkTheme ? 'translate-x-6 ml-1' : 'translate-x-1'
              }`} />
            </div>
          </div>
        </div>

        {/* Font Size Selection */}
        <div>
          <Select
            label="Font Size"
            description="Adjust text size for better readability"
            options={fontSizeOptions}
            value={fontSize}
            onChange={onFontSizeChange}
            className="mb-0"
          />
        </div>

        {/* Chat Bubble Style */}
        <div>
          <Select
            label="Chat Bubble Style"
            description="Choose your preferred message bubble appearance"
            options={bubbleStyleOptions}
            value={chatBubbleStyle}
            onChange={onChatBubbleStyleChange}
            className="mb-0"
          />
        </div>

        {/* Preview Section */}
        <div className="border border-border rounded-lg p-4 bg-muted">
          <p className="text-xs text-muted-foreground mb-3">Preview</p>
          <div className="space-y-3">
            <div className="flex justify-end">
              <div className={`max-w-xs px-4 py-2 bg-accent text-accent-foreground ${
                chatBubbleStyle === 'rounded' ? 'rounded-2xl' : 
                chatBubbleStyle === 'sharp' ? 'rounded-none' : 'rounded-md'
              } ${fontSize === 'small' ? 'text-sm' : 
                fontSize === 'large' ? 'text-lg' : 
                fontSize === 'extra-large' ? 'text-xl' : 'text-base'}`}>
                Hello! How can I help you today?
              </div>
            </div>
            <div className="flex justify-start">
              <div className={`max-w-xs px-4 py-2 bg-card border border-border text-foreground ${
                chatBubbleStyle === 'rounded' ? 'rounded-2xl' : 
                chatBubbleStyle === 'sharp' ? 'rounded-none' : 'rounded-md'
              } ${fontSize === 'small' ? 'text-sm' : 
                fontSize === 'large' ? 'text-lg' : 
                fontSize === 'extra-large' ? 'text-xl' : 'text-base'}`}>
                I need help with my project
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;