import { useFadeIn } from '@/app/ui/common/use-fade-in';
import { useImperativeHandle, useRef } from 'react';

export function ImagePreview({ref, image, handleImageClick}:
                             { ref: any, image: { id: string, url: string }, handleImageClick: any }) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  useFadeIn(imgRef, 1500);
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
      src={image.url}
      alt={image.url}
      ref={imgRef}
      onClick={() => handleImageClick(ref)}
    />
  );
}
