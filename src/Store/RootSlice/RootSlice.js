import { getLanguage } from "../../Untils";
import { localStorageServ } from "../../ServiceWorkers";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: getLanguage(localStorageServ.languageTheme.get()),
  languageHint: localStorageServ.languageTheme.get() || "VN",
  user: null,
};

export const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorageServ.userInfo.set(action.payload);
      state.user = action.payload;
    },
  },
});

export const { setUser } = rootSlice.actions;

export default rootSlice.reducer;
