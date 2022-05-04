import { Routes, Route } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth/Auth";
import { Layout } from "./components/Layout/Layout";
import { Login, Signup } from "./pages";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Layout />} />
        <Route path="/auth" element={<Auth />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
