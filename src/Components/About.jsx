import React from 'react'
import { db } from '../firebase-config'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect } from 'react'
import { useState } from 'react'
export default function About() {

  const usersCollectionRef = collection(db, "users")
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef)
      console.log(data.docs)
      setUsers(data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        password: doc.password,
        username: doc.username
      })))
    }
    getUsers()
  }, [])


  return (
    <div style={{ 'backgroundColor': "white" }}>
      
      <h1>testtesttest</h1>
      {users.map(user => {
        return <div>
          <h1>{user.username}</h1>
          <h1>{user.password} </h1>
          <h1>{user.id}</h1>
          </div>
      })}
    
    </div>
  )
}
