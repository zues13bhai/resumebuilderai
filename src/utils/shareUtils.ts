import { ResumeData } from '../types/resume';

/**
 * Generate a shareable link for the resume
 * Uses URL encoding to embed resume data
 */
export const generateShareableLink = (resumeData: ResumeData): string => {
  try {
    // Compress resume data for URL
    const compressedData = btoa(JSON.stringify({
      id: resumeData.id,
      title: resumeData.title,
      template: resumeData.template,
      personalInfo: resumeData.personalInfo,
      professionalSummary: resumeData.professionalSummary,
      coreCompetencies: resumeData.coreCompetencies,
      experience: resumeData.experience,
      education: resumeData.education,
      certifications: resumeData.certifications,
      projects: resumeData.projects
    }));

    const baseUrl = window.location.origin;
    return `${baseUrl}/shared/${resumeData.id}?data=${encodeURIComponent(compressedData)}`;
  } catch (error) {
    console.error('Failed to generate shareable link:', error);
    return '';
  }
};

/**
 * Copy shareable link to clipboard
 */
export const copyShareableLink = async (resumeData: ResumeData): Promise<boolean> => {
  try {
    const shareUrl = generateShareableLink(resumeData);
    await navigator.clipboard.writeText(shareUrl);
    
    // Show success toast
    const toast = document.createElement('div');
    toast.textContent = 'Shareable link copied to clipboard!';
    toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg z-50';
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 3000);
    
    return true;
  } catch (error) {
    console.error('Failed to copy link:', error);
    
    // Show error toast
    const toast = document.createElement('div');
    toast.textContent = 'Failed to copy link. Please try again.';
    toast.className = 'fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg z-50';
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 3000);
    
    return false;
  }
};

/**
 * Share via Web Share API (mobile-friendly)
 */
export const shareViaWebAPI = async (resumeData: ResumeData): Promise<boolean> => {
  if (!navigator.share) {
    return false;
  }

  try {
    const shareUrl = generateShareableLink(resumeData);
    await navigator.share({
      title: `${resumeData.personalInfo.fullName}'s Resume`,
      text: 'Check out my professional resume',
      url: shareUrl
    });
    return true;
  } catch (error) {
    console.error('Web Share API failed:', error);
    return false;
  }
};

/**
 * Generate QR code for resume sharing (placeholder)
 */
export const generateQRCode = (resumeData: ResumeData): string => {
  const shareUrl = generateShareableLink(resumeData);
  // TODO: Integrate with QR code library like qrcode.js
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`;
};