import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const NotificationSettings = ({ 
  emailNotifications, 
  onEmailNotificationsChange,
  pushNotifications,
  onPushNotificationsChange,
  notificationSound,
  onNotificationSoundChange,
  quietHours,
  onQuietHoursChange
}) => {
  const soundOptions = [
    { value: 'none', label: 'No Sound' },
    { value: 'subtle', label: 'Subtle Chime' },
    { value: 'notification', label: 'Standard Notification' },
    { value: 'alert', label: 'Alert Tone' }
  ];

  const quietHoursOptions = [
    { value: 'disabled', label: 'Disabled' },
    { value: '22-08', label: '10 PM - 8 AM' },
    { value: '23-07', label: '11 PM - 7 AM' },
    { value: '00-06', label: '12 AM - 6 AM' },
    { value: 'custom', label: 'Custom Hours' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
          <Icon name="Bell" size={20} color="var(--color-accent-foreground)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
          <p className="text-sm text-muted-foreground">Manage how you receive alerts and updates</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Push Notifications */}
        <div>
          <Checkbox
            label="Push notifications"
            description="Receive instant notifications for new messages"
            checked={pushNotifications}
            onChange={(e) => onPushNotificationsChange(e?.target?.checked)}
            className="mb-0"
          />
        </div>

        {/* Email Notifications */}
        <div>
          <Checkbox
            label="Email notifications"
            description="Get email summaries of important conversations"
            checked={emailNotifications}
            onChange={(e) => onEmailNotificationsChange(e?.target?.checked)}
            className="mb-0"
          />
        </div>

        {/* Notification Sound */}
        <div>
          <Select
            label="Notification Sound"
            description="Choose the sound for incoming messages"
            options={soundOptions}
            value={notificationSound}
            onChange={onNotificationSoundChange}
            className="mb-0"
          />
        </div>

        {/* Quiet Hours */}
        <div>
          <Select
            label="Quiet Hours"
            description="Disable notifications during specific hours"
            options={quietHoursOptions}
            value={quietHours}
            onChange={onQuietHoursChange}
            className="mb-0"
          />
        </div>

        {/* Notification Preview */}
        <div className="border border-border rounded-lg p-4 bg-muted">
          <p className="text-xs text-muted-foreground mb-3">Notification Status</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon 
                  name="Smartphone" 
                  size={16} 
                  color={pushNotifications ? "var(--color-success)" : "var(--color-muted-foreground)"} 
                />
                <span className="text-sm text-foreground">Push Notifications</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                pushNotifications 
                  ? 'bg-success/10 text-success' :'bg-muted-foreground/10 text-muted-foreground'
              }`}>
                {pushNotifications ? 'Enabled' : 'Disabled'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon 
                  name="Mail" 
                  size={16} 
                  color={emailNotifications ? "var(--color-success)" : "var(--color-muted-foreground)"} 
                />
                <span className="text-sm text-foreground">Email Alerts</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                emailNotifications 
                  ? 'bg-success/10 text-success' :'bg-muted-foreground/10 text-muted-foreground'
              }`}>
                {emailNotifications ? 'Enabled' : 'Disabled'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon 
                  name="Volume2" 
                  size={16} 
                  color={notificationSound !== 'none' ? "var(--color-success)" : "var(--color-muted-foreground)"} 
                />
                <span className="text-sm text-foreground">Sound</span>
              </div>
              <span className="text-xs text-muted-foreground capitalize">
                {notificationSound === 'none' ? 'Silent' : notificationSound}
              </span>
            </div>

            {quietHours !== 'disabled' && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Moon" size={16} color="var(--color-accent)" />
                  <span className="text-sm text-foreground">Quiet Hours</span>
                </div>
                <span className="text-xs text-accent">
                  {quietHours === 'custom' ? 'Custom' : quietHours?.replace('-', ' - ')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;