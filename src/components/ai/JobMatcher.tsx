import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Upload, Zap, TrendingUp, AlertCircle } from 'lucide-react';
import { ResumeData } from '../../types/resume';
import { usePremium } from '../../contexts/PremiumContext';

interface JobMatcherProps {
  resumeData: ResumeData;
  onUpdate: (data: ResumeData) => void;
  onClose: () => void;
}

export const JobMatcher: React.FC<JobMatcherProps> = ({ resumeData, onUpdate, onClose }) => {
  const { isPremium } = usePremium();
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchResults, setMatchResults] = useState<any>(null);

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
          <div className="bg-gradient-to-r from-green-500 to-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Job Matcher
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Analyze job descriptions and get personalized recommendations to optimize your resume for specific roles.
          </p>
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Zap className="w-4 h-4 mr-2 text-green-500" />
              Smart keyword matching
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
              Match score analysis
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Target className="w-4 h-4 mr-2 text-green-500" />
              Tailored suggestions
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  const analyzeJob = async () => {
    if (!jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setMatchResults({
        matchScore: 78,
        missingKeywords: ['React', 'TypeScript', 'AWS', 'Agile'],
        strongMatches: ['JavaScript', 'Node.js', 'Team Leadership'],
        recommendations: [
          'Add React and TypeScript to your skills section',
          'Mention AWS experience in your projects',
          'Include Agile methodology in your experience descriptions'
        ]
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const applyRecommendations = () => {
    if (!matchResults) return;
    
    // Apply missing keywords to skills
    const updatedSkills = [...resumeData.coreCompetencies, ...matchResults.missingKeywords];
    onUpdate({
      ...resumeData,
      coreCompetencies: [...new Set(updatedSkills)]
    });
    
    onClose();
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

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {!matchResults ? (
            <div className="space-y-6">
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
            </div>
          ) : (
            <div className="space-y-6">
              {/* Match Score */}
              <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Match Analysis</h3>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">{matchResults.matchScore}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Match Score</div>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-teal-600 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${matchResults.matchScore}%` }}
                  />
                </div>
              </div>

              {/* Analysis Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Strong Matches */}
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 dark:text-green-400 mb-3 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
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

              {/* Recommendations */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 dark:text-blue-400 mb-3">
                  Optimization Recommendations
                </h4>
                <div className="space-y-2">
                  {matchResults.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="flex items-start text-sm text-blue-800 dark:text-blue-300">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {rec}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setMatchResults(null)}
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
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};