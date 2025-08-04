import React from 'react';
import { TrendingUp, Target, BarChart3, Activity } from 'lucide-react';

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: 'Average Intensity',
      value: stats.avgIntensity ? stats.avgIntensity.toFixed(1) : '0',
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+5.2%'
    },
    {
      title: 'Average Likelihood',
      value: stats.avgLikelihood ? (stats.avgLikelihood * 100).toFixed(1) + '%' : '0%',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+2.1%'
    },
    {
      title: 'Average Relevance',
      value: stats.avgRelevance ? (stats.avgRelevance * 100).toFixed(1) + '%' : '0%',
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+3.8%'
    },
    {
      title: 'Total Records',
      value: stats.totalRecords || '0',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '+12.5%'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-600 truncate">{card.title}</p>
                <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                <p className="text-xs text-green-600 mt-1">{card.change} from last month</p>
              </div>
              <div className={`p-2 lg:p-3 rounded-full ${card.bgColor} flex-shrink-0 ml-3`}>
                <IconComponent className={`h-5 w-5 lg:h-6 lg:w-6 ${card.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards; 