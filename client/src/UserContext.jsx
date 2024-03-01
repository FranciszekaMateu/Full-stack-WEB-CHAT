import { createContext } from "react";
import { useState } from "react";
import axios from "axios"
import { useEffect } from "react";
import { useContext} from "react";
export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [IsLoginOrRegister, setIsLoginOrRegister] = useState("register");
  useEffect(() => {
    axios.get('/profile').then((res) => {
      setUsername(res.data.username);
      setId(res.data.id);
      console.log(res.data)
    })
  }, [])
  return (
    <UserContext.Provider value={{username,setUsername,id,setId,setIsLoginOrRegister,IsLoginOrRegister}}>
      {children}
    </UserContext.Provider>
  );
}
