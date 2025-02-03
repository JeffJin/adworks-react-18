import { IUser } from '@/app/lib/dtos';
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  user: IUser | null;
  isAdmin: boolean;
}

const initialState: IAuthState = {
  user: null,
  isAdmin: false,
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

export const {
  login,
  logout
} = authSlice.actions;
export const selectUser = (state: IAuthState) => state.user;
export const authReducer = authSlice.reducer;
