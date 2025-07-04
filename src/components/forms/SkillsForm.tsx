import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Plus, X, Star, Zap, Target } from 'lucide-react';
import { ResumeData, Skill } from '../../types/resume';

interface SkillsFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const skillCategories = [
  { id: 'technical', label: 'Technical Skills', color: 'bg-blue-100 text-blue-800' },
  { id: 'soft', label: 'Soft Skills', color: 'bg-green-100 text-green-800' },
  { id: 'language', label: 'Languages', color: 'bg-purple-100 text-purple-800' },
  { id: 'tool', label: 'Tools & Software', color: 'bg-orange-100 text-orange-800' },
  { id: 'framework', label: 'Frameworks', color: 'bg-pink-100 text-pink-800' }
];

const skillLevels = [
  { id: 'beginner', label: 'Beginner', stars: 1 },
  { id: 'intermediate', label: 'Intermediate', stars: 2 },
  { id: 'advanced', label: 'Advanced', stars: 3 },
  { id: 'expert', label: 'Expert', stars: 4 }
];

const suggestedSkills = {
  technical: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'AWS', 'Docker', 'Git'],
  soft: ['Leadership', 'Communication', 'Problem Solving', 'Teamwork', 'Time Management', 'Adaptability'],
  language: ['English', 'Spanish', 'French', 'German', 'Mandarin', 'Japanese'],
  tool: ['Figma', 'Adobe Creative Suite', 'Slack', 'Jira', 'Trello', 'Microsoft Office'],
  framework: ['React', 'Angular', 'Vue.js', 'Django', 'Flask', 'Express.js']
};

export const SkillsForm: React.FC<SkillsFormProps> = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('technical');
  const [selectedLevel, setSelectedLevel] = useState<string>('intermediate');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const skills = data.skills || [];

  const addSkill = () => {
    if (newSkill.trim() && !skills.some(skill => skill.name.toLowerCase() === newSkill.toLowerCase())) {
      const skill: Skill = {
        id: Date.now().toString(),
        name: newSkill.trim(),
        category: selectedCategory as any,
        level: selectedLevel as any
      };
      
      onChange({
        ...data,
        skills: [...skills, skill],
        coreCompetencies: [...data.coreCompetencies, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillId: string) => {
    const skillToRemove = skills.find(s => s.id === skillId);
    onChange({
      ...data,
      skills: skills.filter(skill => skill.id !== skillId),
      coreCompetencies: data.coreCompetencies.filter(comp => comp !== skillToRemove?.name)
    });
  };

  const addSuggestedSkill = (skillName: string) => {
    if (!skills.some(skill => skill.name.toLowerCase() === skillName.toLowerCase())) {
      const skill: Skill = {
        id: Date.now().toString(),
        name: skillName,
        category: selectedCategory as any,
        level: 'intermediate'
      };
      
      onChange({
        ...data,
        skills: [...skills, skill],
        coreCompetencies: [...data.coreCompetencies, skillName]
      });
    }
  };

  const updateSkillLevel = (skillId: string, level: string) => {
    onChange({
      ...data,
      skills: skills.map(skill => 
        skill.id === skillId ? { ...skill, level: level as any } : skill
      )
    });
  };

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  const renderStars = (level: string) => {
    const levelData = skillLevels.find(l => l.id === level);
    const stars = levelData?.stars || 2;
    
    return (
      <div className="flex">
        {[...Array(4)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${i < stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Award className="w-6 h-6 text-indigo-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Skills & Competencies</h2>
        </div>
        
        <button
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="flex items-center px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm"
        >
          <Zap className="w-4 h-4 mr-2" />
          Suggestions
        </button>
      </div>

      {/* Add New Skill */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-gray-900 dark:text-white mb-3">Add New Skill</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addSkill()}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Enter skill name"
          />
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            {skillCategories.map(category => (
              <option key={category.id} value={category.id}>{category.label}</option>
            ))}
          </select>
          
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            {skillLevels.map(level => (
              <option key={level.id} value={level.id}>{level.label}</option>
            ))}
          </select>
          
          <button
            onClick={addSkill}
            disabled={!newSkill.trim()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
          </button>
        </div>
      </div>

      {/* Skill Suggestions */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6"
          >
            <h3 className="font-medium text-blue-900 dark:text-blue-400 mb-3 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Suggested Skills for {skillCategories.find(c => c.id === selectedCategory)?.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {suggestedSkills[selectedCategory as keyof typeof suggestedSkills]?.map((skill) => (
                <button
                  key={skill}
                  onClick={() => addSuggestedSkill(skill)}
                  disabled={skills.some(s => s.name.toLowerCase() === skill.toLowerCase())}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  + {skill}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skills by Category */}
      <div className="space-y-6">
        {skillCategories.map(category => {
          const categorySkills = getSkillsByCategory(category.id);
          if (categorySkills.length === 0) return null;

          return (
            <div key={category.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                <span className={`px-2 py-1 rounded-full text-xs font-medium mr-2 ${category.color}`}>
                  {category.label}
                </span>
                <span className="text-sm text-gray-500">({categorySkills.length})</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {categorySkills.map(skill => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">{skill.name}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        {renderStars(skill.level)}
                        <select
                          value={skill.level}
                          onChange={(e) => updateSkillLevel(skill.id, e.target.value)}
                          className="text-xs border-none bg-transparent text-gray-600 dark:text-gray-400 focus:outline-none"
                        >
                          {skillLevels.map(level => (
                            <option key={level.id} value={level.id}>{level.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {skills.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Award className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No skills added yet. Add your key competencies above.</p>
        </div>
      )}

      <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <h3 className="font-medium text-green-900 dark:text-green-400 mb-2">💡 Skill Optimization Tips</h3>
        <ul className="text-sm text-green-800 dark:text-green-300 space-y-1">
          <li>• Include 8-12 skills relevant to your target role</li>
          <li>• Mix technical and soft skills for a well-rounded profile</li>
          <li>• Use industry-standard terminology and keywords</li>
          <li>• Be honest about your skill levels - employers may test them</li>
          <li>• Update skills regularly as you learn and grow</li>
        </ul>
      </div>
    </motion.div>
  );
};