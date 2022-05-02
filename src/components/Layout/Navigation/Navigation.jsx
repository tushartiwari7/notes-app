import "./Navigation.css";
import { BsList, BsJournals, BsTrash, BsArchive } from "react-icons/bs";
import { useState } from "react";

export const Navigation = () => {
  const [descriptiveView, setDescriptiveView] = useState(false);
  const navList = [
    {
      id: 1,
      name: "All Notes",
      Icon: BsJournals,
    },
    {
      id: 3,
      name: "Archieve",
      Icon: BsArchive,
    },
    {
      id: 2,
      name: "Trash",
      Icon: BsTrash,
    },
  ];
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <img src={`favicon.svg`} height="30" alt="logo" />
        </li>
        <li
          className="nav__item icon"
          onClick={() => setDescriptiveView(!descriptiveView)}
        >
          <BsList size={25} />
        </li>
        {navList.map(({ name, Icon, id }) => (
          <li className="nav__item icon flex" title={name} key={id}>
            <Icon size={25} />
            {descriptiveView && <span className="px-sm fs-s">{name}</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};
