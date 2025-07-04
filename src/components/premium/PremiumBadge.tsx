import React from 'react';
import { Crown } from 'lucide-react';
import { usePremium } from '../../contexts/PremiumContext';

interface PremiumBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const PremiumBadge: React.FC<PremiumBadgeProps> = ({ 
  size = 'md', 
  showText = true,
  className = '' 
}) => {
  const { isPremium, premiumExpiryDate } = usePremium();

  if (!isPremium) return null;

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const formatExpiryDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className={`inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-medium ${sizeClasses[size]} ${className}`}>
      <Crown className={`${iconSizes[size]} ${showText ? 'mr-1' : ''}`} />
      {showText && (
        <span>
          Premium
          {premiumExpiryDate && size === 'lg' && (
            <span className="ml-1 opacity-90">
              (until {formatExpiryDate(premiumExpiryDate)})
            </span>
          )}
        </span>
      )}
    </div>
  );
};