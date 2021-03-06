import { useSelector } from "react-redux";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Layout } from "./Components";
import Loading from "./Components/Loading/Loading";
import {
  HomePage,
  AccountPage,
  RoomListPage,
  UserPage,
  RoomDetailPage,
  ErrorPage,
  AdminPage,
} from "./Pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "react-scroll-to-top";
import { useEffect } from "react";
import WarningLayout from "./Components/WarningLayout/WarningLayout";

function App() {
  const location = useLocation();
  const mode = useSelector((state) => state.root.mode);
  const showWarning = useSelector((state) => state.root.showWarning);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <div className={`${mode === "DARK" && `dark`} scroll-smooth`}>
      <Loading />
      <div className="bg-white dark:bg-gray-900 dark:text-white min-h-screen flex flex-col">
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          ></Route>
          <Route
            path="/account/signIn"
            element={<AccountPage type={"SignIn"} />}
          ></Route>
          <Route
            path="/account/signUp"
            element={<AccountPage type={"SignUp"} />}
          ></Route>
          <Route
            path="/rooms/:locId"
            element={
              <Layout>
                <RoomListPage />
              </Layout>
            }
          ></Route>
          <Route
            path="/rooms"
            element={
              <Layout>
                <RoomListPage />
              </Layout>
            }
          ></Route>
          <Route
            path="/roomDetail/:id"
            element={
              <Layout>
                <RoomDetailPage />
              </Layout>
            }
          ></Route>
          <Route
            path="/user"
            element={
              <Layout>
                <UserPage />
              </Layout>
            }
          ></Route>
          <Route
            path="/admin"
            element={
              <Layout>
                <AdminPage />
              </Layout>
            }
          ></Route>
          <Route path="/error" element={<ErrorPage />}></Route>
          <Route path="/*" element={<Navigate to="/error" />}></Route>
        </Routes>
      </div>
      <ToastContainer />
      <ScrollToTop smooth color={mode === "DARK" ? "#6f00ff" : "#fff"} />
      {showWarning && <WarningLayout />}
    </div>
  );
}

export default App;
