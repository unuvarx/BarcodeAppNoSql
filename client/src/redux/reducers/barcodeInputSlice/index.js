import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  barcode: "",
  paid: "",
  cost: 0,
  changeMoney: 0,
};

const barcodeInputsSlice = createSlice({
  name: "barcodeInputs",
  initialState,
  reducers: {
    setBarcode: (state, action) => {
      state.barcode = action.payload;
    },
    setPaid: (state, action) => {
      state.paid = action.payload;
    },
    setCost: (state, action) => {
      state.cost = action.payload;
    },
    setChangeMoney: (state, action) => {
      state.changeMoney = action.payload;
    },
  },
});

export const { setBarcode, setPaid, setCost, setChangeMoney } =
  barcodeInputsSlice.actions;

export default barcodeInputsSlice.reducer;
