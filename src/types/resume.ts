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
  jobTitle?: string;
  company?: string;
  experienceLevel?: string;
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