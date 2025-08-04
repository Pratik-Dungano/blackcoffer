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

const SectorAnalysis = ({ data }) => {
  // Validate and provide fallback for data
  const chartData = Array.isArray(data) ? data : [];
  
  if (chartData.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sector Analysis</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No sector data available
        </div>
      </div>
    );
  }

  const sectorData = chartData.reduce((acc, item) => {
    if (item.sector) {
      acc[item.sector] = (acc[item.sector] || 0) + 1;
    }
    return acc;
  }, {});

  const sectors = Object.keys(sectorData);
  const counts = Object.values(sectorData);

  const chartConfig = {
    labels: sectors,
    datasets: [
      {
        label: 'Number of Records',
        data: counts,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
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
        text: 'Records by Sector',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Sector Analysis</h3>
      <div className="h-64">
        <Bar data={chartConfig} options={options} />
      </div>
    </div>
  );
};

export default SectorAnalysis; 