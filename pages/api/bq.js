// Imports the Google Cloud client library
const { BigQuery } = require('@google-cloud/bigquery');

// Creates a client
const bigquery = new BigQuery();

const projectDefault = "yxtrading-toplevel";
const datasetDefault = "yx_bq";
const tableDefault = "algo_out";

// Dangerous AF
async function _runCustomQuery(sqlQuery) {
    const options = {
        query: sqlQuery,
        location: 'US',
    };
    try {
        const [rows] = await bigquery.query(options);
        let len = rows.length; 
        console.log(`Rows returned: ${len}`);
        return rows;
    } catch (err) {
        console.error('ERROR:', err);
        throw err;
    }
}


/*
EXAMPLE: 
queryTableFiltered({
    project: 'yxtrading-toplevel',
    dataset: 'yx_bq',
    table: 'algo_out',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    symbol: 'AAPL',
    limit: 10,
    offset: 0,
}).then((result) => {
    // Process the result here
});
*/

async function queryTableFiltered({ project, dataset, table, startDate, endDate, symbol, limit = 10, offset = 0  }) {
    let sqlQuery = `SELECT * FROM \`${project}.${dataset}.${table}\``;

    let conditions = [];
    if (startDate) {
        conditions.push(`time >= '${startDate}'`);
    }
    if (endDate) {
        conditions.push(`time <= '${endDate}'`);
    }
    if (symbol) {
        conditions.push(`symbol = '${symbol}'`);
    }
    if (conditions.length > 0) {
        sqlQuery += ' WHERE ' + conditions.join(' AND ');
    }
    if (limit) {
        sqlQuery += ` LIMIT ${limit}`;
    }
    if (offset) {
        sqlQuery += ` OFFSET ${offset}`;
    }

    return _runCustomQuery(sqlQuery);
}

// Function to fetch the schema from BigQuery
async function fetchSchema(project, dataset, table) {
    const datasetRef = bigquery.dataset(dataset, { location: 'US' });
    const tableRef = datasetRef.table(table);
    const [metadata] = await tableRef.getMetadata();
    return metadata.schema.fields;
}

// Function to generate columns based on the schema
async function generateColumnsFromSchema(project, dataset, table) {
    const schema = await fetchSchema(project, dataset, table);
    const columns = schema.map((field) => ({
        field: field.name,
        headerName: field.name,
        width: 150,
        sortable: true,
    }));
    return columns;
}

// Function to fetch and map data
async function fetchDataAndMap(project, dataset, table, startDate, endDate, symbol, limit, offset) {
    const columns = await generateColumnsFromSchema(project, dataset, table);
    // Fetch data using queryTableFiltered or your preferred method
    const bqData = await queryTableFiltered({ project, dataset, table, startDate, endDate, symbol, limit, offset });
    
    // Map BigQuery data to match the generated columns
    const tableRows = bqData.map((row) => {
        const mappedRow = {};
        columns.forEach((column) => {
            mappedRow[column.field] = row[column.field];
        });
        return mappedRow;
    });

    return { columns, tableRows };
}




// Export the function to make it available in other modules
module.exports = { queryTableFiltered,  fetchDataAndMap};