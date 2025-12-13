import { NextResponse } from 'next/server';
import { LRUCache } from 'lru-cache';

const rateLimit = new LRUCache({
    max: 500,
    ttl: 60 * 1000, // 1 minute
});

// Simple YouTube search without external dependencies
async function searchYouTube(query: string): Promise<string | null> {
    try {
        // Use YouTube's internal API endpoint
        const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
        const response = await fetch(searchUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const html = await response.text();

        // Extract video ID from the HTML using regex
        // YouTube embeds initial data in the page as JSON
        const match = html.match(/"videoId":"([^"]{11})"/);

        if (match && match[1]) {
            return match[1];
        }

        return null;
    } catch (error) {
        console.error('YouTube search error:', error);
        return null;
    }
}

export async function GET(request: Request) {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const limit = 10; // requests per minute

    // @ts-ignore
    const tokenCount = rateLimit.get(ip) as number[] || [0];
    if (tokenCount[0] > limit) {
        return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    rateLimit.set(ip, [tokenCount[0] + 1]);

    const { searchParams } = new URL(request.url);
    const term = searchParams.get('term');

    if (!term) {
        return NextResponse.json({ results: [] });
    }

    try {
        const videoId = await searchYouTube(term);

        if (!videoId) {
            return NextResponse.json({ error: 'No videos found' }, { status: 404 });
        }

        return NextResponse.json({ videoId });

    } catch (error) {
        console.error("YouTube search failed:", error);
        return NextResponse.json({ error: 'Failed to fetch music' }, { status: 500 });
    }
}
