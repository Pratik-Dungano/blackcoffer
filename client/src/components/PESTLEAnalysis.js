import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PESTLEAnalysis = ({ data }) => {
  // Validate and provide fallback for data
  const chartData = Array.isArray(data) ? data : [];
  
  if (chartData.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">PESTLE Analysis</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No PESTLE data available
        </div>
      </div>
    );
  }

  // Group data by PESTLE category
  const pestleData = {};
  chartData.forEach(item => {
    if (item.pestle) {
      pestleData[item.pestle] = (pestleData[item.pestle] || 0) + 1;
    }
  });

  const pestleCategories = Object.keys(pestleData);
  const counts = Object.values(pestleData);

  const colors = [
    'rgba(59, 130, 246, 0.8)',   // Blue for Political
    'rgba(16, 185, 129, 0.8)',   // Green for Economic
    'rgba(236, 72, 153, 0.8)',   // Pink for Social
    'rgba(245, 158, 11, 0.8)',   // Orange for Technological
    'rgba(239, 68, 68, 0.8)',    // Red for Legal
    'rgba(34, 197, 94, 0.8)',    // Green for Environmental
  ];

  const chartConfig = {
    labels: pestleCategories,
    datasets: [
      {
        label: 'Number of Records',
        data: counts,
        backgroundColor: colors.slice(0, pestleCategories.length),
        borderColor: colors.slice(0, pestleCategories.length).map(color => color.replace('0.8', '1')),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Records by PESTLE Category',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Records',
        },
      },
      y: {
        title: {
          display: true,
          text: 'PESTLE Categories',
        },
      },
    },
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">PESTLE Analysis</h3>
      <div className="h-64">
        <Bar data={chartConfig} options={options} />
      </div>
    </div>
  );
};

export default PESTLEAnalysis; 