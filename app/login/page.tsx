'use client';

import { useAppSelector } from '@/app/store/store';
import AuthStatus from '@/app/ui/auth/auth-status';
import LoginForm from '@/app/ui/auth/login-form';
import { Logout } from '@/app/ui/auth/logout';
import { useState } from 'react';

export default function Page() {
  const user = useAppSelector((state) => state.auth.user);
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
