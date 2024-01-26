import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDs5fvXb72T6lWledUYRsUKEqe0k6UtVP0",
  authDomain: "nv-chat-app.firebaseapp.com",
  projectId: "nv-chat-app",
  storageBucket: "nv-chat-app.appspot.com",
  messagingSenderId: "333454331885",
  appId: "1:333454331885:web:ef8137d467415b4c7a61e4"
};

export const app = initializeApp(firebaseConfig);