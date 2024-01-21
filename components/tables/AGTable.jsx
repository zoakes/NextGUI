import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid styles
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Theme

const MyAgTable = ({ rowData, columnDefs }) => {
  // State for grid API and column API
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  // Grid ready event
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  // Example edit event handler
  const onCellValueChanged = (event) => {
    console.log('Data after change:', event.data);
  };

  // Memoize the defaultColDef to avoid re-rendering issues
  const defaultColDef = useMemo(() => ({
    editable: true, // Make cells editable
    sortable: true, // Allow sorting
    filter: true, // Allow filtering
    resizable: true, // Allow column resizing
  }), []);

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
      <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        rowData={rowData}
        onGridReady={onGridReady}
        onCellValueChanged={onCellValueChanged}
        animateRows={true} // Optional: animate row changes
        enableRangeSelection={true} // Optional: enable range selection
        enableCellChangeFlash={true} // Optional: flash cells on change
        // Add other grid options as needed
      />
    </div>
  );
};


export default MyAgTable;