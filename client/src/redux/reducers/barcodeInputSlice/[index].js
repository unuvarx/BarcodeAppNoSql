import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useRef } from "react";

const initialState = {
  barcode: "",
  paid: 0,
  cost: 0,
  changeMoney: 0,
  data: [],
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
    addData: (state, action) => {
      state.data.push(action.payload);
    }
  },
});

export const { setBarcode, setPaid, setCost, setChangeMoney, setData, addData } =
  barcodeInputsSlice.actions;


export default barcodeInputsSlice.reducer;
