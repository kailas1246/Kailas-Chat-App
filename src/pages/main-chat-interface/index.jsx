import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import MessageBubble from './components/MessageBubble';
import TypingIndicator from './components/TypingIndicator';
import MessageInput from './components/MessageInput';
import ChatHeader from './components/ChatHeader';
import WelcomeScreen from './components/WelcomeScreen';
import { getStreamingChatCompletion } from '../../utils/openaiClient';
import {
  createNewConversation,
  saveConversation,
  updateConversationMessages,
  getCurrentConversationId,
  setCurrentConversationId,
  getConversationById
} from '../../utils/chatStorage';

const MainChatInterface = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [currentConversationId, setCurrentConversationIdState] = useState(null);
  const [conversationTitle, setConversationTitle] = useState('');
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, streamingMessage]);

  // Load conversation on component mount
  useEffect(() => {
    const loadConversation = () => {
      // Check if coming from history with specific conversation
      const conversationId = location?.state?.conversationId;
      
      if (conversationId) {
        // Load specific conversation from history
        const conversation = getConversationById(conversationId);
        if (conversation) {
          setMessages(conversation?.messages || []);
          setCurrentConversationIdState(conversationId);
          setCurrentConversationId(conversationId);
          setConversationTitle(conversation?.title || '');
          return;
        }
      }
      
      // Check for current active conversation
      const currentId = getCurrentConversationId();
      if (currentId) {
        const conversation = getConversationById(currentId);
        if (conversation) {
          setMessages(conversation?.messages || []);
          setCurrentConversationIdState(currentId);
          setConversationTitle(conversation?.title || '');
          return;
        }
      }
      
      // Start fresh
      setMessages([]);
      setCurrentConversationIdState(null);
      setCurrentConversationId(null);
      setConversationTitle('');
    };

    loadConversation();
  }, [location?.state?.conversationId]);

  // Save messages to storage whenever they change
  useEffect(() => {
    if (currentConversationId && messages?.length > 0) {
      updateConversationMessages(currentConversationId, messages);
    }
  }, [messages, currentConversationId]);

  const handleSendMessage = async (messageContent) => {
    const userMessage = {
      id: Date.now(),
      content: messageContent,
      timestamp: new Date(),
      isUser: true,
      status: 'sent'
    };

    // Handle new conversation creation
    if (!currentConversationId) {
      const newConversation = createNewConversation(messageContent);
      const savedConversation = saveConversation(newConversation);
      setCurrentConversationIdState(savedConversation?.id);
      setCurrentConversationId(savedConversation?.id);
      setConversationTitle(savedConversation?.title);
    }

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setStreamingMessage('');

    // Update user message status to delivered
    setTimeout(() => {
      setMessages(prev => 
        prev?.map(msg => 
          msg?.id === userMessage?.id 
            ? { ...msg, status: 'delivered' } 
            : msg
        )
      );
    }, 200);

    try {
      // Use streaming for faster, more engaging responses
      const aiMessageId = Date.now() + 1;
      let fullResponse = '';
      
      // Create placeholder AI message
      const aiMessage = {
        id: aiMessageId,
        content: '',
        timestamp: new Date(),
        isUser: false,
        status: 'typing'
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      // Stream the response
      await getStreamingChatCompletion(messageContent, (chunk) => {
        fullResponse += chunk;
        setMessages(prev => 
          prev?.map(msg => 
            msg?.id === aiMessageId 
              ? { ...msg, content: fullResponse, status: 'delivered' }
              : msg
          )
        );
      });

      // Mark as completed
      setMessages(prev => 
        prev?.map(msg => 
          msg?.id === aiMessageId 
            ? { ...msg, status: 'delivered' }
            : msg
        )
      );

      // Mark user message as read after AI responds
      setTimeout(() => {
        setMessages(prev => 
          prev?.map(msg => 
            msg?.id === userMessage?.id 
              ? { ...msg, status: 'read' } 
              : msg
          )
        );
      }, 500);

    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
      
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        content: "I'm experiencing technical difficulties. Please try again in a moment.",
        timestamp: new Date(),
        isUser: false,
        status: 'error'
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleQuickStart = (question) => {
    handleSendMessage(question);
  };

  const handleClearChat = () => {
    setMessages([]);
    setIsTyping(false);
    setStreamingMessage('');
    setCurrentConversationIdState(null);
    setCurrentConversationId(null);
    setConversationTitle('');
  };

  const handleNewChat = () => {
    handleClearChat();
    // Navigate to fresh chat interface
    navigate('/main-chat-interface', { replace: true });
  };

  const handleCopyMessage = () => {
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      <div className="flex-1 flex flex-col mt-16">
        <ChatHeader 
          onClearChat={handleClearChat}
          onNewChat={handleNewChat}
          messageCount={messages?.length}
          conversationTitle={conversationTitle}
        />

        {/* Chat Messages Area */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-4 py-6 smooth-scroll"
          style={{ maxHeight: 'calc(100vh - 200px)' }}
        >
          {messages?.length === 0 ? (
            <WelcomeScreen onQuickStart={handleQuickStart} />
          ) : (
            <div className="max-w-4xl mx-auto">
              {/* Show conversation title for loaded conversations */}
              {conversationTitle && messages?.length > 0 && (
                <div className="text-center mb-6 pb-4 border-b border-border">
                  <h2 className="text-lg font-medium text-foreground">{conversationTitle}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {messages?.length} message{messages?.length !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
              
              {messages?.map((message) => (
                <MessageBubble
                  key={message?.id}
                  message={message}
                  isUser={message?.isUser}
                  onCopy={handleCopyMessage}
                />
              ))}
              
              {isTyping && <TypingIndicator />}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Message Input */}
        <MessageInput 
          onSendMessage={handleSendMessage}
          disabled={isTyping}
        />
      </div>

      {/* Copy Success Notification */}
      {copySuccess && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-success text-success-foreground px-4 py-2 rounded-lg shadow-lg z-50 micro-interaction">
          Message copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default MainChatInterface;