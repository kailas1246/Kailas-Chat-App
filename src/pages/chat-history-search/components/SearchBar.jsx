import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ searchQuery, onSearchChange, onClearSearch }) => {
  return (
    <div className="relative w-full">
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
          <Icon name="Search" size={20} color="var(--color-muted-foreground)" />
        </div>
        <Input
          type="search"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <button
            onClick={onClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 p-1 hover:bg-muted rounded-full micro-interaction"
            aria-label="Clear search"
          >
            <Icon name="X" size={16} color="var(--color-muted-foreground)" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;