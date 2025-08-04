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

const SWOTAnalysis = ({ data }) => {
  // Derive SWOT analysis from data based on keywords and context
  const swotCategories = {
    'Strength': 0,
    'Weakness': 0,
    'Opportunity': 0,
    'Threat': 0
  };

  // Keywords to categorize SWOT
  const swotKeywords = {
    'Strength': ['growth', 'increase', 'expansion', 'success', 'positive', 'strong', 'leading', 'dominant'],
    'Weakness': ['decline', 'decrease', 'challenge', 'difficulty', 'struggle', 'weak', 'failing', 'loss'],
    'Opportunity': ['potential', 'opportunity', 'emerging', 'new', 'future', 'prospect', 'chance', 'possibility'],
    'Threat': ['threat', 'risk', 'danger', 'crisis', 'problem', 'issue', 'concern', 'warning']
  };

  data.forEach(item => {
    const text = `${item.title} ${item.insight}`.toLowerCase();
    let maxScore = 0;
    let category = 'Strength';

    Object.keys(swotKeywords).forEach(swotCat => {
      const score = swotKeywords[swotCat].reduce((acc, keyword) => {
        return acc + (text.includes(keyword) ? 1 : 0);
      }, 0);
      
      if (score > maxScore) {
        maxScore = score;
        category = swotCat;
      }
    });

    if (maxScore > 0) {
      swotCategories[category]++;
    } else {
      // Default categorization based on intensity and likelihood
      if (item.intensity > 7 && item.likelihood > 3) {
        swotCategories['Strength']++;
      } else if (item.intensity < 4 && item.likelihood < 2) {
        swotCategories['Weakness']++;
      } else if (item.intensity > 6 && item.likelihood < 3) {
        swotCategories['Opportunity']++;
      } else {
        swotCategories['Threat']++;
      }
    }
  });

  const chartData = {
    labels: Object.keys(swotCategories),
    datasets: [
      {
        data: Object.values(swotCategories),
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)', // Green for Strength
          'rgba(239, 68, 68, 0.8)',   // Red for Weakness
          'rgba(59, 130, 246, 0.8)',  // Blue for Opportunity
          'rgba(245, 158, 11, 0.8)',  // Yellow for Threat
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(245, 158, 11, 1)',
        ],
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
        text: 'SWOT Analysis Distribution',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <div className="card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">SWOT Analysis</h3>
        <p className="text-sm text-gray-600">Distribution of records across SWOT categories (Strength, Weakness, Opportunity, Threat)</p>
      </div>
      <div className="h-80 flex items-center justify-center">
        <div className="w-64 h-64">
          <Doughnut data={chartData} options={options} />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{swotCategories['Strength']}</div>
          <div className="text-sm text-gray-600">Strengths</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{swotCategories['Weakness']}</div>
          <div className="text-sm text-gray-600">Weaknesses</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{swotCategories['Opportunity']}</div>
          <div className="text-sm text-gray-600">Opportunities</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">{swotCategories['Threat']}</div>
          <div className="text-sm text-gray-600">Threats</div>
        </div>
      </div>
    </div>
  );
};

export default SWOTAnalysis; 