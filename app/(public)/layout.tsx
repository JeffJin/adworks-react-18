import SideNav from '@/app/ui/dashboard/sidenav';

export default function DashboardLayout({
                                          children
                                        }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
     {children}
    </div>
  );
}
