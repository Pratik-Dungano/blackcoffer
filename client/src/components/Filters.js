import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Filter, X } from 'lucide-react';

const Filters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    end_year: '',
    topic: '',
    sector: '',
    region: '',
    pest: '',
    source: '',
    swot: '',
    country: '',
    city: ''
  });

  const [options, setOptions] = useState({
    topics: [],
    sectors: [],
    regions: [],
    countries: [],
    cities: []
  });

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      const [topics, sectors, regions, countries] = await Promise.all([
        axios.get('/api/topics'),
        axios.get('/api/sectors'),
        axios.get('/api/regions'),
        axios.get('/api/countries')
      ]);

      setOptions({
        topics: topics.data,
        sectors: sectors.data,
        regions: regions.data,
        countries: countries.data,
        cities: []
      });
    } catch (error) {
      console.error('Error fetching filter options:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = Object.keys(filters).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {});
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const pestOptions = ['Political', 'Economic', 'Social', 'Technological', 'Environmental'];
  const sourceOptions = ['Research Report', 'Industry Analysis', 'Market Research', 'Academic Study', 'Government Report', 'Survey Data', 'Security Report', 'Industry Publication', 'Corporate Report', 'Policy Document'];
  const swotOptions = ['Strength', 'Weakness', 'Opportunity', 'Threat'];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-primary-600" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>
        <button
          onClick={clearFilters}
          className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
        >
          <X className="h-4 w-4" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* End Year */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Year
          </label>
          <input
            type="number"
            value={filters.end_year}
            onChange={(e) => handleFilterChange('end_year', e.target.value)}
            placeholder="2025"
            className="input-field"
          />
        </div>

        {/* Topic */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Topic
          </label>
          <select
            value={filters.topic}
            onChange={(e) => handleFilterChange('topic', e.target.value)}
            className="select-field"
          >
            <option value="">All Topics</option>
            {options.topics.map((topic) => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
        </div>

        {/* Sector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sector
          </label>
          <select
            value={filters.sector}
            onChange={(e) => handleFilterChange('sector', e.target.value)}
            className="select-field"
          >
            <option value="">All Sectors</option>
            {options.sectors.map((sector) => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>
        </div>

        {/* Region */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Region
          </label>
          <select
            value={filters.region}
            onChange={(e) => handleFilterChange('region', e.target.value)}
            className="select-field"
          >
            <option value="">All Regions</option>
            {options.regions.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        {/* PEST */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            PEST
          </label>
          <select
            value={filters.pest}
            onChange={(e) => handleFilterChange('pest', e.target.value)}
            className="select-field"
          >
            <option value="">All PEST</option>
            {pestOptions.map((pest) => (
              <option key={pest} value={pest}>{pest}</option>
            ))}
          </select>
        </div>

        {/* Source */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Source
          </label>
          <select
            value={filters.source}
            onChange={(e) => handleFilterChange('source', e.target.value)}
            className="select-field"
          >
            <option value="">All Sources</option>
            {sourceOptions.map((source) => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>
        </div>

        {/* SWOT */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SWOT
          </label>
          <select
            value={filters.swot}
            onChange={(e) => handleFilterChange('swot', e.target.value)}
            className="select-field"
          >
            <option value="">All SWOT</option>
            {swotOptions.map((swot) => (
              <option key={swot} value={swot}>{swot}</option>
            ))}
          </select>
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <select
            value={filters.country}
            onChange={(e) => handleFilterChange('country', e.target.value)}
            className="select-field"
          >
            <option value="">All Countries</option>
            {options.countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            value={filters.city}
            onChange={(e) => handleFilterChange('city', e.target.value)}
            placeholder="Enter city name"
            className="input-field"
          />
        </div>
      </div>
    </div>
  );
};

export default Filters; 