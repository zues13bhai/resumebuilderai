import React, { useState, useEffect } from 'react';
import { FileText, Sparkles } from 'lucide-react';
import { ResumeData, JobAnalysis } from '../types/resume';
import { generateOptimizedSummary } from '../utils/atsOptimizer';

interface ProfessionalSummaryFormProps {
  summary: string;
  onChange: (summary: string) => void;
  resumeData?: ResumeData;
  jobAnalysis?: JobAnalysis;
}

export const ProfessionalSummaryForm: React.FC<ProfessionalSummaryFormProps> = ({
  summary,
  onChange,
  resumeData,
  jobAnalysis
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateOptimized = async () => {
    if (!resumeData || !jobAnalysis) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      const optimizedSummary = generateOptimizedSummary(resumeData, jobAnalysis);
      onChange(optimizedSummary);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FileText className="w-5 h-5 text-indigo-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Professional Summary</h2>
        </div>
        
        {resumeData && jobAnalysis && (
          <button
            onClick={handleGenerateOptimized}
            disabled={isGenerating}
            className="flex items-center px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm rounded-md hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 transition-all duration-200"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3 mr-1" />
                AI Optimize
              </>
            )}
          </button>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Write a compelling 3-4 line summary highlighting your key qualifications
        </label>
        <textarea
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
          placeholder="Results-driven professional with X+ years of experience in [industry]. Expertise in [key skills] with a proven track record of [achievements]. Strong background in [relevant areas] with excellent problem-solving abilities."
        />
        <div className="mt-2 text-xs text-gray-500">
          {summary.length}/500 characters • Keep it concise and impactful
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>ATS Tip:</strong> Include 2-3 keywords from the job description naturally in your summary. 
          Focus on quantifiable achievements and relevant skills.
        </p>
      </div>
    </div>
  );
};