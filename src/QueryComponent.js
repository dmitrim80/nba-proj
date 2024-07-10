// src/QueryComponent.js
import React, { useState } from 'react';
import axios from 'axios';

const QueryComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://us-central1-nba-project-a983e.cloudfunctions.net/queryBigQuery', { query });
      setResults(response.data);
    } catch (error) {
      console.error('Error executing query:', error);
    }
  };

  return (
    <div>
      <h1>BigQuery Query Executor</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={query}
          onChange={handleQueryChange}
          rows="10"
          cols="50"
          placeholder="Enter your SQL query here"
        />
        <button type="submit">Execute Query</button>
      </form>
      <h2>Results</h2>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
};

export default QueryComponent;
