// pages/api/data.js

import { queryTableFiltered, queryLatestOutputs } from './bq'; // Import your functions from bq.js


// import { NextApiRequest, NextApiResponse } from 'next';
// these types are ( NextApiRequest, NextApiResponse )
export default async (req, res) => {

  const { endpoint, startDate, endDate, symbol, limit = 10, offset = 0 } = req.query;
  // console.log(req);
  // console.log(endpoint, startDate, endDate, symbol, limit);
  // console.log(req.query);
  console.log(req.url); // This will show you the full URL requested, including query parameters.

  // GET handling. -- /api/data?type=fills
  if (req.method === 'GET') {

    const { query } = req;
    const { type } = req.query; // Expecting something like /api/data?type=fills

    let tableName;
    switch (type) {
        case 'algo_params':
            tableName = 'algo_params';
            break;
        case 'fills':
            tableName = 'algo_trades';
            break;
        case 'output':
            tableName = 'algo_out';
            break;
        case 'latest_output':
            tableName = 'latest_runs_outputs';
            break;
        default:
            // Handle unsupported endpoints or provide a default table name
            tableName = 'algo_params';
            // return res.status(400).json({ error: 'Invalid endpoint' });
    }

    // unpack the fields, or default.
    const { startDate, endDate, symbol, limit = 10, offset = 0 } = query;
    try {
      const results = await queryTableFiltered({
        project: "yxtrading-toplevel",
        dataset: "yx_bq",
        table: tableName,
        startDate,
        endDate,
        symbol,
        limit,
        offset,
      });

      res.json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }


  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
