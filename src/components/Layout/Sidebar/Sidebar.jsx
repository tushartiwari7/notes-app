import React from "react";
import "./Sidebar.css";
import { BsPencilSquare, BsPlusLg } from "react-icons/bs";
import NoteTile from "./NoteTile/NoteTile";
import { createNew } from "../../../services";
import { useUser } from "../../../context/Context";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useHandlers } from "../../../hooks/useHandlers";

const Sidebar = () => {
  const { setUser, setFilters, allTags, notesToRender } = useUser();

  const { restoreAllHandler } = useHandlers();
  const navigator = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const page = searchParams.get("showOnly");

  const createNote = async () => {
    const { note } = await createNew();
    setUser((prev) => ({ ...prev, notes: [note, ...prev.notes] }));
    navigator("/editor", { state: { note } });
  };

  const filterHandler = (e) => {
    const [type, value] = e.target.value.split(" ");
    switch (type) {
      case "Priority:":
        return setFilters({ priority: value });

      case "Tag:":
        return setFilters({ tag: value });

      case "Sort-By:":
        return setFilters({ sortBy: value });

      default:
        return setFilters({ priority: "", tag: "", sortBy: "" });
    }
  };

  return (
    <aside
      className={`sidebar grid ${location.pathname !== "/" ? "none" : ""}`}
    >
      <div className="header text-center flex flex-center spread px-sm py-xs fs-m">
        {page === "archived"
          ? `Archived Notes (${notesToRender?.length})`
          : page === "trashed"
          ? `Trash (${notesToRender?.length})`
          : `All Notes (${notesToRender?.length})`}
        {page === "trashed" ? (
          <button
            className="btn btn-restore rounded-m"
            onClick={restoreAllHandler}
          >
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
      <select className="filters px-sm py-xs fs-s" onChange={filterHandler}>
        <option value="">Choose Filters</option>
        <optgroup label="Priority">
          <option value="Priority: High">High Only</option>
          <option value="Priority: Medium">Medium Only</option>
          <option value="Priority: Low">Low Only</option>
        </optgroup>
        {allTags.length && (
          <optgroup label="Tags">
            {allTags?.map((tag) => (
              <option key={tag} value={`Tag: ${tag}`}>
                {tag}
              </option>
            ))}
          </optgroup>
        )}
        <optgroup label="Sort By">
          <option value="Sort-By: Latest">Latest Notes First</option>
          <option value="Sort-By: Oldest">Oldest Notes First</option>
        </optgroup>
      </select>
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
