import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../types';

export interface CardsState {
  selectedCards: Character[];
}

const initialState: CardsState = {
  selectedCards: [],
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    deselectAllCards: (state) => {
      state.selectedCards = [];
    },
    toggleCard: (state, action: PayloadAction<Character>) => {
      const index = state.selectedCards.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.selectedCards.splice(index, 1);
      } else {
        state.selectedCards.push(action.payload);
      }
    },
  },
});

export const { deselectAllCards, toggleCard } = cardsSlice.actions;
export default cardsSlice.reducer;
