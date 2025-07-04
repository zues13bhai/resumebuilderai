import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Download, 
  Share2,
  Calendar,
  MapPin,
  Users,
  Clock,
  Target,
  Crown
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Analytics: React.FC = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('7d');

  if (user?.plan === 'free') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-12 text-white max-w-2xl mx-auto">
          <Crown className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Analytics Dashboard</h1>
          <p className="text-purple-100 mb-8 text-lg">
            Track your resume performance, views, and engagement with detailed analytics.
            Upgrade to Premium to unlock this powerful feature.
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Upgrade to Premium - $9.99/month
          </button>
        </div>
      </motion.div>
    );
  }

  const stats = [
    {
      title: 'Total Views',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Eye,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Downloads',
      value: '156',
      change: '+8.2%',
      trend: 'up',
      icon: Download,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Shares',
      value: '89',
      change: '+15.7%',
      trend: 'up',
      icon: Share2,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Avg. View Time',
      value: '2m 34s',
      change: '+5.1%',
      trend: 'up',
      icon: Clock,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const topResumes = [
    { name: 'Software Engineer Resume', views: 1247, downloads: 89, score: 92 },
    { name: 'Product Manager CV', views: 856, downloads: 45, score: 88 },
    { name: 'UX Designer Portfolio', views: 744, downloads: 22, score: 85 }
  ];

  const viewsByLocation = [
    { country: 'United States', views: 1247, percentage: 44 },
    { country: 'United Kingdom', views: 456, percentage: 16 },
    { country: 'Canada', views: 389, percentage: 14 },
    { country: 'Australia', views: 234, percentage: 8 },
    { country: 'Germany', views: 189, percentage: 7 },
    { country: 'Others', views: 332, percentage: 11 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <BarChart3 className="w-8 h-8 mr-3" />
              Analytics Dashboard
            </h1>
            <p className="text-indigo-100 text-lg">
              Track your resume performance and engagement
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white/20 text-white border border-white/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
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
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className="w-4 h-4 mr-1" />
                {stat.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Performing Resumes */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Top Performing Resumes
          </h3>
          <div className="space-y-4">
            {topResumes.map((resume, index) => (
              <div key={resume.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{resume.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <span className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {resume.views} views
                    </span>
                    <span className="flex items-center">
                      <Download className="w-3 h-3 mr-1" />
                      {resume.downloads} downloads
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {resume.score}%
                  </div>
                  <div className="text-sm text-gray-500">ATS Score</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Views by Location */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Views by Location
          </h3>
          <div className="space-y-4">
            {viewsByLocation.map((location, index) => (
              <div key={location.country} className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-900 dark:text-white">{location.country}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                      style={{ width: `${location.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                    {location.views}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Engagement Timeline
        </h3>
        <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <BarChart3 className="w-12 h-12 mx-auto mb-2" />
            <p>Interactive chart would be rendered here</p>
            <p className="text-sm">Showing views, downloads, and shares over time</p>
          </div>
        </div>
      </div>

      {/* Insights and Recommendations */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2" />
          AI Insights & Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Peak Viewing Times</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your resumes get the most views on Tuesday-Thursday between 9-11 AM EST.
              Consider updating your content during these times for maximum visibility.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Optimization Tip</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Resumes with quantified achievements get 34% more downloads.
              Add specific metrics to your experience section to improve performance.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};