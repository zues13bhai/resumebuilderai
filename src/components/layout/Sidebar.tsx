import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  Palette, 
  BarChart3, 
  Settings,
  Crown,
  Zap,
  Target,
  Users
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Resume Builder', href: '/builder', icon: FileText },
  { name: 'Templates', href: '/templates', icon: Palette },
  { name: 'Analytics', href: '/analytics', icon: BarChart3, premium: true },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const { user } = useAuth();

  return (
    <motion.aside 
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-r border-gray-200 dark:border-gray-700 z-40"
    >
      <div className="flex flex-col h-full">
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  {item.name}
                  {item.premium && user?.plan === 'free' && (
                    <Crown className="ml-auto h-4 w-4 text-yellow-500" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Upgrade Card */}
        {user?.plan === 'free' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 m-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white"
          >
            <div className="flex items-center mb-2">
              <Crown className="w-5 h-5 mr-2" />
              <h3 className="font-semibold">Upgrade to Premium</h3>
            </div>
            <p className="text-sm text-indigo-100 mb-3">
              Unlock AI features, unlimited resumes, and premium templates.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-white text-indigo-600 py-2 px-4 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
            >
              Upgrade Now
            </motion.button>
          </motion.div>
        )}

        {/* Usage Stats */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Resume Usage
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {user?.resumesCreated || 0} / {user?.maxResumes || 3}
            </span>
            <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                style={{ width: `${((user?.resumesCreated || 0) / (user?.maxResumes || 3)) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};