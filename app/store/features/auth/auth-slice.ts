import { ILoginForm, IToken, IUser } from '@/app/lib/models/dtos';
import { DEFAULT_AVATAR } from '@/app/lib/settings';
import { adworksApi } from '@/app/store/api/adworks.api';
import { RootState } from '@/app/store/store';
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  user: IUser;
  error: string;
}

const DEFAULT_USER = {
  email: '',
  userName: '',
  phoneNumber: '',
  profileLogo: DEFAULT_AVATAR,
  token: '',

}

const initialState: IAuthState = {
  user: DEFAULT_USER,
  error: '',
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    logoutSuccess: (state) => {
      state.user = DEFAULT_USER;
      state.error = '';
    },
    tokenReceived: (state, action: PayloadAction<IToken>) => {
      if(!state.user) {
        console.error('invalid user state to refresh token');
      } else {
        state.user!.token = action.payload.token;
      }
    },
    logoutFailure: (state, action: PayloadAction<string>) => {
      state.user = DEFAULT_USER;
      state.error = action.payload;
    },
    resetPasswordSuccess: (state) => {
    },
    resetPasswordFailure: (state) => {
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      adworksApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        // state.user = payload.user
      },
    )
  },
});

export const authActions = authSlice.actions;
export const selectCurrentUser = (state: RootState) => {
  return state.auth.user;
}
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.user != null &&
  !!state.auth.user.token &&
  state.auth.user.token.length > 0;
export const authReducer = authSlice.reducer;
