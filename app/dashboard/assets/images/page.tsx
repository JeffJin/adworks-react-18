'use client';

import {Suspense} from "react";
import "./images.scss";
import { ImageSkeleton } from '@/app/ui/common/skeletons';
import { Images } from '@/app/ui/dashboard/assets/images';

export default function Page() {
  return (
    <div className="flex flex-col">
      <Suspense fallback={<ImageSkeleton/>}>
        <Images/>
      </Suspense>
    </div>
  )
}
