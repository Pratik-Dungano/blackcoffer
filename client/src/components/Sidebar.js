import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Filter, X, ChevronDown, ChevronRight } from 'lucide-react';

const Sidebar = ({ isOpen, onFilterChange }) => {
  const [filters, setFilters] = useState({
    end_year: '',
    start_year: '',
    topic: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    country: '',
    city: '',
    intensity_range: '',
    likelihood_range: '',
    relevance_range: '',
    impact: '',
    added_date: '',
    published_date: ''
  });

  const [options, setOptions] = useState({
    topics: [],
    sectors: [],
    regions: [],
    countries: [],
    sources: [],
    pestles: [],
    impacts: [],
    cities: []
  });

  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    advanced: false,
    metrics: false,
    dates: false
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  // Call onFilterChange whenever filters change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  // Count active filters
  const activeFiltersCount = Object.values(filters).filter(value => value && value.trim() !== '').length;

  const fetchFilterOptions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching filter options...');
      
      const [topics, sectors, regions, countries, sources, pestles, impacts] = await Promise.all([
        axios.get('/api/topics'),
        axios.get('/api/sectors'),
        axios.get('/api/regions'),
        axios.get('/api/countries'),
        axios.get('/api/sources'),
        axios.get('/api/pestles'),
        axios.get('/api/impacts')
      ]);

      console.log('API Responses:', {
        topics: topics.data,
        sectors: sectors.data,
        regions: regions.data,
        countries: countries.data,
        sources: sources.data,
        pestles: pestles.data,
        impacts: impacts.data
      });

      setOptions({
        topics: topics.data,
        sectors: sectors.data,
        regions: regions.data,
        countries: countries.data,
        sources: sources.data,
        pestles: pestles.data,
        impacts: impacts.data,
        cities: [] // Will be populated based on selected country
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching filter options:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    const emptyFilters = {
      end_year: '',
      start_year: '',
      topic: '',
      sector: '',
      region: '',
      pestle: '',
      source: '',
      country: '',
      city: '',
      intensity_range: '',
      likelihood_range: '',
      relevance_range: '',
      impact: '',
      added_date: '',
      published_date: ''
    };
    setFilters(emptyFilters);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const intensityRanges = ['0-20', '21-40', '41-60', '61-80', '81-100'];
  const likelihoodRanges = ['0-20%', '21-40%', '41-60%', '61-80%', '81-100%'];
  const relevanceRanges = ['0-20%', '21-40%', '41-60%', '61-80%', '81-100%'];

  // SWOT Analysis options (derived from data)
  const swotOptions = ['Strength', 'Weakness', 'Opportunity', 'Threat'];

  if (!isOpen) return null;

  return (
    <div className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-lg border-r border-gray-200 overflow-y-auto z-30 sidebar-scrollbar transition-transform duration-300 ease-in-out ${
      isOpen 
        ? 'translate-x-0' 
        : '-translate-x-full lg:translate-x-0 lg:relative lg:top-0 lg:h-screen'
    } ${
      // Responsive width - ensure it doesn't exceed viewport
      'w-80 lg:w-64 max-w-[80vw] lg:max-w-none'
    }`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            {activeFiltersCount > 0 && (
              <span className="bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700"
            title="Clear all filters"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">Loading filter options...</p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">Error loading filters: {error}</p>
            <button
              onClick={fetchFilterOptions}
              className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Active Filters Summary */}
        {activeFiltersCount > 0 && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">
              {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {Object.entries(filters).map(([key, value]) => {
                if (value && value.trim() !== '') {
                  return (
                    <span key={key} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {key.replace('_', ' ')}: {value}
                      <button
                        onClick={() => handleFilterChange(key, '')}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}

        {/* Basic Filters */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('basic')}
            className="flex items-center justify-between w-full text-left font-medium text-gray-700 mb-3"
          >
            <span>Basic Filters</span>
            {expandedSections.basic ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
          
          {expandedSections.basic && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Year</label>
                <input
                  type="number"
                  value={filters.end_year}
                  onChange={(e) => handleFilterChange('end_year', e.target.value)}
                  placeholder="2025"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Year</label>
                <input
                  type="number"
                  value={filters.start_year}
                  onChange={(e) => handleFilterChange('start_year', e.target.value)}
                  placeholder="2020"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                <select
                  value={filters.topic}
                  onChange={(e) => handleFilterChange('topic', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-white"
                >
                  <option value="">All Topics</option>
                  {options.topics.map((topic) => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
                <select
                  value={filters.sector}
                  onChange={(e) => handleFilterChange('sector', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-white"
                >
                  <option value="">All Sectors</option>
                  {options.sectors.map((sector) => (
                    <option key={sector} value={sector}>{sector}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                <select
                  value={filters.region}
                  onChange={(e) => handleFilterChange('region', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-white"
                >
                  <option value="">All Regions</option>
                  {options.regions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <select
                  value={filters.country}
                  onChange={(e) => handleFilterChange('country', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-white"
                >
                  <option value="">All Countries</option>
                  {options.countries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  placeholder="Enter city name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
          )}
        </div>

        {/* Advanced Filters */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('advanced')}
            className="flex items-center justify-between w-full text-left font-medium text-gray-700 mb-3"
          >
            <span>Advanced Filters</span>
            {expandedSections.advanced ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
          
          {expandedSections.advanced && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PESTLE</label>
                <select
                  value={filters.pestle}
                  onChange={(e) => handleFilterChange('pestle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-white"
                >
                  <option value="">All PESTLE</option>
                  {options.pestles.map((pestle) => (
                    <option key={pestle} value={pestle}>{pestle}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                <select
                  value={filters.source}
                  onChange={(e) => handleFilterChange('source', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-white"
                >
                  <option value="">All Sources</option>
                  {options.sources.map((source) => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Impact</label>
                <select
                  value={filters.impact}
                  onChange={(e) => handleFilterChange('impact', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-white"
                >
                  <option value="">All Impacts</option>
                  {options.impacts.map((impact) => (
                    <option key={impact} value={impact}>{impact}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SWOT Analysis</label>
                <select
                  value={filters.swot}
                  onChange={(e) => handleFilterChange('swot', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-white"
                >
                  <option value="">All SWOT</option>
                  {swotOptions.map((swot) => (
                    <option key={swot} value={swot}>{swot}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Metrics Filters */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('metrics')}
            className="flex items-center justify-between w-full text-left font-medium text-gray-700 mb-3"
          >
            <span>Metrics Range</span>
            {expandedSections.metrics ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
          
          {expandedSections.metrics && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Intensity Range</label>
                <select
                  value={filters.intensity_range}
                  onChange={(e) => handleFilterChange('intensity_range', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-white"
                >
                  <option value="">All Ranges</option>
                  {intensityRanges.map((range) => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Likelihood Range</label>
                <select
                  value={filters.likelihood_range}
                  onChange={(e) => handleFilterChange('likelihood_range', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-white"
                >
                  <option value="">All Ranges</option>
                  {likelihoodRanges.map((range) => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relevance Range</label>
                <select
                  value={filters.relevance_range}
                  onChange={(e) => handleFilterChange('relevance_range', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-white"
                >
                  <option value="">All Ranges</option>
                  {relevanceRanges.map((range) => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Date Filters */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('dates')}
            className="flex items-center justify-between w-full text-left font-medium text-gray-700 mb-3"
          >
            <span>Date Filters</span>
            {expandedSections.dates ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
          
          {expandedSections.dates && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Added Date</label>
                <input
                  type="text"
                  value={filters.added_date}
                  onChange={(e) => handleFilterChange('added_date', e.target.value)}
                  placeholder="January, 20 2017"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Published Date</label>
                <input
                  type="text"
                  value={filters.published_date}
                  onChange={(e) => handleFilterChange('published_date', e.target.value)}
                  placeholder="January, 09 2017"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
          )}
        </div>

        <button
          onClick={clearFilters}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 