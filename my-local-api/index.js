const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const { generateTeamGamesQuery, seasonTeamRecord } = require('./queries');

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'nba',
  password: 'postgres',
  port: 5432,
});

app.post('/dynamic-query', async (req, res) => {
  const { teamName, year } = req.body;
  const query = generateTeamGamesQuery(teamName, year);

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send({ error: error.message });
  }
});

app.post('/season-team-record', async (req, res) => {
  const { year } = req.body;
  const query = seasonTeamRecord(year);

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
