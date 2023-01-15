import React from 'react'
import { useContext } from 'react'
import { LoggedInContext } from './Context'

export default function User() {
    const {loggedInState, setLoggedInState} = useContext(LoggedInContext)
  return (
    <div>
        <h1>Welcome user</h1>
        <h2>these are your saved movies:</h2>
    </div>
  )
}
