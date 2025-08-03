import React from 'react';
import Button from '../../../components/ui/Button';

const FilterChips = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'All', icon: 'List' },
    { id: 'recent', label: 'Recent', icon: 'Clock' },
    { id: 'favorites', label: 'Favorites', icon: 'Star' },
    { id: 'long', label: 'Long Chats', icon: 'MessageSquare' }
  ];

  return (
    <div className="flex flex-wrap gap-2 w-full overflow-x-auto pb-2">
      {filters?.map((filter) => (
        <Button
          key={filter?.id}
          variant={activeFilter === filter?.id ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(filter?.id)}
          iconName={filter?.icon}
          iconPosition="left"
          iconSize={14}
          className="flex-shrink-0 micro-interaction"
        >
          {filter?.label}
        </Button>
      ))}
    </div>
  );
};

export default FilterChips;