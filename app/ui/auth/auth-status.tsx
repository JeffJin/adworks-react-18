import { useAppSelector } from '@/app/store/store';
import React from 'react';


const AuthStatus = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.user !== null);
  const email = useAppSelector((state) => state.auth.user?.email);
  return (
    <div className="flex p-20">
      You are now {isAuthenticated ? `Logged  In  as ${email}` : 'Logged Out'}
    </div>
  );
};
export default AuthStatus;
