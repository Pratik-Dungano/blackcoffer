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

const YearAnalysis = ({ data }) => {
  // Validate and provide fallback for data
  const chartData = Array.isArray(data) ? data : [];
  
  if (chartData.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Year Analysis</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No year data available
        </div>
      </div>
    );
  }

  // Group data by year
  const yearData = {};
  chartData.forEach(item => {
    const year = item.end_year || item.start_year;
    if (year) {
      if (!yearData[year]) {
        yearData[year] = {
          count: 0,
          totalIntensity: 0,
          totalLikelihood: 0
        };
      }
      yearData[year].count++;
      yearData[year].totalIntensity += item.intensity || 0;
      yearData[year].totalLikelihood += item.likelihood || 0;
    }
  });

  const years = Object.keys(yearData).sort();
  const recordCounts = years.map(year => yearData[year].count);
  const avgIntensities = years.map(year => yearData[year].totalIntensity / yearData[year].count);
  const avgLikelihoods = years.map(year => yearData[year].totalLikelihood / yearData[year].count);

  const chartConfig = {
    labels: years,
    datasets: [
      {
        label: 'Number of Records',
        data: recordCounts,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        yAxisID: 'y',
        tension: 0.1,
      },
      {
        label: 'Average Intensity',
        data: avgIntensities,
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        yAxisID: 'y1',
        tension: 0.1,
      },
      {
        label: 'Average Likelihood',
        data: avgLikelihoods.map(val => val * 100), // Convert to percentage
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        yAxisID: 'y1',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Year Analysis',
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Year',
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Number of Records',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Average Values',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Year Analysis</h3>
      <div className="h-64">
        <Line data={chartConfig} options={options} />
      </div>
    </div>
  );
};

export default YearAnalysis; 