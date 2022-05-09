import { Navigation } from "./Navigation/Navigation";
import "./Layout.css";
import Sidebar from "./Sidebar/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
export const Layout = () => {
  const location = useLocation();
  console.log("Layout rendered", location.pathname);
  return (
    <div className="layout grid">
      <Navigation />
      <Sidebar />
      <Outlet />
    </div>
  );
};
export default Layout;
