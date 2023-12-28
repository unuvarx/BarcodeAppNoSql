import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "@/lib/cookie";
import { setData } from "@/redux/reducers/barcodeInputSlice/[index]";

const initialState = {
  userInfo: {},
  numberOfDaysRemaining: 0,
  numberOfTimesRemaining: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setNumberOfDaysRemaining: (state, action) => {
      state.numberOfDaysRemaining = action.payload;
    },
    setNumberOfTimesRemaining: (state, action) => {
      
      state.numberOfTimesRemaining = action.payload;
    },
  },
});

export const { setUserInfo, setNumberOfDaysRemaining, setNumberOfTimesRemaining } = userSlice.actions;

export const getUser = () => async (dispatch) => {
  try {
    const token = getCookie("key");
    const res = await axios.get(`http://localhost:8800/api/user/${token}`);
    dispatch(setUserInfo(res.data));
    const remainingUsageTime = new Date(res.data.remainingUsageTime);
    const currentDate = new Date();
    const timesDifference = remainingUsageTime.getTime() - currentDate.getTime();
    const daysDifference = Math.floor(timesDifference / (1000 * 60 * 60 * 24));
    

    dispatch(setNumberOfDaysRemaining(daysDifference));
    dispatch(setNumberOfTimesRemaining(timesDifference));
    
  } catch (error) {
    console.warn(error);
  }
};

export const formatDate = (date) => {
  const rawDateFromDatabase = date;
  const dateObject = new Date(rawDateFromDatabase);

  const optionsDate = { day: "numeric", month: "numeric", year: "numeric" };
  const optionsTime = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const formattedDate = dateObject.toLocaleDateString("tr-TR", optionsDate);
  const formattedTime = dateObject.toLocaleTimeString("tr-TR", optionsTime);

  return formattedDate + " - " + formattedTime;
};

export default userSlice.reducer;
