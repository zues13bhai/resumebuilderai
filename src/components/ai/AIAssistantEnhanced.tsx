import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, MessageCircle, Zap, Target, TrendingUp, Send, Lightbulb } from 'lucide-react';
import { ResumeData } from '../../types/resume';
import { useAuth } from '../../hooks/useAuth';

interface AIAssistantEnhancedProps {
  resumeData: ResumeData;
  onUpdate: (data: ResumeData) => void;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  message: string;
  timestamp: Date;
  suggestions?: string[];
}

const aiSuggestions = [
  {
    type: 'improvement',
    title: 'Quantify Your Achievements',
    description: 'Add specific numbers and percentages to make your accomplishments more impactful.',
    action: 'Apply Suggestion',
    impact: 'High',
    example: 'Instead of "Improved sales" → "Increased sales by 25% over 6 months"'
  },
  {
    type: 'keyword',
    title: 'Missing Industry Keywords',
    description: 'Include more relevant keywords like "agile methodology", "cross-functional collaboration".',
    action: 'Add Keywords',
    impact: 'Medium',
    example: 'Add: Project Management, Stakeholder Communication, Data Analysis'
  },
  {
    type: 'format',
    title: 'Optimize Section Order',
    description: 'Move your skills section higher to catch recruiter attention faster.',
    action: 'Reorder Sections',
    impact: 'Low',
    example: 'Recommended order: Summary → Skills → Experience → Education'
  }
];

const quickPrompts = [
  "Improve my professional summary",
  "Suggest better action verbs for my experience",
  "Help me quantify my achievements",
  "What keywords should I add?",
  "Review my resume for ATS optimization"
];

export const AIAssistantEnhanced: React.FC<AIAssistantEnhancedProps> = ({ 
  resumeData, 
  onUpdate, 
  onClose 
}) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'suggestions' | 'chat' | 'analysis'>('suggestions');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      message: 'Hi! I\'m your AI resume assistant. I can help you improve your resume content, optimize for ATS systems, and provide personalized suggestions. How can I help you today?',
      timestamp: new Date(),
      suggestions: quickPrompts
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Check if user has premium access
  if (user?.plan === 'free') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center"
        >
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            AI Assistant
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Get personalized resume suggestions, content enhancement, and optimization tips with our AI assistant.
          </p>
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Zap className="w-4 h-4 mr-2 text-purple-500" />
              Smart content suggestions
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Target className="w-4 h-4 mr-2 text-purple-500" />
              ATS optimization tips
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <TrendingUp className="w-4 h-4 mr-2 text-purple-500" />
              Performance insights
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Maybe Later
            </button>
            <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all">
              Upgrade Now
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  const sendMessage = async (message?: string) => {
    const messageToSend = message || chatMessage;
    if (!messageToSend.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: messageToSend,
      timestamp: new Date()
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setChatMessage('');
    setIsTyping(true);
    
    // Simulate AI response (replace with actual AI API call)
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageToSend, resumeData);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        message: aiResponse.message,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions
      };
      
      setChatHistory(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const applySuggestion = (suggestion: any) => {
    // Apply the suggestion to resume data
    let updatedData = { ...resumeData };
    
    switch (suggestion.type) {
      case 'improvement':
        // Example: Add quantified achievements
        if (updatedData.experience.length > 0) {
          updatedData.experience[0].achievements = updatedData.experience[0].achievements.map(
            achievement => achievement.includes('%') ? achievement : `${achievement} (increased by 25%)`
          );
        }
        break;
      case 'keyword':
        // Add missing keywords to skills
        const newKeywords = ['Project Management', 'Stakeholder Communication', 'Data Analysis'];
        updatedData.coreCompetencies = [...new Set([...updatedData.coreCompetencies, ...newKeywords])];
        break;
      case 'format':
        // This would typically involve UI changes, so we'll just show a message
        console.log('Format optimization applied');
        break;
    }
    
    onUpdate(updatedData);
    
    // Show success message
    const successMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'ai',
      message: `✅ Applied suggestion: ${suggestion.title}. Your resume has been updated!`,
      timestamp: new Date()
    };
    setChatHistory(prev => [...prev, successMessage]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full h-[80vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-2 rounded-lg mr-3">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI Resume Assistant</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Powered by advanced AI technology</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {[
            { id: 'suggestions', label: 'Smart Suggestions', icon: Target },
            { id: 'chat', label: 'AI Chat', icon: MessageCircle },
            { id: 'analysis', label: 'Deep Analysis', icon: TrendingUp }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center px-6 py-3 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'suggestions' && (
              <motion.div
                key="suggestions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 h-full overflow-auto"
              >
                <div className="space-y-4">
                  {aiSuggestions.map((suggestion, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{suggestion.title}</h3>
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                              suggestion.impact === 'High' ? 'bg-red-100 text-red-800' :
                              suggestion.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {suggestion.impact} Impact
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                            {suggestion.description}
                          </p>
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-xs text-blue-800 dark:text-blue-300 mb-3">
                            <strong>Example:</strong> {suggestion.example}
                          </div>
                          <button 
                            onClick={() => applySuggestion(suggestion)}
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors"
                          >
                            {suggestion.action}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'chat' && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full"
              >
                <div className="flex-1 overflow-auto p-6 space-y-4">
                  {chatHistory.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}>
                        <p>{message.message}</p>
                        {message.suggestions && (
                          <div className="mt-2 space-y-1">
                            {message.suggestions.map((suggestion, idx) => (
                              <button
                                key={idx}
                                onClick={() => sendMessage(suggestion)}
                                className="block w-full text-left text-xs bg-white bg-opacity-20 hover:bg-opacity-30 rounded px-2 py-1 transition-colors"
                              >
                                💡 {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Ask me anything about your resume..."
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <button
                      onClick={() => sendMessage()}
                      disabled={!chatMessage.trim() || isTyping}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'analysis' && (
              <motion.div
                key="analysis"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 h-full overflow-auto"
              >
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Resume Strength Analysis</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">85%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Overall Score</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">12</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Keywords Matched</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Content Analysis</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Action Verbs Usage</span>
                        <span className="font-medium text-green-600">Good</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Quantified Achievements</span>
                        <span className="font-medium text-yellow-600">Needs Improvement</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Industry Keywords</span>
                        <span className="font-medium text-green-600">Excellent</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-start">
                      <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
                      <div>
                        <h4 className="font-medium text-yellow-800 dark:text-yellow-400">AI Recommendation</h4>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                          Consider adding more quantified achievements to your experience section. 
                          Numbers and percentages make your accomplishments more compelling to recruiters.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Helper function to generate AI responses (replace with actual AI API)
const generateAIResponse = (userMessage: string, resumeData: ResumeData) => {
  const message = userMessage.toLowerCase();
  
  if (message.includes('summary') || message.includes('professional summary')) {
    return {
      message: "I can help you improve your professional summary! Here are some suggestions:\n\n1. Start with your years of experience\n2. Mention your key skills\n3. Include a quantified achievement\n4. End with your career goal\n\nWould you like me to rewrite your current summary?",
      suggestions: ["Rewrite my summary", "Add more keywords", "Make it more impactful"]
    };
  }
  
  if (message.includes('action verbs') || message.includes('verbs')) {
    return {
      message: "Great question! Here are some powerful action verbs you can use:\n\n• Leadership: Led, Managed, Directed, Supervised\n• Achievement: Achieved, Delivered, Exceeded, Accomplished\n• Growth: Increased, Expanded, Improved, Enhanced\n• Creation: Developed, Built, Created, Designed\n\nShall I help you replace weak verbs in your experience section?",
      suggestions: ["Replace weak verbs", "Show me more action verbs", "Review my experience section"]
    };
  }
  
  if (message.includes('quantify') || message.includes('numbers') || message.includes('achievements')) {
    return {
      message: "Quantifying achievements is crucial! Here's how to add impact:\n\n• Use percentages: 'Increased sales by 25%'\n• Include timeframes: 'Reduced processing time from 2 hours to 30 minutes'\n• Mention team size: 'Led a team of 8 developers'\n• Add dollar amounts: 'Saved company $50K annually'\n\nLet me help you quantify your current achievements!",
      suggestions: ["Help quantify my achievements", "Add numbers to my experience", "Show examples"]
    };
  }
  
  if (message.includes('keywords') || message.includes('ats')) {
    return {
      message: "ATS optimization is key! Here's what I found:\n\n✅ Good keyword density in your summary\n⚠️ Missing some industry-specific terms\n✅ Good use of standard section headers\n\nI recommend adding these keywords: 'Project Management', 'Cross-functional collaboration', 'Data-driven decision making'\n\nWould you like me to suggest more keywords based on your industry?",
      suggestions: ["Add more keywords", "Check ATS compatibility", "Industry-specific terms"]
    };
  }
  
  // Default response
  return {
    message: "I'm here to help you improve your resume! I can assist with:\n\n• Writing compelling summaries\n• Improving experience descriptions\n• Adding powerful action verbs\n• Optimizing for ATS systems\n• Quantifying achievements\n• Adding relevant keywords\n\nWhat would you like to work on first?",
    suggestions: quickPrompts
  };
};