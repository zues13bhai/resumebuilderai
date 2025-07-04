import React from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, Eye } from 'lucide-react';
import { ResumeData } from '../../types/resume';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const getTemplate = () => {
    switch (resumeData.template) {
      case 'modern':
        return ModernTemplate;
      case 'executive':
        return ExecutiveTemplate;
      case 'creative':
        return CreativeTemplate;
      default:
        return ModernTemplate;
    }
  };

  const TemplateComponent = getTemplate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white shadow-2xl rounded-lg overflow-hidden"
      style={{ aspectRatio: '8.5/11', minHeight: '600px' }}
    >
      <div className="h-full overflow-auto p-8 text-sm leading-relaxed">
        <TemplateComponent resumeData={resumeData} formatDate={formatDate} />
      </div>
    </motion.div>
  );
};

// Modern Template
const ModernTemplate: React.FC<{ resumeData: ResumeData; formatDate: (date: string) => string }> = ({ resumeData, formatDate }) => (
  <div className="space-y-6">
    {/* Header */}
    <div className="text-center border-b-2 border-indigo-600 pb-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {resumeData.personalInfo.fullName || 'Your Name'}
      </h1>
      <div className="text-gray-600 space-x-4 text-sm">
        {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
        {resumeData.personalInfo.phone && <span>• {resumeData.personalInfo.phone}</span>}
        {resumeData.personalInfo.location && <span>• {resumeData.personalInfo.location}</span>}
      </div>
      {(resumeData.personalInfo.linkedin || resumeData.personalInfo.portfolio) && (
        <div className="text-gray-600 mt-1 text-sm">
          {resumeData.personalInfo.linkedin && <span>{resumeData.personalInfo.linkedin}</span>}
          {resumeData.personalInfo.portfolio && (
            <span>{resumeData.personalInfo.linkedin ? ' • ' : ''}{resumeData.personalInfo.portfolio}</span>
          )}
        </div>
      )}
    </div>

    {/* Professional Summary */}
    {resumeData.professionalSummary && (
      <div>
        <h2 className="text-lg font-bold text-indigo-600 mb-2 uppercase tracking-wide">
          Professional Summary
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {resumeData.professionalSummary}
        </p>
      </div>
    )}

    {/* Core Competencies */}
    {resumeData.coreCompetencies.length > 0 && (
      <div>
        <h2 className="text-lg font-bold text-indigo-600 mb-2 uppercase tracking-wide">
          Core Competencies
        </h2>
        <div className="grid grid-cols-3 gap-x-4 text-gray-700">
          {resumeData.coreCompetencies.map((skill, index) => (
            <div key={index} className="mb-1">• {skill}</div>
          ))}
        </div>
      </div>
    )}

    {/* Professional Experience */}
    {resumeData.experience.length > 0 && (
      <div>
        <h2 className="text-lg font-bold text-indigo-600 mb-2 uppercase tracking-wide">
          Professional Experience
        </h2>
        {resumeData.experience.map((exp, index) => (
          <div key={exp.id} className={`mb-4 ${index !== resumeData.experience.length - 1 ? 'pb-4' : ''}`}>
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="font-bold text-gray-900">{exp.position}</h3>
                <p className="text-gray-700">{exp.company}{exp.location && `, ${exp.location}`}</p>
              </div>
              <div className="text-gray-600 text-right">
                {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
              </div>
            </div>
            {exp.achievements.filter(ach => ach.trim()).length > 0 && (
              <ul className="text-gray-700 ml-4">
                {exp.achievements.filter(ach => ach.trim()).map((achievement, achIndex) => (
                  <li key={achIndex} className="mb-1">• {achievement}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    )}

    {/* Education */}
    {resumeData.education.length > 0 && (
      <div>
        <h2 className="text-lg font-bold text-indigo-600 mb-2 uppercase tracking-wide">
          Education
        </h2>
        {resumeData.education.map((edu) => (
          <div key={edu.id} className="mb-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                <p className="text-gray-700">{edu.institution}</p>
              </div>
              <div className="text-gray-600">
                {formatDate(edu.graduationDate)}
              </div>
            </div>
            {edu.gpa && (
              <p className="text-gray-700">GPA: {edu.gpa}</p>
            )}
          </div>
        ))}
      </div>
    )}

    {/* Projects */}
    {resumeData.projects.length > 0 && (
      <div>
        <h2 className="text-lg font-bold text-indigo-600 mb-2 uppercase tracking-wide">
          Projects
        </h2>
        {resumeData.projects.map((project) => (
          <div key={project.id} className="mb-3">
            <h3 className="font-bold text-gray-900">{project.name}</h3>
            <p className="text-gray-700 mb-1">{project.description}</p>
            {project.technologies.length > 0 && (
              <p className="text-gray-600">
                <strong>Technologies:</strong> {project.technologies.join(', ')}
              </p>
            )}
          </div>
        ))}
      </div>
    )}

    {/* Certifications */}
    {resumeData.certifications.length > 0 && (
      <div>
        <h2 className="text-lg font-bold text-indigo-600 mb-2 uppercase tracking-wide">
          Certifications
        </h2>
        {resumeData.certifications.map((cert) => (
          <div key={cert.id} className="mb-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900">{cert.name}</h3>
                <p className="text-gray-700">{cert.issuer}</p>
              </div>
              <div className="text-gray-600">
                {formatDate(cert.date)}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

// Executive Template
const ExecutiveTemplate: React.FC<{ resumeData: ResumeData; formatDate: (date: string) => string }> = ({ resumeData, formatDate }) => (
  <div className="space-y-6">
    {/* Header with elegant styling */}
    <div className="text-center pb-6 border-b border-gray-300">
      <h1 className="text-4xl font-light text-gray-900 mb-3 tracking-wide">
        {resumeData.personalInfo.fullName || 'Your Name'}
      </h1>
      <div className="text-gray-600 space-x-6">
        {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
        {resumeData.personalInfo.phone && <span>|</span>}
        {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
        {resumeData.personalInfo.location && <span>|</span>}
        {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
      </div>
    </div>

    {/* Executive Summary */}
    {resumeData.professionalSummary && (
      <div>
        <h2 className="text-xl font-light text-gray-900 mb-3 border-b border-gray-200 pb-1">
          EXECUTIVE SUMMARY
        </h2>
        <p className="text-gray-700 leading-relaxed text-justify">
          {resumeData.professionalSummary}
        </p>
      </div>
    )}

    {/* Core Competencies in a more executive style */}
    {resumeData.coreCompetencies.length > 0 && (
      <div>
        <h2 className="text-xl font-light text-gray-900 mb-3 border-b border-gray-200 pb-1">
          CORE COMPETENCIES
        </h2>
        <div className="grid grid-cols-2 gap-x-8 text-gray-700">
          {resumeData.coreCompetencies.map((skill, index) => (
            <div key={index} className="mb-2 flex items-center">
              <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
              {skill}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Professional Experience with executive focus */}
    {resumeData.experience.length > 0 && (
      <div>
        <h2 className="text-xl font-light text-gray-900 mb-3 border-b border-gray-200 pb-1">
          PROFESSIONAL EXPERIENCE
        </h2>
        {resumeData.experience.map((exp, index) => (
          <div key={exp.id} className={`mb-6 ${index !== resumeData.experience.length - 1 ? 'pb-4 border-b border-gray-100' : ''}`}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                <p className="text-gray-700 font-medium">{exp.company}</p>
                {exp.location && <p className="text-gray-600">{exp.location}</p>}
              </div>
              <div className="text-gray-600 text-right">
                <div className="font-medium">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </div>
              </div>
            </div>
            {exp.achievements.filter(ach => ach.trim()).length > 0 && (
              <ul className="text-gray-700 space-y-1">
                {exp.achievements.filter(ach => ach.trim()).map((achievement, achIndex) => (
                  <li key={achIndex} className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {achievement}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    )}

    {/* Education */}
    {resumeData.education.length > 0 && (
      <div>
        <h2 className="text-xl font-light text-gray-900 mb-3 border-b border-gray-200 pb-1">
          EDUCATION
        </h2>
        {resumeData.education.map((edu) => (
          <div key={edu.id} className="mb-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-gray-700">{edu.field} • {edu.institution}</p>
              </div>
              <div className="text-gray-600 font-medium">
                {formatDate(edu.graduationDate)}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

// Creative Template
const CreativeTemplate: React.FC<{ resumeData: ResumeData; formatDate: (date: string) => string }> = ({ resumeData, formatDate }) => (
  <div className="space-y-6">
    {/* Creative Header */}
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 -m-8 mb-6">
      <h1 className="text-3xl font-bold mb-2">
        {resumeData.personalInfo.fullName || 'Your Name'}
      </h1>
      <div className="text-purple-100 space-x-4">
        {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
        {resumeData.personalInfo.phone && <span>• {resumeData.personalInfo.phone}</span>}
        {resumeData.personalInfo.location && <span>• {resumeData.personalInfo.location}</span>}
      </div>
    </div>

    {/* About Me */}
    {resumeData.professionalSummary && (
      <div>
        <h2 className="text-xl font-bold text-purple-600 mb-3 flex items-center">
          <span className="w-4 h-4 bg-purple-600 rounded-full mr-3"></span>
          About Me
        </h2>
        <p className="text-gray-700 leading-relaxed pl-7">
          {resumeData.professionalSummary}
        </p>
      </div>
    )}

    {/* Skills with visual elements */}
    {resumeData.coreCompetencies.length > 0 && (
      <div>
        <h2 className="text-xl font-bold text-purple-600 mb-3 flex items-center">
          <span className="w-4 h-4 bg-purple-600 rounded-full mr-3"></span>
          Skills & Expertise
        </h2>
        <div className="pl-7 flex flex-wrap gap-2">
          {resumeData.coreCompetencies.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    )}

    {/* Experience with creative styling */}
    {resumeData.experience.length > 0 && (
      <div>
        <h2 className="text-xl font-bold text-purple-600 mb-3 flex items-center">
          <span className="w-4 h-4 bg-purple-600 rounded-full mr-3"></span>
          Experience
        </h2>
        <div className="pl-7 space-y-4">
          {resumeData.experience.map((exp) => (
            <div key={exp.id} className="border-l-2 border-purple-200 pl-4 pb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900">{exp.position}</h3>
                  <p className="text-purple-600 font-medium">{exp.company}</p>
                </div>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              {exp.achievements.filter(ach => ach.trim()).length > 0 && (
                <ul className="text-gray-700 space-y-1">
                  {exp.achievements.filter(ach => ach.trim()).map((achievement, achIndex) => (
                    <li key={achIndex} className="flex items-start">
                      <span className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Projects with creative layout */}
    {resumeData.projects.length > 0 && (
      <div>
        <h2 className="text-xl font-bold text-purple-600 mb-3 flex items-center">
          <span className="w-4 h-4 bg-purple-600 rounded-full mr-3"></span>
          Featured Projects
        </h2>
        <div className="pl-7 space-y-3">
          {resumeData.projects.map((project) => (
            <div key={project.id} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-1">{project.name}</h3>
              <p className="text-gray-700 text-sm mb-2">{project.description}</p>
              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-pink-100 text-pink-800 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Education */}
    {resumeData.education.length > 0 && (
      <div>
        <h2 className="text-xl font-bold text-purple-600 mb-3 flex items-center">
          <span className="w-4 h-4 bg-purple-600 rounded-full mr-3"></span>
          Education
        </h2>
        <div className="pl-7">
          {resumeData.education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
              <p className="text-gray-700">{edu.institution} • {formatDate(edu.graduationDate)}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);