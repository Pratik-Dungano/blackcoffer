const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/analytics-dashboard';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Data Model
const dataSchema = new mongoose.Schema({
  intensity: Number,
  likelihood: Number,
  relevance: Number,
  start_year: Number,
  end_year: Number,
  country: String,
  region: String,
  topic: String,
  sector: String,
  pestle: String,
  source: String,
  swot: String,
  city: String,
  insight: String,
  impact: String,
  added: String,
  published: String,
  title: String,
  url: String
});

const DataModel = mongoose.model('Data', dataSchema);

// Helper function to build query from filters
const buildQuery = (filters) => {
  const query = {};
  
  if (filters.end_year) query.end_year = parseInt(filters.end_year);
  if (filters.start_year) query.start_year = parseInt(filters.start_year);
  if (filters.topic) query.topic = { $regex: filters.topic, $options: 'i' };
  if (filters.sector) query.sector = { $regex: filters.sector, $options: 'i' };
  if (filters.region) query.region = { $regex: filters.region, $options: 'i' };
  if (filters.pestle) query.pestle = { $regex: filters.pestle, $options: 'i' };
  if (filters.source) query.source = { $regex: filters.source, $options: 'i' };
  if (filters.country) query.country = { $regex: filters.country, $options: 'i' };
  if (filters.city) query.city = { $regex: filters.city, $options: 'i' };
  if (filters.impact) query.impact = { $regex: filters.impact, $options: 'i' };
  if (filters.added_date) query.added = { $regex: filters.added_date, $options: 'i' };
  if (filters.published_date) query.published = { $regex: filters.published_date, $options: 'i' };
  if (filters.swot) query.swot = { $regex: filters.swot, $options: 'i' };
  
  return query;
};

// Data ingestion function
const ingestData = async () => {
  try {
    // Clear existing data
    await DataModel.deleteMany({});
    
    // Load JSON data
    const fs = require('fs');
    const path = require('path');
    const jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, '../jsondata.json'), 'utf8'));
    
    // Insert data
    await DataModel.insertMany(jsonData);
    console.log('Data ingested successfully');
  } catch (error) {
    console.error('Error ingesting data:', error);
  }
};

// Initialize database
connectDB().then(() => {
  // Ingest data if collection is empty
  DataModel.countDocuments().then(count => {
    if (count === 0) {
      ingestData();
    }
  });
});

// API Routes
app.get('/api/data', async (req, res) => {
  try {
    const query = buildQuery(req.query);
    const data = await DataModel.find(query).limit(100);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const query = buildQuery(req.query);
    const [avgIntensity, avgLikelihood, avgRelevance, totalRecords] = await Promise.all([
      DataModel.aggregate([{ $match: query }, { $group: { _id: null, avg: { $avg: '$intensity' } } }]),
      DataModel.aggregate([{ $match: query }, { $group: { _id: null, avg: { $avg: '$likelihood' } } }]),
      DataModel.aggregate([{ $match: query }, { $group: { _id: null, avg: { $avg: '$relevance' } } }]),
      DataModel.countDocuments(query)
    ]);

    res.json({
      avgIntensity: avgIntensity[0]?.avg || 0,
      avgLikelihood: avgLikelihood[0]?.avg || 0,
      avgRelevance: avgRelevance[0]?.avg || 0,
      totalRecords
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/sector-analysis', async (req, res) => {
  try {
    const query = buildQuery(req.query);
    const data = await DataModel.aggregate([
      { $match: query },
      { $group: { _id: '$sector', avgIntensity: { $avg: '$intensity' }, avgLikelihood: { $avg: '$likelihood' } } },
      { $sort: { avgIntensity: -1 } }
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/topic-trends', async (req, res) => {
  try {
    const query = buildQuery(req.query);
    const data = await DataModel.aggregate([
      { $match: query },
      { $group: { _id: { topic: '$topic', year: '$end_year' }, count: { $sum: 1 } } },
      { $sort: { '_id.year': 1 } }
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/pestle-analysis', async (req, res) => {
  try {
    const query = buildQuery(req.query);
    const data = await DataModel.aggregate([
      { $match: query },
      { $group: { _id: '$pestle', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Filter options endpoints
app.get('/api/topics', async (req, res) => {
  try {
    const topics = await DataModel.distinct('topic');
    res.json(topics.filter(topic => topic));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/sectors', async (req, res) => {
  try {
    const sectors = await DataModel.distinct('sector');
    res.json(sectors.filter(sector => sector));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/regions', async (req, res) => {
  try {
    const regions = await DataModel.distinct('region');
    res.json(regions.filter(region => region));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/countries', async (req, res) => {
  try {
    const countries = await DataModel.distinct('country');
    res.json(countries.filter(country => country));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/sources', async (req, res) => {
  try {
    const sources = await DataModel.distinct('source');
    res.json(sources.filter(source => source));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/pestles', async (req, res) => {
  try {
    const pestles = await DataModel.distinct('pestle');
    res.json(pestles.filter(pestle => pestle));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/impacts', async (req, res) => {
  try {
    const impacts = await DataModel.distinct('impact');
    res.json(impacts.filter(impact => impact));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Export for Vercel
module.exports = app; 