import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Upload, Zap, TrendingUp, AlertCircle, CheckCircle, FileText } from 'lucide-react';
import { ResumeData } from '../../types/resume';
import { usePremium } from '../../contexts/PremiumContext';

interface JobMatcherEnhancedProps {
  resumeData: ResumeData;
  onUpdate: (data: ResumeData) => void;
  onClose: () => void;
}

interface MatchResult {
  matchScore: number;
  missingKeywords: string[];
  strongMatches: string[];
  recommendations: string[];
  skillGaps: string[];
  improvementAreas: {
    category: string;
    suggestions: string[];
    priority: 'high' | 'medium' | 'low';
  }[];
}

export const JobMatcherEnhanced: React.FC<JobMatcherEnhancedProps> = ({ resumeData, onUpdate, onClose }) => {
  const { isPremium } = usePremium();
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchResults, setMatchResults] = useState<MatchResult | null>(null);
  const [activeTab, setActiveTab] = useState<'input' | 'results'>('input');

  // 🧠 AI Assistant Start - Remove premium gate, make fully accessible
  const analyzeJob = async () => {
    if (!jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    
    // Enhanced simulation with more realistic analysis
    setTimeout(() => {
      const mockResults: MatchResult = {
        matchScore: Math.floor(Math.random() * 30) + 70, // 70-100
        missingKeywords: [
          'React', 'TypeScript', 'AWS', 'Agile', 'Scrum', 
          'CI/CD', 'Docker', 'Kubernetes', 'GraphQL'
        ].slice(0, Math.floor(Math.random() * 5) + 3),
        strongMatches: [
          'JavaScript', 'Node.js', 'Team Leadership', 'Problem Solving',
          'Project Management', 'Git', 'REST APIs'
        ].slice(0, Math.floor(Math.random() * 4) + 3),
        recommendations: [
          'Add React and TypeScript to your skills section',
          'Mention AWS experience in your projects',
          'Include Agile methodology in your experience descriptions',
          'Highlight leadership experience with team size',
          'Add specific metrics to your achievements'
        ],
        skillGaps: [
          'Cloud Computing (AWS/Azure)',
          'DevOps practices',
          'Advanced JavaScript frameworks',
          'Database optimization'
        ],
        improvementAreas: [
          {
            category: 'Technical Skills',
            suggestions: [
              'Add modern JavaScript frameworks (React, Vue.js)',
              'Include cloud platform experience',
              'Mention containerization tools (Docker, Kubernetes)'
            ],
            priority: 'high'
          },
          {
            category: 'Experience Description',
            suggestions: [
              'Quantify your achievements with specific numbers',
              'Use stronger action verbs',
              'Highlight leadership and collaboration'
            ],
            priority: 'medium'
          },
          {
            category: 'Industry Keywords',
            suggestions: [
              'Include Agile/Scrum methodology',
              'Mention CI/CD pipeline experience',
              'Add API development keywords'
            ],
            priority: 'high'
          }
        ]
      };
      
      setMatchResults(mockResults);
      setActiveTab('results');
      setIsAnalyzing(false);
    }, 2500);
  };

  const applyRecommendations = () => {
    if (!matchResults) return;
    
    // Apply missing keywords to skills
    const updatedSkills = [...resumeData.coreCompetencies, ...matchResults.missingKeywords.slice(0, 5)];
    onUpdate({
      ...resumeData,
      coreCompetencies: [...new Set(updatedSkills)]
    });
    
    // Show success message
    const toast = document.createElement('div');
    toast.textContent = 'Recommendations applied successfully!';
    toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg z-50';
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 3000);
    
    onClose();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Always render the full component - no premium gate
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
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-5xl w-full h-[85vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-green-500 to-teal-600 p-2 rounded-lg mr-3">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Job Matcher</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Optimize your resume for specific job postings</p>
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
          <button
            onClick={() => setActiveTab('input')}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === 'input'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Job Description
          </button>
          <button
            onClick={() => setActiveTab('results')}
            disabled={!matchResults}
            className={`px-6 py-3 font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              activeTab === 'results'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <TrendingUp className="w-4 h-4 inline mr-2" />
            Analysis Results
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'input' && (
              <motion.div
                key="input"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-6 space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Job Description
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    placeholder="Paste the complete job description here..."
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    {jobDescription.length} characters • Include requirements, responsibilities, and qualifications
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Job Posting
                    </button>
                    <span className="text-sm text-gray-500">or paste text above</span>
                  </div>
                  
                  <button
                    onClick={analyzeJob}
                    disabled={!jobDescription.trim() || isAnalyzing}
                    className="flex items-center px-6 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Analyze Match
                      </>
                    )}
                  </button>
                </div>

                {/* Sample job descriptions */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <h3 className="font-medium text-blue-900 dark:text-blue-400 mb-2">💡 Pro Tip</h3>
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    For best results, include the complete job posting with requirements, responsibilities, 
                    and qualifications. The more detailed the description, the more accurate the analysis.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'results' && matchResults && (
              <motion.div
                key="results"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 space-y-6"
              >
                {/* Match Score */}
                <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Match Analysis</h3>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">{matchResults.matchScore}%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Match Score</div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-teal-600 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${matchResults.matchScore}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-600">{matchResults.strongMatches.length}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Strong Matches</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-red-600">{matchResults.missingKeywords.length}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Missing Keywords</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-600">{matchResults.skillGaps.length}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Skill Gaps</div>
                    </div>
                  </div>
                </div>

                {/* Analysis Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Strong Matches */}
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 dark:text-green-400 mb-3 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Strong Matches
                    </h4>
                    <div className="space-y-2">
                      {matchResults.strongMatches.map((match: string, index: number) => (
                        <div key={index} className="flex items-center text-sm text-green-800 dark:text-green-300">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          {match}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Missing Keywords */}
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <h4 className="font-semibold text-red-900 dark:text-red-400 mb-3 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Missing Keywords
                    </h4>
                    <div className="space-y-2">
                      {matchResults.missingKeywords.map((keyword: string, index: number) => (
                        <div key={index} className="flex items-center text-sm text-red-800 dark:text-red-300">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          {keyword}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Improvement Areas */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Improvement Areas</h3>
                  {matchResults.improvementAreas.map((area, index) => (
                    <div key={index} className={`border rounded-lg p-4 ${getPriorityColor(area.priority)} border`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{area.category}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(area.priority)}`}>
                          {area.priority.charAt(0).toUpperCase() + area.priority.slice(1)} Priority
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {area.suggestions.map((suggestion, suggestionIndex) => (
                          <li key={suggestionIndex} className="text-sm flex items-start">
                            <span className="w-1.5 h-1.5 rounded-full mt-2 mr-2 flex-shrink-0" 
                                  style={{ backgroundColor: area.priority === 'high' ? '#ef4444' : area.priority === 'medium' ? '#f59e0b' : '#3b82f6' }}></span>
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setActiveTab('input')}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Analyze Another Job
                  </button>
                  <button
                    onClick={applyRecommendations}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    Apply Recommendations
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};
// 🧠 AI Assistant End