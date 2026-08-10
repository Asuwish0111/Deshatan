"use client";

import Image from "next/image";
import { useState } from "react";
import { StayPhoto } from "./stayPhotos";
import s from "./booking.module.css";

/* The caption is not decoration — CC BY and CC BY-SA require attribution, and
   saying what the frame actually shows is what keeps it honest: these are
   photographs of the area and the kind of stay, not of this property. */
export default function StayGallery({
  photos,
  kind,
}: {
  photos: StayPhoto[];
  kind: string;
}) {
  const [at, setAt] = useState(0);
  if (photos.length === 0) return null;

  const shown = photos[Math.min(at, photos.length - 1)];

  return (
    <figure className={s.gallery}>
      <div className={s.galleryMain}>
        <Image
          key={shown.src}
          src={shown.src}
          alt={`${kind} in ${shown.area}`}
          width={900}
          height={600}
          sizes="(max-width: 900px) 100vw, 760px"
          priority
        />
        <span className={s.galleryTag}>Area &amp; type, not this property</span>
      </div>

      {photos.length > 1 ? (
        <div className={s.galleryThumbs} role="group" aria-label="More photographs">
          {photos.map((p, i) => (
            <button
              type="button"
              key={p.src}
              className={`${s.galleryThumb} ${i === at ? s.galleryThumbOn : ""}`}
              aria-label={`Photograph ${i + 1} of ${photos.length}`}
              aria-current={i === at}
              onClick={() => setAt(i)}
            >
              <Image src={p.src} alt="" width={200} height={140} sizes="120px" />
            </button>
          ))}
        </div>
      ) : null}

      <figcaption className={s.galleryCaption}>
        {shown.area} · {shown.author},{" "}
        <a href={shown.page} target="_blank" rel="noopener noreferrer">
          {shown.licence}
        </a>
      </figcaption>
    </figure>
  );
}
