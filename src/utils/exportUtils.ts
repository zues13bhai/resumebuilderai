import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ResumeData } from '../types/resume';

/**
 * Export resume as PDF using html2canvas and jsPDF
 * Handles multi-page content and preserves styling
 */
export const exportToPDF = async (resumeData: ResumeData): Promise<void> => {
  try {
    // Get the resume preview element
    const element = document.querySelector('[data-resume-preview]') as HTMLElement;
    if (!element) {
      throw new Error('Resume preview element not found');
    }

    // Show loading state
    const loadingToast = document.createElement('div');
    loadingToast.textContent = 'Generating PDF...';
    loadingToast.className = 'fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50';
    document.body.appendChild(loadingToast);

    // Configure html2canvas for high quality
    const canvas = await html2canvas(element, {
      scale: 2, // Higher resolution
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
      scrollX: 0,
      scrollY: 0
    });

    // Calculate PDF dimensions (A4 size)
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 0;

    // Add first page
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if content overflows
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Generate filename
    const fileName = `${resumeData.personalInfo.fullName || 'Resume'}_${new Date().toISOString().split('T')[0]}.pdf`;
    
    // Save the PDF
    pdf.save(fileName);

    // Remove loading toast
    document.body.removeChild(loadingToast);

    // Show success toast
    const successToast = document.createElement('div');
    successToast.textContent = 'PDF exported successfully!';
    successToast.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg z-50';
    document.body.appendChild(successToast);
    setTimeout(() => document.body.removeChild(successToast), 3000);

  } catch (error) {
    console.error('PDF export failed:', error);
    
    // Show error toast
    const errorToast = document.createElement('div');
    errorToast.textContent = 'PDF export failed. Please try again.';
    errorToast.className = 'fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg z-50';
    document.body.appendChild(errorToast);
    setTimeout(() => document.body.removeChild(errorToast), 3000);
  }
};

/**
 * Export resume as DOCX (placeholder for future implementation)
 */
export const exportToDocx = async (resumeData: ResumeData): Promise<void> => {
  // TODO: Implement DOCX export using docx library
  console.log('DOCX export coming soon', resumeData);
  
  const toast = document.createElement('div');
  toast.textContent = 'DOCX export coming soon!';
  toast.className = 'fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50';
  document.body.appendChild(toast);
  setTimeout(() => document.body.removeChild(toast), 3000);
};

/**
 * Print resume using browser's print functionality
 */
export const printResume = (): void => {
  const element = document.querySelector('[data-resume-preview]') as HTMLElement;
  if (!element) {
    console.error('Resume preview element not found');
    return;
  }

  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    console.error('Could not open print window');
    return;
  }

  // Copy styles and content
  const styles = Array.from(document.styleSheets)
    .map(styleSheet => {
      try {
        return Array.from(styleSheet.cssRules)
          .map(rule => rule.cssText)
          .join('\n');
      } catch (e) {
        return '';
      }
    })
    .join('\n');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Resume</title>
        <style>
          ${styles}
          @media print {
            body { margin: 0; }
            .no-print { display: none !important; }
          }
        </style>
      </head>
      <body>
        ${element.outerHTML}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
};