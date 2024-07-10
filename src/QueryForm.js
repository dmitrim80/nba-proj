import React, { useState } from 'react';
import axios from 'axios';

const QueryForm = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const teams = [
    { id: 1, name: 'Boston Celtics' },
    { id: 2, name: 'Golden State Warriors' },
    { id: 3, name: 'New York Knicks' },
    { id: 4, name: 'Detroit Pistons' },
    { id: 5, name: 'Los Angeles Lakers' },
    { id: 6, name: 'Sacramento Kings' },
    { id: 7, name: 'Atlanta Hawks' },
    { id: 8, name: 'Philadelphia 76ers' },
    { id: 9, name: 'Washington Wizards' },
    { id: 10, name: 'Chicago Bulls' },
    { id: 11, name: 'Houston Rockets' },
    { id: 12, name: 'Oklahoma City Thunder' },
    { id: 13, name: 'Milwaukee Bucks' },
    { id: 14, name: 'Phoenix Suns' },
    { id: 15, name: 'Cleveland Cavaliers' },
    { id: 16, name: 'Los Angeles Clippers' },
    { id: 17, name: 'Portland Trail Blazers' },
    { id: 18, name: 'Utah Jazz' },
    { id: 19, name: 'Brooklyn Nets' },
    { id: 20, name: 'Denver Nuggets' },
    { id: 21, name: 'Indiana Pacers' },
    { id: 22, name: 'San Antonio Spurs' },
    { id: 23, name: 'Dallas Mavericks' },
    { id: 24, name: 'Charlotte Hornets' },
    { id: 25, name: 'Miami Heat' },
    { id: 26, name: 'Minnesota Timberwolves' },
    { id: 27, name: 'Orlando Magic' },
    { id: 28, name: 'Memphis Grizzlies' },
    { id: 29, name: 'Toronto Raptors' },
    { id: 30, name: 'New Orleans Pelicans' },
  ];

  const years = [
    '1946', '1947', '1948', '1949', '1950', '1951', '1952', '1953', '1954', '1955',
    '1956', '1957', '1958', '1959', '1960', '1961', '1962', '1963', '1964', '1965',
    '1966', '1967', '1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975',
    '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985',
    '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995',
    '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005',
    '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015',
    '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'
  ];

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };
  
  const handleTeamChange = (e) => {
    setSelectedTeam(e.target.value);
  };

  const executeTeamGamesQuery = async () => {
    const queryData = { teamName: selectedTeam, year: selectedYear };

    try {
      const response = await axios.post('http://localhost:5001/dynamic-query', queryData);
      setResults(response.data);
      setError(null);
    } catch (error) {
      console.error('Error executing query:', error);
      setError(error.response ? error.response.data.error : 'Unknown error');
    }
  };

  const executeSeasonRecordQuery = async () => {
    const queryData = { year: selectedYear };

    try {
      const response = await axios.post('http://localhost:5001/season-team-record', queryData);
      setResults(response.data);
      setError(null);
    } catch (error) {
      console.error('Error executing query:', error);
      setError(error.response ? error.response.data.error : 'Unknown error');
    }
  };

  const handleTeamGamesSubmit = async (e) => {
    e.preventDefault();
    executeTeamGamesQuery();
  };

  const handleSeasonRecordSubmit = async (e) => {
    e.preventDefault();
    executeSeasonRecordQuery();
  };

  return (
    <div>
      <h1>NBA Query Executor</h1>

      <h2>Team Games</h2>
      <form onSubmit={handleTeamGamesSubmit}>
        <select onChange={handleTeamChange} value={selectedTeam}>
          <option value="">Select a team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.name}>{team.name}</option>
          ))}
        </select>
        <select onChange={handleYearChange} value={selectedYear}>
          <option value="">Select a year</option>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <button type="submit" disabled={!selectedYear || !selectedTeam}>Execute Team Games Query</button>
      </form>

      <h2>Season Team Record</h2>
      <form onSubmit={handleSeasonRecordSubmit}>
        <select onChange={handleYearChange} value={selectedYear}>
          <option value="">Select a year</option>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <button type="submit" disabled={!selectedYear}>Execute Season Team Record Query</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Results</h2>
      {results.length > 0 && (
        <div className='results-box'>
          <table className='main-table'>
            <thead>
              <tr>
                {Object.keys(results[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default QueryForm;
