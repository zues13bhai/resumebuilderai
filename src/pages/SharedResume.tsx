import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Download, Share2, Eye } from 'lucide-react';
import { ResumeData } from '../types/resume';
import { ResumePreviewEnhanced } from '../components/preview/ResumePreviewEnhanced';
import { exportToPDF } from '../utils/exportUtils';

export const SharedResume: React.FC = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSharedResume = () => {
      try {
        const encodedData = searchParams.get('data');
        if (encodedData) {
          const decodedData = JSON.parse(atob(decodeURIComponent(encodedData)));
          setResumeData(decodedData);
        } else {
          // Try to load from localStorage as fallback
          const savedData = localStorage.getItem(`resumeBuilder_data_${id}`);
          if (savedData) {
            setResumeData(JSON.parse(savedData));
          } else {
            setError('Resume not found');
          }
        }
      } catch (err) {
        console.error('Failed to load shared resume:', err);
        setError('Invalid resume link');
      } finally {
        setLoading(false);
      }
    };

    loadSharedResume();
  }, [id, searchParams]);

  const handleDownload = async () => {
    if (resumeData) {
      await exportToPDF(resumeData);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${resumeData?.personalInfo.fullName}'s Resume`,
        text: 'Check out this professional resume',
        url: window.location.href
      });
    } catch (err) {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      
      const toast = document.createElement('div');
      toast.textContent = 'Link copied to clipboard!';
      toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg z-50';
      document.body.appendChild(toast);
      setTimeout(() => document.body.removeChild(toast), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error || !resumeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Resume Not Found</h1>
          <p className="text-gray-600 mb-4">{error || 'The resume you\'re looking for doesn\'t exist.'}</p>
          <a
            href="/"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Create Your Own Resume
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-indigo-600 mr-3" />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {resumeData.personalInfo.fullName}'s Resume
                </h1>
                <p className="text-sm text-gray-500">Shared resume preview</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center text-sm text-gray-500">
                <Eye className="w-4 h-4 mr-1" />
                Public View
              </div>
              
              <button
                onClick={handleShare}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
              
              <button
                onClick={handleDownload}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <ResumePreviewEnhanced 
            resumeData={resumeData} 
            showActions={true}
          />
        </motion.div>
        
        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p className="text-sm">
            Created with{' '}
            <a 
              href="/" 
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              ResumeAI Pro
            </a>
            {' '}• Build your own professional resume
          </p>
        </div>
      </div>
    </div>
  );
};