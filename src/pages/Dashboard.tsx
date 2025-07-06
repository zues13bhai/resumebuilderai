import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  FileText, 
  TrendingUp, 
  Users, 
  Crown, 
  Zap,
  Target,
  BarChart3,
  Calendar,
  Eye,
  Download,
  Share2,
  Edit3,
  Copy,
  Trash2
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useResume } from '../contexts/ResumeContext';
import { usePremium } from '../contexts/PremiumContext';
import { Link } from 'react-router-dom';
import { PremiumBadge } from '../components/premium/PremiumBadge';
import { AIResumeEnhancer, ResumeAnalytics } from '../components/premium/PremiumFeatures';
import { UnlockPremiumModal } from '../components/premium/UnlockPremiumModal';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { resumes, duplicateResume, deleteResume } = useResume();
  const { isPremium } = usePremium();
  const [selectedResume, setSelectedResume] = useState<string | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const stats = [
    {
      title: 'Total Resumes',
      value: resumes.length,
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      change: '+2 this month'
    },
    {
      title: 'Profile Views',
      value: '1,247',
      icon: Eye,
      color: 'from-green-500 to-green-600',
      change: '+15% this week'
    },
    {
      title: 'Downloads',
      value: '89',
      icon: Download,
      color: 'from-purple-500 to-purple-600',
      change: '+8 this week'
    },
    {
      title: 'ATS Score',
      value: '92%',
      icon: Target,
      color: 'from-orange-500 to-orange-600',
      change: '+5% improved'
    }
  ];

  const recentActivity = [
    { action: 'Resume "Software Engineer" viewed', time: '2 hours ago', type: 'view' },
    { action: 'AI suggestions applied', time: '1 day ago', type: 'ai' },
    { action: 'Resume downloaded as PDF', time: '2 days ago', type: 'download' },
    { action: 'New template applied', time: '3 days ago', type: 'template' }
  ];

  const quickActions = [
    {
      title: 'Create New Resume',
      description: 'Start from scratch with AI assistance',
      icon: Plus,
      color: 'from-indigo-500 to-purple-600',
      action: () => {},
      premium: false
    },
    {
      title: 'AI Resume Review',
      description: 'Get instant feedback and suggestions',
      icon: Zap,
      color: 'from-yellow-500 to-orange-600',
      action: () => setShowPremiumModal(true),
      premium: true
    },
    {
      title: 'Job Matcher',
      description: 'Find resumes that match job descriptions',
      icon: Target,
      color: 'from-green-500 to-teal-600',
      action: () => setShowPremiumModal(true),
      premium: true
    },
    {
      title: 'Analytics Dashboard',
      description: 'Track performance and engagement',
      icon: BarChart3,
      color: 'from-pink-500 to-rose-600',
      action: () => setShowPremiumModal(true),
      premium: true
    }
  ];

  return (
    <>
      {/* 🌟 UI Upgrade Start */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Welcome Header */}
        <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-8 text-white shadow-2xl shadow-indigo-500/25">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold mb-3 flex items-center"
              >
                Welcome back, {user?.name}! 👋
                {isPremium && <PremiumBadge size="md" className="ml-4" />}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-indigo-100 text-lg font-medium"
              >
                Ready to build your next career milestone?
              </motion.p>
            </div>
            <div className="text-right">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold mb-1"
              >
                {isPremium ? 'Premium' : 'Free'}
              </motion.div>
              <div className="text-indigo-100 font-medium">Plan</div>
              {!isPremium && (
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPremiumModal(true)}
                  className="mt-3 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/30 transition-all duration-300 border border-white/20"
                >
                  Upgrade to Premium
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={action.action}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 text-left relative overflow-hidden group border border-gray-100 dark:border-gray-700"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              <div className={`p-4 rounded-2xl bg-gradient-to-r ${action.color} w-fit mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center text-lg">
                {action.title}
                {action.premium && !isPremium && (
                  <Crown className="w-4 h-4 text-yellow-500 ml-2" />
                )}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {action.description}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Resumes */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Your Resumes
                </h2>
                <Link
                  to="/builder"
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 flex items-center group"
                >
                  <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                  New Resume
                </Link>
              </div>

              {resumes.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    No resumes yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                    Create your first resume to get started on your career journey
                  </p>
                  <Link
                    to="/builder"
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 inline-flex items-center group"
                  >
                    <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                    Create Your First Resume
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {resumes.map((resume) => (
                    <motion.div
                      key={resume.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.01 }}
                      className="border border-gray-200 dark:border-gray-700 rounded-2xl p-5 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-750"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-18 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <FileText className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                              {resume.title || 'Untitled Resume'}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              Updated {new Date(resume.updatedAt || Date.now()).toLocaleDateString()}
                            </p>
                            <div className="flex items-center space-x-4">
                              <span className="text-xs bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-1.5 rounded-full font-semibold">
                                ATS Score: 85%
                              </span>
                              <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full">
                                142 views
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200"
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200"
                          >
                            <Share2 className="w-4 h-4" />
                          </motion.button>
                          <Link
                            to={`/builder/${resume.id}`}
                            className="p-3 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all duration-200"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => duplicateResume(resume.id)}
                            className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200"
                          >
                            <Copy className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteResume(resume.id)}
                            className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      activity.type === 'view' ? 'bg-blue-500' :
                      activity.type === 'ai' ? 'bg-purple-500' :
                      activity.type === 'download' ? 'bg-green-500' :
                      'bg-orange-500'
                    } shadow-lg`} />
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white font-medium">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Premium Features Showcase */}
            {isPremium ? (
              <AIResumeEnhancer 
                resumeData={resumes[0]} 
                onUpdate={() => {}} 
              />
            ) : (
              <div className="bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 rounded-2xl p-6 text-white shadow-2xl shadow-purple-500/25">
                <div className="flex items-center mb-4">
                  <Zap className="w-6 h-6 mr-3" />
                  <h3 className="text-lg font-bold">AI Insights</h3>
                </div>
                <p className="text-purple-100 mb-4 text-sm leading-relaxed">
                  Your resume could benefit from more quantified achievements. 
                  Add specific metrics to increase your ATS score by 15%.
                </p>
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPremiumModal(true)}
                  className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/30 transition-all duration-300 border border-white/20 w-full"
                >
                  Unlock AI Features
                </motion.button>
              </div>
            )}

            {/* Upgrade Prompt for Free Users */}
            {!isPremium && (
              <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-2xl p-6 text-white shadow-2xl shadow-orange-500/25">
                <div className="flex items-center mb-4">
                  <Crown className="w-6 h-6 mr-3" />
                  <h3 className="text-lg font-bold">Unlock Premium</h3>
                </div>
                <ul className="text-yellow-100 mb-4 text-sm space-y-2">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-yellow-200 rounded-full mr-2"></div>
                    Unlimited resumes
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-yellow-200 rounded-full mr-2"></div>
                    AI-powered suggestions
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-yellow-200 rounded-full mr-2"></div>
                    Premium templates
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-yellow-200 rounded-full mr-2"></div>
                    Analytics dashboard
                  </li>
                </ul>
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPremiumModal(true)}
                  className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/30 transition-all duration-300 border border-white/20 w-full"
                >
                  Upgrade Now - $9.99/month
                </motion.button>
              </div>
            )}
          </div>
        </div>

        {/* Premium Analytics Section */}
        {isPremium && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <ResumeAnalytics />
          </motion.div>
        )}
      </motion.div>
      {/* 🌟 UI Upgrade End */}

      <UnlockPremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
      />
    </>
  );
};