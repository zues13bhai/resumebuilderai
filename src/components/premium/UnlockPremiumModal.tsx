import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Sparkles, Check, AlertCircle, Key } from 'lucide-react';
import { usePremium } from '../../contexts/PremiumContext';
import toast from 'react-hot-toast';

interface UnlockPremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UnlockPremiumModal: React.FC<UnlockPremiumModalProps> = ({ isOpen, onClose }) => {
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          {/* 🌟 UI Upgrade Start */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 text-white p-8 rounded-t-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl mr-4">
                    <Crown className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Unlock Premium Features</h2>
                    <p className="text-purple-100 font-medium">Supercharge your resume building experience</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
            </div>

            <div className="p-8">
              {/* Premium Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {premiumFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl border border-gray-200 dark:border-gray-600"
                  >
                    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2.5 rounded-xl mr-4 shadow-lg">
                      <feature.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Unlock Options */}
              <div className="space-y-6">
                {/* Code Entry */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center text-lg">
                    <Key className="w-5 h-5 mr-3" />
                    Have a Premium Code?
                  </h3>
                  <form onSubmit={handleCodeSubmit} className="space-y-4">
                    <div>
                      <input
                        type="password"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter your premium code"
                        className="w-full px-5 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium transition-all duration-200"
                        disabled={isLoading}
                      />
                      {error && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center mt-3 text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-xl"
                        >
                          <AlertCircle className="w-4 h-4 mr-2" />
                          {error}
                        </motion.div>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={!code.trim() || isLoading}
                      className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Unlocking Premium...
                        </div>
                      ) : (
                        'Unlock Premium Features'
                      )}
                    </motion.button>
                  </form>
                </div>

                {/* Purchase Option */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-red-900/20">
                  <div className="text-center">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">
                      Upgrade to Premium
                    </h3>
                    <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      $9.99<span className="text-lg text-gray-500 font-medium">/month</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 font-medium">
                      Cancel anytime • 30-day money-back guarantee
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleUpgrade}
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-orange-500/25 transition-all"
                    >
                      Start Premium Trial
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Demo Code Hint */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
                <p className="text-blue-800 dark:text-blue-300 text-sm text-center font-medium">
                  💡 <strong>Demo Code:</strong> Try entering "5555" to unlock premium features for testing
                </p>
              </div>
            </div>
          </motion.div>
          {/* 🌟 UI Upgrade End */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};