import {Suspense} from "react";
import { VideoSkeleton } from '@/app/ui/common/skeletons';
import { Videos } from '@/app/ui/dashboard/assets/videos';

export default function Page() {
  return (
    <div className="flex flex-col">
      <Suspense fallback={<VideoSkeleton/>}>
        <Videos/>
      </Suspense>
    </div>
  )
}
