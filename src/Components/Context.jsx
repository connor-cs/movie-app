import { updateCurrentUser, StateChanged } from "firebase/auth";
import React, { useState, useEffect, createContext, useContext } from "react";
import {auth} from '../firebase-config.js'

export const UserContext = createContext()
//redundant?
export function useAuthContext(){
    return useContext(UserContext)
}

export const ContextProvider = (props) => {
    const [loggedInState, setLoggedInState] = useState(false)
    const [currentUser, setCurrentUser] = useState({
        userName: '',
        userId: ''
    })
    function signup(auth, email, password) {
        //the consolelog get called but nothing happens after it and I get no response, and nothing hits the backend
        console.log('signupfunction called')
        auth.createUserWithEmailandPassword(auth, email, password)
        .then(data=>console.log(data))
        .catch(error=> console.log(error))
    }
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    function logout() {
        return auth.signOut()
    }
    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }
    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    const value= {
        currentUser,
        loggedInState,
        setLoggedInState,
        login,
        signup,
        logout,
        updateEmail,
        updatePassword
    }
    
    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}
