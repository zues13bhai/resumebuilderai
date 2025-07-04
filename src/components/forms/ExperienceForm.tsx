import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Plus, Trash2, Calendar, MapPin, Sparkles, Target } from 'lucide-react';
import { ResumeData, Experience } from '../../types/resume';
import { useAuth } from '../../hooks/useAuth';

interface ExperienceFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const experienceTypes = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
  { value: 'freelance', label: 'Freelance' }
];

const achievementTemplates = [
  "Increased [metric] by [percentage]% through [action/strategy]",
  "Led a team of [number] to [accomplish specific goal]",
  "Reduced [cost/time/errors] by [amount] by implementing [solution]",
  "Managed [budget/project] worth $[amount] resulting in [outcome]",
  "Developed [product/system] that [impact/benefit]"
];

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onChange }) => {
  const { user } = useAuth();
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState<string | null>(null);

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      achievements: [''],
      type: 'full-time'
    };
    
    onChange({
      ...data,
      experience: [...data.experience, newExperience]
    });
    setExpandedExperience(newExperience.id);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange({
      ...data,
      experience: data.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter(exp => exp.id !== id)
    });
  };

  const addAchievement = (expId: string) => {
    const updated = data.experience.map(exp => 
      exp.id === expId 
        ? { ...exp, achievements: [...exp.achievements, ''] }
        : exp
    );
    onChange({ ...data, experience: updated });
  };

  const updateAchievement = (expId: string, index: number, value: string) => {
    const updated = data.experience.map(exp => 
      exp.id === expId 
        ? { 
            ...exp, 
            achievements: exp.achievements.map((ach, i) => i === index ? value : ach)
          }
        : exp
    );
    onChange({ ...data, experience: updated });
  };

  const removeAchievement = (expId: string, index: number) => {
    const updated = data.experience.map(exp => 
      exp.id === expId 
        ? { 
            ...exp, 
            achievements: exp.achievements.filter((_, i) => i !== index)
          }
        : exp
    );
    onChange({ ...data, experience: updated });
  };

  const enhanceAchievement = async (expId: string, index: number) => {
    if (user?.plan === 'free') {
      alert('AI enhancement requires Premium subscription');
      return;
    }

    const experience = data.experience.find(exp => exp.id === expId);
    if (!experience) return;

    const currentAchievement = experience.achievements[index];
    
    // Simulate AI enhancement
    setTimeout(() => {
      const enhanced = `Enhanced: ${currentAchievement} - resulting in 25% improvement in team productivity and $50K cost savings`;
      updateAchievement(expId, index, enhanced);
    }, 1000);
  };

  const useTemplate = (expId: string, template: string) => {
    addAchievement(expId);
    const experience = data.experience.find(exp => exp.id === expId);
    if (experience) {
      const newIndex = experience.achievements.length - 1;
      updateAchievement(expId, newIndex, template);
    }
    setShowTemplates(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Briefcase className="w-6 h-6 text-indigo-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Professional Experience</h2>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </button>
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {data.experience.map((exp, expIndex) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Experience #{expIndex + 1}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setExpandedExperience(
                      expandedExperience === exp.id ? null : exp.id
                    )}
                    className="text-indigo-600 hover:text-indigo-800 text-sm"
                  >
                    {expandedExperience === exp.id ? 'Collapse' : 'Expand'}
                  </button>
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Company Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Position Title *
                  </label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Job Title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="City, State"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Employment Type
                  </label>
                  <select
                    value={exp.type || 'full-time'}
                    onChange={(e) => updateExperience(exp.id, 'type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {experienceTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Start Date *
                  </label>
                  <input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                {!exp.current && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      End Date
                    </label>
                    <input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">I currently work here</span>
                </label>
              </div>

              {/* Achievements Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Key Achievements & Responsibilities
                  </label>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowTemplates(showTemplates === exp.id ? null : exp.id)}
                      className="text-purple-600 hover:text-purple-800 text-sm flex items-center"
                    >
                      <Target className="w-3 h-3 mr-1" />
                      Templates
                    </button>
                    <button
                      onClick={() => addAchievement(exp.id)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm"
                    >
                      + Add Achievement
                    </button>
                  </div>
                </div>

                {/* Achievement Templates */}
                <AnimatePresence>
                  {showTemplates === exp.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg"
                    >
                      <h4 className="font-medium text-purple-900 dark:text-purple-400 mb-2">
                        Achievement Templates
                      </h4>
                      <div className="space-y-2">
                        {achievementTemplates.map((template, index) => (
                          <button
                            key={index}
                            onClick={() => useTemplate(exp.id, template)}
                            className="block w-full text-left p-2 text-sm bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-700 rounded hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
                          >
                            {template}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="space-y-3">
                  {exp.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} className="flex items-start space-x-2">
                      <textarea
                        value={achievement}
                        onChange={(e) => updateAchievement(exp.id, achIndex, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                        rows={2}
                        placeholder="• Start with an action verb and include quantifiable results (e.g., 'Increased sales by 25% through...')"
                      />
                      <div className="flex flex-col space-y-1">
                        <button
                          onClick={() => enhanceAchievement(exp.id, achIndex)}
                          className="p-2 text-purple-600 hover:text-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded transition-colors"
                          title="AI Enhance"
                        >
                          <Sparkles className="w-4 h-4" />
                        </button>
                        {exp.achievements.length > 1 && (
                          <button
                            onClick={() => removeAchievement(exp.id, achIndex)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {data.experience.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No experience added yet
            </h3>
            <p className="mb-4">Add your professional experience to showcase your career journey</p>
            <button
              onClick={addExperience}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Experience
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
        <h3 className="font-medium text-amber-900 dark:text-amber-400 mb-2">💡 Experience Writing Tips</h3>
        <ul className="text-sm text-amber-800 dark:text-amber-300 space-y-1">
          <li>• Start each bullet with a strong action verb (managed, developed, increased)</li>
          <li>• Include specific numbers and percentages when possible</li>
          <li>• Focus on achievements and impact, not just responsibilities</li>
          <li>• Use keywords relevant to your target industry</li>
          <li>• List experiences in reverse chronological order</li>
        </ul>
      </div>
    </motion.div>
  );
};