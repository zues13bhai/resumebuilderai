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

  const handleExport = async () => {
    try {
      await exportToPDF(resumeData);
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Export failed. Please try again.');
    }
  };

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
    {/* 🌟 UI Upgrade Start */}
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      {/* Enhanced Header */}
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={resumeData.title}
                onChange={(e) => handleDataChange({ ...resumeData, title: e.target.value })}
                className="text-lg font-bold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-3 py-2 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
                placeholder="Resume Title"
              />
              
              <div className="flex items-center space-x-3 text-sm text-gray-500">
                {isSaving ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full"
                  >
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-indigo-600 mr-2"></div>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">Saving...</span>
                  </motion.div>
                ) : lastSaved ? (
                  <div className="flex items-center bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      Saved {lastSaved.toLocaleTimeString()}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center bg-gray-50 dark:bg-gray-700 px-3 py-1.5 rounded-full">
                    <Clock className="w-3 h-3 mr-2" />
                    <span className="font-medium">Not saved</span>
                  </div>
                )}
                
                {hasUnsavedChanges && (
                  <span className="text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-full font-medium">
                    • Unsaved changes
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowJobMatcher(true)}
                className="flex items-center px-4 py-2.5 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all font-medium"
              >
                <Target className="w-4 h-4 mr-2" />
                Job Match
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAI(true)}
                className="flex items-center px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all font-medium"
              >
                <Bot className="w-4 h-4 mr-2" />
                AI Assistant
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowTemplates(true)}
                className="flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all font-medium"
              >
                <Palette className="w-4 h-4 mr-2" />
                Templates
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-50 font-semibold"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExport}
                className="flex items-center px-5 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:shadow-lg hover:shadow-gray-500/25 transition-all font-semibold"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="flex items-center px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all font-semibold"
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
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Resume Sections
                </h2>
                <div className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full font-medium">
                  {currentSectionIndex + 1} of {sections.length}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {sections.map((section, index) => {
                  const isCompleted = getSectionCompletionStatus(section.id);
                  const isActive = activeSection === section.id;
                  
                  return (
                    <motion.button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 rounded-2xl text-sm font-semibold transition-all duration-300 relative ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md'
                      }`}
                    >
                      <section.icon className="w-5 h-5 mx-auto mb-2" />
                      {section.title}
                      {isCompleted && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 bg-white rounded-full" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevSection}
                  disabled={currentSectionIndex === 0}
                  className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-800 dark:hover:text-gray-200 transition-all duration-200 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 font-medium"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextSection}
                  disabled={currentSectionIndex === sections.length - 1}
                  className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-800 dark:hover:text-gray-200 transition-all duration-200 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 font-medium"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </motion.button>
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
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50"
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
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl h-full border border-gray-200/50 dark:border-gray-700/50">
              <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 dark:text-white flex items-center text-lg">
                    <Eye className="w-5 h-5 mr-3" />
                    Live Preview
                  </h3>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500 font-medium">ATS Score:</span>
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1.5 rounded-full">
                      <span className="text-sm font-bold">85%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 h-[calc(100%-5rem)] overflow-auto">
                <ResumePreviewEnhanced 
                  resumeData={resumeData} 
                  showActions={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modals */}
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
    {/* 🌟 UI Upgrade End */}
  );
};