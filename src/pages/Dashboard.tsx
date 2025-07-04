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
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { resumes, duplicateResume, deleteResume } = useResume();
  const [selectedResume, setSelectedResume] = useState<string | null>(null);

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
      action: () => {}
    },
    {
      title: 'AI Resume Review',
      description: 'Get instant feedback and suggestions',
      icon: Zap,
      color: 'from-yellow-500 to-orange-600',
      action: () => {},
      premium: true
    },
    {
      title: 'Job Matcher',
      description: 'Find resumes that match job descriptions',
      icon: Target,
      color: 'from-green-500 to-teal-600',
      action: () => {},
      premium: true
    },
    {
      title: 'Analytics Dashboard',
      description: 'Track performance and engagement',
      icon: BarChart3,
      color: 'from-pink-500 to-rose-600',
      action: () => {},
      premium: true
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-indigo-100 text-lg">
              Ready to build your next career milestone?
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{user?.plan === 'free' ? 'Free' : 'Premium'}</div>
            <div className="text-indigo-100">Plan</div>
            {user?.plan === 'free' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="mt-2 bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
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
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-green-600 font-medium">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{stat.title}</p>
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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={action.action}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-left relative overflow-hidden group"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
            <div className={`p-3 rounded-lg bg-gradient-to-r ${action.color} w-fit mb-4`}>
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
              {action.title}
              {action.premium && user?.plan === 'free' && (
                <Crown className="w-4 h-4 text-yellow-500 ml-2" />
              )}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {action.description}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Resumes */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Your Resumes
              </h2>
              <Link
                to="/builder"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Resume
              </Link>
            </div>

            {resumes.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No resumes yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Create your first resume to get started
                </p>
                <Link
                  to="/builder"
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all inline-flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Resume
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {resumes.map((resume) => (
                  <motion.div
                    key={resume.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {resume.title || 'Untitled Resume'}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Updated {new Date(resume.updatedAt || Date.now()).toLocaleDateString()}
                          </p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              ATS Score: 85%
                            </span>
                            <span className="text-xs text-gray-500">
                              142 views
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <Link
                          to={`/builder/${resume.id}`}
                          className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => duplicateResume(resume.id)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteResume(resume.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'view' ? 'bg-blue-500' :
                    activity.type === 'ai' ? 'bg-purple-500' :
                    activity.type === 'download' ? 'bg-green-500' :
                    'bg-orange-500'
                  }`} />
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
            <div className="flex items-center mb-4">
              <Zap className="w-6 h-6 mr-2" />
              <h3 className="text-lg font-semibold">AI Insights</h3>
            </div>
            <p className="text-purple-100 mb-4 text-sm">
              Your resume could benefit from more quantified achievements. 
              Add specific metrics to increase your ATS score by 15%.
            </p>
            <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors">
              Apply Suggestions
            </button>
          </div>

          {/* Upgrade Prompt */}
          {user?.plan === 'free' && (
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-6 text-white">
              <div className="flex items-center mb-4">
                <Crown className="w-6 h-6 mr-2" />
                <h3 className="text-lg font-semibold">Unlock Premium</h3>
              </div>
              <ul className="text-yellow-100 mb-4 text-sm space-y-1">
                <li>• Unlimited resumes</li>
                <li>• AI-powered suggestions</li>
                <li>• Premium templates</li>
                <li>• Analytics dashboard</li>
              </ul>
              <button className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors w-full">
                Upgrade Now - $9.99/month
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};