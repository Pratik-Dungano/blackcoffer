import React from 'react';
import { BarChart3, TrendingUp, Menu, Bell, User } from 'lucide-react';
import PrintButton from './PrintButton';

const Header = ({ onMenuClick, stats, data, chartRefs }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center space-x-2 lg:space-x-4">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu className="h-5 w-5 text-gray-600" />
        </button>
        <div className="flex items-center space-x-2 lg:space-x-3">
          <div className="flex items-center space-x-1 lg:space-x-2">
            <BarChart3 className="h-6 w-6 lg:h-8 lg:w-8 text-primary-600" />
            <TrendingUp className="h-4 w-4 lg:h-6 lg:w-6 text-primary-500" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg lg:text-xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-xs lg:text-sm text-gray-600">Data insights & visualizations</p>
          </div>
          <div className="sm:hidden">
            <h1 className="text-base font-bold text-gray-900">Dashboard</h1>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 lg:space-x-4">
        <div className="hidden lg:block text-sm text-gray-600">
          <span className="font-medium">Real-time</span> data analysis
        </div>
        
        {/* Print Button */}
        <PrintButton stats={stats} data={data} chartRefs={chartRefs} />
        
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <User className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </header>
  );
};

export default Header; 