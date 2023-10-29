import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Paper, Toolbar } from '@mui/material';




import SearchAppBar from '../components/SearchBar';
import { ChartComponent } from '../components/ChartComponent';
// import styles from '../styles/ButtonStyles.module.css'; // Not working (need to read more on tailwind)

import MyCard from '../components/MyCard';
import { algoConfig, host } from '../config';
import { MultiLineChartComponent } from '../components/ReChartComponent';
import HighchartsExample from '../components/HighchartComponent';
import CardInvertedColors from '../components/JoyCard';
import MyDataGrid from '../components/DataTable';
// const demo_uri = `${host}:${algoConfig[componentAlgoId]}`


function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

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

export default function HomePage() {
  const [likes, setLikes] = useState(0);

  function handleClick() {
    setLikes(likes + 1);
  }

  const card_props = [
    {title: "Gross Profit", value: "$425.5M", progress: 90},
    {title: "Net Profit   ", value: "$325.5M", progress: 80},
    {title: "Sharpe Ratio", value: "2.56", progress: 70},
    {title: "Quality     ", value: "87%", progress: 87},
  ]

  const chart_ids = Array.from({ length: 16 }, (_, i) => i + 1);

  return (
    <div>
      <SearchAppBar></SearchAppBar>
      <Grid container spacing={2} className='my-5'>
        {chart_ids.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
            
            <ChartComponent data={initialData} />
            <div className='flex items-center justify-center'>
              <h6>Chart {item}</h6>
            </div>

          </Grid>
        ))}
      </Grid>
      <button 
          className="p-6 my-5 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex flex-col items-center justify-center hover:bg-blue-500 focus:outline-none active:bg-blue-700 group ${styles.spinForever}"
          onClick={handleClick}
      >
          <p className="text-gray-500 hover:text-white mb-2 transition duration-300 ease-in-out">Click to support Big Cat.</p> 
          Like Cats ({likes})
      </button>

      <h1 className='m-10 flex flex-col items-center'>Testing other chart types</h1>

      <p className='m-10 flex flex-col items-center'> place for summary charts. Total PNL. Quality Table. Metric 'cards' Etc.</p>
      
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
      <ChartComponent data={initialData} />
      <MultiLineChartComponent />
      <HighchartsExample />
      <div className="w-[1120px] h-[250px] relative">
            <div className="w-[1120px] h-[250px] left-0 top-0 absolute bg-zinc-300" />
            <div className="w-[668px] h-[200px] left-[357px] top-[25px] absolute">
                <div className="w-[0px] h-40 left-[65px] top-[5px] absolute">
                </div>
                <div className="w-[442.85px] h-[158.48px] left-[143px] top-[6.99px] absolute">
                </div>
                <div className="w-[577.46px] h-[162.61px] left-[66.37px] top-[3.40px] absolute">
                </div>
                <div className="w-[559.86px] h-[156.09px] left-[74.10px] top-[12px] absolute">
                </div>
                <div className="w-[568.84px] h-[133.09px] left-[83.51px] top-[32.91px] absolute">
                </div>
            </div>
            <div className="left-[48px] top-[199px] absolute text-black text-opacity-20 text-[17px] font-normal font-['Inter']">Rolling 20d Average</div>
            <div className="left-[206px] top-[118px] absolute text-green-600 text-[35px] font-normal font-['Inter']">+.03</div>
            <div className="w-[151px] h-[77px] left-[38px] top-[100px] absolute text-black text-[75px] font-bold font-['Inter']">2.14</div>
            <div className="w-[318px] left-[33px] top-[32px] absolute text-black text-[50px] font-bold font-['Inter']">Sharpe Ratio</div>
        </div>

        <div className="w-[143px] h-[119px] relative bg-zinc-300">
              <div className="p-2.5 left-0 top-[-0px] absolute justify-center items-center gap-2.5 inline-flex">
                  <div className="text-black text-xs font-bold font-['Inter']">Sharpe Ratio</div>
              </div>
              <div className="p-2.5 left-0 top-[34px] absolute justify-start items-center gap-2.5 inline-flex">
                  <div className="text-black text-[25px] font-bold font-['Inter']">2.14</div>
              </div>
              <div className="pl-px pr-[5px] py-1 left-[47.48px] top-[41.46px] absolute justify-start items-start inline-flex" />
              <div className="p-2.5 left-0 top-[87px] absolute justify-center items-center inline-flex">
                  <div className="text-black text-opacity-20 text-[10px] font-normal font-['Inter']">Rolling 20d</div>
              </div>
              <div className="w-[47px] h-[35px] left-[95px] top-0 absolute justify-center items-center inline-flex">
                  <div className="text-black text-xs font-normal font-['Inter']">+.03</div>
              </div>
          </div>


      <MyDataGrid />
    </div>
  );
}