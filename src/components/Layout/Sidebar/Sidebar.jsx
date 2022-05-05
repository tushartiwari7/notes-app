import React from "react";
import "./Sidebar.css";
import { BsPencilSquare, BsSearch } from "react-icons/bs";
import NoteTile from "./NoteTile/NoteTile";
import { createNew } from "../../../services";
import { useUser } from "../../../context/Context";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const {
    user: { notes },
    setUser,
  } = useUser();
  const navigator = useNavigate();

  const createNote = async () => {
    const { note } = await createNew();
    setUser((prev) => ({ ...prev, notes: [...prev.notes, note] }));
    navigator("/editor", { state: { note } });
  };

  return (
    <aside className="sidebar grid">
      <div className="header text-center flex flex-center spread px-sm py-xs fs-m">
        All Notes
        <i title="Create Note" onClick={createNote}>
          <BsPencilSquare className="pointer icon fs-m" />
        </i>
      </div>
      <div className="pos-rel">
        <BsSearch size={20} className="sidebar__search-icon pos-abs" />
        <input
          className="sidebar__search input full-width px-sm py-xs fs-s"
          placeholder="Search Notes..."
        />
      </div>
      <ul className="sidebar__list">
        {notes?.map((note) => (
          <NoteTile key={note._id} note={note} />
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
