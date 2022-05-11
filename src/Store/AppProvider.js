import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import headerSlice from "./HeaderSlice/HeaderSlice";
import loadingSlice from "./LoadingSlice/LoadingSlice";
import loginSlice from "./LoginSlice/LoginSlice";
import roomsSlice from "./RoomListSlice/RoomListSlice";
import rootSlice from "./RootSlice/RootSlice";

export const store = configureStore({
  reducer: {
    header: headerSlice,
    root: rootSlice,
    rooms: roomsSlice,
    loading: loadingSlice,
    login: loginSlice,
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
