import React, { createContext, useContext, useState } from 'react';
import { ResumeData } from '../types/resume';

interface ResumeContextType {
  currentResume: ResumeData | null;
  resumes: ResumeData[];
  setCurrentResume: (resume: ResumeData) => void;
  saveResume: (resume: ResumeData) => void;
  deleteResume: (id: string) => void;
  duplicateResume: (id: string) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentResume, setCurrentResume] = useState<ResumeData | null>(null);
  const [resumes, setResumes] = useState<ResumeData[]>([]);

  const saveResume = (resume: ResumeData) => {
    setResumes(prev => {
      const existing = prev.find(r => r.id === resume.id);
      if (existing) {
        return prev.map(r => r.id === resume.id ? resume : r);
      }
      return [...prev, resume];
    });
    setCurrentResume(resume);
  };

  const deleteResume = (id: string) => {
    setResumes(prev => prev.filter(r => r.id !== id));
    if (currentResume?.id === id) {
      setCurrentResume(null);
    }
  };

  const duplicateResume = (id: string) => {
    const resume = resumes.find(r => r.id === id);
    if (resume) {
      const duplicated = {
        ...resume,
        id: Date.now().toString(),
        title: `${resume.title} (Copy)`,
        updatedAt: new Date().toISOString()
      };
      setResumes(prev => [...prev, duplicated]);
    }
  };

  return (
    <ResumeContext.Provider value={{
      currentResume,
      resumes,
      setCurrentResume,
      saveResume,
      deleteResume,
      duplicateResume
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};