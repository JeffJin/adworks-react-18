import SideNav from '@/app/ui/dashboard/sidenav';

export default function DashboardLayout({
                                          children
                                        }: {
  children: React.ReactNode
}) {

  return (
    <div>
      <SideNav>
        {children}
      </SideNav>
    </div>
  );
}
