import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rateData: [],
  reloadRating: false,
  showBookTicketMB: false,
};

export const roomDetailSlice = createSlice({
  name: "roomDetail",
  initialState,
  reducers: {
    setRateData: (state, action) => {
      state.rateData = action.payload;
    },
    setReloadRating: (state, action) => {
      state.reloadRating = action.payload;
    },
    setShowBookTicketMB: (state, action) => {
      state.showBookTicketMB = action.payload;
    },
  },
});

export const { setRateData, setReloadRating, setShowBookTicketMB } =
  roomDetailSlice.actions;

export default roomDetailSlice.reducer;
