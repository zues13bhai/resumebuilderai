import React from 'react';
import { Target, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { ResumeData, JobAnalysis } from '../types/resume';
import { calculateATSScore } from '../utils/atsOptimizer';

interface ATSScoreCardProps {
  resumeData: ResumeData;
  jobAnalysis?: JobAnalysis;
}

export const ATSScoreCard: React.FC<ATSScoreCardProps> = ({ resumeData, jobAnalysis }) => {
  const score = jobAnalysis ? calculateATSScore(resumeData, jobAnalysis) : 0;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-amber-100';
    return 'bg-red-100';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (score >= 60) return <TrendingUp className="w-5 h-5 text-amber-600" />;
    return <AlertCircle className="w-5 h-5 text-red-600" />;
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return 'Excellent! Your resume is well-optimized for ATS systems.';
    if (score >= 60) return 'Good! Consider adding more relevant keywords and skills.';
    return 'Needs improvement. Add more job-relevant content and keywords.';
  };

  const recommendations = [
    {
      condition: !resumeData.personalInfo.fullName || !resumeData.personalInfo.email,
      message: 'Complete your contact information'
    },
    {
      condition: resumeData.experience.length === 0,
      message: 'Add your professional experience'
    },
    {
      condition: resumeData.coreCompetencies.length < 5,
      message: 'Add more relevant skills (aim for 8-12)'
    },
    {
      condition: resumeData.professionalSummary.length < 100,
      message: 'Expand your professional summary'
    },
    {
      condition: jobAnalysis && resumeData.coreCompetencies.filter(skill => 
        jobAnalysis.requiredSkills.some(reqSkill => 
          skill.toLowerCase().includes(reqSkill.toLowerCase())
        )
      ).length < 3,
      message: 'Include more skills from the job description'
    }
  ].filter(rec => rec.condition);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <Target className="w-5 h-5 text-indigo-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">ATS Optimization Score</h2>
      </div>

      <div className={`p-4 rounded-lg ${getScoreBgColor(score)} mb-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {getScoreIcon(score)}
            <div className="ml-3">
              <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                {score}/100
              </div>
              <div className={`text-sm ${getScoreColor(score)}`}>
                ATS Compatibility Score
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`w-16 h-16 rounded-full ${getScoreBgColor(score)} border-4 ${
              score >= 80 ? 'border-green-600' : score >= 60 ? 'border-amber-600' : 'border-red-600'
            } flex items-center justify-center`}>
              <span className={`text-lg font-bold ${getScoreColor(score)}`}>
                {score}%
              </span>
            </div>
          </div>
        </div>
        
        <p className={`mt-2 text-sm ${getScoreColor(score)}`}>
          {getScoreMessage(score)}
        </p>
      </div>

      {recommendations.length > 0 && (
        <div>
          <h3 className="font-medium text-gray-800 mb-2">Recommendations to Improve:</h3>
          <ul className="space-y-1">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start text-sm text-gray-600">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {rec.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!jobAnalysis && (
        <div className="mt-4 p-3 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Analyze a job description above to get a more accurate ATS score 
            and personalized optimization recommendations.
          </p>
        </div>
      )}
    </div>
  );
};