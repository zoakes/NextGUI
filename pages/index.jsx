import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Paper, Toolbar } from '@mui/material';


import SearchAppBar from '../components/SearchBar';
import { ChartComponent } from '../components/ChartComponent';
// import styles from '../styles/ButtonStyles.module.css'; // Not working (need to read more on tailwind)

import { algoConfig } from '../config';



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

      {/* Fucking around w Tailwind -- rm */}
      <button 
          className="p-6 my-5 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex flex-col items-center justify-center hover:bg-blue-500 focus:outline-none active:bg-blue-700 group ${styles.spinForever}"
          onClick={handleClick}
      >
          <p className="text-gray-500 hover:text-white mb-2 transition duration-300 ease-in-out">Click to support Big Cat.</p> 
          Like Cats ({likes})
      </button>

      <ChartComponent data={initialData} />
    </div>
  );
}