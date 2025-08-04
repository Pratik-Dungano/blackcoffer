import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import StatsCards from './StatsCards';
import SectorAnalysis from './SectorAnalysis';
import IntensityChart from './IntensityChart';
import TopicTrends from './TopicTrends';
import RegionalDistribution from './RegionalDistribution';
import DataTable from './DataTable';
import PESTLEAnalysis from './PESTLEAnalysis';
import YearAnalysis from './YearAnalysis';
import SWOTAnalysis from './SWOTAnalysis';

const Dashboard = ({ filters = {}, stats, data, chartRefs }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [sectorAnalysis, setSectorAnalysis] = useState([]);
  const [topicTrends, setTopicTrends] = useState([]);
  const [pestleAnalysis, setPestleAnalysis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial data fetch (might be redundant if fetchFilteredData is called immediately)
    fetchData();
  }, []);

  // Refetch data when filters change
  useEffect(() => {
    fetchFilteredData();
  }, [filters]); // Dependency on filters prop

  const fetchData = async () => {
    try {
      const [dataRes, sectorRes, trendsRes, pestleRes] = await Promise.all([
        axios.get('/api/data'),
        axios.get('/api/sector-analysis'),
        axios.get('/api/topic-trends'),
        axios.get('/api/pestle-analysis')
      ]);

      setFilteredData(dataRes.data);
      setSectorAnalysis(sectorRes.data);
      setTopicTrends(trendsRes.data);
      setPestleAnalysis(pestleRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching initial data:', error);
      setLoading(false);
    }
  };

  const fetchFilteredData = async () => {
    try {
      setLoading(true);

      // Build query parameters from filters
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key] && filters[key].trim() !== '') {
          params.append(key, filters[key]);
        }
      });

      // Fetch all data and analysis based on current filters
      const [dataRes, sectorRes, trendsRes, pestleRes] = await Promise.all([
        axios.get(`/api/data?${params.toString()}`),
        axios.get(`/api/sector-analysis?${params.toString()}`),
        axios.get(`/api/topic-trends?${params.toString()}`),
        axios.get(`/api/pestle-analysis?${params.toString()}`)
      ]);

      setFilteredData(dataRes.data);
      setSectorAnalysis(sectorRes.data);
      setTopicTrends(trendsRes.data);
      setPestleAnalysis(pestleRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 lg:space-y-6 w-full max-w-full">
      {/* Stats Cards */}
      <div className="w-full">
        <StatsCards stats={stats} />
      </div>
      
      {/* Charts Grid - Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 lg:gap-6 w-full">
        <div className="chart-container" ref={chartRefs?.sectorAnalysis}>
          <SectorAnalysis data={sectorAnalysis} />
        </div>
        <div className="chart-container" ref={chartRefs?.intensityChart}>
          <IntensityChart data={filteredData} />
        </div>
      </div>
      
      {/* Charts Grid - Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 lg:gap-6 w-full">
        <div className="chart-container" ref={chartRefs?.topicTrends}>
          <TopicTrends data={topicTrends} />
        </div>
        <div className="chart-container" ref={chartRefs?.regionalDistribution}>
          <RegionalDistribution data={filteredData} />
        </div>
      </div>

      {/* Charts Grid - Row 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 lg:gap-6 w-full">
        <div className="chart-container" ref={chartRefs?.yearAnalysis}>
          <YearAnalysis data={filteredData} />
        </div>
        <div className="chart-container" ref={chartRefs?.swotAnalysis}>
          <SWOTAnalysis data={filteredData} />
        </div>
      </div>

      {/* Full Width Charts */}
      <div className="grid grid-cols-1 gap-4 lg:gap-6 w-full">
        <div className="chart-container" ref={chartRefs?.pestleAnalysis}>
          <PESTLEAnalysis data={pestleAnalysis} />
        </div>
      </div>
      
      {/* Data Table */}
      <div className="w-full">
        <DataTable data={filteredData} />
      </div>
    </div>
  );
};

export default Dashboard; 