import { getLanguage } from "../../Untils";
import { localStorageServ } from "../../ServiceWorkers";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: getLanguage(localStorageServ.languageTheme.get()),
  languageHint: localStorageServ.languageTheme.get() || "VN",
  user: localStorageServ.userInfo.get(),
  mode: localStorageServ.modeTheme.get() || "LIGHT",
};

export const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorageServ.userInfo.set(action.payload);
      state.user = action.payload;
    },
    setMode: (state, action) => {
      localStorageServ.modeTheme.set(action.payload);
      state.mode = action.payload;
    },
    setLanguageHint: (state, action) => {
      state.language = getLanguage(action.payload);
      localStorageServ.languageTheme.set(action.payload);
      state.languageHint = action.payload;
    },
  },
});

export const { setUser, setMode, setLanguageHint } = rootSlice.actions;

export default rootSlice.reducer;
