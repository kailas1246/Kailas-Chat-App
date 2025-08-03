import { getAllConversations } from './chatStorage';

/**
 * Calculate user statistics from stored conversations
 * @returns {Object} User statistics object
 */
export const calculateUserStats = () => {
  try {
    const conversations = getAllConversations();
    
    if (!conversations || conversations?.length === 0) {
      return {
        totalChats: 0,
        totalMessages: 0,
        totalUserMessages: 0,
        totalBotMessages: 0,
        averageMessagesPerChat: 0,
        favoriteChats: 0,
        oldestChatDate: null,
        newestChatDate: null,
        averageResponseTime: "N/A",
        lastActive: "Never"
      };
    }

    // Calculate basic statistics
    const totalChats = conversations?.length;
    let totalMessages = 0;
    let totalUserMessages = 0;
    let totalBotMessages = 0;
    let favoriteChats = 0;
    let oldestDate = null;
    let newestDate = null;
    let lastActiveDate = null;

    conversations?.forEach(conversation => {
      const messageCount = conversation?.messageCount || conversation?.messages?.length || 0;
      totalMessages += messageCount;
      
      if (conversation?.isFavorite) {
        favoriteChats++;
      }

      // Count user vs bot messages
      if (conversation?.messages && Array.isArray(conversation?.messages)) {
        conversation?.messages?.forEach(message => {
          if (message?.isUser) {
            totalUserMessages++;
          } else {
            totalBotMessages++;
          }
        });
      }

      // Track dates
      const createdAt = new Date(conversation?.createdAt);
      const lastMessage = new Date(conversation?.lastMessage || conversation?.updatedAt);

      if (!oldestDate || createdAt < oldestDate) {
        oldestDate = createdAt;
      }
      if (!newestDate || createdAt > newestDate) {
        newestDate = createdAt;
      }
      if (!lastActiveDate || lastMessage > lastActiveDate) {
        lastActiveDate = lastMessage;
      }
    });

    // Calculate derived statistics
    const averageMessagesPerChat = totalChats > 0 ? Math.round(totalMessages / totalChats) : 0;

    // Format last active time
    const formatLastActive = (date) => {
      if (!date) return "Never";
      
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);

      if (diffInSeconds < 60) return "Just now";
      if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
      if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
      if (diffInDays < 7) return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
      
      return date?.toLocaleDateString();
    };

    // Estimate average response time (mock calculation based on activity)
    const getAverageResponseTime = () => {
      if (totalMessages === 0) return "N/A";
      if (totalMessages > 1000) return "0.6s";
      if (totalMessages > 500) return "0.8s";
      if (totalMessages > 100) return "1.2s";
      return "1.5s";
    };

    return {
      totalChats,
      totalMessages,
      totalUserMessages,
      totalBotMessages,
      averageMessagesPerChat,
      favoriteChats,
      oldestChatDate: oldestDate,
      newestChatDate: newestDate,
      averageResponseTime: getAverageResponseTime(),
      lastActive: formatLastActive(lastActiveDate)
    };

  } catch (error) {
    console.error('Error calculating user stats:', error);
    return {
      totalChats: 0,
      totalMessages: 0,
      totalUserMessages: 0,
      totalBotMessages: 0,
      averageMessagesPerChat: 0,
      favoriteChats: 0,
      oldestChatDate: null,
      newestChatDate: null,
      averageResponseTime: "N/A",
      lastActive: "Error calculating"
    };
  }
};

/**
 * Get formatted join date (first conversation date or fallback)
 * @returns {string} Formatted join date
 */
export const getUserJoinDate = () => {
  try {
    const stats = calculateUserStats();
    if (stats?.oldestChatDate) {
      return stats?.oldestChatDate?.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    
    // Fallback to current date if no conversations
    const fallbackDate = new Date();
    return fallbackDate?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error getting user join date:', error);
    return new Date()?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
};

/**
 * Get user activity insights
 * @returns {Object} Activity insights
 */
export const getUserActivityInsights = () => {
  try {
    const stats = calculateUserStats();
    const conversations = getAllConversations();
    
    // Calculate usage patterns
    const recentChats = conversations?.filter(conv => {
      const lastMessage = new Date(conv?.lastMessage || conv?.updatedAt);
      const weekAgo = new Date();
      weekAgo?.setDate(weekAgo?.getDate() - 7);
      return lastMessage > weekAgo;
    })?.length || 0;

    const monthlyChats = conversations?.filter(conv => {
      const createdAt = new Date(conv?.createdAt);
      const monthAgo = new Date();
      monthAgo?.setMonth(monthAgo?.getMonth() - 1);
      return createdAt > monthAgo;
    })?.length || 0;

    return {
      recentChats,
      monthlyChats,
      engagementLevel: stats?.totalMessages > 100 ? 'High' : stats?.totalMessages > 20 ? 'Medium' : 'Low',
      favoriteRatio: stats?.totalChats > 0 ? Math.round((stats?.favoriteChats / stats?.totalChats) * 100) : 0
    };
  } catch (error) {
    console.error('Error getting activity insights:', error);
    return {
      recentChats: 0,
      monthlyChats: 0,
      engagementLevel: 'Low',
      favoriteRatio: 0
    };
  }
};