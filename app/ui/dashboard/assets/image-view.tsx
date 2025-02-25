import { IImage } from '@/app/lib/models/dtos';
import { useFadeIn } from '@/app/ui/common/use-fade-in';
import { useImperativeHandle, useRef } from 'react';

export function ImageView({ref, image, handleImageClick}:
                             { ref: any, image: IImage, handleImageClick: any }) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  useFadeIn(imgRef, 1000);
  useImperativeHandle(ref, () => ({
    // Only expose focus and nothing else
    scroll() {
      imgRef.current!.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    },
  }));
  return (
    <img
      src={image.cloudUrl}
      alt={image.cloudUrl}
      ref={imgRef}
      className="pointer-events-none aspect-10/7 object-cover group-hover:opacity-75"
      onClick={() => handleImageClick(ref)}
    />
  );
}
