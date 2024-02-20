import {configureStore} from '@reduxjs/toolkit';
import { apiSlice, apiSlice2 } from './slices/apiSlice';
import authReducer from './slices/authSlice.js';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [apiSlice2.reducerPath]: apiSlice2.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware()
    .concat(apiSlice.middleware)
    .concat(apiSlice2.middleware),
  devTools: true
});


export default store;