import React from 'react';
import { Line } from 'react-chartjs-2';

const exampleDataMarked = [
    { x: 'Jan', y1: 100, y2: 80 },
    { x: 'Feb', y1: 90, y2: 100, buy: 95 }, // This point will be marked
    { x: 'Mar', y1: 105, y2: 110},
    { x: 'Apr', y1: 95, y2: 105, buy: 100 },
    { x: 'May', y1: 110, y2: 90},
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

const ChartJSComponent = () => {
    const data = {
        labels: exampleDataMarked.map(item => item.x),
        datasets: [
            {
                label: 'y1',
                data: exampleDataMarked.map(item => item.y1),
                borderColor: 'blue',
                fill: false
            },
            {
                label: 'y2',
                data: exampleDataMarked.map(item => item.y2),
                borderColor: 'red',
                fill: false
            },
            {
                label: 'buy',
                data: exampleDataMarked.map(item => item.buy),
                borderColor: 'green',
                fill: false,
                pointRadius: exampleDataMarked.map(item => item.buy ? 5 : 0)
            },
            {
                label: 'sell',
                data: exampleDataMarked.map(item => item.sell),
                borderColor: 'red',
                fill: false,
                pointRadius: exampleDataMarked.map(item => item.sell ? 5 : 0)
            }
        ]
    };

    return <Line data={data} />;
}



export default ChartJSComponent;
