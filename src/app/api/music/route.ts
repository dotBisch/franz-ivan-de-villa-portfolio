import { NextResponse } from 'next/server';
// @ts-ignore
import yts from 'yt-search';
import { LRUCache } from 'lru-cache';

const rateLimit = new LRUCache({
    max: 500,
    ttl: 60 * 1000, // 1 minute
});

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
        const r = await yts(term);
        const videos = r.videos;

        if (videos.length === 0) {
            return NextResponse.json({ error: 'No videos found' }, { status: 404 });
        }

        // Return the first video ID for playback
        const videoId = videos[0].videoId;

        return NextResponse.json({ videoId });


    } catch (error) {
        console.error("YouTube search failed:", error);
        return NextResponse.json({ error: 'Failed to fetch music' }, { status: 500 });
    }
}
