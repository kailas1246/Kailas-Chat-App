// Chat Storage Utility for Local Storage Management
const STORAGE_KEYS = {
  CONVERSATIONS: 'rocket_chat_conversations',
  CURRENT_CONVERSATION: 'rocket_current_conversation',
  SETTINGS: 'rocket_chat_settings'
};

/**
 * Generate a unique conversation ID
 * @returns {string} Unique conversation ID
 */
export const generateConversationId = () => {
  return `conv_${Date.now()}_${Math.random()?.toString(36)?.substr(2, 9)}`;
};

/**
 * Generate conversation title from first message
 * @param {string} firstMessage - First message content
 * @returns {string} Generated title
 */
export const generateConversationTitle = (firstMessage) => {
  if (!firstMessage) return 'New Conversation';
  
  // Clean and truncate message for title
  const cleanMessage = firstMessage?.trim()?.replace(/\n+/g, ' ');
  if (cleanMessage?.length <= 50) return cleanMessage;
  
  // Find a good breaking point
  const truncated = cleanMessage?.substring(0, 47);
  const lastSpace = truncated?.lastIndexOf(' ');
  
  return lastSpace > 20 ? truncated?.substring(0, lastSpace) + '...' : truncated + '...';
};

/**
 * Get all conversations from local storage
 * @returns {Array} Array of conversation objects
 */
export const getAllConversations = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS?.CONVERSATIONS);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading conversations from storage:', error);
    return [];
  }
};

/**
 * Save conversation to local storage
 * @param {Object} conversation - Conversation object to save
 */
export const saveConversation = (conversation) => {
  try {
    const conversations = getAllConversations();
    const existingIndex = conversations?.findIndex(conv => conv?.id === conversation?.id);
    
    const conversationToSave = {
      ...conversation,
      lastMessage: new Date(),
      updatedAt: new Date()
    };
    
    if (existingIndex >= 0) {
      conversations[existingIndex] = conversationToSave;
    } else {
      conversations?.unshift(conversationToSave); // Add to beginning
    }
    
    localStorage.setItem(STORAGE_KEYS?.CONVERSATIONS, JSON.stringify(conversations));
    return conversationToSave;
  } catch (error) {
    console.error('Error saving conversation:', error);
    throw error;
  }
};

/**
 * Update conversation messages
 * @param {string} conversationId - Conversation ID
 * @param {Array} messages - Updated messages array
 */
export const updateConversationMessages = (conversationId, messages) => {
  try {
    const conversations = getAllConversations();
    const conversation = conversations?.find(conv => conv?.id === conversationId);
    
    if (conversation) {
      conversation.messages = messages;
      conversation.messageCount = messages?.length;
      conversation.lastMessage = new Date();
      conversation.updatedAt = new Date();
      
      // Update preview with last user message
      const lastUserMessage = messages?.filter(msg => msg?.isUser)?.pop();
      if (lastUserMessage) {
        conversation.preview = lastUserMessage?.content?.length > 100 
          ? lastUserMessage?.content?.substring(0, 100) + '...'
          : lastUserMessage?.content;
      }
      
      localStorage.setItem(STORAGE_KEYS?.CONVERSATIONS, JSON.stringify(conversations));
    }
  } catch (error) {
    console.error('Error updating conversation messages:', error);
  }
};

/**
 * Get specific conversation by ID
 * @param {string} conversationId - Conversation ID
 * @returns {Object|null} Conversation object or null
 */
export const getConversationById = (conversationId) => {
  try {
    const conversations = getAllConversations();
    return conversations?.find(conv => conv?.id === conversationId) || null;
  } catch (error) {
    console.error('Error getting conversation by ID:', error);
    return null;
  }
};

/**
 * Delete conversation from storage
 * @param {string} conversationId - Conversation ID
 */
export const deleteConversation = (conversationId) => {
  try {
    const conversations = getAllConversations();
    const filteredConversations = conversations?.filter(conv => conv?.id !== conversationId);
    localStorage.setItem(STORAGE_KEYS?.CONVERSATIONS, JSON.stringify(filteredConversations));
  } catch (error) {
    console.error('Error deleting conversation:', error);
  }
};

/**
 * Toggle favorite status of conversation
 * @param {string} conversationId - Conversation ID
 */
export const toggleConversationFavorite = (conversationId) => {
  try {
    const conversations = getAllConversations();
    const conversation = conversations?.find(conv => conv?.id === conversationId);
    
    if (conversation) {
      conversation.isFavorite = !conversation?.isFavorite;
      localStorage.setItem(STORAGE_KEYS?.CONVERSATIONS, JSON.stringify(conversations));
    }
  } catch (error) {
    console.error('Error toggling conversation favorite:', error);
  }
};

/**
 * Create new conversation
 * @param {string} firstMessage - First message content
 * @returns {Object} New conversation object
 */
export const createNewConversation = (firstMessage) => {
  const conversationId = generateConversationId();
  const title = generateConversationTitle(firstMessage);
  
  const newConversation = {
    id: conversationId,
    title,
    preview: firstMessage?.length > 100 ? firstMessage?.substring(0, 100) + '...' : firstMessage,
    messages: [],
    messageCount: 0,
    isFavorite: false,
    tags: [],
    createdAt: new Date(),
    lastMessage: new Date(),
    updatedAt: new Date()
  };
  
  return newConversation;
};

/**
 * Get current active conversation ID
 * @returns {string|null} Current conversation ID
 */
export const getCurrentConversationId = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS?.CURRENT_CONVERSATION);
  } catch (error) {
    console.error('Error getting current conversation ID:', error);
    return null;
  }
};

/**
 * Set current active conversation ID
 * @param {string} conversationId - Conversation ID to set as current
 */
export const setCurrentConversationId = (conversationId) => {
  try {
    if (conversationId) {
      localStorage.setItem(STORAGE_KEYS?.CURRENT_CONVERSATION, conversationId);
    } else {
      localStorage.removeItem(STORAGE_KEYS?.CURRENT_CONVERSATION);
    }
  } catch (error) {
    console.error('Error setting current conversation ID:', error);
  }
};

/**
 * Search conversations
 * @param {string} query - Search query
 * @returns {Array} Filtered conversations
 */
export const searchConversations = (query) => {
  if (!query?.trim()) return getAllConversations();
  
  const conversations = getAllConversations();
  const searchTerm = query?.toLowerCase();
  
  return conversations?.filter(conv => 
    conv?.title?.toLowerCase()?.includes(searchTerm) ||
    conv?.preview?.toLowerCase()?.includes(searchTerm) ||
    conv?.tags?.some(tag => tag?.toLowerCase()?.includes(searchTerm)) ||
    conv?.messages?.some(msg => msg?.content?.toLowerCase()?.includes(searchTerm))
  );
};

/**
 * Clear all conversations (with confirmation)
 * @returns {boolean} Success status
 */
export const clearAllConversations = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS?.CONVERSATIONS);
    localStorage.removeItem(STORAGE_KEYS?.CURRENT_CONVERSATION);
    return true;
  } catch (error) {
    console.error('Error clearing conversations:', error);
    return false;
  }
};

/**
 * Export conversations as JSON
 * @returns {string} JSON string of all conversations
 */
export const exportConversations = () => {
  try {
    const conversations = getAllConversations();
    return JSON.stringify(conversations, null, 2);
  } catch (error) {
    console.error('Error exporting conversations:', error);
    return null;
  }
};

/**
 * Import conversations from JSON
 * @param {string} jsonData - JSON string of conversations
 * @returns {boolean} Success status
 */
export const importConversations = (jsonData) => {
  try {
    const importedConversations = JSON.parse(jsonData);
    if (Array.isArray(importedConversations)) {
      localStorage.setItem(STORAGE_KEYS?.CONVERSATIONS, JSON.stringify(importedConversations));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error importing conversations:', error);
    return false;
  }
};