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

  useEffect(() => {
    const autoSave = autoSaveRef.current;
    autoSave.start(() => resumeData);

    return () => {
      autoSave.stop();
    };
  }, [resumeData]);

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
      const success = saveResumeData(updatedResume);

      if (success) {
        saveResume(updatedResume);
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
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
    <>
      {/* UI content and layout structure here */}
    </>
  );
};
