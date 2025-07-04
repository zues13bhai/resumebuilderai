import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Linkedin, Globe, Github } from 'lucide-react';
import { ResumeData } from '../../types/resume';

interface PersonalInfoFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof ResumeData['personalInfo'], value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const fields = [
    { key: 'fullName', label: 'Full Name', icon: User, type: 'text', required: true, placeholder: 'John Doe' },
    { key: 'email', label: 'Email Address', icon: Mail, type: 'email', required: true, placeholder: 'john@example.com' },
    { key: 'phone', label: 'Phone Number', icon: Phone, type: 'tel', required: true, placeholder: '+1 (555) 123-4567' },
    { key: 'location', label: 'Location', icon: MapPin, type: 'text', required: true, placeholder: 'New York, NY' },
    { key: 'linkedin', label: 'LinkedIn Profile', icon: Linkedin, type: 'url', placeholder: 'https://linkedin.com/in/johndoe' },
    { key: 'portfolio', label: 'Portfolio Website', icon: Globe, type: 'url', placeholder: 'https://johndoe.com' },
    { key: 'github', label: 'GitHub Profile', icon: Github, type: 'url', placeholder: 'https://github.com/johndoe' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <div className="flex items-center mb-6">
        <User className="w-6 h-6 text-indigo-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Personal Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field) => (
          <div key={field.key} className={field.key === 'fullName' ? 'md:col-span-2' : ''}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <div className="flex items-center">
                <field.icon className="w-4 h-4 mr-2" />
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </div>
            </label>
            <input
              type={field.type}
              value={data.personalInfo[field.key as keyof typeof data.personalInfo] || ''}
              onChange={(e) => handleChange(field.key as keyof typeof data.personalInfo, e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
              placeholder={field.placeholder}
              required={field.required}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="font-medium text-blue-900 dark:text-blue-400 mb-2">💡 Pro Tips</h3>
        <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
          <li>• Use a professional email address (avoid nicknames or numbers)</li>
          <li>• Include your city and state/country for location targeting</li>
          <li>• LinkedIn profiles with photos get 14x more views</li>
          <li>• Portfolio websites showcase your work effectively</li>
        </ul>
      </div>
    </motion.div>
  );
};