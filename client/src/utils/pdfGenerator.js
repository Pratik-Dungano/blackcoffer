// Simple data export and print utilities (no external dependencies)
export const generateDataReport = (stats, data) => {
  const report = {
    title: 'Analytics Dashboard Report',
    generatedOn: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    stats: {
      avgIntensity: stats.avgIntensity ? stats.avgIntensity.toFixed(1) : '0',
      avgLikelihood: stats.avgLikelihood ? (stats.avgLikelihood * 100).toFixed(1) + '%' : '0%',
      avgRelevance: stats.avgRelevance ? (stats.avgRelevance * 100).toFixed(1) + '%' : '0%',
      totalRecords: stats.totalRecords || '0'
    },
    summary: generateDataSummary(data)
  };

  // Create a downloadable JSON file
  const dataStr = JSON.stringify(report, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'dashboard-report.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const generateCSVReport = (data) => {
  if (!data || data.length === 0) {
    alert('No data available for export');
    return;
  }

  // Get headers from first data item
  const headers = Object.keys(data[0]);

  // Create CSV content
  const csvContent = [
    headers.join(','),
    ...data.map(item =>
      headers.map(header => {
        const value = item[header];
        // Escape commas and quotes in CSV
        return typeof value === 'string' && (value.includes(',') || value.includes('"'))
          ? `"${value.replace(/"/g, '""')}"`
          : value;
      }).join(',')
    )
  ].join('\n');

  // Create and download CSV file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'dashboard-data.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const generateDataSummary = (data) => {
  // Group data by sector
  const sectorData = {};
  data.forEach(item => {
    if (item.sector) {
      sectorData[item.sector] = (sectorData[item.sector] || 0) + 1;
    }
  });

  // Group data by region
  const regionData = {};
  data.forEach(item => {
    if (item.region) {
      regionData[item.region] = (regionData[item.region] || 0) + 1;
    }
  });

  // Intensity analysis
  const highIntensity = data.filter(item => item.intensity >= 80).length;
  const mediumIntensity = data.filter(item => item.intensity >= 60 && item.intensity < 80).length;
  const lowIntensity = data.filter(item => item.intensity < 60).length;

  return {
    topSectors: Object.entries(sectorData)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([sector, count]) => ({ sector, count })),
    topRegions: Object.entries(regionData)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([region, count]) => ({ region, count })),
    intensityAnalysis: {
      high: highIntensity,
      medium: mediumIntensity,
      low: lowIntensity
    }
  };
};

export const printDashboard = () => {
  // Add print-specific class to body
  document.body.classList.add('printing');

  // Trigger print
  window.print();

  // Remove print class after printing
  setTimeout(() => {
    document.body.classList.remove('printing');
  }, 1000);
};

export const exportChartsAsImages = async (chartRefs) => {
  // Fallback: just print the page since html2canvas is not available
  alert('Chart export requires additional libraries. Printing dashboard instead.');
  printDashboard();
}; 