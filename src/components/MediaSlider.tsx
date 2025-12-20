"use client";

import { useState } from "react";
import { Media, IconButton } from "@once-ui-system/core";
import styles from "./MediaSlider.module.scss";

interface MediaSliderProps {
    media: string[];
    aspectRatio?: string;
}

export const MediaSlider: React.FC<MediaSliderProps> = ({
    media,
    aspectRatio = "16 / 9"
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    // If only one media item, show it without controls
    if (media.length === 1) {
        return (
            <div className={styles.sliderContainer}>
                <div className={styles.mediaWrapper}>
                    <Media
                        priority
                        aspectRatio={aspectRatio}
                        radius="m"
                        alt="project media"
                        src={media[0]}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className={styles.sliderContainer}>
            {/* Main Media Display */}
            <div
                className={styles.mediaWrapper}
                style={{ aspectRatio }}
            >
                {media.map((src, index) => (
                    <div
                        key={index}
                        className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
                    >
                        <Media
                            priority={index === 0} // Always prioritize loading the first one
                            aspectRatio={aspectRatio}
                            radius="m"
                            alt={`project media ${index + 1}`}
                            src={src}
                        />
                    </div>
                ))}

                {/* Navigation Buttons */}
                {media.length > 1 && (
                    <>
                        <div className={styles.navButton} style={{ left: "16px" }}>
                            <IconButton
                                icon="chevronLeft"
                                size="l"
                                variant="secondary"
                                onClick={goToPrevious}
                                tooltip="Previous"
                            />
                        </div>
                        <div className={styles.navButton} style={{ right: "16px" }}>
                            <IconButton
                                icon="chevronRight"
                                size="l"
                                variant="secondary"
                                onClick={goToNext}
                                tooltip="Next"
                            />
                        </div>
                    </>
                )}
            </div>

            {/* Indicators Below Image */}
            {media.length > 1 && (
                <div className={styles.indicatorsContainer}>
                    {media.map((_, index) => (
                        <div
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`${styles.indicator} ${index === currentIndex ? styles.indicatorActive : ""}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
