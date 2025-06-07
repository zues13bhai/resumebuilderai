import React from 'react';
import { Download, Eye } from 'lucide-react';
import { ResumeData } from '../types/resume';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const handleDownload = () => {
    // In a real implementation, this would generate and download a PDF
    alert('PDF download functionality would be implemented here using libraries like jsPDF or Puppeteer');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Eye className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Resume Preview</h2>
          </div>
          <button
            onClick={handleDownload}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </button>
        </div>
      </div>

      <div className="p-8 bg-white" style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.4' }}>
        {/* Header */}
        <div className="text-center mb-6 pb-4 border-b-2 border-gray-300">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {resumeData.personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="text-sm text-gray-600 space-x-4">
            {resumeData.personalInfo.email && (
              <span>{resumeData.personalInfo.email}</span>
            )}
            {resumeData.personalInfo.phone && (
              <span>• {resumeData.personalInfo.phone}</span>
            )}
            {resumeData.personalInfo.location && (
              <span>• {resumeData.personalInfo.location}</span>
            )}
          </div>
          {(resumeData.personalInfo.linkedin || resumeData.personalInfo.portfolio) && (
            <div className="text-sm text-gray-600 mt-1">
              {resumeData.personalInfo.linkedin && (
                <span>{resumeData.personalInfo.linkedin}</span>
              )}
              {resumeData.personalInfo.portfolio && (
                <span>{resumeData.personalInfo.linkedin ? ' • ' : ''}{resumeData.personalInfo.portfolio}</span>
              )}
            </div>
          )}
        </div>

        {/* Professional Summary */}
        {resumeData.professionalSummary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-sm text-gray-700">
              {resumeData.professionalSummary}
            </p>
          </div>
        )}

        {/* Core Competencies */}
        {resumeData.coreCompetencies.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
              CORE COMPETENCIES
            </h2>
            <div className="grid grid-cols-3 gap-x-4 text-sm text-gray-700">
              {resumeData.coreCompetencies.map((skill, index) => (
                <div key={index} className="mb-1">• {skill}</div>
              ))}
            </div>
          </div>
        )}

        {/* Professional Experience */}
        {resumeData.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
              PROFESSIONAL EXPERIENCE
            </h2>
            {resumeData.experience.map((exp, index) => (
              <div key={exp.id} className={`mb-4 ${index !== resumeData.experience.length - 1 ? 'pb-4' : ''}`}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-sm text-gray-700">{exp.company}{exp.location && `, ${exp.location}`}</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.achievements.filter(ach => ach.trim()).length > 0 && (
                  <ul className="text-sm text-gray-700 ml-4">
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
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
              EDUCATION
            </h2>
            {resumeData.education.map((edu, index) => (
              <div key={edu.id} className="mb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                    <p className="text-sm text-gray-700">{edu.institution}</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDate(edu.graduationDate)}
                  </div>
                </div>
                {edu.gpa && (
                  <p className="text-sm text-gray-700">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {resumeData.certifications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
              CERTIFICATIONS
            </h2>
            {resumeData.certifications.map((cert, index) => (
              <div key={cert.id} className="mb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{cert.name}</h3>
                    <p className="text-sm text-gray-700">{cert.issuer}</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDate(cert.date)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {resumeData.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
              PROJECTS
            </h2>
            {resumeData.projects.map((project, index) => (
              <div key={project.id} className="mb-3">
                <h3 className="font-bold text-gray-900">{project.name}</h3>
                <p className="text-sm text-gray-700 mb-1">{project.description}</p>
                {project.technologies.length > 0 && (
                  <p className="text-sm text-gray-600">
                    <strong>Technologies:</strong> {project.technologies.join(', ')}
                  </p>
                )}
                {project.link && (
                  <p className="text-sm text-gray-600">
                    <strong>Link:</strong> {project.link}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};