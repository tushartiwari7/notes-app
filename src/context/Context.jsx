import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { updateNote } from "../services";
import {
  compose,
  filterByPriority,
  filterByTags,
  sortByDate,
} from "../utils/utils";
const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({ isLoggedIn: false });
  const [pinned, setPin] = useState(false);
  const [allTags, setAllTags] = useState([]);
  const [searchParams] = useSearchParams();
  const page = searchParams.get("showOnly");
  const [filters, setFilters] = useState({
    priority: "",
    tag: "",
  });

  const updateNotePinHandler = async (isPinned, _id) => {
    const { note } = await updateNote({ isPinned, _id });
    setUser((user) => ({
      ...user,
      notes: user.notes.map((node) => (node._id === _id ? note : node)),
      archives: user.archives.map((node) => (node._id === _id ? note : node)),
    }));
    setPin(note.isPinned);
  };

  const notesToRender = compose(
    page === "archived"
      ? user.archives
      : page === "trashed"
      ? user.trash
      : user.notes,
    filterByTags,
    filterByPriority,
    sortByDate
  )(filters);

  return (
    <Context.Provider
      value={{
        user,
        pinned,
        allTags,
        setUser,
        setPin,
        setAllTags,
        setFilters,
        notesToRender,
        handlers: { updateNotePinHandler },
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useUser = () => useContext(Context);
