import { notFound } from "next/navigation";
import { MOCK_DATA } from "@/lib/data";
import NewspaperHeader from "@/components/NewspaperHeader";
import ScoreCard from "@/components/ScoreCard";
import StandingsTable from "@/components/StandingsTable";
import OddsCard from "@/components/OddsCard";

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

export default async function LeaguePage({ params }: LeaguePageProps) {
    const { league } = await params;
    const upperLeague = league.toUpperCase();
    const data = MOCK_DATA[upperLeague];

    if (!data) {
        // If not in MOCK_DATA but valid route (like NHL which has no data in mock yet? MOCK_DATA has NHL? No, MOCK_DATA keys are NBA, NFL, MLB. NHL is missing in MOCK_DATA but valid in 'generateStaticParams')
        // Correcting logic: MOCK_DATA has keys.
        if (!["NBA", "NFL", "MLB", "NHL"].includes(upperLeague)) {
            notFound();
        }
        // Render placeholder if data missing (e.g. NHL)
    }

    return (
        <main className="min-h-screen p-0 md:p-8 flex flex-col items-center bg-[var(--background)] pb-24">
            <div className="w-full max-w-5xl bg-[var(--paper)] min-h-[90vh] shadow-[0_10px_40px_rgba(0,0,0,0.15)] border-x border-gray-300 md:border border-gray-200 p-4 md:p-8 relative">
                {data ? (
                    <>
                        <NewspaperHeader league={upperLeague} date={data.editionDate} />

                        {/* Layout: Scores (Top) -> Standings (Middle) -> Odds (Bottom or integrated?)
                Actually, Newspaper style usually has columns.
                User asked for room for 2 conferences.
                Let's put Yesterday's Scores on top wide.
                Then Standings side-by-side.
                Then Odds.
            */}

                        <div className="mb-12">
                            <h2 className="text-2xl font-serif font-black uppercase tracking-tighter border-b-4 border-gray-900 mb-6 flex justify-between items-center">
                                <span>Yesterday's Action</span>
                                <span className="hidden md:inline text-xs font-sans tracking-widest text-gray-500 font-normal">Updated {data.editionDate}</span>
                            </h2>

                            <div className="grid grid-cols-1 gap-6">
                                {data.yesterday.length > 0 ? (
                                    data.yesterday.map((game) => (
                                        <ScoreCard key={game.id} game={game} />
                                    ))
                                ) : (
                                    <p className="italic text-gray-500">No games yesterday.</p>
                                )}
                            </div>
                        </div>

                        <StandingsTable standings={data.standings} />

                        <div className="mb-12">
                            <h2 className="text-2xl font-serif font-black uppercase tracking-tighter border-b-4 border-gray-900 mb-6">
                                Today's Games & Odds
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {data.odds.length > 0 ? (
                                    data.odds.map((odds, idx) => (
                                        <OddsCard key={idx} odds={odds} />
                                    ))
                                ) : (
                                    <p className="italic text-gray-500 text-sm">No odds available.</p>
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
