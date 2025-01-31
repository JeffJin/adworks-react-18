'use client';
import { fetchLatestImages } from '@/app/lib/data';
import { Image } from '@/app/lib/dtos';
import { createRef, useCallback, useEffect, useRef, useState } from 'react';

export function Images() {
  const [imageRefs, setImageRefs] = useState([]);
  const [images, setImages] = useState<any[]>([]);
  const fetchImages = useCallback(async () => {
    const rawImages = await fetchLatestImages(20);
    const newImages: any[] = (rawImages.map(c => {
      return {
        id: c.id,
        url: c.url,
      };
    }));
    setImages(newImages);
  }, []);
  useEffect(() => {
    fetchImages().catch(console.error);
  },[fetchImages]);

  useEffect(() => {
    // add or remove refs
    setImageRefs((elRefs) =>
      Array(images.length)
        .fill(null)
        .map((_, i) => elRefs[i] || createRef()));
  }, [images.length]);

  const handleImageClick = (imageRef: any) => {
    imageRef.current!.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  const imageContent = images.map((image, i) => {

    return (
      <li key={image.id}>
        <img
          src={image.url}
          alt={image.url}
          ref={imageRefs[i]}
          onClick={() => handleImageClick(imageRefs[i])}
        />
      </li>
    );
  });
  return (
    <div className="images flex-grow">
      <p>Images</p>
      <div>
        <ul>
          {imageContent}
        </ul>
      </div>
    </div>
  );
}
