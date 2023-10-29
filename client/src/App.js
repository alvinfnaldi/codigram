// import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import ListPosts from "./components/ListPosts/index.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" index element={<ListPosts />}></Route>

          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
