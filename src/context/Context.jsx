import { createContext, useContext, useState } from "react";
import { updateNote } from "../services";
const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({ isLoggedIn: false });
  const [pinned, setPin] = useState(false);

  const updateNotePinHandler = async (isPinned, _id) => {
    const { note } = await updateNote({ isPinned, _id });
    setUser((user) => ({
      ...user,
      notes: user.notes.map((node) => (node._id === _id ? note : node)),
    }));
    setPin(note.isPinned);
  };

  return (
    <Context.Provider
      value={{
        user,
        pinned,
        setUser,
        setPin,
        handlers: { updateNotePinHandler },
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useUser = () => useContext(Context);
