import React, { useState } from 'react';
import { Search, Target, TrendingUp } from 'lucide-react';
import { analyzeJobDescription, JobAnalysis } from '../utils/atsOptimizer';

interface JobDescriptionAnalyzerProps {
  onAnalysisComplete: (analysis: JobAnalysis) => void;
}

export const JobDescriptionAnalyzer: React.FC<JobDescriptionAnalyzerProps> = ({
  onAnalysisComplete
}) => {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<JobAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay for better UX
    setTimeout(() => {
      const result = analyzeJobDescription(jobDescription);
      setAnalysis(result);
      onAnalysisComplete(result);
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <Search className="w-5 h-5 text-indigo-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Job Description Analyzer</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-2">
            Paste the job description here to optimize your resume
          </label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            placeholder="Paste the complete job description here..."
          />
        </div>
        
        <button
          onClick={handleAnalyze}
          disabled={!jobDescription.trim() || isAnalyzing}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Analyzing...
            </>
          ) : (
            <>
              <Target className="w-4 h-4 mr-2" />
              Analyze Job Description
            </>
          )}
        </button>
        
        {analysis && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-3">
              <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
              <h3 className="font-medium text-gray-800">Analysis Results</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">Key Skills Found</h4>
                <div className="flex flex-wrap gap-1">
                  {analysis.requiredSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">Important Keywords</h4>
                <div className="flex flex-wrap gap-1">
                  {analysis.keywords.slice(0, 8).map((keyword, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-3 p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Tip:</strong> Make sure to include these keywords naturally throughout your resume, 
                especially in your professional summary and experience sections.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};