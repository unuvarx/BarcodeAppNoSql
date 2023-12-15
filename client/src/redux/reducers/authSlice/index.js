import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  namesurname: "",
  mail: "",
  username: "",
  password: "",
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setNamesurname: (state, action) => {
      state.namesurname = action.payload;
    },
    setMail: (state, action) => {
      state.mail = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    }
  },
});

export const { setNamesurname, setMail, setUsername, setPassword, setIsAuth } =
  authSlice.actions;

export default authSlice.reducer;
