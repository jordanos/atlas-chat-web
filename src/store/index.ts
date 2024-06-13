import { configureStore } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { DEBUG } from 'constants/settings';
import appReducer from 'features/app/appSlice';
import userReducer from 'features/auth/userSlice';
import chatReducer from 'features/chat/chatSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { apiSlice } from './api/apiSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store: ToolkitStore = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: persistedUserReducer,
    app: appReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    );
  },
  devTools: DEBUG,
});

export const persistor = persistStore(store);
