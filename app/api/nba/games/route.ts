
import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';
import util from 'util';

const execPromise = util.promisify(exec);

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const date = searchParams.get('date');

        const scriptPath = path.join(process.cwd(), 'scripts', 'nba_fetch.py');

        // Check if python is accessible, or use 'py' on windows if 'python' fails in some envs
        let command = `python "${scriptPath}"`;
        if (date) {
            command += ` --date "${date}"`;
        }

        const { stdout, stderr } = await execPromise(command);

        if (stderr) {
            console.warn("Python execution stderr:", stderr);
        }

        try {
            const data = JSON.parse(stdout);
            // If the python script returned an error object
            if (data.error) {
                return NextResponse.json({ error: data.error }, { status: 500 });
            }
            return NextResponse.json(data);
        } catch (parseError) {
            console.error("Failed to parse Python output:", stdout);
            return NextResponse.json({ error: "Failed to parse data source" }, { status: 500 });
        }

    } catch (error) {
        console.error("Internal API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
