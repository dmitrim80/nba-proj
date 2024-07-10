// src/QueryComponent.js
import React, { useState } from 'react';
import axios from 'axios';

const QueryLocalComponent = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
  
    const handleQueryChange = (e) => {
      setQuery(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:5001/query', { query });
        setResults(response.data);
        setError(null);
      } catch (error) {
        console.error('Error executing query:', error);
        setError(error.response ? error.response.data.error : 'Unknown error');
      }
    };
  
    return (
      <div>
        <h1>PostgreSQL Query Executor</h1>
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <h2>Results</h2>
        <pre>{JSON.stringify(results, null, 2)}</pre>
      </div>
    );
  };

export default QueryLocalComponent;
