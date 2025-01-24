import {Suspense} from "react";
import {
  ActivityChartSkeleton,
  CardsSkeleton,
  LatestUploadersSkeleton,
} from "@/app/ui/common/skeletons";
import {fetchLatestVideos, fetchLatestImages, fetchLatestDocuments} from "@/app/lib/data";
import "./assets.scss";
import Videos from "@/app/ui/dashboard/assets/videos";
import Images from "@/app/ui/dashboard/assets/images";
import Documents from "@/app/ui/dashboard/assets/documents";


export default async function Page() {
  const documents = await fetchLatestDocuments();
  return (
    <div className="flex flex-col">
      <Suspense fallback={<CardsSkeleton/>}>
        <Videos/>
      </Suspense>
      <Suspense fallback={<LatestUploadersSkeleton/>}>
        <Images/>
      </Suspense>
      <Suspense fallback={<ActivityChartSkeleton/>}>
        <Documents/>
      </Suspense>
    </div>
  )
}
