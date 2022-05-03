import React, { useState } from "react";
import "./Editor.css";
import { BsPinAngle, BsTrash, BsArchive, BsX } from "react-icons/bs";
const Editor = () => {
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
      <div
        style={{ backgroundColor: themeColor }}
        contentEditable
        className="editor__textarea input p-lg fs-m"
        placeholder="Start Typing..."
      ></div>
      <footer className="editor__footer flex p-xs flex-center spread">
        <ul className="editor__tags flex flex-center list">
          {tags.map((tag, id) => (
            <li key={id} className="editor__tag fs-xs rounded-m pos-rel">
              {tag}
              <BsX
                size={15}
                className="pos-abs rounded-m pointer"
                onClick={() =>
                  setTags((tags) => tags.filter((_, i) => i !== id))
                }
              />
            </li>
          ))}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setTags((tags) => [...tags, event.target.tag.value]);
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
              onClick={() => setThemeColor(theme.hexCode)}
            ></li>
          ))}
        </ul>
      </footer>
    </main>
  );
};

export default Editor;
