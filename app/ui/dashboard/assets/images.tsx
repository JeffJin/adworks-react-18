'use client';
import { ImagePreview } from '@/app/ui/dashboard/assets/image-preview';
import { useImages, useImageRefs, useDebounce } from '@/app/ui/dashboard/assets/image-hooks';
import { useMemo, useState } from 'react';

export function Images() {
  const [count, setCount] = useState('5');
  const deferredCount = useDebounce(count, 1500);
  const parsedCount = parseInt(deferredCount);
  const images = useImages(isNaN(parsedCount) ? 0 : parsedCount);
  const visibleImages = useMemo(() => {
    return images.filter((image) => {
      return image.width > 600 && image.height > 400;
    });
  }, [images]);

  const imageRefs = useImageRefs(visibleImages.length);

  const handleImageClick = (imageRef: any) => {
    imageRef.current!.scroll();
  }

  const imageContent = visibleImages.map((image, i) => {
    return (
      <li key={image.id}>
        <ImagePreview ref={imageRefs[i]} image={image} handleImageClick={handleImageClick} />
      </li>
    );
  });
  return (
    <>
      <div className="w-full controls justify-center min-w-[200px]">
        <input
          className="max-w-[200px] bg-transparent justify-center placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Type here..."
          type="number"
          value={count}
          onChange={(e) => {
            setCount(e.target.value);
          }}
        />
      </div>
      <div className="images flex-grow">
        <div>
          <ul>
            {imageContent}
          </ul>
        </div>
      </div>
    </>
  );
}

