export interface PeriodScore {
    label: string;
    away: number;
    home: number;
}

export interface TeamLeader {
    category: string;
    away: string;
    home: string;
}

export interface GameData {
    id: string;
    teams: {
        away: string;
        home: string;
    };
    scores: {
        away: number;
        home: number;
    };
    periodScores: PeriodScore[];
    leaders: TeamLeader[];
    summary: string;
}

export interface OddsData {
    matchup: string;
    bookmaker: string;
    spread: {
        label: string;
        homeValue: number;
        awayValue: number;
    };
    overUnder: {
        label: string;
        over: number;
        under: number;
    };
}

export interface StandingsRow {
    rank: number;
    team: string;
    w: number;
    l: number;
    pct: string;
    gb: string;
}

export interface ConferenceStandings {
    title: string;
    teams: StandingsRow[];
}

export interface LeagueData {
    editionDate: string;
    yesterday: GameData[];
    odds: OddsData[];
    standings: ConferenceStandings[];
}

export const MOCK_DATA: Record<string, LeagueData> = {
    NBA: {
        editionDate: "December 19, 2025",
        yesterday: [
            {
                id: "nba-1",
                teams: { away: "Atlanta Hawks", home: "Charlotte Hornets" },
                scores: { away: 126, home: 133 },
                periodScores: [
                    { label: "1", away: 32, home: 37 },
                    { label: "2", away: 37, home: 43 },
                    { label: "3", away: 26, home: 27 },
                    { label: "4", away: 31, home: 26 },
                ],
                leaders: [
                    { category: "PTS", away: "Jalen Johnson (43)", home: "Knueppel K. (28)" },
                    { category: "REB", away: "Jalen Johnson (11)", home: "Moussa Diabate (6)" },
                    { category: "AST", away: "Trae Young (10)", home: "LaMelo Ball (13)" },
                ],
                summary: "Atlanta Hawks - FG 47/92 (52%) 3P 11/37 (29%) FT 19/22 (86%)",
            },
            // Adding a game that would realistically be West vs West or cross-conference to justify showing both
            {
                id: "nba-2",
                teams: { away: "LA Lakers", home: "Denver Nuggets" },
                scores: { away: 110, home: 115 },
                periodScores: [
                    { label: "1", away: 28, home: 30 },
                    { label: "2", away: 25, home: 28 },
                    { label: "3", away: 30, home: 25 },
                    { label: "4", away: 27, home: 32 },
                ],
                leaders: [
                    { category: "PTS", away: "Davis (28)", home: "Jokic (35)" },
                    { category: "REB", away: "Davis (12)", home: "Jokic (15)" },
                    { category: "AST", away: "Reaves (8)", home: "Murray (10)" }
                ],
                summary: "Nuggets win close battle in Denver."
            }
        ],
        odds: [
            {
                matchup: "Miami Heat at Boston Celtics",
                bookmaker: "Marathon Bet",
                spread: { label: "Miami Heat -7", homeValue: 1.95, awayValue: 1.83 },
                overUnder: { label: "237.5", over: 2.17, under: 1.4 },
            },
        ],
        standings: [
            {
                title: "Eastern Conference",
                teams: [
                    { rank: 1, team: "Boston Celtics", w: 23, l: 4, pct: ".852", gb: "-" },
                    { rank: 2, team: "Cleveland Cavaliers", w: 20, l: 5, pct: ".800", gb: "2.0" },
                    { rank: 3, team: "Orlando Magic", w: 18, l: 9, pct: ".667", gb: "5.0" },
                    { rank: 4, team: "New York Knicks", w: 16, l: 10, pct: ".615", gb: "6.5" },
                    { rank: 5, team: "Milwaukee Bucks", w: 15, l: 11, pct: ".577", gb: "7.5" },
                    { rank: 6, team: "Indiana Pacers", w: 14, l: 12, pct: ".538", gb: "8.5" },
                    { rank: 7, team: "Detroit Pistons", w: 12, l: 14, pct: ".462", gb: "10.5" },
                    { rank: 8, team: "Atlanta Hawks", w: 11, l: 15, pct: ".423", gb: "11.5" },
                ]
            },
            {
                title: "Western Conference",
                teams: [
                    { rank: 1, team: "OKC Thunder", w: 22, l: 5, pct: ".815", gb: "-" },
                    { rank: 2, team: "Denver Nuggets", w: 20, l: 7, pct: ".741", gb: "2.0" },
                    { rank: 3, team: "Minnesota T-Wolves", w: 19, l: 8, pct: ".704", gb: "3.0" },
                    { rank: 4, team: "Dallas Mavericks", w: 17, l: 10, pct: ".630", gb: "5.0" },
                    { rank: 5, team: "Phoenix Suns", w: 16, l: 11, pct: ".593", gb: "6.0" },
                    { rank: 6, team: "LA Lakers", w: 15, l: 12, pct: ".556", gb: "7.0" },
                    { rank: 7, team: "Golden State", w: 14, l: 13, pct: ".519", gb: "8.0" },
                    { rank: 8, team: "Memphis Grizzlies", w: 13, l: 14, pct: ".481", gb: "9.0" },
                ]
            }
        ]
    },
    NFL: {
        editionDate: "December 19, 2025",
        yesterday: [
            {
                id: "nfl-1",
                teams: { away: "SF 49ers", home: "Seattle Seahawks" },
                scores: { away: 24, home: 17 },
                periodScores: [
                    { label: "1", away: 7, home: 0 },
                    { label: "2", away: 10, home: 7 },
                    { label: "3", away: 0, home: 3 },
                    { label: "4", away: 7, home: 7 },
                ],
                leaders: [
                    { category: "PASS", away: "Purdy (255)", home: "Smith (210)" },
                    { category: "RUSH", away: "McCaffrey (115)", home: "Walker (82)" },
                ],
                summary: "Total Yards: SF 380, SEA 310 | Turnovers: SF 0, SEA 2",
            },
        ],
        odds: [
            {
                matchup: "KC Chiefs at LV Raiders",
                bookmaker: "Marathon Bet",
                spread: { label: "Chiefs -9.5", homeValue: 1.9, awayValue: 1.9 },
                overUnder: { label: "44.5", over: 1.95, under: 1.85 },
            },
        ],
        standings: [
            {
                title: "AFC",
                teams: [
                    { rank: 1, team: "Kansas City", w: 13, l: 2, pct: ".867", gb: "-" },
                    { rank: 2, team: "Buffalo Bills", w: 11, l: 4, pct: ".733", gb: "2.0" },
                    { rank: 3, team: "Baltimore Ravens", w: 10, l: 5, pct: ".667", gb: "3.0" },
                    { rank: 4, team: "Houston Texans", w: 9, l: 6, pct: ".600", gb: "4.0" },
                ]
            },
            {
                title: "NFC",
                teams: [
                    { rank: 1, team: "Detroit Lions", w: 13, l: 2, pct: ".867", gb: "-" },
                    { rank: 2, team: "Phila Eagles", w: 12, l: 3, pct: ".800", gb: "1.0" },
                    { rank: 3, team: "SF 49ers", w: 10, l: 5, pct: ".667", gb: "3.0" },
                    { rank: 4, team: "Atlanta Falcons", w: 9, l: 6, pct: ".600", gb: "4.0" },
                ]
            }
        ]
    },
    MLB: {
        editionDate: "May 15, 2026",
        yesterday: [
            {
                id: "mlb-1",
                teams: { away: "NY Yankees", home: "Boston Red Sox" },
                scores: { away: 5, home: 2 },
                periodScores: [
                    { label: "R", away: 5, home: 2 },
                    { label: "H", away: 9, home: 4 },
                    { label: "E", away: 0, home: 1 },
                ],
                leaders: [
                    { category: "HR", away: "Judge (1)", home: "Devers (0)" },
                    { category: "RBI", away: "Soto (3)", home: "Yoshida (2)" },
                ],
                summary: "Winning Pitcher: Cole (5-1) | Save: Holmes (12)",
            },
        ],
        odds: [],
        standings: [
            {
                title: "American League",
                teams: [
                    { rank: 1, team: "Baltimore", w: 28, l: 14, pct: ".667", gb: "-" },
                    { rank: 2, team: "NY Yankees", w: 27, l: 15, pct: ".643", gb: "1.0" },
                    { rank: 3, team: "Cleveland", w: 26, l: 16, pct: ".619", gb: "2.0" },
                ]
            },
            {
                title: "National League",
                teams: [
                    { rank: 1, team: "LA Dodgers", w: 30, l: 12, pct: ".714", gb: "-" },
                    { rank: 2, team: "Philadelphia", w: 28, l: 14, pct: ".667", gb: "2.0" },
                    { rank: 3, team: "Atlanta", w: 25, l: 17, pct: ".595", gb: "5.0" },
                ]
            }
        ]
    },
    NHL: {
        editionDate: "December 19, 2025",
        yesterday: [
            {
                id: "nhl-1",
                teams: { away: "Edmonton Oilers", home: "Toronto Maple Leafs" },
                scores: { away: 4, home: 3 },
                periodScores: [
                    { label: "1", away: 1, home: 1 },
                    { label: "2", away: 2, home: 1 },
                    { label: "3", away: 1, home: 1 },
                ],
                leaders: [
                    { category: "G", away: "McDavid (2)", home: "Matthews (1)" },
                    { category: "A", away: "Draisaitl (2)", home: "Marner (2)" },
                    { category: "SOG", away: "Hyman (5)", home: "Nylander (6)" }
                ],
                summary: "Oilers edge out Leafs in OT thriller."
            }
        ],
        odds: [
            {
                matchup: "NY Rangers at NJ Devils",
                bookmaker: "Marathon Bet",
                spread: { label: "Devils -1.5", homeValue: 2.10, awayValue: 1.75 },
                overUnder: { label: "6.5", over: 1.90, under: 1.90 }
            }
        ],
        standings: [
            {
                title: "Eastern Conference",
                teams: [
                    { rank: 1, team: "NY Rangers", w: 22, l: 8, pct: ".733", gb: "-" },
                    { rank: 2, team: "Toronto Maple Leafs", w: 20, l: 10, pct: ".667", gb: "2.0" },
                    { rank: 3, team: "Boston Bruins", w: 19, l: 11, pct: ".633", gb: "3.0" },
                    { rank: 4, team: "Florida Panthers", w: 18, l: 12, pct: ".600", gb: "4.0" },
                ]
            },
            {
                title: "Western Conference",
                teams: [
                    { rank: 1, team: "Vegas Golden Knights", w: 23, l: 7, pct: ".767", gb: "-" },
                    { rank: 2, team: "Vancouver Canucks", w: 21, l: 9, pct: ".700", gb: "2.0" },
                    { rank: 3, team: "Dallas Stars", w: 19, l: 11, pct: ".633", gb: "4.0" },
                    { rank: 4, team: "Colorado Avalanche", w: 18, l: 12, pct: ".600", gb: "5.0" },
                ]
            }
        ]
    }
};
