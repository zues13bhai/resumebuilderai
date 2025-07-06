import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Sparkles, 
  MessageCircle, 
  Send, 
  Lightbulb, 
  FileText,
  Target,
  Zap,
  Copy,
  RefreshCw,
  User,
  Bot,
  Wand2,
  PenTool,
  CheckCircle
} from 'lucide-react';
import { ResumeData } from '../../types/resume';
import { usePremium } from '../../contexts/PremiumContext';

interface AIAssistantAdvancedProps {
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
  actionType?: 'improve' | 'generate' | 'fix' | 'suggest';
}

const promptTemplates = [
  {
    category: 'Professional Summary',
    prompts: [
      'Write a compelling professional summary for a software engineer with 5 years experience',
      'Improve my current professional summary to be more impactful',
      'Create a summary that highlights leadership and technical skills',
      'Write a summary focused on career transition to product management'
    ]
  },
  {
    category: 'Experience',
    prompts: [
      'Rewrite this experience bullet to be more quantified and impactful',
      'Generate achievement-focused bullets for a marketing manager role',
      'Improve the action verbs in my experience section',
      'Add metrics and numbers to make my achievements more compelling'
    ]
  },
  {
    category: 'Skills & Keywords',
    prompts: [
      'Suggest relevant skills for a data scientist position',
      'What keywords should I include for ATS optimization?',
      'Recommend technical skills for a full-stack developer',
      'Help me organize my skills by category and importance'
    ]
  },
  {
    category: 'Grammar & Style',
    prompts: [
      'Fix grammar and improve the tone of my resume content',
      'Make my writing more professional and concise',
      'Check for consistency in tense and formatting',
      'Improve the overall flow and readability'
    ]
  }
];

const quickActions = [
  { icon: Wand2, label: 'Enhance Summary', action: 'enhance-summary' },
  { icon: Target, label: 'Add Keywords', action: 'add-keywords' },
  { icon: PenTool, label: 'Fix Grammar', action: 'fix-grammar' },
  { icon: Zap, label: 'Quantify Achievements', action: 'quantify-achievements' }
];

export const AIAssistantAdvanced: React.FC<AIAssistantAdvancedProps> = ({ 
  resumeData, 
  onUpdate, 
  onClose 
}) => {
  const { isPremium } = usePremium();
  const [activeTab, setActiveTab] = useState<'chat' | 'templates' | 'quick'>('chat');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      message: '👋 Hi! I\'m your AI Resume Assistant. I can help you improve your resume content, fix grammar, suggest keywords, and make your resume more ATS-friendly. How can I help you today?',
      timestamp: new Date(),
      suggestions: [
        'Improve my professional summary',
        'Suggest better action verbs',
        'Help with ATS optimization',
        'Fix grammar and style'
      ]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  // 🧠 AI Assistant Start - Mock AI Response Generator
  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const message = userMessage.toLowerCase();
    
    // Professional Summary responses
    if (message.includes('summary') || message.includes('professional summary')) {
      return `Here's an improved professional summary based on your experience:

**Enhanced Summary:**
"Results-driven ${resumeData.experience[0]?.position || 'professional'} with ${resumeData.experience.length}+ years of proven success in delivering high-impact solutions. Expertise in ${resumeData.coreCompetencies.slice(0, 3).join(', ')} with a track record of ${resumeData.experience[0]?.achievements[0] || 'driving business growth'}. Strong leadership and analytical skills with experience managing cross-functional teams and complex projects."

**Key improvements:**
✅ Added specific years of experience
✅ Included quantifiable achievements
✅ Highlighted core competencies
✅ Emphasized leadership qualities

Would you like me to customize this further for a specific role?`;
    }
    
    // Grammar and style responses
    if (message.includes('grammar') || message.includes('fix') || message.includes('style')) {
      return `I've analyzed your resume content for grammar and style improvements:

**Grammar & Style Fixes:**
✅ **Consistency**: Ensured all bullet points use past tense for previous roles
✅ **Action Verbs**: Replaced weak verbs with stronger alternatives
✅ **Conciseness**: Removed redundant words and phrases
✅ **Professional Tone**: Enhanced formal language throughout

**Specific Improvements:**
• "Worked on projects" → "Led cross-functional projects"
• "Helped with sales" → "Increased sales by 25%"
• "Was responsible for" → "Managed and optimized"

**Recommendations:**
• Use active voice consistently
• Start each bullet with a strong action verb
• Include specific metrics where possible
• Maintain parallel structure in lists

Would you like me to review a specific section in detail?`;
    }
    
    // Keywords and ATS optimization
    if (message.includes('keyword') || message.includes('ats') || message.includes('optimize')) {
      return `Here's your ATS optimization analysis:

**Missing High-Impact Keywords:**
🎯 **Technical Skills**: React, Node.js, Python, AWS, Docker
🎯 **Soft Skills**: Leadership, Project Management, Cross-functional Collaboration
🎯 **Industry Terms**: Agile, Scrum, CI/CD, Data Analysis

**Current Keyword Density**: 65% (Good, but can be improved)

**Recommendations:**
1. **Add to Skills Section**: Include 2-3 missing technical keywords
2. **Integrate Naturally**: Weave keywords into experience descriptions
3. **Use Variations**: Include both "JavaScript" and "JS"
4. **Industry Buzzwords**: Add relevant methodology terms

**ATS-Friendly Formatting Tips:**
✅ Use standard section headers
✅ Avoid tables and graphics
✅ Include both acronyms and full terms
✅ Use simple, clean formatting

Want me to suggest specific placements for these keywords?`;
    }
    
    // Experience and achievements
    if (message.includes('experience') || message.includes('achievement') || message.includes('bullet')) {
      return `Let me help you create more impactful experience bullets:

**Enhanced Achievement Examples:**

**Before**: "Worked on website development"
**After**: "Developed responsive web applications using React and Node.js, improving user engagement by 40% and reducing load times by 30%"

**Before**: "Managed team projects"
**After**: "Led cross-functional team of 8 developers and designers to deliver 5 major product releases, resulting in $2M revenue increase"

**Formula for Strong Bullets:**
[Action Verb] + [What You Did] + [How You Did It] + [Quantified Result]

**Power Action Verbs to Use:**
• Leadership: Spearheaded, Orchestrated, Championed
• Achievement: Delivered, Exceeded, Accomplished
• Improvement: Optimized, Enhanced, Streamlined
• Growth: Scaled, Expanded, Accelerated

**Quantification Ideas:**
• Percentages (increased by X%)
• Dollar amounts (saved $X, generated $X)
• Time savings (reduced from X to Y)
• Team size (managed team of X)
• Volume (processed X transactions)

Which experience would you like me to help rewrite?`;
    }
    
    // Skills suggestions
    if (message.includes('skill') || message.includes('suggest')) {
      const role = message.includes('data') ? 'data scientist' : 
                   message.includes('developer') ? 'developer' : 
                   message.includes('manager') ? 'manager' : 'professional';
      
      return `Here are relevant skills for a ${role}:

**Technical Skills:**
${role === 'data scientist' ? 
  '• Python, R, SQL, Machine Learning\n• TensorFlow, PyTorch, Scikit-learn\n• Tableau, Power BI, Jupyter\n• Statistics, Data Visualization' :
  role === 'developer' ?
  '• JavaScript, TypeScript, React, Node.js\n• Python, Java, C++\n• AWS, Docker, Kubernetes\n• Git, CI/CD, Agile' :
  '• Project Management, Strategic Planning\n• Data Analysis, Process Improvement\n• Team Leadership, Stakeholder Management\n• Budget Management, Risk Assessment'
}

**Soft Skills:**
• Problem-solving and analytical thinking
• Communication and presentation
• Leadership and team collaboration
• Adaptability and continuous learning

**Industry-Specific:**
• Agile/Scrum methodology
• Cross-functional collaboration
• Stakeholder management
• Performance optimization

**Trending Skills to Consider:**
• AI/Machine Learning awareness
• Cloud computing platforms
• Data-driven decision making
• Digital transformation

Would you like me to prioritize these based on current job market trends?`;
    }
    
    // Default helpful response
    return `I'm here to help you create an outstanding resume! Here's what I can assist you with:

**Content Enhancement:**
📝 Rewrite professional summaries
🎯 Improve experience descriptions
💪 Strengthen achievement bullets
🔧 Add quantifiable metrics

**Optimization:**
🤖 ATS keyword optimization
📊 Industry-specific suggestions
✨ Grammar and style improvements
🎨 Professional tone enhancement

**Specific Help:**
• "Improve my summary for a [role] position"
• "Add metrics to this achievement: [paste text]"
• "Suggest keywords for [industry/role]"
• "Fix the grammar in this section: [paste text]"

What specific area would you like to work on first?`;
  };
  // 🧠 AI Assistant End

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
    
    try {
      // 🧠 AI Assistant Start - Generate AI response
      const aiResponseText = await generateAIResponse(messageToSend);
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        message: aiResponseText,
        timestamp: new Date(),
        suggestions: [
          'Tell me more about this',
          'Apply these changes',
          'Show me another example',
          'Help with something else'
        ]
      };
      
      setChatHistory(prev => [...prev, aiMessage]);
      // 🧠 AI Assistant End
    } catch (error) {
      console.error('AI response error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        message: 'I apologize, but I encountered an error. Please try again or rephrase your question.',
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = async (action: string) => {
    const actionMessages = {
      'enhance-summary': 'Please enhance my professional summary to be more compelling and ATS-friendly',
      'add-keywords': 'Suggest relevant keywords I should add to improve my resume\'s ATS score',
      'fix-grammar': 'Review my resume content and fix any grammar or style issues',
      'quantify-achievements': 'Help me add specific metrics and numbers to my achievements'
    };
    
    const message = actionMessages[action as keyof typeof actionMessages];
    if (message) {
      await sendMessage(message);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    
    // Show success toast
    const toast = document.createElement('div');
    toast.textContent = 'Copied to clipboard!';
    toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg z-50';
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 2000);
  };

  if (!isPremium) {
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
            AI Resume Assistant
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Get personalized resume suggestions, content enhancement, and optimization tips with our advanced AI assistant.
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
              <PenTool className="w-4 h-4 mr-2 text-purple-500" />
              Grammar and style improvements
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
              Unlock Premium
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

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
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full h-[85vh] flex flex-col"
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
            { id: 'chat', label: 'AI Chat', icon: MessageCircle },
            { id: 'templates', label: 'Prompt Templates', icon: FileText },
            { id: 'quick', label: 'Quick Actions', icon: Zap }
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
            {activeTab === 'chat' && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col h-full"
              >
                <div className="flex-1 overflow-auto p-6 space-y-4">
                  {chatHistory.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                        <div className={`flex items-start space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            message.type === 'user' 
                              ? 'bg-purple-600 text-white' 
                              : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                          }`}>
                            {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                          </div>
                          <div className={`px-4 py-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                          }`}>
                            <div className="whitespace-pre-wrap">{message.message}</div>
                            {message.type === 'ai' && (
                              <button
                                onClick={() => copyToClipboard(message.message)}
                                className="mt-2 text-xs opacity-70 hover:opacity-100 flex items-center"
                              >
                                <Copy className="w-3 h-3 mr-1" />
                                Copy
                              </button>
                            )}
                          </div>
                        </div>
                        {message.suggestions && (
                          <div className="mt-2 space-y-1">
                            {message.suggestions.map((suggestion, idx) => (
                              <button
                                key={idx}
                                onClick={() => sendMessage(suggestion)}
                                className="block text-left text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded px-3 py-2 transition-colors w-full"
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
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                      placeholder="Ask me anything about your resume... (e.g., 'Improve my summary', 'Add keywords for data analyst role')"
                      className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <button
                      onClick={() => sendMessage()}
                      disabled={!chatMessage.trim() || isTyping}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'templates' && (
              <motion.div
                key="templates"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 h-full overflow-auto"
              >
                <div className="space-y-6">
                  {promptTemplates.map((category, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
                        {category.category}
                      </h3>
                      <div className="space-y-2">
                        {category.prompts.map((prompt, promptIndex) => (
                          <button
                            key={promptIndex}
                            onClick={() => {
                              setActiveTab('chat');
                              sendMessage(prompt);
                            }}
                            className="block w-full text-left p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'quick' && (
              <motion.div
                key="quick"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 h-full overflow-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveTab('chat');
                        handleQuickAction(action.action);
                      }}
                      className="p-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center"
                    >
                      <action.icon className="w-5 h-5 mr-3" />
                      {action.label}
                    </button>
                  ))}
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <h3 className="font-medium text-blue-900 dark:text-blue-400 mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Quick Tips
                  </h3>
                  <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                    <li>• Use specific numbers and percentages in achievements</li>
                    <li>• Start each bullet point with a strong action verb</li>
                    <li>• Include relevant keywords for your target industry</li>
                    <li>• Keep your professional summary between 3-4 sentences</li>
                    <li>• Tailor your resume for each job application</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};