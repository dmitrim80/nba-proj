const generateTeamGamesQuery = (teamName, year) => {
  return `
  SELECT 
    TO_CHAR(game_date, 'YYYY-MM-DD') AS game_date,
    matchup_home AS Matchup,
    (pts_home || ' vs ' || pts_away) AS score,
    fgm_home,
    fga_home,
    TO_CHAR(fg_pct_home * 100, 'FM90.0') || '%' AS fg_pct_home,
    fgm_away,
    fga_away,
    TO_CHAR(fg_pct_away * 100, 'FM90.0') || '%' AS fg_pct_away,

    fg3m_home,
    fg3a_home,
    TO_CHAR(fg3_pct_home * 100, 'FM90.0') || '%' AS fg3_pct_home,

    fg3m_away,
    fg3a_away,
    TO_CHAR(fg3_pct_away * 100, 'FM90.0') || '%' AS fg3_pct_away,

    ftm_home,
    fta_home,
    TO_CHAR(ft_pct_home * 100, 'FM90.0') || '%' AS  ft_pct_home,

    ftm_away,
    fta_away,
    TO_CHAR(ft_pct_away * 100, 'FM90.0') || '%' AS ft_pct_away,

    oreb_home,
    dreb_home,
    reb_home,
    oreb_away,
    dreb_away,
    reb_away,

    ast_home,
    ast_away,
    stl_home,
    stl_away,
    blk_home,
    blk_away,
    tov_home,
    tov_away,
    pf_home,
    pf_away,
    
    season_type
FROM game
WHERE 
      (team_name_home = '${teamName}' OR 
      team_name_away = '${teamName}')
      AND season_id = '2${year}'`;
};

const seasonTeamRecord = (year) => {
  return `
  SELECT
    t.full_name AS team_name,
    COUNT(CASE WHEN g.wl_home = 'W' AND g.team_id_home = t.id THEN 1 ELSE NULL END) +
    COUNT(CASE WHEN g.wl_away = 'W' AND g.team_id_away = t.id THEN 1 ELSE NULL END) AS number_of_wins,
    COUNT(CASE WHEN g.wl_home = 'L' AND g.team_id_home = t.id THEN 1 ELSE NULL END) +
    COUNT(CASE WHEN g.wl_away = 'L' AND g.team_id_away = t.id THEN 1 ELSE NULL END) AS number_of_losses
  FROM 
    game g
  LEFT JOIN 
    team t ON g.team_id_home = t.id OR g.team_id_away = t.id
  WHERE
    g.season_id = '2${year}'
  GROUP BY 
    t.full_name
  ORDER BY 
    number_of_wins DESC;
  `;
};

module.exports = {
  generateTeamGamesQuery,
  seasonTeamRecord,
  // Add other dynamic query functions here
};
