import { IUser } from '@/app/lib/models/dtos';
import { RootState } from '@/app/store/store';
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  user: IUser | null;
}

const initialState: IAuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const authActions = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.user != null && !!state.auth.user.token&& state.auth.user.token.length > 0;
export const authReducer = authSlice.reducer;
