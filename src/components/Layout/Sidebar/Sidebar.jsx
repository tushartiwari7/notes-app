import React from "react";
import "./Sidebar.css";
import { BsPencilSquare, BsSearch } from "react-icons/bs";
const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__header text-center flex spread px-sm py-xs">
        All Notes
        <BsPencilSquare className="pointer icon" size={20} />
      </div>
      <div className="pos-rel">
        <BsSearch size={20} className="sidebar__search-icon pos-abs" />
        <input
          className="sidebar__search input full-width px-sm py-xs fs-xs"
          placeholder="Search Notes..."
        />
      </div>
    </aside>
  );
};

export default Sidebar;
