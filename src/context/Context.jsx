import { createContext, useContext, useState } from "react";
const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({ isLoggedIn: false });
  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};

export const useUser = () => useContext(Context);
