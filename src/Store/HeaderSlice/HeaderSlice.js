import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchActive: false,
  scrollActive: true,
  showSearch: true,
  searchValue: {},
  searchParams: {},
  elementSearch: null,
  activeSearchForm: null,
  showLanguageSetting: false,
  showUserSetting: false,
  headerTrans: false,
  showNavMobile: false,
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setSearchActive: (state, action) => {
      state.searchActive = action.payload;
    },
    setScrollActive: (state, action) => {
      state.scrollActive = action.payload;
    },
    setShowSearch: (state, action) => {
      state.showSearch = action.payload;
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
    setSearchParams: (state, action) => {
      state.searchParams = action.payload;
    },
    setShowLanguageSetting: (state, action) => {
      state.showLanguageSetting = action.payload;
    },
    setShowUserSetting: (state, action) => {
      state.showUserSetting = action.payload;
    },
    setHeaderTrans: (state, action) => {
      state.headerTrans = action.payload;
    },
    setShowNavMobile: (state, action) => {
      state.showNavMobile = action.payload;
    },
  },
});

export const {
  setSearchActive,
  setScrollActive,
  setShowSearch,
  setSearchValue,
  setElementSearch,
  setActiveSearchForm,
  setSearchParams,
  setShowLanguageSetting,
  setShowUserSetting,
  setHeaderTrans,
  setShowNavMobile,
} = headerSlice.actions;

export default headerSlice.reducer;
