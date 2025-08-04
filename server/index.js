const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dashboard_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Data Schema
const dataSchema = new mongoose.Schema({
  end_year: String,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: String,
  impact: String,
  added: String,
  published: String,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number
});

const DataModel = mongoose.model('Data', dataSchema);

// Helper function to build query from filters
const buildQuery = (queryParams) => {
  const { 
    end_year, 
    start_year,
    topic, 
    sector, 
    region, 
    pestle, 
    source, 
    country,
    city,
    intensity_range,
    likelihood_range,
    relevance_range,
    impact,
    added_date,
    published_date,
    swot
  } = queryParams;

  let query = {};
  
  if (end_year) query.end_year = end_year;
  if (start_year) query.start_year = start_year;
  if (topic) query.topic = { $regex: topic, $options: 'i' };
  if (sector) query.sector = { $regex: sector, $options: 'i' };
  if (region) query.region = { $regex: region, $options: 'i' };
  if (pestle) query.pestle = { $regex: pestle, $options: 'i' };
  if (source) query.source = { $regex: source, $options: 'i' };
  if (country) query.country = { $regex: country, $options: 'i' };
  if (city) query.city = { $regex: city, $options: 'i' };
  if (impact) query.impact = { $regex: impact, $options: 'i' };
  if (added_date) query.added = { $regex: added_date, $options: 'i' };
  if (published_date) query.published = { $regex: published_date, $options: 'i' };

  // Handle range filters
  if (intensity_range) {
    const [min, max] = intensity_range.split('-').map(Number);
    query.intensity = { $gte: min, $lte: max };
  }
  if (likelihood_range) {
    const [min, max] = likelihood_range.replace('%', '').split('-').map(Number);
    query.likelihood = { $gte: min, $lte: max };
  }
  if (relevance_range) {
    const [min, max] = relevance_range.replace('%', '').split('-').map(Number);
    query.relevance = { $gte: min, $lte: max };
  }

  // Handle SWOT filter (derived from data analysis)
  if (swot) {
    const swotKeywords = {
      'Strength': ['growth', 'increase', 'expansion', 'success', 'positive'],
      'Weakness': ['decline', 'decrease', 'challenge', 'difficulty', 'struggle'],
      'Opportunity': ['potential', 'opportunity', 'emerging', 'new', 'future'],
      'Threat': ['threat', 'risk', 'danger', 'crisis', 'problem']
    };
    
    if (swotKeywords[swot]) {
      query.$or = [
        { title: { $regex: swotKeywords[swot].join('|'), $options: 'i' } },
        { insight: { $regex: swotKeywords[swot].join('|'), $options: 'i' } }
      ];
    }
  }

  return query;
};

// Data Ingestion Function
async function ingestData() {
  try {
    const jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, '../jsondata.json'), 'utf8'));
    
    // Clear existing data
    await DataModel.deleteMany({});
    
    // Insert new data
    await DataModel.insertMany(jsonData);
    console.log('Data ingested successfully');
  } catch (error) {
    console.error('Error ingesting data:', error);
  }
}

// API Routes
app.get('/api/data', async (req, res) => {
  try {
    const { limit = 100 } = req.query;
    const query = buildQuery(req.query);
    const data = await DataModel.find(query).limit(parseInt(limit));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const query = buildQuery(req.query);
    const stats = await DataModel.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          avgIntensity: { $avg: '$intensity' },
          avgLikelihood: { $avg: '$likelihood' },
          avgRelevance: { $avg: '$relevance' },
          totalRecords: { $sum: 1 }
        }
      }
    ]);
    
    res.json(stats[0] || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/sectors', async (req, res) => {
  try {
    const sectors = await DataModel.distinct('sector');
    res.json(sectors.filter(sector => sector && sector.trim() !== ''));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/topics', async (req, res) => {
  try {
    const topics = await DataModel.distinct('topic');
    res.json(topics.filter(topic => topic && topic.trim() !== ''));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/countries', async (req, res) => {
  try {
    const countries = await DataModel.distinct('country');
    res.json(countries.filter(country => country && country.trim() !== ''));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/regions', async (req, res) => {
  try {
    const regions = await DataModel.distinct('region');
    res.json(regions.filter(region => region && region.trim() !== ''));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/sources', async (req, res) => {
  try {
    const sources = await DataModel.distinct('source');
    res.json(sources.filter(source => source && source.trim() !== ''));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/pestles', async (req, res) => {
  try {
    const pestles = await DataModel.distinct('pestle');
    res.json(pestles.filter(pestle => pestle && pestle.trim() !== ''));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/impacts', async (req, res) => {
  try {
    const impacts = await DataModel.distinct('impact');
    res.json(impacts.filter(impact => impact && impact.trim() !== ''));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/sector-analysis', async (req, res) => {
  try {
    const query = buildQuery(req.query);
    const analysis = await DataModel.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$sector',
          avgIntensity: { $avg: '$intensity' },
          avgLikelihood: { $avg: '$likelihood' },
          count: { $sum: 1 }
        }
      },
      { $sort: { avgIntensity: -1 } }
    ]);
    
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/topic-trends', async (req, res) => {
  try {
    const query = buildQuery(req.query);
    const trends = await DataModel.aggregate([
      { $match: query },
      {
        $group: {
          _id: { topic: '$topic', year: '$start_year' },
          count: { $sum: 1 },
          avgIntensity: { $avg: '$intensity' }
        }
      },
      { $sort: { '_id.year': 1 } }
    ]);
    
    res.json(trends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/pestle-analysis', async (req, res) => {
  try {
    const query = buildQuery(req.query);
    const analysis = await DataModel.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$pestle',
          count: { $sum: 1 },
          avgIntensity: { $avg: '$intensity' },
          avgLikelihood: { $avg: '$likelihood' }
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Initialize data on startup
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await ingestData();
}); 