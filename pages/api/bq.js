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
    // sqlQuery += ` ORDER BY time`; // need this, not workign rn tho.

    return _runCustomQuery(sqlQuery);
}

// DONT think we actually need this shit -- can just pull the columns as the key names from list of rows (easy)

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

async function queryTableAndMapToFormat({  
    project,
    dataset,
    table,
    startDate,
    endDate,
    symbol,
    limit = 10,
    offset = 0,
}) {
    const tableColumns = await generateColumnsFromSchema({project, dataset, table});

    const bqData = await queryTableFiltered({
        project,
        dataset,
        table,
        startDate,
        endDate,
        symbol,
        limit,
        offset,
    });

    const tableRows = bqData.map((row, index) => ({
        id: index + 1,
        ...row,
    }));

    console.log("rows: %d", tableRows);
    return { tableColumns, tableRows };
}




// Export the function to make it available in other modules
module.exports = { queryTableFiltered,  queryTableAndMapToFormat};