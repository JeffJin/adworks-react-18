import SideNav from '@/app/ui/dashboard/sidenav';
import { use } from 'react';

export default function DashboardLayout({
                                          children,
                                          params,
                                        }: {
  children: React.ReactNode,
  params: Promise<{ org: string }>
}) {
  const { org } = use(params);
  return (
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav/>
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      </div>
  );
}
