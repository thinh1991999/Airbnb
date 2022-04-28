import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./Components";
import { HomePage, AccountPage, RoomListPage, UserPage } from "./Pages";

function App() {
  const mode = useSelector((state) => state.root.mode);

  return (
    <div className={`${mode === "DARK" && `dark`}`}>
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
          path="/user"
          element={
            <Layout>
              <UserPage />
            </Layout>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
