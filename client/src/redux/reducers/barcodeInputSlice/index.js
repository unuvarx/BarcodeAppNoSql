import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  barcode: "",
  paid: "",
  cost: 0,
  changeMoney: 0,
  
  data: [
    {
      id: "asfasfrg1234343425",
      barcode: "1234567891234567",
      product: "EKMEK",
      price: "7.50",
      amount: 1,
    },
    {
      id: "asf23442343242343",
      barcode: "1234567891234567",
      product: "SU",
      price: "4.50",
      amount: 1,
    },
    {
      id: "as56546242343",
      barcode: "1234567891234567",
      product: "ETİ KARAM",
      price: "9.50",
      amount: 1,
    },
    {
      id: "62342134231465sdfgsd",
      barcode: "1234567891234567",
      product: "SİMİT",
      price: "1.50",
      amount: 1,
    },
  ],
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
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setBarcode, setPaid, setCost, setChangeMoney, setData } =
  barcodeInputsSlice.actions;

export default barcodeInputsSlice.reducer;
