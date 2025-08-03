import React from 'react';
import ConversationCard from './ConversationCard';
import SkeletonCard from './SkeletonCard';

const ConversationList = ({ 
  conversations, 
  searchQuery, 
  loading, 
  onConversationClick,
  onDeleteConversation,
  onToggleFavorite,
  hasMore,
  onLoadMore 
}) => {
  if (loading && conversations?.length === 0) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 6 })?.map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (conversations?.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-muted-foreground text-lg">💬</span>
        </div>
        <p className="text-muted-foreground">
          {searchQuery ? 'No conversations found matching your search' : 'No conversations available'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {conversations?.map((conversation) => (
        <ConversationCard
          key={conversation?.id}
          conversation={conversation}
          onClick={() => onConversationClick?.(conversation)}
          onDelete={() => onDeleteConversation?.(conversation?.id)}
          onToggleFavorite={() => onToggleFavorite?.(conversation?.id)}
          searchQuery={searchQuery}
        />
      ))}
      
      {hasMore && (
        <div className="flex justify-center py-4">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ConversationList;