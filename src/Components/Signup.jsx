import React, { useState, useContext } from 'react'
import { nanoid } from 'nanoid'
import { LoggedInContext } from './Context'

export default function Signup() {
    const {loggedInState, setLoggedInState, user, setUser}=useContext(LoggedInContext)
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })
    const [signupData, setSignupData] = useState({
        username: '',
        password: ''
    })

    return (
        <div>
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
                <span style={{color: "white"}}>Or sign up here:</span>
                <div className="signup-form-container form-container">
                    <form className='signup-form'>
                        <input
                            type='text'
                            value={signupData.username}
                            onChange={handleSignupUsername}>
                        </input>
                        <input
                            type='password'
                            value={signupData.username}
                            onChange={handleSignupPassword}>
                        </input>
                        <button>Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    )

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

    function createNewUser() {
        const newUser = {
            id: nanoid(),
            username: signupData.username,
            password: signupData.password
        }
    }
}
