import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const RegionalDistribution = ({ data }) => {
  // Validate and provide fallback for data
  const chartData = Array.isArray(data) ? data : [];
  
  if (chartData.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Distribution</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No regional data available
        </div>
      </div>
    );
  }

  // Group data by region
  const regionData = {};
  chartData.forEach(item => {
    if (item.region) {
      regionData[item.region] = (regionData[item.region] || 0) + 1;
    }
  });

  const regions = Object.keys(regionData);
  const counts = Object.values(regionData);

  const colors = [
    'rgba(59, 130, 246, 0.8)',
    'rgba(16, 185, 129, 0.8)',
    'rgba(245, 158, 11, 0.8)',
    'rgba(239, 68, 68, 0.8)',
    'rgba(147, 51, 234, 0.8)',
    'rgba(236, 72, 153, 0.8)',
    'rgba(34, 197, 94, 0.8)',
    'rgba(249, 115, 22, 0.8)',
  ];

  const chartConfig = {
    labels: regions,
    datasets: [
      {
        data: counts,
        backgroundColor: colors.slice(0, regions.length),
        borderColor: colors.slice(0, regions.length).map(color => color.replace('0.8', '1')),
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
        text: 'Records by Region',
      },
    },
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Distribution</h3>
      <div className="h-64">
        <Doughnut data={chartConfig} options={options} />
      </div>
    </div>
  );
};

export default RegionalDistribution; 