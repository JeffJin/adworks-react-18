import { ILoginForm } from '@/app/lib/dtos';
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export enum LoginFormStatus {
  Typing = 'typing',
  Submitting = 'submitting',
  Submitted = 'submitted',
  Reset = 'reset',
  Success = 'success',
  None = '',
}

const initialState: ILoginForm = {
  email: '',
  password: '',
  message: '',
  status: LoginFormStatus.None,
};

export const loginFormSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    submitForm: (state) => {
      state.status = LoginFormStatus.Submitting;
      state.message = '';
    },
    updateStatus: (state, action: PayloadAction<LoginFormStatus>) => {
      state.status = action.payload;
    },
    updateError: (state, action: PayloadAction<{status: LoginFormStatus, message: string}>) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updatePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    updateMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },

  },
});

export const {
  updateEmail,
  updateStatus,
  updateError,
  updatePassword,
  updateMessage,
  submitForm,
} = loginFormSlice.actions;
export const loginFormReducer = loginFormSlice.reducer;
