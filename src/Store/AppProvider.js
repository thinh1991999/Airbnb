import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import headerSlice from "./HeaderSlice/HeaderSlice";
import rootSlice from "./RootSlice/RootSlice";

function AppProvider({ children }) {
  const store = configureStore({
    reducer: {
      header: headerSlice,
      root: rootSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  return <Provider store={store}>{children}</Provider>;
}

export default AppProvider;
