import React, { useState } from 'react';
import { 
  FileText, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Target,
  Zap,
  ArrowRight,
  Download,
  Eye,
  BarChart3
} from 'lucide-react';
import { ATSAnalysisReport } from '../types/resume';

interface ATSAnalysisReportProps {
  report: ATSAnalysisReport;
}

export const ATSAnalysisReportComponent: React.FC<ATSAnalysisReportProps> = ({ report }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'recommendations' | 'comparison'>('overview');

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'Excellent': return 'text-green-600 bg-green-100';
      case 'Good': return 'text-blue-600 bg-blue-100';
      case 'Fair': return 'text-amber-600 bg-amber-100';
      case 'Poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const downloadReport = () => {
    // In a real implementation, this would generate a PDF report
    const reportData = {
      score: report.currentScore,
      grade: report.overallGrade,
      recommendations: report.prioritizedRecommendations,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ats-analysis-report.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">ATS Analysis Report</h2>
            <p className="text-indigo-100">Comprehensive resume optimization analysis</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{report.currentScore}/100</div>
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(report.overallGrade)}`}>
              {report.overallGrade}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'detailed', label: 'Detailed Analysis', icon: FileText },
            { id: 'recommendations', label: 'Recommendations', icon: Target },
            { id: 'comparison', label: 'Before/After', icon: TrendingUp }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Score Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Format Score</p>
                    <p className="text-2xl font-bold text-blue-900">{report.formatAnalysis.score}/100</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Keyword Score</p>
                    <p className="text-2xl font-bold text-green-900">{report.keywordAnalysis.score}/100</p>
                  </div>
                  <Target className="w-8 h-8 text-green-500" />
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">Content Score</p>
                    <p className="text-2xl font-bold text-purple-900">{report.contentAnalysis.score}/100</p>
                  </div>
                  <Zap className="w-8 h-8 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Quick Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Strengths
                </h3>
                <ul className="space-y-2">
                  {report.contentAnalysis.strengths.map((strength, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
                  Areas for Improvement
                </h3>
                <ul className="space-y-2">
                  {report.contentAnalysis.weaknesses.slice(0, 3).map((weakness, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Missing Elements Alert */}
            {report.missingElements.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-medium text-red-800">Critical Missing Elements</h3>
                    <p className="text-sm text-red-700 mt-1">
                      Your resume is missing: {report.missingElements.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'detailed' && (
          <div className="space-y-8">
            {/* Keyword Analysis */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Keyword Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Matched Keywords ({report.keywordAnalysis.matchedKeywords.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {report.keywordAnalysis.matchedKeywords.map((keyword, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        ✓ {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Missing Keywords ({report.keywordAnalysis.missingKeywords.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {report.keywordAnalysis.missingKeywords.slice(0, 10).map((keyword, index) => (
                      <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                        ✗ {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Keyword Density:</strong> {report.keywordAnalysis.keywordDensity}% 
                  (Recommended: 60-80%)
                </p>
              </div>
            </div>

            {/* Action Verbs & Power Words */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Suggested Action Verbs</h3>
                <div className="flex flex-wrap gap-2">
                  {report.suggestedActionVerbs.map((verb, index) => (
                    <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                      {verb}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Suggested Power Words</h3>
                <div className="flex flex-wrap gap-2">
                  {report.suggestedPowerWords.map((word, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Format Analysis */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Format Analysis</h3>
              {report.formatAnalysis.issues.length > 0 ? (
                <div className="space-y-3">
                  {report.formatAnalysis.issues.map((issue, index) => (
                    <div key={index} className="flex items-start p-3 bg-amber-50 border border-amber-200 rounded-md">
                      <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 mr-2" />
                      <div>
                        <p className="text-sm text-amber-800 font-medium">{issue}</p>
                        <p className="text-sm text-amber-700 mt-1">
                          {report.formatAnalysis.recommendations[index]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-md">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <p className="text-sm text-green-800">Your resume formatting appears ATS-friendly!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Prioritized Action Plan</h3>
              <button
                onClick={downloadReport}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </button>
            </div>
            
            <div className="space-y-4">
              {report.prioritizedRecommendations.map((rec, index) => (
                <div key={index} className={`border rounded-lg p-4 ${getPriorityColor(rec.priority)} border`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mr-3 ${getPriorityColor(rec.priority)}`}>
                          {rec.priority} Priority
                        </span>
                        <span className="text-sm font-medium text-gray-600">{rec.category}</span>
                      </div>
                      
                      <h4 className="font-medium text-gray-800 mb-2">{rec.issue}</h4>
                      <p className="text-sm text-gray-600 mb-2">{rec.solution}</p>
                      <p className="text-sm text-gray-500 italic">{rec.impact}</p>
                    </div>
                    
                    <ArrowRight className="w-5 h-5 text-gray-400 ml-4 mt-2" />
                  </div>
                </div>
              ))}
            </div>

            {/* Template Recommendation */}
            {report.templateRecommendation?.recommended && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">Template Recommendation</h4>
                <p className="text-sm text-blue-700 mb-2">{report.templateRecommendation.reason}</p>
                <p className="text-sm text-blue-600 font-medium">
                  Suggested: {report.templateRecommendation.suggestedTemplate}
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">Before vs. After Implementation</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-800 mb-3 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Current Issues
                </h4>
                <ul className="space-y-2">
                  {report.beforeAfterComparison.currentIssues.map((issue, index) => (
                    <li key={index} className="text-sm text-red-700 flex items-start">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-800 mb-3 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  After Implementation
                </h4>
                <ul className="space-y-2">
                  {report.beforeAfterComparison.proposedChanges.map((change, index) => (
                    <li key={index} className="text-sm text-green-700 flex items-start">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {change}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Score Projection */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Projected Score Improvement</h4>
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">{report.currentScore}</div>
                    <div className="text-sm text-gray-500">Current Score</div>
                  </div>
                  
                  <ArrowRight className="w-6 h-6 text-indigo-500" />
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {Math.min(report.currentScore + report.beforeAfterComparison.expectedScoreIncrease, 100)}
                    </div>
                    <div className="text-sm text-gray-500">Projected Score</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-xl font-bold text-indigo-600">
                      +{report.beforeAfterComparison.expectedScoreIncrease}
                    </div>
                    <div className="text-sm text-gray-500">Point Increase</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};