import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerNamesurname: "",
  registerUsername: "",
  registerPassword: "",
  registerPasswordAgain: "",
};

const authRegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegisterNamesurname: (state, action) => {
      state.registerNamesurname = action.payload;
    },
    setRegisterUsername: (state, action) => {
      state.registerUsername = action.payload;
    },
    setRegisterPassword: (state, action) => {
      state.registerPassword = action.payload;
    },
    setRegisterPasswordAgain: (state, action) => {
      state.registerPasswordAgain = action.payload;
    },
  },
});

export const {
  setRegisterNamesurname,
  setRegisterUsername,
  setRegisterPassword,
  setRegisterPasswordAgain,
} = authRegisterSlice.actions;

export default authRegisterSlice.reducer;
