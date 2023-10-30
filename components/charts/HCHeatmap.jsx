import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// import Heatmap from 'highcharts/modules/heatmap';
// wtf? 
// Heatmap(Highcharts);


export default class HeatmapComponent extends React.Component {
    generateData(rows, cols) {
        let data = [];
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                data.push([i, j, Math.floor(Math.random() * 100)]);
            }
        }
        return data;
    }

    render() {
        const options = {
            chart: {
                type: 'heatmap',
            },
            title: {
                text: 'Factor Exposure',
            },
            xAxis: {
                categories: Array.from({ length: 20 }, (_, i) => `Factor ${i + 1}`),
            },
            yAxis: {
                categories: Array.from({ length: 20 }, (_, i) => `ID ${i + 1}`),
                title: null,
            },
            colorAxis: {
                min: 0,
                minColor: '#FFFFFF',
                maxColor: 'blue', //Highcharts.getOptions().colors[0],
            },
            legend: {
                align: 'right',
                layout: 'vertical',
                margin: 0,
                verticalAlign: 'middle',
            },
            series: [{
                name: 'Data',
                borderWidth: 1,
                data: this.generateData(20, 20),
            }],
        };

        return <HighchartsReact highcharts={Highcharts} options={options} />;
    }
}
