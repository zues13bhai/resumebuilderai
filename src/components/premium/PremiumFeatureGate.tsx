import React, { useState } from 'react';
import { Crown, Sparkles } from 'lucide-react';
import { usePremium } from '../../contexts/PremiumContext';
import { UnlockPremiumModal } from './UnlockPremiumModal';

interface PremiumFeatureGateProps {
  feature: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showUpgradePrompt?: boolean;
}

export const PremiumFeatureGate: React.FC<PremiumFeatureGateProps> = ({
  feature,
  children,
  fallback,
  showUpgradePrompt = true
}) => {
  const { isPremium, premiumFeatures } = usePremium();
  const [showUnlockModal, setShowUnlockModal] = useState(false);

  const hasAccess = isPremium && premiumFeatures.includes(feature);

  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  if (!showUpgradePrompt) {
    return null;
  }

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-600/10 backdrop-blur-sm rounded-lg z-10 flex items-center justify-center">
          <div className="text-center p-6">
            <Crown className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Premium Feature
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              Unlock this feature with Premium access
            </p>
            <button
              onClick={() => setShowUnlockModal(true)}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center mx-auto"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Unlock Premium
            </button>
          </div>
        </div>
        <div className="opacity-30 pointer-events-none">
          {children}
        </div>
      </div>

      <UnlockPremiumModal
        isOpen={showUnlockModal}
        onClose={() => setShowUnlockModal(false)}
      />
    </>
  );
};