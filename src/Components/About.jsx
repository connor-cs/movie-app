import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

export default function About() {
  const usersCollectionRef = collection(db, "users");
  const [active, setActive] = useState(false);
  const [changedUsername, setChangedUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState("");
  const [newPass, setNewPass] = useState("");

  //display docs for auth users stored in firestore
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getUsers();
  }, []);

  //this also works fine
  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      username: newUserName,
      password: newPass,
    });
  };

  //this works fine too
  const updateUserName = async (id, changedUsername) => {
    console.log(id);
    console.log("changedName", changedUsername);
    //user doc function to select particular document from firestore
    const userDoc = doc(db, "users", id);
    //set updated info in obj
    const newFields = { username: changedUsername };
    //update doc
    await updateDoc(userDoc, newFields);
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <h1>firebase test page</h1>
      <h1>users in firestore:</h1>
      <br></br>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <h1>email: {user.email}</h1>
            <h3>password: {user.password} </h3>
            <h3>userid: {user.id}</h3>
            <button onClick={() => setActive(!active)}>change username</button>
            {active ? (
              <div>
                <input
                  placeholder="type new username"
                  onChange={(e) => setChangedUsername(e.target.value)}
                />
                <button
                  onClick={() => updateUserName(user.id, changedUsername)}
                >
                  submit
                </button>
              </div>
            ) : null}
            <br></br>
          </div>
        );
      })}
      {/* <div>
        <h2>test form for creating new user in firebase:</h2>
        <input
          placeholder="username.."
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <input
          placeholder="enter password"
          onChange={(e) => setNewPass(e.target.value)}
        />
        <button onClick={createUser}>Create new user</button>
      </div> */}
    </div>
  );
}
