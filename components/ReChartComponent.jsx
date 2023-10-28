import React from 'react';
import { Brush, Scatter,ScatterChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// this just... fits better, easier to map to this. Update 'all' at once.
const exampleData = [
    { x: 'Jan', y1: 100, y2: 80 },
    { x: 'Feb', y1: 90, y2: 100 },
    { x: 'Mar', y1: 105, y2: 110 },
    { x: 'Apr', y1: 95, y2: 105 },
    { x: 'May', y1: 110, y2: 90 },
    { x: 'Jun', y1: 115, y2: 85 },
    { x: 'Jul', y1: 120, y2: 95 },
    { x: 'Aug', y1: 125, y2: 100 },
    { x: 'Sep', y1: 130, y2: 105 },
    { x: 'Oct', y1: 135, y2: 110 },
    { x: 'Nov', y1: 140, y2: 115 },
    { x: 'Dec', y1: 145, y2: 120 },
];

// this is great in that it's very easy to push data in this format, it's natural. 
// tv format is NOT natural, at all.


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
    
];

const markedPoints = [
    { x: 'Feb', y: 90 },
    { x: 'Apr', y: 100 },
];


export const MultiLineChartComponent = props => {
    const {
        data = exampleDataMarked,
        colors: {
            lineColor1 = '#2962FF',
            lineColor2 = '#FF0000',
            buyColor = 'green',
            sellColor = 'red',
            textColor = 'black',
        } = {},
    } = props;

    

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" stroke={textColor} />
                    <YAxis stroke={textColor} />
                    <Tooltip />
                    <Legend />
                    <Brush
                        dataKey="x"
                        height={30}
                        stroke="#8884d8"
                    />
                    <Line
                        type="monotone"
                        dataKey="y1"
                        stroke={lineColor1}
                        activeDot={{ r: 8 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="y2"
                        stroke={lineColor2}
                        activeDot={{ r: 8 }}
                    />
                    {/* This represents Entries!  */}
                    <Line
                        type="monotone"
                        dataKey="buy"
                        stroke={buyColor}
                        fill={buyColor}
                        dot={{ r: 4 }} // weird..
                        // strokeWidth={0} // This will hide the line connecting the dots
                    />
                    <Line
                        type="monotone"
                        dataKey="sell"
                        stroke={sellColor}
                        fill={sellColor}
                        dot={{ r: 4 }} // weird..
                        // strokeWidth={0} // This will hide the line connecting the dots
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
