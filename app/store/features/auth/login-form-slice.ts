import { ILoginForm } from '@/app/lib/models/dtos';
import { RootState } from '@/app/store/store';
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { REHYDRATE } from 'redux-persist';

export enum LoginFormStatus {
  Typing = 'typing',
  Submitting = 'submitting',
  Success = 'success',
  None = '',
}

const initialState: ILoginForm = {
  email: '',
  message: '',
  rememberMe: false,
  status: LoginFormStatus.None,
};

export const loginFormSlice = createSlice({
  name: 'loginForm',
  initialState,
  reducers: {
    initialize: (state) => {

    },
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updateRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload;
    },
    updateMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    resetLoginForm: (state) => {
      state.message = '';
      state.status = LoginFormStatus.None;
      state.email = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state) => {
      if (!state.rememberMe) {
        //state.email = '';
      }
    })
  }
});

export const loginFormActions = loginFormSlice.actions;
export const loginFormReducer = loginFormSlice.reducer;
export const selectLoginFormEmail = (state: RootState) => state.loginForm.email;
