import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const PrivacySettings = ({ 
  chatHistoryRetention, 
  onChatHistoryRetentionChange,
  dataCollection,
  onDataCollectionChange,
  onClearAllHistory,
  onExportData
}) => {
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);

  const retentionOptions = [
    { value: '7days', label: '7 Days' },
    { value: '30days', label: '30 Days' },
    { value: '90days', label: '90 Days' },
    { value: '1year', label: '1 Year' },
    { value: 'forever', label: 'Keep Forever' }
  ];

  const handleClearHistory = () => {
    if (showClearConfirmation) {
      onClearAllHistory();
      setShowClearConfirmation(false);
    } else {
      setShowClearConfirmation(true);
      setTimeout(() => setShowClearConfirmation(false), 5000);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center">
          <Icon name="Shield" size={20} color="var(--color-warning-foreground)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Privacy & Data</h3>
          <p className="text-sm text-muted-foreground">Manage your data and privacy settings</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Chat History Retention */}
        <div>
          <Select
            label="Chat History Retention"
            description="How long to keep your chat conversations"
            options={retentionOptions}
            value={chatHistoryRetention}
            onChange={onChatHistoryRetentionChange}
            className="mb-0"
          />
        </div>

        {/* Data Collection */}
        <div>
          <Checkbox
            label="Allow usage analytics"
            description="Help improve KailasBot by sharing anonymous usage data"
            checked={dataCollection}
            onChange={(e) => onDataCollectionChange(e?.target?.checked)}
            className="mb-0"
          />
        </div>

        {/* Data Management Actions */}
        <div className="border-t border-border pt-6">
          <h4 className="text-md font-medium text-foreground mb-4">Data Management</h4>
          
          <div className="space-y-4">
            {/* Export Data */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Export Chat Data</p>
                <p className="text-xs text-muted-foreground">Download all your conversations as JSON</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onExportData}
                iconName="Download"
                iconPosition="left"
                iconSize={16}
                className="micro-interaction"
              >
                Export
              </Button>
            </div>

            {/* Clear All History */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Clear All Chat History</p>
                <p className="text-xs text-muted-foreground">Permanently delete all conversations</p>
              </div>
              <Button
                variant={showClearConfirmation ? "destructive" : "outline"}
                size="sm"
                onClick={handleClearHistory}
                iconName={showClearConfirmation ? "AlertTriangle" : "Trash2"}
                iconPosition="left"
                iconSize={16}
                className="micro-interaction"
              >
                {showClearConfirmation ? "Confirm Delete" : "Clear All"}
              </Button>
            </div>

            {showClearConfirmation && (
              <div className="bg-error/10 border border-error/20 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertTriangle" size={16} color="var(--color-error)" className="mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-error">Warning</p>
                    <p className="text-xs text-error/80">This action cannot be undone. All chat history will be permanently deleted.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Privacy Information */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} color="var(--color-accent)" className="mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Privacy Notice</p>
              <p className="text-xs text-muted-foreground mt-1">
                Your conversations are encrypted and stored securely. We never share your personal data with third parties. 
                All AI processing happens on secure servers with enterprise-grade security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;