import {
  deleteUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { db } from "../firebase-config.js";
import { deleteDoc, doc, collection, setDoc } from "firebase/firestore";
import React, { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../firebase-config.js";

export const UserContext = createContext();
export function useAuthContext() { return useContext(UserContext); }

export const ContextProvider = (props) => {
  const [loggedInState, setLoggedInState] = useState(false);
  const [loading, setIsLoading] = useState(false);
  //where should this be updated? in login or in authStateChanged useEffect?
  const [currentUser, setCurrentUser] = useState({
    email: "",
    uid: "",
  });

  useEffect(() => {
    onAuthStateChanged(auth, handleAuthStateChanged);
  }, []);

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
    setCurrentUser({
      uid: user.uid,
      email: user.email,
    });
    setLoggedInState(true);
    addUserDoc(currentUser.uid, currentUser.email)
  }

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

  //make this whole function async that is called from account actions page? or just make part of it async
  function deleteAccount(){
    //delete user doc from firestore, then delete the actual user from auth
    deleteDoc(doc(db, `users/${currentUser.uid}`))
    deleteUser(currentUser)
      .then(x=>console.log(x))
      .catch(e=>console.log(e))
  }

  function updateEmail(email) { return currentUser.updateEmail(email); }

  function updatePassword(password) { return currentUser.updatePassword(password); }

  function clear() {
    setIsLoading(false);
    setCurrentUser(null);
  }

  //check if user doc exists in firestore and create one if not with setDoc
  //take in the currentUsers data from state
  //make the userId also the doc id instead of the auto generated id ??
   async function addUserDoc(id, email) {
    //find doc in db to see if it exists:
    const userRef = doc(db, `users/${id}`, id)
    console.log('userref:', userRef)
    const payload = {uid: id, email: email}
    //setDoc params: reference to document to write, the data itself, and options
    await setDoc(userRef, payload, {merge:true})
    //getting no response from this
        .then(res=>console.log(res))
        .catch(error=>console.log(error))
  }


  const value = {
    currentUser,
    loggedInState,
    loading,
    setLoggedInState,
    login,
    signup,
    logout,
    updateEmail,
    updatePassword,
    deleteAccount
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
