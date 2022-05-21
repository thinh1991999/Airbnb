import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  componentShow: null,
  showWarning: false,
  rateData: [],
  reloadRating: false,
};

export const roomDetailSlice = createSlice({
  name: "roomDetail",
  initialState,
  reducers: {
    setComponentShow: (state, action) => {
      console.log(action.payload);
      state.componentShow = action.payload;
    },
    setShowWarning: (state, action) => {
      state.showWarning = action.payload;
    },
    setRateData: (state, action) => {
      state.rateData = action.payload;
    },
    setReloadRating: (state, action) => {
      state.reloadRating = action.payload;
    },
  },
});

export const {
  setComponentShow,
  setShowWarning,
  setRateData,
  setReloadRating,
} = roomDetailSlice.actions;

export default roomDetailSlice.reducer;
