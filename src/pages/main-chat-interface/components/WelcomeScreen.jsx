import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeScreen = ({ onQuickStart }) => {
  const quickStartQuestions = [
    {
      id: 1,
      text: "What can you help me with?",
      icon: "HelpCircle"
    },
    {
      id: 2,
      text: "Tell me about your capabilities",
      icon: "Zap"
    },
    {
      id: 3,
      text: "How do I get started?",
      icon: "Play"
    },
    {
      id: 4,
      text: "Show me some examples",
      icon: "BookOpen"
    }
  ];

  const features = [
    {
      icon: "MessageCircle",
      title: "Natural Conversations",
      description: "Chat naturally with AI that understands context"
    },
    {
      icon: "Zap",
      title: "Fast Responses",
      description: "Get instant, accurate answers to your questions"
    },
    {
      icon: "Brain",
      title: "Smart Assistance",
      description: "AI-powered help for work, study, and creativity"
    },
    {
      icon: "Shield",
      title: "Secure & Private",
      description: "Your conversations are protected and confidential"
    }
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mb-4 mx-auto">
          <Icon name="Bot" size={32} color="var(--color-accent-foreground)" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to KailasBot AI</h1>
        <p className="text-lg text-muted-foreground max-w-md">
          Your premium AI assistant powered by advanced language models. Experience intelligent conversations with lightning-fast responses.
        </p>
      </div>
      {/* Quick Start Questions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 w-full max-w-2xl">
        {quickStartQuestions?.map((question) => (
          <Button
            key={question?.id}
            variant="outline"
            onClick={() => onQuickStart(question?.text)}
            className="p-4 h-auto text-left justify-start micro-interaction hover:bg-muted/50"
          >
            <Icon name={question?.icon} size={18} className="mr-3 flex-shrink-0" />
            <span className="text-sm">{question?.text}</span>
          </Button>
        ))}
      </div>
      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl">
        {features?.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-3 mx-auto">
              <Icon name={feature?.icon} size={20} color="var(--color-muted-foreground)" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{feature?.title}</h3>
            <p className="text-xs text-muted-foreground">{feature?.description}</p>
          </div>
        ))}
      </div>
      {/* Getting Started Tip */}
      <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border max-w-md">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={16} color="var(--color-accent)" className="mt-0.5 flex-shrink-0" />
          <div className="text-left">
            <p className="text-sm text-foreground font-medium mb-1">Pro Tip</p>
            <p className="text-xs text-muted-foreground">
              Be specific with your questions to get the most helpful responses. I can assist with explanations, analysis, creative tasks, and much more!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;