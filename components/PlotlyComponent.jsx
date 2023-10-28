import React from 'react';
import Plot from 'react-plotly.js';

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

const PlotlyComponent = () => {
    const trace1 = {
        x: exampleDataMarked.map(item => item.x),
        y: exampleDataMarked.map(item => item.y1),
        mode: 'lines+markers',
        name: 'y1',
        line: {color: 'blue'}
    };

    const trace2 = {
        x: exampleDataMarked.map(item => item.x),
        y: exampleDataMarked.map(item => item.y2),
        mode: 'lines+markers',
        name: 'y2',
        line: {color: 'red'}
    };

    const trace3 = {
        x: exampleDataMarked.map(item => item.buy ? item.x : null),
        y: exampleDataMarked.map(item => item.buy),
        mode: 'markers',
        name: 'buy',
        marker: {color: 'green', size: 10}
    };

    const trace4 = {
        x: exampleDataMarked.map(item => item.sell ? item.x : null),
        y: exampleDataMarked.map(item => item.sell),
        mode: 'markers',
        name: 'sell',
        marker: {color: 'red', size: 10}
    };

    const layout = {
        title: 'Plotly'
    };

    return <Plot data={[trace1, trace2, trace3, trace4]} layout={layout} />;
}

export default PlotlyComponent;


