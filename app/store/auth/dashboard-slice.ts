import { IImage, IUser, IVideo } from '@/app/lib/models/dtos';
import { RootState } from '@/app/store/store';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IDashboardState {
  user: IUser | null;
  assets: {
    videos: IVideo[];
    images: IImage[];
  };
}

const initialState: IDashboardState = {
  user: null,
  assets: {
    videos: [],
    images: [],
  }
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    initialize: (state) => {
      //TODO load user info from local storage
      return { ...initialState, user: state.user };
    },
  },
});

export const dashboardActions = dashboardSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.user != null && !!state.auth.user.token && state.auth.user.token.length > 0;
export const dashboardReducer = dashboardSlice.reducer;
