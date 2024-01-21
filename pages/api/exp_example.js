// index.js
const express = require('express');

// Require the exported function from bq.js
const { queryTableFiltered, queryTableAndMapToFormat } = require('./bq');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});


/// ALL endpoints begin with http://localhost:PORT/api/backend/ ... 


// Fills endpoint (Very basic, rn -- eventually accept arguments, dates, symbols?)
app.get('/algo_params', async (req, res) => {
    try {

        let startDate = req.query.startDate; // Expecting a date string 'YYYY-MM-DD'
        let endDate = req.query.endDate;     // Expecting a date string 'YYYY-MM-DD'
        let symbol = req.query.symbol;       // Expecting a symbol name string
        let limit = req.query.limit || 10;   // Default to 10 if limit is not provided
        let offset = req.query.offset || 0;   // Default to 0 if offset is not provided

        // Await the async function and get the results
        let results = await queryTableFiltered({
            project: "yxtrading-toplevel",
            dataset: "yx_bq",
            table: "algo_params",
            startDate: startDate,
            endDate: endDate,
            symbol: symbol,
            limit: limit,
            offset: offset
        });

        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// --------------------------------- Filtered Queries ---------------------------------------------


/*
* To call this, use an endpoint like:
* http://yourserver.com/fills2?startDate=2023-01-01&endDate=2023-01-31&symbol=AAPL
* 
* i.e. http://localhost:3000/fills2?startDate=2023-01-01&endDate=2023-01-31&symbol=AAPL
*/
app.get('/fills', async (req, res) => {
    try {
        // Get parameters from the query string
        let startDate = req.query.startDate; // Expecting a date string 'YYYY-MM-DD'
        let endDate = req.query.endDate;     // Expecting a date string 'YYYY-MM-DD'
        let symbol = req.query.symbol;       // Expecting a symbol name string
        let limit = req.query.limit || 10;   // Default to 10 if limit is not provided
        let offset = req.query.offset || 0;   // Default to 0 if offset is not provided

        // Await the async function and get the results with filters
        let results = await queryTableFiltered({
            project: "yxtrading-toplevel",
            dataset: "yx_bq",
            table: "algo_trades",
            startDate: startDate,
            endDate: endDate,
            symbol: symbol,
            limit: limit,
            offset: offset,
        });

        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

/*
 * To call the /output endpoint, use a URL like:
 * http://localhost:3000/api/backend/output?startDate=2023-01-01&endDate=2023-01-31&symbol=AAPL&limit=10&offset=0
 */

// Example URL:
// http://localhost:3000/api/backend/output?startDate=2023-01-01&endDate=2023-01-31&symbol=AAPL&limit=10&offset=0

app.get('/output', async (req, res) => {
    try{
        // Get parameters from the query string
        let startDate = req.query.startDate; // Expecting a date string 'YYYY-MM-DD'
        let endDate = req.query.endDate;     // Expecting a date string 'YYYY-MM-DD'
        let symbol = req.query.symbol;       // Expecting a symbol name string
        let limit = req.query.limit || 10;   // Default to 10 if limit is not provided
        let offset = req.query.offset || 0;   // Default to 0 if offset is not provided


        // Await the async function and get the results with filters
        const { cols, rows } = await queryTableAndMapToFormat({
            project: "yxtrading-toplevel",
            dataset: "yx_bq",
            table: "algo_out",
            startDate: startDate,
            endDate: endDate,
            symbol: symbol,
            limit: limit,
            offset: offset
        });

        res.json(rows);

    } catch (error){
        res.status(500).send(error.message);
    }
});

const PORT = 3001
// Use npm run dev for nodemon (hot reload)
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

console.log("OK");


export default (req, res) => {
    app(req, res); // Pass the request and response to the express app
  };