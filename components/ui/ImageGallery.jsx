"use client";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Zoom from "yet-another-react-lightbox/plugins/zoom";

export default function ImageGallery({ images }) {
  return (
    <Lightbox
      slides={images.map((img) => ({ src: img }))}
      plugins={[Zoom]}
    />
  );
}
