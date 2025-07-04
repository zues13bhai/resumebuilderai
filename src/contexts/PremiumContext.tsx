import React, { createContext, useContext, useState, useEffect } from 'react';

interface PremiumContextType {
  isPremium: boolean;
  premiumFeatures: string[];
  unlockPremium: (code: string) => boolean;
  upgradeToPremium: () => void;
  checkPremiumStatus: () => boolean;
  premiumExpiryDate: string | null;
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
  'priority-support'
];

export const PremiumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [premiumExpiryDate, setPremiumExpiryDate] = useState<string | null>(null);

  useEffect(() => {
    checkPremiumStatus();
  }, []);

  const checkPremiumStatus = (): boolean => {
    try {
      const premiumStatus = localStorage.getItem('premiumUser');
      const expiryDate = localStorage.getItem('premiumExpiry');
      
      console.log('Premium status check:', { premiumStatus, expiryDate });
      
      if (premiumStatus === 'true' && expiryDate) {
        const expiry = new Date(expiryDate);
        const now = new Date();
        
        if (expiry > now) {
          setIsPremium(true);
          setPremiumExpiryDate(expiryDate);
          return true;
        } else {
          // Premium expired
          localStorage.removeItem('premiumUser');
          localStorage.removeItem('premiumExpiry');
          setIsPremium(false);
          setPremiumExpiryDate(null);
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
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30); // 30 days access
      
      localStorage.setItem('premiumUser', 'true');
      localStorage.setItem('premiumExpiry', expiryDate.toISOString());
      localStorage.setItem('premiumUnlockedAt', new Date().toISOString());
      
      setIsPremium(true);
      setPremiumExpiryDate(expiryDate.toISOString());
      
      console.log('Premium unlocked successfully until:', expiryDate);
      return true;
    }
    
    console.log('Invalid premium code entered:', code);
    return false;
  };

  const upgradeToPremium = () => {
    // This would integrate with payment system
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1); // 1 month access
    
    localStorage.setItem('premiumUser', 'true');
    localStorage.setItem('premiumExpiry', expiryDate.toISOString());
    localStorage.setItem('premiumPurchasedAt', new Date().toISOString());
    
    setIsPremium(true);
    setPremiumExpiryDate(expiryDate.toISOString());
  };

  return (
    <PremiumContext.Provider value={{
      isPremium,
      premiumFeatures: PREMIUM_FEATURES,
      unlockPremium,
      upgradeToPremium,
      checkPremiumStatus,
      premiumExpiryDate
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