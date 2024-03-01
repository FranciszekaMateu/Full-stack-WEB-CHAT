
import { Input } from '@chakra-ui/react'
import {Button} from '@chakra-ui/react'
import axios from 'axios'
import {UserContext} from "./UserContext.jsx"
import { useState } from 'react'
import {useContext} from 'react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'


export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setUsername:setLoggedInUsername,setId,setIsLoginOrRegister} = useContext(UserContext)
  async function register(ev){
    ev.preventDefault();
    const {data} = await axios.post('/register',{username, password});
    setLoggedInUsername(username);
    setId(data.id);
  }
  return (
    <div className="bg-blue-900 h-screen  flex items-center justify-center">
    <form className="mx-auto bg-white rounded-lg py-1 px-10  flex flex-col items-center my-10  gap-3 " onSubmit={register}>
      <img src="./logo.png" alt="logo" className="mx-auto w-36" />
      <h2 className="font-bold">Your private and minimalist chat</h2>
      <h1 className="text-3xl text-center">Button</h1>
      <p>Already have an account?</p> 
      <button onClick={ev => {
        ev.preventDefault();
        setIsLoginOrRegister("register")
      }} className="text-blue-500 underline">Register</button>
      <Input  onChange={ev => setUsername(ev.target.value)} placeholder="Username" />
      <Input value={password} onChange={ev => setPassword(ev.target.value)} type="password" placeholder="Confirm Password" />
  
    { !(password === ""    ) ? (
      <Button className="mb-2" colorScheme="gray" size="lg">
        Register  
      </Button>
    ): (
<Button  type="submit" className="mb-2"  colorScheme="blue" size="lg">
        Register  
      </Button>
       

    )}
         </form>
    </div>
  )
}
