import VideosClient from '@/app/dashboard/videos/videos-client';
import { VideoSkeleton } from '@/app/ui/common/skeletons';
import { Suspense } from 'react';

export default function Page() {
  return (
    <div className="flex flex-col">
      <Suspense fallback={<VideoSkeleton/>}>
        <VideosClient />
      </Suspense>
    </div>
  );
}
