import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Moon, 
  Sun, 
  Globe, 
  Bell, 
  Settings, 
  User, 
  Crown,
  Search,
  ChevronDown,
  Sparkles,
  Key,
  Bot
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../hooks/useAuth';
import { usePremium } from '../../contexts/PremiumContext';
import { PremiumBadge } from '../premium/PremiumBadge';
import { UnlockPremiumModal } from '../premium/UnlockPremiumModal';

export const Header: React.FC = () => {
  const { theme, toggleTheme, language, toggleLanguage } = useTheme();
  const { user, logout } = useAuth();
  const { isPremium, resetPremium } = usePremium();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const notifications = [
    { id: 1, message: "Your resume 'Software Engineer' got 5 new views", time: "2 hours ago", unread: true },
    { id: 2, message: "AI suggestions available for your profile", time: "1 day ago", unread: true },
    { id: 3, message: "Premium features now available", time: "2 days ago", unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <>
      {/* 🌟 UI Upgrade Start */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center"
              >
                <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-2.5 rounded-2xl shadow-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    ResumeAI Pro
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    AI-Powered Career Builder
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search templates, skills, or get AI help..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-0 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:bg-white dark:focus:bg-gray-700/50 transition-all duration-300 text-sm placeholder-gray-500 shadow-sm"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Premium Status/Unlock */}
              {!isPremium ? (
                <motion.button
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPremiumModal(true)}
                  className="flex items-center px-4 py-2.5 bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all text-sm font-semibold"
                >
                  <Key className="w-4 h-4 mr-2" />
                  Enter Code: 5555
                </motion.button>
              ) : (
                <div className="flex items-center px-4 py-2.5 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-emerald-500/25">
                  <Crown className="w-4 h-4 mr-2" />
                  Premium Active
                </div>
              )}

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </motion.button>

              {/* Language Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleLanguage}
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm"
              >
                <Globe className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </motion.button>

              {/* Notifications */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 relative shadow-sm"
                >
                  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  {unreadCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-lg"
                    >
                      {unreadCount}
                    </motion.span>
                  )}
                </motion.button>

                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <motion.div 
                          key={notification.id} 
                          whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.05)' }}
                          className="p-4 border-b border-gray-100 dark:border-gray-700 transition-colors"
                        >
                          <p className="text-sm text-gray-900 dark:text-white font-medium">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* User Menu */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 p-2 rounded-2xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left hidden md:block">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                    <div className="flex items-center">
                      <p className="text-xs text-gray-500 capitalize">{isPremium ? 'Premium' : 'Free'}</p>
                      {isPremium && <PremiumBadge size="sm" showText={false} className="ml-1" />}
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </motion.button>

                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
                  >
                    <div className="p-3">
                      {isPremium && (
                        <div className="px-3 py-2 mb-2 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl">
                          <PremiumBadge size="sm" />
                        </div>
                      )}
                      <motion.button 
                        whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
                        className="w-full text-left px-3 py-3 text-sm text-gray-700 dark:text-gray-300 rounded-xl flex items-center transition-colors"
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Settings
                      </motion.button>
                      {!isPremium ? (
                        <motion.button 
                          whileHover={{ backgroundColor: 'rgba(251, 191, 36, 0.1)' }}
                          onClick={() => setShowPremiumModal(true)}
                          className="w-full text-left px-3 py-3 text-sm text-yellow-600 rounded-xl flex items-center transition-colors"
                        >
                          <Sparkles className="w-4 h-4 mr-3" />
                          Enter Code: 5555
                        </motion.button>
                      ) : (
                        <motion.button 
                          whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.1)' }}
                          onClick={resetPremium}
                          className="w-full text-left px-3 py-3 text-sm text-gray-600 rounded-xl flex items-center transition-colors"
                        >
                          <Key className="w-4 h-4 mr-3" />
                          Reset Premium (Dev)
                        </motion.button>
                      )}
                      <motion.button 
                        whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                        onClick={logout}
                        className="w-full text-left px-3 py-3 text-sm text-red-600 rounded-xl transition-colors"
                      >
                        Sign Out
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.header>
      {/* 🌟 UI Upgrade End */}

      <UnlockPremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
      />
    </>
  );
};