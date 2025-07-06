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
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center"
              >
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-xl">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="ml-3">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    ResumeAI Pro
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    AI-Powered Career Builder
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search templates, skills, or get AI help..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-gray-700 transition-all duration-200"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* 🧠 AI Assistant Start - Show premium status or unlock button */}
              {!isPremium ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPremiumModal(true)}
                  className="flex items-center px-3 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium"
                >
                  <Key className="w-4 h-4 mr-2" />
                  Enter Code: 5555
                </motion.button>
              ) : (
                <div className="flex items-center px-3 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-lg text-sm font-medium">
                  <Crown className="w-4 h-4 mr-2" />
                  Premium Active
                </div>
              )}
              {/* 🧠 AI Assistant End */}

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
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
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Globe className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                <span className="ml-1 text-xs font-medium text-gray-600 dark:text-gray-300">
                  {language.toUpperCase()}
                </span>
              </motion.button>

              {/* Notifications */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative"
                >
                  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </motion.button>

                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                          <p className="text-sm text-gray-900 dark:text-white">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          )}
                        </div>
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
                  className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left hidden md:block">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                    <div className="flex items-center">
                      <p className="text-xs text-gray-500 capitalize">{isPremium ? 'Premium' : 'Free'}</p>
                      {isPremium && <PremiumBadge size="sm" showText={false} className="ml-1" />}
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </motion.button>

                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                  >
                    <div className="p-2">
                      {isPremium && (
                        <div className="px-3 py-2 mb-2">
                          <PremiumBadge size="sm" />
                        </div>
                      )}
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </button>
                      {!isPremium ? (
                        <button 
                          onClick={() => setShowPremiumModal(true)}
                          className="w-full text-left px-3 py-2 text-sm text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg flex items-center"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Enter Code: 5555
                        </button>
                      ) : (
                        <button 
                          onClick={resetPremium}
                          className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg flex items-center"
                        >
                          <Key className="w-4 h-4 mr-2" />
                          Reset Premium (Dev)
                        </button>
                      )}
                      <button 
                        onClick={logout}
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                      >
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <UnlockPremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
      />
    </>
  );
};