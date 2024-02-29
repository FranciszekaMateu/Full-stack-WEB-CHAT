import { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";
export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  return (
    <UserContext.Provider value={{username,setUsername,id,setId}}>
      {children}
    </UserContext.Provider>
  );
}