export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  portfolio?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
  gpa?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  professionalSummary: string;
  coreCompetencies: string[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  projects: Project[];
}

export interface JobAnalysis {
  keywords: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  industryTerms: string[];
  softSkills: string[];
}