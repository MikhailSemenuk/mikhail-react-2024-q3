import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormItem } from '../types';

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
      action.payload.files = undefined; // clear file, all data save in fileBase64
      state.forms.push(action.payload);
    },
  },
});

export const { addForm } = formsSlice.actions;

export default formsSlice.reducer;
