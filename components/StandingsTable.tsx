"use client";

import { cn } from "@/lib/utils";
import { ConferenceStandings } from "@/lib/data";

interface StandingsTableProps {
    standings: ConferenceStandings[];
}

export default function StandingsTable({ standings }: StandingsTableProps) {
    if (!standings || standings.length === 0) return null;

    return (
        <div className="mb-8">
            <h2 className="text-center font-serif font-black text-2xl uppercase tracking-widest mb-6 border-b-4 border-gray-900 pb-2">
                Current Standings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {standings.map((conf) => (
                    <div key={conf.title}>
                        <h3 className="font-serif font-bold text-lg uppercase tracking-tighter mb-4 border-b-2 border-gray-900 inline-block">
                            {conf.title}
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead>
                                    <tr className="border-b-2 border-gray-900 font-sans uppercase tracking-widest text-xs">
                                        <th className="py-2 pl-1">#</th>
                                        <th className="py-2">Team</th>
                                        <th className="py-2 text-right">W</th>
                                        <th className="py-2 text-right">L</th>
                                        <th className="py-2 text-right">Pct</th>
                                        <th className="py-2 text-right pr-2">GB</th>
                                    </tr>
                                </thead>
                                <tbody className="font-mono text-gray-900">
                                    {conf.teams.map((row) => (
                                        <tr
                                            key={row.team}
                                            className={cn(
                                                "border-b border-gray-200",
                                                row.rank <= 6 && "bg-green-50/50", // Playoff
                                                row.rank >= 7 && row.rank <= 10 && "bg-yellow-50/50" // Play-in
                                            )}
                                        >
                                            <td className="py-2 pl-1 text-center font-bold text-gray-500 w-8">
                                                {row.rank}
                                            </td>
                                            <td className="py-2 font-bold font-serif whitespace-nowrap">
                                                {row.team}
                                            </td>
                                            <td className="py-2 text-right">{row.w}</td>
                                            <td className="py-2 text-right">{row.l}</td>
                                            <td className="py-2 text-right">{row.pct}</td>
                                            <td className="py-2 text-right pr-2">{row.gb}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Legend for NBA/general purposes - can be made dynamic or generic */}
                        <div className="mt-2 flex gap-4 text-[10px] uppercase tracking-wider text-gray-500 font-sans">
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-green-50/50 border border-gray-200"></div>
                                <span>Playoff</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-yellow-50/50 border border-gray-200"></div>
                                <span>Play-in</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
