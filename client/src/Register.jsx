import { Input } from '@chakra-ui/react'
import {Button} from '@chakra-ui/react'
import axios from 'axios'
import {UserContext} from "./UserContext.jsx"
import { useState } from 'react'
import {useContext} from 'react'

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation,setPasswordConfirmation] =useState('');
  const [checkUser,setCheckUser] = useState(false);
  const {setUsername:setLoggedInUsername,setId} = useContext(UserContext)
  async function checkUsername(){
    await axios.post('/checkUser',{username})
    .then((res) => {
      console.log(res)
      if(res.data.isUsed === true){
        setCheckUser(false);
      }
      else{
        setCheckUser(true);
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
    <div className="bg-blue-50 h-screen flex items-center">
    <form className="mx-auto w-64 flex flex-col  gap-4 mb-12 " onSubmit={register}>
      <Input onFocus={handleFocus} value={username} onChange={ev => setUsername(ev.target.value)} placeholder="Username" />
      <Input pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" type="password" value={password} onChange={ev => setPassword(ev.target.value)} placeholder="Password" />
      <Input pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" value={passwordConfirmation} onChange={ev => setPasswordConfirmation(ev.target.value)} type="password" placeholder="Confirm Password" />
    { (password === passwordConfirmation && checkUser ) ? (
      <Button  type="submit" colorScheme="teal" size="md">
        Register  
      </Button>

    ): (
       <Button  type="submit" colorScheme="gray" size="md">
        Register  
      </Button>

    )}
         </form>
    </div>
  )
}
