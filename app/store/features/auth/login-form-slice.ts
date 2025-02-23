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
