import { useEffect, useState , useRef} from "react";
import {Box, Button, Container, Input, VStack, HStack} from '@chakra-ui/react'
import Message from './Components/Message';
import {app} from './Firebase'

import {onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth"
import {getFirestore, addDoc, collection, serverTimestamp, onSnapshot, query, orderBy} from "firebase/firestore"

const auth = getAuth(app);
const db = getFirestore(app);

const loginHandler = ()=>{
   const provider = new GoogleAuthProvider();
   signInWithPopup(auth, provider)
};

const logoutHandler = ()=>{
  signOut(auth);
}



function App() {  
  
   const [user, setUser] = useState(false);
   const [message, setMessage]= useState("")
   const [messages, setMessages] = useState([]);
   const divForScroll = useRef(null)

   const submitHandler = async(e)=>{
    e.preventDefault();
  
    try{
      setMessage("");
         await addDoc(collection(db,"Messages"),{
          text:message,
          uid: user.uid,
          uri:user.photoURL,
          createdAt: serverTimestamp()
         })
         
         divForScroll.current.scrollIntoView({behaviour:"smooth"})
    }catch(error){
      alert(error)
    }
  };


   useEffect(()=>{
    const q = query(collection(db,"Messages"), orderBy("createdAt", "asc"))
   const unsubscribe = onAuthStateChanged(auth,(data)=>{
      setUser(data)
    });
   const unsubscribeForMessage= onSnapshot(q, (snap)=>{
      setMessages(snap.docs.map((item)=>{
        const id = item.id;
        return {id, ...item.data()};
      })
      );
   })
    return()=>{
      unsubscribe(); 
      unsubscribeForMessage();
    }
   },[]);
 

  return (
   <Box bg={"purple.100"}>
    {
      user?(
        <Container bg={"white"} h={"100vh"}> 
     <VStack /*bg={"telegram.100"}*/ h={"full"} paddingY={"2"}>
       <Button onClick={logoutHandler} w={"full"} colorScheme={"pink"}> Logout</Button>

     <VStack bg={"red.100"} h={"full"} w={'full'} overflowY="auto" css={{"&::-webkit-scrollbar":{
      display:"none"
     }}}>
  {/* MESSAGEEEEE */}
        {
          messages.map(item=>{
            <Message key={item.id}
            user={item.uid===user.uid?"me":"other"} text={item.text} uri={item.uri}/>
          })
        }
        <div ref={divForScroll}></div>
     </VStack> 



   <form onSubmit={submitHandler} style={{ width:"100%"}}action="">
      <HStack> 
        <Input value={message} onChange={(e)=>setMessage(e.target.value)} placeholder='Enter the Message' />
        <Button colorScheme={"purple"} type='submit'>Send</Button>
      </HStack>
  </form>
     </VStack>
    </Container>
      ):<VStack justifyContent={"center"} h={"100vh"}>
        <Button onClick={loginHandler} colorScheme='purple'>Sign In With Google</Button>
      </VStack>
}
   </Box>
  );
}

export default App;
