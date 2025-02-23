'use client';
import { Checkbox } from '@/app/(public)/(auth)/login/checkbox';
import { IUser } from '@/app/lib/models/dtos';
import { useLoginEmailStore, useLoginRememberMeStore } from '@/app/lib/services/use-login-form-store';
import { validateEmail, validatePassword } from '@/app/lib/utils/validators';
import { useLoginMutation } from '@/app/store/api/adworks.api';
import { authActions } from '@/app/store/features/auth/auth-slice';
import { useAppDispatch } from '@/app/store/hooks/global';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [ login, { isLoading, isError, isSuccess, data } ] = useLoginMutation();
  const [ localEmail, setLocalEmail ] = useLoginEmailStore();
  const [ localRememberMe, setLocalRememberMe ] = useLoginRememberMeStore();
  const [ email, setEmail ] = useState('');
  const [ rememberMe, setRememberMe ] = useState(false);
  const [ password, setPassword ] = useState('');
  const [ hasError, setHasError ] = useState(false);

  useEffect(() => {
    if (localRememberMe == 'true') {
      setEmail(localEmail);
      setRememberMe(true);
    }
  }, [ localEmail, localRememberMe ]);

  useEffect(() => {
    setHasError(isError);
  }, [isError]);

  const handleLogin = async (event: any) => {
    event.preventDefault();
    if (rememberMe) {
      setLocalRememberMe('true');
      setLocalEmail(email);
    }
    try {
      const user: IUser = await login({ email, password }).unwrap();
      dispatch(authActions.loginSuccess(user));
      router.push('/dashboard');
    } catch (error) {
      // handle login error
      console.error(error);
    }
  };

  const handleEmailUpdate = (event: any) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handleRememberMe = (event: any) => {
    const val = event.target.checked;
    setRememberMe(val);
  };

  const handlePasswordUpdate = (event: any) => {
    event.preventDefault();
    setPassword(event.target.value);
  };
  const isFormValid = () => validateEmail(email) && validatePassword(password);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="/images/eWorks_logos_line_secondary_dark_font.png"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
        </div>
        {hasError ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold block">Login failed! </strong>
            <span className="block sm:inline">please try again later.</span>
            <button onClick={() => setHasError(false)} type="button">
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 20 20"><title>Close</title><path
                    d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
            </button>
          </div>
        ) : null}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  disabled={isLoading}
                  onChange={handleEmailUpdate}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  disabled={isLoading}
                  onChange={(e) => handlePasswordUpdate(e)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Checkbox isChecked={rememberMe} label={'Remember me'} checkHandler={handleRememberMe} id={'rememberMe'}>
              </Checkbox>
              <div className="text-sm/6">
                <Link href="/forgot-password" className="font-semibold text-indigo-400 hover:text-indigo-300">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={!isFormValid() || isLoading}
                className={clsx('flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500',
                  {
                    'bg-indigo-500 text-white hover:bg-indigo-400': isFormValid(),
                    'cursor-not-allowed text-white bg-indigo-400': !isFormValid(),
                  })}
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Not a member?{' '}
            <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>

  );
}
