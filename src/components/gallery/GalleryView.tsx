"use client";

import { Media, MasonryGrid } from "@once-ui-system/core";
import { gallery } from "@/resources";

export default function GalleryView() {
  return (
    <MasonryGrid columns={2} s={{ columns: 1 }}>
      {gallery.images.map((image, index) => {
        const isVideo =
          image.type === "video" ||
          /\.(mp4|webm|ogg|mov)$/i.test(image.src);

        if (isVideo) {
          return (
            <div
              key={index}
              style={{
                position: "relative",
                borderRadius: "var(--radius-m)",
                overflow: "hidden",
                aspectRatio:
                  image.orientation === "horizontal" ? "16 / 9" : "3 / 4",
              }}
            >
              <video
                src={image.src}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          );
        }

        return (
          <Media
            enlarge
            priority={index < 10}
            sizes="(max-width: 560px) 100vw, 50vw"
            key={index}
            radius="m"
            aspectRatio={
              image.orientation === "horizontal" ? "16 / 9" : "3 / 4"
            }
            src={image.src}
            alt={image.alt}
          />
        );
      })}
    </MasonryGrid>
  );
}
