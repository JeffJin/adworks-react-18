import { ILoginForm } from '@/app/lib/models/dtos';
import { RootState } from '@/app/store/store';
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export enum LoginFormStatus {
  Typing = 'typing',
  Submitting = 'submitting',
  Success = 'success',
  None = '',
}

const initialState: ILoginForm = {
  email: '',
  message: '',
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
    updateMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    resetLoginForm: (state) => {
      state.message = '';
      state.status = LoginFormStatus.None;
      state.email = '';
    },

  },
});

export const loginFormActions = loginFormSlice.actions;
export const loginFormReducer = loginFormSlice.reducer;
export const selectLoginFormEmail = (state: RootState) => state.loginForm.email;
