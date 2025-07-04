import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { 
  Save, 
  Download, 
  Share2, 
  Sparkles, 
  Target, 
  Eye,
  Settings,
  Palette,
  FileText,
  Zap,
  Crown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useResume } from '../contexts/ResumeContext';
import { useAuth } from '../hooks/useAuth';
import { ResumeData } from '../types/resume';
import { PersonalInfoForm } from '../components/forms/PersonalInfoForm';
import { ProfessionalSummaryForm } from '../components/forms/ProfessionalSummaryForm';
import { ExperienceForm } from '../components/forms/ExperienceForm';
import { SkillsForm } from '../components/forms/SkillsForm';
import { EducationForm } from '../components/forms/EducationForm';
import { ProjectsForm } from '../components/forms/ProjectsForm';
import { CertificationsForm } from '../components/forms/CertificationsForm';
import { ResumePreview } from '../components/preview/ResumePreview';
import { AIAssistant } from '../components/ai/AIAssistant';
import { TemplateSelector } from '../components/templates/TemplateSelector';
import { JobMatcher } from '../components/ai/JobMatcher';
import toast from 'react-hot-toast';

const sections = [
  { id: 'personal', title: 'Personal Info', icon: FileText, component: PersonalInfoForm },
  { id: 'summary', title: 'Summary', icon: FileText, component: ProfessionalSummaryForm },
  { id: 'experience', title: 'Experience', icon: FileText, component: ExperienceForm },
  { id: 'skills', title: 'Skills', icon: Target, component: SkillsForm },
  { id: 'education', title: 'Education', icon: FileText, component: EducationForm },
  { id: 'projects', title: 'Projects', icon: FileText, component: ProjectsForm },
  { id: 'certifications', title: 'Certifications', icon: FileText, component: CertificationsForm },
];

export const ResumeBuilder: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { currentResume, setCurrentResume, saveResume, resumes } = useResume();
  const [activeSection, setActiveSection] = useState('personal');
  const [showAI, setShowAI] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showJobMatcher, setShowJobMatcher] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData>({
    id: id || Date.now().toString(),
    title: 'My Resume',
    template: 'modern',
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
    projects: [],
    customSections: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  useEffect(() => {
    if (id && resumes.length > 0) {
      const existingResume = resumes.find(r => r.id === id);
      if (existingResume) {
        setResumeData(existingResume);
        setCurrentResume(existingResume);
      }
    }
  }, [id, resumes, setCurrentResume]);

  const handleSave = () => {
    const updatedResume = {
      ...resumeData,
      updatedAt: new Date().toISOString()
    };
    setResumeData(updatedResume);
    saveResume(updatedResume);
    toast.success('Resume saved successfully!');
  };

  const handleExport = () => {
    if (user?.plan === 'free') {
      toast.error('Export feature requires Premium subscription');
      return;
    }
    toast.success('Exporting resume as PDF...');
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/resume/${resumeData.id}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Resume link copied to clipboard!');
  };

  const currentSectionIndex = sections.findIndex(s => s.id === activeSection);
  const CurrentSectionComponent = sections[currentSectionIndex]?.component;

  const nextSection = () => {
    if (currentSectionIndex < sections.length - 1) {
      setActiveSection(sections[currentSectionIndex + 1].id);
    }
  };

  const prevSection = () => {
    if (currentSectionIndex > 0) {
      setActiveSection(sections[currentSectionIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={resumeData.title}
                onChange={(e) => setResumeData(prev => ({ ...prev, title: e.target.value }))}
                className="text-lg font-semibold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1"
                placeholder="Resume Title"
              />
              <span className="text-sm text-gray-500">
                Last saved: {new Date(resumeData.updatedAt).toLocaleTimeString()}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowJobMatcher(true)}
                className="flex items-center px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                <Target className="w-4 h-4 mr-2" />
                Job Match
                {user?.plan === 'free' && <Crown className="w-3 h-3 ml-1" />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAI(true)}
                className="flex items-center px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                AI Assistant
                {user?.plan === 'free' && <Crown className="w-3 h-3 ml-1" />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowTemplates(true)}
                className="flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <Palette className="w-4 h-4 mr-2" />
                Templates
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExport}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Form */}
          <div className="space-y-6">
            {/* Section Navigation */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Resume Sections
                </h2>
                <div className="text-sm text-gray-500">
                  {currentSectionIndex + 1} of {sections.length}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <section.icon className="w-4 h-4 mx-auto mb-1" />
                    {section.title}
                  </button>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={prevSection}
                  disabled={currentSectionIndex === 0}
                  className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-800 dark:hover:text-gray-200"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>
                <button
                  onClick={nextSection}
                  disabled={currentSectionIndex === sections.length - 1}
                  className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>

            {/* Current Section Form */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg"
              >
                {CurrentSectionComponent && (
                  <CurrentSectionComponent
                    data={resumeData}
                    onChange={setResumeData}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:sticky lg:top-32 lg:h-[calc(100vh-8rem)]">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg h-full">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    Live Preview
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">ATS Score:</span>
                    <span className="text-sm font-semibold text-green-600">85%</span>
                  </div>
                </div>
              </div>
              <div className="p-4 h-[calc(100%-4rem)] overflow-auto">
                <ResumePreview resumeData={resumeData} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Modal */}
      <AnimatePresence>
        {showAI && (
          <AIAssistant
            resumeData={resumeData}
            onUpdate={setResumeData}
            onClose={() => setShowAI(false)}
          />
        )}
      </AnimatePresence>

      {/* Template Selector Modal */}
      <AnimatePresence>
        {showTemplates && (
          <TemplateSelector
            currentTemplate={resumeData.template}
            onSelect={(template) => {
              setResumeData(prev => ({ ...prev, template }));
              setShowTemplates(false);
            }}
            onClose={() => setShowTemplates(false)}
          />
        )}
      </AnimatePresence>

      {/* Job Matcher Modal */}
      <AnimatePresence>
        {showJobMatcher && (
          <JobMatcher
            resumeData={resumeData}
            onUpdate={setResumeData}
            onClose={() => setShowJobMatcher(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};