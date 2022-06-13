import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchActive: false,
  scrollActive: true,
  showSearch: true,
  searchValue: { members: { NL: 1 } },
  searchValueMobile: {},
  searchParams: {},
  elementSearch: null,
  elementSearchMobile: null,
  activeSearchForm: null,
  showLanguageSetting: false,
  showUserSetting: false,
  headerTrans: false,
  showNavMobile: false,
  showSearchMobile: false,
  activeSearchMobile: null,
  homeChecked: false,
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
    resetSearchValue: (state) => {
      state.searchValue = { members: { NL: 1 } };
    },
    setElementSearch: (state, action) => {
      state.elementSearch = action.payload;
    },
    setElementSearchMobile: (state, action) => {
      state.elementSearchMobile = action.payload;
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
    setShowSearchMobile: (state, action) => {
      state.showSearchMobile = action.payload;
    },
    setHomeChecked: (state, action) => {
      state.homeChecked = action.payload;
    },
    setActiveSearchMobile: (state, action) => {
      state.activeSearchMobile = action.payload;
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
  setShowSearchMobile,
  setElementSearchMobile,
  setActiveSearchMobile,
  setHomeChecked,
  resetSearchValue,
} = headerSlice.actions;

export default headerSlice.reducer;
