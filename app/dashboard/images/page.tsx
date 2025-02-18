'use client';

import { Suspense, useEffect, useState } from 'react';
import "./images.scss";
import { ImageSkeleton } from '@/app/ui/common/skeletons';
import { Images } from '@/app/ui/dashboard/assets/images';

export default function Page({
                               params,
                             }: {
  params: Promise<{ category: string }>
}) {
  const [category, setCategory] = useState<string>();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const category = (await params).category;
        setCategory(category);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCategory();
  }, []);

  return (
    <div className="flex flex-col">
      <Suspense fallback={<ImageSkeleton/>}>
        <Images/>
      </Suspense>
    </div>
  )
}
