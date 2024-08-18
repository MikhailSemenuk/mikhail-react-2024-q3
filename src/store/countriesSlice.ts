import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CountriesState {
  countries: string[];
}

const initialState: CountriesState = {
  countries: ['Belarus', 'Poland'], // TODO: etc
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<string[]>) => {
      state.countries = action.payload;
    },
  },
});

export const { setCountries } = countriesSlice.actions;
export default countriesSlice.reducer;
