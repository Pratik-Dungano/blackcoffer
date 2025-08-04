# Data Visualization Dashboard

A comprehensive data visualization dashboard built with React.js frontend and Node.js backend, featuring interactive charts, comprehensive filtering, and MongoDB integration.

## 🚀 Features

- **Interactive Charts**: Multiple chart types using Chart.js (Bar, Line, Doughnut)
- **Comprehensive Filtering**: Filter by End Year, Topics, Sector, Region, PEST, Source, SWOT, Country, and City
- **Real-time Data**: Live data updates with MongoDB integration
- **Responsive Design**: Modern, light-themed UI with Tailwind CSS
- **Data Analytics**: Statistical analysis and trend visualization
- **Sortable Data Table**: Interactive table with expandable rows

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **RESTful API** with comprehensive endpoints

### Frontend
- **React.js** with functional components and hooks
- **Chart.js** with react-chartjs-2 for data visualization
- **Tailwind CSS** for styling
- **Axios** for API communication
- **Lucide React** for icons

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd data-visualization-dashboard
```

### 2. Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/dashboard_db
PORT=5000
NODE_ENV=development
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# For local MongoDB installation
mongod

# Or use MongoDB Atlas (cloud service)
```

### 5. Run the Application
```bash
# Start both backend and frontend (recommended)
npm run dev

# Or start them separately:
# Backend only
npm run server

# Frontend only
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📊 Data Structure

The dashboard visualizes the following key metrics:

- **Intensity**: Impact level (0-100)
- **Likelihood**: Probability of occurrence (0-1)
- **Relevance**: Importance score (0-1)
- **Year Range**: Start and end years
- **Geographic**: Country, Region, City
- **Categorical**: Topic, Sector, PEST, Source, SWOT

## 🔧 API Endpoints

### Data Endpoints
- `GET /api/data` - Fetch filtered data
- `GET /api/stats` - Get statistical summary
- `GET /api/sector-analysis` - Sector performance analysis
- `GET /api/topic-trends` - Topic trends over time

### Filter Options
- `GET /api/sectors` - Available sectors
- `GET /api/topics` - Available topics
- `GET /api/countries` - Available countries
- `GET /api/regions` - Available regions

## 📈 Dashboard Components

### 1. Statistics Cards
- Average Intensity, Likelihood, Relevance
- Total Records count
- Trend indicators

### 2. Interactive Charts
- **Sector Analysis**: Bar chart comparing intensity vs likelihood
- **Intensity Distribution**: Line chart showing intensity ranges
- **Topic Trends**: Multi-line chart showing topic evolution
- **Regional Distribution**: Doughnut chart of regional data

### 3. Comprehensive Filters
- End Year (numeric input)
- Topic (dropdown)
- Sector (dropdown)
- Region (dropdown)
- PEST Analysis (dropdown)
- Source (dropdown)
- SWOT Analysis (dropdown)
- Country (dropdown)
- City (text input)

### 4. Data Table
- Sortable columns
- Expandable rows for detailed information
- Color-coded intensity indicators
- Responsive design

## 🎨 Design Features

- **Light Theme**: Clean, modern interface
- **Responsive Layout**: Works on desktop and mobile
- **Interactive Elements**: Hover effects and smooth transitions
- **Color-coded Data**: Visual indicators for different metrics
- **Professional Typography**: Inter font family

## 🔍 Usage Guide

### Filtering Data
1. Use the filter panel at the top to select criteria
2. Multiple filters can be applied simultaneously
3. Click "Clear All" to reset all filters
4. Data updates automatically as you change filters

### Viewing Charts
1. **Sector Analysis**: Compare performance across sectors
2. **Intensity Distribution**: Understand intensity patterns
3. **Topic Trends**: Track topic evolution over time
4. **Regional Distribution**: See geographic data distribution

### Data Table
1. Click column headers to sort data
2. Click the eye icon to expand row details
3. View additional information and insights
4. Use the table for detailed data exploration

## 🚀 Deployment

### Backend Deployment
```bash
# Build for production
npm run build

# Set environment variables
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

### Frontend Deployment
```bash
cd client
npm run build
# Deploy the build folder to your hosting service
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Review the API endpoints
- Ensure MongoDB is running
- Verify all dependencies are installed

## 🔄 Data Ingestion

The application automatically ingests data from `jsondata.json` on startup. To update data:

1. Modify the `jsondata.json` file
2. Restart the server
3. Data will be automatically refreshed

The system supports real-time data updates and maintains data integrity through MongoDB's robust storage system. 