"use client";

import { useState } from "react";
import { OddsData } from "@/lib/data";
import { DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface OddsCardProps {
    odds: OddsData;
}

export default function OddsCard({ odds }: OddsCardProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-400 bg-[var(--paper)] p-3 mb-3">
            <div className="flex justify-between items-center">
                <span className="font-serif font-bold text-sm text-gray-900">
                    {odds.matchup}
                </span>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-xs uppercase tracking-wider font-bold text-blue-800 hover:underline flex items-center gap-1"
                >
                    <DollarSign size={12} />
                    {isOpen ? "Hide Odds" : "Get Odds"}
                </button>
            </div>

            {isOpen && (
                <div className="mt-3 p-3 bg-white border border-gray-200 shadow-inner animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex justify-between items-center mb-2 text-xs text-gray-500 uppercase tracking-widest border-b pb-1">
                        <span>{odds.bookmaker}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-gray-500">Spread</p>
                            <p className="font-bold text-sm font-mono">{odds.spread.label}</p>
                            <div className="flex justify-between text-xs mt-1 text-gray-600">
                                <span>H: {odds.spread.homeValue}</span>
                                <span>A: {odds.spread.awayValue}</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Over/Under</p>
                            <p className="font-bold text-sm font-mono">{odds.overUnder.label}</p>
                            <div className="flex justify-between text-xs mt-1 text-gray-600">
                                <span>O: {odds.overUnder.over}</span>
                                <span>U: {odds.overUnder.under}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
