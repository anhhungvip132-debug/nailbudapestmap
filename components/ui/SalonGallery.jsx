"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), { ssr: false });
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

export default function SalonGallery({ gallery }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {gallery.map((img, i) => (
          <div
            key={i}
            className="relative h-40 rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
          >
            <Image
              src={img}
              alt=""
              fill
              className="object-cover group-hover:scale-110 transition duration-500"
              loading="lazy"
              placeholder="blur"
              blurDataURL="/placeholder.png"
            />
          </div>
        ))}
      </div>

      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={gallery.map((src) => ({ src }))}
          plugins={[Zoom, Fullscreen, Thumbnails]}
        />
      )}
    </div>
  );
}
