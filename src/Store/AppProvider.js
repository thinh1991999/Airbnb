import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import adminSlice from "./AdminSlice/AdminSlice";
import headerSlice from "./HeaderSlice/HeaderSlice";
import loadingSlice from "./LoadingSlice/LoadingSlice";
import loginSlice from "./LoginSlice/LoginSlice";
import roomDetailSlice from "./RoomDetailSlice/RoomDetailSlice";
import roomsSlice from "./RoomListSlice/RoomListSlice";
import rootSlice from "./RootSlice/RootSlice";

export const store = configureStore({
  reducer: {
    header: headerSlice,
    root: rootSlice,
    rooms: roomsSlice,
    loading: loadingSlice,
    login: loginSlice,
    admin: adminSlice,
    roomDetail: roomDetailSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

function AppProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default AppProvider;
