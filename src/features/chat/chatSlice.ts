import { createSlice, Slice } from '@reduxjs/toolkit';
import { Chat } from './types';

export const initChat: Chat = {
  activeRoom: null,
};

const chatSlice: Slice<Chat> = createSlice({
  name: 'chat',
  initialState: initChat,
  reducers: {
    setChat: (state, { payload }) => {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
  },
});

export const { setChat } = chatSlice.actions;
export default chatSlice.reducer;
