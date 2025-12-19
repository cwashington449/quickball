
export const API_BASE_URL = "https://v1.basketball.api-sports.io";

export interface ApiSportsResponse<T> {
    get: string;
    parameters: Record<string, string | number>;
    errors: string[] | Record<string, string>;
    results: number;
    response: T[];
}

export interface League {
    id: number;
    name: string;
    type: string;
    logo: string;
    country: {
        id: number;
        name: string;
        code: string;
        flag: string;
    };
    seasons: {
        season: string;
        start: string;
        end: string;
        current: boolean;
    }[];
}

export interface Team {
    id: number;
    name: string;
    logo: string;
}

export interface DriveScores {
    home: number | null;
    away: number | null;
}

export interface Game {
    id: number;
    date: string;
    time: string;
    timestamp: number;
    timezone: string;
    stage: string | null;
    week: string | null;
    status: {
        long: string;
        short: string;
        timer: number | null;
    };
    league: {
        id: number;
        name: string;
        type: string;
        season: string;
        logo: string;
    };
    country: {
        id: number;
        name: string;
        code: string;
        flag: string;
    };
    teams: {
        home: Team;
        away: Team;
    };
    scores: {
        home: {
            quarter_1: number | null;
            quarter_2: number | null;
            quarter_3: number | null;
            quarter_4: number | null;
            over_time: number | null;
            total: number | null;
        };
        away: {
            quarter_1: number | null;
            quarter_2: number | null;
            quarter_3: number | null;
            quarter_4: number | null;
            over_time: number | null;
            total: number | null;
        };
    };
}

export async function fetchApiSports<T>(endpoint: string, params?: Record<string, string>): Promise<T[]> {
    const apiKey = process.env.API_SPORTS_KEY;

    if (!apiKey) {
        throw new Error("API_SPORTS_KEY is not defined in environment variables");
    }

    const url = new URL(`${API_BASE_URL}/${endpoint}`);
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
    }

    const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
            "x-rapidapi-host": "v1.basketball.api-sports.io",
            "x-rapidapi-key": apiKey,
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
        throw new Error(`API-Sports Error: ${response.status} ${response.statusText}`);
    }

    const data: ApiSportsResponse<T> = await response.json();

    if (data.errors && (Array.isArray(data.errors) ? data.errors.length > 0 : Object.keys(data.errors).length > 0)) {
        console.error("API-Sports Logic Error:", data.errors);
        throw new Error(JSON.stringify(data.errors));
    }

    return data.response;
}

export async function getLeagues() {
    return fetchApiSports<League>("leagues");
}

export async function getGames(leagueId: number, season: string, date?: string) {
    // If NBA (ID 12), use our internal python-based API
    if (leagueId === 12) {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
            // Pass date param if it exists
            let url = `${baseUrl}/api/nba/games`;
            if (date) {
                url += `?date=${date}`;
            }
            const res = await fetch(url, { cache: 'no-store' });
            if (!res.ok) throw new Error("Failed to fetch internal NBA API");
            const data = await res.json();
            // Debug logs
            console.log(`[NBA API] Fetching games for date: ${date || 'Today'}`);
            // console.log(`[NBA API] Response length: ${Array.isArray(data) ? data.length : 'Not Array'}`);
            return data as Game[];
        } catch (e) {
            console.error("Internal NBA API Error", e);
            return [];
        }
    }

    // Otherwise use API-Sports
    const params: Record<string, string> = {
        league: leagueId.toString(),
        season: season,
    };

    if (date) {
        params.date = date; // Format: YYYY-MM-DD
    }

    return fetchApiSports<Game>("games", params);
}
