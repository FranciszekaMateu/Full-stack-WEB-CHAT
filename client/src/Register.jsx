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
  const [passwordConfirmation,setPasswordConfirmation] =useState('');
  const [checkUser,setCheckUser] = useState(false);
  const {setUsername:setLoggedInUsername,setId,setIsLoginOrRegister} = useContext(UserContext)
  async function checkUsername(){
    await axios.post('/checkUser',{username})
    .then((res) => {
      console.log(res)
      if(res.data.isUsed === true){
        setCheckUser(true);
      }
      else{
        setCheckUser(false);
      }
    });
    
  };
  async function register(ev){
    ev.preventDefault();
    const {data} = await axios.post('/register',{username, password});
    setLoggedInUsername(username);
    setId(data.id);
  }
  async function handleFocus(ev) {
    ev.preventDefault();
    console.log(username.lenght)
    if(!(username === '') && username.length> 3){
      console.log("hola")
      checkUsername();
    }
  }
  return (
    <div className="bg-blue-900 h-screen  flex items-center justify-center">
    <form className="mx-auto bg-white rounded-lg py-1 px-10  flex flex-col items-center my-10  gap-3 " onSubmit={register}>
      <img src="./logo.png" alt="logo" className="mx-auto w-36" />
      <h2 className="font-bold">Your private and minimalist chat</h2>
      <h1 className="text-3xl text-center">Register</h1>
      <p>Already have an account?</p> 
      <button onClick={ev => {
        ev.preventDefault();
        setIsLoginOrRegister("login")
      }} className="text-blue-500 underline">Login</button>
      <Input onBlur={handleFocus} onFocus={handleFocus} value={username} onChange={ev => setUsername(ev.target.value)} placeholder="Username" />
      <Input pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" type="password" value={password} onChange={ev => setPassword(ev.target.value)} placeholder="Password" />
      <Input pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" value={passwordConfirmation} onChange={ev => setPasswordConfirmation(ev.target.value)} type="password" placeholder="Confirm Password" />
    { checkUser && (
      <Alert status='error'>
      <AlertIcon />
        <AlertTitle>Username is used</AlertTitle>
      </Alert>
    )}
    { (!(password === passwordConfirmation) ||  checkUser || password === ""    ) ? (
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
