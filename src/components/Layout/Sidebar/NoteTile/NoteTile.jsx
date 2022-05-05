import React from "react";
import { BsPinAngle } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./NoteTile.css";
const NoteTile = ({ note }) => {
  return (
    <Link
      to="/editor"
      state={{ note }}
      className="flex note__tile py-xs pointer"
    >
      <BsPinAngle size={20} className="mx-xs icon pointer" />
      <div className="tile__content">
        <h4 className="fw-light fs-s tile__title">
          {note.title || "Start Typing..."}
        </h4>
        <p className="fs-xs">
          {note.content ? note.content.split("\n").join(" ") : "Description"}
        </p>
      </div>
    </Link>
  );
};

export default NoteTile;
