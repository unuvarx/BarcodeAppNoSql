import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "@/lib/cookie";
import { setData } from "@/redux/reducers/barcodeInputSlice/[index]";

const initialState = {
  userInfo: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserInfo } = userSlice.actions;


export const getUser = () => async (dispatch) => {
    try {
      const token = getCookie("key");
  
      const res = await axios.get(`http://localhost:8800/api/user/${token}`);
      dispatch(setUserInfo(res.data));
      
      
    } catch (error) {
      console.warn(error);
    }
  };
  
  

export default userSlice.reducer;
