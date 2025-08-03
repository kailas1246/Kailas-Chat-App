import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import AppearanceSettings from './components/AppearanceSettings';
import ChatBehaviorSettings from './components/ChatBehaviorSettings';
import PrivacySettings from './components/PrivacySettings';
import NotificationSettings from './components/NotificationSettings';
import AccountInfo from './components/AccountInfo';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { calculateUserStats } from '../../utils/userStatsCalculator';

const SettingsPreferences = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('appearance');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [userStats, setUserStats] = useState(null);

  // Appearance Settings State
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [fontSize, setFontSize] = useState('medium');
  const [chatBubbleStyle, setChatBubbleStyle] = useState('rounded');

  // Chat Behavior Settings State
  const [autoScroll, setAutoScroll] = useState(true);
  const [typingIndicator, setTypingIndicator] = useState(true);
  const [responseSpeed, setResponseSpeed] = useState('fast');
  const [soundNotifications, setSoundNotifications] = useState(true);

  // Privacy Settings State
  const [chatHistoryRetention, setChatHistoryRetention] = useState('90days');
  const [dataCollection, setDataCollection] = useState(false);

  // Notification Settings State
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [notificationSound, setNotificationSound] = useState('subtle');
  const [quietHours, setQuietHours] = useState('22-08');

  const settingSections = [
    { id: 'appearance', label: 'Appearance', icon: 'Palette' },
    { id: 'behavior', label: 'Chat Behavior', icon: 'MessageSquare' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield' },
    { id: 'account', label: 'Account', icon: 'User' }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate real user statistics on component mount
  useEffect(() => {
    const stats = calculateUserStats();
    setUserStats(stats);
  }, [activeSection]); // Recalculate when switching to account section

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('kailasbot-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setIsDarkTheme(settings?.isDarkTheme ?? true);
      setFontSize(settings?.fontSize ?? 'medium');
      setChatBubbleStyle(settings?.chatBubbleStyle ?? 'rounded');
      setAutoScroll(settings?.autoScroll ?? true);
      setTypingIndicator(settings?.typingIndicator ?? true);
      setResponseSpeed(settings?.responseSpeed ?? 'fast');
      setSoundNotifications(settings?.soundNotifications ?? true);
      setChatHistoryRetention(settings?.chatHistoryRetention ?? '90days');
      setDataCollection(settings?.dataCollection ?? false);
      setEmailNotifications(settings?.emailNotifications ?? false);
      setPushNotifications(settings?.pushNotifications ?? true);
      setNotificationSound(settings?.notificationSound ?? 'subtle');
      setQuietHours(settings?.quietHours ?? '22-08');
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    const settings = {
      isDarkTheme,
      fontSize,
      chatBubbleStyle,
      autoScroll,
      typingIndicator,
      responseSpeed,
      soundNotifications,
      chatHistoryRetention,
      dataCollection,
      emailNotifications,
      pushNotifications,
      notificationSound,
      quietHours
    };
    localStorage.setItem('kailasbot-settings', JSON.stringify(settings));
  }, [
    isDarkTheme, fontSize, chatBubbleStyle, autoScroll, typingIndicator,
    responseSpeed, soundNotifications, chatHistoryRetention, dataCollection,
    emailNotifications, pushNotifications, notificationSound, quietHours
  ]);

  const handleClearAllHistory = () => {
    localStorage.removeItem('kailasbot-chat-history');
    // Recalculate stats after clearing history
    const updatedStats = calculateUserStats();
    setUserStats(updatedStats);
    alert('All chat history has been cleared successfully.');
  };

  const handleExportData = () => {
    const chatHistory = localStorage.getItem('kailasbot-chat-history') || '[]';
    const settings = localStorage.getItem('kailasbot-settings') || '{}';
    
    const exportData = {
      exportDate: new Date()?.toISOString(),
      chatHistory: JSON.parse(chatHistory),
      settings: JSON.parse(settings),
      userStats: userStats || calculateUserStats()
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `kailasbot-data-export-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/main-chat-interface');
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'appearance':
        return (
          <AppearanceSettings
            isDarkTheme={isDarkTheme}
            onThemeToggle={setIsDarkTheme}
            fontSize={fontSize}
            onFontSizeChange={setFontSize}
            chatBubbleStyle={chatBubbleStyle}
            onChatBubbleStyleChange={setChatBubbleStyle}
          />
        );
      case 'behavior':
        return (
          <ChatBehaviorSettings
            autoScroll={autoScroll}
            onAutoScrollChange={setAutoScroll}
            typingIndicator={typingIndicator}
            onTypingIndicatorChange={setTypingIndicator}
            responseSpeed={responseSpeed}
            onResponseSpeedChange={setResponseSpeed}
            soundNotifications={soundNotifications}
            onSoundNotificationsChange={setSoundNotifications}
          />
        );
      case 'notifications':
        return (
          <NotificationSettings
            emailNotifications={emailNotifications}
            onEmailNotificationsChange={setEmailNotifications}
            pushNotifications={pushNotifications}
            onPushNotificationsChange={setPushNotifications}
            notificationSound={notificationSound}
            onNotificationSoundChange={setNotificationSound}
            quietHours={quietHours}
            onQuietHoursChange={setQuietHours}
          />
        );
      case 'privacy':
        return (
          <PrivacySettings
            chatHistoryRetention={chatHistoryRetention}
            onChatHistoryRetentionChange={setChatHistoryRetention}
            dataCollection={dataCollection}
            onDataCollectionChange={setDataCollection}
            onClearAllHistory={handleClearAllHistory}
            onExportData={handleExportData}
          />
        );
      case 'account':
        return (
          <AccountInfo
            userStats={userStats}
            onSignOut={handleSignOut}
          />
        );
      default:
        return null;
    }
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <div className="pt-16">
          {/* Mobile Header */}
          <div className="bg-card border-b border-border p-4">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/main-chat-interface')}
                iconName="ArrowLeft"
                iconSize={20}
                className="micro-interaction"
              />
              <div>
                <h1 className="text-xl font-semibold text-foreground">Settings</h1>
                <p className="text-sm text-muted-foreground">Customize your experience</p>
              </div>
            </div>
          </div>

          {/* Mobile Section Selector */}
          <div className="bg-card border-b border-border p-4">
            <div className="grid grid-cols-2 gap-2">
              {settingSections?.map((section) => (
                <Button
                  key={section?.id}
                  variant={activeSection === section?.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveSection(section?.id)}
                  iconName={section?.icon}
                  iconPosition="left"
                  iconSize={16}
                  className="justify-start micro-interaction"
                >
                  {section?.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Mobile Content */}
          <div className="p-4">
            {renderActiveSection()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <div className="pt-16">
        {/* Desktop Header */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                <Icon name="Settings" size={24} color="var(--color-accent-foreground)" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Settings & Preferences</h1>
                <p className="text-muted-foreground mt-1">
                  Customize your KailasBot AI Chat experience
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="col-span-3">
              <div className="bg-card rounded-lg border border-border p-4 sticky top-24">
                <nav className="space-y-2">
                  {settingSections?.map((section) => (
                    <Button
                      key={section?.id}
                      variant={activeSection === section?.id ? "default" : "ghost"}
                      onClick={() => setActiveSection(section?.id)}
                      iconName={section?.icon}
                      iconPosition="left"
                      iconSize={18}
                      fullWidth
                      className="justify-start micro-interaction"
                    >
                      {section?.label}
                    </Button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-9">
              {renderActiveSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPreferences;