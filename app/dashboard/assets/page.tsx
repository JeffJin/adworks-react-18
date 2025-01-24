import {Suspense} from "react";
import "./assets.scss";
import { VideoSkeleton, ImageSkeleton, DocumentSkeleton } from '@/app/ui/common/skeletons';
import { Documents } from '@/app/ui/dashboard/assets/documents';
import { Videos } from '@/app/ui/dashboard/assets/videos';
import { Images } from '@/app/ui/dashboard/assets/images';

export default async function Page() {
  return (
    <div className="flex flex-col">
      <Suspense fallback={<VideoSkeleton/>}>
        <Videos/>
      </Suspense>
      <Suspense fallback={<ImageSkeleton/>}>
        <Images/>
      </Suspense>
      <Suspense fallback={<DocumentSkeleton/>}>
        <Documents/>
      </Suspense>
    </div>
  )
}
