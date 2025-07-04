import React from 'react';
import { motion } from 'framer-motion';
import { Code, Plus, Trash2, ExternalLink, Github, Calendar } from 'lucide-react';
import { ResumeData, Project } from '../../types/resume';

interface ProjectsFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, onChange }) => {
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      link: '',
      github: '',
      startDate: '',
      endDate: '',
      highlights: []
    };
    
    onChange({
      ...data,
      projects: [...data.projects, newProject]
    });
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onChange({
      ...data,
      projects: data.projects.map(project => 
        project.id === id ? { ...project, [field]: value } : project
      )
    });
  };

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter(project => project.id !== id)
    });
  };

  const addHighlight = (projectId: string) => {
    const project = data.projects.find(p => p.id === projectId);
    if (project) {
      updateProject(projectId, 'highlights', [...(project.highlights || []), '']);
    }
  };

  const updateHighlight = (projectId: string, index: number, value: string) => {
    const project = data.projects.find(p => p.id === projectId);
    if (project) {
      const newHighlights = [...(project.highlights || [])];
      newHighlights[index] = value;
      updateProject(projectId, 'highlights', newHighlights);
    }
  };

  const removeHighlight = (projectId: string, index: number) => {
    const project = data.projects.find(p => p.id === projectId);
    if (project) {
      const newHighlights = (project.highlights || []).filter((_, i) => i !== index);
      updateProject(projectId, 'highlights', newHighlights);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Code className="w-6 h-6 text-indigo-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h2>
        </div>
        <button
          onClick={addProject}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </button>
      </div>

      <div className="space-y-6">
        {data.projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Project #{index + 1}
              </h3>
              <button
                onClick={() => removeProject(project.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Project Name *
                </label>
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="E-commerce Website, Mobile App, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Start Date
                </label>
                <input
                  type="month"
                  value={project.startDate || ''}
                  onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  End Date
                </label>
                <input
                  type="month"
                  value={project.endDate || ''}
                  onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <ExternalLink className="w-4 h-4 inline mr-1" />
                  Live Demo URL
                </label>
                <input
                  type="url"
                  value={project.link || ''}
                  onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="https://myproject.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <Github className="w-4 h-4 inline mr-1" />
                  GitHub Repository
                </label>
                <input
                  type="url"
                  value={project.github || ''}
                  onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Project Description *
              </label>
              <textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                rows={3}
                placeholder="Brief description of the project, its purpose, and your role..."
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Technologies Used
              </label>
              <input
                type="text"
                value={project.technologies.join(', ')}
                onChange={(e) => updateProject(project.id, 'technologies', e.target.value.split(', ').filter(tech => tech.trim()))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="React, Node.js, MongoDB, AWS (separate with commas)"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Highlights */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Key Highlights & Achievements
                </label>
                <button
                  onClick={() => addHighlight(project.id)}
                  className="text-indigo-600 hover:text-indigo-800 text-sm"
                >
                  + Add Highlight
                </button>
              </div>
              
              <div className="space-y-2">
                {(project.highlights || []).map((highlight, highlightIndex) => (
                  <div key={highlightIndex} className="flex items-start space-x-2">
                    <textarea
                      value={highlight}
                      onChange={(e) => updateHighlight(project.id, highlightIndex, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                      rows={2}
                      placeholder="• Implemented feature X that improved performance by Y%"
                    />
                    <button
                      onClick={() => removeHighlight(project.id, highlightIndex)}
                      className="text-red-500 hover:text-red-700 mt-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {data.projects.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Code className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No projects added yet
            </h3>
            <p className="mb-4">Showcase your work with project examples</p>
            <button
              onClick={addProject}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Project
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <h3 className="font-medium text-green-900 dark:text-green-400 mb-2">🚀 Project Tips</h3>
        <ul className="text-sm text-green-800 dark:text-green-300 space-y-1">
          <li>• Include 3-5 most relevant projects that showcase your skills</li>
          <li>• Focus on projects that align with your target role</li>
          <li>• Highlight your specific contributions and impact</li>
          <li>• Include live demos and GitHub links when possible</li>
          <li>• Mention technologies and tools used</li>
          <li>• Quantify results where applicable (users, performance improvements, etc.)</li>
        </ul>
      </div>
    </motion.div>
  );
};