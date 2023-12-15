import { configureStore } from '@reduxjs/toolkit';
import barcodeInputsReducer from '@/redux/reducers/barcodeInputSlice';
import authReducer from '@/redux/reducers/authSlice'

const store = configureStore({
  reducer: {
    barcodeInputs: barcodeInputsReducer,
    auth: authReducer,
  },
});

export default store;
