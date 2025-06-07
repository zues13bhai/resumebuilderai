import React, { useState } from 'react';
import { FileText, Sparkles } from 'lucide-react';
import { ResumeData, JobAnalysis } from './types/resume';
import { JobDescriptionAnalyzer } from './components/JobDescriptionAnalyzer';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { ProfessionalSummaryForm } from './components/ProfessionalSummaryForm';
import { ExperienceForm } from './components/ExperienceForm';
import { SkillsForm } from './components/SkillsForm';
import { ATSScoreCard } from './components/ATSScoreCard';
import { ResumePreview } from './components/ResumePreview';

function App() {
  const [jobAnalysis, setJobAnalysis] = useState<JobAnalysis | undefined>();
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: ''
    },
    professionalSummary: '',
    coreCompetencies: [],
    experience: [],
    education: [],
    certifications: [],
    projects: []
  });

  const updatePersonalInfo = (personalInfo: typeof resumeData.personalInfo) => {
    setResumeData(prev => ({ ...prev, personalInfo }));
  };

  const updateProfessionalSummary = (professionalSummary: string) => {
    setResumeData(prev => ({ ...prev, professionalSummary }));
  };

  const updateExperience = (experience: typeof resumeData.experience) => {
    setResumeData(prev => ({ ...prev, experience }));
  };

  const updateSkills = (coreCompetencies: string[]) => {
    setResumeData(prev => ({ ...prev, coreCompetencies }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-gray-900">Resume Builder AI</h1>
                  <p className="text-sm text-gray-500">ATS-Optimized Resume Creation</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm text-gray-600">AI-Powered Optimization</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            <JobDescriptionAnalyzer onAnalysisComplete={setJobAnalysis} />
            
            <PersonalInfoForm 
              data={resumeData.personalInfo}
              onChange={updatePersonalInfo}
            />
            
            <ProfessionalSummaryForm
              summary={resumeData.professionalSummary}
              onChange={updateProfessionalSummary}
              resumeData={resumeData}
              jobAnalysis={jobAnalysis}
            />
            
            <SkillsForm
              skills={resumeData.coreCompetencies}
              onChange={updateSkills}
              jobAnalysis={jobAnalysis}
            />
            
            <ExperienceForm
              experiences={resumeData.experience}
              onChange={updateExperience}
            />
          </div>

          {/* Right Column - Preview & Score */}
          <div className="space-y-6">
            <ATSScoreCard 
              resumeData={resumeData}
              jobAnalysis={jobAnalysis}
            />
            
            <ResumePreview resumeData={resumeData} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Built with ❤️ for job seekers worldwide • ATS-Optimized • AI-Powered
            </p>
            <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-500">
              <span>✓ ATS-Friendly Format</span>
              <span>✓ Real-time Optimization</span>
              <span>✓ Professional Templates</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;