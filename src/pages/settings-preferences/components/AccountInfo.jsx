import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { getUserJoinDate, getUserActivityInsights } from '../../../utils/userStatsCalculator';

const AccountInfo = ({ userStats, onSignOut }) => {
  const currentYear = new Date()?.getFullYear();
  const joinDate = getUserJoinDate();
  const activityInsights = getUserActivityInsights();
  
  const accountData = {
    userId: "user_kb_2024_8901",  
    joinDate: joinDate,
    totalChats: userStats?.totalChats || 0,
    totalMessages: userStats?.totalMessages || 0,
    averageResponseTime: userStats?.averageResponseTime || "N/A",
    lastActive: userStats?.lastActive || "Never",
    favoriteChats: userStats?.favoriteChats || 0,
    averageMessagesPerChat: userStats?.averageMessagesPerChat || 0
  };

  const securityFeatures = [
    { name: "End-to-End Encryption", status: "Active", icon: "Lock" },
    { name: "SSL/TLS Security", status: "Active", icon: "Shield" },
    { name: "Data Backup", status: "Active", icon: "Database" },
    { name: "Two-Factor Auth", status: "Available", icon: "Key" }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
          <Icon name="User" size={20} color="var(--color-secondary-foreground)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Account Information</h3>
          <p className="text-sm text-muted-foreground">Your account details and statistics</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Account Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="MessageCircle" size={16} color="var(--color-accent)" />
              <span className="text-sm font-medium text-foreground">Total Chats</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {accountData?.totalChats?.toLocaleString()}
            </p>
            {accountData?.totalChats > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                {accountData?.favoriteChats} favorites
              </p>
            )}
          </div>
          
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Send" size={16} color="var(--color-success)" />
              <span className="text-sm font-medium text-foreground">Messages</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {accountData?.totalMessages?.toLocaleString()}
            </p>
            {accountData?.totalMessages > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                ~{accountData?.averageMessagesPerChat} per chat
              </p>
            )}
          </div>
          
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Zap" size={16} color="var(--color-warning)" />
              <span className="text-sm font-medium text-foreground">Avg Response</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{accountData?.averageResponseTime}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {activityInsights?.engagementLevel} engagement
            </p>
          </div>
          
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} color="var(--color-accent)" />
              <span className="text-sm font-medium text-foreground">Last Active</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{accountData?.lastActive}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {activityInsights?.recentChats} chats this week
            </p>
          </div>
        </div>

        {/* Activity Insights - Only show if user has data */}
        {accountData?.totalChats > 0 && (
          <div className="bg-accent/5 rounded-lg p-4">
            <h4 className="text-md font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="TrendingUp" size={16} color="var(--color-accent)" />
              <span>Activity Insights</span>
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Recent Activity:</span>
                <p className="font-medium text-foreground">
                  {activityInsights?.recentChats} chats this week
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Monthly Growth:</span>
                <p className="font-medium text-foreground">
                  {activityInsights?.monthlyChats} new chats
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State Message */}
        {accountData?.totalChats === 0 && (
          <div className="bg-muted/50 rounded-lg p-6 text-center">
            <Icon name="MessageCircle" size={32} color="var(--color-muted-foreground)" className="mx-auto mb-3" />
            <h4 className="text-md font-medium text-foreground mb-2">No Chat History Yet</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Start a conversation to see your statistics here
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = '/main-chat-interface'}
              iconName="MessageSquare"
              iconPosition="left"
              iconSize={16}
            >
              Start Chatting
            </Button>
          </div>
        )}

        {/* Account Details */}
        <div className="border-t border-border pt-6">
          <h4 className="text-md font-medium text-foreground mb-4">Account Details</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">User ID</span>
              <span className="text-sm font-mono text-foreground">{accountData?.userId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Member Since</span>
              <span className="text-sm text-foreground">{accountData?.joinDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Plan Type</span>
              <span className="text-sm font-medium text-accent">Premium</span>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="border-t border-border pt-6">
          <h4 className="text-md font-medium text-foreground mb-4">Security Features</h4>
          <div className="space-y-3">
            {securityFeatures?.map((feature, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name={feature?.icon} size={16} color="var(--color-success)" />
                  <span className="text-sm text-foreground">{feature?.name}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  feature?.status === 'Active' ?'bg-success/10 text-success' :'bg-accent/10 text-accent'
                }`}>
                  {feature?.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* App Version & Copyright */}
        <div className="border-t border-border pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-foreground">KailasBot AI Chat</p>
              <p className="text-xs text-muted-foreground">Version 2.1.0 (Build 2024080301)</p>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} color="var(--color-success)" />
              <span className="text-xs text-success">Secure</span>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              © {currentYear} KailasBot. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Protected by enterprise-grade security & SSL encryption
            </p>
          </div>
        </div>

        {/* Sign Out Button */}
        <div className="border-t border-border pt-6">
          <Button
            variant="outline"
            onClick={onSignOut}
            iconName="LogOut"
            iconPosition="left"
            iconSize={16}
            fullWidth
            className="micro-interaction"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;