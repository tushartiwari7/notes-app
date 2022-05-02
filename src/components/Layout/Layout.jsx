import { Navigation } from "./Navigation/Navigation";
import "./Layout.css";
import Sidebar from "./Sidebar/Sidebar";
import Editor from "./Editor/Editor";
export const Layout = () => {
  return (
    <div className="layout grid">
      <Navigation />
      <Sidebar />
      <Editor />
    </div>
  );
};
export default Layout;
