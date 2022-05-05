import { Navigation } from "./Navigation/Navigation";
import "./Layout.css";
import Sidebar from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
export const Layout = () => {
  return (
    <div className="layout grid">
      <Navigation />
      <Sidebar />
      <Outlet />
    </div>
  );
};
export default Layout;
