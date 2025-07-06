import React, { useState, useEffect, useRef } from 'react';
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
  ChevronRight,
  Clock,
  CheckCircle,
  Bot
} from 'lucide-react';
import { useResume } from '../contexts/ResumeContext';
import { useAuth } from '../hooks/useAuth';
import { usePremium } from '../contexts/PremiumContext';
import { ResumeData } from '../types/resume';
import { PersonalInfoForm } from '../components/forms/PersonalInfoForm';
import { ProfessionalSummaryForm } from '../components/forms/ProfessionalSummaryForm';
import { ExperienceForm } from '../components/forms/ExperienceForm';
import { SkillsForm } from '../components/forms/SkillsForm';
import { EducationForm } from '../components/forms/EducationForm';
import { ProjectsForm } from '../components/forms/ProjectsForm';
import { CertificationsForm } from '../components/forms/CertificationsForm';
import { ResumePreviewEnhanced } from '../components/preview/ResumePreviewEnhanced';
import { AIAssistantAdvanced } from '../components/ai/AIAssistantAdvanced';
import { TemplateSelector } from '../components/templates/TemplateSelector';
import { JobMatcherEnhanced } from '../components/ai/JobMatcherEnhanced';
import { saveResumeData, AutoSave, createVersionSnapshot } from '../utils/saveUtils';
import { exportToPDF } from '../utils/exportUtils';
import { copyShareableLink } from '../utils/shareUtils';
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

export const ResumeBuilderEnhanced: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { isPremium } = usePremium();
  const { currentResume, setCurrentResume, saveResume, resumes } = useResume();
  const [activeSection, setActiveSection] = useState('personal');
  const [showAI, setShowAI] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showJobMatcher, setShowJobMatcher] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const autoSaveRef = useRef<AutoSave>(new AutoSave());
  
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

  // Load existing resume data
  useEffect(() => {
    if (id && resumes.length > 0) {
      const existingResume = resumes.find(r => r.id === id);
      if (existingResume) {
        setResumeData(existingResume);
        setCurrentResume(existingResume);
        setLastSaved(new Date(existingResume.updatedAt));
      }
    }
  }, [id, resumes, setCurrentResume]);

  // Auto-save functionality
  useEffect(() => {
    const autoSave = autoSaveRef.current;
    autoSave.start(() => resumeData);
    
    return () => {
      autoSave.stop();
    };
  }, [resumeData]);

  // Track unsaved changes
  useEffect(() => {
    if (lastSaved) {
      const hasChanges = new Date(resumeData.updatedAt) > lastSaved;
      setHasUnsavedChanges(hasChanges);
    }
  }, [resumeData.updatedAt, lastSaved]);

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      const updatedResume = {
        ...resumeData,
        updatedAt: new Date().toISOString()
      };
      
      setResumeData(updatedResume);
      
      // Save to localStorage
      const success = saveResumeData(updatedResume);
      
      if (success) {
        // Save to context
        saveResume(updatedResume);
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
        
        // Create version snapshot
        createVersionSnapshot(updatedResume);
        
        toast.success('Resume saved successfully!', {
          icon: '✅',
          duration: 2000,
        });
      }
    } catch (error) {
      console.error('Save failed:', error);
      toast.error('Failed to save resume. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // 🧠 AI Assistant Start - Remove premium restrictions for export
  const handleExport = async () => {
    try {
      await exportToPDF(resumeData);
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Export failed. Please try again.');
    }
  };
  // 🧠 AI Assistant End

  const handleShare = async () => {
    try {
      const success = await copyShareableLink(resumeData);
      if (success) {
        toast.success('Shareable link copied to clipboard!', {
          icon: '🔗',
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Share failed:', error);
      toast.error('Failed to generate share link. Please try again.');
    }
  };

  const handleDataChange = (newData: ResumeData) => {
    const updatedData = {
      ...newData,
      updatedAt: new Date().toISOString()
    };
    setResumeData(updatedData);
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

  const getSectionCompletionStatus = (sectionId: string): boolean => {
    switch (sectionId) {
      case 'personal':
        return !!(resumeData.personalInfo.fullName && resumeData.personalInfo.email);
      case 'summary':
        return resumeData.professionalSummary.length > 50;
      case 'experience':
        return resumeData.experience.length > 0;
      case 'skills':
        return resumeData.coreCompetencies.length > 0;
      case 'education':
        return resumeData.education.length > 0;
      case 'projects':
        return resumeData.projects.length > 0;
      case 'certifications':
        return resumeData.certifications.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Enhanced Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={resumeData.title}
                onChange={(e) => handleDataChange({ ...resumeData, title: e.target.value })}
                className="text-lg font-semibold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1 text-gray-900 dark:text-white"
                placeholder="Resume Title"
              />
              
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                {isSaving ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-indigo-600 mr-1"></div>
                    Saving...
                  </div>
                ) : lastSaved ? (
                  <div className="flex items-center">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                    Saved {lastSaved.toLocaleTimeString()}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    Not saved
                  </div>
                )}
                
                {hasUnsavedChanges && (
                  <span className="text-amber-500">• Unsaved changes</span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* 🧠 AI Assistant Start - Remove premium restrictions */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowJobMatcher(true)}
                className="flex items-center px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                <Target className="w-4 h-4 mr-2" />
                Job Match
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAI(true)}
                className="flex items-center px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
              >
                <Bot className="w-4 h-4 mr-2" />
                AI Assistant
              </motion.button>
              {/* 🧠 AI Assistant End */}

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
                disabled={isSaving}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
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
            {/* Enhanced Section Navigation */}
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
                {sections.map((section, index) => {
                  const isCompleted = getSectionCompletionStatus(section.id);
                  const isActive = activeSection === section.id;
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all relative ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <section.icon className="w-4 h-4 mx-auto mb-1" />
                      {section.title}
                      {isCompleted && (
                        <CheckCircle className="w-3 h-3 absolute -top-1 -right-1 text-green-500 bg-white rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={prevSection}
                  disabled={currentSectionIndex === 0}
                  className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>
                <button
                  onClick={nextSection}
                  disabled={currentSectionIndex === sections.length - 1}
                  className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
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
                    onChange={handleDataChange}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Panel - Enhanced Preview */}
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
                <ResumePreviewEnhanced 
                  resumeData={resumeData} 
                  showActions={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modals - All accessible */}
      <AnimatePresence>
        {showAI && (
          <AIAssistantAdvanced
            resumeData={resumeData}
            onUpdate={handleDataChange}
            onClose={() => setShowAI(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTemplates && (
          <TemplateSelector
            currentTemplate={resumeData.template}
            onSelect={(template) => {
              handleDataChange({ ...resumeData, template });
              setShowTemplates(false);
              toast.success('Template applied successfully!');
            }}
            onClose={() => setShowTemplates(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showJobMatcher && (
          <JobMatcherEnhanced
            resumeData={resumeData}
            onUpdate={handleDataChange}
            onClose={() => setShowJobMatcher(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};