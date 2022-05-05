import React, { useEffect, useRef, useState } from "react";
import "./Editor.css";
import { BsPinAngle, BsTrash, BsArchive, BsX } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { updateNote } from "../../services";
import { useUser } from "../../context/Context";
export const Editor = () => {
  const { setUser } = useUser();
  const editorRef = useRef(null);
  const [themeColor, setThemeColor] = useState("#1b1b1e");
  const [tags, setTags] = useState(["JavaScript", "React"]);
  const themes = [
    {
      name: "Purple",
      hexCode: "#242038",
    },
    {
      name: "Prussian Blue",
      hexCode: "#0F172A",
    },
    {
      name: "Earle Black",
      hexCode: "#1b1b1e",
    },
    {
      name: "Maroon",
      hexCode: "#96031A",
    },
    {
      name: "Coffee Brown",
      hexCode: "#1C1917",
    },
  ];

  const location = useLocation();
  const { note: oldNote } = location.state;

  const updateNoteHandler = async (textContent) => {
    let [title, ...content] = textContent.split(`\n`);
    // sometimes the first line is empty when user starts typing from second line. so weare moving the first line to second line
    if (title === "" && content.length) {
      title = content[0];
      content = content.slice(1);
    }
    const contentString = content.join("\r\n");
    const { note } = await updateNote({
      title,
      content: contentString,
      themeColor,
      tags,
      _id: oldNote._id,
    });
    setUser((user) => ({
      ...user,
      notes: user.notes.map((node) => (node._id === oldNote._id ? note : node)),
    }));
  };

  const updateNoteColorHandler = async (color) => {
    const { note } = await updateNote({
      themeColor: color,
      _id: oldNote._id,
    });
    setUser((user) => ({
      ...user,
      notes: user.notes.map((node) => (node._id === oldNote._id ? note : node)),
    }));
    setThemeColor(color);
  };

  const updateNoteTagsHandler = async (tag, isRemove = false) => {
    console.log(
      tag,
      isRemove,
      tags.filter((prev) => prev !== tag)
    );
    const { note } = await updateNote({
      tags: isRemove ? tags.filter((prev) => prev !== tag) : [...tags, tag],
      _id: oldNote._id,
    });
    setUser((user) => ({
      ...user,
      notes: user.notes.map((node) => (node._id === oldNote._id ? note : node)),
    }));
    setTags(note.tags);
  };

  const debounce = (func, delay) => {
    let inDebounce;
    return (val) => {
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func(val), delay);
    };
  };
  const debounced = debounce(updateNoteHandler, 300);

  useEffect(() => {
    const ref = editorRef.current;
    ref.value = oldNote.title + "\r\n" + oldNote.content;
    setThemeColor(oldNote.themeColor);
    setTags(oldNote.tags);
    return () => {
      ref.value = "";
    };
  }, [oldNote, oldNote._id]);

  return (
    <main className="main grid editor">
      <header className="editor__header text-center flex flex-center px-sm py-xs fs-m">
        <select className="editor__priority input">
          <option value="">Priority</option>
          <option value="low">Low</option>
          <option value="medium">medium</option>
          <option value="high">High</option>
        </select>
        <BsPinAngle className="pointer icon fs-m" />
        <BsArchive className="pointer icon fs-m" />
        <BsTrash className="pointer icon fs-m" />
      </header>
      <textarea
        ref={editorRef}
        style={{ backgroundColor: themeColor }}
        className="editor__textarea input p-lg fs-m"
        defaultValue={oldNote.title + "\r\n" + oldNote.content}
        placeholder="Start Typing..."
        onChange={(e) => debounced(e.target.value)}
      ></textarea>
      <footer className="editor__footer flex p-xs flex-center spread">
        <ul className="editor__tags flex flex-center list">
          {tags.map((tag, id) => (
            <li key={id} className="editor__tag fs-xs rounded-m pos-rel">
              {tag}
              <BsX
                size={15}
                className="pos-abs rounded-m pointer"
                onClick={() => updateNoteTagsHandler(tag, true)}
              />
            </li>
          ))}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              updateNoteTagsHandler(event.target.elements.tag.value);
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
              onClick={() => updateNoteColorHandler(theme.hexCode)}
            ></li>
          ))}
        </ul>
      </footer>
    </main>
  );
};

export default Editor;
