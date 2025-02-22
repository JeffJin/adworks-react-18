'use client';
import { IUser } from '@/app/lib/models/dtos';
import { useLoginMutation } from '@/app/lib/services/adworks.api';
import { authActions, selectCurrentUser } from '@/app/store/features/auth/auth-slice';
import { loginFormActions, selectLoginFormEmail } from '@/app/store/features/auth/login-form-slice';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks/global';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [ login, { isLoading, isError, isSuccess, data } ] = useLoginMutation();
  const [ password, setPassword ] = useState('');
  const email = useAppSelector(selectLoginFormEmail);

  const handleLogin = async (event: any) => {
    event.preventDefault();
    try {
      const user: IUser = await login({ email, password }).unwrap();
      dispatch(authActions.loginSuccess(user))
      router.push('/dashboard');
    } catch (error) {
      // handle login error
      console.error(error);
    }
  };

  const handleEmailUpdate = (event: any) => {
    event.preventDefault();
    dispatch(loginFormActions.updateEmail(event.target.value));
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email"
             name="email"
             placeholder="Email"
             value={email}
             onChange={(e) => handleEmailUpdate(e)}
             required/>
      <input type="password"
             name="password"
             placeholder="Password"
             onChange={(e) => setPassword(e.target.value)}
             required/>
      <button type="submit">Login</button>
    </form>
  );
}
