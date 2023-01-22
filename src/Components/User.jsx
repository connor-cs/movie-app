import React from "react";

import { useContext } from "react";
import { useAuthContext, UserContext } from "./Context";

import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function User() {
    const { loggedInState, setLoggedInState, currentUser } =
    useContext(UserContext);
    const navigate = useNavigate()
    const {logout}= useAuthContext()
    const [active, setActive] = useState(false);
    
    
    return (
    <>
        <div user-page-header>
            <h1>Welcome user {currentUser.email}</h1>
            <button>Account actions</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="saved-movies-container">
        
        </div>
    </>
    );

    function handleLogout(){
        logout()
        navigate('/')
    }
}
