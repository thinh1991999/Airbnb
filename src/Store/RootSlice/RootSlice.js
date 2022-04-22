import { getLanguage } from "../../Untils";
import { localStorageServ } from "../../ServiceWorkers";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: getLanguage(localStorageServ.languageTheme.get()),
};

export const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {},
});

// export const {} = rootSlice.actions;

export default rootSlice.reducer;
