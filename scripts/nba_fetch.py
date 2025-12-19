from nba_api.stats.endpoints import scoreboardv2, leaguegamelog
from nba_api.stats.static import teams as static_teams
import json
import argparse
from datetime import datetime

# Pre-fetch all teams for static lookup
nba_teams = static_teams.get_teams()
teams_map = {str(t['id']): t for t in nba_teams}

def get_season_string(date_obj):
    # If month >= 9 (September), it's the start year of the season
    # If month <= 7 (July), it's the end year of the season
    # Else... off season? assume start year.
    year = date_obj.year
    month = date_obj.month
    
    start_year = year if month >= 9 else year - 1
    end_year_suffix = (start_year + 1) % 100
    return f"{start_year}-{end_year_suffix:02d}"

def fetch_games(date_str=None):
    try:
        # Default to today if no date provided
        dt = datetime.now()
        if date_str:
            try:
                dt = datetime.strptime(date_str, '%Y-%m-%d')
            except ValueError:
                pass
        
        date_formatted = dt.strftime('%m/%d/%Y') # For Scoreboard
        season_str = get_season_string(dt)       # For GameLog
        
        # 1. Get Structure from ScoreboardV2
        board = scoreboardv2.ScoreboardV2(game_date=date_formatted)
        game_headers = board.game_header.get_dict()['data']
        header_cols = board.game_header.get_dict()['headers']
        
        # 2. Get Scores from LeagueGameLog (more reliable for 2025 apparently)
        log = leaguegamelog.LeagueGameLog(season=season_str, date_from_nullable=date_formatted, date_to_nullable=date_formatted)
        log_rows = log.get_dict()['resultSets'][0]['rowSet']
        log_headers = log.get_dict()['resultSets'][0]['headers']
        
        def get_col(row, cols, name):
            if name in cols:
                return row[cols.index(name)]
            return None

        # Map TeamID -> Points from GameLog
        team_scores = {}
        if log_rows:
            for row in log_rows:
                tid = str(get_col(row, log_headers, 'TEAM_ID'))
                pts = get_col(row, log_headers, 'PTS')
                team_scores[tid] = pts

        formatted_games = []
        
        for game_row in game_headers:
            game_id = str(get_col(game_row, header_cols, 'GAME_ID'))
            status_text = get_col(game_row, header_cols, 'GAME_STATUS_TEXT')
            home_id = str(get_col(game_row, header_cols, 'HOME_TEAM_ID'))
            away_id = str(get_col(game_row, header_cols, 'VISITOR_TEAM_ID'))
            
            # Static Team Details
            home_info = teams_map.get(home_id, {})
            away_info = teams_map.get(away_id, {})
            
            # Scores from GameLog Map
            home_score = team_scores.get(home_id, 0)
            away_score = team_scores.get(away_id, 0)
            
            formatted_games.append({
                "id": int(game_id) if game_id.isdigit() else game_id, 
                "date": get_col(game_row, header_cols, 'GAME_DATE_EST'),
                "time": status_text,
                "status": {
                    "long": status_text, 
                    "short": status_text,
                    "timer": None 
                },
                "teams": {
                    "home": {
                        "name": home_info.get('nickname', 'Home'),
                        "city": home_info.get('city', ''),
                        "score": home_score,
                        "logo": f"https://cdn.nba.com/logos/nba/{home_id}/primary/L/logo.svg"
                    },
                    "away": {
                        "name": away_info.get('nickname', 'Away'),
                        "city": away_info.get('city', ''),
                        "score": away_score,
                        "logo": f"https://cdn.nba.com/logos/nba/{away_id}/primary/L/logo.svg"
                    }
                },
                "scores": {
                    "home": {"total": home_score},
                    "away": {"total": away_score}
                }
            })
        
        print(json.dumps(formatted_games))

    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--date', type=str, help='Date in YYYY-MM-DD format')
    args = parser.parse_args()
    
    fetch_games(args.date)
