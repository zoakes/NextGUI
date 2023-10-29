import { LineChart } from '@mui/x-charts/LineChart';

const def_data = [
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

// requires an numeric x axis!
export default function MuiLineChart({data = def_data}) {

  // Prepare xAxis and series data
//   const xAxisData = data.map(item => item.x ? item.x : null); // required to be numeric! 
  const y1SeriesData = data.map(item => item.y1 ? item.y2 : null);
  const y2SeriesData = data.map(item => item.y2 ? item.y2: null);

  
  return (
    <LineChart

        xAxis={[{ data: data.map((_, index) => index) }]}
        series={[
        {
            name: "Y1",
            data: y1SeriesData,
        },
        {
            name: "Y2",
            data: y2SeriesData,
        }
        // Include more series or annotations here if necessary
        ]}
        // series={[{ data: [null, null, 10, 11, 12] }]}
        // xAxis={[{ data: xAxisData}]} //[0, 1, 2, 3, 4, 5, 6] }]}
        
      height={300}
    />
  );
}
