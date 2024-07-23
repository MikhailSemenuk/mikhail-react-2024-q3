import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import cardsReducer from './slices/cardsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cards: cardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
