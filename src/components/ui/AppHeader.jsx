import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Chat',
      path: '/main-chat-interface',
      icon: 'MessageCircle',
      tooltip: 'Main Chat Interface'
    },
    {
      label: 'History',
      path: '/chat-history-search',
      icon: 'Clock',
      tooltip: 'Chat History & Search'
    },
    {
      label: 'Settings',
      path: '/settings-preferences',
      icon: 'Settings',
      tooltip: 'Settings & Preferences'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Logo Section */}
        <div className="flex items-center">
          <button
            onClick={() => handleNavigation('/main-chat-interface')}
            className="flex items-center space-x-3 micro-interaction hover-opacity"
          >
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Icon name="Bot" size={20} color="var(--color-accent-foreground)" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground">KailasBot</span>
              <span className="text-xs text-muted-foreground -mt-1">AI Chat</span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Button
              key={item?.path}
              variant={isActivePath(item?.path) ? "default" : "ghost"}
              size="sm"
              onClick={() => handleNavigation(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={16}
              className="micro-interaction"
              title={item?.tooltip}
            >
              {item?.label}
            </Button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            iconName={isMenuOpen ? "X" : "Menu"}
            iconSize={20}
            className="micro-interaction"
            aria-label="Toggle menu"
          />
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems?.map((item) => (
              <Button
                key={item?.path}
                variant={isActivePath(item?.path) ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item?.path)}
                iconName={item?.icon}
                iconPosition="left"
                iconSize={16}
                fullWidth
                className="justify-start micro-interaction"
              >
                {item?.label}
              </Button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default AppHeader;