import {Box, Button, Container, Input, VStack, HStack} from '@chakra-ui/react'
import Message from './Components/Message';
function App() {
  return (
   <Box bg={"purple.100"}>
    <Container bg={"white"} h={"100vh"}> 
     <VStack /*bg={"telegram.100"}*/ h={"full"} paddingY={"2"}>
       <Button w={"full"} colorScheme={"pink"}> Logout</Button>

     <VStack bg={"red.100"} h={"full"} w={'full'} overflowY="auto">
  {/* MESSAGEEEEE */}
         <Message text={"Sample message"}/>
         <Message user="me" text={"Sample message"}/>
         <Message user="me" text={"Sample message"}/>
         <Message user="me" text={"Sample message"}/>
         <Message text={"Sample message"}/>
         <Message user="me" text={"Sample message"}/>
         <Message text={"Sample message"}/>
         <Message user="me" text={"Sample message"}/>
         <Message text={"Sample message"}/>
         <Message text={"Sample message"}/>
         <Message text={"Sample message"}/>
         <Message text={"Sample message"}/>
         <Message text={"Sample message"}/>
         <Message text={"Sample message"}/>
     </VStack> 

   <form style={{ width:"100%"}}action="">
      <HStack> 
        <Input placeholder='Enter the Message' />
        <Button colorScheme={"purple"} type='submit'>Send</Button>
      </HStack>
  </form>
     </VStack>
    </Container>
   </Box>
  );
}

export default App;
