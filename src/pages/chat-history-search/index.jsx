import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import ConversationList from './components/ConversationList';
import ConversationPreview from './components/ConversationPreview';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import {
  getAllConversations,
  searchConversations,
  deleteConversation,
  toggleConversationFavorite,
  clearAllConversations,
  exportConversations,
  importConversations
} from '../../utils/chatStorage';

const ChatHistorySearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Load conversations from local storage
  const loadConversations = useCallback(() => {
    setLoading(true);
    try {
      const storedConversations = getAllConversations();
      setConversations(storedConversations);
      setLoading(false);
    } catch (error) {
      console.error('Error loading conversations:', error);
      setConversations([]);
      setLoading(false);
    }
  }, []);

  // Initialize conversations on mount
  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  // Filter conversations based on search and active filter
  useEffect(() => {
    let filtered = [...conversations];

    // Apply search filter
    if (searchQuery?.trim()) {
      filtered = searchConversations(searchQuery);
    }

    // Apply category filter
    switch (activeFilter) {
      case 'recent':
        filtered = filtered?.filter(conv => {
          const hoursDiff = (Date.now() - new Date(conv?.lastMessage)) / (1000 * 60 * 60);
          return hoursDiff < 24;
        });
        break;
      case 'favorites':
        filtered = filtered?.filter(conv => conv?.isFavorite);
        break;
      case 'long':
        filtered = filtered?.filter(conv => conv?.messageCount > 15);
        break;
      default:
        break;
    }

    // Sort by most recent
    filtered?.sort((a, b) => new Date(b.lastMessage) - new Date(a.lastMessage));

    setFilteredConversations(filtered);
  }, [conversations, searchQuery, activeFilter]);

  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const handleFilterChange = useCallback((filter) => {
    setActiveFilter(filter);
  }, []);

  const handleConversationClick = useCallback((conversation) => {
    if (window.innerWidth >= 1024) {
      // Desktop: Show preview panel
      setSelectedConversation(conversation);
    } else {
      // Mobile: Navigate directly to chat
      navigate('/main-chat-interface', { 
        state: { conversationId: conversation?.id } 
      });
    }
  }, [navigate]);

  const handleOpenFullChat = useCallback((conversation) => {
    navigate('/main-chat-interface', { 
      state: { conversationId: conversation?.id } 
    });
  }, [navigate]);

  const handleDeleteConversation = useCallback((conversationId) => {
    try {
      deleteConversation(conversationId);
      loadConversations(); // Refresh the list
      if (selectedConversation?.id === conversationId) {
        setSelectedConversation(null);
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  }, [loadConversations, selectedConversation?.id]);

  const handleToggleFavorite = useCallback((conversationId) => {
    try {
      toggleConversationFavorite(conversationId);
      loadConversations(); // Refresh the list
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }, [loadConversations]);

  const handleClearAllConversations = useCallback(() => {
    if (showClearConfirm) {
      try {
        const success = clearAllConversations();
        if (success) {
          setConversations([]);
          setSelectedConversation(null);
          setShowClearConfirm(false);
        }
      } catch (error) {
        console.error('Error clearing conversations:', error);
      }
    } else {
      setShowClearConfirm(true);
      // Auto-hide confirmation after 5 seconds
      setTimeout(() => setShowClearConfirm(false), 5000);
    }
  }, [showClearConfirm]);

  const handleExportConversations = useCallback(() => {
    try {
      const jsonData = exportConversations();
      if (jsonData) {
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chat-history-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
        document.body?.appendChild(a);
        a?.click();
        document.body?.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error exporting conversations:', error);
    }
  }, []);

  const handleImportConversations = useCallback((event) => {
    const file = event.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const success = importConversations(e?.target?.result);
          if (success) {
            loadConversations();
          } else {
            alert('Invalid file format. Please select a valid JSON file.');
          }
        } catch (error) {
          console.error('Error importing conversations:', error);
          alert('Error importing conversations. Please check the file format.');
        }
      };
      reader?.readAsText(file);
    }
    // Reset file input
    event.target.value = '';
  }, [loadConversations]);

  const handleNewChat = useCallback(() => {
    navigate('/main-chat-interface');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={20} color="var(--color-accent-foreground)" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Chat History</h1>
                  <p className="text-muted-foreground">
                    {conversations?.length} conversation{conversations?.length !== 1 ? 's' : ''} saved
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="default"
                  size="sm" 
                  onClick={handleNewChat}
                  className="flex items-center space-x-2"
                >
                  <Icon name="Plus" size={16} />
                  <span className="hidden sm:inline">New Chat</span>
                </Button>

                {conversations?.length > 0 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleExportConversations}
                      className="flex items-center space-x-2"
                    >
                      <Icon name="Download" size={16} />
                      <span className="hidden sm:inline">Export</span>
                    </Button>

                    <label className="cursor-pointer">
                      <Button
                        variant="ghost"
                        size="sm"
                        as="span"
                        className="flex items-center space-x-2"
                      >
                        <Icon name="Upload" size={16} />
                        <span className="hidden sm:inline">Import</span>
                      </Button>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportConversations}
                        className="hidden"
                      />
                    </label>

                    <Button
                      variant={showClearConfirm ? "destructive" : "ghost"}
                      size="sm"
                      onClick={handleClearAllConversations}
                      className="flex items-center space-x-2"
                    >
                      <Icon name="Trash2" size={16} />
                      <span className="hidden sm:inline">
                        {showClearConfirm ? 'Confirm Clear' : 'Clear All'}
                      </span>
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-4">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                onClearSearch={handleClearSearch}
              />
            </div>

            {/* Filter Chips */}
            <FilterChips
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* No Conversations State */}
          {conversations?.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="MessageSquare" size={24} color="var(--color-muted-foreground)" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No conversations yet</h3>
              <p className="text-muted-foreground mb-4">
                Start chatting to see your conversation history here
              </p>
              <Button onClick={handleNewChat}>
                <Icon name="Plus" size={16} className="mr-2" />
                Start New Chat
              </Button>
            </div>
          )}

          {/* Main Content */}
          {conversations?.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Conversation List */}
              <div className="lg:col-span-2">
                <ConversationList
                  conversations={filteredConversations}
                  searchQuery={searchQuery}
                  loading={loading}
                  onConversationClick={handleConversationClick}
                  onDeleteConversation={handleDeleteConversation}
                  onToggleFavorite={handleToggleFavorite}
                  hasMore={false}
                  onLoadMore={() => {}}
                />
              </div>

              {/* Desktop Preview Panel */}
              <div className="hidden lg:block">
                {selectedConversation ? (
                  <div className="sticky top-24">
                    <ConversationPreview
                      conversation={selectedConversation}
                      onClose={() => setSelectedConversation(null)}
                      onOpenFullChat={handleOpenFullChat}
                    />
                  </div>
                ) : (
                  <div className="sticky top-24 bg-card border border-border rounded-lg p-8 text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="MessageSquare" size={24} color="var(--color-muted-foreground)" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Select a conversation</h3>
                    <p className="text-muted-foreground">
                      Click on any conversation to preview it here
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHistorySearch;