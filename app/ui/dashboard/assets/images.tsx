'use client';
import { fetchLatestImages } from '@/app/lib/data';
import { VisibleImage } from '@/app/lib/dtos';
import { getImageInfo } from '@/app/lib/util';
import { useSearchParams } from 'next/navigation';
import { createRef, RefObject, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

export function Images() {
  const [count, setCount] = useState(10);
  const [imageRefs, setImageRefs] = useState<Array<RefObject<any>>>([]);
  // const searchParams = useSearchParams()
  // const count = searchParams.get('count') || '20';
  const images = useImages(count);
  const visibleImages = useMemo(() => {
    return images.filter((image) => {
      return image.width > 600 && image.height > 400;
    });
  }, [images]);

  useEffect(() => {
    // add or remove refs
    setImageRefs((elRefs) =>
      Array(visibleImages.length)
        .fill(null)
        .map((_, i) => elRefs[i] || createRef()));
  }, [visibleImages.length]);


  const handleImageClick = (imageRef: any) => {
    imageRef.current!.scroll();
  }

  const scrollToTop = () => {
    imageRefs[0]?.current.scroll();
  }

  const scrollToBottom = () => {
    imageRefs[imageRefs.length - 1]?.current.scroll();
  }

  const setImageCount = (c: string) => {
    setCount(parseInt(c));
  }

  const imageContent = visibleImages.map((image, i) => {
    return (
      <li key={image.id}>
        <ImagePreview ref={imageRefs[i]} image={image} handleImageClick={handleImageClick} />
      </li>
    );
  });
  return (
    <div className="images flex-grow">
      <button onClick={scrollToBottom}>Scroll To Bottom</button>
      <input type='number' onBlur={(e) => setImageCount(e.target.value)} />
      <div>
        <ul>
          {imageContent}
        </ul>
      </div>
      <button onClick={scrollToTop}>Scroll To Top</button>
    </div>
  );
}

export function ImagePreview({ref, image, handleImageClick}:
                             { ref: any, image: {id: string, url: string}, handleImageClick: any }) {
  const imgRef = useRef<HTMLImageElement | null>(null);
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
  )
}

export function useImages(count: number): VisibleImage[] {
  const [images, setImages] = useState<VisibleImage[]>([]);
  const fetchImages = useCallback(async (count: number) => {
    let ignore = false;
    const rawImages = await fetchLatestImages(count);
    const newImagePromises = rawImages.map( async (c) =>  {
      try{
        const imgInfo = await getImageInfo(c.url);
        return {
          id: c.id,
          url: c.url,
          title: c.url.split('/').pop(),
          description: imgInfo!.longDesc,
          width: imgInfo!.naturalWidth,
          height: imgInfo!.naturalHeight,
        };
      } catch(err) {
        console.warn(err);
        return {
          id: c.id,
          url: '/images/image-load-failed.png',
          title: 'failed to load',
          description: c.url,
          width: 1000,
          height: 1000,
        };
      }
    });
    console.time('Image Infos loaded');
    const newImages = await Promise.all(newImagePromises);
    console.timeEnd('Image Infos loaded');
    if(!ignore) {
      setImages(newImages);
    }
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    fetchImages(count).catch(console.error);
  },[fetchImages, count]);

  return  images;
}
