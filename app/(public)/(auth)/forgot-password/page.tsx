'use client';
import { IUser } from '@/app/lib/models/dtos';
import { useLoginMutation, useResetPasswordMutation } from '@/app/store/api/adworks.api';
import { authActions, selectCurrentUser } from '@/app/store/features/auth/auth-slice';
import { loginFormActions, selectLoginFormEmail } from '@/app/store/features/auth/login-form-slice';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks/global';
import Link from 'next/link';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [ resetPassword, { isLoading, isError, isSuccess, data } ] = useResetPasswordMutation();
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const { email, code } = useParams<{ email: string, code: string}>();

  const handleResetPassword = async (event: any) => {
    event.preventDefault();
    try {
      await resetPassword({ email, password, confirmPassword, code }).unwrap();
      dispatch(authActions.resetPasswordSuccess());
      router.push('/login');
    } catch (error) {
      // handle login error
      console.error(error);
      dispatch(authActions.resetPasswordFailure());
    }
  };

  const handleEmailUpdate = (event: any) => {
    event.preventDefault();
    dispatch(loginFormActions.updateEmail(event.target.value));
  };

  return (
    <></>
  );
}
