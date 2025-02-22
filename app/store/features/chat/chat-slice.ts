import { IUser } from '@/app/lib/models/dtos';
import { RootState } from '@/app/store/store';
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IChatState {
  user: IUser | null;
  messages: string[];
}

const initialState: IChatState = {
  user: null,
  messages: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    newMessage: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    initializeChat: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    endChat: (state) => {
      state.user = null;
    },
  },
});

export const chatActions = chatSlice.actions;
export const selectChatUser = (state: RootState) => state.chat.user;
export const chatReducer = chatSlice.reducer;
