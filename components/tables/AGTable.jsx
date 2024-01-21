import React, { useState, useCallback, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid styles
// import 'ag-grid-community/styles/ag-theme-alpine-dark.css'; // Dark theme
import 'ag-grid-community/styles/ag-theme-alpine.css';

const MyAgTable = ({ rowData, columnDefs }) => {
  const [gridApi, setGridApi] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState(columnDefs.map(col => col.field));

  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
  }, []);

  useEffect(() => {
    if (gridApi) {
      gridApi.setColumnsVisible(columnDefs.map(col => col.field), false); // Hide all columns initially
      gridApi.setColumnsVisible(visibleColumns, true); // Show only selected columns
    }
  }, [gridApi, visibleColumns, columnDefs]);

  const handleColumnToggle = (field) => {
    setVisibleColumns(current => 
      current.includes(field)
        ? current.filter(f => f !== field)
        : [...current, field]
    );
  };

  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <b>Select Columns:</b> {columnDefs.map(col => (
          <label key={col.field} style={{ marginLeft: '10px' }}>
            <input
              type="checkbox"
              checked={visibleColumns.includes(col.field)}
              onChange={() => handleColumnToggle(col.field)}
            /> {col.headerName}
          </label>
        ))}
      </div>
      <button onClick={() => gridApi.exportDataAsCsv()}>Export CSV</button>
      <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
        <AgGridReact
          defaultColDef={{
            editable: true,
            sortable: true,
            filter: true,
            resizable: true,
            floatingFilter: true,
            
          }}
          columnDefs={columnDefs}
          rowData={rowData}
          rowDragManaged={true}
          onGridReady={onGridReady}
          animateRows={true}
          enableRangeSelection={true}
          enableCellChangeFlash={true}
        />
      </div>
    </>
  );
};

export default MyAgTable;
