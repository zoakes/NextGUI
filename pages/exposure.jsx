import SearchAppBar from '../components/SearchBar';
import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import TreeExample from '../components/charts/TreeMap';
// import Heatmap from '../components/charts/HCHeatmap';
import HeatMap from 'react-heatmap-grid';
import CardInvertedColors from '../components/cards/JoyCard';
import MyDataGrid from '../components/tables/DataTable';
import TradingViewWidget from '../components/charts/TVHeatmap';

export default function ExposurePage() {
  const card_props = [
    {title: "Gross Exposure", value: "$425.5M", progress: 40},
    {title: "Net Exposure", value: "$12.15M", progress: 10},
    {title: "Max (%)", value: "11%", progress: 10},
    {title: "Min (%)", value: "-4%", progress: 17},
  ]

  // Columns
  const defaultColumns = [
    { field: 'id', headerName: 'ID', width: 90, sortable: true },
    { field: 'child', headerName: 'Child', width: 120, sortable: true },
    { field: 'parent', headerName: 'Parent', width: 120, sortable: true },
    ...Array.from({ length: 20 }, (_, i) => ({ 
        field: `f${i+1}`, 
        headerName: `F${i+1}`, 
        width: 25, 
        sortable: true 
    }))
  ];

  // Sample tickers for child and parent
  const tickers = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'FB', 'TSLA', 'BRK.A', 'V', 'JNJ', 'WMT'];

  // Generate random decimal between 0 and 1
  const randomDecimal = () => parseFloat((Math.random()).toFixed(2));

  // Rows
  const defaultRows = Array.from({ length: 100 }, (_, i) => {
      let obj = {
          id: i+1,
          child: tickers[Math.floor(Math.random() * tickers.length)],
          parent: tickers[Math.floor(Math.random() * tickers.length)]
      };

      // Fill in random decimals for factors
      for (let j = 1; j <= 20; j++) {
          obj[`f${j}`] = randomDecimal();
      }
      return obj;
  });
  const xLabels = new Array(24).fill(0).map((_, i) => `${i}`);
  const yLabels = [ "Mon", "Tue", "Wed","Thu","Fri"];
  const data = new Array(yLabels.length)
    .fill(0)
    .map(() =>
      new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100))
    );



  return (
    <div>
        <SearchAppBar />
        <Box>
            <Grid container spacing={2} className='my-5'>
              {card_props.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
                  <div className='flex items-center justify-center'>
                    <CardInvertedColors 
                      title={item.title} 
                      progress={item.progress} 
                      value={item.value}
                    />
                  </div>
                </Grid>
              ))}
            </Grid>
            <Typography variant='h6' className='p-5 font-hw'>Exposure Calendar</Typography>
            <HeatMap xLabels={xLabels} yLabels={yLabels} data={data} />
            <Typography variant='h6' className='p-5 font-hw'>Factor Loadings</Typography>
            <MyDataGrid className='my-20' columns={defaultColumns} rows={defaultRows} />
            <Box className='flex items-center justify-center'>
              <TradingViewWidget className='h-full w-full'/>
            </Box>
            
        </Box>
    </div>
   
  );
}