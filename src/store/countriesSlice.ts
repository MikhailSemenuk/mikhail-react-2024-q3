import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { countries as countriesList } from 'countries-list';

export interface CountriesState {
  countries: string[];
}

const initialState: CountriesState = {
  countries: Object.values(countriesList).map((country) => country.name),
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
