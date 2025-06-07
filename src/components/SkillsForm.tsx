import React, { useState } from 'react';
import { Award, Plus, X } from 'lucide-react';

interface SkillsFormProps {
  skills: string[];
  onChange: (skills: string[]) => void;
  jobAnalysis?: any;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ skills, onChange, jobAnalysis }) => {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onChange([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(skills.filter(skill => skill !== skillToRemove));
  };

  const addSuggestedSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      onChange([...skills, skill]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const suggestedSkills = jobAnalysis?.requiredSkills?.filter((skill: string) => 
    !skills.some(existingSkill => 
      existingSkill.toLowerCase().includes(skill.toLowerCase())
    )
  ) || [];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <Award className="w-5 h-5 text-indigo-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Core Competencies</h2>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Add a skill (e.g., JavaScript, Project Management)"
          />
          <button
            onClick={addSkill}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {suggestedSkills.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Suggested Skills from Job Description:</h3>
            <div className="flex flex-wrap gap-2">
              {suggestedSkills.map((skill: string, index: number) => (
                <button
                  key={index}
                  onClick={() => addSuggestedSkill(skill)}
                  className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full hover:bg-green-200 transition-colors duration-200 border border-green-300"
                >
                  + {skill}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Your Skills:</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full"
              >
                <span>{skill}</span>
                <button
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-indigo-600 hover:text-indigo-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          
          {skills.length === 0 && (
            <p className="text-gray-500 text-sm">No skills added yet. Add your key competencies above.</p>
          )}
        </div>
      </div>

      <div className="mt-4 p-3 bg-teal-50 rounded-md">
        <p className="text-sm text-teal-800">
          <strong>ATS Tip:</strong> Include both hard skills (technical abilities) and soft skills (communication, leadership). 
          Match skills from the job description when relevant.
        </p>
      </div>
    </div>
  );
};