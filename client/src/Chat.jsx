import { Input } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { InputGroup } from '@chakra-ui/react'
import { InputLeftElement } from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'
import { ArrowRightIcon } from '@chakra-ui/icons'

export default function Chat(){
  return (
    <div className="flex h-screen">
      <div className="bg-blue-100 w-1/3">Left</div>
      <div className=" bg-blue-300 w-2/3">
        <div>messages</div>
        <div className="flex  gap-2 mx-10">
          <InputGroup color="white"  size="md" className="flex text-black rounded-lg bg-white gap-2">
            <Input  className="text-black" placeholder="message" />
            
            <InputLeftElement bg-white>
              <ChatIcon color='blue' />
            </InputLeftElement>
          </InputGroup>
<Button size="md" colorScheme="blue">
              <ArrowRightIcon color="white"/>
            </Button>
        </div>
      </div>
    </div>
  ); 
}
