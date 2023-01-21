import { updateCurrentUser, StateChanged, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    EmailAuthProvider } from "firebase/auth";
import React, { useState, useEffect, createContext, useContext } from "react";
import {auth} from '../firebase-config.js'

export const UserContext = createContext()
//redundant?
export function useAuthContext(){
    return useContext(UserContext)
}

export const ContextProvider = (props) => {
    const [loggedInState, setLoggedInState] = useState(false)
    const [loading, setIsLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState({
        userName: '',
        uid: ''
    })
    function signup(auth, email, password) {
        createUserWithEmailAndPassword(auth, email, password)
        .then(data=>console.log('data',data))
        .catch(error=> console.log('errors:',error))
    }

    function login(auth, email, password) {
        signInWithEmailAndPassword(auth, email, password)
        .then(data=>console.log('res', data))
        .catch(error=>console.log('error', error))
    }
    function logout() { return auth.signOut()}
    
    function updateEmail(email) {return currentUser.updateEmail(email)}
    
    function updatePassword(password) { return currentUser.updatePassword(password)}

    function clear(){
        setIsLoading(false)
        setCurrentUser(null)
    }
    async function handleAuthStateChanged(user){
        if (!user) {
            clear()
            return
        }
        setCurrentUser({
            uid: user.ui,
            email: user.email
        })
    }
    
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged)
        return () => unsubscribe()
    }, [])
    
    const value= {
        currentUser,
        loggedInState,
        loading,
        EmailAuthProvider,
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
