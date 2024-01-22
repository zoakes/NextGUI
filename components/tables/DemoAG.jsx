import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useCallback, useEffect, useRef, useState } from 'react';

// ------------------ DEFAULT DATA ------------------- (DEMO)
let defRows = [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
];

let defColDefs = [
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" }
];


function getRandomInt(x, y) {
    return Math.floor(Math.random() * (y - x + 1)) + x;
}

const GridExample = ({endpoint = ""}) => {

  const gridRef = useRef();
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState(defRows);
  
  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState(defColDefs);

  
  useEffect( () => {
    console.log('rendered');

    fetch('/api/data?type=latest_output')
    .then( response => {
        if (response.ok){
            return response.json();
        }
    })
    .then( data => {
        
        // get column ids -- this should later be more 'custom' 
        // (hard coded, ish) -- if key == whatever, whatever.
        const newcolDefs = Object.keys(data[0]).map(key => ({
            // headerName: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter for the headerName
            field: key,
            cellRenderer: key === 'hedge_ratio' ? 'agAnimateShowChangeCellRenderer' : null
            
        }));
        // console.log(data);
        // console.log(newcolDefs);
        setRowData(null);
        setColDefs(newcolDefs);
        setRowData(data);
    })

    
  }, []);



  const insertRandom = useCallback(() => {
    // Assuming rowData is not empty and each item has an 'id' property
    if (rowData.length > 0) {
      const randomIndex = getRandomInt(0, rowData.length - 1);
      const newRecord = { ...rowData[randomIndex] }; 
      newRecord.id = newRecord.id * 100; 
      const newData = [...rowData, newRecord]; 
      setRowData(newData);
    }
  }, [rowData]);

  const getRowId = useCallback( params => {
    // console.log(params);
    return params.data.id; // data refers to ROW I believe? so we need some 'row' identifier here.
  })


  const randomUpdate = useCallback(() => {
    setRowData(oldRows => oldRows.map(row => {
      // Randomly decide whether to update this row
      if (Math.random() > 0.5) {
        return row; // Return the row unchanged
      } else {
        return {
          ...row, // Spread the original row properties
          hedge_ratio: row.hedge_ratio + (Math.random() * 2) - 1 // Update the hedge_ratio
        };
      }
    }));
  }, []);

  return (
    // Container
    <div className="ag-theme-quartz" style={{ height: 500 }}>
        <div>
            <button onClick={insertRandom}>Insert Random</button>
            <button onClick={randomUpdate}>Update Random HR</button>
        </div>
        {/* The AG Grid component */}
        <AgGridReact ref={gridRef}
            // enableCellChangeFlash={true} // this is the more basic 'flash change' -- agAnimate is better.
            rowSelection={'multiple'}
            getRowId={getRowId}
            rowData={rowData} 
            columnDefs={colDefs} 
            animateRows={true}
        />
    </div>
  )
}

export default GridExample;