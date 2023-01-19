import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { UserContext, useAuthContext } from './Context'
import { db } from "../firebase-config";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    } from "firebase/firestore";

export default function Signup() {
    const usersCollectionRef = collection(db, "users")
    const {loggedInState, setLoggedInState, currentUser, setCurrentUser}=useContext(UserContext)
    const {signup} = useAuthContext()
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })
    const [signupData, setSignupData] = useState({
        username: '',
        password: '', 
        passwordConfirm: ''
    })
    const [errors, setErrors] = useState('')

    return (
        <div className='form'>
            {/* login form */}
            <span style={{color: "white"}}>Login here:</span>
            <div className='login-form-container form-container'>
                <form className='login-form'>
                    <input
                        type='text'
                        value={loginData.username}
                        placeholder='type your username'
                        onChange={handleLoginUsername}>
                    </input>
                    <input
                        type='password'
                        value={loginData.password}
                        placeholder='type your password'
                        onChange={handleLoginPassword}>
                    </input>
                    <button type="submit" onClick={handleLoginClick}>Login</button>
                </form>
                
                {/* signup form */}
                <span style={{color: "white"}}>Or create account here:</span>
                {errors ? <p>{errors}</p> : null}
                <div className="signup-form-container form-container">
                    <form className='signup-form' onSubmit={createNewUser}>
                        <input
                            placeholder='type username'
                            type='text'
                            value={signupData.username}
                            onChange={handleSignupUsername}>
                        </input>
                        <input
                            placeholder='type password'
                            type='password'
                            value={signupData.password}
                            onChange={handleSignupPassword}>
                        </input>
                        <input
                            placeholder='confirm password'
                            type='password'
                            value={signupData.passwordConfirm}
                            onChange={handleSignupPasswordConfirm}>
                        </input>
                        <button>Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    )

    //helper functions
    function handleLoginClick(e){
        e.preventDefault()
        console.log(loginData)
    }

    function handleLoginUsername(e) {
        e.preventDefault()
        setLoginData({
            ...loginData,
            username: e.target.value
        })
        console.log(loginData.username)
    }
    function handleLoginPassword(e) {
        e.preventDefault()
        setLoginData({
            ...loginData,
            password: e.target.value
        })
    }
    function handleSignupUsername(e) {
        setSignupData({
            ...signupData,
            username: e.target.value
        })
    }
    function handleSignupPassword(e) {
        setSignupData({
            ...signupData,
            password: e.target.value
        })
    }
    function handleSignupPasswordConfirm(e) {
        setSignupData({
            ...signupData,
            passwordConfirm: e.target.value
        })
    }

    // async function createNewUser(e) {
    //     console.log('clicked')
    //     e.preventDefault()
    //     if (signupData.password !== signupData.passwordConfirm){
    //         console.log("Passwords do not match")
    //     }
    //     try {
    //         await signup(signupData.username, signupData.password)
    //         navigate('/')
    //         console.log(signupData, 'success')
    //     } 
    //     catch {setErrors("Failed to create an account")}
    //     console.log('did it work?')
    //     setLoggedInState(!loggedInState)
    // }
    
    async function createNewUser(e) {
        e.preventDefault()

        //check if passwords match
        if (signupData.password !== signupData.passwordConfirm){
            setErrors("Passwords do not match")
        }
        try {
            await addDoc(usersCollectionRef, {
                username: signupData.username,
                password: signupData.password
            })
            navigate('/')
        } 
        catch {setErrors("Failed to create an account")}
        //set logged in context to true
        setLoggedInState(!loggedInState)
        //set currentuser context to data that was just created
        setCurrentUser({username: signupData.username, password: signupData.password})
        console.log(currentUser)
    }
    
}
