'use client';

import { selectUser } from '@/app/store/auth/auth-slice';
import { useAppSelector } from '@/app/store/hooks/hooks';
import AuthStatus from '@/app/ui/auth/auth-status';
import LoginForm from '@/app/ui/auth/login-form';
import { Logout } from '@/app/ui/auth/logout';

export default function Page() {
  // const user = useAppSelector((state) => state.auth.user);
  const user = useAppSelector(selectUser);
  console.log('login page', user);
  return (
    <>
      <div>
        {user != null ? <Logout/> : <LoginForm/>}
      </div>
      <div>
        <AuthStatus/>
      </div>
    </>
  );
}
