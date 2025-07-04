import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles, Target, Zap } from 'lucide-react';
import { ResumeData } from '../../types/resume';
import { useAuth } from '../../hooks/useAuth';

interface ProfessionalSummaryFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const ProfessionalSummaryForm: React.FC<ProfessionalSummaryFormProps> = ({ data, onChange }) => {
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleChange = (value: string) => {
    onChange({ ...data, professionalSummary: value });
  };

  const generateAISummary = async () => {
    if (user?.plan === 'free') {
      alert('AI features require Premium subscription');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const aiSummary = `Results-driven ${data.experience[0]?.position || 'professional'} with ${data.experience.length}+ years of experience in delivering high-impact solutions. Proven track record of ${data.experience[0]?.achievements[0] || 'driving business growth'} through innovative approaches and strategic thinking. Expertise in ${data.coreCompetencies.slice(0, 3).join(', ')} with strong leadership and communication skills.`;
      
      handleChange(aiSummary);
      setIsGenerating(false);
    }, 2000);
  };

  const getSuggestions = () => {
    const suggestions = [
      "Start with your years of experience and key role",
      "Highlight your most impressive achievement with numbers",
      "Mention 2-3 core skills relevant to your target role",
      "Include industry-specific keywords",
      "End with your career objective or value proposition"
    ];
    setSuggestions(suggestions);
  };

  const wordCount = data.professionalSummary.split(' ').filter(word => word.length > 0).length;
  const charCount = data.professionalSummary.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FileText className="w-6 h-6 text-indigo-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Professional Summary</h2>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={getSuggestions}
            className="flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
          >
            <Target className="w-4 h-4 mr-2" />
            Tips
          </button>
          
          <button
            onClick={generateAISummary}
            disabled={isGenerating}
            className="flex items-center px-3 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all text-sm disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                AI Generate
              </>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Write a compelling 3-4 sentence summary that highlights your key qualifications
          </label>
          <textarea
            value={data.professionalSummary}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none transition-all duration-200"
            placeholder="Results-driven professional with X+ years of experience in [industry]. Expertise in [key skills] with a proven track record of [achievements]. Strong background in [relevant areas] with excellent problem-solving abilities and leadership skills."
          />
          
          <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
            <span>{wordCount} words • {charCount} characters</span>
            <span className={`${charCount > 500 ? 'text-red-500' : charCount > 400 ? 'text-yellow-500' : 'text-green-500'}`}>
              Optimal: 300-500 characters
            </span>
          </div>
        </div>

        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4"
          >
            <h3 className="font-medium text-yellow-900 dark:text-yellow-400 mb-2 flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Writing Tips
            </h3>
            <ul className="text-sm text-yellow-800 dark:text-yellow-300 space-y-1">
              {suggestions.map((suggestion, index) => (
                <li key={index}>• {suggestion}</li>
              ))}
            </ul>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-medium text-green-900 dark:text-green-400 mb-2">✅ Good Example</h4>
            <p className="text-sm text-green-800 dark:text-green-300">
              "Results-driven Software Engineer with 5+ years developing scalable web applications. 
              Increased system performance by 40% and led teams of 8+ developers."
            </p>
          </div>
          
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="font-medium text-red-900 dark:text-red-400 mb-2">❌ Avoid</h4>
            <p className="text-sm text-red-800 dark:text-red-300">
              "Hardworking individual seeking opportunities to grow and learn in a dynamic environment."
            </p>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-medium text-blue-900 dark:text-blue-400 mb-2">💡 Keywords</h4>
            <p className="text-sm text-blue-800 dark:text-blue-300">
              Include industry terms, technical skills, and action words that match your target role.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};