import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationCard = ({ 
  conversation, 
  onClick, 
  onDelete, 
  onToggleFavorite, 
  searchQuery 
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteClick = (e) => {
    e?.stopPropagation();
    if (showDeleteConfirm) {
      onDelete?.();
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
      // Auto-hide after 3 seconds
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  const handleFavoriteClick = (e) => {
    e?.stopPropagation();
    onToggleFavorite?.();
  };

  const highlightText = (text, query) => {
    if (!query?.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text?.split(regex);
    
    return parts?.map((part, index) => 
      regex?.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const formatDate = (date) => {
    try {
      const dateObj = new Date(date);
      return formatDistanceToNow(dateObj, { addSuffix: true });
    } catch (error) {
      return 'Unknown time';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-medium text-foreground text-sm line-clamp-1">
              {highlightText(conversation?.title, searchQuery)}
            </h3>
            {conversation?.isFavorite && (
              <Icon name="Star" size={14} color="var(--color-yellow-500)" className="fill-current" />
            )}
          </div>

          {/* Preview */}
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {highlightText(conversation?.preview, searchQuery)}
          </p>

          {/* Tags */}
          {conversation?.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {conversation?.tags?.slice(0, 3)?.map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-accent text-xs rounded-md text-accent-foreground"
                >
                  {highlightText(tag, searchQuery)}
                </span>
              ))}
              {conversation?.tags?.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{conversation?.tags?.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <Icon name="MessageSquare" size={12} />
                <span>{conversation?.messageCount || 0}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Clock" size={12} />
                <span>{formatDate(conversation?.lastMessage)}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1 ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavoriteClick}
            className="h-8 w-8 p-0"
          >
            <Icon 
              name={conversation?.isFavorite ? "Star" : "Star"} 
              size={14} 
              color={conversation?.isFavorite ? "var(--color-yellow-500)" : "var(--color-muted-foreground)"}
              className={conversation?.isFavorite ? "fill-current" : ""}
            />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleDeleteClick}
            className={`h-8 w-8 p-0 ${showDeleteConfirm ? 'text-destructive' : 'text-muted-foreground'}`}
          >
            <Icon name="Trash2" size={14} />
          </Button>
        </div>
      </div>
      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-destructive">Delete this conversation?</span>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e?.stopPropagation();
                  setShowDeleteConfirm(false);
                }}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteClick}
                className="text-xs"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationCard;