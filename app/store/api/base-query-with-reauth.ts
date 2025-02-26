import { IToken } from '@/app/lib/models/dtos';
import { RootState } from '@/app/store/store';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { authActions } from '../features/auth/auth-slice';
import { Mutex } from 'async-mutex';


export const baseServiceApi =  process.env.NODE_ENV !== "production"
  ? 'http://localhost:5000/api/' : 'https://10.0.0.102:5000/api/';
// create a new mutex
const mutex = new Mutex();

export const baseQuery = fetchBaseQuery({
  baseUrl: baseServiceApi,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState)?.auth?.user?.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers;
  },
});
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          {
            url: '/account/refresh_token',
            method: 'POST',
          },
          api,
          extraOptions,
        );
        if (refreshResult.data) {
          api.dispatch(authActions.tokenReceived(refreshResult.data as IToken));
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(authActions.logoutSuccess());
          if(window) {
            window.location.href = '/login';
          }
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
export default baseQueryWithReauth;
