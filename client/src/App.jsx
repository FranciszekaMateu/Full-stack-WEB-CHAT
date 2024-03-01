import { useState } from 'react'
import Register from './Register'
import { ChakraProvider } from '@chakra-ui/react'
import { UserContextProvider } from './UserContext'

import axios from 'axios'
import Routes from "./Routes";

function App() {
  axios.defaults.baseURL = 'http://localhost:3000';
  axios.defaults.withCredentials = true;
  return (
    <ChakraProvider>
      <UserContextProvider >  
        <Routes/>
      </UserContextProvider>
    </ChakraProvider>
  )
}

export default App
