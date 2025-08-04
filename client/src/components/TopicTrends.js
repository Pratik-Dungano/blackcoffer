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
  // Validate and provide fallback for data
  const chartData = Array.isArray(data) ? data : [];
  
  if (chartData.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Topic Trends</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No topic data available
        </div>
      </div>
    );
  }

  // Group data by topic and count occurrences
  const topicData = {};
  chartData.forEach(item => {
    if (item.topic) {
      topicData[item.topic] = (topicData[item.topic] || 0) + 1;
    }
  });

  // Get top 10 topics
  const topTopics = Object.entries(topicData)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);

  const chartConfig = {
    labels: topTopics.map(([topic]) => topic),
    datasets: [
      {
        label: 'Number of Records',
        data: topTopics.map(([, count]) => count),
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
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
        text: 'Top 10 Topics by Record Count',
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
          text: 'Topics',
        },
      },
    },
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Topic Trends</h3>
      <div className="h-64">
        <Line data={chartConfig} options={options} />
      </div>
    </div>
  );
};

export default TopicTrends; 