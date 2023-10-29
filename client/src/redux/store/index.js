import { configureStore } from '@reduxjs/toolkit';
import barcodeInputsReducer from '@/redux/reducers/barcodeInputSlice';
import authRegisterReducer from "@/redux/reducers/authSlice/register";
import authLoginReducer from "@/redux/reducers/authSlice/login";

const store = configureStore({
  reducer: {
    barcodeInputs: barcodeInputsReducer,
    register: authRegisterReducer,
    login: authLoginReducer,
  },
});

export default store;
