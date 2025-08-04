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

const TopicTrends = ({ data }) => {
  // Process data to group by topic and year
  const topicYearData = {};
  const years = new Set();

  data.forEach(item => {
    const topic = item._id.topic;
    const year = item._id.year;
    years.add(year);
    
    if (!topicYearData[topic]) {
      topicYearData[topic] = {};
    }
    topicYearData[topic][year] = item.count;
  });

  const sortedYears = Array.from(years).sort();
  const colors = [
    'rgba(59, 130, 246, 1)',
    'rgba(16, 185, 129, 1)',
    'rgba(245, 158, 11, 1)',
    'rgba(239, 68, 68, 1)',
    'rgba(147, 51, 234, 1)',
    'rgba(236, 72, 153, 1)',
  ];

  const datasets = Object.keys(topicYearData).map((topic, index) => ({
    label: topic,
    data: sortedYears.map(year => topicYearData[topic][year] || 0),
    borderColor: colors[index % colors.length],
    backgroundColor: colors[index % colors.length].replace('1)', '0.1)'),
    borderWidth: 2,
    tension: 0.4,
  }));

  const chartData = {
    labels: sortedYears,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Topic Trends Over Time',
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
          text: 'Year',
        },
      },
    },
  };

  return (
    <div className="card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Topic Trends</h3>
        <p className="text-sm text-gray-600">Evolution of topics over time</p>
      </div>
      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default TopicTrends; 