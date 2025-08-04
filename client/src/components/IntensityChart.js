import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const IntensityChart = ({ data }) => {
  // Validate and provide fallback for data
  const chartData = Array.isArray(data) ? data : [];
  
  if (chartData.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Intensity Distribution</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No intensity data available
        </div>
      </div>
    );
  }

  // Create intensity ranges
  const intensityRanges = [
    { min: 0, max: 20, label: '0-20' },
    { min: 21, max: 40, label: '21-40' },
    { min: 41, max: 60, label: '41-60' },
    { min: 61, max: 80, label: '61-80' },
    { min: 81, max: 100, label: '81-100' }
  ];

  const rangeCounts = intensityRanges.map(range => {
    return chartData.filter(item => 
      item.intensity >= range.min && item.intensity <= range.max
    ).length;
  });

  const chartConfig = {
    labels: intensityRanges.map(range => range.label),
    datasets: [
      {
        label: 'Number of Records',
        data: rangeCounts,
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Intensity Distribution',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Records',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Intensity Range',
        },
      },
    },
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Intensity Distribution</h3>
      <div className="h-64">
        <Line data={chartConfig} options={options} />
      </div>
    </div>
  );
};

export default IntensityChart; 