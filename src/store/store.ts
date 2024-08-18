import { configureStore } from '@reduxjs/toolkit';
import formsSlice from './formsSlice';
import countriesReducer from './countriesSlice';

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    savedForm: formsSlice,
    countries: countriesReducer,
  },
});

export default store;
