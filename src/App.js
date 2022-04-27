import { Routes, Route } from "react-router-dom";
import { Layout } from "./Components";
import { HomePage, AccountPage, RoomListPage } from "./Pages";

function App() {
  return (
    <div className="">
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
      </Routes>
    </div>
  );
}

export default App;
