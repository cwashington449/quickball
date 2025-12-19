"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { GameData } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ScoreCardProps {
    game: GameData;
}

export default function ScoreCard({ game }: ScoreCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            className={cn(
                "border-2 border-gray-900 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300",
                isExpanded ? "mb-6" : "mb-4 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            )}
        >
            {/* Header / Summary */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                        <span className="font-serif font-black text-xl md:text-2xl text-gray-900">
                            {game.teams.away}
                        </span>
                        <span className="font-mono font-bold text-2xl text-gray-900">
                            {game.scores.away}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-serif font-black text-xl md:text-2xl text-gray-900">
                            {game.teams.home}
                        </span>
                        <span className="font-mono font-bold text-2xl text-gray-900">
                            {game.scores.home}
                        </span>
                    </div>
                </div>
                <div className="ml-4 pl-4 border-l-2 border-gray-300 flex flex-col items-center justify-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
                        Final
                    </span>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            </button>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="p-4 border-t-2 border-gray-900 bg-[var(--paper)] animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Line Score */}
                    <div className="overflow-x-auto mb-4">
                        <table className="w-full text-sm font-mono border-collapse border border-gray-900">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-900 p-1 text-center">Team</th>
                                    {game.periodScores.map((p) => (
                                        <th key={p.label} className="border border-gray-900 p-1 text-center w-12">
                                            {p.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-900 p-1 font-bold pl-2">{game.teams.away}</td>
                                    {game.periodScores.map((p) => (
                                        <td key={p.label} className="border border-gray-900 p-1 text-center">
                                            {p.away}
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="border border-gray-900 p-1 font-bold pl-2">{game.teams.home}</td>
                                    {game.periodScores.map((p) => (
                                        <td key={p.label} className="border border-gray-900 p-1 text-center">
                                            {p.home}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Leaders */}
                    <div className="mb-4">
                        <h4 className="font-serif font-bold text-sm uppercase tracking-widest border-b border-gray-400 mb-2 pb-1">
                            Game Leaders
                        </h4>
                        <div className="grid grid-cols-3 gap-2 text-xs md:text-sm">
                            <div className="font-bold text-gray-500 text-center">CAT</div>
                            <div className="font-bold text-gray-500">{game.teams.away}</div>
                            <div className="font-bold text-gray-500">{game.teams.home}</div>
                            {game.leaders.map((leader, idx) => (
                                <>
                                    <div key={`cat-${idx}`} className="font-mono font-bold text-center bg-gray-100 p-1 border border-gray-300">
                                        {leader.category}
                                    </div>
                                    <div key={`away-${idx}`} className="truncate p-1 border-b border-gray-200">
                                        {leader.away}
                                    </div>
                                    <div key={`home-${idx}`} className="truncate p-1 border-b border-gray-200">
                                        {leader.home}
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-gray-100 p-2 border border-gray-300 text-xs text-center font-mono text-gray-700">
                        {game.summary}
                    </div>
                </div>
            )}
        </div>
    );
}
