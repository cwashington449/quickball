
import { notFound } from "next/navigation";
import { MOCK_DATA } from "@/lib/data";
import NewspaperHeader from "@/components/NewspaperHeader";
import ScoreCard from "@/components/ScoreCard";
import StandingsTable from "@/components/StandingsTable";
import OddsCard from "@/components/OddsCard";
import { getGames, Game } from "@/lib/api-sports";

interface LeaguePageProps {
    params: Promise<{ league: string }>;
}

export async function generateStaticParams() {
    return [
        { league: "NBA" },
        { league: "NFL" },
        { league: "MLB" },
        { league: "NHL" },
    ];
}

// Helper to format date as YYYY-MM-DD using local time
function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export default async function LeaguePage({ params }: LeaguePageProps) {
    const { league } = await params;
    const upperLeague = league.toUpperCase();

    // Default to mock data
    let data = MOCK_DATA[upperLeague];

    // Live Data Implementation for NBA
    let liveGames: any[] = [];
    let upcomingGames: any[] = [];
    let isLiveData = false;
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (upperLeague === "NBA") {
        try {
            const NBA_ID = 12;
            const SEASON = "2025-2026";

            // Fetch Yesterday's Games (Scores)
            const yesterdayGames = await getGames(NBA_ID, SEASON, formatDate(yesterday));

            // Fetch Today's Games (Schedule/Odds placeholder)
            const todayGames = await getGames(NBA_ID, SEASON, formatDate(today));

            isLiveData = true;

            // Map API data to component props matching GameData interface
            liveGames = yesterdayGames.map((game: Game) => ({
                id: game.id,
                // ScoreCard expects teams: { home: string, away: string }
                teams: {
                    home: game.teams.home.name,
                    away: game.teams.away.name,
                },
                scores: {
                    home: game.scores.home.total || 0,
                    away: game.scores.away.total || 0,
                },
                // Mocking detailed stats for now to prevent errors
                periodScores: [
                    { label: "T", home: game.scores.home.total || 0, away: game.scores.away.total || 0 }
                ],
                leaders: [],
                summary: `${game.teams.away.name} at ${game.teams.home.name}`,
                status: game.status.long,
            }));

            // For upcoming/odds, we just show the schedule for now with mock odds
            upcomingGames = todayGames.map((game: Game) => ({
                bookmaker: "BetMGM", // Mock
                matchup: `${game.teams.home.name} vs ${game.teams.away.name}`,
                spread: { label: "-1.5", homeValue: "-110", awayValue: "-110" }, // Mock
                overUnder: { label: "220.5", over: "-110", under: "-110" }, // Mock
                moneyLine: { home: "-120", away: "+100" } // Mock
            }));

        } catch (e) {
            console.error("Failed to fetch NBA API data:", e);
            // Fallback to mock data if API fails
            isLiveData = false;
        }
    }

    // Use Live Data if available, otherwise MOCK_DATA
    const displayYesterday = isLiveData ? liveGames : (data?.yesterday || []);
    const displayOdds = isLiveData ? upcomingGames : (data?.odds || []);
    const editionDate = isLiveData ? formatDate(today) : (data?.editionDate || "Unknown");

    if (!data && !isLiveData) {
        if (!["NBA", "NFL", "MLB", "NHL"].includes(upperLeague)) {
            notFound();
        }
        // Render placeholder if data missing completely (e.g. NHL)
    }

    return (
        <main className="min-h-screen p-0 md:p-8 flex flex-col items-center bg-[var(--background)] pb-24">
            <div className="w-full max-w-5xl bg-[var(--paper)] min-h-[90vh] shadow-[0_10px_40px_rgba(0,0,0,0.15)] border-x border-gray-300 md:border border-gray-200 p-4 md:p-8 relative">
                {(data || isLiveData) ? (
                    <>
                        <NewspaperHeader league={upperLeague} date={editionDate} />

                        <div className="mb-12">
                            <h2 className="text-2xl font-serif font-black uppercase tracking-tighter border-b-4 border-gray-900 mb-6 flex justify-between items-center">
                                <span>Yesterday's Action</span>
                                <span className="hidden md:inline text-xs font-sans tracking-widest text-gray-500 font-normal">Updated {editionDate}</span>
                            </h2>

                            <div className="grid grid-cols-1 gap-6">
                                {displayYesterday.length > 0 ? (
                                    displayYesterday.map((game: any) => (
                                        <ScoreCard key={game.id} game={game} />
                                    ))
                                ) : (
                                    <p className="italic text-gray-500">No games yesterday.</p>
                                )}
                            </div>
                        </div>

                        {/* Standings - Keep Mock for now until we implement getStandings */}
                        {data && <StandingsTable standings={data.standings} />}

                        <div className="mb-12">
                            <h2 className="text-2xl font-serif font-black uppercase tracking-tighter border-b-4 border-gray-900 mb-6">
                                Today's Games & Odds
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {displayOdds.length > 0 ? (
                                    displayOdds.map((odds: any, idx: number) => (
                                        <OddsCard key={idx} odds={odds} />
                                    ))
                                ) : (
                                    <p className="italic text-gray-500 text-sm">No games today.</p>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center p-12">
                        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">{upperLeague}</h1>
                        <p className="text-gray-600 italic">No edition available for this league yet.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
