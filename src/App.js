import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
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

function App() {
  const mode = useSelector((state) => state.root.mode);

  return (
    <div className={`${mode === "DARK" && `dark`}`}>
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
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
