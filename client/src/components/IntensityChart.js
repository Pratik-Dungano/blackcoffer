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
  // Group data by intensity ranges
  const intensityRanges = {
    '0-20': 0,
    '21-40': 0,
    '41-60': 0,
    '61-80': 0,
    '81-100': 0,
  };

  data.forEach(item => {
    if (item.intensity <= 20) intensityRanges['0-20']++;
    else if (item.intensity <= 40) intensityRanges['21-40']++;
    else if (item.intensity <= 60) intensityRanges['41-60']++;
    else if (item.intensity <= 80) intensityRanges['61-80']++;
    else intensityRanges['81-100']++;
  });

  const chartData = {
    labels: Object.keys(intensityRanges),
    datasets: [
      {
        label: 'Number of Records',
        data: Object.values(intensityRanges),
        borderColor: 'rgba(147, 51, 234, 1)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Intensity Distribution',
        font: {
          size: 16,
          weight: 'bold',
        },
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
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Intensity Distribution</h3>
        <p className="text-sm text-gray-600">Distribution of intensity values across all records</p>
      </div>
      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default IntensityChart; 