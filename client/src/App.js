import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import axios from 'axios';

// Configure axios base URL for deployment
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
axios.defaults.baseURL = API_BASE_URL;

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Start closed on mobile
  const [filters, setFilters] = useState({});
  const [stats, setStats] = useState({});
  const [data, setData] = useState([]);

  // Chart refs for PDF generation
  const chartRefs = {
    sectorAnalysis: useRef(null),
    intensityChart: useRef(null),
    topicTrends: useRef(null),
    regionalDistribution: useRef(null),
    yearAnalysis: useRef(null),
    swotAnalysis: useRef(null),
    pestleAnalysis: useRef(null)
  };

  // Fetch initial data
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [dataRes, statsRes] = await Promise.all([
        axios.get('/api/data'),
        axios.get('/api/stats')
      ]);
      setData(dataRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        <Header
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          stats={stats}
          data={data}
          chartRefs={chartRefs}
        />
        <div className="flex relative">
          {/* Sidebar */}
          <Sidebar isOpen={sidebarOpen} onFilterChange={handleFilterChange} />

          {/* Main Content - Fixed width and responsive */}
          <main className={`flex-1 min-w-0 transition-all duration-300 ease-in-out ${
            sidebarOpen
              ? 'lg:ml-64' // Only add margin on large screens when sidebar is open
              : 'ml-0' // No margin when sidebar is closed
          }`}>
            <div className="w-full max-w-full px-4 lg:px-6 py-4 lg:py-6">
              <Routes>
                <Route path="/" element={
                  <Dashboard
                    filters={filters}
                    stats={stats}
                    data={data}
                    chartRefs={chartRefs}
                  />
                } />
              </Routes>
            </div>
          </main>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </div>
      </div>
    </Router>
  );
}

export default App; 