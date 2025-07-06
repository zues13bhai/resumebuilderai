import React, { createContext, useContext, useState, useEffect } from 'react';

interface PremiumContextType {
  isPremium: boolean;
  premiumFeatures: string[];
  unlockPremium: (code: string) => boolean;
  upgradeToPremium: () => void;
  checkPremiumStatus: () => boolean;
  premiumExpiryDate: string | null;
  resetPremium: () => void;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

const PREMIUM_CODE = '5555';
const PREMIUM_FEATURES = [
  'ai-resume-enhancer',
  'grammar-fixer',
  'job-matcher',
  'advanced-templates',
  'resume-analytics',
  'theme-customization',
  'unlimited-resumes',
  'priority-support',
  'ai-assistant',
  'export-pdf',
  'share-resume',
  'template-customization',
  'ats-optimization',
  'keyword-analysis'
];

export const PremiumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [premiumExpiryDate, setPremiumExpiryDate] = useState<string | null>(null);

  useEffect(() => {
    checkPremiumStatus();
  }, []);

  const checkPremiumStatus = (): boolean => {
    try {
      const premiumStatus = localStorage.getItem('isPremium');
      const expiryDate = localStorage.getItem('premiumExpiry');
      
      console.log('Premium status check:', { premiumStatus, expiryDate });
      
      if (premiumStatus === 'true') {
        if (expiryDate) {
          const expiry = new Date(expiryDate);
          const now = new Date();
          
          if (expiry > now) {
            setIsPremium(true);
            setPremiumExpiryDate(expiryDate);
            return true;
          } else {
            // Premium expired
            localStorage.removeItem('isPremium');
            localStorage.removeItem('premiumExpiry');
            localStorage.removeItem('premiumUnlockedAt');
            localStorage.removeItem('premiumPurchasedAt');
            setIsPremium(false);
            setPremiumExpiryDate(null);
          }
        } else {
          // No expiry date means permanent premium
          setIsPremium(true);
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Error checking premium status:', error);
      return false;
    }
  };

  const unlockPremium = (code: string): boolean => {
    if (code === PREMIUM_CODE) {
      // Grant permanent premium access
      localStorage.setItem('isPremium', 'true');
      localStorage.setItem('premiumUnlockedAt', new Date().toISOString());
      
      setIsPremium(true);
      setPremiumExpiryDate(null);
      
      console.log('Premium unlocked permanently with code');
      
      // Show success notification
      const toast = document.createElement('div');
      toast.innerHTML = `
        <div class="flex items-center">
          <span class="text-2xl mr-2">🎉</span>
          <div>
            <div class="font-bold">Premium Activated!</div>
            <div class="text-sm opacity-90">All features are now unlocked</div>
          </div>
        </div>
      `;
      toast.className = 'fixed top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-sm';
      document.body.appendChild(toast);
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 5000);
      
      return true;
    }
    
    console.log('Invalid premium code entered:', code);
    return false;
  };

  const upgradeToPremium = () => {
    // Grant permanent premium access
    localStorage.setItem('isPremium', 'true');
    localStorage.setItem('premiumPurchasedAt', new Date().toISOString());
    
    setIsPremium(true);
    setPremiumExpiryDate(null);
    
    console.log('Premium upgraded permanently');
  };

  const resetPremium = () => {
    localStorage.removeItem('isPremium');
    localStorage.removeItem('premiumExpiry');
    localStorage.removeItem('premiumUnlockedAt');
    localStorage.removeItem('premiumPurchasedAt');
    setIsPremium(false);
    setPremiumExpiryDate(null);
    console.log('Premium status reset');
  };

  return (
    <PremiumContext.Provider value={{
      isPremium,
      premiumFeatures: PREMIUM_FEATURES,
      unlockPremium,
      upgradeToPremium,
      checkPremiumStatus,
      premiumExpiryDate,
      resetPremium
    }}>
      {children}
    </PremiumContext.Provider>
  );
};

export const usePremium = () => {
  const context = useContext(PremiumContext);
  if (!context) {
    throw new Error('usePremium must be used within a PremiumProvider');
  }
  return context;
};