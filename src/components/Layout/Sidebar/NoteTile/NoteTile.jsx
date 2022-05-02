import React from "react";
import { BsPinAngle } from "react-icons/bs";
import "./NoteTile.css";
const NoteTile = () => {
  return (
    <li className="flex note__tile py-xs pointer">
      <BsPinAngle size={20} className="mx-xs icon pointer" />
      <div className="tile__content">
        <h4 className="fw-light fs-s tile__title">Welcome to Notes App</h4>
        <p className="fs-xs">
          Lorem ipsum dolor sit amet, consectetur elit. adipiscing
        </p>
      </div>
    </li>
  );
};

export default NoteTile;
