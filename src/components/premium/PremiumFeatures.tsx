import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, Zap, BarChart3, Palette, Crown } from 'lucide-react';
import { usePremium } from '../../contexts/PremiumContext';
import { PremiumFeatureGate } from './PremiumFeatureGate';

// AI Resume Enhancer Component
export const AIResumeEnhancer: React.FC<{ resumeData: any; onUpdate: (data: any) => void }> = ({ resumeData, onUpdate }) => {
  return (
    <PremiumFeatureGate feature="ai-resume-enhancer">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white"
      >
        <div className="flex items-center mb-4">
          <Sparkles className="w-6 h-6 mr-3" />
          <h3 className="text-lg font-semibold">AI Resume Enhancer</h3>
        </div>
        <p className="text-purple-100 mb-4">
          Get intelligent suggestions to improve your resume content, formatting, and ATS compatibility.
        </p>
        <div className="space-y-3">
          <button className="w-full bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg transition-colors">
            Enhance Professional Summary
          </button>
          <button className="w-full bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg transition-colors">
            Optimize Experience Bullets
          </button>
          <button className="w-full bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg transition-colors">
            Improve Skills Section
          </button>
        </div>
      </motion.div>
    </PremiumFeatureGate>
  );
};

// Grammar Fixer Component
export const GrammarFixer: React.FC<{ text: string; onFix: (fixedText: string) => void }> = ({ text, onFix }) => {
  return (
    <PremiumFeatureGate feature="grammar-fixer">
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <Zap className="w-5 h-5 text-green-600 mr-2" />
          <h4 className="font-medium text-green-900 dark:text-green-400">Grammar & Style Checker</h4>
        </div>
        <p className="text-green-800 dark:text-green-300 text-sm mb-3">
          AI-powered grammar and style improvements for professional writing.
        </p>
        <button
          onClick={() => onFix(text + ' [Enhanced by AI]')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
        >
          Fix Grammar & Style
        </button>
      </div>
    </PremiumFeatureGate>
  );
};

// Advanced Templates Component
export const AdvancedTemplates: React.FC = () => {
  return (
    <PremiumFeatureGate feature="advanced-templates">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {['Executive Elite', 'Creative Portfolio', 'Tech Innovator', 'Academic Scholar'].map((template, index) => (
          <motion.div
            key={template}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-indigo-500 to-purple-600 relative">
              <div className="absolute top-3 right-3">
                <Crown className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Palette className="w-12 h-12 text-white/50" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">{template}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Premium template</p>
            </div>
          </motion.div>
        ))}
      </div>
    </PremiumFeatureGate>
  );
};

// Resume Analytics Component
export const ResumeAnalytics: React.FC = () => {
  return (
    <PremiumFeatureGate feature="resume-analytics">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <BarChart3 className="w-6 h-6 text-indigo-600 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Resume Analytics</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[
            { label: 'Views', value: '247', change: '+12%' },
            { label: 'Downloads', value: '89', change: '+8%' },
            { label: 'ATS Score', value: '92%', change: '+5%' }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
              <div className="text-green-600 text-xs">{stat.change}</div>
            </div>
          ))}
        </div>
        
        <div className="h-32 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Analytics Chart Placeholder</p>
        </div>
      </div>
    </PremiumFeatureGate>
  );
};

// Theme Customization Component
export const ThemeCustomization: React.FC = () => {
  return (
    <PremiumFeatureGate feature="theme-customization">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Theme Customization
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Color Scheme
            </label>
            <div className="flex space-x-3">
              {['indigo', 'purple', 'blue', 'green', 'red'].map(color => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full bg-${color}-500 hover:scale-110 transition-transform`}
                />
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Font Family
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option>Arial</option>
              <option>Helvetica</option>
              <option>Times New Roman</option>
              <option>Calibri</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Layout Style
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Single Column
              </button>
              <button className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Two Column
              </button>
            </div>
          </div>
        </div>
      </div>
    </PremiumFeatureGate>
  );
};