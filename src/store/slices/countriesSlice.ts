import { createSlice } from '@reduxjs/toolkit';
import { Country } from '../../types/country';

type CountriesState = {
  savedCountries: Country[];
};

const initialState: CountriesState = {
  savedCountries: [],
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    addCountry: (state, action) => {
      state.savedCountries.push(action.payload);
    },

    removeCountry: (state, action) => {
      state.savedCountries = state.savedCountries.filter(country => country.name.official !== action.payload.name.official);
    },
  },
});

export const { addCountry, removeCountry } = countriesSlice.actions;
export default countriesSlice.reducer;
