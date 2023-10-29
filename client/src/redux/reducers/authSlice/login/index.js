import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginUsername: "",
  loginPassword: "",
};

const authLoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginUsername: (state, action) => {
      state.loginUsername = action.payload;
    },
    setLoginPassword: (state, action) => {
      state.loginPassword = action.payload;
    },
  },
});

export const { setLoginUsername, setLoginPassword } = authLoginSlice.actions;

export default authLoginSlice.reducer;
