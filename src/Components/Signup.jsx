import React, { useState } from 'react'

export default function Signup() {

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })

    console.log(loginData)



    return (
        <div className='signup-page'>
            <div className='signup-form-container'>
                <form className='login-form'>
                    <input
                        type='text'
                        value={loginData.username}
                        placeholder='type your username'
                        onChange={e => console.log(e.target.value)}>
                    </input>
                    <input
                        type='password'
                        value={loginData.password}
                        placeholder='type your password'
                        onChange={e => setLoginData(loginData.password = e.target.value)}>
                    </input>
                </form>
            </div>
        </div>
    )
}
