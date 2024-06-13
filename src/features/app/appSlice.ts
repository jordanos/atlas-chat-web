import { createSlice, Slice } from '@reduxjs/toolkit';

type AppType = {
  ws: null | WebSocket;
  mobileNav: boolean;
  pageLoading: boolean;
  redirectPath: string | null;
  header: {
    title: string;
    subTitle: string;
  };
};

const initialState: AppType = {
  ws: null,
  mobileNav: false,
  pageLoading: true,
  redirectPath: null,
  header: {
    title: '',
    subTitle: '',
  },
};

const appSlice: Slice<AppType> = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleMobileNav: (state) => {
      state.mobileNav = !state.mobileNav;
    },
    setPageLoading: (state, { payload }) => {
      state.pageLoading = payload;
    },
    setRedirect: (state, { payload }) => {
      state.redirectPath = payload.redirectPath;
    },
    setHeader: (state, { payload }) => {
      Object.keys(payload).forEach((key) => {
        state.header[key] = payload[key];
      });
    },
    setWebSocket: (state, { payload }) => {
      state.ws = payload.ws;
    },
  },
});

export const {
  toggleMobileNav,
  setPageLoading,
  setRedirect,
  setHeader,
  setWebSocket,
} = appSlice.actions;
export default appSlice.reducer;
