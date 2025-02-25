'use client'
import { usePullToRefresh } from '@/app/lib/hooks/use-pull-to-refresh';
import { IVideo } from '@/app/lib/models/dtos';
import { useGetVideosQuery } from '@/app/store/api/adworks.api';
import LoadingAssets from '@/app/ui/common/loading-assets';
import LoadingWarning from '@/app/ui/common/loading-warning';
import { VideoList } from '@/app/ui/dashboard/assets/video-list';
import { warnings } from '@/app/ui/messages/errors';
import { useRef } from 'react';

export default function VideosClient() {
  const { data = [], error, isLoading, refetch } = useGetVideosQuery({
      pageIndex: 0, pageSize: 10, category: ''
    }, {
      selectFromResult: (data) =>
        data ?? []
    });
  const containerRef = useRef<HTMLDivElement | null>(null);
  usePullToRefresh(containerRef, () => {
    refetch();
  });

  return (
    <div className="images flex-grow" ref={containerRef}>
      { error ? (
        <LoadingWarning title={warnings.loading.title} description={warnings.loading.description} />
      ) : isLoading ? (
        <LoadingAssets />
      ) : data ? (
        <ul>
          <VideoList videos={data as IVideo[]} />
        </ul>
      ) : null }
    </div>
  )
}
