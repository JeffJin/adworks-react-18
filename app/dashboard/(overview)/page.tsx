'use client';
import { lusitana } from '@/app/ui/fonts';
import { fetchStatsData } from '@/app/lib/services/data';
import { Card } from '@/app/ui/dashboard/cards';
import ActivityChart from '@/app/ui/dashboard/activity-chart';
import LatestUploads from '@/app/ui/dashboard/latest-uploads';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { ActivityChartSkeleton, LatestUploadersSkeleton } from '@/app/ui/common/skeletons';

let userInfoLoaded = false;

export default function Page() {
  const [ statsData, setStatsData ] = useState<Stats | null>(null);
  useEffect(() => {
    if (!userInfoLoaded) {
      userInfoLoaded = true;
      // ✅ Only runs once per app load
      const info = loadDataFromLocalStorage();
      checkAuthToken(info);
    }
  }, []);
  const fetchData = useCallback(async () => {
    const data = await fetchStatsData();
    setStatsData(data);
  }, []);
  useEffect(() => {
    fetchData().catch(console.error);
  }, [ fetchData ]);

  const loadDataFromLocalStorage = (): any => {
    console.log('Loading user data from local storage');
    return { token: '', expires: Date.now(), email: 'jeff@jeffjin.com' };
  };
  const checkAuthToken = (info: any) => {
    console.log('Checking auth token', info);
  };

  return (
    <>
      {statsData && <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Videos" value={statsData.numberOfVideos} type="videos"/>
        <Card title="Pictures" value={statsData.numberOfImages} type="pictures"/>
        <Card title="Collected" value={statsData.numberOfDocuments} type="documents"/>
        <Card
          title="Customers"
          value={statsData.numberOfCustomers}
          type="customers"
        />
      </div>}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<ActivityChartSkeleton/>}>
          <ActivityChart/>
        </Suspense>
        <Suspense fallback={<LatestUploadersSkeleton/>}>
          <LatestUploads/>
        </Suspense>
      </div>
    </>
  );
}

interface Stats {
  numberOfCustomers: number;
  numberOfVideos: number;
  numberOfImages: number;
  numberOfDocuments: number;
}
