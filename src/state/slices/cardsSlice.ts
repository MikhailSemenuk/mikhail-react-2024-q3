import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CardsState {
  selectedCards: number[];
}

const initialState: CardsState = {
  selectedCards: [],
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    selectCard: (state, action: PayloadAction<number>) => {
      if (!state.selectedCards.includes(action.payload)) {
        state.selectedCards.push(action.payload);
      }
    },
    deselectCard: (state, action: PayloadAction<number>) => {
      state.selectedCards = state.selectedCards.filter((id) => id !== action.payload);
    },
    deselectAllCards: (state) => {
      state.selectedCards = [];
    },
    toggleCard: (state, action: PayloadAction<number>) => {
      if (state.selectedCards.includes(action.payload)) {
        state.selectedCards = state.selectedCards.filter((id) => id !== action.payload);
      } else {
        state.selectedCards.push(action.payload);
      }
    },
  },
});

export const { selectCard, deselectCard, deselectAllCards, toggleCard } = cardsSlice.actions;
export default cardsSlice.reducer;
