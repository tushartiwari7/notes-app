import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { Layout, Editor, Placeholder } from "./components";
import Auth from "./components/Auth/Auth";

import { useUser } from "./context/Context";
import { Login, Signup } from "./pages";
function App() {
  const navigate = useNavigate();
  const { user } = useUser();
  useEffect(() => {
    if (!user.isLoggedIn) navigate("/auth", { replace: true });
    // eslint-disable-next-line
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Layout />}>
          <Route index element={<Placeholder />} />
          <Route path="editor" element={<Editor />} />
        </Route>
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
