
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
  const [error, setError] = useState(null);
  const {setUsername:setLoggedInUsername,setId,setIsLoginOrRegister} = useContext(UserContext)
  async function login(ev){
    ev.preventDefault();
    await axios.post('/login',{username, password}).then(res =>    {
      setId(res.data.id)
      setLoggedInUsername(username);
      setError(null);
      res.data
    }
    ).catch(err => {
      setError(err.response.data.error);
    }
    );
  }
  return (
    <div className="bg-blue-900 h-screen  flex items-center justify-center">
    <form className="mx-auto bg-white rounded-lg py-1 px-10  flex flex-col items-center my-10  gap-3 " onSubmit={login}>
      <img src="./logo.png" alt="logo" className="mx-auto w-36" />
      <h2 className="font-bold">Private and Minimalist chat</h2>
      <h1 className="text-3xl text-center">Login</h1>
      <p>Don't have an account?</p> 
      <button onClick={ev => {
        ev.preventDefault();
        setIsLoginOrRegister("register")
      }} className="text-blue-500 underline">Register</button>
      <Input  onChange={ev => setUsername(ev.target.value)} placeholder="Username" />
      <Input value={password} onChange={ev => setPassword(ev.target.value)} type="password" placeholder="Password" />
    { (error) ? (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Error!</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    ): null}
    { (password === ""    ) ? (
      <Button className="mb-2" colorScheme="gray" size="lg">
        Login  
      </Button>
    ): (
<Button  type="submit" className="mb-2"  colorScheme="blue" size="lg">
        Login  
      </Button>
       

    )}
         </form>
    </div>
  )
}
