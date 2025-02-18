'use client';
import {lusitana} from '@/app/ui/fonts';
import {fetchStatsData} from '@/app/lib/services/data';
import {Card} from '@/app/ui/dashboard/cards';
import ActivityChart from "@/app/ui/dashboard/activity-chart";
import LatestUploads from "@/app/ui/dashboard/latest-uploads";
import { Suspense, useCallback, useEffect, useState } from 'react';
import {ActivityChartSkeleton, LatestUploadersSkeleton} from "@/app/ui/common/skeletons";


export default function Page() {

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Public Page
      </h1>
    </main>
  );
}
