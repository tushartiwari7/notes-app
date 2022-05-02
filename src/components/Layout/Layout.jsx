import { Navigation } from "./Navigation/Navigation";
import "./Layout.css";
import Sidebar from "./Sidebar/Sidebar";
export const Layout = () => {
  return (
    <div className="layout grid">
      <Navigation />
      <Sidebar />
      <main className="main">main</main>
    </div>
  );
};
export default Layout;
