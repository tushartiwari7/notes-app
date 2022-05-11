import React from "react";
import "./Sidebar.css";
import { BsPencilSquare, BsPlusLg } from "react-icons/bs";
import NoteTile from "./NoteTile/NoteTile";
import { createNew } from "../../../services";
import { useUser } from "../../../context/Context";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useHandlers } from "../../../hooks/useHandlers";

const Sidebar = () => {
  const {
    user: { notes, archives, trash },
    setUser,
  } = useUser();
  const { restoreAllHandler } = useHandlers();
  const navigator = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const page = searchParams.get("showOnly");

  const notesToRender =
    page === "archived" ? archives : page === "trashed" ? trash : notes;

  const createNote = async () => {
    const { note } = await createNew();
    setUser((prev) => ({ ...prev, notes: [...prev.notes, note] }));
    navigator("/editor", { state: { note } });
  };

  return (
    <aside
      className={`sidebar grid ${location.pathname !== "/" ? "none" : ""}`}
    >
      <div className="header text-center flex flex-center spread px-sm py-xs fs-m">
        {page === "archived"
          ? `Archived Notes (${archives?.length})`
          : page === "trashed"
          ? `Trash (${trash?.length})`
          : `All Notes (${notes?.length})`}
        {page === "trashed" ? (
          <button
            className="btn btn-restore rounded-m"
            onClick={restoreAllHandler}
          >
            {" "}
            Restore All
          </button>
        ) : (
          <i title="Create Note" onClick={createNote}>
            <BsPencilSquare className="pointer icon fs-m" />
          </i>
        )}
      </div>
      <button
        className="pos-rel btn btn-primary px-sm py-xs fs-s"
        onClick={createNote}
      >
        <BsPlusLg size={20} className="sidebar__search-icon pos-abs" />
        Create New Note
      </button>
      <ul className="sidebar__list">
        {notesToRender
          ?.sort((a, b) => b.isPinned - a.isPinned)
          .map((note) => (
            <NoteTile key={note._id} note={note} />
          ))}
      </ul>
    </aside>
  );
};
export default Sidebar;
