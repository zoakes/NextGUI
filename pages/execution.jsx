
import { ChartComponent } from '../components/ChartComponent';
import MyDataGrid from '../components/DataTable';
import CardInvertedColors from '../components/JoyCard';
import { MultiLineChartComponent } from '../components/ReChartComponent';
import SearchAppBar from '../components/SearchBar';
import { Box, Grid, Typography } from '@mui/material';

export default function ExecPage() {
    const card_props = [
        {title: "Quality", value: "91%", progress: 90},
        {title: "Captured", value: "1.4M", progress: 80},
        {title: "Desired", value: "1.6M", progress: 70},
        {title: "Slippage", value: "7%", progress: 7},
        ]

    const initialData = [
        { time: '2018-12-22', value: 32.51 },
        { time: '2018-12-23', value: 31.11 },
        { time: '2018-12-24', value: 27.02 },
        { time: '2018-12-25', value: 27.32 },
        { time: '2018-12-26', value: 25.17 },
        { time: '2018-12-27', value: 28.89 },
        { time: '2018-12-28', value: 25.46 },
        { time: '2018-12-29', value: 23.92 },
        { time: '2018-12-30', value: 22.68 },
        { time: '2018-12-31', value: 22.67 },
    ];
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
        </Box>

        <Box className='p-10 justify-center align-center'>
            <Typography variant='h5' className='px-10 pb-5'>Quality</Typography>
            {/* <MultiLineChartComponent /> */}
            <ChartComponent data={initialData} />
            


            <Typography variant='h5' className='px-10 pb-5'>Fills</Typography>
            <MyDataGrid/>
        </Box>
    </div>
   
  );
}