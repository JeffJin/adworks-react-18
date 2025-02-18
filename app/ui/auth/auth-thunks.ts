import loginService from '@/app/lib/services/login-service';
import { authActions } from '@/app/store/auth/auth-slice';
import {
  LoginFormStatus,
  resetLoginForm,
  submitForm,
  updateError,
  updateMessage,
  updateStatus
} from '@/app/store/auth/login-form-slice';
import { AppDispatch, RootState } from '@/app/store/store';
import { createAsyncThunk } from '@reduxjs/toolkit';

// export function submitLoginFormAsync(email: string, password: string): any {
//   return createAsyncThunk()
// }

export function submitLoginFormAction(email: string, password: string): any {

  return async (dispatch: AppDispatch, getState: () => RootState, extraArgument: any) => {
    const { serviceBaseApi } = extraArgument;
    console.debug('submitLoginFormAction dispatched', serviceBaseApi);

    dispatch(submitForm());
    try {
      const {status, msg, user} = await loginService.login(email, password);
      if(status == 200){
        dispatch(updateStatus(LoginFormStatus.Success));
        dispatch(authActions.login(user));
      } else {
        dispatch(updateStatus(LoginFormStatus.None));
      }
      dispatch(updateMessage(msg));
    } catch(err: any) {
      dispatch(updateError({
        message: err.msg,
        status: LoginFormStatus.None
      }));
    }
  }
}

export function logoutAction(e: any): any {
  return async (dispatch: AppDispatch, getState: () => RootState, extraArgument: any) => {
    const { serviceBaseApi } = extraArgument;
    console.debug('logoutAction dispatched', serviceBaseApi);
    e.preventDefault();
    await loginService.logout();
    dispatch(authActions.logout());
    dispatch(resetLoginForm());
  };
}


