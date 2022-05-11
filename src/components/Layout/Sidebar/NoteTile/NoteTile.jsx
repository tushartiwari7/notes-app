import React from "react";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";
import { Link, useSearchParams } from "react-router-dom";
import { useUser } from "../../../../context/Context";
import "./NoteTile.css";
const NoteTile = ({ note }) => {
  const {
    handlers: { updateNotePinHandler },
  } = useUser();
  const [searchParam] = useSearchParams();
  const page = searchParam.get("showOnly");
  return (
    <Link
      to={`/editor?showOnly=${page}`}
      state={{ note }}
      className="flex note__tile py-xs pointer"
    >
      {note.isPinned ? (
        <BsPinAngleFill
          size={20}
          className="mx-xs icon pointer"
          onClick={() => updateNotePinHandler(false, note._id)}
        />
      ) : (
        <BsPinAngle
          size={20}
          className="mx-xs icon pointer"
          onClick={() => updateNotePinHandler(true, note._id)}
        />
      )}
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
