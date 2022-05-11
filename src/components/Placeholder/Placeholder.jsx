import React from "react";
import { useLocation } from "react-router-dom";

export const Placeholder = () => {
  const location = useLocation();
  return (
    <div
      className={`flex flex-center ${
        location.pathname === "/editor" ? "" : "none"
      }`}
    >
      <img src="/logo.svg" alt="logo" width="150" />
    </div>
  );
};
