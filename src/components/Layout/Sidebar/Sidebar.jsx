import React from "react";
import "./Sidebar.css";
import { BsPencilSquare, BsSearch } from "react-icons/bs";
import NoteTile from "./NoteTile/NoteTile";
const Sidebar = () => {
  return (
    <aside className="sidebar grid ">
      <div className="sidebar__header text-center flex flex-center spread px-sm py-xs fs-m">
        All Notes
        <BsPencilSquare className="pointer icon fs-m" />
      </div>
      <div className="pos-rel">
        <BsSearch size={20} className="sidebar__search-icon pos-abs" />
        <input
          className="sidebar__search input full-width px-sm py-xs fs-s"
          placeholder="Search Notes..."
        />
      </div>
      <ul className="sidebar__list">
        <NoteTile />
        <NoteTile />
        <NoteTile />
        <NoteTile />
        <NoteTile />
        <NoteTile />
        <NoteTile />
        <NoteTile />
        <NoteTile />
        <NoteTile />
        <NoteTile />
        <NoteTile />
        <NoteTile />
        <NoteTile />
        <NoteTile />
        <NoteTile />
        <NoteTile />
        <NoteTile />
      </ul>
    </aside>
  );
};

export default Sidebar;
