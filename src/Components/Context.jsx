import {
  updateCurrentUser,
  StateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  EmailAuthProvider,
} from "firebase/auth";
import { db } from "../firebase-config.js";
import { addDoc, doc, collection, setDoc } from "firebase/firestore";
import React, { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../firebase-config.js";



export const UserContext = createContext();
export function useAuthContext() { return useContext(UserContext); }
const usersCollectionRef = collection(db, "users");


export const ContextProvider = (props) => {
  const [loggedInState, setLoggedInState] = useState(false);
  const [loading, setIsLoading] = useState(false);
  //where should this be updated? in login or in authStateChanged useEffect?
  const [currentUser, setCurrentUser] = useState({
    email: "",
    uid: "",
  });

  function signup(auth, email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((data) => console.log("signupdata", data))
      .catch((error) => console.log("errors:", error));
  }

  function login(auth, email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((data) => console.log("signin response:", data.user))
    //   .then((data) => setCurrentUser({ uid: data.user.uid, email: data.user.email }))
      .catch((error) => console.log("error", error));
  }
  
  function logout() { return auth.signOut(); }

  function updateEmail(email) { return currentUser.updateEmail(email); }

  function updatePassword(password) { return currentUser.updatePassword(password); }

  function clear() {
    setIsLoading(false);
    setCurrentUser(null);
  }

  //check if user doc exists in firestore and create one if not with setDoc
  //take in the currentUsers data from state
  //would be nice to make the userId also the doc id instead of the auto generated id
   async function addUserDoc(id, email) {
    //find doc in db to see if it exists
    const userRef = doc(db, "users", id)
    console.log('userref:', userRef)
    const payload = {uid: id, email: email}
    //setDoc params: reference to document to write, the data itself, and options
    await setDoc(userRef, payload, {merge:true})
    //getting no response from this
        .then(res=>console.log(res))
        .catch(error=>console.log(error))
  }
  
  //this function is the callback passed to onAuthStateChange in the useEffect below
  //if no user, updates currentUser state to null (not sure if this is actually necessary, this might already be built in)
  //otherwise, it sets logged in user to state, and creates a user doc in firestore to represent the auth user
  //check if that doc exists first
  //but where should the adUserDoc function go? inside the callback or outside of it but still in useEffect, or somewhere else
  async function handleAuthStateChanged(user) {
    if (!user) {
      clear();
      setLoggedInState(false);
      return;
    }
    //set currentUser state value to that of the logged in user
    setCurrentUser({
      uid: user.uid,
      email: user.email,
    });
    setLoggedInState(true);
    // addDoc(usersCollectionRef, {
    //     uid: currentUser.uid,
    //     email: currentUser.email
    // })
    //is this the right place for this addUserDoc function?
    addUserDoc(currentUser.uid, currentUser.email)
    //below consolelog is called 3 times before values are fully updated. why? something related to being async?
    console.log('currentUser:', currentUser)
  }

  //do I need to keep onAuthStateChanged inside useEffect?
  useEffect(() => {
    onAuthStateChanged(auth, handleAuthStateChanged);
    addUserDoc(currentUser.uid, currentUser.email)
    //this function doesn't seem to be called at all, can't tell
    // addUserDoc(currentUser.uid, currentUser.email)
  }, []);

  const value = {
    currentUser,
    loggedInState,
    loading,
    EmailAuthProvider,
    setLoggedInState,
    login,
    signup,
    logout,
    updateEmail,
    updatePassword,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
