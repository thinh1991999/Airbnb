import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootSlice from "./RootSlice/RootSlice";

function AppProvider({ children }) {
  const store = configureStore({
    reducer: {
      root: rootSlice,
    },
  });
  return <Provider store={store}>{children}</Provider>;
}

export default AppProvider;
