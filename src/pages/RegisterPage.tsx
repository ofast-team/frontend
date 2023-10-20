import React, { useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import "../App.css";

// import {useCollectionData} from 'react-firebase-hooks/firestore';

const app = initializeApp({
  apiKey: "AIzaSyD1yV--rl-qJiyvwju2K9jz_jkhvr8sTHw",
  authDomain: "ofast-e6866.firebaseapp.com",
  projectId: "ofast-e6866",
  storageBucket: "ofast-e6866.appspot.com",
  messagingSenderId: "660869453090",
  appId: "1:660869453090:web:b919fe7e93c35a77a5417b",
  measurementId: "G-3B0LRWZFH5"
});

const auth = getAuth(app);

export function RegisterPage() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("logged in");
    } else {
      console.log("not logged in");
    }
  });

  return (
    <div className="mainDiv">
      <h1>Welcome to O(fast) lol. </h1>
      <UI />
    </div>
  );
}

function UI() {
  let emailRef = useRef<HTMLInputElement>(null);
  let passwordRef = useRef<HTMLInputElement>(null);

  const signIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, emailRef.current!.value, passwordRef.current!.value);
  }

  return (
    <form onSubmit={signIn}>
      <input type="text" ref={emailRef}></input>
      <input type="password" ref={passwordRef}></input>
      <button>Sign In</button>
    </form>
  );
}

export default RegisterPage;
