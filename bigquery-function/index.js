const { BigQuery } = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

exports.queryBigQuery = async (req, res) => {
  // Set CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).send('');
    return;
  }

  const query = req.body.query;

  try {
    const [rows] = await bigquery.query(query);
    res.status(200).send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
