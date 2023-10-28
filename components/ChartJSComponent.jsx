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
                fill: false,
                borderColor: 'blue',
                tension: 0.1
            },
            {
                label: 'y2',
                data: exampleDataMarked.map(item => item.y2),
                fill: false,
                borderColor: 'red',
                tension: 0.1
            },
            {
                label: 'buy',
                data: exampleDataMarked.map(item => item.buy || null),
                fill: false,
                borderColor: 'green',
                backgroundColor: 'green',
                pointRadius: exampleDataMarked.map(item => item.buy ? 5 : 0), // Make point visible only if buy is present
                tension: 0.1,
                showLine: false // Do not show line for buy data
            },
            {
                label: 'sell',
                data: exampleDataMarked.map(item => item.sell || null),
                fill: false,
                borderColor: 'red',
                backgroundColor: 'red',
                pointRadius: exampleDataMarked.map(item => item.sell ? 5 : 0), // Make point visible only if sell is present
                tension: 0.1,
                showLine: false // Do not show line for sell data
            }
        ]
    };

    return (
        <div>
            <Line data={data} />
        </div>
    );
};


// something is wrong with this import... it 'was' working, now it's not? wtf..
export default ChartJSComponent;
