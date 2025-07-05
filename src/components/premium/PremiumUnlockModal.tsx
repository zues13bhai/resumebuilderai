import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Sparkles, Check, AlertCircle, Key } from 'lucide-react';
import { usePremium } from '../../contexts/PremiumContext';
import toast from 'react-hot-toast';

interface PremiumUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PremiumUnlockModal: React.FC<PremiumUnlockModalProps> = ({ isOpen, onClose }) => {
  const { unlockPremium, upgradeToPremium } = usePremium();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = unlockPremium(code);
      
      if (success) {
        toast.success('🎉 Premium features unlocked!', {
          duration: 4000,
          style: {
            background: '#10b981',
            color: '#fff',
          },
        });
        onClose();
        setCode('');
        
        // Reload the page to refresh all components
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setError('Invalid code. Please try again.');
        toast.error('Invalid premium code');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Premium unlock error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgrade = () => {
    upgradeToPremium();
    toast.success('🎉 Welcome to Premium!', {
      duration: 4000,
      style: {
        background: '#10b981',
        color: '#fff',
      },
    });
    onClose();
    
    // Reload the page to refresh all components
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const premiumFeatures = [
    { icon: Sparkles, title: 'AI Resume Enhancer', description: 'Smart suggestions and content optimization' },
    { icon: Check, title: 'Grammar & Style Fixer', description: 'Professional writing assistance' },
    { icon: Crown, title: 'Advanced Templates', description: 'Premium designs and layouts' },
    { icon: Sparkles, title: 'Job Matcher', description: 'Tailor resume for specific jobs' },
    { icon: Check, title: 'Resume Analytics', description: 'Track performance and engagement' },
    { icon: Crown, title: 'Unlimited Resumes', description: 'Create as many resumes as you need' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Crown className="w-8 h-8 mr-3" />
                  <div>
                    <h2 className="text-2xl font-bold">Unlock Premium Features</h2>
                    <p className="text-purple-100">Supercharge your resume building experience</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Premium Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {premiumFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-2 rounded-lg mr-3">
                      <feature.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Unlock Options */}
              <div className="space-y-6">
                {/* Code Entry */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Key className="w-5 h-5 mr-2" />
                    Have a Premium Code?
                  </h3>
                  <form onSubmit={handleCodeSubmit} className="space-y-4">
                    <div>
                      <input
                        type="password"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter your premium code"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        disabled={isLoading}
                      />
                      {error && (
                        <div className="flex items-center mt-2 text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {error}
                        </div>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={!code.trim() || isLoading}
                      className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Unlocking...
                        </div>
                      ) : (
                        'Unlock Premium'
                      )}
                    </button>
                  </form>
                </div>

                {/* Purchase Option */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Upgrade to Premium
                    </h3>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      $9.99<span className="text-lg text-gray-500">/month</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      Cancel anytime • 30-day money-back guarantee
                    </p>
                    <button
                      onClick={handleUpgrade}
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      Start Premium Trial
                    </button>
                  </div>
                </div>
              </div>

              {/* Demo Code Hint */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-blue-800 dark:text-blue-300 text-sm text-center">
                  💡 <strong>Demo Code:</strong> Try entering "5555" to unlock premium features for testing
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};