import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hoverActive: null,
};

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setHoverActive: (state, action) => {
      state.hoverActive = action.payload;
    },
  },
});

export const { setHoverActive } = roomsSlice.actions;

export default roomsSlice.reducer;
