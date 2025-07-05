import { ResumeData } from '../types/resume';

const STORAGE_KEY = 'resumeBuilder_data';
const AUTO_SAVE_INTERVAL = 30000; // 30 seconds

/**
 * Save resume data to localStorage with error handling
 */
export const saveResumeData = (resumeData: ResumeData): boolean => {
  try {
    const dataToSave = {
      ...resumeData,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(`${STORAGE_KEY}_${resumeData.id}`, JSON.stringify(dataToSave));
    
    // Also save to a general list for quick access
    const savedResumes = getSavedResumesList();
    const existingIndex = savedResumes.findIndex(r => r.id === resumeData.id);
    
    if (existingIndex >= 0) {
      savedResumes[existingIndex] = {
        id: resumeData.id,
        title: resumeData.title,
        updatedAt: dataToSave.updatedAt
      };
    } else {
      savedResumes.push({
        id: resumeData.id,
        title: resumeData.title,
        updatedAt: dataToSave.updatedAt
      });
    }
    
    localStorage.setItem(`${STORAGE_KEY}_list`, JSON.stringify(savedResumes));
    
    // Show success toast
    showToast('Resume saved successfully!', 'success');
    
    return true;
  } catch (error) {
    console.error('Failed to save resume:', error);
    showToast('Failed to save resume. Please try again.', 'error');
    return false;
  }
};

/**
 * Load resume data from localStorage
 */
export const loadResumeData = (resumeId: string): ResumeData | null => {
  try {
    const savedData = localStorage.getItem(`${STORAGE_KEY}_${resumeId}`);
    if (savedData) {
      return JSON.parse(savedData);
    }
    return null;
  } catch (error) {
    console.error('Failed to load resume:', error);
    return null;
  }
};

/**
 * Get list of all saved resumes
 */
export const getSavedResumesList = (): Array<{id: string, title: string, updatedAt: string}> => {
  try {
    const savedList = localStorage.getItem(`${STORAGE_KEY}_list`);
    return savedList ? JSON.parse(savedList) : [];
  } catch (error) {
    console.error('Failed to load resumes list:', error);
    return [];
  }
};

/**
 * Delete a saved resume
 */
export const deleteResumeData = (resumeId: string): boolean => {
  try {
    localStorage.removeItem(`${STORAGE_KEY}_${resumeId}`);
    
    const savedResumes = getSavedResumesList();
    const filteredResumes = savedResumes.filter(r => r.id !== resumeId);
    localStorage.setItem(`${STORAGE_KEY}_list`, JSON.stringify(filteredResumes));
    
    showToast('Resume deleted successfully!', 'success');
    return true;
  } catch (error) {
    console.error('Failed to delete resume:', error);
    showToast('Failed to delete resume. Please try again.', 'error');
    return false;
  }
};

/**
 * Auto-save functionality
 */
export class AutoSave {
  private intervalId: NodeJS.Timeout | null = null;
  private lastSaveData: string = '';

  start(getResumeData: () => ResumeData) {
    this.intervalId = setInterval(() => {
      const currentData = getResumeData();
      const currentDataString = JSON.stringify(currentData);
      
      // Only save if data has changed
      if (currentDataString !== this.lastSaveData) {
        saveResumeData(currentData);
        this.lastSaveData = currentDataString;
      }
    }, AUTO_SAVE_INTERVAL);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

/**
 * Create version history snapshot
 */
export const createVersionSnapshot = (resumeData: ResumeData): void => {
  try {
    const versions = getVersionHistory(resumeData.id);
    const snapshot = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      data: resumeData,
      description: `Auto-save ${new Date().toLocaleTimeString()}`
    };
    
    versions.unshift(snapshot);
    
    // Keep only last 10 versions
    const limitedVersions = versions.slice(0, 10);
    
    localStorage.setItem(`${STORAGE_KEY}_versions_${resumeData.id}`, JSON.stringify(limitedVersions));
  } catch (error) {
    console.error('Failed to create version snapshot:', error);
  }
};

/**
 * Get version history for a resume
 */
export const getVersionHistory = (resumeId: string): Array<any> => {
  try {
    const versions = localStorage.getItem(`${STORAGE_KEY}_versions_${resumeId}`);
    return versions ? JSON.parse(versions) : [];
  } catch (error) {
    console.error('Failed to load version history:', error);
    return [];
  }
};

/**
 * Restore from version history
 */
export const restoreFromVersion = (resumeId: string, versionId: string): ResumeData | null => {
  try {
    const versions = getVersionHistory(resumeId);
    const version = versions.find(v => v.id === versionId);
    
    if (version) {
      showToast('Resume restored from version history!', 'success');
      return version.data;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to restore from version:', error);
    showToast('Failed to restore from version. Please try again.', 'error');
    return null;
  }
};

/**
 * Utility function to show toast notifications
 */
const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info'): void => {
  const toast = document.createElement('div');
  toast.textContent = message;
  
  const bgColor = type === 'success' ? 'bg-green-600' : 
                  type === 'error' ? 'bg-red-600' : 'bg-blue-600';
  
  toast.className = `fixed top-4 right-4 ${bgColor} text-white px-4 py-2 rounded-lg z-50 transition-all duration-300`;
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => toast.style.transform = 'translateY(0)', 10);
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.transform = 'translateY(-100%)';
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
};