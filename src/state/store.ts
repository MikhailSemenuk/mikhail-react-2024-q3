import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './slices/cardsSlice';
import { charactersApi } from './slices/charactersApi';

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    [charactersApi.reducerPath]: charactersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(charactersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
