import React, { useState, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const MyAgTable = ({ rowData, columnDefs }) => {
  const [gridApi, setGridApi] = useState(null);

  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
  }, []);

  const onCellValueChanged = useCallback((event) => {
    console.log('Data after change:', event.data);
  }, []);

  const defaultColDef = useMemo(() => ({
    editable: true,
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilter: true,
  }), []);

  // Function to export the data to CSV. You can call this from a button click event handler.
  const exportData = useCallback(() => {
    gridApi.exportDataAsCsv();
  }, [gridApi]);

  // Toggle column pinning
  const togglePinning = useCallback((field) => {
    const col = gridApi.getColumnDefs().find(c => c.field === field);
    const currentPinned = col.pinned;
    gridApi.setColumnPinned(field, currentPinned ? null : 'left');
  }, [gridApi]);

  // Additional features setup could be done similarly or integrated into UI elements outside the grid

  return (
    <>
      <button onClick={exportData}>Export CSV</button>
      <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
        <AgGridReact
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          rowData={rowData}
          onGridReady={onGridReady}
          onCellValueChanged={onCellValueChanged}
          animateRows={true}
          enableRangeSelection={true}
          enableCellChangeFlash={true}
          // Other properties as needed
        />
      </div>
    </>
  );
};

export default MyAgTable;
