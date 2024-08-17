import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormItem } from './types';

export interface FormsState {
  forms: FormItem[];
}

const initialState: FormsState = {
  forms: [],
};

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<FormItem>) => {
      state.forms.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addForm } = formsSlice.actions;

export default formsSlice.reducer;
