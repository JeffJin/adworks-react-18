'use client';
import { IUser } from '@/app/lib/models/dtos';
import { useValidateTokenMutation } from '@/app/store/api/adworks.api';
import { selectCurrentUser } from '@/app/store/features/auth/auth-slice';
import { useAppSelector } from '@/app/store/hooks/global';
import SideNav from '@/app/ui/dashboard/sidenav';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({
                                          children
                                        }: {
  children: React.ReactNode
}) {
  const user = useAppSelector(selectCurrentUser);
  const router = useRouter();
  const [ validateToken, { isLoading, isError, isSuccess, data }  ] = useValidateTokenMutation();

  useEffect(() => {
    const validate = async (u: IUser) => {
      if(!u.token || !u.token.length) {
        router.push('/login');
      } else {
        const result = await validateToken({ token: u.token }).unwrap();
        if(!result) {
          router.push('/login');
        }
      }
    }
    validate(user).catch(console.error);
  }, [user]);


  return (
    <div>
      <SideNav>
        {children}
      </SideNav>
    </div>
  );
}
