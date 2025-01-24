import {lusitana} from '@/app/ui/fonts';
import {fetchStatsData} from '@/app/lib/data';
import {Card} from '@/app/ui/dashboard/cards';
import ActivityChart from "@/app/ui/dashboard/activity-chart";
import LatestUploads from "@/app/ui/dashboard/latest-uploads";
import {Suspense} from "react";
import {ActivityChartSkeleton, LatestUploadersSkeleton} from "@/app/ui/common/skeletons";

export default async function Page() {
  const {
    numberOfCustomers,
    numberOfVideos,
    numberOfImages,
    numberOfDocuments,
  } = await fetchStatsData();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Videos" value={numberOfVideos} type="videos"/>
        <Card title="Pictures" value={numberOfImages} type="pictures"/>
        <Card title="Collected" value={numberOfDocuments} type="documents"/>
        <Card
          title="Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<ActivityChartSkeleton/>}>
          <ActivityChart/>
        </Suspense>
        <Suspense fallback={<LatestUploadersSkeleton/>}>
          <LatestUploads/>
        </Suspense>
      </div>
    </main>
  );
}
