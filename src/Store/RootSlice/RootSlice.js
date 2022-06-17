import { getLanguage } from "../../Untils";
import { localStorageServ } from "../../ServiceWorkers";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: getLanguage(localStorageServ.languageTheme.get()),
  languageHint: localStorageServ.languageTheme.get() || "VN",
  user: localStorageServ.userInfo.get(),
  token: localStorageServ.token.get(),
  mode: localStorageServ.modeTheme.get() || "LIGHT",
  showWarning: false,
  componentWarning: null,
};

export const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorageServ.userInfo.set(action.payload);
      state.user = action.payload;
    },
    setToken: (state, action) => {
      localStorageServ.token.set(action.payload);
      state.token = action.payload;
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
    setComponentWarning: (state, action) => {
      state.componentWarning = action.payload;
    },
    setShowWarning: (state, action) => {
      state.showWarning = action.payload;
    },
  },
});

export const {
  setUser,
  setMode,
  setLanguageHint,
  setToken,
  setComponentWarning,
  setShowWarning,
} = rootSlice.actions;

export default rootSlice.reducer;
