import Register from "./Register.jsx"
import {UserContext} from "./UserContext.jsx"
import {useContext} from 'react'
import Login from "./Login.jsx"
import Chat from "./Chat.jsx"
export default function Routes() {

   const {username, id,IsLoginOrRegister} = useContext(UserContext);
   if(username)
     return <Chat />  
  else if(IsLoginOrRegister === "login")
     return <Login/>
  else if(IsLoginOrRegister === "register")
    return <Register />
}
