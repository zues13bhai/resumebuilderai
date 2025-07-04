import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  CreditCard,
  Globe,
  Moon,
  Sun,
  Crown,
  Download,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../contexts/ThemeContext';

export const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, language, toggleLanguage } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <SettingsIcon className="w-8 h-8 mr-3" />
          Settings
        </h1>
        <p className="text-gray-300 text-lg">
          Manage your account preferences and settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-3" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Profile Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.name}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="City, Country"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="flex justify-end">
                  <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Notification Preferences
                </h2>
                
                <div className="space-y-4">
                  {[
                    { title: 'Email Notifications', description: 'Receive updates via email' },
                    { title: 'Resume Views', description: 'Get notified when someone views your resume' },
                    { title: 'AI Suggestions', description: 'Receive AI-powered improvement suggestions' },
                    { title: 'Weekly Reports', description: 'Get weekly analytics reports' },
                    { title: 'Marketing Updates', description: 'Receive product updates and tips' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Privacy & Security
                </h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Change Password</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white pr-10"
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <button className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                      Update Password
                    </button>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Data Export</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Download all your data including resumes, analytics, and account information.
                    </p>
                    <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center">
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </button>
                  </div>

                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <h3 className="font-medium text-red-900 dark:text-red-400 mb-2">Delete Account</h3>
                    <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Billing & Subscription
                </h2>
                
                <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 flex items-center">
                        {user?.plan === 'free' ? (
                          <>Free Plan</>
                        ) : (
                          <>
                            <Crown className="w-5 h-5 mr-2" />
                            Premium Plan
                          </>
                        )}
                      </h3>
                      <p className="text-indigo-100">
                        {user?.plan === 'free' 
                          ? 'Upgrade to unlock premium features'
                          : 'Next billing date: January 15, 2024'
                        }
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        {user?.plan === 'free' ? '$0' : '$9.99'}
                      </div>
                      <div className="text-indigo-100">per month</div>
                    </div>
                  </div>
                </div>

                {user?.plan === 'free' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Premium</h3>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        $9.99<span className="text-lg text-gray-500">/month</span>
                      </div>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Crown className="w-4 h-4 text-yellow-500 mr-2" />
                          Unlimited resumes
                        </li>
                        <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Crown className="w-4 h-4 text-yellow-500 mr-2" />
                          AI-powered suggestions
                        </li>
                        <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Crown className="w-4 h-4 text-yellow-500 mr-2" />
                          Premium templates
                        </li>
                        <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Crown className="w-4 h-4 text-yellow-500 mr-2" />
                          Analytics dashboard
                        </li>
                      </ul>
                      <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg hover:shadow-lg transition-all">
                        Upgrade Now
                      </button>
                    </div>

                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pro</h3>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        $19.99<span className="text-lg text-gray-500">/month</span>
                      </div>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Crown className="w-4 h-4 text-yellow-500 mr-2" />
                          Everything in Premium
                        </li>
                        <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Crown className="w-4 h-4 text-yellow-500 mr-2" />
                          Custom branding
                        </li>
                        <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Crown className="w-4 h-4 text-yellow-500 mr-2" />
                          Priority support
                        </li>
                        <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Crown className="w-4 h-4 text-yellow-500 mr-2" />
                          Advanced analytics
                        </li>
                      </ul>
                      <button className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors">
                        Upgrade to Pro
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Payment Method</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-5 bg-blue-600 rounded mr-3"></div>
                          <span className="text-gray-900 dark:text-white">•••• •••• •••• 4242</span>
                        </div>
                        <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                          Update
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Billing History</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Dec 15, 2023</span>
                          <span className="text-gray-900 dark:text-white">$9.99</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Nov 15, 2023</span>
                          <span className="text-gray-900 dark:text-white">$9.99</span>
                        </div>
                      </div>
                    </div>

                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                      Cancel Subscription
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Preferences
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center">
                      {theme === 'light' ? (
                        <Sun className="w-5 h-5 text-yellow-500 mr-3" />
                      ) : (
                        <Moon className="w-5 h-5 text-indigo-500 mr-3" />
                      )}
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Theme</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Choose your preferred theme
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={toggleTheme}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      {theme === 'light' ? 'Dark' : 'Light'} Mode
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center">
                      <Globe className="w-5 h-5 text-blue-500 mr-3" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Language</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Select your preferred language
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={toggleLanguage}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      {language === 'en' ? 'हिंदी' : 'English'}
                    </button>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3">Auto-save</h3>
                    <div className="space-y-2">
                      {[
                        { label: 'Save every 30 seconds', value: '30s' },
                        { label: 'Save every minute', value: '1m' },
                        { label: 'Save every 5 minutes', value: '5m' },
                        { label: 'Manual save only', value: 'manual' }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center">
                          <input
                            type="radio"
                            name="autosave"
                            value={option.value}
                            defaultChecked={option.value === '30s'}
                            className="text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};