// pages/heatmap.js or in a component file

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import heatmap from 'highcharts/modules/heatmap';

const generateData = (pointCount) => {
    let data = [];
    for (let i = 0; i < pointCount; i++) {
      for (let j = 0; j < pointCount; j++) {
        // Random value for demonstration
        const value = Math.floor(Math.random() * 100);
        data.push([i, j, value]);
      }
    }
    return data;
  };
  
const heatmapData = generateData(70);

// Initialize the heatmap module
heatmap(Highcharts);

const Heatmap = () => {
  const options = {
    chart: {
      type: 'heatmap',
      plotBorderWidth: 1,
    },
    title: {
      text: 'Sample Heatmap',
    },
    xAxis: {
      categories: ['Category 1', 'Category 2', 'Category 3'],
    },
    yAxis: {
      categories: ['Y 1', 'Y 2', 'Y 3'],
      title: null,
    },
    colorAxis: {
      min: 0,
      minColor: '#FFFFFF',
      maxColor: Highcharts.getOptions().colors[0],
    },
    series: [{
      name: 'Sales per employee',
      borderWidth: 1,
      data: [[0, 0, 10], [0, 1, 19], [0, 2, 8], [1, 0, 24], [1, 1, 67], [1, 2, 10], [2, 0, 92], [2, 1, 58], [2, 2, 78]],
      dataLabels: {
        enabled: true,
        color: '#000000',
      },
    }],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Heatmap;
