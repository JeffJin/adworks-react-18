'use client';
import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { Customer, fetchActivities, fetchLatestUploaders } from '@/app/lib/data';
import { useCallback, useEffect, useState } from 'react';

// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default function ActivityChart() {
  const [activities, setActivities] = useState<Array<{month: string, activities: number}>>([]);
  const getActivities = useCallback(async () => {
    const data = await fetchActivities();
    setActivities(data);
  }, [])
  useEffect(() => {
    getActivities().catch(console.error);
  },[getActivities]);

  const chartHeight = 350;
  if (!activities || activities.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
  const { yAxisLabels, topLabel } = generateYAxis(activities);
  console.log('ActivityChart', yAxisLabels, topLabel, activities);

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Activities
      </h2>
      {<div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {activities.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * month.activities}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>}
    </div>
  );
}
