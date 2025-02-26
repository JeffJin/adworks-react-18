'use client';
import { IToken, IUser } from '@/app/lib/models/dtos';
import { useRefreshTokenMutation, useValidateTokenMutation } from '@/app/store/api/adworks.api';
import { authActions, selectCurrentUser } from '@/app/store/features/auth/auth-slice';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks/global';
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
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [ validateToken, validateTask ] = useValidateTokenMutation();
  const [ refreshToken, refreshTask ] = useRefreshTokenMutation();

  const fetchData = useCallback(async () => {
    const data = await fetchStatsData();
    setStatsData(data);
  }, []);
  useEffect(() => {
    fetchData().catch(console.error);
  }, [ fetchData ]);

  const handleValidateToken = async () => {
    if(user) {
      const result = await validateToken({ token: user.token! }).unwrap();
      console.log(result);
    }
  }
  const handleRefreshToken = async () => {
    if(user) {
      const result = await refreshToken().unwrap();
      if(result) {
        dispatch(authActions.tokenReceived(result));
      }
      console.log(result);
    }
  }

  return (
    <>
      <button type="button"
              className="mr-5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
        onClick={handleValidateToken}>Validate Token</button>
      <button type="button"
              className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
        onClick={handleRefreshToken}>Refresh Token</button>
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
