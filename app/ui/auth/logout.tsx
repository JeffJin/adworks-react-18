import loginService from '@/app/lib/services/login-service';
import { selectUser } from '@/app/store/auth/auth-slice';
import { resetLoginForm } from '@/app/store/auth/login-form-slice';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks/hooks';
import { logoutAction, submitLoginFormAction } from '@/app/ui/auth/auth-thunks';
import React from 'react';

export function Logout(){
  const user = useAppSelector(selectUser);
  console.log('logout', user);
  const dispatch = useAppDispatch();

  return (
    <div className="logout">
      <h1>
        Welcome <span className="user_name">{user?.userName}</span>
      </h1>{""}
      <button className="logout_button" onClick={(e) => dispatch(logoutAction(e))}>
        Logout
      </button>
    </div>
  );
};
