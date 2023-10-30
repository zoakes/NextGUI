import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';



const HighchartsExample = () => {
    const options = {
        chart: {
            type: 'line',
            zoomType: 'xy'  // Enables zooming on both x and y axes
        },
        title: {
            text: 'Highcharts'
        },
        xAxis: {
            categories: exampleDataMarked.map(item => item.x)
        },
        yAxis: {
            title: {
                text: 'Value'
            }
        },
        series: [{
            name: 'y1',
            data: exampleDataMarked.map(item => item.y1),
            color: 'blue'
        }, {
            name: 'y2',
            data: exampleDataMarked.map(item => item.y2),
            color: 'red'
        }, {
            name: 'buy',
            data: exampleDataMarked.map(item => item.buy || null),
            color: 'lightgreen',
            marker: {
                symbol: 'circle'
            },
            lineWidth: 0
        }, {
            name: 'sell',
            data: exampleDataMarked.map(item => item.sell || null),
            color: 'red',
            marker: {
                symbol: 'circle'
            },
            lineWidth: 0
        }]
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    );
};

export default HighchartsExample;

// Your sample data
const exampleDataMarked = [
    { x: 'Jan', y1: 100, y2: 80 },
    { x: 'Feb', y1: 90, y2: 100, buy: 95 },
    { x: 'Mar', y1: 105, y2: 110 },
    { x: 'Apr', y1: 95, y2: 105, buy: 100 },
    { x: 'May', y1: 110, y2: 90 },
    { x: 'Jun', y1: 115, y2: 85, sell: 120 },
    { x: 'Jul', y1: 120, y2: 95 },
    { x: 'Aug', y1: 125, y2: 100 },
    { x: 'Sep', y1: 130, y2: 105 },
    { x: 'Oct', y1: 135, y2: 110 },
    { x: 'Nov', y1: 140, y2: 115 },
    { x: 'Dec', y1: 145, y2: 120 },
    { x: 'Jan', y1: 100, y2: 80 },
    { x: 'Jan', y1: 100, y2: 80 },
];
