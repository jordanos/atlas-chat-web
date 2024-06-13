import { createSlice, Slice } from '@reduxjs/toolkit';
import { API_URL } from 'constants/settings';
import { User } from './types';

export const initUser: User = {
  id: 0,
  username: '',
  role: '',
  isAuth: false,
  token: null,
  theme: 'dark',
  lang: 'en',
  apiUrl: API_URL,
};

const userSlice: Slice<User> = createSlice({
  name: 'user',
  initialState: initUser,
  reducers: {
    setAuth: (state, { payload }) => {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    changeLang: (state, { payload }) => {
      state.lang = payload.lang;
    },
    logout: (state) => {
      Object.keys(initUser).forEach((key) => {
        state[key] = initUser[key];
      });
    },
  },
});

export const { setAuth, toggleTheme, logout, changeLang } = userSlice.actions;
export default userSlice.reducer;
