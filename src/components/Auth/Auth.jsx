import { Outlet } from "react-router-dom";
import "./Auth.css";
const Auth = () => {
  return (
    <main className="auth grid grid2">
      <div className="flex flex-center">
        <img src="/logo.svg" width={150} alt="logo" />
      </div>
      <Outlet />
    </main>
  );
};

export default Auth;
