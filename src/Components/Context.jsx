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
 
    //where should this be updated? in login or in authStateChanged useEffect?
    const [currentUser, setCurrentUser] = useState({
        email: '',
        uid: ''
    })
    
    function signup(auth, email, password) {
        createUserWithEmailAndPassword(auth, email, password)
        .then(data=>console.log('data',data))
        .catch(error=> console.log('errors:',error))
    }

    function login(auth, email, password) {
        signInWithEmailAndPassword(auth, email, password)
        .then(data=>console.log('res', data.user))
        .then(data=>setCurrentUser({uid:data.user.uid, email: data.user.email}))
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
            setLoggedInState(false)
            return
        }
        setCurrentUser({
            uid: user.uid,
            email: user.email
        })
        setLoggedInState(true)
        //below is called 4 times before values are fully updated, why?
        console.log('user', currentUser)
    }
    
    useEffect(()=>{
        onAuthStateChanged(auth, handleAuthStateChanged)
        console.log(loggedInState)
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
