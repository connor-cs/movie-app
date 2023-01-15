import React from 'react'
import { useContext } from 'react'
import { LoggedInContext } from './Context'
import { db } from '../firebase-config'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect } from 'react'

export default function User() {
    const { loggedInState, setLoggedInState } = useContext(LoggedInContext)

    // const userCollectionRef = collection(db, "users")

    // useEffect(() => {
    //     const getUsers = async () => {
    //         const data = await getDocs(userCollectionRef)
    //         console.log(data)
    //     }
    //     getUsers()
    // }, [])

    return (
        <div>
            <h1>Welcome user</h1>
            <h2>these are your saved movies:</h2>
        </div>
    )
}
