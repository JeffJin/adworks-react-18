import { fetchLatestImages } from '@/app/lib/services/data';
import { VisibleImage } from '@/app/lib/models/dtos';
import { getImageInfo } from '@/app/lib/utils/image-utils';
import { createRef, RefObject, useCallback, useEffect, useState } from 'react';

export function useImages(count: number): VisibleImage[] {
  console.log('useImages hook gets called', count);
  const [images, setImages] = useState<VisibleImage[]>([]);
  const fetchImages = useCallback(async (count: number) => {
    console.log('fetchImages api gets called', count);
    let ignore = false;
    const rawImages = await fetchLatestImages(count);
    const newImagePromises = rawImages.map(async (c) => {
      try {
        const imgInfo = await getImageInfo(c.url);
        return {
          id: c.id,
          url: c.url,
          title: c.url.split('/').pop(),
          description: imgInfo!.longDesc,
          width: imgInfo!.naturalWidth,
          height: imgInfo!.naturalHeight,
        };
      } catch (err) {
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
    const newImages = await Promise.all(newImagePromises);
    if (!ignore) {
      setImages(newImages);
    }
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if(count > 0) {
      fetchImages(count).catch(console.error);
    }
  }, [fetchImages, count]);

  return images;
}


export const useImageRefs = (size: number) => {
  const [imageRefs, setImageRefs] = useState<Array<RefObject<any>>>([]);
  useEffect(() => {
    // add or remove refs
    setImageRefs((elRefs) =>
      Array(size)
        .fill(null)
        .map((_, i) => elRefs[i] || createRef()));
  }, [size]);
  return imageRefs;
}


export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
