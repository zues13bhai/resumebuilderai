import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Crown, 
  Eye, 
  Download, 
  Star,
  Filter,
  Search,
  Grid,
  List
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const templates = [
  {
    id: 'modern',
    name: 'Modern Professional',
    category: 'Professional',
    premium: false,
    rating: 4.8,
    downloads: 12500,
    preview: '/templates/modern.jpg',
    description: 'Clean, modern design perfect for tech and creative roles'
  },
  {
    id: 'executive',
    name: 'Executive Elite',
    category: 'Executive',
    premium: true,
    rating: 4.9,
    downloads: 8900,
    preview: '/templates/executive.jpg',
    description: 'Sophisticated layout for senior leadership positions'
  },
  {
    id: 'creative',
    name: 'Creative Portfolio',
    category: 'Creative',
    premium: true,
    rating: 4.7,
    downloads: 6700,
    preview: '/templates/creative.jpg',
    description: 'Bold design for designers and creative professionals'
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    category: 'Minimal',
    premium: false,
    rating: 4.6,
    downloads: 15200,
    preview: '/templates/minimal.jpg',
    description: 'Simple, ATS-friendly design for any industry'
  },
  {
    id: 'academic',
    name: 'Academic Scholar',
    category: 'Academic',
    premium: true,
    rating: 4.8,
    downloads: 3400,
    preview: '/templates/academic.jpg',
    description: 'Traditional format for academic and research positions'
  },
  {
    id: 'startup',
    name: 'Startup Innovator',
    category: 'Startup',
    premium: true,
    rating: 4.9,
    downloads: 5600,
    preview: '/templates/startup.jpg',
    description: 'Dynamic design for startup and entrepreneurial roles'
  }
];

const categories = ['All', 'Professional', 'Executive', 'Creative', 'Minimal', 'Academic', 'Startup'];

export const Templates: React.FC = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleUseTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template?.premium && user?.plan === 'free') {
      // Show upgrade modal
      return;
    }
    // Navigate to builder with template
    window.location.href = `/builder?template=${templateId}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Palette className="w-8 h-8 mr-3" />
              Resume Templates
            </h1>
            <p className="text-purple-100 text-lg">
              Choose from our collection of professionally designed templates
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{templates.length}</div>
            <div className="text-purple-100">Templates Available</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
              viewMode === 'list' ? 'flex' : ''
            }`}
          >
            {/* Template Preview */}
            <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-[3/4]'} bg-gray-100 dark:bg-gray-700`}>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-600 dark:text-gray-400">
                  <Palette className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">Preview</p>
                </div>
              </div>
              
              {/* Premium Badge */}
              {template.premium && (
                <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </div>
              )}

              {/* Quick Actions */}
              <div className="absolute bottom-3 left-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setSelectedTemplate(template.id)}
                  className="flex-1 bg-white text-gray-900 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Preview
                </button>
                <button
                  onClick={() => handleUseTemplate(template.id)}
                  className="flex-1 bg-indigo-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  Use Template
                </button>
              </div>
            </div>

            {/* Template Info */}
            <div className="p-6 flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
                    {template.name}
                  </h3>
                  <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                    {template.category}
                  </span>
                </div>
                {template.premium && user?.plan === 'free' && (
                  <Crown className="w-5 h-5 text-yellow-500" />
                )}
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {template.description}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  {template.rating}
                </div>
                <div className="flex items-center">
                  <Download className="w-4 h-4 mr-1" />
                  {template.downloads.toLocaleString()}
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedTemplate(template.id)}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                >
                  Preview
                </button>
                <button
                  onClick={() => handleUseTemplate(template.id)}
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all text-sm font-medium"
                >
                  {template.premium && user?.plan === 'free' ? 'Upgrade to Use' : 'Use Template'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <Palette className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No templates found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Upgrade Prompt for Free Users */}
      {user?.plan === 'free' && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-8 text-white text-center">
          <Crown className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Unlock Premium Templates</h3>
          <p className="text-yellow-100 mb-6">
            Get access to all premium templates, unlimited downloads, and exclusive designs
          </p>
          <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Upgrade to Premium - $9.99/month
          </button>
        </div>
      )}
    </motion.div>
  );
};