import React, { useEffect, useRef, useState } from "react";
import "./Editor.css";
import {
  BsPinAngle,
  BsPinAngleFill,
  BsTrash,
  BsArchive,
  BsX,
  BsArchiveFill,
} from "react-icons/bs";
import { useLocation, useSearchParams } from "react-router-dom";
import { useUser } from "../../context/Context";
import { useHandlers } from "../../hooks/useHandlers";
import { debounce, themes } from "../../utils/utils";
export const Editor = () => {
  const {
    user: { archives },
    pinned,
    setPin,
    handlers: { updateNotePinHandler },
  } = useUser();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("showOnly");
  const location = useLocation();
  const { note: oldNote } = location.state;
  const editorRef = useRef(null);
  const [themeColor, setThemeColor] = useState("#1b1b1e");

  const {
    tags,
    setTags,
    priority,
    setPriority,
    // notes
    updateNoteHandler,
    updateNoteColorHandler,
    updateNotePriorityHandler,
    updateNoteTagsHandler,
    // archive
    removeFromArchiveHandler,
    moveToArchivesHandler,
    // trash
    moveToTrashHandler,
    permanentlyDeleteHandler,
    restoreFromTrashHandler,
  } = useHandlers();

  const debounced = debounce(updateNoteHandler, 500);

  useEffect(() => {
    const ref = editorRef.current;
    ref.value = oldNote.title + "\r\n" + oldNote.content;
    setThemeColor(oldNote.themeColor);
    setTags(oldNote.tags);
    setPriority(oldNote.priority);
    setPin(oldNote.isPinned);
    return () => {
      ref.value = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oldNote, oldNote._id]);
  return (
    <main className={`main grid editor `}>
      <header className="editor__header text-center flex flex-center px-sm py-xs fs-m">
        <p className="head">Editor 👇</p>
        {page !== "trashed" ? (
          <>
            <select
              className="editor__priority input"
              value={priority}
              onChange={(e) =>
                updateNotePriorityHandler(e.target.value, oldNote._id)
              }
            >
              <option value="">Priority</option>
              <option value="low">Low</option>
              <option value="medium">medium</option>
              <option value="high">High</option>
            </select>
            {pinned ? (
              <BsPinAngleFill
                className="pointer icon fs-m"
                onClick={() => updateNotePinHandler(false, oldNote._id)}
              />
            ) : (
              <BsPinAngle
                className="pointer icon fs-m"
                onClick={() => updateNotePinHandler(true, oldNote._id)}
              />
            )}
            {archives?.some((archive) => archive._id === oldNote._id) ? (
              <BsArchiveFill
                className="pointer icon fs-m"
                title="Remove From Archive"
                onClick={() => removeFromArchiveHandler(oldNote._id)}
              />
            ) : (
              <BsArchive
                className="pointer icon fs-m"
                title="Move to archive"
                onClick={() => moveToArchivesHandler(oldNote._id)}
              />
            )}
            <BsTrash
              className="pointer icon fs-m"
              onClick={() => moveToTrashHandler(oldNote._id)}
            />
          </>
        ) : (
          <>
            <button
              className="btn btn-outline-warning p-xs"
              onClick={() => permanentlyDeleteHandler(oldNote._id)}
            >
              {" "}
              Permanently Delete Note
            </button>
            <button
              className="btn btn-warning p-xs"
              onClick={() => restoreFromTrashHandler(oldNote._id)}
            >
              Restore Note
            </button>
          </>
        )}
      </header>
      <textarea
        ref={editorRef}
        style={{ backgroundColor: themeColor }}
        className={`editor__textarea input p-lg fs-m ${
          page === "trashed" ? "readOnly" : ""
        }`}
        defaultValue={oldNote.title + "\r\n" + oldNote.content}
        placeholder="Start Typing..."
        readOnly={page === "trashed"}
        onChange={(e) =>
          debounced({
            textContent: e.target.value,
            themeColor,
            _id: oldNote._id,
          })
        }
      ></textarea>
      <footer className="editor__footer flex p-xs flex-center spread">
        <ul className="editor__tags flex flex-center list">
          {tags.map((tag, id) => (
            <li key={id} className="editor__tag fs-xs rounded-m pos-rel">
              {tag}
              <BsX
                size={15}
                className="pos-abs rounded-m pointer"
                onClick={() => updateNoteTagsHandler(tag, true, oldNote._id)}
              />
            </li>
          ))}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              updateNoteTagsHandler(
                event.target.elements.tag.value,
                false,
                oldNote._id
              );
              event.target.elements.tag.value = "";
            }}
          >
            <input
              className="editor__tag-input px-sm py-xs input"
              placeholder="Add tag"
              name="tag"
            />
          </form>
        </ul>
        <ul className="editor__colors flex">
          {themes.map((theme) => (
            <li
              className="editor__color rounded-s"
              title={theme.name}
              key={theme.hexCode}
              style={{ backgroundColor: theme.hexCode }}
              onClick={() =>
                updateNoteColorHandler(
                  oldNote._id,
                  theme.hexCode,
                  setThemeColor
                )
              }
            ></li>
          ))}
        </ul>
      </footer>
    </main>
  );
};

export default Editor;
