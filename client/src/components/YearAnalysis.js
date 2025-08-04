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
  // Process data to group by year
  const yearData = {};
  data.forEach(item => {
    const year = item.start_year || item.end_year || 'Unknown';
    if (!yearData[year]) {
      yearData[year] = {
        count: 0,
        avgIntensity: 0,
        avgLikelihood: 0,
        avgRelevance: 0
      };
    }
    yearData[year].count++;
    yearData[year].avgIntensity += item.intensity || 0;
    yearData[year].avgLikelihood += item.likelihood || 0;
    yearData[year].avgRelevance += item.relevance || 0;
  });

  // Calculate averages
  Object.keys(yearData).forEach(year => {
    const data = yearData[year];
    data.avgIntensity = data.count > 0 ? data.avgIntensity / data.count : 0;
    data.avgLikelihood = data.count > 0 ? data.avgLikelihood / data.count : 0;
    data.avgRelevance = data.count > 0 ? data.avgRelevance / data.count : 0;
  });

  const sortedYears = Object.keys(yearData).sort((a, b) => {
    if (a === 'Unknown') return 1;
    if (b === 'Unknown') return -1;
    return parseInt(a) - parseInt(b);
  });

  const chartData = {
    labels: sortedYears,
    datasets: [
      {
        label: 'Number of Records',
        data: sortedYears.map(year => yearData[year].count),
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        label: 'Average Intensity',
        data: sortedYears.map(year => yearData[year].avgIntensity),
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        yAxisID: 'y1',
      },
      {
        label: 'Average Likelihood',
        data: sortedYears.map(year => yearData[year].avgLikelihood),
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        yAxisID: 'y1',
      }
    ],
  };

  const options = {
    responsive: true,
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
        text: 'Year-wise Analysis',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
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
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Year-wise Analysis</h3>
        <p className="text-sm text-gray-600">Trends in data volume and metrics over time</p>
      </div>
      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default YearAnalysis; 