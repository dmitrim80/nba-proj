const generateQuery = (nickname) => {
  return `
    SELECT full_name, team.state, team.year_founded, arena, arenacapacity, 
           team_details.owner, team_details.generalmanager, team_details.headcoach 
    FROM team 
    LEFT JOIN team_details ON team.id = team_details.team_id 
    LEFT JOIN team_history ON team.id = team_history.team_id 
    WHERE team.nickname = '${nickname}' LIMIT 1;
  `;
};

export const teams = [
  { id: 1, name: 'Boston Celtics', query: generateQuery('Celtics') },
  { id: 2, name: 'Golden State Warriors', query: generateQuery('Warriors') },
  { id: 3, name: 'New York Knicks', query: generateQuery('Knicks') },
  { id: 4, name: 'Detroit Pistons', query: generateQuery('Pistons') },
  { id: 5, name: 'Los Angeles Lakers', query: generateQuery('Lakers') },
  { id: 6, name: 'Sacramento Kings', query: generateQuery('Kings') },
  { id: 7, name: 'Atlanta Hawks', query: generateQuery('Hawks') },
  { id: 8, name: 'Philadelphia 76ers', query: generateQuery('76ers') },
  { id: 9, name: 'Washington Wizards', query: generateQuery('Wizards') },
  { id: 10, name: 'Chicago Bulls', query: generateQuery('Bulls') },
  { id: 11, name: 'Houston Rockets', query: generateQuery('Rockets') },
  { id: 12, name: 'Oklahoma City Thunder', query: generateQuery('Thunder') },
  { id: 13, name: 'Milwaukee Bucks', query: generateQuery('Bucks') },
  { id: 14, name: 'Phoenix Suns', query: generateQuery('Suns') },
  { id: 15, name: 'Cleveland Cavaliers', query: generateQuery('Cavaliers') },
  { id: 16, name: 'Los Angeles Clippers', query: generateQuery('Clippers') },
  { id: 17, name: 'Portland Trail Blazers', query: generateQuery('Trail Blazers') },
  { id: 18, name: 'Utah Jazz', query: generateQuery('Jazz') },
  { id: 19, name: 'Brooklyn Nets', query: generateQuery('Nets') },
  { id: 20, name: 'Denver Nuggets', query: generateQuery('Nuggets') },
  { id: 21, name: 'Indiana Pacers', query: generateQuery('Pacers') },
  { id: 22, name: 'San Antonio Spurs', query: generateQuery('Spurs') },
  { id: 23, name: 'Dallas Mavericks', query: generateQuery('Mavericks') },
  { id: 24, name: 'Charlotte Hornets', query: generateQuery('Hornets') },
  { id: 25, name: 'Miami Heat', query: generateQuery('Heat') },
  { id: 26, name: 'Minnesota Timberwolves', query: generateQuery('Timberwolves') },
  { id: 27, name: 'Orlando Magic', query: generateQuery('Magic') },
  { id: 28, name: 'Memphis Grizzlies', query: generateQuery('Grizzlies') },
  { id: 29, name: 'Toronto Raptors', query: generateQuery('Raptors') },
  { id: 30, name: 'New Orleans Pelicans', query: generateQuery('Pelicans') }
];
  export const queries2 = [
    {
      id: 1,
      name: 'player',
      query: 'SELECT * FROM player LIMIT 25;',
    },
    {
      id: 2,
      name: 'Teams',
      query: 'SELECT * FROM team ORDER BY year_founded, city LIMIT 30;',
    },
    {
      id: 3,
      name: 'Games',
      query: 'SELECT * FROM game_info WHERE game_date::DATE > CURRENT_DATE - INTERVAL \'1000 days\' LIMIT 30;',
    },
  ];