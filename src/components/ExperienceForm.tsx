import React, { useState } from 'react';
import { Briefcase, Plus, Trash2, Calendar } from 'lucide-react';
import { Experience } from '../types/resume';

interface ExperienceFormProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ experiences, onChange }) => {
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      achievements: ['']
    };
    onChange([...experiences, newExperience]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: string) => {
    onChange(experiences.filter(exp => exp.id !== id));
  };

  const addAchievement = (expId: string) => {
    const updated = experiences.map(exp => 
      exp.id === expId 
        ? { ...exp, achievements: [...exp.achievements, ''] }
        : exp
    );
    onChange(updated);
  };

  const updateAchievement = (expId: string, index: number, value: string) => {
    const updated = experiences.map(exp => 
      exp.id === expId 
        ? { 
            ...exp, 
            achievements: exp.achievements.map((ach, i) => i === index ? value : ach)
          }
        : exp
    );
    onChange(updated);
  };

  const removeAchievement = (expId: string, index: number) => {
    const updated = experiences.map(exp => 
      exp.id === expId 
        ? { 
            ...exp, 
            achievements: exp.achievements.filter((_, i) => i !== index)
          }
        : exp
    );
    onChange(updated);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Briefcase className="w-5 h-5 text-indigo-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Professional Experience</h2>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors duration-200"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add Experience
        </button>
      </div>

      <div className="space-y-6">
        {experiences.map((exp, expIndex) => (
          <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-medium text-gray-800">Experience #{expIndex + 1}</h3>
              <button
                onClick={() => removeExperience(exp.id)}
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Company Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position Title *
                </label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Job Title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="City, State"
                />
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                {!exp.current && (
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">I currently work here</span>
              </label>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Key Achievements & Responsibilities
                </label>
                <button
                  onClick={() => addAchievement(exp.id)}
                  className="text-indigo-600 hover:text-indigo-800 text-sm"
                >
                  + Add Achievement
                </button>
              </div>
              
              <div className="space-y-2">
                {exp.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex items-start space-x-2">
                    <textarea
                      value={achievement}
                      onChange={(e) => updateAchievement(exp.id, achIndex, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      rows={2}
                      placeholder="• Start with an action verb and include quantifiable results (e.g., 'Increased sales by 25% through...')"
                    />
                    {exp.achievements.length > 1 && (
                      <button
                        onClick={() => removeAchievement(exp.id, achIndex)}
                        className="text-red-500 hover:text-red-700 mt-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {experiences.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No experience added yet. Click "Add Experience" to get started.</p>
          </div>
        )}
      </div>

      <div className="mt-4 p-3 bg-amber-50 rounded-md">
        <p className="text-sm text-amber-800">
          <strong>ATS Tip:</strong> Use strong action verbs (managed, developed, increased) and include 
          quantifiable results. List experiences in reverse chronological order.
        </p>
      </div>
    </div>
  );
};