import loginService from '@/app/lib/login-service';
import { logout, selectUser } from '@/app/store/auth/auth-slice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function Logout(){
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  async function handleLogout(e: any){
    e.preventDefault();
    await loginService.logout();
    dispatch(logout());
  };
  return (
    <div className="logout">
      <h1>
        Welcome <span className="user_name">{user?.userName}</span>
      </h1>{""}
      <button className="logout_button" onClick={(e) => handleLogout(e)}>
        Logout
      </button>
    </div>
  );
};
