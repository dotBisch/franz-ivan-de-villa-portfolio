import { NextResponse } from 'next/server';
// @ts-ignore
import { search } from 'youtube-search-without-api-key';
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
        const videos = await search(term);

        if (videos.length === 0) {
            return NextResponse.json({ error: 'No videos found' }, { status: 404 });
        }

        // Return the first video ID for playback
        // The library returns objects with 'id' property (usually { videoId: '...' })
        // Checking the structure, it usually returns [{ id: { videoId: '...' }, ... }] or similar depending on version.
        // Let's inspect the first result.
        // Actually, youtube-search-without-api-key returns an array of objects.
        // Standard shape: { id: { videoId: '...' }, title: '...', ... } or just { id: '...', title: '...' }
        // Let's assume standard item.id.videoId or item.id if string.

        // Based on common usage of version 2.x:
        const firstVideo = videos[0];
        // Safely extract videoId
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const videoId = (firstVideo as any).id?.videoId || (firstVideo as any).id || (firstVideo as any).videoId;

        if (!videoId) {
            return NextResponse.json({ error: 'Invalid video data' }, { status: 404 });
        }

        return NextResponse.json({ videoId });


    } catch (error) {
        console.error("YouTube search failed:", error);
        return NextResponse.json({ error: 'Failed to fetch music' }, { status: 500 });
    }
}
