import React, { useState, useEffect } from 'react'
import { db } from '../firebase-config'
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore'


export default function About() {

  const usersCollectionRef = collection(db, "users")
  const [users, setUsers] = useState([])
  const [newUserName, setNewUserName] = useState('')
  const [newPass, setNewPass] = useState('')

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

  const createUser = async () => {
    await addDoc(usersCollectionRef, {username: newUserName, password: newPass})
  }

  const updateUserName = async (id, username) => {
    //user doc function to select particular document from firestore
    const userDoc = doc(db, "users", id)
    //set updated info in obj
    const newFields = {username: username}
    //update doc
    await updateDoc(userDoc,newFields)
  }

  return (
    <div style={{ 'backgroundColor': "white" }}>
      
      <h1>firebase test page</h1>
      <br></br>
      {users.map(user => {
        return <div key={user.id}>
          <h1>username: {user.username}</h1>
          <h1>password: {user.password} </h1>
          <h1>userid: {user.id}</h1>
          <button onClick={()=> {updateUserName(user.id, user.username)}}>change username</button>
          <br></br>
          </div>
      })}
      <div>
        <h2>test form for creating new user in firebase:</h2>
        <input 
          placeholder='username..'
          onChange={(e)=>setNewUserName(e.target.value)}/>
        <input 
          placeholder='enter password'
          onChange={(e)=>(setNewPass(e.target.value))}/>
        <button onClick={createUser}>Create new user</button>
      </div>
    
    </div>
  )
}
