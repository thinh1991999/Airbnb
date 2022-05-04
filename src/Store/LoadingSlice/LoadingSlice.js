import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  count: 0,
};

export const loadingSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setStartLoading: (state, action) => {
      state.loading = true;
      state.count++;
    },
    setStopLoading: (state, action) => {
      state.count--;
      if (state.count <= 0) {
        state.loading = false;
      }
    },
  },
});

export const { setStartLoading, setStopLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
