import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Eye } from 'lucide-react';

const DataTable = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [expandedRows, setExpandedRows] = useState(new Set());

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const toggleRow = (index) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(index)) {
      newExpandedRows.delete(index);
    } else {
      newExpandedRows.add(index);
    }
    setExpandedRows(newExpandedRows);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />;
  };

  const columns = [
    { key: 'topic', label: 'Topic' },
    { key: 'sector', label: 'Sector' },
    { key: 'country', label: 'Country' },
    { key: 'region', label: 'Region' },
    { key: 'intensity', label: 'Intensity' },
    { key: 'likelihood', label: 'Likelihood' },
    { key: 'relevance', label: 'Relevance' },
    { key: 'pestle', label: 'PESTLE' },
  ];

  return (
    <div className="card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Data Records</h3>
        <p className="text-sm text-gray-600">Showing {data.length} records</p>
      </div>
      
      <div className="table-container">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort(column.key)}
                    >
                      <div className="flex items-center space-x-1">
                        <span className="hidden sm:inline">{column.label}</span>
                        <span className="sm:hidden">{column.label.substring(0, 3)}</span>
                        {getSortIcon(column.key)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedData.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleRow(index)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="max-w-xs truncate" title={item.topic}>
                          {item.topic}
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="max-w-xs truncate" title={item.sector}>
                          {item.sector}
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.country}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.region}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.intensity >= 80 ? 'bg-red-100 text-red-800' :
                          item.intensity >= 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.intensity}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.likelihood}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.relevance}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.pestle === 'Political' ? 'bg-blue-100 text-blue-800' :
                          item.pestle === 'Economic' ? 'bg-green-100 text-green-800' :
                          item.pestle === 'Social' ? 'bg-purple-100 text-purple-800' :
                          item.pestle === 'Technological' ? 'bg-orange-100 text-orange-800' :
                          item.pestle === 'Legal' ? 'bg-red-100 text-red-800' :
                          item.pestle === 'Environmental' ? 'bg-teal-100 text-teal-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.pestle}
                        </span>
                      </td>
                    </tr>
                    {expandedRows.has(index) && (
                      <tr>
                        <td colSpan="9" className="px-6 py-4 bg-gray-50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Additional Details</h4>
                              <div className="space-y-1">
                                <p><span className="font-medium">Source:</span> {item.source}</p>
                                <p><span className="font-medium">Start Year:</span> {item.start_year}</p>
                                <p><span className="font-medium">End Year:</span> {item.end_year}</p>
                                <p><span className="font-medium">Impact:</span> {item.impact}</p>
                                <p><span className="font-medium">Added:</span> {item.added}</p>
                                <p><span className="font-medium">Published:</span> {item.published}</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Insight & Title</h4>
                              <p className="text-gray-700 mb-2"><span className="font-medium">Title:</span> {item.title}</p>
                              <p className="text-gray-700"><span className="font-medium">Insight:</span> {item.insight}</p>
                              {item.url && (
                                <a 
                                  href={item.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-primary-600 hover:text-primary-800 text-sm mt-2 inline-block"
                                >
                                  View Source
                                </a>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable; 