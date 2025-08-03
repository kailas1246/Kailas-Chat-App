import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 animate-pulse">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2 flex-1">
          <div className="w-8 h-8 bg-muted rounded-full flex-shrink-0"></div>
          <div className="flex-1 min-w-0">
            <div className="h-4 bg-muted rounded w-3/4 mb-1"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
          </div>
        </div>
        <div className="w-4 h-4 bg-muted rounded flex-shrink-0"></div>
      </div>
      
      <div className="space-y-2">
        <div className="h-3 bg-muted rounded w-full"></div>
        <div className="h-3 bg-muted rounded w-2/3"></div>
      </div>
      
      <div className="flex space-x-2 mt-3">
        <div className="h-6 bg-muted rounded-full w-16"></div>
        <div className="h-6 bg-muted rounded-full w-20"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;