import ImagesClient from '@/app/dashboard/images/images-client';
import { Suspense } from 'react';
import { ImageSkeleton } from '@/app/ui/common/skeletons';

export default function Page({
                               params,
                             }: {
  params: Promise<{ category: string }>
}) {
  return (
    <Suspense fallback={<ImageSkeleton/>}>
      <ImagesClient />
    </Suspense>
  )
}
