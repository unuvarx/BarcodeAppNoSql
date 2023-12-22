import {
  configureStore, 

} from '@reduxjs/toolkit';
import barcodeInputsReducer from '@/redux/reducers/barcodeInputSlice/[index]';
import userReducer from "@/redux/reducers/userSlice/[index]";




const store = configureStore({
  reducer: {
    barcodeInputs: barcodeInputsReducer,
  
    user: userReducer,
  },
  
});

export default store;