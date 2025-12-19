interface NewspaperHeaderProps {
    league: string;
    date: string;
}

export default function NewspaperHeader({ league, date }: NewspaperHeaderProps) {
    return (
        <header className="mb-8 border-b-4 border-gray-900 pb-6 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-600 font-sans mb-2">
                Est. 2025
            </p>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 font-serif leading-none">
                Quick Ball
            </h1>
            <div className="flex items-center justify-center gap-4 mt-3 mb-4">
                <div className="h-px bg-gray-400 w-12 md:w-24"></div>
                <p className="text-base italic text-gray-600 font-serif">
                    Your daily {league} briefing. Fresh scores, no fluff.
                </p>
                <div className="h-px bg-gray-400 w-12 md:w-24"></div>
            </div>
            <div className="flex justify-between items-center border-t border-b border-gray-300 py-2 mt-4 px-4 max-w-lg mx-auto">
                <p className="text-xs uppercase tracking-[0.1em] text-gray-500 font-sans">
                    Vol. I
                </p>
                <p className="text-sm uppercase tracking-[0.25em] text-gray-800 font-bold font-sans">
                    {date}
                </p>
                <p className="text-xs uppercase tracking-[0.1em] text-gray-500 font-sans">
                    Price: Free
                </p>
            </div>
        </header>
    );
}
