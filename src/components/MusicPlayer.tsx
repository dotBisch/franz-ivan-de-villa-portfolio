"use client";

import { useState, useEffect } from "react";
import { Column, Row, Text, Media, Icon, IconButton } from "@once-ui-system/core";
import YouTube, { YouTubeProps } from 'react-youtube';

type Track = {
    trackId: number;
    trackName: string;
    artistName: string;
    artworkUrl100: string;
    videoId?: string;
};

export const MusicPlayer = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Track[]>([]);
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [player, setPlayer] = useState<any>(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (query.trim().length > 0) {
                searchMusic(query);
            } else {
                setResults([]);
            }
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [query]);

    const searchMusic = async (term: string) => {
        try {
            const res = await fetch(
                `https://itunes.apple.com/search?term=${encodeURIComponent(
                    term
                )}&media=music&limit=5`
            );
            const data = await res.json();
            setResults(data.results);
        } catch (error) {
            console.error("Music search failed", error);
        }
    };

    const playTrack = async (track: Track) => {
        // Set basic info immediately
        setCurrentTrack({ ...track, videoId: undefined });
        setIsPlaying(true); // Optimistic UI update
        setResults([]);
        setQuery("");

        try {
            const res = await fetch(
                `/api/music?term=${encodeURIComponent(
                    `${track.trackName} ${track.artistName} audio`
                )}`
            );
            const data = await res.json();
            if (data.videoId) {
                setCurrentTrack(prev => prev && prev.trackId === track.trackId ? {
                    ...prev,
                    videoId: data.videoId
                } : prev);
            }
        } catch (error) {
            console.error("Failed to load youtube video", error);
        }
    };

    const togglePlay = () => {
        if (!player) return;

        if (isPlaying) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
        setIsPlaying(!isPlaying);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onReady: YouTubeProps['onReady'] = (event: any) => {
        setPlayer(event.target);
        event.target.playVideo();
        setIsPlaying(true);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onStateChange: YouTubeProps['onStateChange'] = (event: any) => {
        // 1 = Playing, 2 = Paused
        if (event.data === 1) setIsPlaying(true);
        if (event.data === 2) setIsPlaying(false);
    };

    return (
        <Column
            fillWidth
            gap="m"
            marginBottom="xl"
            style={{ maxWidth: "32rem" }}
        >
            <Column position="relative" fillWidth>
                <Row
                    vertical="center"
                    paddingRight="12"
                    paddingLeft="20"
                    fillWidth
                    height="48"
                    background="surface"
                    border="neutral-medium"
                    style={{
                        borderRadius: results.length > 0 ? "24px 24px 0 0" : "24px",
                        overflow: "hidden"
                    }}
                >
                    <input
                        id="music-search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Play a song while you browse"
                        style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "inherit",
                            boxShadow: "none",
                            outline: "none",
                            width: "100%",
                            height: "100%",
                            fontSize: "var(--font-size-body-default-s)",
                            fontFamily: "inherit"
                        }}
                    />
                    <Icon name="search" onBackground="neutral-weak" />
                </Row>

                {results.length > 0 && (
                    <Column
                        className="glass-scroll"
                        fillWidth
                        gap="xs"
                        padding="xs"
                        position="absolute"
                        zIndex={10}
                        background="surface"
                        border="neutral-medium"
                        style={{
                            borderBottomLeftRadius: "24px",
                            borderBottomRightRadius: "24px",
                            top: "100%",
                            maxHeight: "300px",
                            overflowY: "auto",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            borderTop: "none"
                        }}
                    >
                        {results.map((track) => (
                            <Row
                                key={track.trackId}
                                vertical="center"
                                gap="s"
                                padding="xs"
                                radius="s"
                                style={{ cursor: "pointer", transition: "background 0.2s" }}
                                onClick={() => playTrack(track)}
                            >
                                <Media
                                    src={track.artworkUrl100}
                                    style={{ borderRadius: "4px", width: "40px", height: "40px", flexShrink: 0 }}
                                />
                                <Column>
                                    <Text variant="body-strong-s" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "180px" }}>{track.trackName}</Text>
                                    <Text variant="body-default-xs" onBackground="neutral-weak">
                                        {track.artistName}
                                    </Text>
                                </Column>
                            </Row>
                        ))}
                    </Column>
                )}
            </Column>

            {currentTrack ? (
                <Column
                    fillWidth
                    padding="m"
                    border="neutral-alpha-medium"
                    radius="m"
                    background="neutral-alpha-weak"
                    gap="m"
                    position="relative"
                >
                    <Media
                        src={currentTrack.artworkUrl100.replace('100x100bb', '500x500bb')}
                        style={{ borderRadius: "var(--radius-m)", width: "100%", aspectRatio: "1/1", objectFit: "cover", zIndex: 2 }}
                    />

                    {/* Hidden Player */}
                    <div style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", opacity: 0, pointerEvents: "none" }}>
                        {currentTrack.videoId && (
                            <YouTube
                                videoId={currentTrack.videoId}
                                onReady={onReady}
                                onStateChange={onStateChange}
                                opts={{
                                    height: '100%',
                                    width: '100%',
                                    playerVars: {
                                        autoplay: 1,
                                        controls: 0,
                                    },
                                }}
                            />
                        )}
                    </div>

                    <Row fillWidth horizontal="between" vertical="center" gap="s">
                        <Column style={{ minWidth: 0, flex: 1 }}>
                            <Text variant="heading-strong-l" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {currentTrack.trackName}
                            </Text>
                            <Text variant="body-default-m" onBackground="neutral-weak" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {currentTrack.artistName}
                            </Text>
                        </Column>
                        <IconButton
                            onClick={togglePlay}
                            icon={isPlaying ? "pause" : "play"}
                            size="l"
                            variant="primary"
                            style={{ borderRadius: "50%" }}
                        />
                    </Row>
                </Column>
            ) : (
                <Column
                    fillWidth
                    padding="m"
                    border="neutral-alpha-medium"
                    radius="m"
                    background="neutral-alpha-weak"
                    gap="m"
                >
                    <Column
                        fillWidth
                        radius="m"
                        style={{
                            aspectRatio: "1/1",
                        }}
                        background="neutral-alpha-medium"
                        horizontal="center"
                        vertical="center"
                    >
                        <Icon name="music" onBackground="neutral-strong" size="l" style={{ opacity: 0.1 }} />
                    </Column>

                    <Row fillWidth horizontal="between" vertical="center" gap="s">
                        <Column style={{ minWidth: 0, flex: 1 }}>
                            <Text variant="heading-strong-l">
                                No Track
                            </Text>
                            <Text variant="body-default-m" onBackground="neutral-weak">
                                Play a song
                            </Text>
                        </Column>
                        <IconButton
                            icon="play"
                            size="l"
                            variant="primary"
                            style={{ borderRadius: "50%" }}
                        />
                    </Row>
                </Column>
            )
            }
        </Column >
    );
};
