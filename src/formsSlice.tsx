import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SavedForm } from './types';

export interface FormsState {
  forms: SavedForm[];
}

const initialState: FormsState = {
  forms: [],
};

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<SavedForm>) => {
      state.forms.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addForm } = formsSlice.actions;

export default formsSlice.reducer;
