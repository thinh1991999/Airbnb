import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchActive: true,
  searchValue: {},
  elementSearch: null,
  activeSearchForm: null,
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setSearchActive: (state, action) => {
      state.searchActive = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setElementSearch: (state, action) => {
      state.elementSearch = action.payload;
    },
    setActiveSearchForm: (state, action) => {
      state.activeSearchForm = action.payload;
    },
  },
});

export const {
  setSearchActive,
  setSearchValue,
  setElementSearch,
  setActiveSearchForm,
} = headerSlice.actions;

export default headerSlice.reducer;
