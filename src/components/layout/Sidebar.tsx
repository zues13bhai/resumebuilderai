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
    <>
      {/* 🌟 UI Upgrade Start */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 z-40 shadow-xl"
      >
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <nav className="flex-1 px-4 py-8 space-y-3">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center px-4 py-3.5 text-sm font-medium rounded-2xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 transform scale-[1.02]'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-indigo-600 dark:hover:text-indigo-400 hover:transform hover:scale-[1.02]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`mr-4 h-5 w-5 transition-transform duration-300 ${
                      isActive ? 'text-white scale-110' : 'text-gray-500 group-hover:text-indigo-500 group-hover:scale-110'
                    }`} />
                    <span className="font-semibold">{item.name}</span>
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
              className="p-4 m-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl text-white shadow-2xl"
            >
              <div className="flex items-center mb-3">
                <Crown className="w-6 h-6 mr-3" />
                <h3 className="font-bold text-lg">Upgrade to Premium</h3>
              </div>
              <p className="text-indigo-100 mb-4 text-sm leading-relaxed">
                Unlock AI features, unlimited resumes, and premium templates.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-4 rounded-xl font-semibold text-sm hover:bg-white/30 transition-all duration-300 border border-white/20"
              >
                Upgrade Now
              </motion.button>
            </motion.div>
          )}

          {/* Usage Stats */}
          <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-medium">
              Resume Usage
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {user?.resumesCreated || 0} / {user?.maxResumes || 3}
              </span>
              <span className="text-xs text-gray-500">
                {Math.round(((user?.resumesCreated || 0) / (user?.maxResumes || 3)) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${((user?.resumesCreated || 0) / (user?.maxResumes || 3)) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full shadow-sm"
              />
            </div>
          </div>
        </div>
      </motion.aside>
      {/* 🌟 UI Upgrade End */}
    </>
  );
};
