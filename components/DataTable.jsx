import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

// Default columns
const defaultColumns = [
    { field: 'id', headerName: 'ID', width: 90, sortable: true },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      sortable: true
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      sortable: true
    },
];
  
  // Default rows
const defaultRows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    // ... other rows
];
  
function MyDataGrid({ columns = defaultColumns, rows = defaultRows }) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        pageSizeOptions={[5, 10, 25,50, 100]}
        rowsPerPageOptions={[5, 10]}
        checkboxSelection
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
      />
    </div>
  );
}

export default MyDataGrid;
