import { getLeagues, League } from "@/lib/api-sports";

export default async function Home() {
  let leagues: League[] = [];
  let error = null;

  try {
    leagues = await getLeagues();
    // Slice to show only first 10 for initial test
    leagues = leagues.slice(0, 10);
  } catch (e) {
    console.error(e);
    error = e instanceof Error ? e.message : "An unknown error occurred";
  }

  return (
    <div className="p-8 font-sans">
      <h1 className="text-3xl font-bold mb-6">QuickBall - API Test</h1>

      {error && (
        <div className="p-4 mb-6 bg-red-100 border border-red-400 text-red-700 rounded">
          <h2 className="font-bold">Error</h2>
          <p>{error}</p>
          <p className="text-sm mt-2">Make sure you have created .env.local with API_SPORTS_KEY</p>
        </div>
      )}

      {!error && leagues.length === 0 && (
        <p>No leagues found (or loading...)</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {leagues.map((league) => (
          <div key={league.id} className="border p-4 rounded shadow-sm flex items-center gap-4">
            <img src={league.logo} alt={league.name} className="w-12 h-12 object-contain" />
            <div>
              <h2 className="font-semibold">{league.name}</h2>
              <p className="text-sm text-gray-500">{league.country.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
