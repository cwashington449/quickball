"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const leagues = ["NBA", "NFL", "MLB", "NHL"];

export default function GlobalSwitcher() {
    const pathname = usePathname();
    const currentLeague = pathname.split("/")[1]?.toUpperCase();

    // Simple utility only if we don't have lucide/cn yet, but we installed lucide. 
    // I will assume simple className strings for now or create lib/utils next.

    return (
        <nav className="sticky top-0 left-0 w-full bg-[#111827] text-[#f8f2e7] border-b-4 border-[#fffdf5] z-50 shadow-md">
            <div className="max-w-5xl mx-auto flex justify-between px-4 items-center h-14">
                <Link href="/" className="font-serif font-black tracking-tighter text-lg hover:text-gray-300">
                    QB
                </Link>
                <div className="flex gap-4 md:gap-8">
                    {leagues.map((league) => (
                        <Link
                            key={league}
                            href={`/${league}`}
                            className={`font-sans font-bold tracking-widest text-sm hover:text-white transition-colors ${currentLeague === league ? "text-white underline decoration-2 underline-offset-4" : "text-gray-400"
                                }`}
                        >
                            {league}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
