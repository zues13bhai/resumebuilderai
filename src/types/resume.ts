export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  portfolio?: string;
  website?: string;
  github?: string;
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
  skills?: string[];
  type?: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
  gpa?: string;
  honors?: string[];
  coursework?: string[];
  location?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  startDate?: string;
  endDate?: string;
  highlights?: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'language' | 'tool' | 'framework';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience?: number;
}

export interface CustomSection {
  id: string;
  title: string;
  type: 'text' | 'list' | 'achievements';
  content: string | string[];
  order: number;
}

export interface ResumeData {
  id: string;
  title: string;
  template: string;
  personalInfo: PersonalInfo;
  professionalSummary: string;
  coreCompetencies: string[];
  skills?: Skill[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  projects: Project[];
  customSections: CustomSection[];
  languages?: { name: string; proficiency: string }[];
  awards?: { name: string; issuer: string; date: string; description?: string }[];
  publications?: { title: string; publisher: string; date: string; url?: string }[];
  volunteer?: { organization: string; role: string; startDate: string; endDate?: string; description: string }[];
  createdAt: string;
  updatedAt: string;
  isPublic?: boolean;
  shareUrl?: string;
  atsScore?: number;
  viewCount?: number;
  downloadCount?: number;
}

export interface JobAnalysis {
  keywords: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  industryTerms: string[];
  softSkills: string[];
  jobTitle?: string;
  company?: string;
  experienceLevel?: string;
  salaryRange?: string;
  location?: string;
  matchScore?: number;
}

export interface ATSAnalysisReport {
  currentScore: number;
  maxPossibleScore: number;
  overallGrade: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  
  formatAnalysis: {
    score: number;
    issues: string[];
    recommendations: string[];
  };
  
  keywordAnalysis: {
    score: number;
    matchedKeywords: string[];
    missingKeywords: string[];
    keywordDensity: number;
    recommendations: string[];
  };
  
  contentAnalysis: {
    score: number;
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  };
  
  missingElements: string[];
  suggestedActionVerbs: string[];
  suggestedPowerWords: string[];
  
  prioritizedRecommendations: {
    priority: 'High' | 'Medium' | 'Low';
    category: string;
    issue: string;
    solution: string;
    impact: string;
  }[];
  
  beforeAfterComparison: {
    currentIssues: string[];
    proposedChanges: string[];
    expectedScoreIncrease: number;
  };
  
  templateRecommendation?: {
    recommended: boolean;
    reason: string;
    suggestedTemplate: string;
  };
}

export interface AIInsight {
  type: 'suggestion' | 'warning' | 'improvement' | 'achievement';
  title: string;
  description: string;
  action?: string;
  impact?: 'low' | 'medium' | 'high';
  category: string;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  premium: boolean;
  preview: string;
  description: string;
  features: string[];
  atsOptimized: boolean;
  industries: string[];
}