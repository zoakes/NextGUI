
import { ChartComponent } from '../components/charts/ChartComponent';
import MyDataGrid from '../components/tables/DataTable';
import CardInvertedColors from '../components/cards/JoyCard';
import { MultiLineChartComponent } from '../components/charts/ReChartComponent';
import SearchAppBar from '../components/SearchBar';
import { Box, Grid, Typography } from '@mui/material';
import MyAgTable from '../components/tables/AGTable';
import React, { useState, useEffect } from 'react';
import GridExample from '../components/tables/DemoAG';



// TEMPORARY

const ChangeCellRenderer = ({ value }) => {
    const isPositive = value >= 0;
    const style = {
      color: isPositive ? 'green' : 'red',
      fontWeight: 'bold'
    };
    const formattedValue = isPositive ? `↑ ${value}%` : `↓ ${value}%`;
  
    return <span style={style}>{formattedValue}</span>;
  };


const columnDefs = [
    { headerName: "Make", field: "make", checkboxSelection: true, rowDrag: true },
    { headerName: "Model", field: "model" },
    { headerName: "Price", field: "price", cellRenderer: ChangeCellRenderer },
  ];

  const rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
  ];


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

    // Default columns
    const tableColumns = [
        { field: 'id', headerName: 'ID', width: 90, sortable: true },
        {
            field: 'algo_id',
            headerName: 'Algo ID',
            width: 150,
            sortable: true
        },
        {
            field: 'symbol',
            headerName: 'Symbol',
            width: 150,
            sortable: true
        },
        {
            field: 'leg',
            headerName: 'Leg',
            width: 150,
            sortable: true
        },
        {
            field: 'quality',
            headerName: 'Quality',
            width: 150,
            sortable: true
        },
        {
            field: 'slip',
            headerName: 'Slippage',
            width: 150,
            sortable: true
        },
        {
            field: 'target',
            headerName: 'Target (Ticks)',
            width: 150,
            sortable: true
        },
        {
            field: 'captured',
            headerName: 'Captured (Ticks)',
            width: 150,
            sortable: true
        },
        {
            field: 'spread',
            headerName: 'Spread (Ticks)',
            width: 150,
            sortable: true
        },
    ];

    const tableRows = [
        { id: 1, algo_id: '1234', symbol: 'SNOW', leg: 'child', quality: .98, slip: .02 },
        { id: 2, algo_id: '1235', symbol: 'AAPL', leg: 'parent', quality: .98, slip: .02 },
        { id: 3, algo_id: '1236', symbol: 'SNOW', leg: 'child', quality: .98, slip: .02 },
        { id: 4, algo_id: '1237', symbol: 'AMD', leg: 'parent', quality: .98, slip: .02 },
        { id: 5, algo_id: '1238', symbol: 'GOOG', leg: 'child', quality: .98, slip: .02 },
        // ... other rows
    ];


    // ------- FETCH data
    const [data, setData] = useState(rowData); 
    const [col, setCol] = useState(columnDefs);


    // // fetch('/api/data/')
    // useEffect(() => {
    //     // Start fetching the data when the component mounts
    //     fetch('/api/data?type=fills')
    //       .then(response => {
    //         if (!response.ok) {
    //           throw new Error('Network response was not ok ' + response.statusText);
    //         }
    //         return response.json();
    //       })
    //       .then(data => {
    //         setData(data); // Set the data in the state
            

    //         const newcolumnDefs = Object.keys(data[0]).map(key => ({
    //             headerName: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter for the headerName
    //             field: key
    //           }));

    //         setCol(newcolumnDefs);

    //       })
    //       .catch(error => {
    //         console.log("error... ", error);            
    //       });
    //   }, []); 

  return (
    <div>
        <SearchAppBar />
        {/* <div className="w-[143px] h-[119px] relative bg-custom-blue">
            <div className="p-2.5 left-0 justify-center items-center gap-2.5 inline-flex">
                <div className="text-white text-xs font-bold font-['Inter']">Sharpe Ratio</div>
            </div>
            <div className="p-2.5 left-0 top-[34px] absolute justify-start items-center gap-2.5 inline-flex">
                <div className="text-white text-[25px] font-bold font-['Inter']">2.14</div>
            </div>
            <div className="pl-px pr-[5px] py-1 left-[47.48px] top-[41.46px] absolute justify-start items-start inline-flex" />
            <div className="p-2.5 left-0 top-[87px] absolute justify-center items-center inline-flex">
                <div className="text-white text-opacity-20 text-[10px] font-normal font-['Inter']">Rolling 20d</div>
            </div>
            <div className="w-[47px] h-[35px] left-[95px] top-0 absolute justify-center items-center inline-flex">
                <div className="text-white text-xs font-normal font-['Inter']">+.03</div>
            </div>
        </div> */}
        <Typography variant='h5' className='pt-10 pl-20 font-hw'>Execution</Typography>
        <Box>
            <Grid container spacing={2} className='my-5'>
                {card_props.map((item) => (
                <Grid item sm={6} md={4} lg={3} key={item}>
                    <div className='pl-5 flex items-center justify-center'>
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
            <Typography variant='h5' className='px-10 pb-5 font-hw'>Quality</Typography>
            {/* <MultiLineChartComponent /> */}
            <ChartComponent data={initialData} />
            <Typography variant='h5' className='px-10 pb-5 font-hw'>Fills</Typography>
            <MyDataGrid columns={tableColumns} rows={tableRows}/>
        </Box>
        <Box>
            <MyAgTable rowData={rowData} columnDefs={col} />
        </Box>
        <Box>
            <GridExample endpoint={''}/>
        </Box>
    </div>
   
  );
}