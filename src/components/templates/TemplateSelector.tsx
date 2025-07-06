import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Crown, Palette } from 'lucide-react';
import { usePremium } from '../../contexts/PremiumContext';

interface TemplateSelectorProps {
  currentTemplate: string;
  onSelect: (template: string) => void;
  onClose: () => void;
}

const templates = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean, contemporary design perfect for tech and business roles',
    premium: false,
    preview: '/templates/modern-preview.jpg'
  },
  {
    id: 'executive',
    name: 'Executive Elite',
    description: 'Sophisticated layout for senior leadership positions',
    premium: false, // 🧠 AI Assistant Start - Make all templates free
    preview: '/templates/executive-preview.jpg'
  },
  {
    id: 'creative',
    name: 'Creative Portfolio',
    description: 'Bold, artistic design for creative professionals',
    premium: false, // 🧠 AI Assistant Start - Make all templates free
    preview: '/templates/creative-preview.jpg'
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Simple, ATS-friendly design for any industry',
    premium: false,
    preview: '/templates/minimal-preview.jpg'
  },
  {
    id: 'academic',
    name: 'Academic Scholar',
    description: 'Traditional format for academic and research positions',
    premium: false, // 🧠 AI Assistant Start - Make all templates free
    preview: '/templates/academic-preview.jpg'
  },
  {
    id: 'startup',
    name: 'Startup Innovator',
    description: 'Dynamic design for startup and entrepreneurial roles',
    premium: false, // 🧠 AI Assistant Start - Make all templates free
    preview: '/templates/startup-preview.jpg'
  }
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ currentTemplate, onSelect, onClose }) => {
  const { isPremium } = usePremium();

  const handleSelect = (templateId: string) => {
    // 🧠 AI Assistant Start - Remove premium restrictions
    onSelect(templateId);
    // 🧠 AI Assistant End
  };

  return (
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
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full h-[80vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg mr-3">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Choose Template</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">All templates are now available</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className={`relative bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden cursor-pointer border-2 transition-all ${
                  currentTemplate === template.id
                    ? 'border-indigo-500 ring-2 ring-indigo-200'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
                onClick={() => handleSelect(template.id)}
              >
                {/* Preview */}
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-500 dark:text-gray-400">
                      <Palette className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm">Template Preview</p>
                    </div>
                  </div>
                  
                  {/* Selected Badge */}
                  {currentTemplate === template.id && (
                    <div className="absolute top-3 left-3 bg-indigo-600 text-white p-1 rounded-full">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-xs text-green-600 font-medium">Available</span>
                    </div>
                    
                    {currentTemplate === template.id ? (
                      <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full font-medium">
                        Current
                      </span>
                    ) : (
                      <button className="text-xs bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors">
                        Select
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {templates.length} professional templates available
            </div>
            <div className="text-sm text-green-600 font-medium">
              ✨ All templates unlocked!
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};