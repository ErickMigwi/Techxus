// store.js
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/apiSlice';
import { ThemeSlice } from '../features/apiSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    theme:ThemeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
});

export default store;
