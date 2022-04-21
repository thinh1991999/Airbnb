import { getLanguage } from "../../Untils";
import { localStorageServ } from "../../ServiceWorkers";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: getLanguage(localStorageServ.languageTheme.get()),
  searchActive: true,
};

export const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setSearchActive: (state, action) => {
      state.searchActive = action.payload;
    },
  },
});

export const { setSearchActive } = rootSlice.actions;

export default rootSlice.reducer;
