import React from "react";
import "./Editor.css";
import { BsPinAngle, BsTrash, BsArchive } from "react-icons/bs";
const Editor = () => {
  return (
    <main className="main grid editor">
      <header className="editor__header text-center flex flex-center px-sm py-xs fs-m">
        <BsPinAngle className="pointer icon fs-m" />
        <BsArchive className="pointer icon fs-m" />
        <BsTrash className="pointer icon fs-m" />
      </header>
      <textarea
        className="editor__textarea input"
        placeholder="Write your code here..."
      ></textarea>
      <div className="editor__tags">Tags</div>
    </main>
  );
};

export default Editor;
