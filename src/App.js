import { Routes, Route } from "react-router-dom";
import { Layout } from "./Components";
import { HomePage } from "./Pages";

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
      </Routes>
    </div>
  );
}

export default App;
