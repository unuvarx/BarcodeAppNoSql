import { configureStore } from '@reduxjs/toolkit';
import barcodeInputsReducer from '@/redux/reducers/barcodeInputSlice';

const store = configureStore({
  reducer: {
    barcodeInputs: barcodeInputsReducer,
    // Diğer Slice'larınızı burada ekleyin (eğer varsa)
  },
});

export default store;
