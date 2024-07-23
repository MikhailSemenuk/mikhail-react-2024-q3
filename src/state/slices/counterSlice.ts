import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1; // Some magic here 🪄
    },
    decrement: (state) => {
      state.value -= 1; // Some magic here 🪄
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
