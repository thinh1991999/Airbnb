import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  navData: null,
  currentPage: 0,
  showOptionBox: false,
  idOption: null,
  componentShow: null,
  reloadData: false,
  loading: false,
  userAddValue: {
    email: "",
    password: "",
    cfPassword: "",
    name: "",
    phone: "",
    birthday: "",
    gender: true,
    address: "",
    type: "ADMIN",
  },
  posAddValue: {
    name: "",
    province: "",
    country: "",
    valueate: "",
  },
  roomAddValue: {
    name: "",
    guests: 1,
    bedRoom: 1,
    bath: 1,
    description: "",
    price: 100000,
    elevator: true,
    hotTub: true,
    pool: true,
    indoorFireplace: true,
    dryer: true,
    gym: true,
    kitchen: true,
    wifi: true,
    heating: true,
    cableTV: true,
    locationId: "",
  },
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setShowOptionBox: (state, action) => {
      state.showOptionBox = action.payload;
    },
    setIdOption: (state, action) => {
      state.idOption = action.payload;
    },

    setComponentShow: (state, action) => {
      state.componentShow = action.payload;
    },
    setReloadData: (state, action) => {
      state.reloadData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserAddValue: (state, action) => {
      state.userAddValue = action.payload;
    },
    setPosAddValue: (state, action) => {
      state.posAddValue = action.payload;
    },
    setRoomAddValue: (state, action) => {
      state.roomAddValue = action.payload;
    },
  },
});

export const {
  setData,
  setCurrentPage,
  setShowOptionBox,
  setComponentShow,
  setReloadData,
  setLoading,
  setUserAddValue,
  setPosAddValue,
  setRoomAddValue,
  setIdOption,
} = adminSlice.actions;

export default adminSlice.reducer;
