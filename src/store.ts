import { configureStore } from '@reduxjs/toolkit';
import formsSlice from './formsSlice';

export default configureStore({
  reducer: {
    savedForm: formsSlice,
  },
});
