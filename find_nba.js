const fs = require('fs');
const path = require('path');

// Load env manully since we are running with plain node
const envPath = path.join(__dirname, '.env.local');
try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/API_SPORTS_KEY=(.*)/);
    const apiKey = match ? match[1].trim() : null;

    if (!apiKey) {
        console.error("No API_SPORTS_KEY found in .env.local");
        process.exit(1);
    }

    console.log("Fetching NBA league info...");

    fetch("https://v1.basketball.api-sports.io/leagues?name=NBA", {
        headers: {
            "x-rapidapi-host": "v1.basketball.api-sports.io",
            "x-rapidapi-key": apiKey
        }
    })
        .then(r => r.json())
        .then(data => {
            if (data.response && data.response.length > 0) {
                console.log("FOUND NBA LEAGUE:");
                console.log("ID:", data.response[0].id);
                console.log("Name:", data.response[0].name);
                console.log("Seasons:", data.response[0].seasons.map(s => s.season).join(', '));
                const currentSeason = data.response[0].seasons.find(s => s.current);
                console.log("Current Season:", currentSeason ? currentSeason.season : "None");
            } else {
                console.log("NBA League not found in API response.");
                console.log(JSON.stringify(data, null, 2));
            }
        })
        .catch(e => console.error("Error fetching:", e));

} catch (err) {
    console.error("Error reading .env.local:", err.message);
}
