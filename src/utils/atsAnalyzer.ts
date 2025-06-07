import { ResumeData, JobAnalysis, ATSAnalysisReport } from '../types/resume';

// Comprehensive ATS action verbs categorized by function
const ACTION_VERBS = {
  leadership: ['Led', 'Managed', 'Directed', 'Supervised', 'Coordinated', 'Orchestrated', 'Spearheaded', 'Championed'],
  achievement: ['Achieved', 'Accomplished', 'Delivered', 'Exceeded', 'Surpassed', 'Attained', 'Realized', 'Completed'],
  improvement: ['Improved', 'Enhanced', 'Optimized', 'Streamlined', 'Upgraded', 'Modernized', 'Refined', 'Transformed'],
  creation: ['Created', 'Developed', 'Built', 'Designed', 'Established', 'Founded', 'Launched', 'Initiated'],
  analysis: ['Analyzed', 'Evaluated', 'Assessed', 'Researched', 'Investigated', 'Examined', 'Reviewed', 'Studied'],
  collaboration: ['Collaborated', 'Partnered', 'Cooperated', 'Facilitated', 'Coordinated', 'Liaised', 'Networked'],
  growth: ['Increased', 'Expanded', 'Grew', 'Scaled', 'Boosted', 'Amplified', 'Maximized', 'Accelerated'],
  problem_solving: ['Resolved', 'Solved', 'Troubleshot', 'Debugged', 'Fixed', 'Addressed', 'Rectified', 'Corrected']
};

const POWER_WORDS = [
  'Strategic', 'Innovative', 'Results-driven', 'Cross-functional', 'Data-driven', 'Scalable',
  'High-impact', 'Mission-critical', 'Revenue-generating', 'Cost-effective', 'Cutting-edge',
  'Industry-leading', 'Award-winning', 'Proven', 'Comprehensive', 'Advanced', 'Expert-level'
];

const ATS_FORMATTING_RULES = {
  fonts: ['Arial', 'Calibri', 'Times New Roman', 'Helvetica', 'Georgia'],
  fontSize: { min: 10, max: 12 },
  margins: { min: 0.5, max: 1.0 },
  sections: ['Contact Information', 'Professional Summary', 'Core Competencies', 'Professional Experience', 'Education'],
  avoidElements: ['Tables', 'Text boxes', 'Headers/Footers', 'Graphics', 'Columns', 'Special characters']
};

export const generateComprehensiveATSReport = (
  resumeData: ResumeData, 
  jobAnalysis?: JobAnalysis
): ATSAnalysisReport => {
  
  // Calculate current ATS score
  const currentScore = calculateDetailedATSScore(resumeData, jobAnalysis);
  const maxPossibleScore = 100;
  
  // Determine overall grade
  const overallGrade = getOverallGrade(currentScore);
  
  // Analyze formatting
  const formatAnalysis = analyzeFormatting(resumeData);
  
  // Analyze keywords
  const keywordAnalysis = analyzeKeywords(resumeData, jobAnalysis);
  
  // Analyze content quality
  const contentAnalysis = analyzeContent(resumeData, jobAnalysis);
  
  // Identify missing elements
  const missingElements = identifyMissingElements(resumeData);
  
  // Generate action verb suggestions
  const suggestedActionVerbs = generateActionVerbSuggestions(resumeData);
  
  // Generate power word suggestions
  const suggestedPowerWords = generatePowerWordSuggestions(resumeData);
  
  // Create prioritized recommendations
  const prioritizedRecommendations = generatePrioritizedRecommendations(
    formatAnalysis, keywordAnalysis, contentAnalysis, missingElements
  );
  
  // Generate before/after comparison
  const beforeAfterComparison = generateBeforeAfterComparison(
    resumeData, prioritizedRecommendations
  );
  
  // Template recommendation
  const templateRecommendation = generateTemplateRecommendation(formatAnalysis);
  
  return {
    currentScore,
    maxPossibleScore,
    overallGrade,
    formatAnalysis,
    keywordAnalysis,
    contentAnalysis,
    missingElements,
    suggestedActionVerbs,
    suggestedPowerWords,
    prioritizedRecommendations,
    beforeAfterComparison,
    templateRecommendation
  };
};

const calculateDetailedATSScore = (resumeData: ResumeData, jobAnalysis?: JobAnalysis): number => {
  let score = 0;
  
  // Contact information (15 points)
  if (resumeData.personalInfo.fullName) score += 3;
  if (resumeData.personalInfo.email && isValidEmail(resumeData.personalInfo.email)) score += 3;
  if (resumeData.personalInfo.phone) score += 3;
  if (resumeData.personalInfo.location) score += 3;
  if (resumeData.personalInfo.linkedin) score += 3;
  
  // Professional summary (20 points)
  if (resumeData.professionalSummary) {
    const summaryLength = resumeData.professionalSummary.length;
    if (summaryLength >= 100 && summaryLength <= 300) score += 15;
    else if (summaryLength >= 50) score += 10;
    else if (summaryLength > 0) score += 5;
    
    // Keyword integration in summary
    if (jobAnalysis) {
      const summaryKeywords = countKeywordMatches(resumeData.professionalSummary, jobAnalysis.keywords);
      score += Math.min(summaryKeywords * 1, 5);
    }
  }
  
  // Skills section (20 points)
  if (resumeData.coreCompetencies.length >= 8) score += 15;
  else if (resumeData.coreCompetencies.length >= 5) score += 10;
  else if (resumeData.coreCompetencies.length > 0) score += 5;
  
  if (jobAnalysis) {
    const skillMatches = countSkillMatches(resumeData.coreCompetencies, jobAnalysis.requiredSkills);
    score += Math.min(skillMatches * 1, 5);
  }
  
  // Experience section (30 points)
  if (resumeData.experience.length > 0) {
    score += 10; // Has experience
    
    // Check for quantified achievements
    const quantifiedAchievements = resumeData.experience.reduce((count, exp) => {
      return count + exp.achievements.filter(ach => hasQuantifiableResults(ach)).length;
    }, 0);
    
    score += Math.min(quantifiedAchievements * 2, 10);
    
    // Check for action verbs
    const actionVerbUsage = resumeData.experience.reduce((count, exp) => {
      return count + exp.achievements.filter(ach => startsWithActionVerb(ach)).length;
    }, 0);
    
    score += Math.min(actionVerbUsage * 1, 10);
  }
  
  // Education (10 points)
  if (resumeData.education.length > 0) score += 10;
  
  // Additional sections (5 points)
  if (resumeData.certifications.length > 0) score += 2.5;
  if (resumeData.projects.length > 0) score += 2.5;
  
  return Math.round(score);
};

const analyzeFormatting = (resumeData: ResumeData) => {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 85; // Start with high score, deduct for issues
  
  // Check section organization
  const hasRequiredSections = [
    resumeData.personalInfo.fullName,
    resumeData.professionalSummary,
    resumeData.coreCompetencies.length > 0,
    resumeData.experience.length > 0
  ].filter(Boolean).length;
  
  if (hasRequiredSections < 4) {
    issues.push('Missing essential resume sections');
    recommendations.push('Include all core sections: Contact Info, Professional Summary, Skills, Experience');
    score -= 15;
  }
  
  // Check for ATS-unfriendly elements (simulated)
  if (resumeData.personalInfo.portfolio && resumeData.personalInfo.portfolio.includes('pdf')) {
    issues.push('Portfolio link may contain non-ATS friendly elements');
    recommendations.push('Ensure portfolio links are simple URLs without special formatting');
    score -= 5;
  }
  
  return {
    score: Math.max(score, 0),
    issues,
    recommendations
  };
};

const analyzeKeywords = (resumeData: ResumeData, jobAnalysis?: JobAnalysis) => {
  if (!jobAnalysis) {
    return {
      score: 50,
      matchedKeywords: [],
      missingKeywords: [],
      keywordDensity: 0,
      recommendations: ['Analyze a job description to get keyword recommendations']
    };
  }
  
  const resumeText = [
    resumeData.professionalSummary,
    ...resumeData.coreCompetencies,
    ...resumeData.experience.flatMap(exp => exp.achievements)
  ].join(' ').toLowerCase();
  
  const matchedKeywords = jobAnalysis.keywords.filter(keyword => 
    resumeText.includes(keyword.toLowerCase())
  );
  
  const missingKeywords = jobAnalysis.keywords.filter(keyword => 
    !resumeText.includes(keyword.toLowerCase())
  );
  
  const keywordDensity = (matchedKeywords.length / jobAnalysis.keywords.length) * 100;
  const score = Math.min(keywordDensity * 1.2, 100);
  
  const recommendations: string[] = [];
  if (keywordDensity < 60) {
    recommendations.push('Increase keyword density by incorporating more job-relevant terms');
  }
  if (missingKeywords.length > 0) {
    recommendations.push(`Add missing keywords: ${missingKeywords.slice(0, 5).join(', ')}`);
  }
  
  return {
    score: Math.round(score),
    matchedKeywords,
    missingKeywords,
    keywordDensity: Math.round(keywordDensity),
    recommendations
  };
};

const analyzeContent = (resumeData: ResumeData, jobAnalysis?: JobAnalysis) => {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const recommendations: string[] = [];
  let score = 70;
  
  // Analyze professional summary
  if (resumeData.professionalSummary.length >= 100) {
    strengths.push('Professional summary has appropriate length');
  } else {
    weaknesses.push('Professional summary is too brief');
    recommendations.push('Expand professional summary to 100-300 characters');
    score -= 10;
  }
  
  // Analyze experience achievements
  const totalAchievements = resumeData.experience.reduce((sum, exp) => sum + exp.achievements.length, 0);
  const quantifiedAchievements = resumeData.experience.reduce((count, exp) => {
    return count + exp.achievements.filter(ach => hasQuantifiableResults(ach)).length;
  }, 0);
  
  if (quantifiedAchievements / totalAchievements > 0.5) {
    strengths.push('Good use of quantified achievements');
  } else {
    weaknesses.push('Limited quantified achievements');
    recommendations.push('Add more specific metrics and numbers to your achievements');
    score -= 15;
  }
  
  // Analyze action verb usage
  const actionVerbCount = resumeData.experience.reduce((count, exp) => {
    return count + exp.achievements.filter(ach => startsWithActionVerb(ach)).length;
  }, 0);
  
  if (actionVerbCount / totalAchievements > 0.7) {
    strengths.push('Strong action verb usage');
  } else {
    weaknesses.push('Inconsistent action verb usage');
    recommendations.push('Start each achievement bullet with a strong action verb');
    score -= 10;
  }
  
  return {
    score: Math.max(score, 0),
    strengths,
    weaknesses,
    recommendations
  };
};

const identifyMissingElements = (resumeData: ResumeData): string[] => {
  const missing: string[] = [];
  
  if (!resumeData.personalInfo.fullName) missing.push('Full name');
  if (!resumeData.personalInfo.email) missing.push('Email address');
  if (!resumeData.personalInfo.phone) missing.push('Phone number');
  if (!resumeData.personalInfo.location) missing.push('Location');
  if (!resumeData.professionalSummary) missing.push('Professional summary');
  if (resumeData.coreCompetencies.length === 0) missing.push('Core competencies/skills');
  if (resumeData.experience.length === 0) missing.push('Professional experience');
  if (resumeData.education.length === 0) missing.push('Education section');
  
  return missing;
};

const generateActionVerbSuggestions = (resumeData: ResumeData): string[] => {
  const usedVerbs = resumeData.experience.flatMap(exp => 
    exp.achievements.map(ach => ach.split(' ')[0]?.toLowerCase())
  ).filter(Boolean);
  
  const suggestions: string[] = [];
  Object.values(ACTION_VERBS).forEach(verbList => {
    verbList.forEach(verb => {
      if (!usedVerbs.includes(verb.toLowerCase())) {
        suggestions.push(verb);
      }
    });
  });
  
  return suggestions.slice(0, 15);
};

const generatePowerWordSuggestions = (resumeData: ResumeData): string[] => {
  const resumeText = resumeData.professionalSummary.toLowerCase();
  return POWER_WORDS.filter(word => !resumeText.includes(word.toLowerCase())).slice(0, 10);
};

const generatePrioritizedRecommendations = (
  formatAnalysis: any,
  keywordAnalysis: any,
  contentAnalysis: any,
  missingElements: string[]
) => {
  const recommendations: any[] = [];
  
  // High priority recommendations
  if (missingElements.length > 0) {
    recommendations.push({
      priority: 'High' as const,
      category: 'Missing Elements',
      issue: `Missing critical sections: ${missingElements.join(', ')}`,
      solution: 'Complete all missing sections to ensure ATS compatibility',
      impact: 'Major improvement in ATS parsing and scoring'
    });
  }
  
  if (keywordAnalysis.score < 60) {
    recommendations.push({
      priority: 'High' as const,
      category: 'Keywords',
      issue: 'Low keyword density and poor job description alignment',
      solution: `Incorporate missing keywords: ${keywordAnalysis.missingKeywords.slice(0, 3).join(', ')}`,
      impact: 'Significantly improves ATS ranking and visibility'
    });
  }
  
  // Medium priority recommendations
  if (contentAnalysis.weaknesses.includes('Limited quantified achievements')) {
    recommendations.push({
      priority: 'Medium' as const,
      category: 'Content Quality',
      issue: 'Achievements lack specific metrics and quantifiable results',
      solution: 'Add numbers, percentages, and specific outcomes to each achievement',
      impact: 'Enhances credibility and ATS scoring'
    });
  }
  
  if (formatAnalysis.issues.length > 0) {
    recommendations.push({
      priority: 'Medium' as const,
      category: 'Formatting',
      issue: formatAnalysis.issues.join(', '),
      solution: formatAnalysis.recommendations.join(', '),
      impact: 'Improves ATS parsing accuracy'
    });
  }
  
  // Low priority recommendations
  recommendations.push({
    priority: 'Low' as const,
    category: 'Enhancement',
    issue: 'Could benefit from additional sections',
    solution: 'Consider adding certifications, projects, or volunteer experience',
    impact: 'Provides more comprehensive candidate profile'
  });
  
  return recommendations;
};

const generateBeforeAfterComparison = (resumeData: ResumeData, recommendations: any[]) => {
  const currentIssues = recommendations.map(rec => rec.issue);
  const proposedChanges = recommendations.map(rec => rec.solution);
  
  // Calculate expected score increase
  const highPriorityCount = recommendations.filter(rec => rec.priority === 'High').length;
  const mediumPriorityCount = recommendations.filter(rec => rec.priority === 'Medium').length;
  const lowPriorityCount = recommendations.filter(rec => rec.priority === 'Low').length;
  
  const expectedScoreIncrease = (highPriorityCount * 15) + (mediumPriorityCount * 8) + (lowPriorityCount * 3);
  
  return {
    currentIssues,
    proposedChanges,
    expectedScoreIncrease: Math.min(expectedScoreIncrease, 40) // Cap at 40 point increase
  };
};

const generateTemplateRecommendation = (formatAnalysis: any) => {
  if (formatAnalysis.score < 70) {
    return {
      recommended: true,
      reason: 'Current formatting may not be ATS-friendly',
      suggestedTemplate: 'Clean, single-column template with clear section headers'
    };
  }
  
  return {
    recommended: false,
    reason: 'Current formatting appears ATS-compatible',
    suggestedTemplate: 'Continue with current format'
  };
};

// Helper functions
const getOverallGrade = (score: number): 'Excellent' | 'Good' | 'Fair' | 'Poor' => {
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 55) return 'Fair';
  return 'Poor';
};

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const countKeywordMatches = (text: string, keywords: string[]): number => {
  const lowerText = text.toLowerCase();
  return keywords.filter(keyword => lowerText.includes(keyword.toLowerCase())).length;
};

const countSkillMatches = (resumeSkills: string[], jobSkills: string[]): number => {
  return jobSkills.filter(jobSkill => 
    resumeSkills.some(resumeSkill => 
      resumeSkill.toLowerCase().includes(jobSkill.toLowerCase())
    )
  ).length;
};

const hasQuantifiableResults = (achievement: string): boolean => {
  return /\d+[%$]?|\b(increased|decreased|improved|reduced|saved|generated)\b.*\d+/i.test(achievement);
};

const startsWithActionVerb = (achievement: string): boolean => {
  const firstWord = achievement.trim().split(' ')[0];
  const allActionVerbs = Object.values(ACTION_VERBS).flat();
  return allActionVerbs.some(verb => verb.toLowerCase() === firstWord?.toLowerCase());
};