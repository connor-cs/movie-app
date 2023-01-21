import React from "react";
import { useContext } from "react";
import { UserContext } from "./Context";

import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function User() {
    const { loggedInState, setLoggedInState, currentUser } =
    useContext(UserContext);
    const [active, setActive] = useState(false);

  // const userCollectionRef = collection(db, "users")

  // useEffect(() => {
  //     const getUsers = async () => {
  //         const data = await getDocs(userCollectionRef)
  //         console.log(data)
  //     }
  //     getUsers()
  // }, [])
  //empty
    console.log(currentUser);

    return (
    <>
        <div user-page-header>
            <h1>`Welcome user`</h1>
            <button>Account actions</button>
        </div>
        <div className="saved-movies-container">
        
        </div>
    </>
    );
}
