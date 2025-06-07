import { ResumeData, JobAnalysis } from '../types/resume';

export const analyzeJobDescription = (jobDescription: string): JobAnalysis => {
  const text = jobDescription.toLowerCase();
  
  // Common technical skills patterns
  const technicalSkills = [
    'javascript', 'typescript', 'react', 'node.js', 'python', 'java', 'sql',
    'aws', 'azure', 'docker', 'kubernetes', 'git', 'agile', 'scrum',
    'html', 'css', 'mongodb', 'postgresql', 'redis', 'graphql', 'rest api'
  ];
  
  // Common soft skills patterns
  const softSkills = [
    'leadership', 'communication', 'teamwork', 'problem solving',
    'analytical', 'creative', 'adaptable', 'detail-oriented'
  ];
  
  // Extract keywords from job description
  const words = text.split(/\s+/);
  const keywords = words.filter(word => 
    word.length > 3 && 
    !['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use'].includes(word)
  );
  
  const foundTechnicalSkills = technicalSkills.filter(skill => 
    text.includes(skill)
  );
  
  const foundSoftSkills = softSkills.filter(skill => 
    text.includes(skill)
  );
  
  return {
    keywords: [...new Set(keywords)].slice(0, 20),
    requiredSkills: foundTechnicalSkills,
    preferredSkills: [],
    industryTerms: [],
    softSkills: foundSoftSkills
  };
};

export const calculateATSScore = (resume: ResumeData, jobAnalysis: JobAnalysis): number => {
  let score = 0;
  const maxScore = 100;
  
  // Check for keyword matches in summary
  const summaryWords = resume.professionalSummary.toLowerCase().split(/\s+/);
  const keywordMatches = jobAnalysis.keywords.filter(keyword => 
    summaryWords.some(word => word.includes(keyword))
  ).length;
  
  score += Math.min(keywordMatches * 5, 25); // Max 25 points for keywords
  
  // Check for skill matches
  const resumeSkills = resume.coreCompetencies.map(skill => skill.toLowerCase());
  const skillMatches = jobAnalysis.requiredSkills.filter(skill => 
    resumeSkills.some(resumeSkill => resumeSkill.includes(skill))
  ).length;
  
  score += Math.min(skillMatches * 10, 40); // Max 40 points for skills
  
  // Check experience relevance
  const experienceText = resume.experience
    .map(exp => `${exp.position} ${exp.achievements.join(' ')}`)
    .join(' ')
    .toLowerCase();
  
  const experienceMatches = jobAnalysis.keywords.filter(keyword => 
    experienceText.includes(keyword)
  ).length;
  
  score += Math.min(experienceMatches * 2, 20); // Max 20 points for experience
  
  // Basic completeness check
  if (resume.personalInfo.fullName && resume.personalInfo.email) score += 5;
  if (resume.experience.length > 0) score += 5;
  if (resume.education.length > 0) score += 5;
  
  return Math.min(score, maxScore);
};

export const generateOptimizedSummary = (resume: ResumeData, jobAnalysis: JobAnalysis): string => {
  const yearsOfExperience = resume.experience.length > 0 ? 
    Math.max(...resume.experience.map(exp => {
      const start = new Date(exp.startDate);
      const end = exp.current ? new Date() : new Date(exp.endDate);
      return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365));
    })) : 0;
  
  const topSkills = jobAnalysis.requiredSkills.slice(0, 3).join(', ');
  const industry = resume.experience[0]?.company || 'technology';
  
  return `Results-driven professional with ${yearsOfExperience}+ years of experience in ${industry}. Expertise in ${topSkills} with a proven track record of delivering high-quality solutions. Strong background in ${jobAnalysis.softSkills.slice(0, 2).join(' and ')} with excellent problem-solving abilities.`;
};