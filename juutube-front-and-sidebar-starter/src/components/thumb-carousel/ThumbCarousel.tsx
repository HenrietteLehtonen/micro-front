import { useCallback, useEffect, useState } from "react";

type ThumbCarouselProps = {
  images: string[];
  [key: string]: unknown;
};

const ThumbCarousel = ({ images, ...props }: ThumbCarouselProps) => {
  const [current, setCurrent] = useState(images[0]);
  const [playing, setPlaying] = useState(false);

  const changeImage = useCallback(() => {
    const index = images.indexOf(current);
    if (index === images.length - 1) {
      setCurrent(images[0]);
    } else {
      setCurrent(images[index + 1]);
    }
  }, [current, images]);

  useEffect(() => {
    if (playing) {
      setTimeout(() => {
        changeImage();
      }, 1000);
    }
  }, [changeImage, playing]);

  return (
    <img
      src={
        current
          ? import.meta.env.VITE_FILE_SERVER + current
          : "https://placehold.co/640x400?text=Live+Stream"
      }
      crossOrigin="anonymous"
      onMouseEnter={() => images.length > 0 && setPlaying(true)}
      onMouseLeave={() => setPlaying(false)}
      {...props}
    />
  );
};

export default ThumbCarousel;
