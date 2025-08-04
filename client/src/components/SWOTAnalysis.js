import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const SWOTAnalysis = ({ data }) => {
  // Validate and provide fallback for data
  const chartData = Array.isArray(data) ? data : [];
  
  if (chartData.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">SWOT Analysis</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No SWOT data available
        </div>
      </div>
    );
  }

  // Define SWOT keywords
  const swotKeywords = {
    'Strength': ['growth', 'increase', 'expansion', 'success', 'positive', 'strong', 'improve'],
    'Weakness': ['decline', 'decrease', 'challenge', 'difficulty', 'struggle', 'weak', 'problem'],
    'Opportunity': ['potential', 'opportunity', 'emerging', 'new', 'future', 'chance', 'prospect'],
    'Threat': ['threat', 'risk', 'danger', 'crisis', 'problem', 'concern', 'issue']
  };

  // Analyze data for SWOT categories
  const swotCounts = {
    'Strength': 0,
    'Weakness': 0,
    'Opportunity': 0,
    'Threat': 0
  };

  chartData.forEach(item => {
    const text = `${item.title || ''} ${item.insight || ''}`.toLowerCase();
    
    for (const [category, keywords] of Object.entries(swotKeywords)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        swotCounts[category]++;
        break; // Only count once per item
      }
    }
  });

  const labels = Object.keys(swotCounts);
  const values = Object.values(swotCounts);
  const colors = [
    'rgba(34, 197, 94, 0.8)',   // Green for Strength
    'rgba(239, 68, 68, 0.8)',   // Red for Weakness
    'rgba(59, 130, 246, 0.8)',  // Blue for Opportunity
    'rgba(245, 158, 11, 0.8)',  // Orange for Threat
  ];

  const chartConfig = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        borderColor: colors.map(color => color.replace('0.8', '1')),
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'SWOT Analysis Distribution',
      },
    },
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">SWOT Analysis</h3>
      <div className="h-64">
        <Doughnut data={chartConfig} options={options} />
      </div>
    </div>
  );
};

export default SWOTAnalysis; 