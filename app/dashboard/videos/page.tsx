'use client';

import { dashboardActions } from '@/app/store/features/dashboard/dashboard-slice';
import { useAppDispatch, useAppSelector, useAppStore } from '@/app/store/hooks/global';
import { Suspense, use, useRef } from 'react';
import { VideoSkeleton } from '@/app/ui/common/skeletons';
import { VideosList } from '@/app/ui/dashboard/assets/videos-list';

export default function Page({
                               params,
                               searchParams,
                             }: {
  params: Promise<{ category: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  // Initialize the store with the product information
  // const store = useAppStore();
  // const initialized = useRef(false);
  // if (!initialized.current) {
  //   store.dispatch(dashboardActions.initialize());
  //   initialized.current = true;
  // }
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();

  const { category } = use(params);
  const { page = '1', sort = 'asc', query = '' }  = use(searchParams);
  return (
    <div className="flex flex-col">
      <Suspense fallback={<VideoSkeleton/>}>
        <VideosList/>
      </Suspense>
    </div>
  );
}
