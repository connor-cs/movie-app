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
    
    function signup(email, password) {
        console.log('signupfunction called')
        return auth.createUserWithEmailandPassword(email, password)
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
