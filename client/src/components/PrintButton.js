import React, { useState, useRef } from 'react';
import { Printer, FileText, BarChart3, Download, FileSpreadsheet } from 'lucide-react';
import { generateDataReport, generateCSVReport, printDashboard, exportChartsAsImages } from '../utils/pdfGenerator';

const PrintButton = ({ stats, data, chartRefs }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const buttonRef = useRef(null);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      generateDataReport(stats, data);
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Error generating report. Please try again.');
    } finally {
      setIsGenerating(false);
      setShowOptions(false);
    }
  };

  const handleGenerateCSV = async () => {
    setIsGenerating(true);
    try {
      generateCSVReport(data);
    } catch (error) {
      console.error('Error generating CSV:', error);
      alert('Error generating CSV. Please try again.');
    } finally {
      setIsGenerating(false);
      setShowOptions(false);
    }
  };

  const handleExportCharts = async () => {
    setIsGenerating(true);
    try {
      await exportChartsAsImages(chartRefs);
    } catch (error) {
      console.error('Error exporting charts:', error);
      alert('Error exporting charts. Please try again.');
    } finally {
      setIsGenerating(false);
      setShowOptions(false);
    }
  };

  const handlePrintPage = () => {
    printDashboard();
    setShowOptions(false);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setShowOptions(!showOptions)}
        disabled={isGenerating}
        className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Generating...</span>
          </>
        ) : (
          <>
            <Printer className="h-4 w-4" />
            <span>Export Data</span>
          </>
        )}
      </button>

      {/* Dropdown Options */}
      {showOptions && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-2">
            <div className="text-sm font-medium text-gray-700 mb-2 px-2 py-1">
              Export Options
            </div>
            
            <button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="w-full flex items-center space-x-3 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileText className="h-4 w-4 text-blue-600" />
              <div>
                <div className="font-medium">Data Report (JSON)</div>
                <div className="text-xs text-gray-500">Statistics and data summary</div>
              </div>
            </button>

            <button
              onClick={handleGenerateCSV}
              disabled={isGenerating}
              className="w-full flex items-center space-x-3 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileSpreadsheet className="h-4 w-4 text-green-600" />
              <div>
                <div className="font-medium">Data Export (CSV)</div>
                <div className="text-xs text-gray-500">All data in spreadsheet format</div>
              </div>
            </button>

            <button
              onClick={handleExportCharts}
              disabled={isGenerating}
              className="w-full flex items-center space-x-3 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <BarChart3 className="h-4 w-4 text-purple-600" />
              <div>
                <div className="font-medium">Charts as Images</div>
                <div className="text-xs text-gray-500">Download chart images</div>
              </div>
            </button>

            <div className="border-t border-gray-200 my-2"></div>

            <button
              onClick={handlePrintPage}
              className="w-full flex items-center space-x-3 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
            >
              <Download className="h-4 w-4 text-orange-600" />
              <div>
                <div className="font-medium">Print Dashboard</div>
                <div className="text-xs text-gray-500">Browser print dialog</div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {showOptions && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowOptions(false)}
        />
      )}
    </div>
  );
};

export default PrintButton; 