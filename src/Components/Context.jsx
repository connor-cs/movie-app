import {
  deleteUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { db } from "../firebase-config.js";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import React, { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../firebase-config.js";

export const UserContext = createContext();
export function useAuthContext() { return useContext(UserContext); }

export const ContextProvider = (props) => {
  const [loggedInState, setLoggedInState] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    email: "",
    uid: "",
  });

  useEffect(() => {
    onAuthStateChanged(auth, handleAuthStateChanged);
  }, []);

  //callback passed to onAuthStateChanged
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
    //addUserDoc(user.uid, currentUser.email)
  }

  //adds doc to firestore to represent new user
  async function addUserDoc(id, email) {
    const userRef = doc(db, `users/${id}`)
    const payload = {uid: id, email: email}
    await setDoc(userRef, payload, {merge:true})
        .then(res=>console.log(res))
        .catch(error=>console.log(error))
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
