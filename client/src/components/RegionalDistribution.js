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
  // Group data by region
  const regionData = {};
  data.forEach(item => {
    if (regionData[item.region]) {
      regionData[item.region]++;
    } else {
      regionData[item.region] = 1;
    }
  });

  const colors = [
    'rgba(59, 130, 246, 0.8)',
    'rgba(16, 185, 129, 0.8)',
    'rgba(245, 158, 11, 0.8)',
    'rgba(239, 68, 68, 0.8)',
    'rgba(147, 51, 234, 0.8)',
    'rgba(236, 72, 153, 0.8)',
  ];

  const chartData = {
    labels: Object.keys(regionData),
    datasets: [
      {
        data: Object.values(regionData),
        backgroundColor: colors.slice(0, Object.keys(regionData).length),
        borderColor: colors.slice(0, Object.keys(regionData).length).map(color => 
          color.replace('0.8)', '1)')
        ),
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Regional Distribution',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
  };

  return (
    <div className="card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Regional Distribution</h3>
        <p className="text-sm text-gray-600">Distribution of records across different regions</p>
      </div>
      <div className="h-80 flex items-center justify-center">
        <div className="w-64 h-64">
          <Doughnut data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default RegionalDistribution; 