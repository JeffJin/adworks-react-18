import { ILoginForm, IUser } from '@/app/lib/models/dtos';
import { adworksApi } from '@/app/store/api/adworks.api';
import { RootState } from '@/app/store/store';
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  user: IUser | null;
  error: string;
}

const initialState: IAuthState = {
  user: null,
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
      state.user = null;
      state.error = '';
    },
    logoutFailure: (state, action: PayloadAction<string>) => {
      state.user = null;
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
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.user != null && !!state.auth.user.token&& state.auth.user.token.length > 0;
export const authReducer = authSlice.reducer;
